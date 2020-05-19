import * as React from "react";
import { Menu } from "antd";

import { secondWordOfCamelCase } from "../../../utils/utils";

export default (items : Array<string>, setCallback : Function) => {
  return (
    <Menu className="js-mm-00">
      {items.map((item : string) => (
        <Menu.Item key={item} onClick={() => setCallback(item)}>
          <span className="menu-item-text">{secondWordOfCamelCase(item)}</span>
        </Menu.Item>
      ))}
    </Menu>
  );
}
