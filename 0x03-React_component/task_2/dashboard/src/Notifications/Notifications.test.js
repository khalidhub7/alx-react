import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';
import { listNotifications } from '../App/App';

describe('test Notifications component', () => {
  test(
    'notifications component renders without crashing',
    () => {
      const { container } = render(<Notifications />);
      expect(container).toBeInTheDocument();
    },
  );

  // tests before using NotificationItem component
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
    'renders (notifications component) with correct content',
    () => {
      const scenarios = [
        { displayDrawer: true, listNotifications: [] },
        { displayDrawer: true, listNotifications },
      ];
      const selectors = [
        'div.menuItem + li', // if no notification
        '.Notifications > ul:first-of-type > li', // if notification
      ];
      const expected = [
        ['No new notification for now'],
        // verify first NotificationItem content
        ['New course available'],
      ];

      scenarios.forEach((s, i) => {
        const { container } = render(
          <Notifications
            displayDrawer={s.displayDrawer}
            listNotifications={s.listNotifications}
          />,
        );
        expected[i].forEach((e) => {
          if (i === 1) {
          // that mean if notifications
            expect(
            // check notification title
              container.querySelector('.Notifications p').textContent,
            ).toBe('Here is the list of notifications');
          }
          const result = container.querySelector(selectors[i]).textContent;

          expect(result).toBe(e);
        });
      });
    },
  );

  // new tests (refactor)
  test(// DRY applied here
    'Notifications show if displayDrawer (menuItem always visible)',
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

  test('test component methods', () => {
    const mockConsole = jest.spyOn(console, 'log')
      .mockImplementation(() => {});

    const { container } = render(<Notifications
      displayDrawer
      listNotifications={listNotifications}
    />);

    // target first item so id is 1
    fireEvent.click(container.querySelector(
      '.Notifications > ul:first-of-type > li',
    ));

    expect(mockConsole).toHaveBeenCalledTimes(1);
    expect(mockConsole).toHaveBeenCalledWith(
      'Notification 1 has been marked as read',
    );
    mockConsole.mockRestore();
  });
});
