import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Text } from "react-native";

import CardConsulta from "@/components/cards/CardConsulta";
import PrimaryButton from "@/components/common/PrimaryButton";
import Layout from "@/components/layout/Layout";
import ScreenHeader from "@/components/layout/ScreenHeader";
import ConsultaRepository from "@/repositories/ConsultaRepository";
import { Consulta } from "@/types/consulta";

export default function ConsultasScreen() {
  const router = useRouter();

  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useFocusEffect(
    useCallback(() => {
      carregarConsultas();
    }, []),
  );

  async function carregarConsultas() {
    try {
      const lista = await ConsultaRepository.listar();
      setConsultas(lista);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar as consultas.");
    }
  }

  async function excluirConsulta(id: number) {
    Alert.alert("Excluir consulta", "Deseja realmente excluir esta consulta?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await ConsultaRepository.remover(id);
            await carregarConsultas();

            Alert.alert("Sucesso", "Consulta excluída com sucesso.");
          } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível excluir a consulta.");
          }
        },
      },
    ]);
  }

  return (
    <Layout>
      <ScreenHeader
        title="Consultas"
        subtitle="Gerencie suas consultas cadastradas."
      />

      <PrimaryButton
        title="+ Nova Consulta"
        onPress={() => router.push("/consultas/novo")}
      />

      {consultas.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            marginTop: 32,
            color: "#666",
          }}
        >
          Nenhuma consulta cadastrada.
        </Text>
      ) : (
        consultas.map((consulta) => (
          <CardConsulta
            key={consulta.id}
            tipoConsulta={consulta.tipoConsulta}
            medico={consulta.medico}
            data={consulta.data}
            horario={consulta.horario}
            local={consulta.local}
            onEditar={() =>
              router.push({
                pathname: "/consultas/editar",
                params: {
                  id: consulta.id.toString(),
                },
              })
            }
            onExcluir={() => excluirConsulta(consulta.id)}
          />
        ))
      )}
    </Layout>
  );
}
