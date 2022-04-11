import React, { FC, useContext } from 'react';
import cls from 'classnames';
import './index.scss';
import { MenuContext } from './menu';

interface MenuItemProps {
  className?: string;
  id: string;
}

const prefixCls = 'ant-menu-item';
const MenuItem: FC<MenuItemProps> = (props) => {
  const { selectedKey, onSelect } = useContext(MenuContext);
  const { id } = props;
  const { className } = props;
  const onClick = () => {
    onSelect?.(id, { id, title: props.children });
  };
  const classNames = cls(prefixCls, className, { selected: selectedKey === id });
  return (
    <div className={classNames} onClick={onClick}>
      {props.children}
    </div>
  );
};

export default MenuItem;
