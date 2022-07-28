import React, { useState, useEffect, useRef } from "react";
import type { ColumnsType } from 'antd/es/table';
import { Button, Row, Col, Popover, Checkbox, Table, Tag, Modal, Input } from 'antd';
import { useAttachmentDispatch, useAttachmentState } from "../../../hook/attachmentHook";
import { Attachment } from "../../Work/Request/RequestTypes";
import { saveAs } from 'file-saver';
import { text } from "d3";
import { CloudDownloadOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { UploaderModal } from "./UploaderModal";

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
  const [dataImages, setDataImages] = useState<any[]>([
    {
      key: '1',
      filename: 'project_010322.jpg',
      size: '2.5MB',
      cover: true,
      type: 'JPG',
      download:'213'
    },
    {
      key: '2',
      filename: 'screenshot_iphone13.png',
      size: '2.5MB',
      cover: false,
      type: 'JPG',
      download:'123'
    },
    {
      key: '3',
      filename: 'image.png',
      size: '2.5MB',
      cover: false,
      type: 'JPG',
      download:'321321'
    },
    
  ]);
  const [toDelete, setToDelete] = useState<any[]>([]);
  const [toDeleteFiles, setToDeleteFiles] = useState<any[]>([]);
  const COLUMNS_UPLOAD02:any = [
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
      width: "10%"
    },
    {
      title: "Date",
      dataIndex: "date",
      width: "27%",
      className: "user-text",
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
      width: "10%"
    },
    {
      title: "",
      dataIndex: "download",
      render: (id:string) => (
        <Button className="user-download ">
          <img className="icon-bt" src='/Icons/icon-01.svg' />
        </Button>
      ),
      width: "5%"
    },
  ];
  const handle = (row: any) => {
    console.log("my row " , row);
    const copy = [...dataImages].map((d) => {
      if (row.key === d.key) {
        d.cover = true;
      } else {
        d.cover = false;
      }
      return d;
    });
    setDataImages([...copy]);
  }
  const COLUMNS_UPLOAD:any = [
    {
      title: "Filename",
      dataIndex: "filename",
      className: "user-name-upload",
      width: "47%",
    },
    {
      title: "Size",
      dataIndex: "size",
      className: "user-text",
      width: "10%"
    },
    {
      title: "Cover",
      dataIndex: "cover",
      render: (text:boolean, record: any) => (
        <Tag className={text? "cover-active": "cover"} onClick={() => handle(record)}>
          Cover
        </Tag>
      ),
      onCell: (record: any) => ({
        record,
        handle
      }),
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
      width: "10%"
    },
    {
      title: "Download",
      dataIndex: "download",
      render: (id:string) => (
        <Button className="user-download ">
          <img className="icon-bt" src='/Icons/icon-01.svg' />
        </Button>
      ),
      width: "5%"
    },
  ];
  const [dataFiles, setDataFiles] = useState<any[]>([
    {
      key: '1',
      filename: 'Spreadsheet2022.xlsx',
      size: '2.5MB',
      date: 'Dec 1, 2022',
      type: 'XLS',
      download:'213'
    },
    {
      key: '2',
      filename: 'Report2022-2023.pdf',
      size: '2.5MB',
      date: 'Dec 1, 2022',
      type: 'XLS',
      download:'123'
    },
    {
      key: '3',
      filename: 'Basic Plan - Dec 2022.pdf',
      size: '2.5MB',
      date: 'Dec 1, 2022',
      type: 'XLS',
      download:'321321'
    },
    
  ]);
  
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setToDelete(selectedRowKeys);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  const rowSelectionFiles = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setToDeleteFiles(selectedRowKeys);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  const bytesToMegaBytes = (bytes: any) =>  Math.round(bytes / (1024 ** 2) * 100) / 100;
  const addFile = (file: any, description: any, type: string) => {
    console.log('file', file, description);
    if (type === 'images') {
      setDataImages((oldData) => {
        return [...oldData, {
          ...file,
          description: description,
          filename: file.name,
          type: file.type.replace('image/', '').toUpperCase(),
          size: bytesToMegaBytes(file.size) + 'MB',
          key: file.name + file.lastModified
        }] 
      })
      setModal(false);
    } else {
      const lastI = file.type.indexOf('/');
      setDataFiles((oldData) => {
        return [...oldData, {
          ...file,
          description: description,
          filename: file.name,
          type: file.type.substring(lastI+1, file.type.length).toUpperCase(),
          size: bytesToMegaBytes(file.size) + 'MB',
          key: file.name + file.lastModified
        }] 
      });
      setModal02(false);
    }
  }
  return (
    <>
      <Row style={{marginTop:'5px'}}>
        <Col xs={{ span: 24 }} lg={{ span: 7 }} style={{marginBottom: '-25px', alignSelf:'center'}}>
          <h5 >{isCapital?'6':'4'}
          . Upload images<img src="/Icons/icon-19.svg" alt="" height="14px" style={{marginLeft:'5px'}}/>
          </h5>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 17 }} style={{marginBottom: '-25px', textAlign:'end'}}>
          <span>
            {toDelete.length ?  <span onClick={() => {
              setDataImages((oldData: any) => oldData.filter((d: any) => !toDelete.includes(d.key)));
            }} style={{color:'red'}}>Delete</span> : null }
            <Button className="bottomn-heder" onClick={() => (setModal(true))}>
              <span className="ic-document"/>Add Image
            </Button>
            <Button className="bottomn-heder">
              <CloudDownloadOutlined />Download All 
            </Button>
          </span>
        </Col>
      </Row>
      <Row style={{padding: '8px', marginTop: '25px'}}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{marginBottom: '-25px'}}>
          <span style={{color: '#11093C'}}>Uploaded</span>
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
          dataSource={dataImages}

        />
      </Row>
      {modal &&
        <UploaderModal  modal={modal} setModal={setModal} addFile={addFile} type="images"/>
      }
      <br></br>

      <Row style={{marginTop:'5px'}}>
        <Col xs={{ span: 24 }} lg={{ span: 7 }} style={{marginBottom: '-25px', alignSelf:'center'}} >
          <h5 style={{marginBottom: '0px'}}>{isCapital?'7':'5'}
          . Upload documents<img src="/Icons/icon-19.svg" alt="" height="14px" style={{marginLeft:'5px'}}/>
          </h5>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 17 }} style={{marginBottom: '-25px', textAlign:'end'}}>
          <span>
          {toDeleteFiles.length ?  <span onClick={() => {
              setDataFiles((oldData: any) => oldData.filter((d: any) => !toDeleteFiles.includes(d.key)));
            }} style={{color:'red'}}>Delete</span> : null }
            <Button className="bottomn-heder" onClick={() => (setModal02(true))}>
              <span className="ic-document"/>Add Document
            </Button>
            <Button className="bottomn-heder">
              <CloudDownloadOutlined />Download All 
            </Button>
          </span>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{padding: '8px', marginTop: '40px', marginLeft: '0px', paddingLeft: '0px'}}>
        <Table
          style={{width: '100%'}}
          rowSelection={{
            type: 'checkbox',
            ...rowSelectionFiles,
          }}
          columns={COLUMNS_UPLOAD02}
          dataSource={dataFiles}

        />
      </Row>
      {modal02 &&
        <UploaderModal  modal={modal02} setModal={setModal02} addFile={addFile} type="documents"/>
      }
    </>
  );
}
