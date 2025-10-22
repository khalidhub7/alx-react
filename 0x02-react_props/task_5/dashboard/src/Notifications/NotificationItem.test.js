import React from 'react';
import { render } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem tests', () => {
  test('renders without crashing', () => {
    render(<NotificationItem />);
  });

  test(
    'renders NotificationItem correctly for both html and value props',
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
        expect(
          container.querySelector('li').textContent,
        ).toEqual(expected[i]);
      });
    },
  );
});
