import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../App.component';
import * as useFetch from '../../../utils/hooks/useFetch';

useFetch.default = jest.fn(() => ({ videos: [], loading: false, error: false }));

describe('App UI tests', () => {
  test('renders header and home view', () => {
    render(<App />);
    const header = screen.getByText(/dark mode/i);
    const homeView = screen.getByText(/react bootcamp 2021/i);
    expect(header).toBeInTheDocument();
    expect(homeView).toBeInTheDocument();
    expect(useFetch.default).toHaveBeenCalled();
    expect(useFetch.default).toHaveBeenCalledWith('wizeline');
  });
});
