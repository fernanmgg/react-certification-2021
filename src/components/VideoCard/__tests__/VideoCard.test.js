import React from 'react';
import { render, screen } from '@testing-library/react';

import VideoCard from '../VideoCard.component';

describe('VideoCard UI tests', () => {
  test('renders card with correct props', () => {
    render(
      <VideoCard
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
