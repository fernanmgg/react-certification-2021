import React from 'react';
import { render, screen, act } from '@testing-library/react';
import user from '@testing-library/user-event';

import Login from '../Login.component';
import { wrapWithVideoContext } from '../../../state/testing';
import * as loginAPI from '../../../utils/loginAPI';
import * as app from '../../../firebase.config';

const controlledPromise = () => {
  let deferred;
  const promise = new Promise((resolve, reject) => {
    deferred = { resolve, reject };
  });
  return { deferred, promise };
};

describe('Login UI tests', () => {
  test('renders title, inputs and buttons', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'login');
    render(wrapWithVideoContext(<Login />, {}, jest.fn()), {
      container: document.body.appendChild(div),
    });
    const title = screen.getByText(/log in/i);
    const username = screen.getByLabelText(/username/i);
    const password = screen.getByLabelText(/password/i);
    const cancel = screen.getByRole('button', { name: /cancel/i });
    const firebase = screen.getByRole('button', { name: /firebase/i });
    const login = screen.getByRole('button', { name: /login/i });
    expect(title).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(cancel).toBeInTheDocument();
    expect(firebase).toBeInTheDocument();
    expect(login).toBeInTheDocument();
  });

  test('input style is changed when user types', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'login');
    render(wrapWithVideoContext(<Login />, {}, jest.fn()), {
      container: document.body.appendChild(div),
    });
    const username = screen.getByLabelText(/username/i);
    const password = screen.getByLabelText(/password/i);
    const usernameLbl = screen.getByText(/username/i);
    const passwordLbl = screen.getByText(/password/i);
    const usernameClass = usernameLbl.className;
    const passwordClass = passwordLbl.className;
    user.type(username, 'test');
    user.type(password, 'test');
    expect(usernameClass).not.toBe(usernameLbl.className);
    expect(passwordClass).not.toBe(passwordLbl.className);
    user.clear(username);
    user.clear(password);
    expect(usernameClass).toBe(usernameLbl.className);
    expect(passwordClass).toBe(passwordLbl.className);
  });

  test('passed close prop is called when clicking cancel button', () => {
    const close = jest.fn();
    const div = document.createElement('div');
    div.setAttribute('id', 'login');
    render(wrapWithVideoContext(<Login close={close} />, {}, jest.fn()), {
      container: document.body.appendChild(div),
    });
    const cancel = screen.getByRole('button', { name: /cancel/i });
    user.click(cancel);
    expect(close).toHaveBeenCalledTimes(1);
  });

  test('dispatch is called with valid credentials, remember false', async () => {
    const auth = { id: '123', name: 'test', avatarUrl: 'test' };
    const { deferred, promise } = controlledPromise();
    const dispatch = jest.fn();
    loginAPI.default = jest.fn(() => promise);
    const div = document.createElement('div');
    div.setAttribute('id', 'login');
    render(wrapWithVideoContext(<Login />, {}, dispatch), {
      container: document.body.appendChild(div),
    });
    const username = screen.getByLabelText(/username/i);
    const password = screen.getByLabelText(/password/i);
    const login = screen.getByRole('button', { name: /login/i });
    user.type(username, 'test');
    user.type(password, 'test');
    expect(sessionStorage.getItem('auth')).toBeNull();
    await act(async () => {
      user.click(login);
      deferred.resolve(auth);
    });
    expect(JSON.parse(sessionStorage.getItem('auth'))).toEqual(auth);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_AUTH',
      payload: { auth, favorites: [] },
    });
  });

  test('dispatch is called with valid credentials, remember true', async () => {
    const auth = { id: '123', name: 'test', avatarUrl: 'test' };
    const { deferred, promise } = controlledPromise();
    const dispatch = jest.fn();
    loginAPI.default = jest.fn(() => promise);
    const div = document.createElement('div');
    div.setAttribute('id', 'login');
    render(wrapWithVideoContext(<Login />, {}, dispatch), {
      container: document.body.appendChild(div),
    });
    const username = screen.getByLabelText(/username/i);
    const password = screen.getByLabelText(/password/i);
    const remember = screen.getByLabelText(/remember/i);
    const login = screen.getByRole('button', { name: /login/i });
    user.type(username, 'test');
    user.type(password, 'test');
    user.click(remember);
    expect(localStorage.getItem('auth')).toBeNull();
    await act(async () => {
      user.click(login);
      deferred.resolve(auth);
    });
    expect(JSON.parse(localStorage.getItem('auth'))).toEqual(auth);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_AUTH',
      payload: { auth, favorites: [] },
    });
  });

  test('error message is shown with invalid credentials', async () => {
    const { deferred, promise } = controlledPromise();
    loginAPI.default = jest.fn(() => promise);
    const div = document.createElement('div');
    div.setAttribute('id', 'login');
    render(wrapWithVideoContext(<Login />, {}, jest.fn()), {
      container: document.body.appendChild(div),
    });
    const username = screen.getByLabelText(/username/i);
    const password = screen.getByLabelText(/password/i);
    const login = screen.getByRole('button', { name: /login/i });
    expect(screen.queryByText(/username or password invalid/i)).not.toBeInTheDocument();
    user.type(username, 'test');
    user.type(password, 'test');
    await act(async () => {
      user.click(login);
      deferred.reject(new Error('Username or password invalid'));
    });
    expect(screen.getByText(/username or password invalid/i)).toBeInTheDocument();
  });

  test('dispatch is called with valid firebase credentials', async () => {
    const auth = { id: '123', name: 'test', avatarUrl: 'test' };
    const authFirebase = { uid: '123', displayName: 'test', photoURL: 'test' };
    const { deferred, promise } = controlledPromise();
    const dispatch = jest.fn();
    app.default.auth = jest.fn(() => ({
      signInWithEmailAndPassword: jest.fn(() => promise),
    }));
    const div = document.createElement('div');
    div.setAttribute('id', 'login');
    render(wrapWithVideoContext(<Login />, {}, dispatch), {
      container: document.body.appendChild(div),
    });
    const username = screen.getByLabelText(/username/i);
    const password = screen.getByLabelText(/password/i);
    const firebase = screen.getByRole('button', { name: /firebase/i });
    user.type(username, 'test');
    user.type(password, 'test');
    await act(async () => {
      user.click(firebase);
      deferred.resolve({ user: authFirebase });
    });
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_AUTH',
      payload: { auth, favorites: [] },
    });
  });

  test('error message is shown with invalid firebase credentials', async () => {
    const { deferred, promise } = controlledPromise();
    app.default.auth = jest.fn(() => ({
      signInWithEmailAndPassword: jest.fn(() => promise),
    }));
    const div = document.createElement('div');
    div.setAttribute('id', 'login');
    render(wrapWithVideoContext(<Login />, {}, jest.fn()), {
      container: document.body.appendChild(div),
    });
    const username = screen.getByLabelText(/username/i);
    const password = screen.getByLabelText(/password/i);
    const firebase = screen.getByRole('button', { name: /firebase/i });
    expect(screen.queryByText(/firebase error/i)).not.toBeInTheDocument();
    user.type(username, 'test');
    user.type(password, 'test');
    await act(async () => {
      user.click(firebase);
      deferred.reject(new Error('Firebase error'));
    });
    expect(screen.getByText(/firebase error/i)).toBeInTheDocument();
  });
});
