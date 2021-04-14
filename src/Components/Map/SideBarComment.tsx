import React, { useState, useEffect } from "react";
import { Drawer, Row, Col, Input, Button, Menu, Select, Popover, Comment, Avatar, List } from 'antd';
import { DownOutlined, CheckOutlined } from '@ant-design/icons';
import { useNotesState } from "../../hook/notesHook";
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

const SideBarComment = ({visible, setVisible}: {visible: boolean, setVisible: Function}) => {
  const { notes } = useNotesState();

  useEffect(() => {
    console.log(notes);
  }, []);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
    <Drawer
      title={<div className="comment-title">
              <h5>Map Notes</h5>
              <Popover trigger="click" placement="bottomRight" content={content} overlayClassName="popover-note">
                <Button className="type-popover"><i className="mdi mdi-circle-medium"></i> All Types <DownOutlined /></Button>
              </Popover>
            </div>}
      placement="left"
      maskClosable={false}
      mask={false}
      closable={false}
      onClose={() => setVisible(false)}
      visible={visible}
      className="comment-drawer"
    >
      {notes.map((note: any) => {
        return (
        <Comment avatar={
          <Avatar style={{ color: '#11093C', backgroundColor: 'rgba(00,00,00,0.2)' }}>AA</Avatar>
        }
        content={
          <>
          <p>
            {note.content}
          </p>
          <h6>2 mins ago</h6>
          </>
        }
        />)
      })
      }
     

      <Button className="btn-coll" onClick={onClose}>
        <img src="/Icons/icon-34.svg" alt="" width="18px" style={{ transform: 'rotate(180deg)' }} />
      </Button>
    </Drawer>
  </>
  )
}

export default SideBarComment;