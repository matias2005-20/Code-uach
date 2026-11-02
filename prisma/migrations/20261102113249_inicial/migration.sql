-- CreateEnum
CREATE TYPE "RolGlobal" AS ENUM ('ESTUDIANTE', 'DOCENTE', 'ADMIN');

-- CreateEnum
CREATE TYPE "RolEnRamo" AS ENUM ('ESTUDIANTE', 'AYUDANTE', 'DOCENTE');

-- CreateEnum
CREATE TYPE "EstadoInscripcion" AS ENUM ('PENDIENTE', 'APROBADA', 'RECHAZADA', 'RETIRADA');

-- CreateEnum
CREATE TYPE "Lenguaje" AS ENUM ('PYTHON', 'CPP', 'JAVA');

-- CreateEnum
CREATE TYPE "EstadoEnvio" AS ENUM ('EN_COLA', 'COMPILANDO', 'EJECUTANDO', 'LISTO');

-- CreateEnum
CREATE TYPE "Veredicto" AS ENUM ('ACEPTADO', 'INCORRECTO', 'TIEMPO_EXCEDIDO', 'MEMORIA_EXCEDIDA', 'ERROR_COMPILACION', 'ERROR_EJECUCION', 'ERROR_INTERNO');

-- CreateEnum
CREATE TYPE "TipoHilo" AS ENUM ('PROBLEMA', 'DUDA', 'ANUNCIO', 'EDITORIAL');

-- CreateEnum
CREATE TYPE "MotivoCambioRating" AS ENUM ('PROBLEMA_RESUELTO', 'CONCURSO', 'INACTIVIDAD', 'AJUSTE_MANUAL');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "claveHash" TEXT,
    "rol" "RolGlobal" NOT NULL DEFAULT 'ESTUDIANTE',
    "carreraId" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 800,
    "correoVerificadoEn" TIMESTAMP(3),
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultimoAccesoEn" TIMESTAMP(3),
    "desactivadoEn" TIMESTAMP(3),

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facultades" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "colorHex" TEXT NOT NULL,

    CONSTRAINT "facultades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carreras" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "nombreCorto" TEXT NOT NULL,
    "facultadId" TEXT NOT NULL,

    CONSTRAINT "carreras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ramos" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "semestre" TEXT NOT NULL,
    "aceptaSolicitudes" BOOLEAN NOT NULL DEFAULT true,
    "archivadoEn" TIMESTAMP(3),
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ramos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inscripciones" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "ramoId" TEXT NOT NULL,
    "rol" "RolEnRamo" NOT NULL DEFAULT 'ESTUDIANTE',
    "estado" "EstadoInscripcion" NOT NULL DEFAULT 'PENDIENTE',
    "mensajeSolicitud" TEXT,
    "motivoRechazo" TEXT,
    "solicitadaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resueltaEn" TIMESTAMP(3),
    "resueltaPorId" TEXT,

    CONSTRAINT "inscripciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movimientos_inscripcion" (
    "id" TEXT NOT NULL,
    "inscripcionId" TEXT NOT NULL,
    "desde" "EstadoInscripcion",
    "hacia" "EstadoInscripcion" NOT NULL,
    "porUsuarioId" TEXT,
    "nota" TEXT,
    "ocurridoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movimientos_inscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "temas" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "temas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problemas" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "enunciado" TEXT NOT NULL,
    "formatoEntrada" TEXT NOT NULL,
    "formatoSalida" TEXT NOT NULL,
    "notas" TEXT,
    "limiteTiempoMs" INTEGER NOT NULL DEFAULT 1000,
    "limiteMemoriaMb" INTEGER NOT NULL DEFAULT 256,
    "dificultad" INTEGER NOT NULL,
    "autorId" TEXT NOT NULL,
    "libreDesde" TIMESTAMP(3),
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "problemas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "temas_en_problemas" (
    "problemaId" TEXT NOT NULL,
    "temaId" TEXT NOT NULL,

    CONSTRAINT "temas_en_problemas_pkey" PRIMARY KEY ("problemaId","temaId")
);

