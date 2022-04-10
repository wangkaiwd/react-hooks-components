import { useState } from "react";
import { Patch } from "./types";
import { isFun } from "../utils/data-types";

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
