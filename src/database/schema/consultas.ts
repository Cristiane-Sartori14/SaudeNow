export const CREATE_CONSULTAS_TABLE = `
CREATE TABLE IF NOT EXISTS consultas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo_consulta TEXT NOT NULL,
    medico TEXT NOT NULL,
    data TEXT NOT NULL,
    horario TEXT NOT NULL,
    local TEXT NOT NULL,
    observacoes TEXT
);
`;