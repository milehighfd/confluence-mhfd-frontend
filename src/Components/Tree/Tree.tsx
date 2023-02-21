import React from 'react';

import {Branch} from './Branch';

export const Tree = ({ data, onDragAndDrop, setTree, mapFunctions, swapPositions } : any) => {
  return <div
      onDragOver={(e: any) => {
        e.preventDefault();
      }}
      onDrop={(e: any) => {
        console.log('dropped on root');
        const id = e.dataTransfer.getData('id');
        onDragAndDrop(id, null);
      }}
      className="insideMainNode"
    >
    <div className="main-node">
      {data.map((item: any) => <Branch
        key={item.id + (item.children? 'folder' : '')}
        item={item}
        level={0}
        onDragAndDrop={onDragAndDrop}
        setTree={setTree}
        mapFunctions={mapFunctions}  
        swapPositions={swapPositions}
      />)}
    </div>
  </div>
};