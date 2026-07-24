import { StyleSheet, Text, TextInput, View } from "react-native";

import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Spacing from "@/constants/Spacing";

interface TextAreaProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  numberOfLines?: number;
}

export default function TextArea({
  label,
  value,
  onChangeText,
  placeholder,
  numberOfLines = 4,
}: TextAreaProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        multiline
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.subtitle}
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
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: Spacing.md,
    fontSize: Fonts.text,
    color: Colors.text,
    minHeight: 110,
  },
});