import { db } from "@/database/db";
import { Historico } from "@/types/historico";

class HistoricoRepository {
  async listar(): Promise<Historico[]> {
    const registros = await db.getAllAsync<{
      id: number;
      tipo: "medicamento" | "consulta" | "exercicio";
      descricao: string;
      data: string;
      concluido: number;
    }>(`
      SELECT
        id,
        tipo,
        descricao,
        data,
        concluido
      FROM historico
      ORDER BY id DESC
    `);

    return registros.map((registro) => ({
      ...registro,
      concluido: registro.concluido === 1,
    }));
  }

  async criar(historico: Omit<Historico, "id">): Promise<void> {
    await db.runAsync(
      `
      INSERT INTO historico (
        tipo,
        descricao,
        data,
        concluido
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        historico.tipo,
        historico.descricao,
        historico.data,
        historico.concluido ? 1 : 0,
      ],
    );
  }

  async remover(id: number): Promise<void> {
    await db.runAsync(
      `
      DELETE FROM historico
      WHERE id = ?
      `,
      [id],
    );
  }
}

export default new HistoricoRepository();
