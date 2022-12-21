import React, { useState, useEffect } from 'react';
import { Input, Row, Dropdown, Button, Menu, MenuProps } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
// import CardsView from "./CardsView";
import { SORTED_PROBLEMS, SORTED_PROJECTS } from '../../../constants/constants';
import store from '../../../store';
import { useMapDispatch } from '../../../hook/mapHook';
import { useDetailedState } from '../../../hook/detailedHook';
import CardsView from 'routes/profile-view/components/CardsView';
import CardsViewProfile from './CardViewProfile';

const { Search } = Input;

const CardsList = ({
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
    const onClickItemMenu = (e: any)=> {
      const auxOptions = { ...options };
      auxOptions.column = e.key;
      setOptions(auxOptions);
      search(user.email, type === 'Problems', auxOptions);
    };
    const itemMenu: MenuProps['items'] = [];
    valueDropdown.forEach((element) => {
      itemMenu.push({
        key: element.name,
        label: <span className="menu-item-text">{element.title}</span>
      })
    });
    return <Menu className="profile-menu" items={itemMenu} onClick={onClickItemMenu} defaultSelectedKeys={['problemname']}>
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
    console.log('what is this used for??', type);
    search(user.email, type === 'problems', options);
  }
  return(
    <Row style={{ background: '#fff', marginTop: '-4px', marginRight: '-2px', marginLeft: '-20px' }} className="card-map profile-mobile" gutter={[16, 16]}>
    {/* <div style={{ width: '100%', marginBottom: '-38px' }}></div> */}
      <div style={{ width: '100%', marginBottom: '-38px' }}>
        <InfiniteScroll
          dataLength={state.items.length}
          next={fetchMoreData}
          hasMore={state.hasMore}
        /*  loader={datas.length ? <h4>Loading...</h4> : ''} */
          loader={datas.length ? '': ''}
          // height={window.innerHeight - 400}
          endMessage={''}>
          {sw ? datas.map((data, index: number) => {
            return data &&
              <CardsViewProfile
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
  )
};

export default CardsList;
