import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import DateInput from "@/components/common/DateInput";
import Input from "@/components/common/Input";
import PrimaryButton from "@/components/common/PrimaryButton";
import Layout from "@/components/layout/Layout";
import ScreenHeader from "@/components/layout/ScreenHeader";
import ConsultaRepository from "@/repositories/ConsultaRepository";

export default function EditarConsultaScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [tipoConsulta, setTipoConsulta] = useState("");
  const [medico, setMedico] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [local, setLocal] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarConsulta();
  }, []);

  async function carregarConsulta() {
    try {
      const consulta = await ConsultaRepository.buscarPorId(Number(id));

      if (!consulta) {
        Alert.alert("Erro", "Consulta não encontrada.");
        router.back();
        return;
      }

      setTipoConsulta(consulta.tipoConsulta);
      setMedico(consulta.medico);
      setData(consulta.data);
      setHorario(consulta.horario);
      setLocal(consulta.local);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar a consulta.");
    } finally {
      setCarregando(false);
    }
  }

  async function salvar() {
    if (salvando) return;

    if (
      !tipoConsulta.trim() ||
      !medico.trim() ||
      !data.trim() ||
      !horario.trim()
    ) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha a especialidade, médico, data e horário.",
      );

      return;
    }

    try {
      setSalvando(true);

      await ConsultaRepository.atualizar({
        id: Number(id),
        tipoConsulta: tipoConsulta.trim(),
        medico: medico.trim(),
        data,
        horario,
        local: local.trim(),
      });

      Alert.alert("Sucesso", "Consulta atualizada com sucesso!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error(error);

      Alert.alert("Erro", "Não foi possível atualizar a consulta.");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return null;
  }

  return (
    <Layout>
      <ScreenHeader
        title="Editar Consulta"
        subtitle="Altere as informações da consulta."
      />

      <Input
        label="Especialidade"
        placeholder="Ex.: Cardiologista"
        value={tipoConsulta}
        onChangeText={setTipoConsulta}
      />

      <Input
        label="Médico"
        placeholder="Ex.: Dr. João Silva"
        value={medico}
        onChangeText={setMedico}
      />

      <DateInput label="Data" value={data} onChangeText={setData} />

      <Input
        label="Horário"
        placeholder="Ex.: 09:00"
        value={horario}
        onChangeText={setHorario}
      />

      <Input
        label="Local (opcional)"
        placeholder="Ex.: Hospital ou clínica"
        value={local}
        onChangeText={setLocal}
      />

      <PrimaryButton title="Salvar Alterações" onPress={salvar} />
    </Layout>
  );
}
