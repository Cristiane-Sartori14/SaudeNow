import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Spacing from "@/constants/Spacing";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
}

export default function ScreenHeader({
  title,
  subtitle,
  showBackButton = true,
}: ScreenHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {showBackButton && (
        <Pressable
          style={styles.backButton}
          onPress={() => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/medicamentos");
  }
}}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={28}
            color={Colors.primary}
          />
        </Pressable>
      )}

      <Text style={styles.title}>{title}</Text>

      {subtitle && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },

  backButton: {
    marginBottom: Spacing.md,
    alignSelf: "flex-start",
  },

  title: {
    fontSize: Fonts.title,
    fontWeight: "700",
    color: Colors.text,
  },

  subtitle: {
    marginTop: Spacing.sm,
    fontSize: Fonts.text,
    color: Colors.subtitle,
  },
});