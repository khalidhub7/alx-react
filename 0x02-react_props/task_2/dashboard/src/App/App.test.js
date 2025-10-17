import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('test App component', () => {
  // render App without crashing
  const { container } = render(<App />);

  // check if App renders Notifications, Header, Login, Footer
  expect(
    container.querySelectorAll('div.Notifications').length,
  ).toBe(1);
  expect(
    container.querySelectorAll('div.App-header').length,
  ).toBe(1);
  expect(
    container.querySelectorAll('div.App-body').length,
  ).toBe(1);
  expect(
    container.querySelectorAll('div.App-footer').length,
  ).toBe(1);
});
