import { Image, StyleSheet, Text, View } from "react-native";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

export default function Header() {
  const hora = new Date().getHours();

  let saudacao = "Olá!";

  if (hora < 12) {
    saudacao = "Bom dia!";
  } else if (hora < 18) {
    saudacao = "Boa tarde!";
  } else {
    saudacao = "Boa noite!";
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logos/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>{saudacao}</Text>

      <Text style={styles.subtitle}>
        Como está sua saúde hoje?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    width: 180,
    height: 180,
  },

  title: {
    fontSize: Fonts.title,
    fontWeight: "700",
    color: Colors.text,
  },

  subtitle: {
    marginTop: 8,
    fontSize: Fonts.text,
    color: Colors.subtitle,
    textAlign: "center",
  },
});