import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PasswordGenerator from '../MainScreens/PasswordGenerator'; 
import SavedPasswordsScreen from '../MainScreens/SavedPasswordsScreen';

const Stack = createStackNavigator();

function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="PasswordGenerator" 
        component={PasswordGenerator}        
        options={{ title: 'Gerador de Senha' }} // Definindo o título da tela
      />
      <Stack.Screen 
        name="SavedPasswordsScreen" 
        component={SavedPasswordsScreen}
        options={{ 
          title: 'Biblioteca de senhas',
          headerStyle: { backgroundColor: '#274135' }, // Cor de fundo do cabeçalho
          headerTintColor: '#ffffff', // Cor do texto do título e do botão Voltar
        }} // Definindo o título da tela
      />
    </Stack.Navigator>
  );
}

export default StackRoutes;
