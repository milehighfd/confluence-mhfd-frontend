import React, { useState } from 'react';
import { Dropdown, Button, Input, Menu, MenuProps } from 'antd';
import { SERVICE_AREA, ORGANIZATION, CONSULTANT_CONTRACTOR, RADIO_ITEMS, YEAR } from "../../constants/constants";

export default () => {
  const [year, setYear] = useState('');
  const MenuOrganization = () => {
    const itemYear: any = [];
    YEAR.forEach((item: string) => {
      itemYear.push({
        key: `${item}`,
        label: <span>{item}</span>
      });
    });
    return <Menu
      className="js-mm-00 sign-menu-organization"
      items={itemYear}
      onClick={(event) => (setYear(event.key))}
    >
    </Menu>
  };

  return (
    <div className="user-filter">
      <div id={"filter-organization"}>
        <Dropdown trigger={['click']} overlay={MenuOrganization} getPopupContainer={() => document.getElementById("filter-organization" ) as HTMLElement}
          overlayClassName="dropdown-special-bottomLeft">
          <Button className="btn-borde">
            {year ? year : 'Most recent board year'}  <img src="/Icons/icon-12.svg" alt="" />
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}
