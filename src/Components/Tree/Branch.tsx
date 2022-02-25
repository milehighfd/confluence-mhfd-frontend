import React, {useState, useEffect} from 'react';

import { Node } from './Node';

const NewBranches = ({children, level, onDragAndDrop} : any) => {
  return (
    <>
    {children ?
      children.map((item: any) => <Branch key={item.id} item={item} level={level} onDragAndDrop={onDragAndDrop}/> ): 
      null
    }
    </>
  );
}
export const Branch = ({ item, level, onDragAndDrop }: any) => {
  const hasChildren = item.children?.length;
  const [open, setOpen] = useState(true);
  
  const onClick = () => {
    if (hasChildren) {
      setOpen((prev: boolean) => !prev);
    } else {
      console.log('no children');
    }
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
        isFolder={item.children}
        onDragAndDrop={onDragAndDrop}
      >
      {(open && hasChildren) ? <NewBranches children={item.children} level={level + 1} onDragAndDrop={onDragAndDrop} /> 
      : null}
      </Node>
    </>
  );
}