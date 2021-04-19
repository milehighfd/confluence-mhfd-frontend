import React, { useState, useEffect } from "react";
import { Drawer, Row, Col, Input, Button, Menu, Select, Popover, Comment, Avatar, List } from 'antd';
import { DownOutlined, CheckOutlined } from '@ant-design/icons';
import { useNoteDispatch, useNotesState } from "../../hook/notesHook";
import { useProfileState } from "../../hook/profileHook";
const { Option } = Select;
const { TextArea } = Input; 

const SideBarComment = ({visible, setVisible, flyTo, openEditNote, addToMap, changeFilter}: 
  {visible: boolean, setVisible: Function, flyTo: Function, openEditNote: Function, addToMap: Function, changeFilter: Function}) => {
  
  const { notes } = useNotesState();
  const {  deleteNote } = useNoteDispatch();
  const [filter, setFilter] = useState('all');
  const { userInformation } = useProfileState();
  useEffect(()=>{
    changeFilter(filter);
  },[filter]);
  const data = [
    <><div onClick={() => {setFilter('all')}}> <i className="mdi mdi-circle-medium" style={{color:'rgba(37, 24, 99, 0.5)'}}></i> All Types {filter === 'all' ? <CheckOutlined /> : <></>}</div></> ,
    <><div onClick={() => {setFilter('red'); console.log('red');}}><i className="mdi mdi-circle-medium" style={{color:'#FF0000'}}></i> Red {filter === 'red' ? <CheckOutlined /> : <></>}</div></> ,
    <><div onClick={() => setFilter('orange')}><i className="mdi mdi-circle-medium" style={{color:'#FA6400'}}></i> Orange {filter === 'orange' ? <CheckOutlined /> : <></>}</div></> ,
    <><div onClick={() => setFilter('grey')}><i className="mdi mdi-circle-medium" style={{color:'rgba(00, 00, 00, 0.3)'}}></i> Grey {filter === 'grey' ? <CheckOutlined /> : <></>}</div></> ,
    <><div onClick={() => setFilter('green')}><i className="mdi mdi-circle-medium" style={{color:'#29C499'}}></i> Green {filter === 'green' ? <CheckOutlined /> : <></>}</div></> ,
  ];

  const content = (
    <List
      size="small"
      bordered
      dataSource={data}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
  );

  const contentmenu = (note: any) =>  {
    return (
    <Menu className="js-mm-00">
      <Menu.Item onClick={() => {
        openEditNote(note);
      }}>
        <span><img src="/Icons/icon-04.svg" alt="" width="10px" style={{opacity:'0.5'}}/> Edit Comment</span>
      </Menu.Item>
      <Menu.Item onClick={() => {
        flyTo(note.longitude, note.latitude);
      }}>
        <span><img src="/Icons/icon-13.svg" alt="" width="10px" style={{opacity:'0.5'}}/> Zoom to</span>
      </Menu.Item>
      <Menu.Item onClick={() => {
        //it's destroying the app , but the endpoint works well :) <3
        deleteNote(note._id);
      }}>
        <span style={{color:'#FF0000'}}><img src="/Icons/icon-16.svg" alt="" width="10px"/> Delete</span>
      </Menu.Item>
    </Menu>
  )
  };
  const calculateTimeAgo = (time: Date): string => {
    const currentTime = new Date();
    const ms = currentTime.getTime() - time.getTime();
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (ms === 0) {
        return 'Just now';
    } if (seconds < 60) {
        return 'a few seconds Ago';
    } if (minutes < 60) {
        return minutes + ' minutes Ago';
    } if (hours < 24) {
        return hours + ' hours Ago';
    } if (days < 30) {
        return days + ' days Ago';
    } if (months < 12) {
        return months + ' months Ago';
    } else {
        return years + ' years Ago';
    }
  }
  const timeAgo = (time: string): string => {
    const parsedTime = time.split(/T|-|:|Z|\./);
    const originalTime = new Date(Date.UTC(+parsedTime[0], +parsedTime[1] - 1, +parsedTime[2], +parsedTime[3], +parsedTime[4], +parsedTime[5], +parsedTime[6]));
    return calculateTimeAgo(originalTime);
  }
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
              <Button onClick={() => addToMap()}>+</Button>
              <Popover trigger="click" placement="bottomRight" content={content} overlayClassName="popover-note">
                <Button className="type-popover"><i className="mdi mdi-circle-medium"></i> {filter === 'all' ? 'All Types' : filter[0].toUpperCase() + filter.slice(1)} <DownOutlined /></Button>
              </Popover>
            </div>}
      placement="left"
      maskClosable={false}
      mask={false}
      closable={false}
      onClose={() => setVisible(false)}
      visible={visible}
      className="comment-drawer"
      style={{'paddingLeft':'59px'}}
    >
      {filter === 'all' ? notes.map((note: any) => {
        return (
        <Comment avatar={
          <Avatar style={{ color: '#11093C', backgroundColor: 'rgba(00,00,00,0.2)' }}>{userInformation ? (userInformation.firstName[0] + userInformation.lastName[0]).toUpperCase(): ''}</Avatar>
        }
        content={note &&
          <>
          <p>
            {note.content}
          </p>
          <h6>{timeAgo(note.createdAt)}</h6>
          <Popover placement="rightTop" overlayClassName="work-popover" content={contentmenu(note)} trigger="click">
            <img src="/Icons/icon-60.svg" alt="" className="menu-wr" />
          </Popover>
          </>
        }
        />)
      }) : notes.flatMap((note: any) => {
        if (note.color === filter) {
          return [(
          <Comment avatar={
            <Avatar style={{ color: '#11093C', backgroundColor: 'rgba(00,00,00,0.2)' }}>AA</Avatar>
          }
          content={note &&
            <>
            <p>
              {note.content}
            </p>
            <h6>{timeAgo(note.createdAt)}</h6>
            <Popover placement="rightTop" overlayClassName="work-popover" content={contentmenu(note)} trigger="click">
              <img src="/Icons/icon-60.svg" alt="" className="menu-wr" />
            </Popover>
            </>
          }
          />)];
        } else {
          return [];
        }
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
