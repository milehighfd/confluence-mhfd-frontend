import React, { useEffect, useState } from 'react';
import { Dropdown, Button, Menu } from 'antd';
import { YEAR } from "../../constants/constants";
import ConfigurationService from '../../services/ConfigurationService';

export default () => {
  const [year, setYear] = useState('2022');
  const MenuOrganization = () => {
    const itemYear: any = [];
    YEAR.forEach((item: string) => {
      itemYear.push({
        key: `${item}`,
        label: <span style={{ border: 'transparent' }}>{item}</span>
      });
    });
    return <Menu
      className="js-mm-00 sign-menu-organization"
      items={itemYear}
      onClick={(event) => {
        ConfigurationService
          .updateConfiguration('BOARD_YEAR', event.key)
          .then(() => {
            setYear(event.key);
          })
          .catch((e) => {
            console.log(e);
          });
      }}
    >
    </Menu>
  };

  useEffect(() => {
    ConfigurationService
      .getConfiguration('BOARD_YEAR')
      .then((res) => {
        setYear((res.value));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="user-filter">
      <div id={"filter-organization"}>
        <span style={{ color: '#11093C', paddingRight: '10px' }}>Most recent board year:</span>
        <Dropdown trigger={['click']} overlay={MenuOrganization} getPopupContainer={() => document.getElementById("filter-organization") as HTMLElement}
          overlayClassName="dropdown-special-bottomLeft">
          <Button className="btn-borde">
            {year ? year : ''}  <img src="/Icons/icon-12.svg" alt="" />
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}
