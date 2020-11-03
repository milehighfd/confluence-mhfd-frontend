import React from 'react';
import { Dropdown, Button, Input, Menu } from 'antd';
import { SERVICE_AREA, ORGANIZATION, CONSULTANT_CONTRACTOR, RADIO_ITEMS } from "../../constants/constants";
import { OptionsFiltersUser } from '../../Classes/TypeList';

const SORT = ['Name', 'Organization', 'Service Area', 'Designation', 'Date Registered'];
const SORT_ITEMS = [{ name: 'Name', value: 'name' }, { name: 'Organization', value: 'organization' }, { name: 'Service Area', value: 'serviceArea' }, { name: 'Designation', value: 'designation' }, { name: 'Date Registered', value: 'createdAt' }];
const ROLES = ['MHFD Admin', 'MHFD Staff', 'Local Government Admin', 'Local Government', 'Consultant / Contractor', 'Other'];
export default ({ option, setOption, search, reset, title }: { option: OptionsFiltersUser, setOption: Function, search: Function, reset: Function, title: string }) => {
  const { Search } = Input;
  const menu = (list: Array<string>, title: string, defaultValue: string) => (
    <Menu className="js-mm-00 sign-menu"
      onClick={(event) => {
        const auxOption = { ...option };
        const val = event.key !== 'all' ? event.item.props.children.props.children : ''
        if (title === 'organization') {
          auxOption.organization = val;
        } else if (title === 'serviceArea') {
          auxOption.serviceArea = val;
        } else if (title === 'designation') {
          auxOption.designation = event.key !== 'all' ? RADIO_ITEMS.filter(item => item.name === val)[0].value : '';
        } else if (!title) {
          auxOption.sort = SORT_ITEMS.filter(item => item.name === val)[0].value;
        }
        setOption(auxOption);
        search(auxOption);
      }}>
      {defaultValue ? <Menu.Item key="all">
        <span className="user-filter-items-text">
          {defaultValue} - All
          </span>
      </Menu.Item> : ''}
      {list.map((element: string, index: number) => {
        return <Menu.Item key={index}>
          <span className="user-filter-items-text">
            {element}
          </span>
        </Menu.Item>
      })}
    </Menu>
  );
  const MenuOrganization = () => (<Menu className="js-mm-00 sign-menu-organization"
    onClick={(event) => {
      const auxOption = { ...option };
      const val = event.key !== 'all' ? event.item.props.children.props.children : ''
      auxOption.organization = val;
      setOption(auxOption);
      search(auxOption);
    }}>
    <Menu.Item key={"all"}><span>Organization - All</span></Menu.Item>
    <Menu.ItemGroup key="g1" title="Organization">
      {ORGANIZATION.map((item: string, index: number) => (<Menu.Item key={index + "g1"}><span>{item}</span></Menu.Item>))}
    </Menu.ItemGroup>
    <Menu.ItemGroup key="g2" title="Consultant / Contractor">
      {CONSULTANT_CONTRACTOR.map((item: string, index: number) => (<Menu.Item key={index + "g2"}><span>{item}</span></Menu.Item>))}
    </Menu.ItemGroup>
    {/* <Menu.ItemGroup key="g3" title="Jurisdiction">
      {JURISDICTION.map((item: string, index: number) => (<Menu.Item key={index + "g3"}><span>{item}</span></Menu.Item>))}
    </Menu.ItemGroup> */}
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

      <div id={"filter-organization" + title}>
        <Dropdown trigger={['click']} overlay={MenuOrganization} getPopupContainer={() => document.getElementById("filter-organization" + title ) as HTMLElement}
          overlayClassName="dropdown-special-bottomLeft">
          <Button>
            {option.organization ? option.organization : 'Organization'}  <img src="/Icons/icon-12.svg" alt="" />
          </Button>
        </Dropdown>
      </div>
      <div id={"filter-service-area" + title}>
        <Dropdown trigger={['click']} overlay={menu(SERVICE_AREA, 'serviceArea', 'Service Area')}
          getPopupContainer={() => document.getElementById("filter-service-area" + title ) as HTMLElement}>
          <Button>
            {option.serviceArea ? option.serviceArea : 'Service Area'}
            <img src="/Icons/icon-12.svg" alt="" />
          </Button>
        </Dropdown>
      </div>

      <div id={"filter-designation" + title}>
        <Dropdown trigger={['click']} overlay={menu(ROLES, 'designation', 'User Designation')}
          getPopupContainer={() => document.getElementById("filter-designation" + title ) as HTMLElement}>
          <Button>
            {option.designation ? RADIO_ITEMS.filter(item => item.value === option.designation)[0].name : 'User Designation'}
            <img src="/Icons/icon-12.svg" alt="" />
          </Button>
        </Dropdown>
      </div>

      <div>
        <Button className="f-btn" onClick={() => {
          reset();
        }}>Reset</Button>
      </div>

      <div className="btn-r" id={"filter-sort" + title}>
        <label>Sort by:</label>
        <Dropdown trigger={['click']} overlay={menu(SORT, '', '')} getPopupContainer={() => document.getElementById("filter-sort" + title ) as HTMLElement}>
          <Button>
            {SORT_ITEMS.filter(item => item.value === option.sort)[0].name}
            <img src="/Icons/icon-14.svg" alt="" />
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}
