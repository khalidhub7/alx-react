import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { listNotifications } from '../App/App';
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
    'renders notifications and NotificationItem component correctly',
    () => {
      const scenarios = [
        { displayDrawer: true, listNotifications: [] },
        { displayDrawer: true, listNotifications },
      ];
      const selectors = [
        'div.menuItem + li',
        '.Notifications > ul:first-of-type > li',
      ];
      const expected = [
        ['No new notification for now'],
        // check the first NotificationItem content
        // at least one li mean NotificationItem component rendered with success
        [listNotifications.length, 'New course available'],
      ];

      scenarios.forEach((s, i) => {
        const { container } = render(
          <Notifications
            displayDrawer={s.displayDrawer}
            listNotifications={s.listNotifications}
          />,
        );
        expected[i].forEach((e) => {
          let result;
          if (typeof e === 'number') {
            result = container.querySelectorAll(selectors[i]).length;
            expect(
              container.querySelector('.Notifications p').textContent,
            ).toBe('Here is the list of notifications');
          } else {
            result = container.querySelector(selectors[i]).textContent;
          }

          expect(result).toBe(e);
        });
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
          <Notifications
            displayDrawer={s.displayDrawer}
            listNotifications={listNotifications}
          />,
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
