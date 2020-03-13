import React, { useState } from "react";
import { Menu } from "antd";

export default ({items, item, setItem, field}: any) => {

    return <> <Menu className="js-mm-00" onClick={(event) => {
        const auxItem = {...item};
        auxItem[field] = event.item.props.children.props.children;
        setItem(auxItem);
    }}>
        {items.map( (item: string, index: number) => {
            return <Menu.Item key={index}>
                <a target="_blank" rel="noopener noreferrer">
                    {item}
                </a>
            </Menu.Item>
        })}
  </Menu> </>
}