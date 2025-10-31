import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';
import { listNotifications } from '../App/App';

describe('NotificationItem tests', () => {
  test('renders without crashing', () => {
    render(<NotificationItem />);
  });

  test(
    'renders NotificationItem correctly for both (html, value) props',
    () => {
      const scenarios = [
        {
          type: 'default',
          html: { __html: '<u>test</u>' },
          value: undefined,
        },
        { type: 'default', html: undefined, value: 'test_notif' },
      ];
      const expected = ['test', 'test_notif'];

      scenarios.forEach((p, i) => {
        const { container } = render(
          <NotificationItem
            type={p.type}
            html={p.html}
            value={p.value}
          />,
        );
        expect(container.querySelector('li').textContent)
          .toEqual(expected[i]);
      });
    },
  );

  test('test component methods', () => {
    const {
      id, type, value, html,
    } = listNotifications[0];
    const mockMarkAsRead = jest.fn();

    const { container } = render(
      <NotificationItem
        id={id}
        type={type}
        value={value}
        html={html}
        markAsRead={mockMarkAsRead}
      />,
    );

    // target first item so id is 1
    fireEvent.click(container.querySelector('li'));

    expect(mockMarkAsRead).toHaveBeenCalledTimes(1);
    expect(mockMarkAsRead).toHaveBeenCalledWith(id);
  });
});
