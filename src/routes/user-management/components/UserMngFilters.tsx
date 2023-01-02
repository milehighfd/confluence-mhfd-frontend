import React, { useEffect, useState } from 'react';
import { Dropdown, Button, Input, Menu, MenuProps, Select } from 'antd';
import { SERVICE_AREA, ORGANIZATION, CONSULTANT_CONTRACTOR, RADIO_ITEMS } from "../../../constants/constants";
import { OptionsFiltersUser } from '../../../Classes/TypeList';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';
import * as datasets from "../../../Config/datasets";
import { SERVER } from "Config/Server.config";
import { getName } from '../utils';

const SORT = ['Name', 'Organization', 'Service Area', 'Designation', 'Date Registered'];
const SORT_ITEMS = [{ name: 'Name', value: 'name' },
  { name: 'Organization', value: 'organization' }, 
  { name: 'Service Area', value: 'serviceArea' }, 
  { name: 'Designation', value: 'designation' }, 
  { name: 'Date Registered', value: 'createdAt' }
 ];
const ROLES = ['MHFD Senior Manager', 'MHFD Staff', 'Local Government', 'Consultant / Contractor', 'Other'];
const menuServiceAreaView = (items: Array<any> = [], option: any, setOption: any) => {
  console.log('the items are ', items);
  const auxOption = { ...option };
  const itemMenu: MenuProps['items'] = [];
  items.forEach((item: any, index: number) => {
    itemMenu.push({
      key: `${index}|${item}`,
      label: <span style={{border:'transparent'}} className="menu-item-text">{item.service_area_name}</span>,
      onClick: (() => {
        auxOption.serviceArea = item.code_service_area_id;
        setOption(auxOption);
      })
    });
  });
  return <Menu className="js-mm-00 sign-menu" items={itemMenu}>
  </Menu>
};

