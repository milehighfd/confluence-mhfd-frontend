import * as React from "react";
import { Menu, MenuProps } from 'antd';

export default ({ dropdownItems, selectMapStyle }: any) => {
  const itemMenu: MenuProps['items'] = [];
  dropdownItems.items.forEach((item: any, index: number) => {
    itemMenu.push({
      key: `${index}|${item}`,
      label: <span className="menu-item-text">{item.type}</span>,
      onClick: (() => selectMapStyle(index))
    });
  });

  return <Menu style={{ background: '#fff' }} items={itemMenu}>
  </Menu>
}
