import { Pressable, StyleSheet, Text } from "react-native";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,

    height: 56,

    borderRadius: 16,

    justifyContent: "center",

    alignItems: "center",

    marginVertical: 10,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.15,

    shadowRadius: 8,

    elevation: 4,
  },

  pressed: {
    opacity: 0.8,
  },

  disabled: {
    backgroundColor: "#BDBDBD",
  },

  text: {
    color: "#FFFFFF",

    fontSize: Fonts.text,

    fontWeight: "700",
  },
});