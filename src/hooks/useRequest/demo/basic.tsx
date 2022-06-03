import useRequest from "../useRequest";
import { useState } from "react";

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
const UseRequestBasic = () => {
  const [name, setName] = useState("cat");
  const fetchDemo = (name: string) => {
    return createPromise(name, undefined, 1000);
  };
  const { loading, cancel, runAsync } = useRequest(fetchDemo, { manual: true, pollingInterval: 3000 });
  return (
    <div>
      <input value={name} type="text" onChange={(e) => setName(e.target.value)} />
      <button onClick={() => runAsync(name)}>{loading ? "loading..." : "run"}</button>
      <button onClick={cancel}>cancel</button>
    </div>
  );
};

export default UseRequestBasic;
