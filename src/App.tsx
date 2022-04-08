import React, { useState } from "react";
import Input from "./components/input/input";

function App () {
  const [value, setValue] = useState("");
  const onChange = (newVal: string) => setValue(newVal);

  return (
    <div className="App">
      <header className="App-header">
        <Input
          value={value}
          onChange={onChange}
          allowClear
          placeholder="Please input something..."
        />
      </header>
    </div>
  );
}

export default App;
