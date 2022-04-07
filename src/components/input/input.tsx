import React, { InputHTMLAttributes, useMemo } from 'react';
import cls from 'classnames';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  allowClear?: boolean;
}

const Input: React.FC<Props> = (props) => {
  const { className, allowClear, ...nativeProps } = props;
  const classes = useMemo(() => {
    return cls('ant-input', className, { clear: allowClear });
  }, [className, allowClear]);
  return (
    <div className={classes}>
      <input {...nativeProps}/>
      <div className="ant-input-clear">
        x
      </div>
    </div>
  );
};

export default Input;
