import React from "react";
import { Menu } from "antd";
import { User } from "../../../Classes/TypeList";

export default (items: Array<string>, fieldName: string, values: User, setTitle: Function) => (
    <Menu className="js-mm sign-menu">
        <label>CITY</label>
        {items.map((item: string, index: number) => {
            return <Menu.Item key={index} onClick={() => {
                if (fieldName === 'city') {
                    values.city = item;
                } else if (fieldName === 'county') {
                    values.county = item;
                } else if (fieldName === 'serviceArea') {
                    values.serviceArea = item;
                }
                const auxTitle = item;
                setTitle(auxTitle);
            }}>
                <a target="_blank" rel="noopener noreferrer">
                    {item}
                </a>
            </Menu.Item>
        })}
    </Menu>);