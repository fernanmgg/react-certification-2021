import React from 'react';
import { render, screen } from '@testing-library/react';

import Card from './Card.component';

describe('Card UI tests', () => {
  test('renders card with correct props', () => {
    render(
      <Card
        key="1"
        image="Test image"
        title="Test title"
        description="Test description"
      />
    );
    const title = screen.getByText(/test title/i);
    const description = screen.getByText(/test description/i);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
