import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native'; 
import { getConnection } from 'typeorm'; // Importe getConnection
import GeraSenha from '../database/entities/GeraSenha';

const PasswordGenerator = () => {
  const [senha, setSenha] = useState(''); //senha 
  const [comprimentoSenha, setComprimentoSenha] = useState(8); //comprimento senha 
  const [mostrarPopup, setMostrarPopup] = useState(false); //visibilidade do modal
  const navigation = useNavigation(); 

  //gera senha com o comprimento desejado
  const gerarSenha = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@-#';
    let novaSenha = '';
    for (let i = 0; i < comprimentoSenha; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        novaSenha += caracteres.charAt(indiceAleatorio);
    }
    setSenha(novaSenha);
    setMostrarPopup(true);
  };

  const salvarSenha = async () => {
    setMostrarPopup(false);
    
    try {
      const connection = await getConnection(); //conexão com o bd 
      await connection.getRepository(GeraSenha).save({ password: senha }); //salva senha no bd 
      console.log('Senha salva com sucesso!');
      
      // Navegar para a tela SavedPasswordsScreen e passar a senha como parâmetro
      navigation.navigate('SavedPasswordsScreen', { senhaSalva: senha });
    } catch (error) {
      console.error('Erro ao salvar a senha:', error);
    }
  };

  const limparSenha = () => {
    setSenha('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerImg}>
        <Image source={require('../img/logo.png')} style={styles.imagem} />
      </View>

      <View style={styles.containerSlider}>
        <Slider
          style={styles.slider}
          minimumValue={8}
          maximumValue={32}
          step={1}
          value={comprimentoSenha}
          onValueChange={(value) => setComprimentoSenha(value)}
          thumbTintColor="#274135"
          minimumTrackTintColor="#274135"
        />
      </View>

      <Text style={styles.comprimento}>{`Comprimento da senha: ${comprimentoSenha}`}</Text>

      <TouchableOpacity style={styles.botao} onPress={gerarSenha}>
        <Text style={styles.textoBotao}>Gerar Senha</Text>
      </TouchableOpacity>

      <Modal visible={mostrarPopup} transparent={true} animationType="slide">
        <View style={styles.popupContainer}>
          <Text style={styles.popupTitle}>Senha gerada:</Text>

          <View style={styles.containerSenha}>
            <Text style={styles.popupSenha}>{senha}</Text>
          </View>

          <View style={styles.containerBotoesModal}>
            <TouchableOpacity style={styles.botaoModal} onPress={salvarSenha}> 
              <Text style={styles.textoBotaoModal}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoModal} onPress={() => { setMostrarPopup(false); limparSenha(); }}>
              <Text style={styles.textoBotaoModal}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#274135',
  },
  containerImg: {
    justifyContent: 'center',
    alignItems: 'center',    
    marginBottom: 10,
    marginTop: 30,
  },
  imagem: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  containerSlider: {
    backgroundColor: '#FFFFFF',
    height: 50,
    width: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 25,
  },
  slider: {
    width: '80%',
    height: 40,
    marginBottom: 20,
  },
  comprimento: {
    fontSize: 16,
    marginBottom: 20,
    color: '#fff',
  },
  botao: {
    backgroundColor: '#d5d6d1',
    padding: 10,
    borderRadius: 5,
  },
  textoBotao: {
    color: '#274135',
    fontSize: 16,
  },
  popupContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 50,
    marginTop: 250,
  },
  popupTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  containerSenha:{
    backgroundColor:'#274135',
    height: 50,
    width: 200, 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupSenha: {
    fontSize: 16,
    color: '#FFFFFF',
    justifyContent:'center',
    alignItems: 'center',
  },
  containerBotoesModal:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botaoModal: {
    backgroundColor: '#d5d6d1',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 5,
  },
  textoBotaoModal: {
    color: '#274135',
    fontSize: 16,
  },
});

export default PasswordGenerator;
