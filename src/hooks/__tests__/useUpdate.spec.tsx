import useUpdate from "../useUpdate";
import { act, renderHook } from "@testing-library/react-hooks";

describe("useUpdate", () => {
  it("should update view", () => {
    let fn = jest.fn();
    const { result } = renderHook(() => {
      fn();
      return useUpdate();
    });
    expect(fn).toHaveBeenCalledTimes(1);
    act(() => result.current());
    expect(fn).toHaveBeenCalledTimes(2);
    act(() => result.current());
    expect(fn).toHaveBeenCalledTimes(3);
  });
});
