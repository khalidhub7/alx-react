import React from 'react';
import { render } from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection tests', () => {
  it('should render without crashing', () => {
    render(<BodySection />);
  });

  it('should render elements correctly', () => {
    const { container } = render(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>,
    );

    expect(container.querySelector('.bodySection h2')
      .textContent).toBe('test title');
    expect(container.querySelector('.bodySection p')
      .textContent).toBe('test children node');
  });
});
