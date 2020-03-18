import React, { useState } from "react";
import { Menu } from "antd";

export default ({values, items, item, setItem, field}: any) => {

    return <> <Menu className="js-mm-00" onClick={(event) => {
        values[field] = event.item.props.children.props.children;
        const auxItem = event.item.props.children.props.children
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