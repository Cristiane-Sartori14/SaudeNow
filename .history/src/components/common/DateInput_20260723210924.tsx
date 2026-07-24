import { TextInput, View, Text, StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Spacing } from "@/constants/Spacing";

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
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray}
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
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.text,
  },
});