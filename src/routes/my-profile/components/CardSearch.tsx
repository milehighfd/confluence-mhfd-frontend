import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, Dropdown, Input, Layout, Menu, Popover, Row, Select, Switch, Table, Tabs, Tooltip } from 'antd';
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

const CardSearch = ({name, subName,setEdit}:{name:string, subName:string, setEdit: React.Dispatch<React.SetStateAction<boolean>>}) => {

  return <>
    <Col span={12}>
      <Card style={{ width: '100% ', marginBottom:'5%', marginRight:'0px',marginLeft:'0px'}} className="card-style">
        <div className="tag-card" style={{top:'10px', fontSize:'18px'}}>
          <CloseOutlined />
        </div>
        <p className="color-sub">4/20/2022, 5:22:05</p>
        <div className="avatar-group">
          <h1 style={{fontWeight: '700'}}>{name}</h1>
          <EditOutlined style={{fontSize:'16px'}} onClick={() => {setEdit(true)}}/>
        </div>
        <p>{subName}</p>
        <div className="avatar-group" style={{marginTop:'45px'}}>
          <Button>Run Search</Button>
          <div>
            <Switch style={{marginRight:'5px'}} defaultChecked /> Alerts On
          </div>
        </div>
      </Card>
    </Col>
  </>
};

export default CardSearch;