import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import {
  Modal,
  Title,
  InputWrapper,
  Input,
  InputLabel,
  ButtonWrapper,
  Button,
} from './Login.style';

function Login({ close }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return ReactDOM.createPortal(
    <Modal>
      <Title>Log in</Title>
      <InputWrapper htmlFor="username">
        <Input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputLabel active={username !== ''}>Username</InputLabel>
      </InputWrapper>
      <InputWrapper htmlFor="password">
        <Input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputLabel active={password !== ''}>Password</InputLabel>
      </InputWrapper>
      <ButtonWrapper>
        <Button onClick={close}>Cancel</Button>
        <Button>Login</Button>
      </ButtonWrapper>
    </Modal>,
    document.getElementById('login')
  );
}

export default Login;
