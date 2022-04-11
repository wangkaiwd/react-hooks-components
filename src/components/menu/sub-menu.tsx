import React, { FC, useState } from 'react';
import cls from 'classnames';
import './index.scss';

interface SubMenuProps {
  className?: string;
  title: string;
  id: string | number;
}

const prefixCls = 'ant-sub-menu';
const SubMenu: FC<SubMenuProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClickTitle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={cls(prefixCls)}>
      <div className={`${prefixCls}-title`} onClick={onClickTitle}>
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
  );
};

export default SubMenu;
