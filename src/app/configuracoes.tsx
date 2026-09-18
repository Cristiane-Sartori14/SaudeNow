import { Text } from "react-native";

import Layout from "@/components/layout/Layout";
import ScreenHeader from "@/components/layout/ScreenHeader";

export default function ConfiguracoesScreen() {
  return (
    <Layout>
      <ScreenHeader
        title="Configurações"
        subtitle="Preferências do aplicativo."
      />

      <Text>Configurações do SaúdeNow</Text>
    </Layout>
  );
}
