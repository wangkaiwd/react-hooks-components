import React, { CSSProperties, UIEvent } from "react";
import "./index.scss";
import cls from "classnames";
import useSetState from "../../hooks/useSetState";

const prefixCls = "ant-virtual-list";

interface VirtualListProps {
  className?: string;
  style?: CSSProperties;
}

const rowHeight = 30;
const list = new Array(10000).fill(true).map((item, i) => ({
  id: i,
  firstName: Math.random().toString(20).substring(8),
  lastName: Math.random().toString(20).substring(8),
  age: Math.ceil(Math.random() * 80)
}));
const listHeight = rowHeight * list.length;
const VirtualList = (props: VirtualListProps) => {
  const { className, ...rest } = props;
  const classes = cls(prefixCls, className);
  const [state, setState] = useSetState({
    start: 0
  });
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const scrollTop = (e.target as HTMLDivElement).scrollTop;
    const distance = Math.floor(scrollTop / rowHeight);
    setState({ start: distance });
  };
  const getRows = () => {
    const rows = [];
    let i = state.start;
    const end = state.start + 20;
    const rowStyles: CSSProperties = {
      position: "absolute",
      height: `${rowHeight}px`,
      border: "1px solid red",
      lineHeight: `${rowHeight}px`,
      width: "100%"
    };
    // position absolute element top always based on closest position relative parent initial left top corner
    // if scroll position absolute element:
    //  1. set position based on initial position relative parent
    //  2. then scroll it
    //  3. if position relative parent also scroll, the pivot always is left corner of first render and not change over scroll
    for (; i < end; i++) {
      rows.push(
        <div className={`${prefixCls}-item`} key={i}
             style={{ ...rowStyles, top: `${i * rowHeight}px` }}>
          {i + 1}
        </div>
      );
    }
    return rows;
  };
  return (
    <div {...rest} className={classes}
         style={{ height: `${rowHeight * 10}px`, overflowY: "scroll" }}
         onScroll={onScroll}>
      <div className={`${prefixCls}-list`} style={{ height: `${listHeight}px`, position: "relative" }}>
        {getRows()}
      </div>
    </div>
  );
};

export default VirtualList;
