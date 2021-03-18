import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const content06 = (<div className="popver-info"></div>);

export const UploadAttachment = ({ typeProject }: { typeProject: string }) => {
  const [files, setFiles] = useState<any[]>([]);

  const onChange: any = (e: any) => {
    let newFiles = e.target.files;
    setFiles([...files, ...newFiles])
  };
  const formatBytes = (bytes: number, decimals = 2) =>{
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
    var month = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes() > 10 ? date.getMinutes(): '0' + date.getMinutes();
    return `${day} ${month}, ${year} at ${hours}:${minutes}`;
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  console.log('files', files);

  return (
    <>
      <h5>5. Upload Attachments <Popover content={content06}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>
      <input id="uploader" type="file" style={{ display: 'none' }} onChange={onChange} multiple accept="image/png, image/jpeg" />
      <label htmlFor="uploader">
        {/* <Button> */}
        <img src="/Icons/icon-17.svg" alt="" height="20px" />
        <p>Attach main image in PNG or JPEG format</p>
        {/* </Button> */}
      </label>
      <Row className="title-galery">
        <Col xs={{ span: 24 }} lg={{ span: 21 }} xxl={{ span: 21 }}>Uploaded</Col>
        <Col xs={{ span: 24 }} lg={{ span: 3 }} xxl={{ span: 3 }}>Cover Image</Col>
      </Row>

      {
        files.map((f, i) => (
          <Row key={i} className="card-image">
            <Col xs={{ span: 24 }} lg={{ span: 2 }} xxl={{ span: 1 }}>
              {
                f.type === 'image/png' ? (
                  <img src="/Icons/project/png.svg" alt="" height="27px" />
                ) : (
                  <img src="/Icons/project/jpg.svg" alt="" height="27px" />
                )
              }
              
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 19 }} xxl={{ span: 20 }}>
              <p>{f.name}</p>
              <label>{formatDate(f.lastModified)} • {formatBytes(f.size)}</label>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 3 }} xxl={{ span: 3 }}>
              <Button className="btn-transparent" onClick={() => removeFile(i)}>
                <img src="/Icons/icon-16.svg" alt="" height="15px" />
              </Button>
              <Checkbox />
            </Col>
          </Row>
        ))
      }

    </>
  );
}
