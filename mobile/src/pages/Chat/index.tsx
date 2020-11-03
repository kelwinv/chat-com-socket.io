import React, { useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';

import { Authentication } from '../../Context/AuthProvider';
import { socket } from '../../services/socket.io';

import { Container } from './styles';

const Chat: React.FC = () => {
  const { userName } = useContext(Authentication);

  const [testeArray,setTesteArray] = useState<string[]>([]);

  useEffect(() => {
    socket.on("user joined", (response: { username: string}) => {
      const textNewUser = `${response.username}`
      setTesteArray([textNewUser,...testeArray])
    })
  },[testeArray]);

  return (
    <Container>
        <Text>Bem vindo {userName}</Text>
        {testeArray.map(name => (
          <Text>{name}  Entrou na sala!</Text>
        ))}
    </Container>
  );
};

export default Chat;
