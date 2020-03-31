import React from 'react';
import { Dropdown, Button, Input, Menu } from 'antd';
import { SERVICE_AREA, ORGANIZATION, CONSULTANT_CONTRACTOR, JURISDICTION, ROLE, RADIO_ITEMS } from "../../constants/constants";
import { OptionsFiltersUser } from '../../Classes/TypeList';

const SORT = ['Name', 'Organization', 'Service Area', 'Designation'];
const SORT_ITEMS = [{ name: 'Name', value: 'name' }, { name: 'Organization', value: 'organization' }, { name: 'Service Area', value: 'serviceArea' }, { name: 'Designation', value: 'designation' }];
const ROLES = ['MHFD Admin', 'MHFD Staff', 'Local Government Admin', 'Local Government', 'Consultant / Contractor', 'Other'];
export default ({ option, setOption, search, reset }: { option: OptionsFiltersUser, setOption: Function, search: Function, reset: Function }) => {
  const { Search } = Input;
  const menu = (list: Array<string>, title: string, defaultValue: string) => (
    <Menu className="js-mm-00 sign-menu"
      onClick={(event) => {
        const auxOption = { ...option };
        const val = event.key !== 'x' ? event.item.props.children.props.children : ''
        if (title === 'organization') {
          auxOption.organization = val;
        } else if (title === 'serviceArea') {
          auxOption.serviceArea = val;
        } else if (title === 'designation') {
          auxOption.designation = event.key !== 'x' ? RADIO_ITEMS.filter(item => item.name === val)[0].value : '';
        } else if (!title) {
          auxOption.sort = SORT_ITEMS.filter(item => item.name === val)[0].value;
        }
        setOption(auxOption);
        search(auxOption);
      }}>
      {defaultValue ? <Menu.Item key="x">
        <a target="_blank" rel="noopener noreferrer">
          {defaultValue} - All
          </a>
      </Menu.Item> : ''}
      {list.map((element: string, index: number) => {
        return <Menu.Item key={index}>
          <a target="_blank" rel="noopener noreferrer">
            {element}
          </a>
        </Menu.Item>
      })}
    </Menu>
  );
  const MenuOrganization = () => (<Menu className="js-mm sign-menu-organization"
    onClick={(event) => {
      const auxOption = { ...option };
      const val = event.key !== 'x' ? event.item.props.children : ''
      auxOption.organization = val;
      setOption(auxOption);
      search(auxOption);
    }}>
    <Menu.Item key={"x"}>Organization - All</Menu.Item>
    <Menu.ItemGroup key="g1" title="Organization">
      {ORGANIZATION.map((item: string, index: number) => (<Menu.Item key={index + "g1"}>{item}</Menu.Item>))}
    </Menu.ItemGroup>
    <Menu.ItemGroup key="g2" title="Consultant / Contractor">
      {CONSULTANT_CONTRACTOR.map((item: string, index: number) => (<Menu.Item key={index + "g2"}>{item}</Menu.Item>))}
    </Menu.ItemGroup>
    <Menu.ItemGroup key="g3" title="Jurisdiction">
      {JURISDICTION.map((item: string, index: number) => (<Menu.Item key={index + "g3"}>{item}</Menu.Item>))}
    </Menu.ItemGroup>
  </Menu>);
  return (
    <div className="user-filter">
      <div>
        <Search
          placeholder="Search by Name"
          onSearch={value => {
            const auxOption = { ...option };
            auxOption.name = value;
            setOption(auxOption);
            search(auxOption);
          }}
          style={{ width: 240 }}
        />
      </div>

      <div>
        <Dropdown overlay={MenuOrganization}>
          <Button>
            {option.organization ? option.organization : 'Organization'}  <img src="Icons/icon-12.svg" alt="" />
          </Button>
        </Dropdown>
      </div>
      <div>
        <Dropdown overlay={menu(SERVICE_AREA, 'serviceArea', 'Service Area')}>
          <Button>
            {option.serviceArea ? option.serviceArea : 'Service Area'}
            <img src="Icons/icon-12.svg" alt="" />
          </Button>
        </Dropdown>
      </div>

      <div>
        <Dropdown overlay={menu(ROLES, 'designation', 'User Designation')}>
          <Button>
            {option.designation ? RADIO_ITEMS.filter(item => item.value === option.designation)[0].name : 'User Designation'}
            <img src="Icons/icon-12.svg" alt="" />
          </Button>
        </Dropdown>
      </div>

      <div>
        <Button className="f-btn" onClick={() => {
          reset();
        }}>Reset</Button>
      </div>

      <div className="btn-r">
        <label>Sort by:</label>
        <Dropdown overlay={menu(SORT, '', '')}>
          <Button>
            {SORT_ITEMS.filter(item => item.value === option.sort)[0].name}
            <img src="Icons/icon-14.svg" alt="" />
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}
