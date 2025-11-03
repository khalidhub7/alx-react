import React from 'react';
import { StyleSheetTestUtils } from 'aphrodite';
import { render } from '@testing-library/react';
import App from './App';

/*
the components obj stores selectors for each component,
since RTL doesn’t let us access components directly by name
like Enzyme’s shallow.
*/

describe('test App component', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    jest.spyOn(console, 'log').mockImplementation(() => ({}));
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    console.log.mockRestore();
  });

  test('render App without crashing', () => { render(<App />); });

  test(
    'ensure App renders all essential components',
    () => {
      const { container } = render(<App />);
      const components = {
        notification: 'div.menuItem', // notification component prove
        header: 'div.App-header', // header component
        footer: 'div.App-footer', // footer component
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
        login: 'div.App-body', // login component
        CourseList: 'table#CourseList', // CourseList component
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

  test(
    'test event listeners',
    () => {
      // mocks
      const mockedEvent = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
      const logOutMock = jest.fn();
      render(<App logOut={logOutMock} />);

      document.dispatchEvent(mockedEvent);
      expect(logOutMock).toHaveBeenCalled();
      expect(alertMock).toHaveBeenCalledWith('Logging you out');
      alertMock.mockRestore();
    },
  );
});
