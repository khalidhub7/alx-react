import React from 'react';
import { StyleSheetTestUtils } from 'aphrodite';
import { render } from '@testing-library/react';
import Footer from './Footer';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

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
