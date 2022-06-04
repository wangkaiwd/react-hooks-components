import useRequest from "../useRequest";
import { useState } from "react";
import { requestCreator } from "../../../utils/request";

const ErrorRetry = () => {
  const [name, setName] = useState("cat");
  const fetchDemo = (name: string) => {
    return requestCreator(undefined, "error", 1000);
  };
  const { loading, cancel, runAsync } = useRequest(fetchDemo, { manual: true, retryCount: 2 });
  return (
    <div>
      <input value={name} type="text" onChange={(e) => setName(e.target.value)} />
      <button onClick={() => runAsync(name)}>{loading ? "loading..." : "run"}</button>
      <button onClick={cancel}>cancel</button>
    </div>
  );
};

export default ErrorRetry;
