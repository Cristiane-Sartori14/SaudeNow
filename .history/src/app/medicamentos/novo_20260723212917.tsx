import { useState } from "react";
import { Alert } from "react-native";

import HorarioInput from "@/components/common/HorarioInput";
import Input from "@/components/common/Input";
import PrimaryButton from "@/components/common/PrimaryButton";
import SelectInput from "@/components/common/SelectInput";
import Layout from "@/components/layout/Layout";
import ScreenHeader from "@/components/layout/ScreenHeader";
import DateInput from "@/components/common/DateInput";
import TextArea from "@/components/common/TextArea";

export default function NovoMedicamentoScreen() {
  const [nome, setNome] = useState("");
  const [dosagem, setDosagem] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [horarios, setHorarios] = useState<string[]>([]);
  const [unidade, setUnidade] = useState("comprimido");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [observacoes, setObservacoes] = useState("");

  function salvar() {
   if (
  !nome.trim() ||
  !dosagem.trim() ||
  !quantidade.trim() ||
  !dataInicio.trim() ||
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
      dataInicio,
      dataFim,
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

      <HorarioInput horarios={horarios} onChange={setHorarios} />

      <DateInput
        label="Data de início"
        value={dataInicio}
        onChangeText={setDataInicio}
      />

      <DateInput
        label="Data de término (opcional)"
        value={dataFim}
        onChangeText={setDataFim}
      />

      <PrimaryButton title="Salvar" onPress={salvar} />
    </Layout>
  );
}
