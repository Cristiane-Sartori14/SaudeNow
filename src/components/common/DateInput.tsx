import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Spacing from "@/constants/Spacing";

interface DateInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function DateInput({
  label,
  value,
  onChangeText,
  placeholder = "dd/mm/aaaa",
}: DateInputProps) {
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  function obterDataInicial(): Date {
    if (!value) {
      return new Date();
    }

    const partes = value.split("/");

    if (partes.length === 3) {
      const dia = Number(partes[0]);
      const mes = Number(partes[1]) - 1;
      const ano = Number(partes[2]);

      const data = new Date(ano, mes, dia);

      if (!Number.isNaN(data.getTime())) {
        return data;
      }
    }

    return new Date();
  }

  function formatarData(data: Date): string {
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        style={styles.input}
        onPress={() => setMostrarCalendario(true)}
      >
        <Text style={value ? styles.text : styles.placeholder}>
          {value || placeholder}
        </Text>
      </Pressable>

      {mostrarCalendario && (
        <DateTimePicker
          value={obterDataInicial()}
          mode="date"
          display="calendar"
          onChange={(event, selectedDate) => {
            setMostrarCalendario(false);

            if (event.type === "dismissed" || !selectedDate) {
              return;
            }

            onChangeText(formatarData(selectedDate));
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },

  label: {
    fontSize: Fonts.small,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },

  input: {
    height: 56,
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    justifyContent: "center",
  },

  text: {
    fontSize: Fonts.text,
    color: Colors.text,
  },

  placeholder: {
    fontSize: Fonts.text,
    color: Colors.subtitle,
  },
});
