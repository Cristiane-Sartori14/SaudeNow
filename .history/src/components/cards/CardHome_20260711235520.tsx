import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

interface Props {
  icon: IconName;
  title: string;
  subtitle: string;
  onPress: () => void;
}

export default function CardHome({ icon, title, subtitle, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={icon as any}
          size={32}
          color={Colors.primary}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,

    borderRadius: 20,

    padding: 20,

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 18,

    elevation: 3,
  },

  iconContainer: {
    width: 65,

    height: 65,

    borderRadius: 32,

    backgroundColor: "#E8F5E9",

    justifyContent: "center",

    alignItems: "center",
  },

  icon: {
    fontSize: 30,
  },

  textContainer: {
    marginLeft: 18,

    flex: 1,
  },

  title: {
    fontSize: Fonts.subtitle,

    fontWeight: "700",

    color: Colors.text,
  },

  subtitle: {
    marginTop: 4,

    fontSize: Fonts.small,

    color: Colors.subtitle,
  },
});
