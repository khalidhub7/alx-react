import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Notifications from './Notifications';

describe('test Notifications component', () => {
  test(
    'notifications component renders without crashing',
    () => {
      const { container } = render(<Notifications />);
      expect(container).toBeInTheDocument();
    },
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

  // tests after using NotificationItem component

  test(
    'renders notifications title and first NotificationItem correctly',
    () => {
    /*
      what test
      shows the notifications title (p)
      at least one li means NotificationItem component (rendered)
      first NotificationItem has correct HTML
      */
      const { container } = render(<Notifications displayDrawer />);
      const selectors = [
        '.Notifications > p',
        '.Notifications > ul:first-of-type > li',
      ];
      const expected = [
        'Here is the list of notifications',
        'New course available',
      ];

      selectors.forEach((s, i) => {
        expect(container.querySelector(s).textContent).toBe(
          expected[i],
        );
      });
    },
  );

  // new tests (refactor)

  test(// DRY applied here
    'Notifications visible depends on displayDrawer and menuItem always displayed',
    () => {
      const scenarios = [
        { displayDrawer: false, menuItem: true, notifications: false },
        { displayDrawer: true, menuItem: true, notifications: true },
      ];
      scenarios.forEach((s) => {
      // render component
        const { container } = render(
          <Notifications displayDrawer={s.displayDrawer} />,
        );
        // check menu visibility
        expect(container.querySelectorAll('.menuItem').length).toBe(1);
        // check notifications visibility
        expect(!!container.querySelector('div.Notifications')).toBe(
          s.notifications,
        );
      });
    },
  );
});
