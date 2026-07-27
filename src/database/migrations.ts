import { db } from "./db";
import {
  CREATE_MEDICAMENTOS_TABLE,
  CREATE_MEDICAMENTO_HORARIOS_TABLE,
} from "./schema";

export function runMigrations(): void {
  db.execSync("PRAGMA foreign_keys = ON;");

  db.execSync(CREATE_MEDICAMENTOS_TABLE);
  db.execSync(CREATE_MEDICAMENTO_HORARIOS_TABLE);

  console.log("✅ Banco de dados inicializado com sucesso!");
}