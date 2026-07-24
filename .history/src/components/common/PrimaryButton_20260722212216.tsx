import { Pressable, StyleSheet, Text } from "react-native";

import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Spacing from "@/constants/Spacing";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
}

export default function PrimaryButton({
  title,
  onPress,
}: PrimaryButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: Spacing.lg,
  },

  text: {
    color: "#FFFFFF",
    fontSize: Fonts.button,
    fontWeight: "700",
  },
});