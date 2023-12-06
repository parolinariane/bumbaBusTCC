import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function SignIn() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSignUp = async () => {
    if (!nome || !dataNascimento || !email || !senha || !confirmarSenha) {
      Alert.alert("Campos Vazios", "Por favor, preencha todos os campos.");
    } else if (senha !== confirmarSenha) {
      Alert.alert("Senhas Diferentes", "As senhas digitadas não coincidem.");
    } else {
      try {
        const response = await fetch('http://100.112.62.48:3001/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: nome,
            birthdate: dataNascimento.toISOString(),
            email: email,
            password: senha,
          }),
        });

        const data = await response.json();

        if (response.status === 201) {
          console.log('Usuário registrado com sucesso');
          console.log('ID do usuário:', data.userId);
          
          navigation.navigate('SignIn');
         
        } else {
          console.error('Erro ao registrar usuário:', data.error);
          Alert.alert("Erro", "Erro ao registrar usuário. Por favor, tente novamente.");
        }
      } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
        Alert.alert("Erro de Conexão", "Erro ao conectar com o servidor. Por favor, verifique sua conexão e tente novamente.");
      }
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dataNascimento;
    setShowDatePicker(Platform.OS === 'ios');
    setDataNascimento(currentDate);
  };

  const showDatePickerComponent = () => {
    setShowDatePicker(true);
  };

  const formatarData = (data) => {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
  
    return `${dia}/${mes}/${ano}`;
  };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.containerHeader}>
          <Image
            animation="flipInY"
            source={require('../../assets/logo.png')}
            style={styles.imgLogo}
            resizeMode="contain"
          />
          <Text style={styles.titleImg}>
            Sua experiência personalizada no transporte público
          </Text>
        </View>

        <View style={styles.containerForm}>
          <Text style={styles.title3}>Create New</Text>
          <Text style={styles.title4}>Account</Text>

          <Text style={styles.title1}>Nome</Text>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#000" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={(text) => setNome(text)}
            />
          </View>

          <Text style={styles.title1}>Data de Nascimento</Text>
          <View style={styles.inputContainer}>
            <Icon name="calendar" size={20} color="#000" style={styles.inputIcon} />
            <TouchableOpacity onPress={showDatePickerComponent}>
              <Text style={styles.input}>{formatarData(dataNascimento)}</Text>
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={dataNascimento}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}

          <Text style={styles.title1}>E-mail</Text>
          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="#000" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <Text style={styles.title1}>Senha</Text>
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#000" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              secureTextEntry={!showPassword}
              value={senha}
              onChangeText={(text) => setSenha(text)}
            />
            <Icon
              name={showPassword ? "eye" : "eye-slash"}
              size={20}
              color="#000"
              style={styles.passwordVisibilityIcon}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>

          <Text style={styles.title2}>Confirmar Senha</Text>
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#000" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              secureTextEntry={!showPassword}
              value={confirmarSenha}
              onChangeText={(text) => setConfirmarSenha(text)}
            />
          </View>

          <View style={styles.centeredButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  containerHeader: {
    marginTop: '5%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  
  centeredButtonContainer: {
    alignItems: 'center',
  },

  message:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF'
  },

  containerForm:{
    backgroundColor: '#022684',
    flex: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingStart: '5%',
    paddingEnd: '5%'
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    height: 48,
    marginBottom: 30,
    marginTop: 5,
    color: '#FFF',
    borderRadius: 20,
    backgroundColor: '#cbd7e7'
  },

  inputIcon: {
    marginLeft: 15,
    color: '#000',
  },

  input: {
    flex: 1,
    fontSize: 18,
    color: '#000',
    marginLeft: 20,
  },
  
  passwordVisibilityIcon: {
    marginRight: 15,
  },

  button: {
    backgroundColor: '#f85e01',
    width: '60%', 
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', 
    borderRadius: 5, 
    marginTop: 10, 
    marginBottom: 30,
    fontWeight: 'bold',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  buttonIcon: {
    marginRight: 10,
  },
  
  title1:{
    marginTop: 20,
    fontSize: 15,
    color: '#FFF',
  },

  title2:{
    marginTop: 20,
    fontSize: 15,
    color: '#FFF',
  },

  title3:{
    fontSize: 30,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 25,
    fontWeight: 'bold',

  },
  
  title4:{
    fontSize: 42,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  imgLogo:{
    width: 390,
    height: 90,
  },

  titleImg:{
    marginTop: 2,
    color: '#666664',
    textAlign: 'center',
    fontSize: 12, 
    fontWeight: 'bold', 
  },
});
