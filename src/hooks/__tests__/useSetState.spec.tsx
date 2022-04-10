import { act, renderHook } from "@testing-library/react-hooks";
import useSetState from "../useSetState";

describe("useSetState", () => {
  it("should merge old state then update state", () => {
    const { result } = renderHook(() => {
      const [state, setState] = useSetState({
        a: 1,
        b: 2,
        counter: 0
      });
      return {
        state,
        onClick () {
          // this must be use functional setState in internal of useSetState
          setState({ counter: state.counter + 1 });
          setState({ b: 10 });
        }
      };
    });
    act(() => result.current.onClick());
    expect(result.current.state).toEqual({ a: 1, b: 10, counter: 1 });
  });
  it("should support functional update state", () => {
    const { result } = renderHook(() => {
      const [state, setState] = useSetState({
        a: 1,
        b: 2,
        counter: 0
      });
      return {
        state,
        onClick () {
          setState((state) => {
            return ({ counter: state.counter + 1 });
          });
          setState(() => ({ b: 10 }));
        }
      };
    });
    act(() => result.current.onClick());
    expect(result.current.state).toEqual({ a: 1, b: 10, counter: 1 });
  });
});
