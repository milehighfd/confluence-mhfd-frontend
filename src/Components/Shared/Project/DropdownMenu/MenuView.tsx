import React from "react";
import { Menu } from "antd";

export default ({values, items, item, setItem, field}: any) => {

    return <> <Menu className="js-mm-00" onClick={(event) => {
        values[field] = event.item.props.children.props.rel;
        const auxItem = event.item.props.children.props.children;
        setItem(auxItem);
    }}>
        {items.map( (item: {name: Object, id: Object}, index: number) => {
            return <Menu.Item key={index}>
                <a target="_blank" rel={'' + item.id}>
                    {item.name}
                </a>
            </Menu.Item>
        })}
  </Menu> </>
}