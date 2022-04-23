import React from "react";
import VirtualList from "./components/virtual-list";
import "./styles/index.scss";

function App () {
  return (
    <div className="App" style={{ padding: "20px" }}>
      <h2>This is a list</h2>
      <VirtualList></VirtualList>
      <h2>End</h2>
    </div>
  );
}

export default App;
