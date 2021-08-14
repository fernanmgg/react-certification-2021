import React from 'react';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import Toggle from '../Toggle.component';

describe('Toggle UI tests', () => {
  test('renders checkbox', () => {
    // eslint-disable-next-line no-undef
    renderWithThemeContext(<Toggle />);
    const theme = screen.getByRole('checkbox', { name: /theme/i });
    expect(theme).toBeInTheDocument();
  });

  test('toggle passed value when clicked', () => {
    const toggle = jest.fn();
    // eslint-disable-next-line no-undef
    renderWithThemeContext(<Toggle value={false} toggle={toggle} />);
    const theme = screen.getByRole('checkbox', { name: /theme/i });
    user.click(theme);
    expect(toggle).toHaveBeenCalledTimes(1);
    expect(toggle.mock.calls[0][0]).toBe(true);
  });
});
