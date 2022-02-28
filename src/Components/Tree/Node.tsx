import React from 'react';
import { useNoteDispatch } from '../../hook/notesHook';
import { Popover, Menu } from 'antd';

const Nbsp = () => '\u00A0';

const contentmenu = (note: any, mapFunctions: any) =>  {
  return (
  <Menu className="js-mm-00">
    <Menu.Item onClick={(e: any) => {
      //e.stopPropagation();
      console.log(note);
      mapFunctions.openEditNote({
        longitude: note.data.longitude,
        latitude: note.data.latitude,
        content: note.data.content,
        color: note.data.color,
        id: note.id
      });
      // openEditNote(note);
    }}>
      <span><img src="/Icons/icon-04.svg" alt="" width="10px" style={{opacity:'0.5', marginTop:'-2px'}}/> Edit Comment</span>
    </Menu.Item>
    <Menu.Item onClick={(e: any) => {
      //e.stopPropagation();
      console.log(note.data.longitude, note.data.latitude);
      mapFunctions.flyTo(note.data.longitude, note.data.latitude);
      // flyTo(note.longitude, note.latitude);
    }}>
      <span><img src="/Icons/icon-13.svg" alt="" width="10px" style={{opacity:'0.5', marginTop:'-2px'}}/> Zoom to</span>
    </Menu.Item>
    <Menu.Item onClick={(e: any) => {
      //e.stopPropagation();
      mapFunctions.deleteNote(note.id);
      //it's destroying the app , but the endpoint works well :) <3
      console.log(note.id);
      // deleteNote(note._id);
    }}>
      <span style={{color:'#FF0000'}}><img src="/Icons/icon-16.svg" alt="" width="10px" style={{ marginTop:'-3px'}}/> Delete</span>
    </Menu.Item>
  </Menu>
)
};

export const Node = ({ 
  children,
  item,
  level,
  onClick,
  isFolder,
  onDragAndDrop,
  editMode,
  onEdit,
  setEditMode,
  mapFunctions,
}: any) => {
  // console.log(' rendering ', item);
  const { editGroup } = useNoteDispatch();
  const checkEnter = (e: any) => {
    if (e.key === 'Enter') {
      setEditMode(false);
      console.log(item);
      editGroup({_id: item.id, name: item.label, user_id: item.user_id});
    }
  }
  return (
    <div
      onDragOver={(e: any) => {
        e.preventDefault();
      }}
      onDrop={(e: any) => {
        if (isFolder) {
          const id = e.dataTransfer.getData('id');
          console.log('my id is ', id);
          console.log('dropping ', item);
          onDragAndDrop(id, item.id);
          e.stopPropagation();
        }
        // e.stopPropagation();
      }}
    >
      <div 
        draggable={!isFolder}
        onDragStart={(e: any) => {
          e.dataTransfer.setData('id', item.id);
          console.log('drag start', item);
        }}
        className={isFolder ? "s-item folder":"s-item" }
        style={{ paddingLeft: `${(level + 1) * 16}px`}}
        onClick={onClick}>
        {/* {isFolder ? <img src="/Icons/left-arrow.svg" alt="" width="10px" style={ { marginRight: '8px'}}/>  : null} */}
        {isFolder ?<span className="ic-folder"></span>:null}
        {!editMode ? <span className="f-title">{item.label}
        {!isFolder?  <Popover placement="rightTop" overlayClassName="work-popover" content={contentmenu(item, mapFunctions)} trigger="click">
              <img src="/Icons/icon-60.svg" alt=""  className='menu-wr'/>
            </Popover>: null}</span> : 
          <input type="text" onChange={onEdit} value={item.label} onKeyUp={checkEnter} />
        }
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};