import React, { useState, useEffect } from "react";
import { Drawer, Row, Col, Input, Button, Menu, Select, Popover, Comment, Avatar, List } from 'antd';
import { DownOutlined, CheckOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;
const data = [
  <><i className="mdi mdi-circle-medium" style={{color:'rgba(37, 24, 99, 0.5)'}}></i> All Types <CheckOutlined /></> ,
  <><i className="mdi mdi-circle-medium" style={{color:'#FF0000'}}></i> Red</> ,
  <><i className="mdi mdi-circle-medium" style={{color:'#FA6400'}}></i> Orange</> ,
  <><i className="mdi mdi-circle-medium" style={{color:'rgba(00, 00, 00, 0.3)'}}></i> Grey</> ,
  <><i className="mdi mdi-circle-medium" style={{color:'#29C499'}}></i> Green</> ,
];

const content = (
  <List
    size="small"
    footer={<Button>Leave a Comment</Button>}
    bordered
    dataSource={data}
    renderItem={item => <List.Item>{item}</List.Item>}
  />
);

const content00 = (
  <ul>
    <li><i className="mdi mdi-circle-medium" style={{color:'#FF0000'}}></i> Red</li>
    <li><i className="mdi mdi-circle-medium" style={{color:'#FA6400'}}></i> Orange</li>
    <li><i className="mdi mdi-circle-medium" style={{color:'rgba(00, 00, 00, 0.3)'}}></i> Grey</li>
    <li><i className="mdi mdi-circle-medium" style={{color:'#29C499'}}></i> Green</li>
  </ul>
);
export default () => {
  const [visible, setVisible] = useState(false);
   const showDrawer = () => {
     setVisible(true);
   };
   const onClose = () => {
     setVisible(false);
   };
  return (
    <>
    <Button onClick={showDrawer} >
      Drawer
    </Button>
    <Drawer
      title={<div className="comment-title">
              <h5>My Map Notes</h5>
              <Popover trigger="click" placement="bottomRight" content={content} overlayClassName="popover-note">
                <Button className="type-popover"><i className="mdi mdi-circle-medium"></i> All Types <DownOutlined /></Button>
              </Popover>
            </div>}
      placement="left"
      closable={false}
      onClose={() => setVisible(false)}
      visible={visible}
      className="comment-drawer"
    >

      <Comment
        avatar={
          <Avatar style={{ color: '#11093C', backgroundColor: 'rgba(00,00,00,0.2)' }}>AA</Avatar>
        }
        content={
          <>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
          </p>
          <h6>2 mins ago</h6>
          </>
        }
      />
      <Comment
        avatar={
          <Avatar style={{ color: '#11093C', backgroundColor: 'rgba(00,00,00,0.2)' }}>AA</Avatar>
        }
        content={
          <>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
          </p>
          <h6>2 mins ago</h6>
          </>
        }
      />
      <Comment
        avatar={
          <Avatar style={{ color: '#11093C', backgroundColor: 'rgba(00,00,00,0.2)' }}>AA</Avatar>
        }
        content={
          <>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
          </p>
          <h6>2 mins ago</h6>
          </>
        }
      />
      <Comment
        avatar={
          <Avatar style={{ color: '#11093C', backgroundColor: 'rgba(00,00,00,0.2)' }}>AA</Avatar>
        }
        content={
          <>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
          </p>
          <h6>2 mins ago</h6>
          </>
        }
      />
      <Comment
        avatar={
          <Avatar style={{ color: '#11093C', backgroundColor: 'rgba(00,00,00,0.2)' }}>AA</Avatar>
        }
        content={
          <>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
          </p>
          <h6>2 mins ago</h6>
          </>
        }
      />
      <Comment
        avatar={
          <Avatar style={{ color: '#11093C', backgroundColor: 'rgba(00,00,00,0.2)' }}>AA</Avatar>
        }
        content={
          <>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
          </p>
          <h6>2 mins ago</h6>
          </>
        }
      />
      <Comment
        avatar={
          <Avatar style={{ color: '#11093C', backgroundColor: 'rgba(00,00,00,0.2)' }}>AA</Avatar>
        }
        content={
          <>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
          </p>
          <h6>2 mins ago</h6>
          </>
        }
      />

      <Button className="btn-coll" onClick={onClose}>
        <img src="/Icons/icon-34.svg" alt="" width="18px" style={{ transform: 'rotate(180deg)' }} />
      </Button>
    </Drawer>

    <br/>
    <div className="popup-comment">
      <div className="headmap">
      <Popover trigger="click" placement="bottomRight" content={<ul>
    <li><i className="mdi mdi-circle-medium" style={{color:'#FF0000'}}></i> Red</li>
    <li><i className="mdi mdi-circle-medium" style={{color:'#FA6400'}}></i> Orange</li>
    <li><i className="mdi mdi-circle-medium" style={{color:'rgba(00, 00, 00, 0.3)'}}></i> Grey</li>
    <li><i className="mdi mdi-circle-medium" style={{color:'#29C499'}}></i> Green</li>
  </ul>} overlayClassName="popover-comment">
        <Button className="type-popover"><i className="mdi mdi-circle-medium" style={{color:'#29C499'}}></i> Leave a Comment <DownOutlined /></Button>
      </Popover>
      </div>
      <div className="bodymap">
        <TextArea rows={5} placeholder="Add Comments…" />
        <Button>Save</Button>
      </div>
    </div>
  </>
  )
}
