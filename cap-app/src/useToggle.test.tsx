import { useToggle } from './useToggle';
import { renderHook, act } from '@testing-library/react';
import React from 'react';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div data-testid="wrapper">{children}</div>;
};

describe('useToggle', () => {
  it('should toggle value from false to true and back', () => {
    const { result } = renderHook(() => useToggle(), { wrapper: Wrapper });
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);
  });

  it('should respect initial value', () => {
    const { result } = renderHook(() => useToggle(true), { wrapper: Wrapper });
    expect(result.current[0]).toBe(true);
  });

  it('should work with multiple toggles', () => {
    const { result } = renderHook(() => useToggle(), { wrapper: Wrapper });
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1]();
      result.current[1]();
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);
  });

  it('should allow custom wrapper to be used', () => {
    const { result } = renderHook(() => useToggle(), { wrapper: Wrapper });
    expect(result.current[0]).toBe(false);
  });
});
