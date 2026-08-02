import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Spacing from "@/constants/Spacing";

interface CardMedicamentoProps {
  nome: string;
  dosagem: string;
  unidade: string;
  horarios: string[];
  onEditar: () => void;
  onExcluir: () => void;
}

export default function CardMedicamento({
  nome,
  dosagem,
  unidade,
  horarios,
  onEditar,
  onExcluir,
}: CardMedicamentoProps) {
  const horariosOrdenados = [...horarios].sort((a, b) => {
    const [ha, ma] = a.split(":").map(Number);
    const [hb, mb] = b.split(":").map(Number);

    return ha * 60 + ma - (hb * 60 + mb);
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="pill"
            size={30}
            color={Colors.primary}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.nome}>{nome}</Text>
          <Text style={styles.dosagem}>
            {dosagem}
          </Text>

          <View style={styles.horarioContainer}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={16}
              color={Colors.secondary}
            />

            <Text style={styles.horarios}>{horariosOrdenados.join(" • ")}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.button} onPress={onEditar}>
          <MaterialCommunityIcons
            name="pencil"
            size={20}
            color={Colors.primary}
          />
          <Text style={styles.buttonText}>Editar</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={onExcluir}>
          <MaterialCommunityIcons
            name="delete"
            size={20}
            color={Colors.danger}
          />
          <Text style={[styles.buttonText, { color: Colors.danger }]}>
            Excluir
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    flex: 1,
    marginLeft: Spacing.md,
  },

  nome: {
    fontSize: Fonts.subtitle,
    fontWeight: "700",
    color: Colors.text,
  },

  dosagem: {
    marginTop: 4,
    fontSize: Fonts.text,
    color: Colors.subtitle,
  },

  horarioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  horarios: {
    marginLeft: 4,
    color: Colors.primary,
    fontSize: Fonts.small,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: Spacing.lg,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: Spacing.lg,
  },

  buttonText: {
    marginLeft: Spacing.xs,
    fontSize: Fonts.small,
    color: Colors.primary,
    fontWeight: "600",
  },
});
