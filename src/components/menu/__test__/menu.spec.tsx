import renderer from 'react-test-renderer';
import Menu from '../menu';
import SubMenu from '../sub-menu';
import MenuItem from '../menu-item';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

const menuList = [
  {
    key: '1',
    title: 'option 1',
    children: [
      {
        key: '1-1',
        title: 'option 1-1',
      }
    ]
  },
  {
    key: '2',
    title: 'option 2',
    children: [
      {
        key: '2-1',
        title: 'option 2-1',
      },
      {
        key: '2-2',
        title: 'option 2-2',
        children: [
          {
            key: '2-2-1',
            title: 'option 2-2-1',
          }
        ]
      }
    ]
  },
  {
    key: '3',
    title: 'option 3',
  }
];
const getMenus = (menus: any) => {
  return menus.map((menu: any) => {
    if (menu.children) {
      return (
        <SubMenu className={`test-${menu.key}`} key={menu.key} id={menu.key} title={menu.title}>
          {/* can recognize different content versus vue named slots ? */}
          {getMenus(menu.children)}
        </SubMenu>
      );
    }
    return <MenuItem className={`test-${menu.key}`} key={menu.key} id={menu.key}>{menu.title}</MenuItem>;
  });
};
describe('Menu', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Menu>{getMenus(menuList)}</Menu>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should set selectedKey', () => {
    const { container } = render(<Menu className={'test-menu'} selectedKey="3">{getMenus(menuList)}</Menu>);
    expect(container.querySelector('.test-3')).toHaveClass('selected');
  });
  it('should set openedKeys', () => {
    const { container } = render(<Menu className={'test-menu'} openedKeys={['1']}>{getMenus(menuList)}</Menu>);
    expect(container.querySelector('.test-1 .ant-sub-menu-children')?.children.length).toBe(1);
  });
  it('should trigger onSelect when click menu item', () => {
    const onSelect = jest.fn();
    const { container } = render(<Menu className={'test-menu'} selectedKey=""
                                       onSelect={onSelect}>{getMenus(menuList)}</Menu>);
    const menu = container.querySelector('.test-menu');
    fireEvent.click(menu?.lastChild!);
    expect(onSelect).toHaveBeenCalledWith('3', { id: '3', title: 'option 3' });
  });
  it('should trigger onOpenChange when click sub menu', () => {
    const onOpenChange = jest.fn();
    const { container } = render(
      <Menu
        className={'test-menu'}
        selectedKey=""
        openedKeys={[]}
        onOpenChange={onOpenChange}
      >
        {getMenus(menuList)}
      </Menu>
    );
    fireEvent.click(container.querySelector('.test-2 div')!);
    expect(onOpenChange).toHaveBeenCalledWith(['2'], { id: '2', title: 'option 2' });
  });
});
