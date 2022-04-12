import { act, renderHook } from "@testing-library/react-hooks";
import useGetSetState from "../useGetSetState";

describe("useSetState", () => {
  it("should merge get state immediately after set state", () => {
    const { result } = renderHook(() => {
      const [getState, setState] = useGetSetState({
        a: 1,
        b: 2,
        counter: 0
      });
      return {
        getState,
        onClick () {
          // this must be use functional setState in internal of useSetState
          setState({ counter: getState().counter + 1 });
          expect(getState()).toEqual({ a: 1, b: 2, counter: 1 });
          setState({ b: 10 });
          expect(getState()).toEqual({ a: 1, b: 10, counter: 1 });
        }
      };
    });
    act(() => result.current.onClick());
    expect(result.current.getState()).toEqual({ a: 1, b: 10, counter: 1 });
  });
  it("should support functional update state", () => {
    const { result } = renderHook(() => {
      const [getState, setState] = useGetSetState({
        a: 1,
        b: 2,
        counter: 0
      });
      return {
        getState,
        onClick () {
          setState((state) => ({ counter: state.counter + 1 }));
          expect(getState()).toEqual({ a: 1, b: 2, counter: 1 });
          setState(() => ({ b: 10 }));
          expect(getState()).toEqual({ a: 1, b: 10, counter: 1 });
        }
      };
    });
    act(() => result.current.onClick());
    expect(result.current.getState()).toEqual({ a: 1, b: 10, counter: 1 });
  });
});
