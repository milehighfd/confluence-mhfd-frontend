import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Collapse, Dropdown, Input, AutoComplete, Menu, Popover, Row, Select, Tabs } from 'antd';
import { DownOutlined, HeartFilled, HeartOutlined, InfoCircleOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import DetailModal from "routes/detail-page/components/DetailModal";
import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER } from "constants/constants";
import * as datasets from "../../../Config/datasets";
import { useMapDispatch } from "hook/mapHook";
import { SERVER } from 'Config/Server.config';
import { usePortflioState, usePortfolioDispatch } from '../../../hook/portfolioHook';

const { TabPane } = Tabs;
const { Panel } = Collapse;
const tabKeys = ['Capital(67)', 'Study', 'Maintenance', 'Acquisition', 'Special'];
const popovers: any = [
  <div className="popoveer-00"><b>Capital:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
  <div className="popoveer-00"><b>Study:</b> Master plans that identify problems and recommend improvements.</div>,
  <div className="popoveer-00"><b>Maintenance:</b> Restore existing infrastructure eligible for MHFD participation.</div>,
  <div className="popoveer-00"><b>Acquisition:</b> Property with high flood risk or needed for improvements.</div>,
  <div className="popoveer-00"><b>Special:</b> Any other effort for which MHFD funds or staff time is requested.</div>
]
const SearchDropdown = (
  {
    rawData,
    groupsBy,
    setCurrentGroup,
    fullData,
    setOpenTable,
  }
    : {
      rawData: any,
      groupsBy: any[],
      setCurrentGroup: Function,
      fullData: any,
      setOpenTable: Function,
    }) => {

  const [keyword, setKeyword] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [activeDrop, setActiveDrop] = useState(0);
  const [openDrop, setOpenDrop] = useState<boolean>(false)
  const {
    setProjectKeyword
  } = useMapDispatch();
  const {
    searchWord
  } = usePortflioState();
  const {
    setSearchWord
  } = usePortfolioDispatch();

  let displayedTabKey = tabKeys;
  const content = (
    <div style={{ width: '137px' }}>
      <p style={{ marginBottom: '0px' }}>This is a sample blurb describing the project. Alternatively we can open the detail page.</p>
    </div>
  );
  const menu = (
    <Menu
      className="menu-drop"
      items={[
        {
          key: '1',
          label: <p style={{ fontWeight: '700', color: '#11093C', opacity: '0.5', fontSize: '12px', marginBottom: '2px', marginLeft: '3px' }}>Group By</p>,
          type: 'group',
          children: groupsBy.map((gb, index) => {
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
  const sortedData = rawData.filter((elem: any) => elem.id.includes('Title'));
  const completeData = sortedData.map((elem: any) => {
    const filtered = rawData.filter((elemRaw: any) => !elemRaw.id.includes('Title') && elemRaw.headerLabel === elem.headerLabel);
    return {
      ...elem,
      values: filtered.filter((v: any, index: any) => {
        return filtered.findIndex((v2: any) => v.project_id === v2.project_id) === index;
      })
    }
  });

  useEffect(() => {
    if (searchWord) {
      setFilteredData(fullData.filter((item: any) => !item.id.includes('Title') && item.rowLabel.toLowerCase().includes(searchWord.toLowerCase())));
    } else {
      setFilteredData([]);
    }
  }, [searchWord, fullData]);
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