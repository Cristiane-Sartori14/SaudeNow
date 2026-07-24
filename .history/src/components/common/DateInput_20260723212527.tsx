import { TextInput, View, Text, StyleSheet } from "react-native";

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
  return (
<TextInput
  style={styles.input}
  value={value}
  onChangeText={(text) => {
    const numeros = text.replace(/\D/g, "").slice(0, 8);

    let data = numeros;

    if (numeros.length > 2) {
      data = `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
    }

    if (numeros.length > 4) {
      data = `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
    }

    onChangeText(data);
  }}
  placeholder={placeholder}
  placeholderTextColor={Colors.subtitle}
  keyboardType="numeric"
  maxLength={10}
/>
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
  borderWidth: 1,
  borderColor: Colors.border,
  borderRadius: 10,
  paddingHorizontal: Spacing.md,
  paddingVertical: 12,
  fontSize: Fonts.text,
  color: Colors.text,
}
});