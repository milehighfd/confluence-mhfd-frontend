import React from 'react';

const Nbsp = () => '\u00A0';
export const Node = ({ item, level, onClick, isFolder }: any) => {
  console.log(' rendering ', item);
  return (
    <div className={isFolder ? "s-item folder":"s-item" }  style={{ paddingLeft: `${(level + 1) * 16}px`}} onClick={onClick}>
      {/* {isFolder ? <img src="/Icons/left-arrow.svg" alt="" width="10px" style={ { marginRight: '8px'}}/>  : null} */}
      {isFolder ?<span className="ic-folder"></span>:null}
      <span className="f-title">{item.label}</span>
    </div>
  );
};