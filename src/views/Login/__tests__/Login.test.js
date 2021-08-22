import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import Login from '../Login.view';

describe('Login UI tests', () => {
  beforeEach(() => {
    const div = document.createElement('div');
    div.setAttribute('id', 'login');
    render(<Login />, {
      container: document.body.appendChild(div),
    });
  });

  test('renders title, inputs and buttons', () => {
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
});
