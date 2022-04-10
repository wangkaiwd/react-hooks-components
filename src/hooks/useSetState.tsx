import { useState } from "react";

type Patch<S> = Partial<S> | ((prevState: S) => Partial<S>)
const isFun = (value: any): value is Function => typeof value === "function";
const useSetState = <S extends object> (initialState: S | (() => S)): [S, (patch: Patch<S>) => void] => {
  const [state, setState] = useState<S>(initialState);
  const setMergedState = (patch: Patch<S>) => {
    setState((prevState) => {
      return {
        ...prevState,
        ...(isFun(patch) ? patch(prevState) : patch)
      };
    });
  };
  return [state, setMergedState];
};

export default useSetState;
