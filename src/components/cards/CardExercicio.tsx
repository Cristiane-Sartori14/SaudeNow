import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Spacing from "@/constants/Spacing";

interface CardExercicioProps {
  nome: string;
  repeticoes: string;
  posicao: string;
  onPress: () => void;
}

export default function CardExercicio({
  nome,
  repeticoes,
  posicao,
  onPress,
}: CardExercicioProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="arm-flex"
          size={30}
          color={Colors.primary}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.nome}>{nome}</Text>

        <Text style={styles.detalhe}>📍 {posicao}</Text>

        <Text style={styles.detalhe}>🔁 {repeticoes}</Text>

        <Pressable onPress={onPress}>
          <Text style={styles.buttonText}>Ver exercício</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    elevation: 2,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },

  info: {
    flex: 1,
  },

  nome: {
    fontSize: Fonts.subtitle,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 6,
  },

  detalhe: {
    fontSize: Fonts.small,
    color: "#666",
    marginBottom: 4,
  },

  buttonText: {
    color: Colors.primary,
    fontWeight: "700",
    marginTop: 8,
  },
});
