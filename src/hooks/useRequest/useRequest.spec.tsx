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
      result.current.runAsync();
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
      await result.current.runAsync("cat");
      expect(result.current.params).toEqual(["cat"]);
    });
  });
  // todo: known about how to test polling service correctly
  it("should polling service with pollingInterval", async () => {
    jest.useFakeTimers();
    // creates a mock function similar to jest.fn but also tracks calls to object[methodName]. Returns a Jest mock function
    // jest.spyOn(global, "setTimeout");
    const fetchDemo = jest.fn((value) => {
      return createPromise(value, undefined, 1000);
    });
    const { result, waitForNextUpdate } = renderHook(() => {
      return useRequest(fetchDemo, { pollingInterval: 100, manual: true });
    });
    await act(async () => {
      result.current.runAsync("cat");
      jest.advanceTimersByTime(1000);
      // why need wait for next update
      await waitForNextUpdate();
      expect(fetchDemo).toBeCalledTimes(1);
      jest.advanceTimersByTime(100);
      expect(fetchDemo).toBeCalledTimes(2);
      jest.advanceTimersByTime(1000);
      await waitForNextUpdate();
      jest.advanceTimersByTime(100);
      expect(fetchDemo).toBeCalledTimes(3);
      jest.advanceTimersByTime(1000);
      await waitForNextUpdate();
      jest.advanceTimersByTime(80);
      // cancel polling
      result.current.cancel();
      jest.advanceTimersByTime(20);
      expect(fetchDemo).toBeCalledTimes(3);
      jest.useRealTimers();
    });
  });
  it("should retry service when request error", async () => {
    jest.useFakeTimers();
    const fetchDemo = jest.fn(() => {
      return createPromise(undefined, "error", 1000);
    });
    const { waitForNextUpdate } = renderHook(() => {
      return useRequest(fetchDemo, { retryCount: 2 });
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitForNextUpdate();
    act(() => {
      jest.runAllTimers();
    });
    await waitForNextUpdate();
    expect(fetchDemo).toBeCalledTimes(2);

    act(() => {
      jest.runAllTimers();
    });
    await waitForNextUpdate();
    expect(fetchDemo).toBeCalledTimes(3);

    // stop retry
    act(() => {
      jest.runAllTimers();
    });
    // no update, so this line cause timeout ?
    // await waitForNextUpdate();
    expect(fetchDemo).toBeCalledTimes(3);
  });
});
