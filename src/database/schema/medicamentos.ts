export const CREATE_MEDICAMENTOS_TABLE = `
  CREATE TABLE IF NOT EXISTS medicamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    dosagem TEXT NOT NULL,
    quantidade INTEGER NOT NULL,
    unidade TEXT NOT NULL,
    data_inicio TEXT NOT NULL,
    data_fim TEXT,
    observacoes TEXT,
    ativo INTEGER NOT NULL DEFAULT 1,
    criado_em TEXT NOT NULL,
    atualizado_em TEXT NOT NULL
  );
`;

export const CREATE_MEDICAMENTO_HORARIOS_TABLE = `
  CREATE TABLE IF NOT EXISTS medicamento_horarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medicamento_id INTEGER NOT NULL,
    horario TEXT NOT NULL,
    FOREIGN KEY (medicamento_id)
      REFERENCES medicamentos(id)
      ON DELETE CASCADE
  );
`;