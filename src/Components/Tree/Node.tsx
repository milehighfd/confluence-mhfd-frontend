import React, { useState, useEffect, useRef } from 'react';
import { useNoteDispatch } from '../../hook/notesHook';
import { Popover, Menu, MenuProps } from 'antd';
import { useProfileState } from '../../hook/profileHook';

const contentmenu = (note: any, mapFunctions: any, isFolder: boolean, deleteGroup: any) => {
  let items: MenuProps['items'] = [];
  if (!isFolder) {
    items = [{
      key: '0',
      label: <span style={{borderBottom: '1px solid rgb(255 255 255)'}}>
        <img src="/Icons/icon-04.svg" alt="" width="10px" style={{ opacity: '0.5', marginTop: '-2px' }} />
        Edit Comment
      </span>,
      onClick: ((e: any) => {
        console.log('my event ', e);
        console.log(note);
        mapFunctions.openEditNote({
          longitude: note.data.longitude,
          latitude: note.data.latitude,
          content: note.data.content,
          color: note.data.color,
          id: note.id
        });
      })
    }, {
      key: '1',
      label: <span style={{borderBottom: '1px solid rgb(255 255 255)'}}>
        <img src="/Icons/icon-13.svg" alt="" width="10px" style={{ opacity: '0.5', marginTop: '-2px' }} />
        Zoom to
      </span>,
      onClick: ((e: any) => {
        console.log(note.data.longitude, note.data.latitude);
        mapFunctions.flyTo(note.data.longitude, note.data.latitude);
      })
    }, {
      key: '2',
      label: <span style={{ color: '#FF0000', borderBottom: '1px solid rgb(255 255 255)' }}>
        <img src="/Icons/icon-16.svg" alt="" width="10px" style={{ marginTop: '-3px' }} />
        Delete
      </span>,
      onClick: ((e: any) => {
        mapFunctions.deleteNote(note.id);
        console.log(note.id);
      })
    }];
  } else {
    items = [{
      key: '3',
      label: <span style={{ color: '#FF0000', borderBottom: '1px solid rgb(255 255 255)' }}>
        <img src="/Icons/icon-16.svg" alt="" width="10px" style={{ marginTop: '-3px' }} />
        Delete
      </span>,
      onClick: ((e: any) => {
        e.domEvent.stopPropagation();
        deleteGroup(note.id);
      })
    }];
  }
  return <Menu className="js-mm-00" items={items}>
  </Menu>;
};

export const Node = ({ 
  children,
  item,
  level,
  onClick,
  isFolder,
  onDragAndDrop,
  swapPositions,
  editMode,
  onEdit,
  setEditMode,
  mapFunctions,
}: any) => {
  const { deleteGroup } = useNoteDispatch();
  const { userInformation } = useProfileState();
  const [ isDraggable, setIsDraggable ] = useState(true);
  const initialName = userInformation.firstName.charAt(0) + userInformation.lastName.charAt(0);
  const { editGroup } = useNoteDispatch();
  const checkEnter = (e: any) => {
    if (e.key === 'Enter') {
      setEditMode(false);
      console.log(item);
      editGroup({_id: item.id, name: item.label, user_id: item.user_id});
    }
  }
  const unfocus = () => {
    setEditMode(false);
    editGroup({_id: item.id, name: item.label, user_id: item.user_id});
  }
  const showCutText = (text: string) => {
    const TEXT_LENGTH = 30;
    if (text.length > TEXT_LENGTH) {
      return text.substring(0, TEXT_LENGTH) + '...';
    }
    return text;

  }
  useEffect(()=>{
    if(editMode){
      if (componentRef.current && componentRef.current.contains) {
        componentRef.current.focus();
      }
    }
  },[editMode]);
  const componentRef: any = useRef();
  useEffect(()=>{
      if (componentRef.current && componentRef.current.contains) {
        componentRef.current.addEventListener('blur', (e:any) => {
          unfocus();
        });
      }
  },[componentRef.current]);
  const [showBorder, setShowBorder] = useState(false);
  
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
        const completeId = e.dataTransfer.getData('id');
        if (completeId.includes('|folder')) {
          const idFolder = completeId.split('|folder')[0];
          swapPositions(idFolder, item.id);
          e.stopPropagation();
          return;
        }
        if (isFolder) 
        {
          const id = e.dataTransfer.getData('id');
          onDragAndDrop(id, item.id, null);
          e.stopPropagation();
        } else {
          const id = e.dataTransfer.getData('id');
          onDragAndDrop(id, item.data.group_id, item.id);
          e.stopPropagation();
        }
      }}
    >
      <div 
        draggable={isDraggable}
        onDragStart={(e: any) => {
          if (isFolder) {
            e.dataTransfer.setData('id', item.id + '|folder');
          } else {
            e.dataTransfer.setData('id', item.id);
          }
          setShowBorder(false);
        }}
        className={(isFolder ? "s-item folder":"s-item" ) + (editMode? " editing":"")}
        style={{ paddingLeft: `${(level + 1) * 16}px`, borderBottom: showBorder ? '2px solid #11093C ' : 'none'}}
        onClick={onClick}>
        {isFolder ?<span className="ic-folder"></span>:  <label className="ll-00"
          style={{background:  ( item?.data?.color ? item?.data?.color.color :'#FFE121') }}
        >
                {initialName}
              </label>}
        {!editMode ? 
          <span className="f-title">{showCutText(item.label)}
          {<Popover placement="rightTop" overlayClassName="work-popover" content={contentmenu(item, mapFunctions, isFolder, deleteGroup)} trigger="focus">
            <button className="menu-wr" style={{background: 'transparent', border: 'transparent'}} onClick={(e: any) => {e.stopPropagation(); }}> <img src="/Icons/icon-60.svg" alt=""  className='menu-wr' 
            onClick={(e: any) => {e.stopPropagation();}}/></button>
          </Popover>}
          </span> 
          :
          <input className="inputfolders" ref={componentRef} onBlur={unfocus} type="text" onChange={onEdit} value={item.label} onKeyUp={checkEnter} onSelect={(e) => e.stopPropagation()} onMouseDown={(e) => {e.stopPropagation(); setIsDraggable(false)}} onMouseUp={() => setIsDraggable(true)}/>
        }
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};