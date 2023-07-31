import React, { Fragment, useState } from 'react';
import { Button, Input, Popover } from 'antd';
import DownloadCSV from 'Components/Work/Request/Toolbar/DownloadCSV';
import ShareURL from 'Components/Work/Request/Toolbar/ShareURL';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { MEDIUM_SCREEN_RIGHT } from 'constants/constants';
import { SearchOutlined } from '@ant-design/icons';

const ButtonGroup = Button.Group;

const Toolbar = ({
  type,
}:{
  type: string,
}) => {
  const {
    locality,
    year,
    tabKey,
    sumTotal,
    sumByCounty,
    leftWidth,
    localities,
    columns2: columns,
    diff,
    reqManager,
  } = useRequestState();
  const {
    setShowBoardStatus,
    setShowAnalytics,
    setShowFilters,
  } = useRequestDispatch();
  // function setShowFilters(arg0: boolean): void {
  //   throw new Error('Function not implemented.');
  // }

  
  const [showSearch, setShowSearch] = useState(false);

  const handleIconClick = () => {
    setShowSearch(!showSearch);
  };

  const handleBlur = () => {
    setShowSearch(false);
  };

  return (
    <Fragment>
      <div className='work-header-buttons'>
      <Button
      className='buttons-header' 
      type='link' style={{border:'none', backgroundColor:'transparent', outline:'none', boxShadow:'none'}}>
          <div style={{ display: showSearch ? 'inline-block' : 'none' }}>
            <Input
              onBlur={handleBlur}
              className='search-input'
              style={{display:'inline-block', width:'80%',height:'22px'}}
            />
          </div>
          <div style={{ display: 'inline-block' }} onClick={handleIconClick}>
            <img className="icon-bt"
              style={{ WebkitMask: "url('/Icons/ic-search.svg') no-repeat center" }}
              alt="" />
          </div>
          </Button>
        {/* {
          (locality === 'Mile High Flood District' || type === 'WORK_REQUEST') && */}
          <Popover content={<span>Export:<br/>Download a CSV of the board below.</span>} placement='bottom' overlayClassName='popover-work-header' >
          <Button
          className='buttons-header'
           type='link'
          style={{border:'none'}}
            onClick={() => setShowBoardStatus(true)}
          >
            <img
              className="icon-bt"
              style={{ WebkitMask: "url('/Icons/icon-88.svg') no-repeat center" }}
              alt=""
            />
          </Button>
          </Popover>
        {/* }         */}
        <Popover
        className='buttons-header'
        content={<span>Export:<br/>Download a CSV of the board below.</span>} placement='bottom' overlayClassName='popover-work-header' >
        <Button type='link'
        style={{border:'none'}}         
          onClick={() => setShowAnalytics(true)}
        >
          <img
            className="icon-bt"
            style={{ WebkitMask: "url('/Icons/icon-89.svg') no-repeat center" }}
            alt=""
          />
        </Button>
        </Popover>
        <Popover 
        className='buttons-header'
        content={<span>Export:<br/>Download a CSV of the board below.</span>} placement='bottom' overlayClassName='popover-work-header' >
        <Button type='link'
        style={{border:'none'}}
          onClick={() => setShowFilters(true)}>
          <img
            className="icon-bt"
            style={{ WebkitMask: "url('/Icons/icon-73.svg') no-repeat center" }}
            alt="" />
        </Button>    
        </Popover>
        <DownloadCSV
          type={type === 'WORK_REQUEST' ? 'WORK_REQUEST': 'WORK_PLAN'}
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
