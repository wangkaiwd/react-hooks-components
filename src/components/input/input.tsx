import React, { FormEvent, InputHTMLAttributes, useRef } from "react";
import cls from "classnames";
import "./input.scss";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  allowClear?: boolean;
  onChange?: (value: string) => void;
}

const isEmpty = (value: any): boolean => {
  return value == null || value === "";
};
const Input: React.FC<Props> = (props) => {
  const { className, allowClear, onChange, ...nativeProps } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const classes = cls("ant-input", className, { clear: allowClear });
  const hasContent = !isEmpty(nativeProps.value) || !isEmpty(inputRef.current?.value);
  const onClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      onChange?.(inputRef.current.value);
    }
  };
  const onInput = (e: FormEvent<HTMLInputElement>) => {
    onChange?.((e.target as HTMLInputElement).value);
  };
  return (
    <div className={classes}>
      <input data-testid="input" ref={inputRef} {...nativeProps} onInput={onInput} />
      {
        hasContent &&
        <div data-testid="clear" className="ant-input-clear" onClick={onClear}>
          ❎
        </div>
      }
    </div>
  );
};

export default Input;
