import React, { useState } from "react";
// import AutoComplete from "./components/auto-complete/auto-complete";
import Input from "./components/input/input";

const initialDataSource = [
  {
    "id": 0,
    "label": "0"
  },
  {
    "id": 1,
    "label": "1"
  },
  {
    "id": 2,
    "label": "2"
  },
  {
    "id": 3,
    "label": "3"
  },
  {
    "id": 4,
    "label": "4"
  },
  {
    "id": 5,
    "label": "5"
  },
  {
    "id": 6,
    "label": "6"
  },
  {
    "id": 7,
    "label": "7"
  },
  {
    "id": 8,
    "label": "8"
  },
  {
    "id": 9,
    "label": "9"
  }
];

function App () {
  return (
    <div className="App">
      {/*<AutoComplete dataSource={initialDataSource} />*/}
      <Input allowClear />
    </div>
  );
}

export default App;
