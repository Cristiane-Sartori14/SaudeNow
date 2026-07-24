import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Saúde Now</Text>

      <Text style={styles.subtitulo}>Rotina de Saúde</Text>

      <Pressable
        style={styles.botao}
        onPress={() => router.push("/medicamentos")}
      >
        <Text style={styles.textoBotao}>💊 Medicamentos</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitulo: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
  },

  botao: {
    backgroundColor: "#2E7D32",
    padding: 20,
    borderRadius: 15,
  },

  textoBotao: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
});
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.logo}>SaúdeNow</Text>

      <Text style={styles.bomDia}>
        Olá, Cristiane 👋
      </Text>

      <Text style={styles.data}>
        Tenha um ótimo dia!
      </Text>

      {/* Medicamento */}

      <View style={styles.cardAzul}>
        <Text style={styles.tituloCard}>
          💊 Próximo medicamento
        </Text>

        <Text style={styles.hora}>
          08:00
        </Text>

        <Text>
          Losartana 50mg
        </Text>
      </View>

      {/* Consulta */}

      <View style={styles.cardVerde}>
        <Text style={styles.tituloCard}>
          📅 Próxima consulta
        </Text>

        <Text style={styles.hora}>
          15:30
        </Text>

        <Text>
          Cardiologista
        </Text>
      </View>

      {/* Exercício */}

      <View style={styles.cardRoxo}>
        <Text style={styles.tituloCard}>
          🚶 Exercício do dia
        </Text>

        <Text>
          Alongamento
        </Text>
      </View>

      <Pressable
        style={styles.botao}
        onPress={() => router.push("/medicamentos")}
      >
        <Text style={styles.textoBotao}>
          Ver medicamentos
        </Text>
      </Pressable>

    </ScrollView>
  );
}