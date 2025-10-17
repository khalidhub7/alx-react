import React from 'react';
import { render } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem tests', () => {
  let container;
  let text;
  test('renders without crashing', () => {
    ({ container } = render(<NotificationItem />));
  });

  test('renders correct html when html prop given', () => {
    ({ container } = render(
      <NotificationItem
        type="default"
        html="<u>test</u>"
      />,
    ));
    text = container.querySelector('li').textContent;
    expect(text).toEqual('test');
  });

  test('renders correct value when props given', () => {
    ({ container } = render(
      <NotificationItem
        type="default"
        value="test_notif"
      />,
    ));
    text = container.querySelector('li').textContent;
    expect(text).toEqual('test_notif');
  });
});
