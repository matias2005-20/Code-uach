# Modelo de datos de CodeUACh

El esquema vive en [`prisma/schema.prisma`](../prisma/schema.prisma). Está escrito
en sintaxis de Prisma porque se lee bien y, si decidimos usarlo, `prisma migrate dev`
genera el SQL sin reescribir nada. **Todavía no está instalado**: por ahora el
archivo es documentación, no código que corra.

Este documento explica por qué el esquema quedó así y qué falta decidir.

---

## Las cinco decisiones que dan forma al resto

### 1. Un problema no pertenece a un ramo

`Problema` existe por sí solo. Que aparezca en INFO134 como «B. Cuenta de vocales»,
con plazo del viernes y 100 puntos, es una fila aparte en `AsignacionProblema`.

La alternativa —meter `ramoId`, `plazo` y `puntaje` dentro de `Problema`— obliga a
duplicar el enunciado y los casos de prueba cada semestre, y vuelve imposible que un
problema caiga a práctica libre sin clonarlo. Con la separación:

- el mismo problema se reutiliza entre semestres y entre ramos;
- la letra, el plazo y el puntaje son del ramo, que es donde realmente viven;
- práctica libre es simplemente `Problema.libreDesde IS NOT NULL`, sin copias.

El costo es una tabla más y un `join` en casi toda consulta de la lista de problemas.
Vale la pena.

### 2. La inscripción es una fila que cambia de estado, más una bitácora

Elegimos solicitud y aprobación, así que `Inscripcion` es única por
`(usuario, ramo)` y se mueve entre estados:

```
              ┌─────────────┐
   solicita   │  PENDIENTE  │
  ──────────► └──────┬──────┘
                     │
        ┌────────────┼─────────────┐
        │ aprueba    │ rechaza     │
        ▼            ▼             │
   ┌──────────┐ ┌───────────┐      │
   │ APROBADA │ │ RECHAZADA │      │
   └────┬─────┘ └─────┬─────┘      │
        │             │ vuelve a solicitar
        │ se retira   └────────────┘
        ▼
   ┌──────────┐
   │ RETIRADA │
   └────┬─────┘
        └──── vuelve a solicitar ───┘
```

Una fila por par significa que re-solicitar tras un rechazo **sobrescribe** el
estado. Para no perder la historia está `MovimientoInscripcion`, que registra cada
transición con quién la hizo y cuándo. Sin esa tabla no hay forma de auditar quién
aprobó a quién, que es justo lo que un docente necesita si algo se reclama.

La bandeja de pendientes del docente es una sola consulta, y está indexada:

```sql
SELECT * FROM inscripciones WHERE ramo_id = $1 AND estado = 'PENDIENTE';
```

### 3. El rol es global y también por ramo

`Usuario.rol` decide lo que se puede hacer en la plataforma (crear ramos, administrar).
`Inscripcion.rol` decide lo que se puede hacer *en ese ramo*.

Hacen falta los dos porque un ayudante es estudiante de su carrera —aparece en el
ranking, resuelve problemas— pero tiene permisos de docente en el ramo donde ayuda.
Con un solo campo habría que elegir cuál de las dos cosas es, y ninguna respuesta
sirve.

### 4. Los puntajes se materializan; el rating se guarda como serie

`PuntajeRamo` es redundante: se puede derivar sumando el mejor envío por asignación.
Se materializa igual, porque el ranking del ramo se pide en cada carga de página y
recalcularlo con un `GROUP BY` sobre toda la tabla de envíos no aguanta. Se actualiza
cuando un envío pasa a `LISTO`.

El rating es al revés: `Usuario.rating` guarda el valor actual y `CambioRating`
guarda cada movimiento. Esa serie es la que alimenta el «+47» de la tabla de top
rating en la portada —es la suma de los deltas de la última semana— y permite
dibujar la curva de progreso de un estudiante sin recomputar nada.

### 5. La discusión de un problema es por ramo, no global

`Hilo.asignacionId` en lugar de `Hilo.problemaId`. La razón no es técnica sino de
reglas: lo que se puede decir sobre un problema depende de si su plazo cerró, y el
plazo es del ramo. Si el hilo fuera global, un estudiante de un ramo cuyo plazo ya
venció podría publicar la solución y arruinarla para otro ramo donde sigue abierto.

---

## Reglas que el esquema asume y el código debe hacer cumplir

Ninguna de estas la garantiza la base por sí sola:

1. **El juez es el único que corrige.** El docente publica enunciados, fija
   plazos y puntajes y resuelve solicitudes de inscripción; no revisa envíos.
   Por eso `Envio` no tiene revisor ni veredicto manual: si un resultado está
   mal, lo que se arregla es el caso de prueba o el enunciado.
