import React, { CSSProperties } from 'react';
import './index.scss';
import cls from 'classnames';
import useSetState from '../../hooks/useSetState';

const prefixCls = 'ant-virtual-list';

interface VirtualListProps {
  className?: string;
  style?: CSSProperties;
}

const rowHeight = 20;
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
    index: 0,
  });
  const getRows = () => {
    const rows = [];
    let i = state.index;
    const end = state.index + 20;
    for (; i < end; i++) {
      rows.push(
        <div className={`${prefixCls}-item`}>
          {i}
        </div>
      );
    }
    setState({ index: i });
    return rows;
  };
  return (
    <div {...rest} className={classes} style={{ height: `${rowHeight * 10}px` }}>
      <div className={`${prefixCls}-list`} style={{ height: `${listHeight}px` }}>
        {getRows()}
      </div>
    </div>
  );
};

export default VirtualList;
