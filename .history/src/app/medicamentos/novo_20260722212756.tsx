import { Alert } from "react-native";

import Layout from "@/components/layout/Layout";
import ScreenHeader from "@/components/layout/ScreenHeader";
import PrimaryButton from "@/components/common/PrimaryButton";

export default function NovoMedicamentoScreen() {
  return (
    <Layout>
      <ScreenHeader
        title="Novo Medicamento"
        subtitle="Preencha os dados do medicamento."
      />

      <PrimaryButton
        title="Salvar"
        onPress={() => Alert.alert("Medicamento salvo!")}
      />
    </Layout>
  );
}