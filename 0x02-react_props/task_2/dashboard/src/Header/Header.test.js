import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

test('test Header component', () => {
  // render Header without crashing
  const { container } = render(<Header />);

  // check one .App-header exists
  expect(
    container.querySelectorAll('.App-header'),
  ).toHaveLength(1);

  // check it has exactly img and h1 children
  const list = [];
  const elements = [
    ...container.querySelector('.App-header').children,
  ];
  elements.map((i) => list.push(i.tagName.toLowerCase()));
  expect(list).toEqual(['img', 'h1']);
});
