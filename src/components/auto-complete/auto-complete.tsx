import React, { ChangeEvent, FC, useState } from "react";
import Input from "../input/input";
import "./index.scss";

interface ItemProps {
  id: string | number;
  label: string;
}

interface Props {
  dataSource: ItemProps[];
}

const AutoComplete: FC<Props> = (props) => {
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState<ItemProps[]>([]);
  const generateList = () => {
    if (list.length > 0) {
      return list.map(data => <li key={data.id}>{data.label}</li>);
    }
    return <li>no content!</li>;
  };
  // trigger two frequently
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === "") {
      return setList([]);
    }
    const reg = new RegExp(value);
    const result = props.dataSource.filter((data) => reg.test(data.label));
    setList(result);
  };
  return (
    <div className="ant-auto-complete">
      <Input
        onChange={onChange}
        placeholder="Please input something..."
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
      />
      {
        visible &&
        <div className="ant-auto-complete-popover">
          <ul>
            {generateList()}
          </ul>
        </div>
      }
    </div>
  );
};

export default AutoComplete;
