import React from "react";
import { Menu } from "antd";

export default (values: Array<{ name: string, id: string }>, items: Array<string>, setItem: Function, pos: number) => {
  return <> <Menu className="js-mm-00 sign-menu" onClick={(event) => {
    const auxItem = [...items];
    auxItem[pos] = event.item.props.eventKey;
    setItem(auxItem);
  }}>
    {values.map((item: { name: string, id: string }, index: number) => {
      return <Menu.Item key={item.id}>
          {item.name}
      </Menu.Item>
    })}
  </Menu> </>
}