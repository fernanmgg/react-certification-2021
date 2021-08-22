import React from 'react';
import { render, screen, act } from '@testing-library/react';
import user from '@testing-library/user-event';

import Login from '../Login.view';
import { wrapWithVideoContext } from '../../../state/testing';
import * as loginAPI from '../../../utils/loginAPI';

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
    const login = screen.getByRole('button', { name: /login/i });
    expect(title).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(cancel).toBeInTheDocument();
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
    const div = document.createElement('div');
    div.setAttribute('id', 'login');
    const close = jest.fn();
    render(wrapWithVideoContext(<Login close={close} />, {}, jest.fn()), {
      container: document.body.appendChild(div),
    });
    const cancel = screen.getByRole('button', { name: /cancel/i });
    user.click(cancel);
    expect(close).toHaveBeenCalledTimes(1);
  });

  test('dispatch is called with valid credentials, remember false', async () => {
    const { deferred, promise } = controlledPromise();
    const div = document.createElement('div');
    div.setAttribute('id', 'login');
    const dispatch = jest.fn();
    const auth = {
      id: '123',
      name: 'test',
      avatarUrl: 'test',
    };
    loginAPI.default = jest.fn(() => promise);
    render(wrapWithVideoContext(<Login />, {}, dispatch), {
      container: document.body.appendChild(div),
    });
    const username = screen.getByLabelText(/username/i);
    const password = screen.getByLabelText(/password/i);
    const login = screen.getByRole('button', { name: /login/i });
    user.type(username, 'test');
    user.type(password, 'test');
    await act(async () => {
      user.click(login);
      deferred.resolve(auth);
    });
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_AUTH',
      payload: { auth, remember: false },
    });
  });

  test('dispatch is called with valid credentials, remember true', async () => {
    const { deferred, promise } = controlledPromise();
    const div = document.createElement('div');
    div.setAttribute('id', 'login');
    const dispatch = jest.fn();
    const auth = {
      id: '123',
      name: 'test',
      avatarUrl: 'test',
    };
    loginAPI.default = jest.fn(() => promise);
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
    await act(async () => {
      user.click(login);
      deferred.resolve(auth);
    });
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_AUTH',
      payload: { auth, remember: true },
    });
  });

  test('error message is shown with invalid credentials', async () => {
    const { deferred, promise } = controlledPromise();
    const div = document.createElement('div');
    div.setAttribute('id', 'login');
    loginAPI.default = jest.fn(() => promise);
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
});
