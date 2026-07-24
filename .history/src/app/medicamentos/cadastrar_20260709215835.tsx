import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";

import { styles } from "./cadastrar.styles";


export default function CadastrarMedicamento(){

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.titulo}>
        Cadastro de Medicamento
      </Text>


      <TextInput
        style={styles.input}
        placeholder="Nome do medicamento"
      />


      <TouchableOpacity style={styles.botao}>
        <Text style={styles.textoBotao}>
          Salvar
        </Text>
      </TouchableOpacity>


    </ScrollView>

  );
}