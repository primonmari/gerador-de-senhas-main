import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native'; // Importar o hook useNavigation

const PasswordGenerator = () => {
  const [senha, setSenha] = useState('');
  const [comprimentoSenha, setComprimentoSenha] = useState(8);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const navigation = useNavigation(); // Inicializar o hook useNavigation


  const gerarSenha = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@-#  ';
    let novaSenha = '';
    for (let i = 0; i < comprimentoSenha; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      novaSenha += caracteres.charAt(indiceAleatorio);
    }
    setSenha(novaSenha);
    setMostrarPopup(true);
  };

  const salvarSenha = () => {
    setMostrarPopup(false); // Fechar o modal
    // Lógica para salvar a senha
    navigation.navigate('SavedPasswordsScreen', { senhaSalva: senha }); // Navegar para a nova tela e passar a senha como parâmetro
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
          thumbTintColor="#274135" // Cor do seletor
          minimumTrackTintColor="#274135" // Cor da barra ao puxar o seletor
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
          <TouchableOpacity style={styles.botaoModal} onPress={() => setMostrarPopup(false)}>
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
    height: 50, // Ajustando a altura para torná-lo mais comprido
    width: 200, // Ajustando a largura para torná-lo mais largo
    borderRadius: 10, // Adicionando borda arredondada
    justifyContent: 'center', // Centralizando o conteúdo verticalmente
    alignItems: 'center', // Centralizando o conteúdo horizontalmente
    marginBottom: 10, // Espaço abaixo do seletor
    paddingTop: 25,
  },

  slider: {
    width: '80%', // Tornando o slider 80% do contêiner
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
    marginHorizontal: 5, //espacamento entre laterais direita e esquerda 
  },
  textoBotaoModal: {
    color: '#274135',
    fontSize: 16,
  },
});

export default PasswordGenerator;
