import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

interface LayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function Layout({ title, subtitle, children }: LayoutProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{title}</Text>

        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

        <View style={styles.body}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.text,
  },

  subtitle: {
    marginTop: 8,
    fontSize: Fonts.text,
    color: Colors.subtitle,
    marginBottom: 24,
  },

  body: {
    marginTop: 10,
  },
});
