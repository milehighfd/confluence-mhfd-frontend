import React, { useState, useEffect, useRef } from "react";
import type { ColumnsType } from 'antd/es/table';
import { Button, Row, Col, Popover, Checkbox, Table, Tag, Modal, Input } from 'antd';
import { useAttachmentDispatch, useAttachmentState } from "../../../hook/attachmentHook";
import { Attachment } from "../../Work/Request/RequestTypes";
import { saveAs } from 'file-saver';
import { text } from "d3";
import { CloudDownloadOutlined, ArrowDownOutlined } from "@ant-design/icons";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
let counter = 0;
export const UploadImagesDocuments = ({isCapital, }: {
  isCapital?: any,
}) => {
  const [modal, setModal] = useState(false);
  const [modal02, setModal02] = useState(false);
  const COLUMNS_UPLOAD:any = [
    {
      title: "Filename",
      dataIndex: "filename",
      className: "user-name-upload",
      width: "40%",
    },
    {
      title: "Size",
      dataIndex: "size",
      className: "user-text",
      width: "15%"
    },
    {
      title: "Cover",
      dataIndex: "cover",
      render: (text:boolean) => (
        <Tag className={text? "cover-active": "cover"}>
          Cover
        </Tag>
      ),
      width: "15%",
      className: "user-cover",
    },
    {
      title: "Type",
      dataIndex: "type",
      className: "user-type",
      render: (text:string) => (
        <Tag className="type">
          {text}
        </Tag>
      ),
      width: "15%"
    },
    {
      title: "",
      dataIndex: "dowload",
      render: (id:string) => (
        <Button className="user-dowload ">
          <img className="icon-bt" src='/Icons/icon-01.svg' />
        </Button>
      ),
      width: "10%"
    },
  ];
  const data: any = [
    {
      key: '1',
      filename: 'project_010322.jpg',
      size: '2.5MB',
      cover: true,
      type: 'JPG',
      dowload:'213'
    },
    {
      key: '2',
      filename: 'screenshot_iphone13.png',
      size: '2.5MB',
      cover: false,
      type: 'JPG',
      dowload:'123'
    },
    {
      key: '3',
      filename: 'image.png',
      size: '2.5MB',
      cover: false,
      type: 'JPG',
      dowload:'321321'
    },
    
  ];
  
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{marginBottom: '-25px'}}>
          <h5>{isCapital?'6':'4'}
          . Upload images
          </h5>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{marginBottom: '-25px', paddingTop: '5px', textAlign:'end'}}>
          <span>
            <Button className="bottomn-heder" onClick={() => (setModal(true))}>
              <img src="/Icons/ic-document.svg" style={{marginRight:'5px', marginTop:'-3px'}} />Add Image
            </Button>
            <Button className="bottomn-heder">
              <CloudDownloadOutlined />Dowload All 
            </Button>
          </span>
        </Col>
      </Row>
      <Row style={{padding: '8px', marginTop: '25px'}}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{marginBottom: '-25px'}}>
          <span style={{color: '#11093C'}}>Uploaded</span>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{marginBottom: '-25px', paddingTop: '5px', textAlign:'end'}}>
          <span style={{color: '#11093C'}}>Cover Image</span>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{padding: '8px', marginTop: '10px', marginLeft: '0px', paddingLeft: '0px'}}>
        <Table
          style={{width: '100%'}}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={COLUMNS_UPLOAD}
          dataSource={data}

        />
      </Row>
      {modal &&
        <Modal
          className="detailed-upload"
          style={{ top: 60, width: '100%' }}
          visible={modal}
          onCancel={() => setModal(false)}
          forceRender={false}
          destroyOnClose>
          <div className="upload">
            <Row className="detailed-h" gutter={[16, 8]}>
              <Col xs={{ span: 12 }} lg={{ span: 13 }}>
                <h1 style={{marginTop: '15px'}}>Upload Images
                </h1>
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 11 }} style={{textAlign: 'end'}}>
                <Button className="btn-transparent" onClick={() => setModal(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
              </Col>
            </Row>
            <Row className="detailed-h" gutter={[16, 16]} style={{backgroundColor: 'white'}}>
            <label className="sub-title" style={{color:'#11093C'}}>Title </label>
              <Input placeholder="Add description"/>
              <input id="uploader" type="file" style={{ display: 'none' }} multiple accept="image/png, image/jpeg" />
              <div>
                  <label htmlFor="uploader" className="draw" style={{paddingTop: '50px'}}>
                    <img style={{marginRight:'5px', marginTop:'-3px'}} src="/Icons/ic-upload.svg" />
                    <h1>Select file to Upload</h1>
                      <p>or drag and drop it here</p>
                      <p style={{paddingTop: '50px'}}>Accepted File Types: .png or .jpg</p>
                  </label>
              </div>
            </Row>
            <Row className="detailed-h" gutter={[16, 16]} style={{backgroundColor: 'white'}}>
              <p>Or upload from URL</p>
              <div style={{width: '100%', backgroundColor: '#f5f7ff', padding: '8px'}}>
                <span style={{color:'#11093C', opacity:'0.5'}}>Add the file URL</span>

                <Button style={{backgroundColor:'#11093C', color: 'white', borderRadius: '5px', marginLeft:'74%'}}>Upload</Button>

              </div>
            </Row>
          </div>
        </Modal>
       }

        <Row>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{marginBottom: '-25px'}}>
          <h5>{isCapital?'7':'5'}
          . Upload documents
          </h5>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{marginBottom: '-25px', paddingTop: '5px', textAlign:'end'}}>
          <span>
            <Button className="bottomn-heder" onClick={() => (setModal02(true))}>
              <img src="/Icons/ic-document.svg" style={{marginRight:'5px', marginTop:'-3px'}} />Add Document
            </Button>
            <Button className="bottomn-heder">
              <CloudDownloadOutlined />Dowload All 
            </Button>
          </span>
        </Col>
      </Row>
      <Row style={{padding: '8px', marginTop: '25px'}}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{marginBottom: '-25px'}}>
          <span style={{color: '#11093C'}}>Uploaded</span>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{marginBottom: '-25px', paddingTop: '5px', textAlign:'end'}}>
          <span style={{color: '#11093C'}}>Cover Image</span>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{padding: '8px', marginTop: '10px', marginLeft: '0px', paddingLeft: '0px'}}>
        <Table
          style={{width: '100%'}}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={COLUMNS_UPLOAD}
          dataSource={data}

        />
      </Row>
      {modal02 &&
        <Modal
          className="detailed-upload"
          style={{ top: 60, width: '100%' }}
          visible={modal02}
          onCancel={() => setModal02(false)}
          forceRender={false}
          destroyOnClose>
          <div className="upload02">
            <Row className="detailed-h" gutter={[16, 8]}>
              <Col xs={{ span: 12 }} lg={{ span: 13 }}>
                <h1 style={{marginTop: '15px'}}>Upload Documents
                </h1>
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 11 }} style={{textAlign: 'end'}}>
                <Button className="btn-transparent" onClick={() => setModal02(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
              </Col>
            </Row>
            <Row className="detailed-h" gutter={[16, 16]} style={{backgroundColor: 'white'}}>
            <label className="sub-title" style={{color:'#11093C'}}>Title </label>
              <Input placeholder="Add description"/>
              <input id="uploader" type="file" style={{ display: 'none' }} multiple accept="image/png, image/jpeg" />
              <div>
                  <label htmlFor="uploader" className="draw" style={{paddingTop: '50px'}}>
                    <img style={{marginRight:'5px', marginTop:'-3px'}} src="/Icons/ic-upload.svg" />
                    <h1>Select file to Upload</h1>
                      <p>or drag and drop it here</p>
                      <p style={{paddingTop: '50px'}}>Accepted File Types: .docx, .xlsx, or .pdf</p>
                  </label>
              </div>
            </Row>
            <Row className="detailed-h" gutter={[16, 16]} style={{backgroundColor: 'white'}}>
              <p>Or upload from URL</p>
              <div style={{width: '100%', backgroundColor: '#f5f7ff', padding: '8px'}}>
                <span style={{color:'#11093C', opacity:'0.5'}}>Add the file URL</span>

                <Button style={{backgroundColor:'#11093C', color: 'white', borderRadius: '5px', marginLeft:'74%'}}>Upload</Button>

              </div>
            </Row>
          </div>
        </Modal>
      }
    </>
  );
}
