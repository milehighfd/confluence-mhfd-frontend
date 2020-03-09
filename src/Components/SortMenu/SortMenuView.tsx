import * as React from "react";
import { Menu } from "antd";

export default () => {
    return <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="">
                1st menu item
      </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="">
                2nd menu item
      </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="">
                3rd menu item
      </a>
        </Menu.Item>
    </Menu>
}