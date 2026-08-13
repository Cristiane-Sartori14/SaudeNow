export interface Consulta {
  id: number;
  tipoConsulta: string;
  medico: string;
  data: string;
  horario: string;
  local: string;
  observacoes?: string;
}
