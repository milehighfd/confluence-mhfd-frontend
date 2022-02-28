import React from 'react';
import { useNoteDispatch } from '../../hook/notesHook';

const Nbsp = () => '\u00A0';
export const Node = ({ children, item, level, onClick, isFolder, onDragAndDrop, editMode, onEdit, setEditMode }: any) => {
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
        {!editMode ? <span className="f-title">{item.label}</span> : 
          <input type="text" onChange={onEdit} value={item.label} onKeyUp={checkEnter} />
        }
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};