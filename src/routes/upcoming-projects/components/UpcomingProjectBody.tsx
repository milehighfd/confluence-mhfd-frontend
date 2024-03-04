import { Button, Input, Popover, Tabs } from 'antd';
import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import TableUpcomingProjects from './TableUpcomingProjects';
import { SearchOutlined } from '@ant-design/icons';
import Filter from 'Components/Work/Drawers/Filter';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { UPCOMING_PROJECTS } from 'constants/constants';
import ShareURL from 'Components/Work/Request/Toolbar/ShareURL';
import LoadingViewOverall from 'Components/Loading-overall/LoadingViewOverall';

const { TabPane } = Tabs;

const ALL = 'All';
const CAPITAL = 'Capital';
const MAINTENANCE = 'Restoration';
const STUDY = 'Study';
const ACQUISITION = 'Acquisition';
const SPECIAL = 'R&D';
const DIP = 'DIP';

const tabKeys = [ALL, CAPITAL, DIP,  MAINTENANCE, STUDY, ACQUISITION, SPECIAL];
export const UpcomingProjectBody = () => {

  const {
    showFilters
  } = useRequestState();
  const { 
    setShowFilters, 
  } = useRequestDispatch();
  
  const [tabKey, setTabKey] = useState<any>(ALL);
  const [searchValue, setSearchValue] = useState<any>('');
  const [csvData, setCsvData] = useState<string[][]>([[]]);
  const [csvFileName, setCsvFileName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const actions = (
    <div className="tabs-upcoming-extra">
      <Input
        id="search-input"
        allowClear
        placeholder="Search"
        className="search-input"
        onChange={e => setSearchValue(e.target.value)}
        prefix={<SearchOutlined />}
      />
      <Popover
        className="buttons-tab"
        content={
          <div className="popover-text">
            <b>Filter:</b> Filter the selection by MHFD Lead, Location, and other attributes.
          </div>
        }
        placement="bottomLeft"
        overlayClassName="popover-work-header project-popover"
      >
        <Button className="buttons" type="link" onClick={() => setShowFilters(true)}>
          <img src="Icons/ic-003.svg" alt="" />
        </Button>
      </Popover>
      <Popover
        className="buttons-tab"
        content={
          <div className="popover-text">
            <b>Export:</b> Download data to CSV
          </div>
        }
        placement="bottomLeft"
        overlayClassName="popover-work-header project-popover"
      >
        <Button className="buttons" type="link">
          <CSVLink
            filename={csvFileName}
            data={csvData}
            onClick={() => {
              setCsvFileName('upcomingprojects.csv');
              setCsvData(csvData);
            }}        
            style={{ padding: '0px' }}
          >
          <img
            src='Icons/ic-004.svg'
            alt=""
          />
        </CSVLink>
        </Button>
      </Popover>
      <div className='share-url'>
        <ShareURL parentName={UPCOMING_PROJECTS}/>
      </div>
    </div>
  );
  useEffect(() => {
    setShowFilters(false);
  }, []);
  let displayedTabKey = tabKeys;
  return (
    <div className="upcoming-body">
      {loading && <LoadingViewOverall></LoadingViewOverall>}
      {
        showFilters && <Filter origin={UPCOMING_PROJECTS}/>
      }
      <Tabs
        destroyInactiveTabPane={true}
        defaultActiveKey={displayedTabKey[1]}
        activeKey={tabKey}
        onChange={key => setTabKey(key as any)}
        className="tabs-upcoming-project"
        tabBarExtraContent={actions}
      >
        {displayedTabKey.map((tk: string) => (
          <TabPane
            key={tk}
            style={{ marginBottom: '0px' }}
            tab={
              <span>
                <Popover placement="rightBottom">{tk}</Popover>
              </span>
            }
          >
            <TableUpcomingProjects tipe={tabKey} searchValue={searchValue} setCsvData={setCsvData} setLoading={setLoading} />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};
