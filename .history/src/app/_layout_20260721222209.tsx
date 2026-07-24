import { MedicamentosProvider } from "@/contexts/MedicamentosContext";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { runMigrations } from "@/database";

export default function RootLayout() {
  console.log("1 - RootLayout iniciou");

  useEffect(() => {
    console.log("2 - useEffect iniciou");

    async function initializeDatabase() {
      console.log("3 - Antes das migrações");

      await runMigrations();

      console.log("4 - Depois das migrações");
    }

    initializeDatabase();
  }, []);

  console.log("5 - Antes do return");

  return (
    <MedicamentosProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </MedicamentosProvider>
  );
}