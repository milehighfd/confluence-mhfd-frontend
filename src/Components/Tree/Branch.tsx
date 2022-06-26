import React, {useState } from 'react';

import { Node } from './Node';

const NewBranches = ({children, level, onDragAndDrop, setTree, mapFunctions, swapPositions} : any) => {
  return (
    <>
    {children ?
      children.map((item: any) => <Branch
        key={item.id}
        item={item}
        level={level}
        onDragAndDrop={onDragAndDrop} 
        setTree={setTree}
        mapFunctions={mapFunctions}
        swapPositions={swapPositions}
        />)
      : 
      null
    }
    </>
  );
}
export const Branch = ({ item, level, onDragAndDrop, swapPositions, setTree, mapFunctions }: any) => {
  const hasChildren = item.children?.length;
  const [open, setOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);
  

  const onClick = () => {
    if (item.hasOwnProperty('children')) {
      setEditMode(true);
    } else {
      console.log('no children');
    }
  }
  
  const onEdit = (e: any) => {
    const { value } = e.target;
    item.label = value;
    setTree((oldTree: any) => {
      const newTree = [...oldTree];
      return newTree;
    });
  }
  
  return (
    <>
      <Node
        item={item}
        level={level}
        onClick={onClick}
        isFolder={item.hasOwnProperty('children')}
        onDragAndDrop={onDragAndDrop}
        editMode={editMode}
        onEdit={onEdit}
        setEditMode={setEditMode}
        mapFunctions={mapFunctions}
        swapPositions={swapPositions}
      >
      {(open && hasChildren) ? <NewBranches
        children={item.children}
        level={level + 1}
        onDragAndDrop={onDragAndDrop} 
        mapFunctions={mapFunctions}
        swapPositions={swapPositions}
      /> 
      : null}
      </Node>
    </>
  );
}