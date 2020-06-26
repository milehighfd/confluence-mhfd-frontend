import React, { useState } from 'react';
import { Input, Row, Dropdown, Button, Menu } from 'antd';
import {CaretUpOutlined, CaretDownOutlined} from '@ant-design/icons';
import CardsView from "./CardsView";

import { ProjectTypes } from '../../../Classes/MapTypes';
import { STATUS_PROJECT } from '../../../constants/constants';


export default ({ type, datas, search }: { type: string, datas: Array<any>, search: Function }) => {
  const { Search } = Input;
  const [options, setOptions] = useState({ requestName: '', status: '' });
  const numberWithCommas = (x: number) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
  }
  console.log(type, datas);
  const getItemValues = (id: string, name: string) => {
    const auxOptions = { ...options };
    auxOptions.status = id;
    setOptions(auxOptions);
    search(auxOptions);
  }
  const menu = () => {
    return <Menu className="js-mm-00">
      {STATUS_PROJECT.map((status: { name: string, id: string }, index: number) => {
        return <Menu.Item key={index} onClick={() => getItemValues(status.id, status.name)}>
          <span className="menu-item-text">{status.name}</span>
        </Menu.Item>
      })}
    </Menu>
  }

  return <Row style={{ background: '#fff', marginTop: '0px', padding: '20px 35px'}} className="card-map" gutter={[16, 16]}>
    <div className="user-filter profile-filter">
      <div>
        <Search
          placeholder="Search by Name"
          onSearch={value => {
            const auxOptions = { ...options };
            auxOptions.requestName = value;
            setOptions(auxOptions);
            search(auxOptions);
          }}
          style={{ width: 240 }}
        />
      </div>
      <div style={{display: 'flex'}}>
        <Dropdown overlay={menu()} trigger={['click']}>
          <Button className="profile-bystatus">
            {options.status ? STATUS_PROJECT.filter(element => element.id === options.status)[0].name : 'By Status'}
          </Button>
        </Dropdown>

        <label className="sort-by">
          <CaretUpOutlined className="arrow-up"/>
          <CaretDownOutlined className="arrow-down" />
        </label>
      </div>
    </div>
    {datas.map((data: any, index: number) => {
      return <CardsView key={index} data={data} type={type} numberWithCommas={numberWithCommas} />
    })}
  </Row>
}
