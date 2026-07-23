import { useState } from "react";
import { Alert } from "react-native";

import Layout from "@/components/layout/Layout";
import ScreenHeader from "@/components/layout/ScreenHeader";
import PrimaryButton from "@/components/common/PrimaryButton";
import Input from "@/components/common/Input";
import HorarioInput from "@/components/common/HorarioInput";
import SelectInput from "@/components/common/SelectInput";


export default function NovoMedicamentoScreen() {
  const [nome, setNome] = useState("");
  const [dosagem, setDosagem] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [horarios, setHorarios] = useState<string[]>([]);
  const [unidade, setUnidade] = useState("comprimido");

  function salvar() {
    if (
      !nome.trim() ||
      !dosagem.trim() ||
      !quantidade.trim() ||
      horarios.length === 0
    ) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos.");
      return;
    }

    Alert.alert("Medicamento", "Cadastro realizado com sucesso!");

    console.log({
  nome,
  dosagem,
  quantidade,
  unidade,
  horarios,
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
<SelectInput
  label="Unidade"
  selectedValue={unidade}
  onValueChange={setUnidade}
  options={[
    { label: "Comprimido", value: "comprimido" },
    { label: "Cápsula", value: "capsula" },
    { label: "Gotas", value: "gotas" },
    { label: "ml", value: "ml" },
    { label: "Ampola", value: "ampola" },
  ]}
/>

<HorarioInput
  horarios={horarios}
  onChange={setHorarios}
/>

<PrimaryButton
  title="Salvar"
  onPress={salvar}
/>