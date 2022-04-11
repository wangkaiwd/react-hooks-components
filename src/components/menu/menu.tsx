import React, { createContext, FC } from 'react';
import cls from 'classnames';
import './index.scss';

const prefixCls = 'ant-menu';

interface MenuProps {
  className?: string;
  openedKeys?: string[];
  selectedKey?: string;
  onSelect?: (key: string, item: object) => void;
  onOpenChange?: (keys: string[], item: object) => void;
}

export const MenuContext = createContext<MenuProps>({});

const Menu: FC<MenuProps> = (props) => {
  const { className } = props;
  return (
    <MenuContext.Provider value={props}>
      <div className={cls(prefixCls, className)}>
        {props.children}
      </div>
    </MenuContext.Provider>
  );
};

export default Menu;
