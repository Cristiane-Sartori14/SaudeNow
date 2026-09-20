import { useState } from "react";
import { Alert, Pressable, Text } from "react-native";

import DateInput from "@/components/common/DateInput";
import HorarioInput from "@/components/common/HorarioInput";
import Input from "@/components/common/Input";
import PrimaryButton from "@/components/common/PrimaryButton";
import SelectInput from "@/components/common/SelectInput";
import TextArea from "@/components/common/TextArea";
import Layout from "@/components/layout/Layout";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";

import MedicamentoRepository from "@/repositories/MedicamentoRepository";

export default function EditarMedicamentoScreen() {
  const [nome, setNome] = useState("");
  const [dosagem, setDosagem] = useState("");
  const [usoContinuo, setUsoContinuo] = useState(false);
  const [quantidade, setQuantidade] = useState("");
  const [horarios, setHorarios] = useState<string[]>([]);
  const [unidade, setUnidade] = useState("comprimido");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const router = useRouter();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  useEffect(() => {
    async function carregarMedicamento() {
      if (!id) return;

      const medicamento = await MedicamentoRepository.buscarPorId(Number(id));

      if (!medicamento) {
        Alert.alert("Erro", "Medicamento não encontrado.");
        router.back();
        return;
      }

      setNome(medicamento.nome);
      setDosagem(medicamento.dosagem);
      const medicamentoEhContinuo = medicamento.quantidade == null;

      setUsoContinuo(medicamentoEhContinuo);
      setQuantidade(
        medicamento.quantidade != null ? String(medicamento.quantidade) : "",
      );
      setUnidade(medicamento.unidade);
      setHorarios(medicamento.horarios);
      setDataInicio(medicamento.dataInicio);
      setDataFim(medicamentoEhContinuo ? "" : (medicamento.dataFim ?? ""));

      setObservacoes(medicamento.observacoes ?? "");
    }

    carregarMedicamento();
  }, [id]);

  async function salvar() {
    if (
      !nome.trim() ||
      !dosagem.trim() ||
      (!usoContinuo && !quantidade.trim()) ||
      !dataInicio.trim() ||
      horarios.length === 0
    ) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha todos os campos obrigatórios.",
      );
      return;
    }

    let quantidadeNumerica: number | undefined;

    if (!usoContinuo) {
      quantidadeNumerica = Number(quantidade);

      if (!Number.isFinite(quantidadeNumerica) || quantidadeNumerica <= 0) {
        Alert.alert("Quantidade inválida", "Informe uma quantidade válida.");
        return;
      }
    }

    try {
      await MedicamentoRepository.atualizar({
        id: Number(id),
        nome: nome.trim(),
        dosagem: dosagem.trim(),
        quantidade: quantidadeNumerica,
        unidade: unidade as "comprimido" | "cápsula" | "ml" | "gota" | "ampola",
        horarios,
        dataInicio,
        dataFim: usoContinuo ? undefined : dataFim || undefined,
        observacoes: observacoes.trim() || undefined,
        ativo: true,
      });

      Alert.alert("Sucesso", "Medicamento atualizado com sucesso!");

      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível atualizar o medicamento.");
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
        placeholder="Nome medicamento"
        value={nome}
        onChangeText={setNome}
      />

      <Input
        label="Dosagem"
        placeholder="Ex.: 50 mg"
        value={dosagem}
        onChangeText={setDosagem}
      />

      <Pressable
        onPress={() => setUsoContinuo((valor) => !valor)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
          paddingVertical: 8,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            marginRight: 10,
          }}
        >
          {usoContinuo ? "☑" : "☐"}
        </Text>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Uso contínuo
        </Text>
      </Pressable>

      {!usoContinuo && (
        <Input
          label="Quantidade"
          placeholder="Ex.: 30"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={setQuantidade}
        />
      )}

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
      {!usoContinuo && (
        <DateInput
          label="Data de término (opcional)"
          value={dataFim}
          onChangeText={setDataFim}
        />
      )}

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
