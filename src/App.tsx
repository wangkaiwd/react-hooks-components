import React from "react";
import VirtualList from "./components/virtual-list";
import "./styles/index.scss";

const data: any[] = [];
for (let i = 0; i < 100; i++) {
  data.push({ id: i });
}

function App () {
  return (
    <div className="App" style={{ padding: "20px" }}>
      <h2>This is a list</h2>
      <h2>End</h2>
      <VirtualList style={{ border: "1px solid red" }} height={200} itemHeight={20} data={data}></VirtualList>
    </div>
  );
}

export default App;
