import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

test('test App component', () => {
  // render Footer without crashing
  const { container } = render(<Footer />);

  expect(
    container.querySelectorAll('.App-footer'),
  ).toHaveLength(1);

  const text = container.querySelector('.App-footer p')
    .textContent;

  expect(text).toMatch(/^Copyright/);
  /* console.log(`*** ${text} ***`); */
});
