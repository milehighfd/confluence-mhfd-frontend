import React, { Fragment } from 'react';
import { Button } from 'antd';
import { useLocation } from 'react-router-dom';
import DownloadCSV from 'Components/Work/Request/Toolbar/DownloadCSV';
import ShareURL from 'Components/Work/Request/Toolbar/ShareURL';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { MEDIUM_SCREEN_RIGHT } from 'constants/constants';

const ButtonGroup = Button.Group;

const Toolbar = () => {
  const location = useLocation();
  const type = location.pathname === '/work-request' ? 'WORK_REQUEST' : 'WORK_PLAN';
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
  } = useRequestDispatch();
  return (
    <Fragment>
      <ButtonGroup>
        {
          (locality === 'Mile High Flood District' || type === 'WORK_REQUEST') &&
          <Button
            className="btn-opacity"
            onClick={() => setShowBoardStatus(true)}
          >
            <img
              className="icon-bt"
              style={{ WebkitMask: "url('/Icons/icon-88.svg') no-repeat center" }}
              alt=""
            />
          </Button>
        }
        <Button
          className="btn-opacity"
          onClick={() => setShowAnalytics(true)}
        >
          <img
            className="icon-bt"
            style={{ WebkitMask: "url('/Icons/icon-89.svg') no-repeat center" }}
            alt=""
          />
        </Button>
      </ButtonGroup>
      <ButtonGroup
        className={leftWidth === (MEDIUM_SCREEN_RIGHT - 1) ? '' : 'hide-when-1'}
      >
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
      </ButtonGroup>
    </Fragment>
  )
};

export default Toolbar;
