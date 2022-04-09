import React, { ChangeEvent, MouseEvent, InputHTMLAttributes, useRef, useState, useEffect } from "react";
import cls from "classnames";
import "./input.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  allowClear?: boolean;
}

const isEmpty = (value: any): boolean => {
  return value == null || value === "";
};
const Input: React.FC<Props> = (props) => {
  const { className, allowClear, onChange, defaultValue, ...nativeProps } = props;
  const getValue = () => !isEmpty(props.value) ? props.value : defaultValue;
  const [value, setValue] = useState(getValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const classes = cls("ant-input", className, { clear: allowClear });
  // this will lead to render again
  // first render also fire
  useEffect(() => {
    setValue(getValue);
  }, [defaultValue, props.value]);
  const onClear = (e: MouseEvent<HTMLDivElement>) => {
    if (inputRef.current) {
      const event = Object.create(e, {
        // if a descriptor has neither of value, writable,get and set keys, it is treated as a data descriptor
        target: { value: inputRef.current },
        currentTarget: { value: inputRef.current }
      });
      inputRef.current.value = "";
      setValue("");
      onChange?.(event as ChangeEvent<HTMLInputElement>);
    }
  };
  const getClear = () => {
    return allowClear && !isEmpty(value) &&
      <div data-testid="clear" className="ant-input-clear" onClick={onClear}>
        ✖
      </div>;
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      const value = e.target.value;
      setValue(value);
    }
    onChange?.(e);
  };
  return (
    <div className={classes}>
      <input data-testid="input" {...nativeProps} onChange={handleChange} value={value} ref={inputRef} />
      {getClear()}
    </div>
  );
};

export default Input;
