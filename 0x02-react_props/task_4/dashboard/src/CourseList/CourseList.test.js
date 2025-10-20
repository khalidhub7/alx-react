import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import CourseList from './CourseList';

describe('test CourseList component', () => {
  test(
    'ensure CourseList renders without crashing',
    () => {
      render(<CourseList />);
    },
  );

  test('should renders the 5 different rows', () => {
    const { getAllByRole } = render(<CourseList />);
    const rows = getAllByRole('row');
    const testSet = new Set();
    // add each row to a set to ensure uniqueness
    rows.forEach((r) => testSet.add(r.textContent));
    expect(testSet.size).toBe(5);

    /* console.log(`*** ${[...testSet]} ***`) */
  });
});
