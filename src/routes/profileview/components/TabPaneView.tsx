import React, { useState, useEffect } from 'react';
import { Input, Row, Dropdown, Button, Menu } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';

import CardsView from "./CardsView";
import { SORTED_PROBLEMS, SORTED_PROJECTS } from '../../../constants/constants';
import store from '../../../store';
import { useMapDispatch } from '../../../hook/mapHook';
import { useDetailedState } from '../../../hook/detailedHook';

const { Search } = Input;

const TabPaneView = ({
  type,
  data,
  filter,
}: {
  type: string,
  data: Array<any>,
  filter: string,
}) => {
  const { detailed } = useDetailedState();
  const {
    favoriteCards: search,
  } = useMapDispatch();
  let totalElement = data.length;
  const datas = (type === 'Problems' || (type === 'Projects' && !filter)) ? data:  data.filter(element => element.projecttype === filter);
  const size = 8;
  let sw = false;
  if (totalElement) {
    sw = true;
  }
  const valueDropdown = type === 'Problems' ? SORTED_PROBLEMS : SORTED_PROJECTS;
  const user = store.getState().profile.userInformation;
  const [options, setOptions] = useState({ keyword: "", column: type === 'Problems' ? 'problemname' : 'projectname', order: "asc"});

  const [state, setState] = useState({
    items: Array.from({ length: size }),
    hasMore: true
  });

  const { deleteFavorite } = useMapDispatch();
  useEffect(() => {
    const auxState = { ...state };
    auxState.hasMore = true;
    setState(auxState);
  }, [totalElement])
  const menu = () => {
    return <Menu className="js-mm-00">
      {valueDropdown.map((item: { name: string, title: string }, index: number) => {
        return <Menu.Item key={index} onClick={() => {
          const auxOptions = { ...options };
          auxOptions.column = item.name;
          setOptions(auxOptions);
          console.log('aux ', auxOptions);
          search(user.email, type === 'Problems', auxOptions);
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
  const deleted = (id: number, type: string) => {
    deleteFavorite(user.email, id, type);
    search(user.email, type === 'problems', options);
  }
  return <Row style={{ background: '#fff', marginTop: '-4px', marginRight: '-2px', padding: '22px 20px', marginLeft: '-20px' }} className="card-map profile-mobile" gutter={[16, 16]}>
    <div className="user-filter profile-filter mobile-display">
      <div>
        <Search
          placeholder="Search by Name"
          onSearch={(value: string) => {
            const auxOptions = { ...options };
            auxOptions.keyword = value;
            setOptions(auxOptions);
            search(user.email, type === 'Problems', auxOptions);
          }}
          style={{ width: 240 }}
        />
      </div>
      <div style={{ display: 'flex', marginRight: '20px' }}>
        <Dropdown overlay={menu()} trigger={['click']}>
          <Button className="profile-bystatus">
            Sort by {valueDropdown.filter(element => element.name === options.column)[0]?.title}
          </Button>
        </Dropdown>
        <span className="sort-by" onClick={() => {
            
            const auxOptions = { ...options };

            auxOptions.order = options.order === 'asc' ? 'desc' : 'asc';
            setOptions(auxOptions);
            search(user.email, type === 'Problems', auxOptions);
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
    <div style={{ width: '100%', marginBottom: '-38px'}}>
      <InfiniteScroll
        dataLength={state.items.length}
        next={fetchMoreData}
        hasMore={state.hasMore}
       /*  loader={datas.length ? <h4>Loading...</h4> : ''} */
        loader={datas.length ? '': ''}
        height={window.innerHeight - 400}
        endMessage={''}>
        {sw ? datas.map((data, index: number) => {
          return data &&
            <CardsView
              key={'profile-card-' + data.cartodb_id}
              data={data}
              type={type}
              detailed={detailed}
              deleted={deleted}
            />
        }) : ''}
      </InfiniteScroll>
    </div>
  </Row>
};

export default TabPaneView;

