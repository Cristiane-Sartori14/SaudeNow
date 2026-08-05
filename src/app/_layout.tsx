import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

import { runMigrations } from "@/database/migrations";

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS !== "web") {
      runMigrations();
    }
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
