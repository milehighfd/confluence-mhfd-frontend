import React, { useState, useEffect } from "react";
import { Drawer, Row, Col, Input, Button, Menu, Select, Popover, Comment, Avatar, List, Dropdown } from 'antd';
import { DownOutlined, CheckOutlined } from '@ant-design/icons';
import { useNoteDispatch, useNotesState } from "../../hook/notesHook";
import { useColorListDispatch, useColorListState } from "../../hook/colorListHook";
import { useProfileState } from "../../hook/profileHook";
import { Tree } from '../Tree/Tree';
import {divListOfelements} from './../Map/commetsFunctions';
const { Option } = Select;
const { TextArea } = Input;

const SideBarComment = ({visible, setVisible, flyTo, openEditNote, addToMap, changeFilter, swSave, setSwSave}:
  {visible: boolean, setVisible: Function, flyTo: Function, openEditNote: Function, addToMap: Function, changeFilter: Function, swSave:boolean, setSwSave:Function }) => {

  const { notes, groups } = useNotesState();
  const { colorsList } = useColorListState();
  const {  deleteNote, getGroups, getNotes, createGroup, editNote } = useNoteDispatch();
  const { setIdsFilter } = useColorListDispatch();
  const [filter, setFilter] = useState('all');
  const { userInformation } = useProfileState();
  const [tree, setTree] = useState([] as any);
  const [currentSelected, setCurrentSelected] = useState([] as any);
  useEffect(()=>{
    countFilterColors();
  },[currentSelected]);
  const [counterFilters, setCounterFilters ]= useState(0);
  const countFilterColors = () => {
    const counterArray = currentSelected.filter((item:any)=>{
      return item.selected;
    }).length;
    setCounterFilters(counterArray);
  }
  useEffect(() => {
    getGroups();
    getNotes();
  }, []);
  useEffect(()=>{
    setIdsFilter('');
    setCurrentSelected(colorsList.map((el:any) => {
      return {
        ...el,
        selected:false 
      }
    }));
  },[colorsList]);
  useEffect(() => {
    const newTree = groups.map((group: any) => {
      return {
        id: group._id,
        data: group,
        label: group.name,
        children: []
      } as any;
    });
    notes.forEach((note: any) => {
      const index = newTree.findIndex((item: any) => item.id === note.group_id);
      if (index !== -1) {
        newTree[index].children.push({
          id: note._id,
          label: note.content,
          data: note
        })
      } else {
        newTree.push({
          id: note._id,
          label: note.content,
          data: note
        });
      }
    });
    /*
    const data = [{
      id: '11',
      label: 'Folder 1',
      children: [{
        id: '12',
        label: 'note 2',
      }, {
        id: '13',
        label: 'note 3',
      }],
    }, 
    {
      id: '21',
      label: 'Folder 2',
      children: []
    },
    {
      id: '31',
      label: 'Note 4'
    }
    ];
    data.forEach((d: any) => {
      newTree.push(d);
    });*/
    setTree(newTree);
  }, [notes, groups]);

  useEffect(()=>{
    changeFilter(filter);
  },[filter]);
  
  const changeValueOfElement = (_id:any) => {
    const newValues = currentSelected.map((elem:any) => {
      if(elem._id == _id) {
        elem.selected = !elem.selected;
      }
      return elem;
    });
    let idstoParse:any = [];
    newValues.forEach((el:any) => {
      if(el.selected) {
        idstoParse.push(el._id);
      }
    });
    setCurrentSelected(newValues);
    setIdsFilter(idstoParse.toString());
    getNotes();
  }
  const onSelectCreateOption = (key: any) => {
    console.log(key);
    if (key.key === 'create-folder') {
      console.log('enter here');
      createGroup('Untitled Folder');
      getGroups();
    } else {
      addToMap();
      setSwSave(true);
    }
  }
  const createOptions = (
    <Menu onClick={onSelectCreateOption}>
      <Menu.Item key="create-folder">New Folder</Menu.Item>
      <Menu.Item key="create-note">New Map Note</Menu.Item>
    </Menu>
  );

  const data = [
    <><div onClick={() => {setFilter('all')}}> <i className="mdi mdi-circle-medium" style={{color:'rgba(37, 24, 99, 0.5)'}}></i> All Types {filter === 'all' ? <CheckOutlined /> : <></>}</div></> ,
    <><div onClick={() => {setFilter('red'); console.log('red');}}><i className="mdi mdi-circle-medium" style={{color:'#FF0000'}}></i> Red {filter === 'red' ? <CheckOutlined /> : <></>}</div></> ,
    <><div onClick={() => setFilter('orange')}><i className="mdi mdi-circle-medium" style={{color:'#FA6400'}}></i> Orange {filter === 'orange' ? <CheckOutlined /> : <></>}</div></> ,
    <><div onClick={() => setFilter('grey')}><i className="mdi mdi-circle-medium" style={{color:'rgba(00, 00, 00, 0.3)'}}></i> Grey {filter === 'grey' ? <CheckOutlined /> : <></>}</div></> ,
    <><div onClick={() => setFilter('yellow')}><i className="mdi mdi-circle-medium" style={{color:'#ffbf00'}}></i> Yellow {filter === 'yellow' ? <CheckOutlined /> : <></>}</div></> ,
  ];

  const content = (
    <List
      size="small"
      bordered
      dataSource={data}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
  );
  const backgroundColor = '#D1D1D1';
  const colors = {
    RED: '#FF0000',
    ORANGE: '#FA6400',
    GREY: 'rgb(00, 00, 00, 0.2)',
    YELLOW: '#ffbf00'
  };  
  const getColor = (color: any) => {
    switch(color) {
      case 'yellow':
        return colors.YELLOW;
      case 'grey':
        return colors.GREY;
      case 'orange':
        return colors.ORANGE;
      case 'red':
        return colors.RED;
      default:
        return colors.YELLOW;
    }
  };
  const mapFunctions = {
    openEditNote: openEditNote,
    flyTo: flyTo,
    deleteNote: deleteNote,
  };
  const contentmenu = (note: any) =>  {
    return (
    <Menu className="js-mm-00">
      <Menu.Item onClick={() => {
        openEditNote(note);
      }}>
        <span><img src="/Icons/icon-04.svg" alt="" width="10px" style={{opacity:'0.5', marginTop:'-2px'}}/> Edit Comment</span>
      </Menu.Item>
      <Menu.Item onClick={() => {
        flyTo(note.longitude, note.latitude);
      }}>
        <span><img src="/Icons/icon-13.svg" alt="" width="10px" style={{opacity:'0.5', marginTop:'-2px'}}/> Zoom to</span>
      </Menu.Item>
      <Menu.Item onClick={() => {
        //it's destroying the app , but the endpoint works well :) <3
        deleteNote(note._id);
      }}>
        <span style={{color:'#FF0000'}}><img src="/Icons/icon-16.svg" alt="" width="10px" style={{ marginTop:'-3px'}}/> Delete</span>
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
        return 'a few seconds ago';
    } if (minutes < 60) {
        return minutes + ' minutes ago';
    } if (hours < 24) {
        return hours + ' hours ago';
    } if (days < 30) {
        return days + ' days ago';
    } if (months < 12) {
        return months + ' months ago';
    } else {
        return years + ' years ago';
    }
  }
  const timeAgo = (time: string): string => {
    const parsedTime = time.split(/T|-|:|Z|\./);
    const originalTime = new Date(Date.UTC(+parsedTime[0], +parsedTime[1] - 1, +parsedTime[2], +parsedTime[3], +parsedTime[4], +parsedTime[5], +parsedTime[6]));
    return calculateTimeAgo(originalTime);
  }
  const onDragAndDrop = (element: any, destination: any) => {
    console.log('my tree is ', tree, element, destination);
    let selectedNote = tree.find((note: any) => note.id === element);
    if (!selectedNote) {
      tree.forEach((note: any) => {
        if (note.children) {
          const selectedChild = note.children.find((child: any) => child.id === element);
          if (selectedChild) {
            selectedNote = selectedChild;
          }
        }
      });
    }
    console.log("XDQ selected note", selectedNote);
    const newTree = tree.filter((item: any) => {
      if (item.children) {
        item.children = item.children.filter((child: any) => {
          return child.id !== element;
        });
      }
      return item.id !== element;
    });
    const newDestination = tree.find((note: any) => note.id === destination);
    const index = newTree.indexOf(newDestination);
    console.log('my index is ', index);
    console.log(newTree);
    if (index !== -1) {
      newTree[index].children.push(selectedNote);
    } else {
      newTree.push(selectedNote);
    }
    editNote({
      ...selectedNote.data,
      group_id: destination,
    });
    console.log("Finnaly edit note", {...selectedNote.data,
      group_id: destination});
    console.log('finally ', newTree);
    setTree(newTree);
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
              <h5>MAP NOTES</h5>
              <Button onClick={onClose}>
                {/* <img src="/Icons/left-arrow.svg" alt="" width="18px" /> */}
                <span className="arrow-left"></span>
              </Button>
            </div>}
      placement="left"
      maskClosable={false}
      mask={false}
      closable={false}
      onClose={() => setVisible(false)}
      visible={visible}
      className="comment-drawer"
      style={{'paddingLeft':'58px'}}
    >
      <h3>
      {/* Feature Layers
      <Dropdown overlay={createOptions} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
         + <DownOutlined />
      </a>
      </Dropdown> */}
        {/* <Button className={swSave===true? "button-active" :"btn-opacity" } onClick={() => {addToMap(); setSwSave(true);}}  >+</Button></h3> */}
      </h3>
      <div className="a-layers">
        <span className="title">Feature Layers</span>  
        <Dropdown overlay={divListOfelements(currentSelected, changeValueOfElement)} trigger={['click']}>
          <div className="hoverfilter"><a className="img-filter" onClick={e => e.preventDefault()} style={{right: counterFilters > 0?'45px':'35px'}}></a></div>
        </Dropdown>
        <span className="filterCounter">{counterFilters > 0 ? "("+counterFilters+")": ''}</span>
        <Dropdown overlay={createOptions} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}><span className="op-plus">+</span></a>
        </Dropdown>
      </div>
      <Tree
        data={tree}
        onDragAndDrop={onDragAndDrop}  
        setTree={setTree}
        mapFunctions={mapFunctions}
      />            
      {/* <Button className={swSave===true? "button-active" :"btn-opacity" } onClick={() => {addToMap(); setSwSave(true);}}  >+</Button>
      <Popover trigger="focus" placement="bottomRight" content={content} overlayClassName="popover-note">
        <Button className="type-popover"><i className="mdi mdi-circle-medium"></i> {filter === 'all' ? 'All Types' : filter[0].toUpperCase() + filter.slice(1)} <DownOutlined /></Button>
      </Popover>  */}
      </Drawer>
  </>
  )
}

export default SideBarComment;