2. **Visibilidad.** Un estudiante sólo ve las asignaciones de ramos donde su
   inscripción está `APROBADA`. La práctica libre es la excepción: abierta a
   cualquier cuenta.
3. **Casos ocultos.** `CasoDePrueba.entrada` y `salidaEsperada` no salen nunca de la
   API salvo que `esEjemplo = true`. `ResultadoCaso.salidaObtenida` se guarda sólo
   para casos de ejemplo, por lo mismo.
4. **Plazo vencido.** Un envío posterior a `AsignacionProblema.cierraEn` se juzga
   igual, pero queda con `puntajeObtenido = 0`. Se sigue corrigiendo porque la idea
   del proyecto es practicar, no solo calificar.
5. **Mejor envío.** El puntaje de un estudiante en una asignación es el máximo
   `puntajeObtenido` de sus envíos, no el último ni la suma.
6. **`ERROR_INTERNO` no es culpa del estudiante.** No cuenta como intento, no afecta
   el rating y hay que reencolarlo.
7. **Un problema pasa a libre** (`libreDesde`) cuando venció el plazo en *todas* sus
   asignaciones. Es una tarea programada, no algo que pase solo.
8. **Bajas lógicas.** `Usuario.desactivadoEn` y `Mensaje.eliminadoEn` en vez de
   borrar: un borrado real dejaría huecos en los hilos y rompería el historial.

---

## Lo que queda por decidir

**Dónde viven las entradas grandes.** Un caso con una palabra de 10⁵ letras son
100 KB; un problema con 40 casos así son 4 MB en una fila de Postgres. Por eso
`CasoDePrueba` tiene los campos `entradaRuta` y `salidaEsperadaRuta`. Falta elegir
el almacenamiento (disco del servidor, S3, Vercel Blob) y el umbral a partir del
cual se usa la ruta en vez del texto.

**Autenticación.** El esquema tiene `Usuario.claveHash` opcional, pensando en que
la identidad sea el correo institucional. Si usamos NextAuth hay que agregar sus
tablas (`Account`, `Session`, `VerificationToken`). Si el ingreso fuera vía la cuenta
UACh directamente, `claveHash` sobra.

**Fórmula del rating.** Está el registro de los cambios, no cómo se calculan. Hay que
definir cuánto sube resolver un problema de dificultad *d*, si hay decaimiento por
inactividad y si los concursos usan Elo.

**Puntaje parcial.** `CasoDePrueba.grupo` y `puntos` están puestos para soportar
subtareas, pero no decidimos si la etapa 1 las usa. Si no, todos los casos van con
`grupo = 0` y el puntaje es todo o nada.

**Concursos, editoriales con voto y detección de plagio** son etapa 2 según el
alcance del README. Nada en este esquema los estorba: los concursos serían una tabla
`Concurso` que agrupa asignaciones con ventana de tiempo.

---

## Cómo se conecta con las pantallas que ya existen

| Pantalla | De dónde sale |
|---|---|
| Índice: filas de ramos | `Ramo` + conteo de `AsignacionProblema` y `Envio` |
| Índice: «último envío por X» | `Envio` más reciente del ramo, con `Usuario.handle` |
| Índice: icono de carpeta | ¿tiene el estudiante asignaciones sin `ACEPTADO`? |
| Índice: top rating | `Usuario` ordenado por `rating`, delta desde `CambioRating` |
| Índice: color del handle | `rating` → rango; el color sale de `Facultad.colorHex` |
| Hilo: enunciado fijado | `Hilo.tipo = PROBLEMA`, primer `Mensaje`, `fijado = true` |
| Hilo: tabla de casos | `ResultadoCaso` del envío, sólo los de ejemplo con detalle |
| Hilo: «2 personas marcaron útil» | conteo de `VotoUtil` |
| Barra lateral: «tu estado aquí» | `Envio` del usuario en esa asignación |

---

## Diagrama de relaciones

```
Facultad ──< Carrera ──< Usuario
                           │
        ┌──────────────────┼──────────────────┬─────────────┐
        │                  │                  │             │
   Inscripcion         Problema             Envio        Mensaje
        │            (autor)  │               │             │
        │                     │               │             │
      Ramo ──< AsignacionProblema >───────────┘             │
        │            │     │                                │
        │            │     └──< CasoDePrueba ──< ResultadoCaso
        │            │
        │          Hilo ──< Mensaje ──< VotoUtil
        │
        └──< PuntajeRamo

Usuario ──< CambioRating
Problema ──< TemaEnProblema >── Tema
Problema ──1 Editorial
Inscripcion ──< MovimientoInscripcion
```
