import React from 'react';
import { render, screen } from '@testing-library/react';
import { LandingCore } from '../components/Landing/LandingCore';

test('Renders the landing page', () => {
  render(<LandingCore />);
  const title = screen.getByText(/investing in crypto has never been so easy !/i);
  expect(title).toBeInTheDocument();

  const image = screen.getByAltText(/Dai/i);
  expect(image).toBeInTheDocument();

  const image2 = screen.getByAltText(/Chart/i);
  expect(image2).toBeInTheDocument();

});



