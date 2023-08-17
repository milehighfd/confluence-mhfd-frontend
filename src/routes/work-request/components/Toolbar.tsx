import React, { Fragment, useState } from 'react';
import { Button, Input, Popover, Space } from 'antd';
import DownloadCSV from 'Components/Work/Request/Toolbar/DownloadCSV';
import ShareURL from 'Components/Work/Request/Toolbar/ShareURL';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { boardType } from 'Components/Work/Request/RequestTypes';
import { CloseCircleFilled, SearchOutlined } from '@ant-design/icons';

const Toolbar = ({
  type,
}:{
  type: boardType,
}) => {
  const {
    locality,
    year,
    tabKey,
    sumTotal,
    sumByCounty,
    localities,
    columns2: columns,
    diff,
    reqManager,
    filterRequest,
  } = useRequestState();
  const {
    setShowBoardStatus,
    setShowAnalytics,
    setShowFilters,
    loadColumns,
  } = useRequestDispatch();

  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState <any>();

  const handleIconClick = () => {
    setShowSearch(!showSearch);
  };

  const handdleSearch = (e : any) => {
    setSearchValue(e.target.value);
  };

  const search = () => {
    filterRequest.name = {searchValue, type: 'search_name'}
    loadColumns();
  };
  const handdle = () => {
    setSearchValue('');
    filterRequest.name = {searchValue : '', type: 'search_name'}
    loadColumns();
    setShowSearch(!showSearch);
  };

  const checkEnter = (e: any) => {
    if (e.key === 'Enter') {
      search();
    }
  }

  return (
    <Fragment>
      <div className='work-header-buttons'>
        <div style={{ display: showSearch ? 'inline-block' : 'none' }} className='input-search-wr-wp'>
          <Space size="large">
            <Input
              onChange={handdleSearch}
              onKeyUp={checkEnter}
              className='search-input'
              style={{ maxWidth: '254', height: '34px', borderRadius:'4px' }}
              placeholder="Search" 
              suffix={<CloseCircleFilled onClick={handdle} style={{color:'#11093c', opacity:'0.5'}}/>}
              value={searchValue}
              prefix={<SearchOutlined onClick={search} />}
              />
          </Space>
        </div>
        <Button
          style={{ display: showSearch ? 'none' : 'inline-block' }}
          className='buttons1'
          type='link'
        >
          {!showSearch &&<Popover className='buttons-header' content={<div className='popover-text'>Search:<br />Filter projects below by querying a name.</div>} placement="bottomLeft" overlayClassName='popover-work-header' >
            <div onClick={handleIconClick}>
            <img
              src='Icons/ic-000.svg'
              alt=""
            />
          </div>
          </Popover>}
        </Button>
          
        {
          (locality === 'Mile High Flood District' || type === 'WORK_REQUEST') &&
          <Popover className='buttons-header' content={<div className='popover-text'>Status:<br />Submit the board for Mile High's review.</div>} placement="bottomLeft" overlayClassName='popover-work-header' >
            <Button
              className='buttons'
              type='link'
              style={{ border: 'none' }}
              onClick={() => setShowBoardStatus(true)}
            >
              <img
                src='Icons/ic-001.svg'
                alt=""
              />
            </Button>
          </Popover>
        }
        <Popover
          className='buttons-header'
          content={<div className='popover-text'>Analytics:<br />Display project counts and estimates per year and either by county or service area.</div>} placement="bottomLeft" overlayClassName='popover-work-header' >
          <Button
           className='buttons' 
          type='link'
            
            onClick={() => setShowAnalytics(true)}
          >
            <img
              src='Icons/ic-002.svg'
              alt=""
            />
          </Button>
        </Popover>
        <Popover
          className='buttons-header'
          content={<div className='popover-text'>Filter:<br />Display projects by conditions such as project status and location.</div>} placement="bottomLeft" overlayClassName='popover-work-header' >
          <Button
          className='buttons'
          type='link'           
            onClick={() => setShowFilters(true)}>
            <img
              src='Icons/ic-003.svg'
              alt="" />
          </Button>
        </Popover>
        <DownloadCSV
          type={type}
          localities={localities}
          columns={columns}
          locality={locality}
          year={year}
          tabKey={tabKey}
          sumTotal={sumTotal}
          sumByCounty={sumByCounty}
          reqManager={reqManager}
          diff={diff}
        />
        <ShareURL />
      </div>
    </Fragment>
  )
};

export default Toolbar;
