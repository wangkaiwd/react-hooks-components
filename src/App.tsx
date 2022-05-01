import React from "react";
import VirtualList from "./components/virtual-list";
import "./styles/index.scss";

const data: any[] = [];
for (let i = 0; i < 2000; i++) {
  data.push({ id: `${i}-id` });
}

function App () {
  return (
    <div className="App" style={{ padding: "20px" }}>
      <h2>This is a list</h2>
      <h2>End</h2>
      <VirtualList
        itemKey={"id"}
        style={{ border: "1px solid red" }}
        height={200}
        itemHeight={20}
        data={data}
      >
        {
          (item, i) => (
            <div style={{ height: "20px" }}>id: {item.id} , i: {i}</div>
          )
        }
      </VirtualList>
    </div>
  );
}

export default App;
