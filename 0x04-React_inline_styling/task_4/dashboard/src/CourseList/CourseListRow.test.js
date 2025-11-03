import React from 'react';
import '@testing-library/jest-dom';
import { StyleSheetTestUtils } from 'aphrodite';
import { render } from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('test CourseListRow component', () => {
  /*
  whats test:
      when header is true (one cell)
      when header is true (two cells)
      when header is false
  */
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  test(
    'renders CourseListRow correctly for header and regular rows',
    () => {
      const scenarios = [
        <thead>
          <CourseListRow isHeader textFirstCell="test_header" />
        </thead>,
        <thead>
          <CourseListRow
            isHeader
            textFirstCell="test_header1"
            textSecondCell="test_header2"
          />
        </thead>,
        <tbody>
          <CourseListRow
            isHeader={false}
            textFirstCell="test_header1"
            textSecondCell="test_header2"
          />
        </tbody>,
      ];
      // in expected each arg is [selector, result]
      const expected = [
        ['th', ['colspan', '2']], ['th', 2], ['tr td', 2],
      ];
      const expectedStyles = ['#deb5b545', '#deb5b545', '#f5f5f5ab'];

      scenarios.forEach((s, i) => {
        const { container } = render(<table>{s}</table>);
        if (Array.isArray(expected[i][1])) {
          expect(
            container.querySelector(expected[i][0]),
          ).toHaveAttribute(...expected[i][1]);
        } else if (Number.isInteger(expected[i][1])) {
          expect(
            container.querySelectorAll(expected[i][0]).length,
          ).toBe(expected[i][1]);
        }
        // test styles
        expect(container.querySelector('table tr'))
          .toHaveStyle(`background-color: ${expectedStyles[i]}`);
      });
    },
  );
});
