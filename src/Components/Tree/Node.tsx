import React, { useState } from 'react';
import { useNoteDispatch } from '../../hook/notesHook';
import { Popover, Menu } from 'antd';
import { useProfileState } from '../../hook/profileHook';

const Nbsp = () => '\u00A0';

const contentmenu = (note: any, mapFunctions: any, isFolder: boolean, deleteGroup: any) =>  {
  return (
  <Menu className="js-mm-00">
   { !isFolder ?
    <Menu.Item onClick={(e: any) => {
      console.log('my event ',e );
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
    </Menu.Item> : null}
    {!isFolder ? 
    <Menu.Item onClick={(e: any) => {
      //e.stopPropagation();
      console.log(note.data.longitude, note.data.latitude);
      mapFunctions.flyTo(note.data.longitude, note.data.latitude);
      // flyTo(note.longitude, note.latitude);
    }}>
      <span><img src="/Icons/icon-13.svg" alt="" width="10px" style={{opacity:'0.5', marginTop:'-2px'}}/> Zoom to</span>
    </Menu.Item> : null }
    {!isFolder ? 
    <Menu.Item onClick={(e: any) => {
      //e.stopPropagation();
      mapFunctions.deleteNote(note.id);
      //it's destroying the app , but the endpoint works well :) <3
      console.log(note.id);
      // deleteNote(note._id);
    }}>
      <span style={{color:'#FF0000'}}><img src="/Icons/icon-16.svg" alt="" width="10px" style={{ marginTop:'-3px'}}/> Delete</span>
    </Menu.Item> : null}
    {isFolder ? 
      <Menu.Item onClick={(e: any) => {
        //e.stopPropagation();
        // mapFunctions.deleteNote(note.id);
        //it's destroying the app , but the endpoint works well :) <3
        console.log(note.id);
        deleteGroup(note.id);
        // deleteNote(note._id);
      }}>
        <span style={{color:'#FF0000'}}><img src="/Icons/icon-16.svg" alt="" width="10px" style={{ marginTop:'-3px'}}/> Delete</span>
      </Menu.Item> : null
    }
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
  const { deleteGroup } = useNoteDispatch();
  const { userInformation } = useProfileState();
  const initialName = userInformation.firstName.charAt(0) + userInformation.lastName.charAt(0);
  const { editGroup } = useNoteDispatch();
  const checkEnter = (e: any) => {
    if (e.key === 'Enter') {
      setEditMode(false);
      console.log(item);
      editGroup({_id: item.id, name: item.label, user_id: item.user_id});
    }
  }
  
  const showCutText = (text: string) => {
    const TEXT_LENGTH = 30;
    if (text.length > TEXT_LENGTH) {
      return text.substring(0, TEXT_LENGTH) + '...';
    }
    return text;

  }

  const [showBorder, setShowBorder] = useState(false);
console.log("ITEM NODe", item, children);
  return (
    <div
      onDragOver={(e: any) => {
        setShowBorder(true);
        e.preventDefault();
      }}
      onDragLeave={(e: any) => {
        setShowBorder(false);
      }}
      onDrop={(e: any) => {
        setShowBorder(false);
        if (isFolder) {
          const id = e.dataTransfer.getData('id');
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
          setShowBorder(false);
        }}
        className={isFolder ? "s-item folder":"s-item" }
        style={{ paddingLeft: `${(level + 1) * 16}px`, borderBottom: showBorder ? '2px solid #11093C ' : 'none'}}
        onClick={onClick}>
        {/* {isFolder ? <img src="/Icons/left-arrow.svg" alt="" width="10px" style={ { marginRight: '8px'}}/>  : null} */}
        {isFolder ?<span className="ic-folder"></span>:  <label className="ll-00"
          // style={{padding: '4px 6px', background: item.data.color ? item.data.color : 'red' +  ' !important'}}
          style={{padding: '1px 3px', background:  ( item?.data?.color ? item?.data?.color.color :'#F6BE0F') }}
        >
                {initialName}
              </label>}
        {!editMode ? <span className="f-title">{showCutText(item.label)}
        {<Popover placement="rightTop" overlayClassName="work-popover" content={contentmenu(item, mapFunctions, isFolder, deleteGroup)} trigger="click">
            
              <img src="/Icons/icon-60.svg" alt=""  className='menu-wr'
              onClick={(e: any) => {e.stopPropagation();}}
            />
            </Popover>}</span> : 
          <input type="text" onChange={onEdit} value={item.label} onKeyUp={checkEnter} style={{border: '2px solid transparent', marginLeft: '5px'}} />
        }
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};