import { View, Text, StyleSheet } from "react-native";

export default function NovoMedicamento() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Cadastrar Medicamento
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
  },
});