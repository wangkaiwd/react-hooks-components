import React, { ChangeEvent, MouseEvent, InputHTMLAttributes, useRef } from "react";
import cls from "classnames";
import "./input.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  allowClear?: boolean;
}

const isEmpty = (value: any): boolean => {
  return value == null || value === "";
};
const Input: React.FC<Props> = (props) => {
  const { className, allowClear, ...nativeProps } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const classes = cls("ant-input", className, { clear: allowClear });
  const hasContent = !isEmpty(nativeProps.value) || !isEmpty(inputRef.current?.value);
  const onClear = (e: MouseEvent<HTMLDivElement>) => {
    if (inputRef.current) {
      const event = Object.create(e, {
        // if a descriptor has neither of value, writable,get and set keys, it is treated as a data descriptor
        target: { value: inputRef.current },
        currentTarget: { value: inputRef.current }
      });
      inputRef.current.value = "";
      nativeProps.onChange?.(event as ChangeEvent<HTMLInputElement>);
    }
  };
  return (
    <div className={classes}>
      <input data-testid="input" ref={inputRef} {...nativeProps} />
      {
        hasContent &&
        <div data-testid="clear" className="ant-input-clear" onClick={onClear}>
          ✖
        </div>
      }
    </div>
  );
};

export default Input;
