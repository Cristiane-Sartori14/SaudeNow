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
