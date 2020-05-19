import React from "react";
import { Menu } from "antd";

export default ({ values, items, setItem, field }: any) => {

  const getItemValues = (id: string, name: string) => {
    values[field] = id;
    const auxItem = name;
    setItem(auxItem);
  }

  return (
    <Menu className="js-mm-00">
      {items.map((item: { name: string, id: string }, index: number) => {
        return <Menu.Item key={index} onClick={() => getItemValues(item.id, item.name)}>
          <span className="menu-item-text">
            {item.name}
          </span>
        </Menu.Item>
      })}
    </Menu>
  );
}
