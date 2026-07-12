import { Pressable, StyleSheet, Text } from "react-native";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";

interface Props {
  title: string;
  onPress: () => void;
}

export default function ButtonPrimary({
  title,
  onPress,
}: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,

    height: 60,

    borderRadius: 16,

    justifyContent: "center",

    alignItems: "center",

    marginVertical: 8,
  },

  text: {
    color: "#FFF",

    fontSize: Fonts.text,

    fontWeight: "600",
  },
});