-- CreateTable
CREATE TABLE "editoriales" (
    "id" TEXT NOT NULL,
    "problemaId" TEXT NOT NULL,
    "cuerpo" TEXT NOT NULL,
    "autorId" TEXT NOT NULL,
    "publicadoEn" TIMESTAMP(3),

    CONSTRAINT "editoriales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casos_de_prueba" (
    "id" TEXT NOT NULL,
    "problemaId" TEXT NOT NULL,
    "orden" INTEGER NOT NULL,
    "descripcion" TEXT,
    "entrada" TEXT,
    "salidaEsperada" TEXT,
    "entradaRuta" TEXT,
    "salidaEsperadaRuta" TEXT,
    "esEjemplo" BOOLEAN NOT NULL DEFAULT false,
    "grupo" INTEGER NOT NULL DEFAULT 0,
    "puntos" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "casos_de_prueba_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asignaciones_problema" (
    "id" TEXT NOT NULL,
    "ramoId" TEXT NOT NULL,
    "problemaId" TEXT NOT NULL,
    "etiqueta" TEXT NOT NULL,
    "puntaje" INTEGER NOT NULL DEFAULT 100,
    "obligatorio" BOOLEAN NOT NULL DEFAULT true,
    "publicadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cierraEn" TIMESTAMP(3),

    CONSTRAINT "asignaciones_problema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "envios" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "problemaId" TEXT NOT NULL,
    "asignacionId" TEXT,
    "lenguaje" "Lenguaje" NOT NULL,
    "codigoFuente" TEXT NOT NULL,
    "estado" "EstadoEnvio" NOT NULL DEFAULT 'EN_COLA',
    "veredicto" "Veredicto",
    "tiempoMaxMs" INTEGER,
    "memoriaMaxKb" INTEGER,
    "casosCorrectos" INTEGER NOT NULL DEFAULT 0,
    "casosTotales" INTEGER NOT NULL DEFAULT 0,
    "puntajeObtenido" INTEGER NOT NULL DEFAULT 0,
    "mensajeCompilador" TEXT,
    "enviadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "juzgadoEn" TIMESTAMP(3),

    CONSTRAINT "envios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resultados_caso" (
    "id" TEXT NOT NULL,
    "envioId" TEXT NOT NULL,
    "casoId" TEXT NOT NULL,
    "veredicto" "Veredicto" NOT NULL,
    "tiempoMs" INTEGER,
    "memoriaKb" INTEGER,
    "salidaObtenida" TEXT,

    CONSTRAINT "resultados_caso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hilos" (
    "id" TEXT NOT NULL,
    "tipo" "TipoHilo" NOT NULL,
    "titulo" TEXT NOT NULL,
    "ramoId" TEXT,
    "asignacionId" TEXT,
    "autorId" TEXT NOT NULL,
    "fijado" BOOLEAN NOT NULL DEFAULT false,
    "cerrado" BOOLEAN NOT NULL DEFAULT false,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultimoMensajeEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hilos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensajes" (
    "id" TEXT NOT NULL,
    "hiloId" TEXT NOT NULL,
    "autorId" TEXT NOT NULL,
    "cuerpo" TEXT NOT NULL,
    "citaDeId" TEXT,
    "envioId" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editadoEn" TIMESTAMP(3),
    "eliminadoEn" TIMESTAMP(3),

    CONSTRAINT "mensajes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "votos_utiles" (
    "usuarioId" TEXT NOT NULL,
    "mensajeId" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "votos_utiles_pkey" PRIMARY KEY ("usuarioId","mensajeId")
);

-- CreateTable
CREATE TABLE "puntajes_ramo" (
    "usuarioId" TEXT NOT NULL,
    "ramoId" TEXT NOT NULL,
    "problemasResueltos" INTEGER NOT NULL DEFAULT 0,
    "puntajeTotal" INTEGER NOT NULL DEFAULT 0,
    "ultimoEnvioEn" TIMESTAMP(3),
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "puntajes_ramo_pkey" PRIMARY KEY ("usuarioId","ramoId")
);

-- CreateTable
CREATE TABLE "cambios_rating" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "motivo" "MotivoCambioRating" NOT NULL,
    "delta" INTEGER NOT NULL,
    "valorFinal" INTEGER NOT NULL,
    "referencia" TEXT,
    "ocurridoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cambios_rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_handle_key" ON "usuarios"("handle");

-- CreateIndex
CREATE INDEX "usuarios_rating_idx" ON "usuarios"("rating" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "facultades_nombre_key" ON "facultades"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "carreras_nombre_key" ON "carreras"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "ramos_codigo_semestre_key" ON "ramos"("codigo", "semestre");

-- CreateIndex
CREATE INDEX "inscripciones_ramoId_estado_idx" ON "inscripciones"("ramoId", "estado");

-- CreateIndex
CREATE UNIQUE INDEX "inscripciones_usuarioId_ramoId_key" ON "inscripciones"("usuarioId", "ramoId");

-- CreateIndex
CREATE INDEX "movimientos_inscripcion_inscripcionId_ocurridoEn_idx" ON "movimientos_inscripcion"("inscripcionId", "ocurridoEn");

-- CreateIndex
CREATE UNIQUE INDEX "temas_nombre_key" ON "temas"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "temas_slug_key" ON "temas"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "problemas_slug_key" ON "problemas"("slug");

-- CreateIndex
CREATE INDEX "problemas_libreDesde_dificultad_idx" ON "problemas"("libreDesde", "dificultad");

-- CreateIndex
CREATE UNIQUE INDEX "editoriales_problemaId_key" ON "editoriales"("problemaId");

-- CreateIndex
CREATE UNIQUE INDEX "casos_de_prueba_problemaId_orden_key" ON "casos_de_prueba"("problemaId", "orden");

-- CreateIndex
CREATE INDEX "asignaciones_problema_ramoId_publicadoEn_idx" ON "asignaciones_problema"("ramoId", "publicadoEn");

-- CreateIndex
CREATE UNIQUE INDEX "asignaciones_problema_ramoId_problemaId_key" ON "asignaciones_problema"("ramoId", "problemaId");

-- CreateIndex
CREATE UNIQUE INDEX "asignaciones_problema_ramoId_etiqueta_key" ON "asignaciones_problema"("ramoId", "etiqueta");

-- CreateIndex
CREATE INDEX "envios_usuarioId_enviadoEn_idx" ON "envios"("usuarioId", "enviadoEn" DESC);

-- CreateIndex
CREATE INDEX "envios_asignacionId_veredicto_idx" ON "envios"("asignacionId", "veredicto");

-- CreateIndex
CREATE INDEX "envios_estado_enviadoEn_idx" ON "envios"("estado", "enviadoEn");

-- CreateIndex
CREATE UNIQUE INDEX "resultados_caso_envioId_casoId_key" ON "resultados_caso"("envioId", "casoId");

-- CreateIndex
CREATE UNIQUE INDEX "hilos_asignacionId_key" ON "hilos"("asignacionId");

-- CreateIndex
CREATE INDEX "hilos_ramoId_fijado_ultimoMensajeEn_idx" ON "hilos"("ramoId", "fijado", "ultimoMensajeEn" DESC);

-- CreateIndex
CREATE INDEX "mensajes_hiloId_creadoEn_idx" ON "mensajes"("hiloId", "creadoEn");

-- CreateIndex
CREATE INDEX "puntajes_ramo_ramoId_puntajeTotal_idx" ON "puntajes_ramo"("ramoId", "puntajeTotal" DESC);

-- CreateIndex
CREATE INDEX "cambios_rating_usuarioId_ocurridoEn_idx" ON "cambios_rating"("usuarioId", "ocurridoEn" DESC);

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "carreras"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carreras" ADD CONSTRAINT "carreras_facultadId_fkey" FOREIGN KEY ("facultadId") REFERENCES "facultades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscripciones" ADD CONSTRAINT "inscripciones_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscripciones" ADD CONSTRAINT "inscripciones_ramoId_fkey" FOREIGN KEY ("ramoId") REFERENCES "ramos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscripciones" ADD CONSTRAINT "inscripciones_resueltaPorId_fkey" FOREIGN KEY ("resueltaPorId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimientos_inscripcion" ADD CONSTRAINT "movimientos_inscripcion_inscripcionId_fkey" FOREIGN KEY ("inscripcionId") REFERENCES "inscripciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problemas" ADD CONSTRAINT "problemas_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "temas_en_problemas" ADD CONSTRAINT "temas_en_problemas_problemaId_fkey" FOREIGN KEY ("problemaId") REFERENCES "problemas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "temas_en_problemas" ADD CONSTRAINT "temas_en_problemas_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "temas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editoriales" ADD CONSTRAINT "editoriales_problemaId_fkey" FOREIGN KEY ("problemaId") REFERENCES "problemas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casos_de_prueba" ADD CONSTRAINT "casos_de_prueba_problemaId_fkey" FOREIGN KEY ("problemaId") REFERENCES "problemas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignaciones_problema" ADD CONSTRAINT "asignaciones_problema_ramoId_fkey" FOREIGN KEY ("ramoId") REFERENCES "ramos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignaciones_problema" ADD CONSTRAINT "asignaciones_problema_problemaId_fkey" FOREIGN KEY ("problemaId") REFERENCES "problemas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "envios" ADD CONSTRAINT "envios_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "envios" ADD CONSTRAINT "envios_problemaId_fkey" FOREIGN KEY ("problemaId") REFERENCES "problemas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "envios" ADD CONSTRAINT "envios_asignacionId_fkey" FOREIGN KEY ("asignacionId") REFERENCES "asignaciones_problema"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resultados_caso" ADD CONSTRAINT "resultados_caso_envioId_fkey" FOREIGN KEY ("envioId") REFERENCES "envios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resultados_caso" ADD CONSTRAINT "resultados_caso_casoId_fkey" FOREIGN KEY ("casoId") REFERENCES "casos_de_prueba"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hilos" ADD CONSTRAINT "hilos_ramoId_fkey" FOREIGN KEY ("ramoId") REFERENCES "ramos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hilos" ADD CONSTRAINT "hilos_asignacionId_fkey" FOREIGN KEY ("asignacionId") REFERENCES "asignaciones_problema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hilos" ADD CONSTRAINT "hilos_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensajes" ADD CONSTRAINT "mensajes_hiloId_fkey" FOREIGN KEY ("hiloId") REFERENCES "hilos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensajes" ADD CONSTRAINT "mensajes_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensajes" ADD CONSTRAINT "mensajes_citaDeId_fkey" FOREIGN KEY ("citaDeId") REFERENCES "mensajes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensajes" ADD CONSTRAINT "mensajes_envioId_fkey" FOREIGN KEY ("envioId") REFERENCES "envios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votos_utiles" ADD CONSTRAINT "votos_utiles_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votos_utiles" ADD CONSTRAINT "votos_utiles_mensajeId_fkey" FOREIGN KEY ("mensajeId") REFERENCES "mensajes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "puntajes_ramo" ADD CONSTRAINT "puntajes_ramo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "puntajes_ramo" ADD CONSTRAINT "puntajes_ramo_ramoId_fkey" FOREIGN KEY ("ramoId") REFERENCES "ramos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cambios_rating" ADD CONSTRAINT "cambios_rating_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
