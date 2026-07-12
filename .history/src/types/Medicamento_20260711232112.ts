export interface Medicamento {
  id: string;

  nome: string;

  dosagem: string;

  quantidade: number;

  unidade: "comprimido" | "cápsula" | "ml" | "gota" | "ampola";

  horarios: string[];

  dataInicio: string;

  dataFim?: string;

  observacoes?: string;

  ativo: boolean;

  criadoEm: string;

  atualizadoEm: string;
}