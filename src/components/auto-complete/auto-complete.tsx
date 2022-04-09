import React, { ChangeEvent, FC, useState } from "react";
import Input from "../input/input";
import "./index.scss";

interface ItemProps {
  id: string | number;
  label: string;
}

interface Props {
  dataSource: ItemProps[];
  value: string;
  onChange: (newVal: string) => void;
  placeholder?: string;
}

const AutoComplete: FC<Props> = (props) => {
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState<ItemProps[]>([]);
  const { dataSource, ...rest } = props;
  const generateList = () => {
    if (list.length > 0) {
      return list.map(data => <li key={data.id}>{data.label}</li>);
    }
    return <li>no content!</li>;
  };
  // trigger two frequently
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    rest.onChange(value);
    if (value === "") {
      return setList([]);
    }
    const reg = new RegExp(value);
    const list = dataSource.filter((data) => reg.test(data.label));
    setList(list);
  };
  return (
    <div className="ant-auto-complete">
      <Input
        {...rest}
        onChange={onChange}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
      />
      {
        visible &&
        <div className="ant-auto-complete-popover">
          <ul data-testid="popover">
            {generateList()}
          </ul>
        </div>
      }
    </div>
  );
};

export default AutoComplete;
