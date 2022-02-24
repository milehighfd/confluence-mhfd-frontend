import React from 'react';

const Nbsp = () => '\u00A0';
export const Node = ({ item, level, onClick, isFolder }: any) => {
  console.log(' rendering ', item);
  return (
    <div style={{ paddingLeft: `${(level + 1) * 16}px`}} onClick={onClick}>
      {isFolder ? <img src="/Icons/left-arrow.svg" alt="" width="10px" style={ { marginRight: '8px'}}/>  : null}
      {item.label}
    </div>
  );
};