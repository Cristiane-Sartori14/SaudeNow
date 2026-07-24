import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Spacing from "@/constants/Spacing";

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  label: string;
  selectedValue: string;
  options: Option[];
  onValueChange: (value: string) => void;
}

export default function SelectInput({
  label,
  selectedValue,
  options,
  onValueChange,
}: SelectInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => onValueChange(itemValue)}
          style={styles.picker}
        >
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },

  label: {
    marginBottom: Spacing.sm,
    fontSize: Fonts.text,
    color: Colors.text,
    fontWeight: "600",
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.card,
    overflow: "hidden",
  },

  picker: {
    height: 50,
    width: "100%",
  },
});
