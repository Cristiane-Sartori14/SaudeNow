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
  console.log("1 - Entrou");

  const horarioFormatado = formatarHorario(novoHorario);
  console.log("2 - Formatado:", horarioFormatado);

  if (!horarioFormatado) {
    console.log("3 - Horário inválido");
    return;
  }

  if (horarios.includes(horarioFormatado)) {
    console.log("4 - Já existe");
    return;
  }

  const novosHorarios = [...horarios, horarioFormatado];
  console.log("5 - Novos horários:", novosHorarios);

  onChange(novosHorarios);

  console.log("6 - onChange executado");

  setNovoHorario("");
}

  function removerHorario(index: number) {
    onChange(horarios.filter((_, i) => i !== index));
  }

  function formatarHorario(valor: string): string | null {
    const numeros = valor.replace(/\D/g, "");

    if (numeros.length === 1 || numeros.length === 2) {
      const hora = Number(numeros);

      if (hora >= 0 && hora <= 23) {
        return `${hora.toString().padStart(2, "0")}:00`;
      }

      return null;
    }

    if (numeros.length === 3) {
      const hora = Number(numeros.substring(0, 1));
      const minuto = Number(numeros.substring(1));

      if (hora <= 9 && minuto <= 59) {
        return `${hora.toString().padStart(2, "0")}:${minuto
          .toString()
          .padStart(2, "0")}`;
      }

      return null;
    }

    if (numeros.length === 4) {
      const hora = Number(numeros.substring(0, 2));
      const minuto = Number(numeros.substring(2));

      if (hora <= 23 && minuto <= 59) {
        return `${hora.toString().padStart(2, "0")}:${minuto
          .toString()
          .padStart(2, "0")}`;
      }

      return null;
    }

    return null;
  }

  return (
    <View style={styles.container}>
      <Input
        label="Horário"
        placeholder="Ex.: 8:00"
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
            <Text style={styles.remove}>🗑</Text>
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
    fontSize: 22,
  },
});
