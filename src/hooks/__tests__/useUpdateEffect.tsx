import { act, renderHook } from '@testing-library/react-hooks';
import useUpdateEffect from '../useUpdateEffect';
import { useState } from 'react';

describe('useUpdateEffect', () => {
  it('should execute after dependencies update', () => {
    const fn = jest.fn();
    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      useUpdateEffect(() => {
        fn();
      }, [count]);
      return {
        increase () {
          setCount(count + 1);
        }
      };
    });
    expect(fn).toHaveBeenCalledTimes(0);
    act(() => {result.current.increase();});
    expect(fn).toHaveBeenCalledTimes(1);
    act(() => {result.current.increase();});
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
