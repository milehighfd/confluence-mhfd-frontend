import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const content06 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);

export const UploadAttachment = ({typeProject}:
  {typeProject: string}) => {
  const onChange = (e: any)=>{
    
  };
  
  return(
    <>
    <h5>4. Upload Attachments <Popover content={content06}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>
        <Upload>
            <Button>
            <img src="/Icons/icon-17.svg" alt="" height="20px" />
            <p>Attach main image in PNG or JPEG format</p>
            </Button>
        </Upload>
        <Row className="title-galery">
        <Col xs={{ span: 24 }} lg={{ span: 21 }} xxl={{ span: 21 }}>Uploaded</Col>
        <Col xs={{ span: 24 }} lg={{ span: 3 }} xxl={{ span: 3 }}>Cover Image</Col>
        </Row>

        <Row className="card-image">
            <Col xs={{ span: 24 }} lg={{ span: 2 }} xxl={{ span: 1 }}>
            <img src="/Icons/project/jpg.svg" alt="" height="27px" />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 19 }} xxl={{ span: 20 }}>
            <p>Image-1.jpg</p>
            <label>16 Sep, 2020 at 11:05 • 4.8 MB</label>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span:3 }} xxl={{ span: 3 }}>
            <Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button>
            <Checkbox/>
            </Col>
        </Row>
        <Row className="card-image">
            <Col xs={{ span: 24 }} lg={{ span: 2 }} xxl={{ span: 1 }}>
            <img src="/Icons/project/png.svg" alt="" height="27px" />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 19 }} xxl={{ span: 20 }}>
            <p>Image-2.png</p>
            <label>16 Sep, 2020 at 11:05 • 4.8 MB</label>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span:3 }} xxl={{ span: 3 }}>
            <Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button>
            <Checkbox/>
            </Col>
        </Row>
    </>
  );
}
