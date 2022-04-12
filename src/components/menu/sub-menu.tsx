import React, { createContext, FC, useContext, useState } from 'react';
import cls from 'classnames';
import './index.scss';
import { MenuContext } from './menu';

interface SubMenuProps {
  className?: string;
  title: string;
  id: string | number;
}

export const PathTrackerContext = createContext<string[]>([]);
const prefixCls = 'ant-sub-menu';
const SubMenu: FC<SubMenuProps> = (props) => {
  const pathTracker = useContext(PathTrackerContext);
  const { id } = props;
  const { inlineIndent = 24, onOpenChange, openedKeys } = useContext(MenuContext);
  const isOpen = openedKeys?.includes(String(id));
  const nextPathTracker = pathTracker.concat(String(props.id));
  const onClickTitle = () => {
    if (openedKeys) {
      let newOpenedKeys: string[] = [...openedKeys];
      if (isOpen) {
        newOpenedKeys = newOpenedKeys.filter(key => key !== String(id));
      } else {
        newOpenedKeys.push(String(id));
      }
      onOpenChange?.(newOpenedKeys, { id, title: props.title });
    }
  };
  return (
    <PathTrackerContext.Provider value={nextPathTracker}>
      <div className={cls(prefixCls)}>
        <div
          className={`${prefixCls}-title`}
          onClick={onClickTitle}
          style={{ paddingLeft: `${(pathTracker.length + 1) * inlineIndent}px` }}
        >
          {props.title}
          <span className={`${prefixCls}-arrow`}>
            {isOpen ? '▼' : '►'}
          </span>
        </div>
        {
          isOpen &&
          <div className={`${prefixCls}-children`}>
            {props.children}
          </div>
        }
      </div>
    </PathTrackerContext.Provider>
  );
};

export default SubMenu;
