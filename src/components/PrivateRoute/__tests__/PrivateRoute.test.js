import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';

import PrivateRoute from '../PrivateRoute.component';
import { wrapWithVideoContext } from '../../../state/testing';

describe('PrivateRoute tests', () => {
  test('renders private route if auth is set', () => {
    render(
      wrapWithVideoContext(
        <MemoryRouter initialEntries={['/favorites']}>
          <PrivateRoute path="/favorites">Private Route</PrivateRoute>
          <Route exact path="/">
            Public Route
          </Route>
        </MemoryRouter>,
        { auth: {} },
        jest.fn()
      )
    );
    expect(screen.getByText(/private route/i)).toBeInTheDocument();
  });

  test('redirects to public route if auth is not set', () => {
    render(
      wrapWithVideoContext(
        <MemoryRouter initialEntries={['/favorites']}>
          <PrivateRoute path="/favorites">Private Route</PrivateRoute>
          <Route exact path="/">
            Public Route
          </Route>
        </MemoryRouter>,
        { auth: null },
        jest.fn()
      )
    );
    expect(screen.getByText(/public route/i)).toBeInTheDocument();
  });
});
