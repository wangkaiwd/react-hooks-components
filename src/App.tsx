import React from "react";
import Input from "./components/input/input";

function App () {
  return (
    <div className="App">
      <header className="App-header">
        <Input allowClear placeholder="Please input something..." />
      </header>
    </div>
  );
}

export default App;
