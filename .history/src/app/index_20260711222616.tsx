import { useRouter } from "expo-router";

import CardHome from "../components/CardHome";
import Layout from "../components/layout/Layout";

export default function Home() {
  const router = useRouter();

  return (
    <Layout title="SaúdeNow" subtitle="Organize sua rotina de saúde">
      <CardHome
        icon="💊"
        title="Medicamentos"
        subtitle="Cadastre seus medicamentos"
        onPress={() => router.push("/medicamentos")}
      />

      <CardHome
        icon="📅"
        title="Consultas"
        subtitle="Acompanhe suas consultas"
        onPress={() => router.push("/consultas")}
      />

      <CardHome
        icon="🧘"
        title="Exercícios"
        subtitle="Exercícios de mobilidade"
        onPress={() => router.push("/exercicios")}
      />

      <CardHome
        icon="📊"
        title="Histórico"
        subtitle="Visualize suas atividades"
        onPress={() => router.push("/historico")}
      />

      <CardHome
        icon="⚙️"
        title="Configurações"
        subtitle="Preferências do aplicativo"
        onPress={() => router.push("/configuracoes")}
      />
    </Layout>
  );
}
