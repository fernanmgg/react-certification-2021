import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import Toggle from '../Toggle.component';
import { wrapWithThemeContext } from '../../../state/testing';

describe('Toggle UI tests', () => {
  test('renders checkbox', () => {
    render(wrapWithThemeContext(<Toggle />));
    const theme = screen.getByRole('checkbox', { name: /theme/i });
    expect(theme).toBeInTheDocument();
  });

  test('toggle passed value when clicked', () => {
    const toggle = jest.fn();
    render(wrapWithThemeContext(<Toggle value={false} toggle={toggle} />));
    const theme = screen.getByRole('checkbox', { name: /theme/i });
    user.click(theme);
    expect(toggle).toHaveBeenCalledTimes(1);
    expect(toggle.mock.calls[0][0]).toBe(true);
  });
});
