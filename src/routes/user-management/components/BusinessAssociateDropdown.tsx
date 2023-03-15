import React, { useEffect, useState } from "react";
import { Button, Col, Collapse, Dropdown, Input, Layout, Menu, MenuProps, Popover, Radio, Row, Select, Switch, Table, Tabs } from 'antd';

import { DownOutlined } from "@ant-design/icons";

const BusinessAssociatesDropdown = ({
  businessAssociate,
  setSelectAssociate,
  setAssociateLabel,
  associateLabel,
  setPrimary,
  values
}: {
  businessAssociate: any,
  setSelectAssociate: any,
  setAssociateLabel: any,
  associateLabel: any,
  setPrimary: any,
  values:any
}) => {

  const [menu, setMenu] = useState<any>([]);
  const [dataMenu, setDataMenu] = useState<any>([]);

  useEffect(() => {
    const m: any[] = [], dm: any[] = [];
    businessAssociate.forEach((element: any) => {
      m.push({
        key: element.key,
        label: <span style={{border:'transparent'}}>{element.label}</span>
      });
      dm.push({
        ...element
      });
    });
    setMenu(m);
    setDataMenu(dm);
  }, [businessAssociate]);
  const menuBusinessAssociate = () => {
    console.log('sentido 0');
    return <Menu
      key={'organization'}
      className="js-mm-00 sign-menu-organization"
      items={menu}
      onClick={(event:any) => {
        console.log('click') 
        setSelectAssociate(event.key)
        setAssociateLabel((dataMenu.find((elm: any) => +elm.key === +event.key))?.label)  
        setPrimary((dataMenu.find((elm: any) => +elm.key === +event.key))?.primary_business_associate_contact_id)
      }}>
    </Menu>
  };
  return <>
    <Dropdown trigger={['click']} overlay={menuBusinessAssociate}
      getPopupContainer={() => document.getElementById(("county" + values.user_id)) as HTMLElement}>
      <Button className="btn-borde-management">
        {associateLabel === '' ? 'Select Business Associate' : associateLabel}  <DownOutlined />
      </Button>
    </Dropdown>
  </>
};

export const BusinessAssociatesDropdownMemoized = React.memo(BusinessAssociatesDropdown);