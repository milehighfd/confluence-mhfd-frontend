import React, { useState } from 'react';
import { Dropdown, Button, Input, Menu } from 'antd';
import { YEAR } from "../../constants/constants";

export default () => {
  const [year, setYear] = useState('2022');
  const MenuOrganization = () => {
    const itemYear: any = [];
    YEAR.forEach((item: string) => {
      itemYear.push({
        key: `${item}`,
        label: <span style={{border:'transparent'}}>{item}</span>
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
        <span style={{color:'#11093C', paddingRight: '10px'}}>Most recent board year:</span>
        <Dropdown trigger={['click']} overlay={MenuOrganization} getPopupContainer={() => document.getElementById("filter-organization" ) as HTMLElement}
          overlayClassName="dropdown-special-bottomLeft">
          <Button className="btn-borde">
            {year ? year : ''}  <img src="/Icons/icon-12.svg" alt="" />
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}
