import { Text, TextInput, TextInputProps, View, StyleSheet } from "react-native";

import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Spacing from "@/constants/Spacing";

interface Props extends TextInputProps {
  label: string;
}

export default function Input({ label, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.subtitle}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md
  },

  label: {
    fontSize: Fonts.small,
    color: Colors.text,
    marginBottom: 8,
    fontWeight: "600",
  },

  input: {
    height: 56,
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    paddingHorizontal: Spacing.md,
    fontSize: Fonts.text,
    color: Colors.text,
  },
});