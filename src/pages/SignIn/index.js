import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [display, setDisplay] = useState('none');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Campos Vazios", "Por favor, preencha todos os campos.");
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Animatable.Image
          animation="flipInY"
          source={require('../../assets/logo.png')}
          style={styles.imgLogo}
          resizeMode="contain"
        />
        <Text style={styles.titleImg}>
          Sua experiência personalizada no transporte público
        </Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.titleLog}>Login</Text>
        <Text style={styles.titleLogSub}>Sign in to continue.</Text>

        <Text style={styles.title1}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite seu e-mail"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <Text style={styles.title2}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite sua senha"
            style={styles.input}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="#FFF"
              style={styles.passwordVisibilityIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
        style={styles.button}
        onPress={handleLogin} // Alterado para chamar a função handleLogin
      >
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>
            Não possui uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },

  scrollViewContent: {
    flexGrow: 1,
  },

  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%'
  },

  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF'
  },

  containerForm: {
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
    marginTop: 15,
    color: '#FFF',
    borderRadius: 20,
    backgroundColor: '#cbd7e7',
  },

  inputIcon: {
    marginRight: 10,
    color: '#FFF',
  },


  input: {
    flex: 1,
    fontSize: 15,
    marginLeft: 20,
  },

  passwordVisibilityIcon: {
    marginLeft: -30,
    color: '#000'
  },

  button: {
    backgroundColor: '#f85e01',
    width: '60%', // Aumente a largura do botão para 60%
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // Centralize horizontalmente
    borderRadius: 5, // Adicione um raio de borda para torná-lo mais arredondado
    marginTop: 20, // Ajuste o espaçamento superior
  },


  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  buttonIcon: {
    marginRight: 10,
  },

  buttonRegister: {
    marginTop: 20,
    alignSelf: 'center',
  },

  registerText: {
    color: '#a1a1a1',
    fontSize: 15,
    textDecorationLine: 'underline',
    marginBottom: 35,
  },

  title1: {
    marginTop: 20,
    fontSize: 15,
    color: '#FFF',
  },

  title2: {
    marginTop: 20,
    fontSize: 15,
    color: '#FFF',
  },

  imgLogo: {
    width: 380,
    height: 200,
  },

  titleLog: {
    marginTop: 20,
    fontSize: 15,
    color: '#FFF',
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
  },

  titleLogSub: {
    marginTop: 2,
    fontSize: 15,
    color: '#FFF',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },

  titleImg: {
    marginTop: 2,
    fontSize: 15,
    color: '#666664',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

  

})
