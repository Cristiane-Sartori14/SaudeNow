import { useState } from "react";
import { Alert } from "react-native";

import Layout from "@/components/layout/Layout";
import ScreenHeader from "@/components/layout/ScreenHeader";
import PrimaryButton from "@/components/common/PrimaryButton";
import Input from "@/components/common/Input";

export default function NovoMedicamentoScreen() {
  const [nome, setNome] = useState("");
  const [dosagem, setDosagem] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [horarios, setHorarios] = useState<string[]>([]);


  function salvar() {
    if (
      !nome.trim() ||
      !dosagem.trim() ||
      !quantidade.trim() ||
      !horario.trim()
    ) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha todos os campos."
      );
      return;
    }

    Alert.alert(
      "Medicamento",
      "Cadastro realizado com sucesso!"
    );

    console.log({
      nome,
      dosagem,
      quantidade,
      horario,
    });
  }

  return (
    <Layout>
      <ScreenHeader
        title="Novo Medicamento"
        subtitle="Preencha os dados do medicamento."
      />

      <Input
        label="Nome"
        placeholder="Ex.: Losartana"
        value={nome}
        onChangeText={setNome}
      />

      <Input
        label="Dosagem"
        placeholder="Ex.: 50 mg"
        value={dosagem}
        onChangeText={setDosagem}
      />

      <Input
        label="Quantidade"
        placeholder="Ex.: 30"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <Input
        label="Horário"
        placeholder="Ex.: 08:00"
        value={horario}
        onChangeText={setHorario}
      />

      <PrimaryButton
        title="Salvar"
        onPress={salvar}
      />
    </Layout>
  );
}