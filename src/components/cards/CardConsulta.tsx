import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Spacing from "@/constants/Spacing";

interface CardConsultaProps {
  tipoConsulta: string;
  medico: string;
  data: string;
  horario: string;
  local: string;
  onEditar: () => void;
  onExcluir: () => void;
}

export default function CardConsulta({
  tipoConsulta,
  medico,
  data,
  horario,
  local,
  onEditar,
  onExcluir,
}: CardConsultaProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="stethoscope"
          size={28}
          color={Colors.primary}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.tipo}>{tipoConsulta}</Text>

        <Text style={styles.texto}>👨‍⚕️ {medico}</Text>

        <Text style={styles.texto}>📅 {data}</Text>

        <Text style={styles.texto}>🕘 {horario}</Text>

        <Text style={styles.texto}>📍 {local}</Text>

        <View style={styles.actions}>
          <Pressable onPress={onEditar}>
            <Text style={styles.editar}>Editar</Text>
          </Pressable>

          <Pressable onPress={onExcluir}>
            <Text style={styles.excluir}>Excluir</Text>
          </Pressable>
        </View>
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

  tipo: {
    fontSize: Fonts.subtitle,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 8,
  },

  texto: {
    fontSize: Fonts.text,
    marginBottom: 4,
    color: "#555",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 24,
    marginTop: 12,
  },

  editar: {
    color: Colors.primary,
    fontWeight: "700",
  },

  excluir: {
    color: "#D32F2F",
    fontWeight: "700",
  },
});
