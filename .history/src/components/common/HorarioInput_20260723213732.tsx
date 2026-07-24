import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Input from "@/components/common/Input";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Spacing from "@/constants/Spacing";

interface HorarioInputProps {
  horarios: string[];
  onChange: (horarios: string[]) => void;
}

export default function HorarioInput({
  horarios,
  onChange,
}: HorarioInputProps) {
  const [novoHorario, setNovoHorario] = useState("");

  function adicionarHorario() {
    if (!novoHorario.trim()) {
      return;
    }

    if (horarios.includes(novoHorario)) {
      return;
    }

    onChange([...horarios, novoHorario]);

    setNovoHorario("");
  }

  function removerHorario(index: number) {
    onChange(horarios.filter((_, i) => i !== index));
  }

  return (
    <View style={styles.container}>
      <Input
        label="Horário"
        placeholder="Ex.: 08:00"
        value={novoHorario}
        onChangeText={setNovoHorario}
      />

      <Pressable style={styles.addButton} onPress={adicionarHorario}>
        <Text style={styles.addText}>+ Adicionar horário</Text>
      </Pressable>

      {horarios.map((horario, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.itemText}>🕒 {horario}</Text>
          <Pressable onPress={() => removerHorario(index)}>
            <Text style={styles.remove}>Remover</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },

  addButton: {
    alignSelf: "flex-start",
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: Spacing.md,
  },

  addText: {
    color: Colors.white,
    fontSize: Fonts.small,
    fontWeight: "600",
  },

  item: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.sm,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemText: {
    fontSize: Fonts.text,
    color: Colors.text,
  },

  remove: {
    color: Colors.danger,
    fontWeight: "600",
  },
});
