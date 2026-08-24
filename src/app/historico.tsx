import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Layout from "@/components/layout/Layout";
import ScreenHeader from "@/components/layout/ScreenHeader";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Spacing from "@/constants/Spacing";
import HistoricoRepository from "@/repositories/HistoricoRepository";
import { Historico } from "@/types/historico";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HistoricoScreen() {
  const [historico, setHistorico] = useState<Historico[]>([]);
  const [carregando, setCarregando] = useState(true);

  const carregarHistorico = useCallback(async () => {
    try {
      setCarregando(true);

      const registros = await HistoricoRepository.listar();

      setHistorico(registros);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarHistorico();
    }, [carregarHistorico]),
  );

  function formatarData(data: string): string {
    if (data.includes("T")) {
      const dataObj = new Date(data);

      if (Number.isNaN(dataObj.getTime())) {
        return data;
      }

      const dataFormatada = dataObj.toLocaleDateString("pt-BR");

      const horaFormatada = dataObj.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return `${dataFormatada} às ${horaFormatada}`;
    }

    const partes = data.split(" ");

    if (partes.length === 2) {
      const [ano, mes, dia] = partes[0].split("-");
      const [hora, minuto] = partes[1].split(":");

      return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
    }

    return data;
  }

  function obterTipo(tipo: Historico["tipo"]): string {
    switch (tipo) {
      case "exercicio":
        return "Exercício";
      case "medicamento":
        return "Medicamento";
      case "consulta":
        return "Consulta";
    }
  }

  function obterIcone(tipo: Historico["tipo"]) {
    switch (tipo) {
      case "exercicio":
        return "arm-flex";
      case "medicamento":
        return "pill";
      case "consulta":
        return "stethoscope";
      default:
        return "history";
    }
  }

  return (
    <Layout scrollable={false}>
      <ScreenHeader
        title="Histórico"
        subtitle="Acompanhe suas atividades realizadas."
      />

      {carregando ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={styles.carregando}
        />
      ) : historico.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.vazioTitulo}>Nenhuma atividade registrada</Text>

          <Text style={styles.vazioTexto}>
            As atividades concluídas aparecerão aqui.
          </Text>
        </View>
      ) : (
        <FlatList
          data={historico}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={obterIcone(item.tipo)}
                  size={26}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.info}>
                <Text style={styles.tipo}>{obterTipo(item.tipo)}</Text>

                <Text style={styles.descricao}>{item.descricao}</Text>

                <Text style={styles.data}>{formatarData(item.data)}</Text>
              </View>
            </View>
          )}
        />
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  carregando: {
    marginTop: Spacing.xl,
  },

  vazio: {
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.xl,
    marginTop: Spacing.xl,
  },

  vazioTitulo: {
    fontSize: Fonts.subtitle,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },

  vazioTexto: {
    fontSize: Fonts.text,
    color: Colors.subtitle,
    textAlign: "center",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    elevation: 2,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },

  info: {
    flex: 1,
  },

  tipo: {
    fontSize: Fonts.small,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 4,
  },

  descricao: {
    fontSize: Fonts.text,
    color: Colors.text,
    marginBottom: 6,
  },

  data: {
    fontSize: Fonts.small,
    color: Colors.subtitle,
  },
});
