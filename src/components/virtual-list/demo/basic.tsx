import React, { useState, UIEvent } from "react";
import VirtualList from "../index";

const data: any[] = [];

for (let i = 0; i < 100; i += 1) {
  data.push({
    id: i,
    height: 30 + (i % 2 ? 70 : 0)
    // height: 30
  });
}

function VirtualListBasic () {
  const [scrollTop, setScrollTop] = useState(0);
  const onscroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    setScrollTop(scrollTop);
  };
  return (
    <div className="App" style={{ padding: "20px" }}>
      <h2>This is a list</h2>
      <h3>scrollTop:{scrollTop}</h3>
      <VirtualList
        itemKey={"id"}
        style={{ border: "1px solid red" }}
        height={300}
        onScroll={onscroll}
        itemHeight={30}
        data={data}
      >
        {(item, i) => (
          <div style={{ height: `${item.height}px`, border: "1px solid green" }}>{i}</div>
        )}
      </VirtualList>
    </div>
  );
}

export default VirtualListBasic;
