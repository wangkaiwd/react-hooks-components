import React, { createContext, FC } from "react";
import cls from "classnames";
import "./index.scss";
import SubMenu from "./sub-menu";
import MenuItem from "./menu-item";

const prefixCls = "ant-menu";

interface MenuProps {
  className?: string;
  openedKeys?: string[];
  selectedKey?: string;
  onSelect?: (key: string, item: object) => void;
  onOpenChange?: (keys: string[], item: object) => void;
  inlineIndent?: number;
}

export const MenuContext = createContext<Partial<MenuProps>>({});
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
