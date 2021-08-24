import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';

import {
  Modal,
  Title,
  ErrorMessage,
  InputWrapper,
  Input,
  InputLabel,
  Checkbox,
  ButtonWrapper,
  Button,
} from './Login.style';
import { VideoContext } from '../../state/Video.state';
import loginAPI from '../../utils/loginAPI';
import app from '../../firebase.config';

function Login({ close }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { dispatch } = useContext(VideoContext);

  function login() {
    loginAPI(username, password)
      .then((auth) => {
        setErrorMessage('');
        dispatch({ type: 'SET_AUTH', payload: { auth, remember } });
        close();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  function loginFirebase() {
    app
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(({ user }) => {
        setErrorMessage('');
        dispatch({
          type: 'SET_AUTH',
          payload: {
            auth: { id: user.uid, name: user.displayName, avatarUrl: user.photoURL },
            remember,
          },
        });
        close();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  return ReactDOM.createPortal(
    <Modal>
      <Title>Log in</Title>
      {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
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
      <Checkbox>
        <input
          type="checkbox"
          id="remember"
          name="remember"
          checked={remember}
          onChange={() => setRemember(!remember)}
        />
        <span>Remember me?</span>
      </Checkbox>
      <ButtonWrapper>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={loginFirebase}>Firebase</Button>
        <Button onClick={login}>Login</Button>
      </ButtonWrapper>
    </Modal>,
    document.getElementById('login')
  );
}

export default Login;
