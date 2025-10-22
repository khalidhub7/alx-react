import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

/*
the components obj stores selectors for each component,
since RTL doesn’t let us access components directly by name
like Enzyme’s shallow.
*/

describe('test App component', () => {
  test('render App without crashing', () => { render(<App />); });

  test(
    'ensure App renders all essential components',
    () => {
      const { container } = render(<App displayDrawer />);
      const components = {
        notifications: 'div.Notifications',
        header: 'div.App-header',
        footer: 'div.App-footer',
      };

      Object.values(components).forEach((c) => {
        expect(container.querySelectorAll(c).length).toBe(1);
      });
    },
  );

  test(
    'renders Login or CourseList based on isLoggedIn prop',
    () => {
      const components = {
        login: 'div.App-body', // login
        CourseList: 'table#CourseList', // CourseList
      };
      const scenarios = [
        { isLoggedIn: false, loginComponent: true, CourseListComponent: false },
        { isLoggedIn: true, loginComponent: false, CourseListComponent: true },
      ];

      scenarios.forEach((s) => {
        const { container } = render(<App isLoggedIn={s.isLoggedIn} />);
        expect(
          !!container.querySelector(components.login),
        ).toBe(s.loginComponent);
        expect(
          !!container.querySelector(components.CourseList),
        ).toBe(s.CourseListComponent);
      });
    },
  );
});
