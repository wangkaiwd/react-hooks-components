import React, { CSSProperties, HTMLAttributes, UIEvent, useState } from "react";
import cls from "classnames";
import "./index.scss";

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
  const containerHeight = data.length * itemHeight;
  const classes = cls(className, prefixCls);
  const outerStyles: CSSProperties = {
    height: `${height}px`
  };
  const itemStyles: CSSProperties = {
    height: `${itemHeight}px`
  };
  const [scrollTop, setScrollTop] = useState(0);
  const start = Math.ceil(scrollTop / itemHeight);
  const end = start + Math.ceil(height / itemHeight) + 1;
  const scrollHandler = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop: newScrollTop } = e.currentTarget;
    const maxTop = containerHeight - height;
    // 1. scroll event not trigger when content scroll per one pixel
    // 2. below code will make scroll to bottom not precise
    // 3. newScrollTop update interval depend on speed of mouse wheel scroll speed
    // if(newScrollTop <= maxTop) {
    //    setScrollTop(maxTop)
    // }
    // todo: can optimize this by add event trigger interval
    setScrollTop(newScrollTop > maxTop ? maxTop : newScrollTop);
  };
  return (
    <div
      className={classes}
      style={{ ...style, ...outerStyles }}
      {...rest}
      onScroll={scrollHandler}
    >
      <div
        className={cls(`${prefixCls}-inner`)}
        style={{ height: `${containerHeight}px` }}
      >
        <div
          className={cls(`${prefixCls}-wrapper`)}
          style={{ transform: `translateY(${scrollTop}px)` }}
        >
          {data.slice(start, end).map((item, i) => (
            <div key={item[itemKey as any] ?? i} style={itemStyles}>{item.id}</div>))}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;
