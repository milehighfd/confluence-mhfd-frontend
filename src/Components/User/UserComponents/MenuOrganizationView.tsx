import React from "react";
import { Menu } from "antd";
import { User } from "../../../Classes/TypeList";
import { ORGANIZATION, CONSULTANT_CONTRACTOR } from "../../../constants/constants";
export default (values: User, setTitle: Function) => {
    return <Menu className="js-mm-00 sign-menu-organization"
        onClick={(event) => {
            const item: any = event.item;
            values.organization = item.props.children.props.children;
            setTitle(item.props.children.props.children);
        }}>
        <Menu.ItemGroup key="g3">
            <label className="label-sg">{'Local Government'}</label>
            {ORGANIZATION.map((item: string, index: number) => (<Menu.Item key={index + "g3"}><span>{item}</span></Menu.Item>))}
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2">
            <label className="label-sg">{'Consultant/Contractor'}</label>
            {CONSULTANT_CONTRACTOR.map((item: string, index: number) => (<Menu.Item key={index + "g2"}><span>{item}</span></Menu.Item>))}
        </Menu.ItemGroup>
    </Menu>
};
