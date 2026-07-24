import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

export default function Medicamentos() {
  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Meus Medicamentos
      </Text>

      <Pressable
        style={styles.botao}
        onPress={() => router.push("/medicamentos/novo")}
      >
        <Text style={styles.textoBotao}>
          + Cadastrar medicamento
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  botao: {
    backgroundColor: "#2E7D32",
    padding: 18,
    borderRadius: 12,
  },

  textoBotao: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});