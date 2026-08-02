import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

import DateInput from "@/components/common/DateInput";
import HorarioInput from "@/components/common/HorarioInput";
import Input from "@/components/common/Input";
import PrimaryButton from "@/components/common/PrimaryButton";
import SelectInput from "@/components/common/SelectInput";
import TextArea from "@/components/common/TextArea";
import Layout from "@/components/layout/Layout";
import ScreenHeader from "@/components/layout/ScreenHeader";
import MedicamentoRepository from "@/repositories/MedicamentoRepository";

export default function NovoMedicamentoScreen() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [dosagem, setDosagem] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [horarios, setHorarios] = useState<string[]>([]);
  const [unidade, setUnidade] = useState("comprimido");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    if (salvando) return;

    setSalvando(true);

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

    try {
      await MedicamentoRepository.criar({
        nome,
        dosagem,
        quantidade: Number(quantidade),
        unidade: unidade as "comprimido" | "cápsula" | "ml" | "gota" | "ampola",
        horarios,
        dataInicio,
        dataFim: dataFim || undefined,
        observacoes: observacoes || undefined,
        ativo: true,
      });

      Alert.alert("Sucesso", "Medicamento cadastrado com sucesso!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar o medicamento.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Layout>
      <ScreenHeader
        title="Editar Medicamento"
        subtitle="Altere as informações do medicamento."
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
          { label: "Cápsula", value: "cápsula" },
          { label: "Gota", value: "gota" },
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

      <TextArea
        label="Observações"
        placeholder="Informações adicionais..."
        value={observacoes}
        onChangeText={setObservacoes}
      />

      <PrimaryButton title="Salvar" onPress={salvar} />
    </Layout>
  );
}
