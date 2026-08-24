import { useLocalSearchParams, useRouter } from "expo-router";

import { Alert, Image, StyleSheet, Text, View } from "react-native";

import PrimaryButton from "@/components/common/PrimaryButton";
import Layout from "@/components/layout/Layout";
import ScreenHeader from "@/components/layout/ScreenHeader";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Spacing from "@/constants/Spacing";
import { Exercicio } from "@/types/exercicio";

const exercicios: Exercicio[] = [
  {
    id: "1",
    nome: "Movimento do tornozelo",
    descricao:
      "Movimente os pés lentamente para cima e para baixo, respeitando seus limites.",
    repeticoes: "3 séries de 10 repetições",
    posicao: "Sentado ou deitado",
    imagem: require("../../assets/logos/movimento-tornozelo.png"),
  },
  {
    id: "2",
    nome: "Fortalecimento da coxa",
    descricao:
      "Sentado, estique e dobre o joelho lentamente, alternando as pernas.",
    repeticoes: "3 séries de 10 a 15 repetições",
    posicao: "Sentado",
  },
  {
    id: "3",
    nome: "Elevação dos braços",
    descricao:
      "Sentado, levante e abaixe os braços lentamente, sem forçar os ombros.",
    repeticoes: "2 séries de 6 a 8 repetições",
    posicao: "Sentado",
  },
  {
    id: "4",
    nome: "Flexão de tronco",
    descricao:
      "Sentado em uma cadeira firme, incline o tronco para frente e retorne lentamente.",
    repeticoes: "3 séries de 10 repetições",
    posicao: "Sentado",
  },
  {
    id: "5",
    nome: "Levantar e sentar",
    descricao:
      "Utilize uma cadeira firme. Levante e sente novamente de forma lenta e segura.",
    repeticoes: "2 a 3 séries de 6 a 10 repetições",
    posicao: "Em pé",
  },
  {
    id: "6",
    nome: "Movimentos da cabeça",
    descricao:
      "Movimente a cabeça lentamente para os lados, para cima e para baixo.",
    repeticoes: "10 repetições para cada movimento",
    posicao: "Sentado",
  },
];

export default function DetalheExercicioScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const exercicio = exercicios.find((item) => item.id === id);

  if (!exercicio) {
    return (
      <Layout>
        <Text>Exercício não encontrado.</Text>
      </Layout>
    );
  }

  function concluirExercicio() {
    Alert.alert(
      "Exercício concluído",
      "Muito bem! Sua atividade foi registrada.",
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ],
    );
  }

  return (
    <Layout>
      <ScreenHeader
        title={exercicio.nome}
        subtitle="Siga as orientações com calma e segurança."
      />

      {exercicio.imagem && (
        <Image
          source={exercicio.imagem}
          style={styles.imagem}
          resizeMode="contain"
        />
      )}

      <View style={styles.card}>
        <Text style={styles.label}>Como realizar</Text>

        <Text style={styles.descricao}>{exercicio.descricao}</Text>
        <Text style={styles.label}>Posição</Text>

        <Text style={styles.info}>{exercicio.posicao}</Text>

        <Text style={styles.label}>Repetições</Text>

        <Text style={styles.info}>{exercicio.repeticoes}</Text>
      </View>

      <View style={styles.aviso}>
        <Text style={styles.avisoTitulo}>⚠️ Atenção</Text>

        <Text style={styles.avisoTexto}>
          Respeite seus limites.
          {"\n"}
          Se sentir dor ou desconforto, interrompa o exercício.
        </Text>
      </View>

      <PrimaryButton title="Concluir exercício" onPress={concluirExercicio} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: Spacing.md,
    elevation: 2,
    marginBottom: Spacing.md,
  },

  label: {
    fontSize: Fonts.text,
    fontWeight: "700",
    color: Colors.primary,
    marginTop: 8,
    marginBottom: 6,
  },

  descricao: {
    fontSize: Fonts.text,
    color: Colors.text,
    lineHeight: 24,
  },

  info: {
    fontSize: Fonts.text,
    color: Colors.text,
    marginBottom: 8,
  },

  aviso: {
    backgroundColor: "#FFF8E1",
    borderRadius: 10,
    padding: Spacing.sm,
    marginBottom: Spacing.md,
  },

  avisoTitulo: {
    fontSize: Fonts.text,
    fontWeight: "700",
    color: "#6B5A00",
    marginBottom: 4,
  },

  avisoTexto: {
    fontSize: Fonts.text,
    color: "#6B5A00",
    lineHeight: 18,
  },

  imagem: {
    width: "100%",
    height: 160,
    marginBottom: Spacing.md,
  },
});
