import React from "react";
import "./styles/index.scss";
import ErrorRetry from "./hooks/useRequest/demo/errorRetry";
import Cache from "./hooks/useRequest/demo/cache";

function App () {
  return (
    <div className="App" style={{ padding: "20px" }}>
      {/*<UseRequestBasic />*/}
      {/*<ErrorRetry />*/}
      <Cache />
    </div>
  );
}

export default App;
