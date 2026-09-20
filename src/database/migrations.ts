import { db } from "./db";

import {
  CREATE_CONSULTAS_TABLE,
  CREATE_HISTORICO_TABLE,
  CREATE_MEDICAMENTOS_TABLE,
  CREATE_MEDICAMENTO_HORARIOS_TABLE,
} from "./schema";

export function runMigrations(): void {
  db.execSync("PRAGMA foreign_keys = ON;");

  db.execSync(CREATE_MEDICAMENTOS_TABLE);
  db.execSync(CREATE_MEDICAMENTO_HORARIOS_TABLE);
  db.execSync(CREATE_CONSULTAS_TABLE);
  db.execSync(CREATE_HISTORICO_TABLE);

  const colunasMedicamentos = db.getAllSync<{
    name: string;
    notnull: number;
  }>("PRAGMA table_info(medicamentos);");

  const colunaQuantidade = colunasMedicamentos.find(
    (coluna) => coluna.name === "quantidade",
  );

  const quantidadeNaoAceitaNulo = colunaQuantidade?.notnull === 1;

  if (quantidadeNaoAceitaNulo) {
    console.log("🔄 Atualizando estrutura da tabela medicamentos...");

    db.execSync("PRAGMA foreign_keys = OFF;");

    try {
      db.execSync("BEGIN TRANSACTION;");

      db.execSync(`
        CREATE TABLE medicamentos_novo (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          dosagem TEXT NOT NULL,
          quantidade INTEGER,
          unidade TEXT NOT NULL,
          data_inicio TEXT NOT NULL,
          data_fim TEXT,
          observacoes TEXT,
          ativo INTEGER NOT NULL DEFAULT 1,
          criado_em TEXT NOT NULL,
          atualizado_em TEXT NOT NULL
        );
      `);

      db.execSync(`
        INSERT INTO medicamentos_novo (
          id,
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
        SELECT
          id,
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
        FROM medicamentos;
      `);

      db.execSync(`
        CREATE TABLE medicamento_horarios_novo (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          medicamento_id INTEGER NOT NULL,
          horario TEXT NOT NULL,
          FOREIGN KEY (medicamento_id)
            REFERENCES medicamentos_novo(id)
            ON DELETE CASCADE
        );
      `);

      db.execSync(`
        INSERT INTO medicamento_horarios_novo (
          id,
          medicamento_id,
          horario
        )
        SELECT
          id,
          medicamento_id,
          horario
        FROM medicamento_horarios;
      `);

      db.execSync("DROP TABLE medicamento_horarios;");
      db.execSync("DROP TABLE medicamentos;");

      db.execSync("ALTER TABLE medicamentos_novo RENAME TO medicamentos;");

      db.execSync(
        "ALTER TABLE medicamento_horarios_novo RENAME TO medicamento_horarios;",
      );

      db.execSync("COMMIT;");

      console.log("✅ Estrutura dos medicamentos atualizada!");
    } catch (error) {
      db.execSync("ROLLBACK;");
      throw error;
    } finally {
      db.execSync("PRAGMA foreign_keys = ON;");
    }
  }

  console.log("✅ Banco de dados inicializado com sucesso!");
}
