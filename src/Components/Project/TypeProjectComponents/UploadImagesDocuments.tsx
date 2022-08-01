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
export const UploadImagesDocuments = ({isCapital, setFiles }: {
  isCapital?: any, setFiles: any
}) => {
  const [modal, setModal] = useState(false);
  const [modal02, setModal02] = useState(false);
  const [dataImages, setDataImages] = useState<any[]>([
  ]);
  const [dataFiles, setDataFiles] = useState<any[]>([
  ]);
  
  const [toDelete, setToDelete] = useState<any[]>([]);
  const [toDeleteFiles, setToDeleteFiles] = useState<any[]>([]);
  const { attachments } = useAttachmentState();
  const { deleteAttachment, toggleAttachmentCover } = useAttachmentDispatch();
  const getTypeImage = (mimetype: any) => {
    if ( mimetype.includes('png') ) {
      return 'png';
    } else if( mimetype.includes('jpeg') ) {
      return 'jpeg';
    } else if( mimetype.includes('jpg')) {
      return 'jpg';
    } else if (mimetype.includes('pdf')){
      return 'pdf'
    } else if (mimetype.includes('doc')){
      return 'doc';
    } else {
      return 'file';
    }
  }
  useEffect(() => {
    console.log('DOES THIS REACH??', attachments);
    const images = attachments.attachments.filter(
      (_: any) => _.mimetype.includes('png') || _.mimetype.includes('jpeg') || _.mimetype.includes('jpg')
    ).map((img: any) => {
      return {
        ...img,
        type: getTypeImage(img.mimetype),
        size: formatBytes(img.filesize, 2),
        key: img._id,
        file: img,
        value: img.value,
      };
    });
    const docs = attachments.attachments.filter(
      (_: any) => !(_.mimetype.includes('png') || _.mimetype.includes('jpeg') || _.mimetype.includes('jpg'))
    ).map((file: any) => {
      return {
        ...file,
        type: getTypeImage(file.mimetype),
        size: formatBytes(file.filesize, 1),
        key: file._id,
        date: formatDate(file.updatedAt),
        file: file,
        value: file.value,
      }
    });
    setDataImages(images);
    setDataFiles(docs);
  }, [attachments]);
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
      render: (id:string, record: any) => (
        <Button className="user-download " onClick={() => {
          if (record.value) {
            saveAs(record.value, record.filename);
          } else {
            saveAs(record.file, record.filename);
          }
        }}>
          <img className="icon-bt" src='/Icons/icon-01.svg' />
        </Button>
      ),
      width: "5%"
    },
  ];
  const handle = (row: any) => {
    const copy = [...dataImages].map((d) => {
      if (row.key === d.key) {
        d.cover = true;
        d.isCover = true;
      } else {
        d.cover = false;
        d.isCover = false;
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
      dataIndex: "isCover",
      render: (text:boolean, record: any) => {
        return (
        <Tag className={record.cover || record.isCover? "cover-active": "cover"} onClick={() => handle(record)}>
          Cover
        </Tag>
      )},
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
      render: (id:string, record: any) => (
        <Button className="user-download " onClick={() => {
          if (record.value) {
            saveAs(record.value, record.filename);
          } else {
            saveAs(record.file, record.filename);
          }
        }}>
          <img className="icon-bt" src='/Icons/icon-01.svg' />
        </Button>
      ),
      width: "5%"
    },
  ];
 
  useEffect(() => {
    console.log('Data Images', dataImages, 'Data Files', dataFiles);
    setFiles([...dataImages, ...dataFiles]);
  }, [dataImages, dataFiles]);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
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
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const formatDate = (timestamp: number) => {
    let date = new Date(timestamp);
    var day = date.getDate();
    let months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
    var month = date.getMonth();
    var year = date.getFullYear();
    // var hours = date.getHours();
    // var minutes = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
    return `${day} ${months[month]}, ${year}`;
  }
  function renameFile(originalFile: any, newName: string) {
    const lastI = originalFile.name.indexOf('.');
    return new File([originalFile], newName+originalFile.name.substring(lastI, originalFile.name.length), {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
    });
}
  const addFile = (file: any, description: any, type: string) => {
    const newFile = renameFile(file, description ? description : file.name);
    if (type === 'images') {
      setDataImages((oldData) => {
        return [...oldData, {
          ...file,
          description: description,
          filename: newFile.name,
          type: file.type.replace('image/', '').toUpperCase(),
          size: formatBytes(file.size, 2),
          key: file.name + file.lastModified,
          file: newFile,
          cover: oldData.length === 0 ? true: false
        }] 
      })
      setModal(false);
    } else {
      const lastI = file.type.indexOf('/');
      setDataFiles((oldData) => {
        return [...oldData, {
          ...file,
          description: description,
          filename: newFile.name,
          type: file.type.substring(lastI+1, file.type.length).toUpperCase(),
          size: formatBytes(file.size, 1),
          key: file.name + file.lastModified,
          date: formatDate(file.lastModified),
          file: newFile
        }] 
      });
      setModal02(false);
    }
  }
  const deleteImages = () => {
    setDataImages((oldData: any) => oldData.filter((d: any) => !toDelete.includes(d.key)));
    const imagesToDelete = dataImages.filter((d:any) => toDelete.includes(d.key) && d._id);
    imagesToDelete.forEach((d:any) => {
      const indexDelete = attachments.attachments.findIndex((elem:any) => elem._id === d._id);
      deleteAttachment(indexDelete, d._id);
    });
  };
  const deleteFiles = () => {
    setDataFiles((oldData: any) => oldData.filter((d: any) => !toDeleteFiles.includes(d.key)));
    const filesToDelete = dataFiles.filter((d:any) => toDelete.includes(d.key) && d._id);
    filesToDelete.forEach((d:any) => {
      deleteAttachment(0, d._id);
    });
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
            {toDelete.length ?  <span onClick={deleteImages} style={{color:'red'}}>Delete</span> : null }
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
          {toDeleteFiles.length ?  <span onClick={deleteFiles} style={{color:'red'}}>Delete</span> : null }
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
