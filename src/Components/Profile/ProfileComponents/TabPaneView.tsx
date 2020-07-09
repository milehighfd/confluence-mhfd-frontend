import React, { useState } from 'react';
import { Input, Row, Dropdown, Button, Menu } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';

import CardsView from "./CardsView";
import { SORTED_PROBLEMS, SORTED_PROJECTS } from '../../../constants/constants';

const { Search } = Input;

export default ({ type, data, search }: { type: string, data: Array<any>, search: Function }) => {
  let totalElement = data.length;
  const size = 8;
  let sw = false;
  if (totalElement) {
    sw = true;
  }
  const valueDropdown = type === 'Problems' ? SORTED_PROBLEMS : SORTED_PROJECTS;
  const [options, setOptions] = useState({ keyword: "", column: type === 'Problems' ? 'problemname' : 'streamname', order: "asc" });
  const [state, setState] = useState({
    items: Array.from({ length: size }),
    hasMore: true
  });
  const numberWithCommas = (x: number) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
  }
  const menu = () => {
    return <Menu className="js-mm-00">
      {valueDropdown.map((item: { name: string, title: string }, index: number) => {
        return <Menu.Item key={index} onClick={() => {
          const auxOptions = { ...options };
          auxOptions.column = item.name;
          setOptions(auxOptions);
          search(auxOptions);
        }}>
          <span className="menu-item-text">{item.title}</span>
        </Menu.Item>
      })}
    </Menu>
  }
  const fetchMoreData = () => {
    if (state.items.length >= totalElement - size) {
      const auxState = { ...state };
      if (state.items.length !== data.length) {
        auxState.items = state.items.concat(Array.from({ length: totalElement - state.items.length }));
      }
      auxState.hasMore = false;
      setState(auxState);
      return;
    }
    setTimeout(() => {
      const auxState = { ...state };
      auxState.items = state.items.concat(Array.from({ length: size }));
      setState(auxState);
    }, 500);
  };

  return <Row style={{ background: '#fff', marginTop: '0px', padding: '20px 35px' }} className="card-map" gutter={[16, 16]}>
    <div className="user-filter profile-filter">
      <div>
        <Search
          placeholder="Search by Name"
          onSearch={(value: string) => {
            const auxOptions = { ...options };
            auxOptions.keyword = value;
            setOptions(auxOptions);
            search(auxOptions);
          }}
          style={{ width: 240 }}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <Dropdown overlay={menu()} trigger={['click']}>
          <Button className="profile-bystatus">
            Sort by {valueDropdown.filter(element => element.name === options.column)[0]?.title}
          </Button>
        </Dropdown>
        <span className="sort-by" onClick={() => {
            const auxOptions = { ...options };
            auxOptions.order = options.order === 'asc' ? 'desc' : 'asc';
            setOptions(auxOptions);
            search(auxOptions);
        }}>
          <CaretUpOutlined
            className="arrow-up"
            style={{
              opacity: options.order === 'asc' ? '100%' : '30%'
            }}
          />
          <CaretDownOutlined
            className="arrow-down"
            style={{
              opacity: options.order === 'desc' ? '100%' : '30%'
            }}
          />
        </span>
      </div>
    </div>
    <InfiniteScroll
      dataLength={state.items.length}
      next={fetchMoreData}
      hasMore={state.hasMore}
      loader={data.length ? <h4>Loading...</h4> : ''}
      height={window.innerHeight - 400}
      endMessage={''}>
      {sw ? state.items.map((i, index: number) => {
        return data[index] && <CardsView key={index} data={data[index]} type={type} numberWithCommas={numberWithCommas} />
      }) : ''}
    </InfiniteScroll>
  </Row>
}
