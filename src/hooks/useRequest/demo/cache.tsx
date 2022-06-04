import { requestCreator } from "../../../utils/request";
import useRequest from "../useRequest";
import { useState } from "react";

const Article = () => {
  const fetchDemo = () => requestCreator(Math.random() * 100000, undefined, 3000);
  const { data, loading, refresh } = useRequest(fetchDemo, { cacheKey: "fetch-demo" });
  if (!data && loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <button onClick={refresh}>update</button>
      <h2>Article loading: {String(loading)}</h2>
      <p>{data}</p>
    </div>
  );
};
const Cache = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>{visible ? "hide" : "show"}</button>
      {
        visible &&
        <Article />
      }
      {
        visible &&
        <Article />
      }
    </div>
  );
};

export default Cache;
