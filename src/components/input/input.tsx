import React, { FormEvent, InputHTMLAttributes, useMemo, useRef } from 'react';
import cls from 'classnames';
import './input.scss';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  allowClear?: boolean;
  onChange?: (value: string) => void;
}

const Input: React.FC<Props> = (props) => {
  const { className, allowClear, onChange, ...nativeProps } = props;
  const inputRef = useRef<HTMLInputElement>(null!);
  const classes = useMemo(() => {
    return cls('ant-input', className, { clear: allowClear });
  }, [className, allowClear]);
  const onClear = () => {
    inputRef.current.value = '';
    onChange?.(inputRef.current.value);
  };
  const onInput = (e: FormEvent<HTMLInputElement>) => {
    onChange?.((e.target as HTMLInputElement).value);
  };
  return (
    <div className={classes}>
      <input data-testid="input" ref={inputRef} {...nativeProps} onInput={onInput}/>
      <div data-testid="clear" className="ant-input-clear" onClick={onClear}>
        x
      </div>
    </div>
  );
};

export default Input;
