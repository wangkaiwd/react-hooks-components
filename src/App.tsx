import React, { useState } from 'react';
// import AutoComplete from "./components/auto-complete/auto-complete";
import Input from './components/input/input';
import Menu from './components/menu/menu';
import SubMenu from './components/menu/sub-menu';
import MenuItem from './components/menu/menu-item';
import menu from './components/menu/menu';

const initialDataSource = [
  {
    'id': 0,
    'label': '0'
  },
  {
    'id': 1,
    'label': '1'
  },
  {
    'id': 2,
    'label': '2'
  },
  {
    'id': 3,
    'label': '3'
  },
  {
    'id': 4,
    'label': '4'
  },
  {
    'id': 5,
    'label': '5'
  },
  {
    'id': 6,
    'label': '6'
  },
  {
    'id': 7,
    'label': '7'
  },
  {
    'id': 8,
    'label': '8'
  },
  {
    'id': 9,
    'label': '9'
  }
];
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
      }
    ]
  },
  {
    key: '3',
    title: 'option 3',
  }
];

function App () {
  const [selectedKey, setSelectedKey] = useState('');
  const getMenus = (menus: any) => {
    return menus.map((menu: any) => {
      if (menu.children) {
        return (
          <SubMenu key={menu.key} id={menu.key} title={menu.title}>
            {/* can recognize different content versus vue named slots ? */}
            {getMenus(menu.children)}
          </SubMenu>
        );
      }
      return <MenuItem key={menu.key} id={menu.key}>{menu.title}</MenuItem>;
    });
  };
  return (
    <div className="App">
      {/*<AutoComplete dataSource={initialDataSource} />*/}
      {/*<Input allowClear/>*/}
      <Menu selectedKey={selectedKey} onSelect={(key) => setSelectedKey(key)}>
        {getMenus(menuList)}
      </Menu>
    </div>
  );
}

export default App;
