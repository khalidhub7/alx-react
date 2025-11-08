import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom tests', () => {
  it('should render without crashing', () => {
    render(<BodySectionWithMarginBottom />);
  });

  it(
    'should render BodySection component correctly',
    () => {
      const { container } = render(
        <BodySectionWithMarginBottom />,
      );

      expect(container.querySelector(
        '.bodySectionWithMargin .bodySection',
      )).toBeInTheDocument();
    },
  );
});
