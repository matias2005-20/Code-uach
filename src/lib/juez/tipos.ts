export type LenguajeJuez = "cpp" | "python";

export type VeredictoJuez =
  | "QUEUED"
  | "RUNNING"
  | "AC"
  | "WA"
  | "TLE"
  | "RE"
  | "CE"
  | "IE";

export type EstadoProblemaJuez =
  | "preparing"
  | "ready"
  | "error";

export interface EjemploProblemaJuez {
  input: string;
  output?: string;
}

export interface UsuarioJuez {
  id: number;
  email: string;
  created_at: string;
}

export interface RespuestaLoginJuez {
  access_token: string;
  token_type: "bearer";
  user: UsuarioJuez;
}

export interface ProblemaResumenJuez {
  id: number;
  name: string;
  languages: LenguajeJuez[];
  status: EstadoProblemaJuez;
  created_at: string;
}

export interface ProblemaDetalleJuez {
  id: number;
  name: string;
  description: string;
  examples: EjemploProblemaJuez[];
  constraints?: string;
  languages: LenguajeJuez[];
  time_limit_ms: number;
  memory_limit_mb: number;
  test_count: number;
  status: EstadoProblemaJuez;
  status_detail?: string | null;
}

export interface CrearProblemaJuez {
  name: string;
  description: string;
  examples?: EjemploProblemaJuez[];
  constraints?: string;
  languages: LenguajeJuez[];
  solution_language: LenguajeJuez;
  solution_code: string;
  test_inputs: string[];
  time_limit_ms?: number;
  memory_limit_mb?: number;
}

export interface CrearEnvioJuez {
  problem_id: number;
  language: LenguajeJuez;
  code: string;
}

export interface RespuestaCrearEnvioJuez {
  id: number;
  problem_id: number;
  user_id: number;
  language: LenguajeJuez;
  verdict: VeredictoJuez;
  created_at: string;
}

export interface EnvioJuez {
  id: number;
  problem_id: number;
  user_id: number;
  language: LenguajeJuez;
  verdict: VeredictoJuez;
  passed_tests: number;
  total_tests: number;
  time_ms: number | null;
  detail: string | null;
  created_at: string;
  judged_at: string | null;
}

export interface EstadoConexionJuez {
  conectado: boolean;
  juez?: {
    status: string;
  };
  error?: string;
}
