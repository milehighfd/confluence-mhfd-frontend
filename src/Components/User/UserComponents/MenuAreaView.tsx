import React from 'react';
import { Menu, MenuProps } from 'antd';
import { User } from '../../../Classes/TypeList';

const MenuAreaView = (items: Array<string> = [], fieldName: string, values: User, setTitle: Function) => {
  const itemMenu: MenuProps['items'] = [];
  items.forEach((item: string, index: number) => {
    itemMenu.push({
      key: `${index}|${item}`,
      label: <span style={{border:'transparent'}} className="menu-item-text">{item}</span>,
      onClick: (() => {
        if (fieldName === 'city') {
          values.city = item;
        } else if (fieldName === 'county') {
          values.county = item;
        } else if (fieldName === 'serviceArea') {
          values.serviceArea = item;
        }
        const auxTitle = item;
        setTitle(auxTitle);
      })
    });
  });
  return <Menu className="js-mm-00 sign-menu" items={itemMenu}>
  </Menu>
};

export default MenuAreaView;
