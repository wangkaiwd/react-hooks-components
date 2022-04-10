import useSetState from "./useSetState";
import { useRef } from "react";
import { Patch } from "./types";
import { isFun } from "../utils/data-types";

const useGetSetState = <S extends object> (initialState: S): [() => S, (path: Patch<S>) => void] => {
  const [state, setState] = useSetState(initialState);
  const stateRef = useRef(state);
  const set = (patch: Patch<S>) => {
    setState(patch);
    const prevState = stateRef.current;
    stateRef.current = { ...prevState, ...(isFun(patch) ? patch(prevState) : patch) };
  };
  const get = (): S => stateRef.current;
  return [get, set];
};

export default useGetSetState;
