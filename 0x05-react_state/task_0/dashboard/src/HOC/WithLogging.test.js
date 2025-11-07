import React from 'react';
import { render } from '@testing-library/react';
import WithLogging from './WithLogging';

describe('test WithLogging hoc', () => {
  it('logs mount and unmount of the wrapped component', () => {
    const mockLog = jest.spyOn(console, 'log')
      .mockImplementation(() => {});

    const { unmount } = render(
      <WithLogging compToWrap={() => <p />} />,
    );

    expect(mockLog).toHaveBeenCalledTimes(1);
    expect(mockLog)
      .toHaveBeenCalledWith('Component compToWrap is mounted');

    unmount();
    expect(mockLog).toHaveBeenCalledTimes(2);
    expect(mockLog)
      .toHaveBeenCalledWith('Component compToWrap is going to unmount');
    mockLog.mockRestore();
  });
});
