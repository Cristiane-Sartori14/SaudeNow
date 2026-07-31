import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Text } from "react-native";

import CardMedicamento from "@/components/cards/CardMedicamento";
import PrimaryButton from "@/components/common/PrimaryButton";
import Layout from "@/components/layout/Layout";
import ScreenHeader from "@/components/layout/ScreenHeader";
import MedicamentoRepository from "@/repositories/MedicamentoRepository";
import { Medicamento } from "@/types/medicamento";

export default function MedicamentosScreen() {
  const router = useRouter();

  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

  useFocusEffect(
    useCallback(() => {
      carregarMedicamentos();
    }, []),
  );

  async function carregarMedicamentos() {
    try {
      const lista = await MedicamentoRepository.listar();
      setMedicamentos(lista);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os medicamentos.");
    }
  }

  async function excluirMedicamento(id: number) {
    Alert.alert(
      "Excluir medicamento",
      "Deseja realmente excluir este medicamento?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await MedicamentoRepository.remover(id);
              await carregarMedicamentos();

              Alert.alert("Sucesso", "Medicamento excluído com sucesso.");
            } catch (error) {
              console.error(error);
              Alert.alert("Erro", "Não foi possível excluir o medicamento.");
            }
          },
        },
      ],
    );
  }

  return (
    <Layout>
      <ScreenHeader
        title="Medicamentos"
        subtitle="Gerencie seus medicamentos cadastrados."
      />

      <PrimaryButton
        title="+ Novo Medicamento"
        onPress={() => router.push("/medicamentos/novo")}
      />

      {medicamentos.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            marginTop: 32,
            color: "#666",
          }}
        >
          Nenhum medicamento cadastrado.
        </Text>
      ) : (
        medicamentos.map((medicamento) => (
          <CardMedicamento
            key={medicamento.id}
            nome={medicamento.nome}
            dosagem={medicamento.dosagem}
            unidade={medicamento.unidade}
            horarios={medicamento.horarios}
            onEditar={() =>
              router.push({
                pathname: "/medicamentos/editar",
                params: {
                  id: medicamento.id.toString(),
                },
              })
            }
            onExcluir={() => excluirMedicamento(medicamento.id)}
          />
        ))
      )}
    </Layout>
  );
}
