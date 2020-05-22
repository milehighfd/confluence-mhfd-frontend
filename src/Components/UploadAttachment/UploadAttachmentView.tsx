import React from 'react';
import { Layout, Row, Col, Upload, Tag, Table, Button } from 'antd';

import NavbarView from '../Shared/Navbar/NavbarView';
import SidebarView from '../Shared/Sidebar/SidebarView';

const { Content } = Layout;
const { Dragger } = Upload;
const dummyRequest = ({ onSuccess } : { onSuccess: Function}) => {
  setTimeout(() => onSuccess("ok"), 0);
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
    key: 'owner',
  },
  {
    title: 'Last Modified',
    dataIndex: 'last',
    key: 'last',
  },
  {
    title: 'File Size',
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: '',
    dataIndex: 'delete',
    key: 'delete',
  },
];

const data = [
  {
    key: '1',
    name: <div style={{display: 'flex'}}><img alt="example" className="img-up" src="/Icons/default.png" height="30px"/>
    <div style={{padding: '6px 0px'}}> 0CAAB707-BB0C-4E8C-A184-634DC03EE7B_Greenwood …</div></div>,
    owner: 'Katie Evers',
    last: 'May 14, 2020 Katie Evers',
    size: '177 KB',
    delete: <Button><img alt="example" src="/Icons/icon-16.svg"/></Button>,
  },
  {
    key: '2',
    name: <div style={{display: 'flex'}}><img alt="example" className="img-up" src="/Icons/default.png" height="30px"/>
    <div style={{padding: '6px 0px'}}> 0CAAB707-BB0C-4E8C-A184-634DC03EE7B_Greenwood …</div></div>,
    owner: 'Katie Evers',
    last: 'May 14, 2020 Katie Evers',
    size: '177 KB',
    delete: <Button><img alt="example" src="/Icons/icon-16.svg"/></Button>,
  },
];

export default () => {
    return <>
        <Layout>
      <NavbarView></NavbarView>
      <Layout>
        <SidebarView></SidebarView>
        <Layout className="layout upload">
          <Content>
          <Row className="head-up">
            <Col span={24}>
              <div className="img-npf">
                <label className="label-new-form" htmlFor=""><h3>Upload Documents</h3><img src="/Icons/icon-19.svg" alt="" /></label>
                <Dragger customRequest={dummyRequest}>
                  <img src="/Icons/icon-17.svg" alt="" />
                  <p className="ant-upload-text">Drag and drop your documents/media files here</p>
                </Dragger>
                <div className="tag-upload">
                  <Tag closable>
                    Little Dry Creek_image-1.jpg
                  </Tag>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="table-up">
            <Col span={24}>
              <Table columns={columns} dataSource={data}/>
            </Col>
          </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    </>;
}
