import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SendIntentAndroid from 'react-native-send-intent';




const RateApp = () => {
  const navigation = useNavigation();  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleRating = (value) => {
    setRating(value);
  };


const handleSubmit = () => {
  // Reset the state after sending the data.
  setRating(0);
  setComment('');
  setIsSubmitted(true);

  const smsBody = `Avaliação: ${rating}\nComentário: ${comment}`;
  const phoneNumber = '19996753121'; // Replace with the actual phone number  
  const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(smsBody)}`;

  Linking.openURL(smsUrl)
    .then(() => {
      // Display success message
      Alert.alert(
        'Avaliação Enviada',
        'Sua avaliação foi enviada com sucesso. Obrigado por utilizar o BumbaBus!',
        [{ text: 'OK', onPress: () => setIsSubmitted(false) }]
      );
    })
    .catch((error) => {
      // Handle error
      console.error('Erro ao abrir aplicativo de SMS', error);
      setIsSubmitted(false);
    });
};

    
  return (
    <View style={styles.container}>
    <View style={styles.containerHeader}>
    <TouchableOpacity onPress={handleGoBack}>
          <Icon name="arrow-left" size={25} color="#002684" style={styles.backIcon} />
        </TouchableOpacity>
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

      <Text style={styles.title}>Avalie o nosso aplicativo</Text>

      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((value) => (
          <TouchableOpacity
            key={value}
            onPress={() => handleRating(value)}
            style={styles.starButton}
          >
            <Icon
              name={value <= rating ? 'star' : 'star-o'}
              size={30}
              color={value <= rating ? '#FFD700' : '#D3D3D3'}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.commentInput}
        placeholder="Comentários (opcional)"
        value={comment}
        onChangeText={(text) => setComment(text)}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Enviar Avaliação</Text>
      </TouchableOpacity>

      {isSubmitted && (
        <Text style={styles.successMessage}>
          Sua avaliação foi enviada com sucesso. Obrigado por utilizar o BumbaBus!
        </Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  starButton: {
    marginHorizontal: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 100,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#002684',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  successMessage: {
    color: 'green',
    marginTop: 20,
    textAlign: 'center',
  },

  containerHeader: {
    marginTop: -20,
    marginBottom: '5%',
    paddingStart: '5%',

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

  backIcon: {
    marginRight: 10,
  },
});

export default RateApp;
