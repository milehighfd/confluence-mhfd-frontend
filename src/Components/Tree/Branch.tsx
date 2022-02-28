import React, {useState, useEffect} from 'react';

import { Node } from './Node';

const NewBranches = ({children, level, onDragAndDrop, setTree} : any) => {
  return (
    <>
    {children ?
      children.map((item: any) => <Branch key={item.id} item={item} level={level} onDragAndDrop={onDragAndDrop} 
        setTree={setTree}/>)
      : 
      null
    }
    </>
  );
}
export const Branch = ({ item, level, onDragAndDrop, setTree }: any) => {
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
  useEffect(() => {
    console.log(open, item);
  }, [open]);
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
      >
      {(open && hasChildren) ? <NewBranches children={item.children} level={level + 1} onDragAndDrop={onDragAndDrop} /> 
      : null}
      </Node>
    </>
  );
}