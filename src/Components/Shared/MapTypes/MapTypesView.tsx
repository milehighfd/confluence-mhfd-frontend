import * as React from "react";
import { Menu  } from 'antd';

export default ({dropdownItems, selectMapStyle} : any) => {

  return <Menu style={{ background: '#fff' }}>
          {dropdownItems.items.map((item : any, index : number) => {
            return <Menu.Item onClick={() => selectMapStyle(index)} key={index} >{item.type}</Menu.Item>
          })}
        </Menu>
}
