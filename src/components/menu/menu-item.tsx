import React, { FC, useContext } from 'react';
import cls from 'classnames';
import './index.scss';
import { MenuContext } from './menu';
import { PathTrackerContext } from './sub-menu';

interface MenuItemProps {
  className?: string;
  id: string;
}

const prefixCls = 'ant-menu-item';
const MenuItem: FC<MenuItemProps> = (props) => {
  const { selectedKey, onSelect, inlineIndent = 24 } = useContext(MenuContext);
  const pathTracker = useContext(PathTrackerContext);
  const { id, className } = props;
  const onClick = () => {
    onSelect?.(id, { id, title: props.children });
  };
  const classNames = cls(prefixCls, className, { selected: selectedKey === id });
  return (
    <div className={classNames} onClick={onClick}
         style={{ paddingLeft: `${(pathTracker.length + 1) * inlineIndent}px` }}>
      {props.children}
    </div>
  );
};

export default MenuItem;
