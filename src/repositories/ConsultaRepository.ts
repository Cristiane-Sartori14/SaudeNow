import { db } from "@/database/db";
import { Consulta } from "@/types/consulta";

class ConsultaRepository {
  async listar(): Promise<Consulta[]> {
    return db.getAllAsync<Consulta>(`
    SELECT
      id,
      tipo_consulta AS tipoConsulta,
      medico,
      data,
      horario,
      local,
      observacoes
    FROM consultas
    ORDER BY data ASC, horario ASC
  `);
  }

  async buscarPorId(id: number): Promise<Consulta | null> {
    const consulta = await db.getFirstAsync<Consulta>(
      `
    SELECT
      id,
      tipo_consulta AS tipoConsulta,
      medico,
      data,
      horario,
      local,
      observacoes
    FROM consultas
    WHERE id = ?
    `,
      [id],
    );

    return consulta ?? null;
  }

  async criar(consulta: Omit<Consulta, "id">): Promise<void> {
    await db.runAsync(
      `
     INSERT INTO consultas (
        tipo_consulta,
        medico,
        data,
        horario,
        local,
        observacoes
    )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        consulta.tipoConsulta,
        consulta.medico,
        consulta.data,
        consulta.horario,
        consulta.local,
        consulta.observacoes ?? null,
      ],
    );
  }

  async atualizar(consulta: Consulta): Promise<void> {
    await db.runAsync(
      `
      UPDATE consultas
      SET
        tipo_consulta = ?,
        medico = ?,
        data = ?,
        horario = ?,
        local = ?,
        observacoes = ?
      WHERE id = ?
      `,
      [
        consulta.tipoConsulta,
        consulta.medico,
        consulta.data,
        consulta.horario,
        consulta.local,
        consulta.observacoes ?? null,
        consulta.id,
      ],
    );
  }

  async remover(id: number): Promise<void> {
    await db.runAsync(
      `
      DELETE FROM consultas
      WHERE id = ?
      `,
      [id],
    );
  }
}

export default new ConsultaRepository();
