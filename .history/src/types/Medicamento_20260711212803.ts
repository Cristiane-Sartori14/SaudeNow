export interface Medicamento {
  id: string;

  nome: string;

  dosagem: string;

  horario: string;

  quantidade: number;

  observacao?: string;

  ativo: boolean;
}