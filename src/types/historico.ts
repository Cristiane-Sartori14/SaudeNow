export interface Historico {
  id: number;

  tipo: "medicamento" | "consulta" | "exercicio";

  descricao: string;

  data: string;

  concluido: boolean;
}
