import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, Dropdown, Input, Layout, Menu, Popover, Row, Select, Table, Tabs, Tooltip } from 'antd';
import { AntDesignOutlined, ArrowDownOutlined, DownOutlined, MoreOutlined, PlusOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import ButtonGroup from "antd/lib/button/button-group";
import { ColumnsType } from "antd/lib/table";
import ProfileUser from "./ProfileUser";
import { DATA_USER_ACTIVITY, DATA_USER_LIST } from "../constants";

const { TabPane } = Tabs;
const tabKeys = ['Roles Management', 'Users Management', 'Project Management'];
const CardsProjects = ({status}:{status:string}) => {
  const menu = (
    <Menu
      className="card-dropdown"
      items={[
        {
          key: '1',
          type: 'group',
          label: 'People',
          children: [
            {
              key: '1-1',
              label: <>
                <img src="/picture/user.png" height={30} width="30" style={{marginRight:'5px'}}/>
                <span style={{fontSize:'14px'}}>Dan Hill </span>
              </>,
            },
            {
              key: '1-2',
              label: <>
                <img src="/picture/user01.png"height={30} width="30" style={{marginRight:'5px'}}/>
                <span style={{fontSize:'14px'}}>Jane Smith </span>
              </>,
            },
            {
              key: '1-3',
              label: <>
                <img src="/picture/user02.png"height={30} width="30" style={{marginRight:'5px'}}/>
                <span style={{fontSize:'14px'}}>Robert Croquette  </span>
              </>,
            },
            {
              key: '1-4',
              label: <>
                <img src="/picture/Avatar1.svg" height={30} width="30" style={{marginRight:'5px'}}/>
                <span style={{fontSize:'14px'}}>John Doerio</span>
              </>,
            },
            {
              key: '1-5',
              label: <>
                <img src="/picture/Avatar1.svg" height={30} width="30" style={{marginRight:'5px'}}/>
                <span style={{fontSize:'14px'}}>Andrea Gustavo</span>
              </>,
            },
            {
              key: '1-6',
              label: <>
                <img src="/picture/Avatar1.svg" height={30} width="30" style={{marginRight:'5px'}}/>
                <span style={{fontSize:'14px'}}>Dejan Stankobus</span>
              </>,
            },
            {
              key: '1-7',
              label: <>
                <img src="/picture/Avatar1.svg" height={30} width="30" style={{marginRight:'5px'}}/>
                <span style={{fontSize:'14px'}}>Miguel Perera</span>
              </>,
            },
            {
              key: '1-8',
              label: <>
                <img src="/picture/Avatar1.svg" height={30} width="30" style={{marginRight:'5px'}}/>
                <span style={{fontSize:'14px'}}>Dan Hill </span>
              </>,
            },
          ],
        },
      ]}
    />
  );
  return <>
    <Col span={6}>
      <Card style={{ width: '100% ', marginBottom:'5%', marginRight:'0px',marginLeft:'0px'}} className="card-style">
        <div className="tag-card">
          <span className={`span-${status}`}>
            <div className="circulo"></div>
            {status}
          </span>
        </div>
        <h1 style={{fontWeight: '700', marginTop:'15px'}}>Big Dry Creek @ SSPRD Golf Course</h1>
        <p className="color-sub">Jon Villines | jon.villines@mhfd.com </p>
        <Row gutter={16}>
          <Col span={12}>
            <p className="color-sub">Service Area</p>
            <p>South</p>
          </Col>
          <Col span={12}>
            <p className="color-sub">County</p>
            <p>Arapahoe</p>
          </Col>
        </Row>
        <div className="avatar-group">
          <Avatar.Group
            maxCount={4}
            maxPopoverTrigger="click"
            size={30}
            maxStyle={{ color: '#FFFFFF', backgroundColor: '#4961F6', cursor: 'pointer', fontSize: '14px'}}
          >
            <Avatar src="/picture/user.png" />
            <Avatar src="/picture/user01.png" />
            <Avatar src="/picture/user02.png" />
            <Avatar src="/picture/Avatar1.svg" />
            <Avatar src="/picture/Avatar1.svg" />
            <Avatar src="/picture/Avatar1.svg" />
            <Avatar src="/picture/Avatar1.svg" />
            <Avatar src="/picture/Avatar1.svg" />
          </Avatar.Group>
          <Dropdown overlay={menu} placement="bottomRight">
            <MoreOutlined style={{fontSize:'18px'}}/>
          </Dropdown>
        </div>
      </Card>
    </Col>
  </>
};

export default CardsProjects;