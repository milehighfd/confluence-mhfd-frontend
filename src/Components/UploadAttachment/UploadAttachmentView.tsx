import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Upload, Table, Button, Popover } from 'antd';

import Navbar from '../Shared/Navbar/NavbarContainer';
import SidebarView from '../Shared/Sidebar/SidebarView';
import moment from 'moment';

const content = (<div className="popoveer-00">Upload media e.g. video, images, documents and other file types associated with problems or images. Max. size of 10MB per file.</div>);

export default ({ attachments, uploadFile, getAllAttachment, removeAttachment, setLoading, loading }: { attachments: any, uploadFile: Function, getAllAttachment: Function, removeAttachment: Function, setLoading: Function, loading: boolean }) => {
  const { Content } = Layout;
  const { Dragger } = Upload;
  const dummyRequest = ({ onSuccess }: { onSuccess: Function }) => {
    setTimeout(() => onSuccess("ok"), 0);
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'filename',
      render: (filename: { filename: string, mimetype: string, value: string}) => {
        return (<div style={{ display: 'flex' }}>
          <div style={{ padding: '6px 0px' }}> {filename.mimetype.includes('image/') ? <a href={filename.value} target="_blank" ><img  className="img-up" src={filename.value} height="30px" width="30px" /></a>
          : <a href={filename.value} target="_blank" ><img  className="img-up" src="/Icons/documents.png" height="30px" width="30px" /></a> } </div> <div style={{alignSelf: 'center'}}>{filename.filename} </div> </div>)
      },
      sorter: true,
      width: 630,
    },
    {
      title: 'Type',
      dataIndex: 'mimetype',
      sorter: true
    },
    {
      title: 'Last Modified',
      dataIndex: 'updatedAt',
      sorter: true,
      render: (updateAt: Date) => moment(updateAt).format("LL")
    },
    {
      title: 'File Size',
      dataIndex: 'filesize',
      render: (filesize: number) => (filesize / 1024).toFixed(2) + " KB",
      sorter: true
    },
    {
      title: '',
      dataIndex: '_id',
      render: (_id: string) => <Button onClick={() => remove(_id)}><img alt="example" src="/Icons/icon-16.svg"/></Button>
    },
  ];

  const remove = async (_id: string) => {
    setLoading(true);
    await removeAttachment(_id, getUrlOptionsUserActivity({ current: 1, pageSize: 10 }, {}));
  }
  const [mainImage, setMainImage] = useState([]);
  const onSubmit = async () => {
    setLoading(true);
    await uploadFile(mainImage, getUrlOptionsUserActivity({ current: 1, pageSize: 10 }, {}));
    setMainImage([]);
  }
  useEffect(() => {
    getAllAttachment(getUrlOptionsUserActivity({ current: 1, pageSize: 10 }, {}));
  }, []);
  const pagination = {
    current: + attachments.currentPage,
    pageSize: 10,
    total: attachments.totalPages * 10
  };
  const handleTableChange = (pagination: any, filters: {}, sorter: any) => {
    setLoading(true);
    getAllAttachment(getUrlOptionsUserActivity(pagination, sorter));
  };
  const getUrlOptionsUserActivity = (pagination: { current: number, pageSize: number }, sorter: { field?: string, order?: string }) => {
    return 'page=' + pagination.current + '&limit=' + pagination.pageSize + (sorter?.order ? ('&sort=' + sorter.field + '&sorttype=' + (sorter.order === "descend" ? 'DESC' : 'ASC')) : '&sort=updatedAt&sorttype=DESC')
  }
  return <>
    <Layout>
      <Navbar/>
      <Layout>
        <SidebarView></SidebarView>
        <Layout className="layout upload">
          <Content>
            <Row className="head-up">
              <Col span={24}>
                <div className="img-npf">
                  <label className="label-new-form" htmlFor=""><h3>Upload Documents <Popover content={content}><img src="/Icons/icon-19.svg" alt="" style={{margin:'0px', cursor: 'pointer', width:'15px', marginTop: '-1px'}} /></Popover> </h3></label>
                  <Dragger multiple={true} fileList={mainImage} onChange={({ fileList }: any) => setMainImage(fileList)}>
                    <img src="/Icons/icon-17.svg" alt="" />
                    <p className="ant-upload-text">Drag and drop your documents/media files here</p>
                  </Dragger>
                  <div className="btn-footer" style={{ marginTop: '25px' }}>
                    <Button disabled={!mainImage.length ? true : false} style={{ width: '140px' }} className="btn-purple" onClick={onSubmit} >Save</Button>
                  </div>
                </div>
              </Col>

            </Row>
            <Row className="table-up">
              <Col span={24}>
                <Table loading={loading} columns={columns} rowKey={(record: any) => record._id} dataSource={attachments.data} pagination={pagination}
                  onChange={(pagination, filters, sort) => handleTableChange(pagination, filters, sort)} />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </>;
}
