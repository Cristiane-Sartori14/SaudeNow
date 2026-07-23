import { Alert } from "react-native";

import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import CardMedicamento from "@/components/cards/CardMedicamento";

export default function MedicamentosScreen() {
  return (
    <Layout>
      <Header />

      <CardMedicamento
        nome="Losartana"
        dosagem="50 mg"
        horarios={["08:00", "20:00"]}
        onEditar={() => Alert.alert("Editar")}
        onExcluir={() => Alert.alert("Excluir")}
      />

      <CardMedicamento
        nome="Metformina"
        dosagem="850 mg"
        horarios={["12:00"]}
        onEditar={() => Alert.alert("Editar")}
        onExcluir={() => Alert.alert("Excluir")}
      />
    </Layout>
  );
}