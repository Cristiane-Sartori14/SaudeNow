import { useRouter } from "expo-router";

import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import CardHome from "@/components/cards/CardHome";

export default function Home() {
  const router = useRouter();

  return (
    <Layout>

      <Header />

      <CardHome
        icon="pill"
        title="Medicamentos"
        subtitle="Cadastre seus medicamentos"
        onPress={() => router.push("/medicamentos")}
      />

      <CardHome
        icon="calendar-month"
        title="Consultas"
        subtitle="Acompanhe suas consultas"
        onPress={() => router.push("/consultas")}
      />

      <CardHome
        icon="human-handsup"
        title="Exercícios"
        subtitle="Exercícios de mobilidade"
        onPress={() => router.push("/exercicios")}
      />

      <CardHome
        icon="history"
        title="Histórico"
        subtitle="Visualize suas atividades"
        onPress={() => router.push("/historico")}
      />

      <CardHome
        icon="cog-outline"
        title="Configurações"
        subtitle="Preferências"
        onPress={() => router.push("/configuracoes")}
      />

    </Layout>
  );
}