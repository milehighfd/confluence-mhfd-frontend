import React, { useState } from "react";
import { Dropdown, Input, Menu } from 'antd';

import { useMapDispatch } from "hook/mapHook";
import { usePortfolioDispatch } from '../../../hook/portfolioHook';
import { GROUPS } from '../constants/constants';

const SearchDropdown = (
  {
    setOpenTable,
  }
    : {
      setOpenTable: Function,
    }) => {

  const [keyword, setKeyword] = useState('');
  const [activeDrop, setActiveDrop] = useState(0);
  const [openDrop, setOpenDrop] = useState<boolean>(false)
  const {
    setProjectKeyword
  } = useMapDispatch();
  const {
    setSearchWord,
    setCurrentGroup
  } = usePortfolioDispatch();

  const menu = (
    <Menu
      className="menu-drop"
      items={[
        {
          key: '1',
          label: <p style={{ fontWeight: '700', color: '#11093C', opacity: '0.5', fontSize: '12px', marginBottom: '2px', marginLeft: '3px' }}>Group By</p>,
          type: 'group',
          children: GROUPS.map((gb, index) => {
            return {
              key: `1-${index + 1}`,
              label: <div className={index === activeDrop ? "menu-drop-sub menu-sub-drop menu-active" : "menu-drop-sub menu-sub-drop"} onClick={() => { gb !=='MHFD Lead'?setCurrentGroup(gb.toLowerCase().replace(' ', '')):setCurrentGroup('staff'); setActiveDrop(index); setOpenDrop(false); setOpenTable([true, true, true]); }}>{gb}</div>,
              className: index === activeDrop ? " menu-active" : ""
            }
          })
        },
      ]}
    />
  );

  const handleSearch = (value: string) => {
    setSearchWord(value);
    setKeyword(value);
    setProjectKeyword(value);
  }
 
  return <>
    <div className="search" id='searchPortfolio'>
      <div className="search-head">
        <Input.Search
          id="search-input-listview"
          allowClear
          placeholder="Search"
          onChange={(e) => {
            setKeyword(e.target.value)
          }}
          onSearch={handleSearch}
          value={keyword}
        />
        <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft" onVisibleChange={(e: boolean) => { setOpenDrop(e) }} visible={openDrop}>
          <div className="select-area">
            <a onClick={(e) => { e.preventDefault(); setOpenDrop(!openDrop) }} style={{ marginLeft: '0.5vw' }} >
              <span className="ic-dots" />
            </a>
          </div>
        </Dropdown>
        <hr className="hr-collapse"/>
      </div>
    </div>
  </>
};

export default SearchDropdown;