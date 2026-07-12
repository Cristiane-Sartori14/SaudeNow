export interface Consulta {
  id: string;

  medico: string;

  especialidade: string;

  data: string;

  horario: string;

  local: string;

  observacao?: string;
}