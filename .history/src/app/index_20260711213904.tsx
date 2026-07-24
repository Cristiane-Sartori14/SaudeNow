import { useRouter } from "expo-router";

import Layout from "../components/Layout";
import CardHome from "../components/CardHome";

export default function Home() {
  const router = useRouter();

  return (
    <Layout
      title="SaúdeNow"
      subtitle="Organize sua rotina de saúde"
    >
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