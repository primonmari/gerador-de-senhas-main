import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './src/routes/Stack.routes';
import React from 'react';
import { useCallback, useEffect } from 'react';
import config from './src/database/config'; // Importe a configuração corretamente
import { createConnection } from 'typeorm';

export default function App() {
  
  const connect = React.useCallback(async () => { //executa uma vez só sem deixar o sistema esperando
    //try catch para caso aconteça algum problema de conexão com o banco
    // a carácter de ambiente de desenvolvimento e tentar conectar várias vezes no bd q já está aberto
    // o react tem hot-reload então ao dar refresch ele tenta reconectar
    try {
      // faz conexão com o banco usando o arquivo de configrações
      const connection = await createConnection(config);

      // get all senhas
      //preciso de uma conexão para obter um repositório
      const senhas = await connection.getRepository("GeraSenha").find();
      console.log(senhas); // empty at first run
    } catch (err) {
      console.log(err);
    }
  });

  React.useEffect(() => {
    connect();
  }, []);


  return (
    <NavigationContainer>
       <StackRoutes/>
    </NavigationContainer>
  );
}