const UserMngFilters = ({ option, setOption, search, reset, title }: { option: OptionsFiltersUser, setOption: Function, search: Function, reset: Function, title: string }) => {
  const { Search } = Input;
  const [serviceArea, setServiceArea] = useState<any[]>([]);
  
  useEffect(() => {
    datasets.getData(SERVER.ALL_GROUP_ORGANIZATION)
    .then((rows) => {
      const org = rows
      setServiceArea([{ code_service_area_id: -1, service_area_name: 'None' }, ...org.servicearea]);
    }).catch((e) => {
      console.log(e);
    });
  }, []);

  const menu = (list: Array<string>, title: string, defaultValue: string) => {
    const itemMenu: MenuProps['items'] = [];
    if (defaultValue) {
      itemMenu.push({ key: `all|${title}`, label: <span style={{border:'transparent'}}  className="menu-drop-sub menu-sub-drop">Organization - All</span> });
    }
    list.forEach((element: string, index: number) => {
      itemMenu.push({
        key: `${index}|${element}`,
        label: <span style={{border:'transparent'}} className="user-filter-items-text menu-drop-sub menu-sub-drop">{element}</span>
      });
    });
    return <Menu
      className="js-mm-00 sign-menu-organization"
      items={itemMenu}
      onClick={(event) => {
        const auxOption = { ...option };
        const val = event.key.split('|')[0] !== 'all' ? event.key.split('|')[1] : '';
        switch (title) {
          case 'organization':
            auxOption.organization = val;
            break;
          case 'serviceArea':
            auxOption.serviceArea = val;
            break;
          case 'designation':
            auxOption.designation = event.key.split('|')[0] !== 'all' ? RADIO_ITEMS.filter(item => item.name === val)[0].value : '';
            break;
          default:
            auxOption.sort = SORT_ITEMS.filter(item => item.name === val)[0].value;
            break;
        };
        setOption(auxOption);
        search(auxOption);
      }}>
    </Menu>
  };

  const MenuOrganization = () => {
    const itemOrganization: any = [];
    const itemConsultant: any = [];
    ORGANIZATION.forEach((item: string, index: number) => {
      itemOrganization.push({
        key: `${index}|${item}`,
        label: <span style={{border:'transparent'}} className="menu-drop-sub menu-sub-drop">{item}</span>
      });
    });
    CONSULTANT_CONTRACTOR.forEach((item: string, index: number) => {
      itemConsultant.push({
        key: `${index}|${item}`,
        label: <span style={{border:'transparent'}}  className="menu-drop-sub menu-sub-drop">{item}</span>
      });
    });
    const itemMenuOrganization: MenuProps['items'] = [
      { key: 'all|all', label: <span style={{border:'transparent'}}>Organization - All</span> },
      { key: 'organization-items', type: 'group', label: 'Organization', children: itemOrganization },
      { key: 'consultant-items', type: 'group', label: 'Consultant / Contractor', children: itemConsultant },
    ];
    return <Menu
      className="js-mm-00 sign-menu-organization"
      items={itemMenuOrganization}
      onClick={(event) => {
        const auxOption = { ...option };
        const val = event.key !== 'all|all' ? event.key.split('|')[1] : '';
        auxOption.organization = val;
        setOption(auxOption);
        search(auxOption);
      }}>
    </Menu>
  };

  return (
    <>
    {/* <div className="user-filter-mng" > */}
      {/* <div> */}
        <Search
          placeholder="Search by Name"
          onSearch={value => {
            const auxOption = { ...option };
            auxOption.name = value;
            setOption(auxOption);
            search(auxOption);
          }}
          style={{ width: '30%', marginRight:'10px', height: '36px', borderRadius:'5px'}}
          // style={{ width: '30%', marginRight:'10px', height: '40px', borderRadius:'5px'}}
          // style={{ width: 240, paddingRight: '10px' }}
          // prefix={<SearchOutlined />}
        />
      {/* </div> */}

      <div id={"filter-organization" + title} className="filter-area">
        <Dropdown trigger={['click']} overlay={MenuOrganization} getPopupContainer={() => document.getElementById("filter-organization" + title ) as HTMLElement}
          overlayClassName="dropdown-special-bottomLeft-filter" >
          <Button className="btn-borde" >
            {option.organization ? option.organization : 'Organization'}
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <div id={"filter-service-area" + title}  className="filter-area">
        <Dropdown trigger={['click']} overlay={menuServiceAreaView(serviceArea, option, setOption)}
        overlayClassName="dropdown-special-bottomLeft-filter"
          getPopupContainer={() => document.getElementById("filter-service-area" + title ) as HTMLElement}>
          <Button className="btn-borde">
            {option.serviceArea ? getName(option.serviceArea, serviceArea, 'code_service_area_id', 'service_area_name') : 'Service Area'}
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      <div id={"filter-designation" + title}  className="filter-area">
        <Dropdown trigger={['click']} overlay={menu(ROLES, 'designation', 'User Designation')}
        overlayClassName="dropdown-special-bottomLeft-filter"
          getPopupContainer={() => document.getElementById("filter-designation" + title ) as HTMLElement}>
          <Button className="btn-borde">
            {option.designation ? RADIO_ITEMS.filter(item => item.value === option.designation)[0].name : 'User Designation'}
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      <Button className="btn-purple" style={{height:'36px', width:'8%'}} onClick={() => {
          reset();
        }}>Reset</Button>

      {/* <div className="btn-r" id={"filter-sort" + title}>
        <label>Sort by:</label>
        <Dropdown trigger={['click']} overlay={menu(SORT, '', '')} getPopupContainer={() => document.getElementById("filter-sort" + title ) as HTMLElement}>
          <Button className="btn-borde"> 
            {SORT_ITEMS.filter(item => item.value === option.sort)[0].name}
            <img src="/Icons/icon-14.svg" alt="" />
          </Button>
        </Dropdown>
      </div> */}
    {/* </div> */}
    </>
  )
};

export default UserMngFilters;
