import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

export default function CadastrarMedicamento() {

  const [nome, setNome] = useState("");
  const [principioAtivo, setPrincipioAtivo] = useState("");
  const [dosagem, setDosagem] = useState("");
  const [horario, setHorario] = useState("");
  const [frequencia, setFrequencia] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [observacao, setObservacao] = useState("");

  function salvarMedicamento() {

    if (!nome || !dosagem || !horario) {
      Alert.alert(
        "Atenção",
        "Preencha nome, dosagem e horário."
      );
      return;
    }

    const medicamento = {
      nome,
      principioAtivo,
      dosagem,
      horario,
      frequencia,
      dataInicio,
      observacao
    };

    console.log(medicamento);

    Alert.alert(
      "Sucesso",
      "Medicamento cadastrado!"
    );
  }


  return (

    <ScrollView style={styles.container}>

      <Text style={styles.titulo}>
        Cadastro de Medicamento
      </Text>


      <Text style={styles.label}>
        Nome do medicamento *
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Losartana 50mg"
        value={nome}
        onChangeText={setNome}
      />


      <Text style={styles.label}>
        Princípio ativo
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Losartana potássica"
        value={principioAtivo}
        onChangeText={setPrincipioAtivo}
      />


      <Text style={styles.label}>
        Dosagem *
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 1 comprimido"
        value={dosagem}
        onChangeText={setDosagem}
      />


      <Text style={styles.label}
      >
        Horário da tomada *
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 08:00"
        keyboardType="numbers-and-punctuation"
        value={horario}
        onChangeText={setHorario}
      />


      <Text style={styles.label}>
        Frequência
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Uma vez ao dia"
        value={frequencia}
        onChangeText={setFrequencia}
      />


      <Text style={styles.label}>
        Data de início
      </Text>

      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        value={dataInicio}
        onChangeText={setDataInicio}
      />


      <Text style={styles.label}>
        Observações
      </Text>

      <TextInput
        style={[
          styles.input,
          styles.textArea
        ]}
        placeholder="Ex: Tomar após o café"
        multiline
        value={observacao}
        onChangeText={setObservacao}
      />


      <TouchableOpacity
        style={styles.botao}
        onPress={salvarMedicamento}
      >

        <Text style={styles.textoBotao}>
          Salvar medicamento
        </Text>

      </TouchableOpacity>


    </ScrollView>

  );
}



const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    backgroundColor:"#fff"
  },

  titulo:{
    fontSize:26,
    fontWeight:"bold",
    marginBottom:25,
    textAlign:"center"
  },

  label:{
    fontSize:16,
    marginBottom:6,
    marginTop:12,
    fontWeight:"600"
  },

  input:{
    borderWidth:1,
    borderColor:"#ccc",
    borderRadius:10,
    padding:14,
    fontSize:16
  },

  textArea:{
    height:100,
    textAlignVertical:"top"
  },

  botao:{
    backgroundColor:"#2e86de",
    padding:16,
    borderRadius:12,
    marginTop:30,
    marginBottom:40
  },

  textoBotao:{
    color:"#fff",
    fontSize:18,
    textAlign:"center",
    fontWeight:"bold"
  }

});