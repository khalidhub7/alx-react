import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Notifications from './Notifications';

describe('test Notifications component', () => {
  let container;

  beforeEach(() => {
    container = render(<Notifications />).container;
  });

  test(
    'notifications component renders without crashing',
    () => (expect(container).toBeInTheDocument()),
  );

  test(
    'shows the notifications title',
    () => (expect(container.querySelector(
      '.Notifications > p',
    ).textContent).toBe('Here is the list of notifications')),
  );

  // tests before using NotificationItem

  /* test(
    'renders 3 li items in notifications list',
    () => {
      expect(container.querySelectorAll(
        '.Notifications > ul:first-of-type > li',
      )).toHaveLength(3);
    },
  ); */

  // tests after using NotificationItem

  test(
    'at least one li means NotificationItem (rendered)',
    () => (expect(container.querySelectorAll(
      '.Notifications > ul:first-of-type > li',
    ).length).toBeGreaterThan(0)
    ),
  );

  test(
    'first NotificationItem has correct HTML',
    () => (expect(container.querySelector(
      '.Notifications > ul:first-of-type > li',
    ).textContent).toBe('New course available')),
  );
});
