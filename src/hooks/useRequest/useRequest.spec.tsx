import { act, renderHook } from "@testing-library/react-hooks";
import useRequest from "./useRequest";

const createPromise = (value: any, reason: any, delay: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value) {
        resolve(value);
      } else {
        reject(reason);
      }
    }, delay);
  });
};
describe("useRequest:", () => {
  it("should auto run service", async () => {
    const fetchDemo = jest.fn(() => {
      return createPromise("cat", undefined, 1000);
    });
    renderHook(() => {
      return useRequest(fetchDemo);
    });
    expect(fetchDemo).toBeCalledTimes(1);
  });
  it("should auto run service with defaultParams", async () => {
    const fetchDemo = jest.fn((name) => {
      return createPromise(name, undefined, 1000);
    });
    const { result } = renderHook(() => {
      return useRequest(fetchDemo, { defaultParams: "cat" });
    });
    expect(fetchDemo).toBeCalledTimes(1);
    expect(result.current.params).toEqual(["cat"]);
  });
  it("should run service manual", () => {
    const fetchDemo = jest.fn(() => {
      return createPromise("cat", undefined, 1000);
    });
    const { result } = renderHook(() => {
      return useRequest(fetchDemo, { manual: true });
    });
    expect(fetchDemo).toBeCalledTimes(0);
    act(() => {
      result.current.run();
      expect(fetchDemo).toBeCalledTimes(1);
    });
  });
  it("should get params of service", async () => {
    const fetchDemo = jest.fn((value) => {
      return createPromise(value, undefined, 1000);
    });
    const { result } = renderHook(() => {
      return useRequest(fetchDemo, { manual: true });
    });
    await act(async () => {
      await result.current.run("cat");
      expect(result.current.params).toEqual(["cat"]);
    });
  });
});
