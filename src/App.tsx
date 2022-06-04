import React from "react";
import "./styles/index.scss";
import ErrorRetry from "./hooks/useRequest/demo/errorRetry";

function App () {
  return (
    <div className="App" style={{ padding: "20px" }}>
      {/*<UseRequestBasic />*/}
      <ErrorRetry />
    </div>
  );
}

export default App;
