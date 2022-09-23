import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, Dropdown, Input, Layout, Menu, Popover, Row, Select, Switch, Table, Tabs, Tooltip } from 'antd';
import { AlignCenterOutlined, AppstoreOutlined, ArrowDownOutlined, CloseOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import ProfileUser from "../../user-management/components/ProfileUser";
import { DATA_LIST_VIEW } from "../constants";
import ListViewBodyTable from "./ListViewTable";
import ModalFields from "./ModalFields";
import ModalTollgate from "./ModalTollgate";

const { Option } = Select;
const { TabPane } = Tabs;
const tabKeys = ['Project Type', 'Capital (67)', 'Maintenance', 'Study','Acquisition', 'Special'];
const popovers: any = [
  <div className="popoveer-00"><b>Project Type:</b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>,
  <div className="popoveer-00"><b>Capital:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>,
  <div className="popoveer-00"><b>Maintenance:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>,
]
const roleSpan = (role:string) => {
  let span = ''
  switch(role) {
    case 'Preliminary': {
      span ='preliminary';
      break;
    }
    case 'Initiation': {
      span ='initiation';
      break;
    }
    case 'Final Design': {
      span ='finaldesign';
      break;
    }
    default : {
      span ='preliminary';
      break;
    }
  }
  return span;
}
const ListViewBody = () => {
  const [tabKey, setTabKey] = useState<any>('Project Type');
  const [fields, setFields] = useState(false);
  const [tollgate, setTollgate] = useState(false);
  let displayedTabKey = tabKeys;
  const columns: ColumnsType<any> = [
    {
      title: <>Project Name <ArrowDownOutlined className="ico-arrow"/></>,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <>Phase <ArrowDownOutlined className="ico-arrow"/></>,
      dataIndex: 'phase',
      key: 'phase',
      render: (phase) => (
        <span className={'span-' + roleSpan(phase)}>
          <div className="circulo"/>{phase}
        </span> 
      ),
    },
    { title: <>County <ArrowDownOutlined className="ico-arrow"/></>, dataIndex: 'county', key: 'county' },
    { title: <>Est. Cost <ArrowDownOutlined className="ico-arrow"/></>, dataIndex: 'cost', key: 'cost' },
    {
      title: <>Components <ArrowDownOutlined className="ico-arrow"/></>,
      dataIndex: 'components',
      key: 'components',
      render: (components) => (
        <div style={{marginLeft:'45px'}}>
          {components}
        </div>
      ),
    },
    Table.EXPAND_COLUMN,
  ];
  return (
    <>
      {fields && <ModalFields visible={fields} setVisible={setFields} />}
      {tollgate && <ModalTollgate visible={tollgate} setVisible={setTollgate} />}
      <div className="body-list-view">
        <div style={{padding:'15px 20px'}}>
          <div className="list-view-head" >
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                <div className="auto-complete-map">
                  <Select
                    className={'user-list-dropdown'}
                    defaultValue="Adams County"
                  >
                    <Option value="None">Adams County</Option>
                  </Select>
                </div>
              </Col> 
            </Row>
          </div>
        </div>
        <div className="avatar-group list-body">
          <Input
            style={{ width: '30%', marginRight:'10px', height: '36px'}}
            placeholder="Search by Name"
            prefix={<SearchOutlined />}
          />
          <div className="filter">
            <Button className="btn-filter-k btn-transparent">
              <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-73.svg') no-repeat center" }} src=""/>&nbsp;
                Filters (4)
            </Button>&nbsp;&nbsp;&nbsp;&nbsp;
              <AlignCenterOutlined className={fields ? "button-hover-active":"button-hover"} onClick={() => setFields(!fields)}/>
              &nbsp;&nbsp;&nbsp;<span style={{color:'#DBDBE1'}}>|</span>&nbsp;&nbsp;&nbsp;
              <AppstoreOutlined className={tollgate ? "button-hover-active":"button-hover"} onClick={() => setTollgate(!tollgate)}/>
          </div>
        </div>
        <div className="list-body-table">
          <Tabs defaultActiveKey={displayedTabKey[1]}
            activeKey={tabKey}
            onChange={(key) => setTabKey(key)} className="tabs-map">
            {
              displayedTabKey.map((tk: string) => (
              <TabPane style={{marginBottom:'0px'}} tab={<span><Popover content={popovers[tabKeys.indexOf(tk)]} placement="rightBottom">{tk} </Popover> </span>} key={tk}>
                <Table
                  columns={columns}
                  expandable={{
                    expandedRowRender: record => <ListViewBodyTable record={record}/>,
                  }}
                  dataSource={DATA_LIST_VIEW}
                />
                </TabPane>
              ))
            }
          </Tabs>

        </div>
      </div>
    </>
  )
};

export default ListViewBody;