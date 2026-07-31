import { db } from "@/database/db";
import { Medicamento } from "@/types/medicamento";

class MedicamentoRepository {
  async criar(
    medicamento: Omit<Medicamento, "id" | "criadoEm" | "atualizadoEm">,
  ): Promise<number> {
    const agora = new Date().toISOString();

    const result = await db.runAsync(
      `
      INSERT INTO medicamentos (
        nome,
        dosagem,
        quantidade,
        unidade,
        data_inicio,
        data_fim,
        observacoes,
        ativo,
        criado_em,
        atualizado_em
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        medicamento.nome,
        medicamento.dosagem,
        medicamento.quantidade,
        medicamento.unidade,
        medicamento.dataInicio,
        medicamento.dataFim ?? null,
        medicamento.observacoes ?? null,
        medicamento.ativo ? 1 : 0,
        agora,
        agora,
      ],
    );

    const medicamentoId = Number(result.lastInsertRowId);

    for (const horario of medicamento.horarios) {
      await db.runAsync(
        `
        INSERT INTO medicamento_horarios (
          medicamento_id,
          horario
        )
        VALUES (?, ?)
        `,
        [medicamentoId, horario],
      );
    }

    return medicamentoId;
  }

  async listar(): Promise<Medicamento[]> {
    const medicamentos = await db.getAllAsync<{
      id: number;
      nome: string;
      dosagem: string;
      quantidade: number;
      unidade: Medicamento["unidade"];
      data_inicio: string;
      data_fim: string | null;
      observacoes: string | null;
      ativo: number;
      criado_em: string;
      atualizado_em: string;
    }>(`
    SELECT *
    FROM medicamentos
    ORDER BY nome
  `);

    const resultado: Medicamento[] = [];

    for (const item of medicamentos) {
      const horarios = await db.getAllAsync<{ horario: string }>(
        `
      SELECT horario
      FROM medicamento_horarios
      WHERE medicamento_id = ?
      ORDER BY horario
      `,
        [item.id],
      );

      resultado.push({
        id: item.id,
        nome: item.nome,
        dosagem: item.dosagem,
        quantidade: item.quantidade,
        unidade: item.unidade,
        horarios: horarios.map((h) => h.horario),
        dataInicio: item.data_inicio,
        dataFim: item.data_fim ?? undefined,
        observacoes: item.observacoes ?? undefined,
        ativo: item.ativo === 1,
        criadoEm: item.criado_em,
        atualizadoEm: item.atualizado_em,
      });
    }

    return resultado;
  }

  async buscarPorId(id: number): Promise<Medicamento | null> {
    const item = await db.getFirstAsync<{
      id: number;
      nome: string;
      dosagem: string;
      quantidade: number;
      unidade: Medicamento["unidade"];
      data_inicio: string;
      data_fim: string | null;
      observacoes: string | null;
      ativo: number;
      criado_em: string;
      atualizado_em: string;
    }>(
      `
    SELECT *
    FROM medicamentos
    WHERE id = ?
    `,
      [id],
    );

    if (!item) {
      return null;
    }

    const horarios = await db.getAllAsync<{ horario: string }>(
      `
    SELECT horario
    FROM medicamento_horarios
    WHERE medicamento_id = ?
    ORDER BY horario
    `,
      [id],
    );

    return {
      id: item.id,
      nome: item.nome,
      dosagem: item.dosagem,
      quantidade: item.quantidade,
      unidade: item.unidade,
      horarios: horarios.map((h) => h.horario),
      dataInicio: item.data_inicio,
      dataFim: item.data_fim ?? undefined,
      observacoes: item.observacoes ?? undefined,
      ativo: item.ativo === 1,
      criadoEm: item.criado_em,
      atualizadoEm: item.atualizado_em,
    };
  }

  async atualizar(
    medicamento: Omit<Medicamento, "criadoEm" | "atualizadoEm">,
  ): Promise<void> {
    const agora = new Date().toISOString();

    await db.runAsync(
      `
    UPDATE medicamentos
    SET
      nome = ?,
      dosagem = ?,
      quantidade = ?,
      unidade = ?,
      data_inicio = ?,
      data_fim = ?,
      observacoes = ?,
      ativo = ?,
      atualizado_em = ?
    WHERE id = ?
    `,
      [
        medicamento.nome,
        medicamento.dosagem,
        medicamento.quantidade,
        medicamento.unidade,
        medicamento.dataInicio,
        medicamento.dataFim ?? null,
        medicamento.observacoes ?? null,
        medicamento.ativo ? 1 : 0,
        agora,
        medicamento.id,
      ],
    );

    // Remove os horários antigos
    await db.runAsync(
      `
    DELETE FROM medicamento_horarios
    WHERE medicamento_id = ?
    `,
      [medicamento.id],
    );

    // Insere os novos horários
    for (const horario of medicamento.horarios) {
      await db.runAsync(
        `
      INSERT INTO medicamento_horarios (
        medicamento_id,
        horario
      )
      VALUES (?, ?)
      `,
        [medicamento.id, horario],
      );
    }
  }

  async remover(id: number): Promise<void> {
    await db.runAsync(
      `
      DELETE FROM medicamentos
      WHERE id = ?
      `,
      [id],
    );
  }
}

export default new MedicamentoRepository();
