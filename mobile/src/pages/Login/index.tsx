import React, { useState } from 'react';

import { socket } from '../../services/socket.io';

import { Container, Text, FormDiv, Input, Button } from './styles';

const Login: React.FC = () => {
  const [userName,setUserName] = useState<String>();

  function handleLoginInChat(){
    if(!userName) return;

    socket.emit('add user', userName)
  }

  return (
    <Container>
      <Text>Login</Text>
      <FormDiv>
        <Input onChangeText={(text:string) => setUserName(text)} />
        <Button onPress={handleLoginInChat}  title="Logar"/>
      </FormDiv>
    </Container>
  );
};

export default Login;
