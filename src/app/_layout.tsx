import { Stack } from "expo-router";
import { useEffect, useState } from "react";

import { runMigrations } from "@/database/migrations";

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function initialize() {
      try {
        await runMigrations();
      } catch (error) {
        console.error("Erro ao executar migrações:", error);
      } finally {
        setReady(true);
      }
    }

    initialize();
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
