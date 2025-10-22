import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import CourseList from './CourseList';
import { listCourses } from '../App/App';

describe('test CourseList component', () => {
  test(
    'ensure CourseList renders without crashing',
    () => { render(<CourseList />); },
  );

  test('should renders the 5 different rows', () => {
    const { getAllByRole } = render(
      <CourseList listCourses={listCourses} />,
    );
    const rows = getAllByRole('row');
    const testSet = new Set();
    // add each row to a set to ensure uniqueness
    rows.forEach((r) => testSet.add(r.textContent));
    expect(testSet.size).toBe(5);
  });

  test(
    'should renders the 1 row with exact test if no rows',
    () => {
      const { getAllByRole } = render(
        <CourseList listCourses={[]} />,
      );
      const rows = getAllByRole('row');
      expect(rows.length).toBe(1);
      expect(rows[0].textContent).toBe('No course available yet');
    },
  );
});
