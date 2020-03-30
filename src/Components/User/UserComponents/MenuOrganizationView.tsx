import React from "react";
import { Menu } from "antd";
import { User } from "../../../Classes/TypeList";
import { ORGANIZATION, CONSULTANT_CONTRACTOR, JURISDICTION } from "../../../constants/constants";
export default (values : User, setTitle: Function) => {
    return <Menu className="js-mm sign-menu-organization"
        onClick={(event) => {
            values.organization = event.item.props.children;
            setTitle(event.item.props.children);
          }}>
        <Menu.ItemGroup key="g1" title="Organization">
            {ORGANIZATION.map((item: string, index: number) => (<Menu.Item key={index + "g1"}>{item}</Menu.Item>))}
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="Consultant / Contractor">
            {CONSULTANT_CONTRACTOR.map((item: string, index: number) => (<Menu.Item key={index + "g2"}>{item}</Menu.Item>))}
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g3" title="Jurisdiction">
            {JURISDICTION.map((item: string, index: number) => (<Menu.Item key={index + "g3"}>{item}</Menu.Item>))}
        </Menu.ItemGroup>
    </Menu>
};