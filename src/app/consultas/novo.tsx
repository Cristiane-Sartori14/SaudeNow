import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import DateInput from "@/components/common/DateInput";
import Input from "@/components/common/Input";
import PrimaryButton from "@/components/common/PrimaryButton";
import Layout from "@/components/layout/Layout";
import ScreenHeader from "@/components/layout/ScreenHeader";
import ConsultaRepository from "@/repositories/ConsultaRepository";

export default function NovaConsultaScreen() {
  const router = useRouter();

  const [tipoConsulta, setTipoConsulta] = useState("");
  const [medico, setMedico] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [local, setLocal] = useState("");
  const [salvando, setSalvando] = useState(false);

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
        "Preencha o tipo da consulta, médico, data e horário.",
      );

      return;
    }

    try {
      setSalvando(true);

      await ConsultaRepository.criar({
        tipoConsulta: tipoConsulta.trim(),
        medico: medico.trim(),
        data,
        horario,
        local: local.trim(),
      });

      Alert.alert("Sucesso", "Consulta cadastrada com sucesso!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error(error);

      Alert.alert("Erro", "Não foi possível salvar a consulta.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Layout>
      <ScreenHeader
        title="Nova Consulta"
        subtitle="Cadastre uma nova consulta."
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

      <PrimaryButton title="Salvar Consulta" onPress={salvar} />
    </Layout>
  );
}
