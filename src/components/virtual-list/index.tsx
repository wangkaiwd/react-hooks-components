import React, { CSSProperties } from "react";
import "./index.scss";
import cls from "classnames";

const prefixCls = "ant-virtual-list";

interface VirtualListProps {
  className?: string;
  style?: CSSProperties;
}

const VirtualList = (props: VirtualListProps) => {
  const { className, ...rest } = props;
  const classes = cls(prefixCls, className);

  return (
    <div {...rest} className={classes}>
      virtual list
    </div>
  );
};

export default VirtualList;
