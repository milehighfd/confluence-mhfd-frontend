import React, { useEffect, useState } from "react";
import { Button, Col, Input, Layout, Popover, Row, Select, Table, Tabs } from 'antd';
import { ArrowDownOutlined, DownOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import ButtonGroup from "antd/lib/button/button-group";
import { ColumnsType } from "antd/lib/table";
import ProfileUser from "./ProfileUser";
import { DATA_USER_ACTIVITY, DATA_USER_LIST } from "../constants";
import CardsProjects from "./CardsProjects";

const { TabPane } = Tabs;
const tabKeys = ['Roles Management', 'Users Management', 'Project Management'];
const ProjectsList = () => {
  const [openFilters, setOpenFilters] = useState(false);
  let displayedTabKey = tabKeys;
  return <>
    <div style={{width:'100%', overflow:'hidden' }}>
      <Row>
        <Col xs={{ span: 9}} lg={{ span: 5 }}>
          <h2 style={{marginLeft:'25px', alignSelf: 'end'}}>Projects</h2>
        </Col>
        <Col  xs={{ span: 39}} lg={{ span: 19 }} style={{textAlign:'end', zIndex:'2'}} className='filter-user-management'>
          <Input
            style={{ width: '30%', marginRight:'10px', height: '36px'}}
            placeholder="Search by Name"
            prefix={<SearchOutlined />}
          />
          <Select placeholder="Organization" placement="bottomLeft" style={{marginRight:'10px', width: '19%', textAlign: 'initial'}} >
              <Option value="Organization">Organization</Option>
          </Select>
          <Select placeholder="Service Area" placement="bottomLeft" style={{marginRight:'10px', width: '19%', textAlign: 'initial'}} >
              <Option value="Service Area">Service Area</Option>
          </Select>
          <Select placeholder="User Designation" placement="bottomLeft" style={{marginRight:'10px', width: '19%', textAlign: 'initial'}} >
              <Option value="User Designation">User Designation</Option>
          </Select>
          <Button className="btn-purple" onClick={()=>{setOpenFilters(true)}} style={{height:'38px', width:'8%'}}>
            Reset
          </Button>
        </Col>
      </Row>
      <div className="table-user-management">
        <div className="card-group" style={{marginTop:'20px', marginLeft:'25px'}}>
          <Row gutter={16}>
            <CardsProjects status="Active"/>
            <CardsProjects status="Inactive"/>
            <CardsProjects status="Active"/>
            <CardsProjects status="Active"/>
            <CardsProjects status="Active"/>
            <CardsProjects status="Active"/>
            <CardsProjects status="Inactive"/>
            <CardsProjects status="Active"/>
            <CardsProjects status="Active"/>
            <CardsProjects status="Active"/>
            <CardsProjects status="Active"/>
            <CardsProjects status="Inactive"/>
          </Row>
        </div>
      </div>
    </div>
  </>
};

export default ProjectsList;