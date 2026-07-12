export interface Historico {
  id: string;

  tipo: "medicamento" | "consulta" | "exercicio";

  descricao: string;

  data: string;

  concluido: boolean;
}