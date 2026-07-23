import { Alert } from "react-native";

import Layout from "@/components/layout/Layout";
import ScreenHeader from "@/components/layout/ScreenHeader";
import CardMedicamento from "@/components/cards/CardMedicamento";
import PrimaryButton from "@/components/common/PrimaryButton";
import { useRouter } from "expo-router";

export default function MedicamentosScreen() {
  return (
    <Layout>
      <ScreenHeader
        title="Medicamentos"
        subtitle="Gerencie seus medicamentos cadastrados."
      />

      <PrimaryButton
        title="+ Novo Medicamento"
        onPress={() => Alert.alert("Abrir tela de cadastro")}
      />

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