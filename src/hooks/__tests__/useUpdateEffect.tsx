import { renderHook } from "@testing-library/react-hooks";
import useUpdateEffect from "../useUpdateEffect";

describe("useUpdateEffect", () => {
  it("should execute after dependencies update", () => {
    const { result } = renderHook(() => {
      const fn = jest.fn();
      useUpdateEffect(() => {
        fn();
      }, []);
      return { fn };
    });
    expect(result.current.fn).toHaveBeenCalledTimes(0);
  });
});
