import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';

test('test Login component', () => {
  // render Login without crashing
  const { container } = render(<Login />);

  // check one .App-body exists
  expect(
    container.querySelectorAll('.App-body'),
  ).toHaveLength(1);

  // check it has exactly p and form children
  let temp = [];

  const directChildren = [
    ...container.querySelector('.App-body').children,
  ];
  directChildren.map((i) => temp.push(
    i.tagName.toLowerCase(),
  ));

  expect(temp).toEqual(['p', 'form']);

  // check form has 2 inputs, 2 labels, 1 button
  const formElements = [
    ...container.querySelector('.App-body form').children,
  ];

  temp = [];
  formElements.map(
    (i) => temp.push(i.tagName.toLowerCase()),
  );
  expect(temp).toEqual(
    ['label', 'input', 'label', 'input', 'button'],
  );
  /* console.log(temp); */
});
