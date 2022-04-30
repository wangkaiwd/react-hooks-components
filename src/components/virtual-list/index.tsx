import React, { CSSProperties, HTMLAttributes, useState, UIEvent, UIEventHandler } from "react";
import cls from "classnames";
import useSetState from "../../hooks/useSetState";

interface VirtualListProps extends HTMLAttributes<HTMLDivElement> {
  height: number,
  itemHeight: number,
  data: any[],
  itemKey?: string | number
}

// Render additional one item for motion usage
const prefixCls = "ant-virtual-list";
const VirtualList = (props: VirtualListProps) => {
  const { className, height, itemHeight, data, itemKey, style, ...rest } = props;
  const classes = cls(className, prefixCls);
  const outerStyles: CSSProperties = {
    height: `${height}px`,
    overflowY: "auto"
  };
  const itemStyles: CSSProperties = {
    height: `${itemHeight}px`
  };
  const [scrollTop, setScrollTop] = useState(0);
  console.log("scrollTop", scrollTop);
  const start = Math.floor(scrollTop / itemHeight);
  const end = start + Math.ceil(height / itemHeight) + 1;
  console.log("start-end", start, end);
  const scrollHandler = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    // if (end <= data.length - 2) {
    setScrollTop(scrollTop);
    // }
  };
  return (
    <div
      className={classes}
      style={{ ...style, ...outerStyles }}
      {...rest}
      onScroll={scrollHandler}
    >
      <div className={cls(`${prefixCls}-inner`)} style={{ height: `${data.length * itemHeight}px` }}>
        <div className={cls(`${prefixCls}-wrapper`)} style={{ transform: `translateY(${scrollTop}px)` }}>
          {data.slice(start, end).map((item, i) => (<div key={itemKey ?? i} style={itemStyles}>{item.id}</div>))}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;
