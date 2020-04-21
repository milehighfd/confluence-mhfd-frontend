import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';

import { ReactSortable, ItemInterface, Sortable } from 'react-sortablejs';

const cardOptions = ({ index, header, handleCardDelete } : { index : number, header : string, handleCardDelete : Function }) => (
  <Menu className="menu-card">
    <Menu.Item style={{borderBottom: '1px solid rgba(61, 46, 138, 0.07)'}}>
      <span className="menu-card-item">
        Edit
      </span>
    </Menu.Item>
    <Menu.Item style={{borderBottom: '1px solid rgba(61, 46, 138, 0.07)'}}>
      <span className="menu-card-item">
        Copy
      </span>
    </Menu.Item>
    <Menu.Item onClick={() => handleCardDelete(index, header)}>
      <span className="menu-card-item" style={{color: 'red'}}>
        Delete
      </span>
    </Menu.Item>
  </Menu>
);


export default ({ headers, panelState, setPanelState } : { headers : any, panelState : any, setPanelState : Function }) => {
  const [dragged, setDragged] = useState({ id: '', parent: '' });
  const [isDragging, setIsDragging] = useState(false);
  const [containerClass, setContainerClass] = useState('col-wr');

  const handleDragEnter = (trigger : string) => {
    if (isDragging) {
      setDragged({ ...dragged, parent: trigger })
    }
  }

  const handleStartDrag = (event : Sortable.SortableEvent, parent : string) => {
    const index = event.oldIndex as number;
    setDragged({ id: panelState[parent][index].id, parent })
    setContainerClass('col-wr col-hovered');
    setIsDragging(true);
  }

  const handleEndDrag = (event : any, header : string) => {
    if (!event.pullMode && '' + header !== dragged.parent) {
      const item = panelState[header].find((x : ItemInterface) => x.id === dragged.id);
      const oldState = [...panelState[header]];
      const newState = [...panelState[dragged.parent]];
      newState.push(item);
      oldState.splice(event.newIndex as number, 1);
      setPanelState({ ...panelState, [dragged.parent]: newState, [header]: oldState });

      const drag = document.getElementById(item.id)!;
      const y = event.originalEvent.y;

      /* TODO get exact translate animation by it's coords*/
      drag.animate([
        { transform: `translateY(${y/10}px)` }, 
        { transform: `translateY(${0}px)` }
      ], { 
        duration: 150,
      });
    }

    setContainerClass('col-wr');
    setIsDragging(false);
  }

  const getContainerStyle = (header : string) => {
    if (header === dragged.parent && isDragging) {
      return {
        borderColor: 'green',
        backgroundColor: '#12a80d25'
      };
    } else {
      return {};
    }
  }

  const handleCardMove = (newState : Array<ItemInterface>, header : string) => {
    setPanelState({ ...panelState, [header]: newState});
  }

  const handleCardDelete = (index : number, header : string) => {
    const updatedState = [...panelState[header]];
    updatedState.splice(index, 1);
    setPanelState({ ...panelState, [header]: updatedState });
  }

  const getSortableContent = (content: Array<ItemInterface>, header: string) => {
    if (content && content.length) {
      return (
        <ReactSortable
          list={content}
          setList={(newState) => handleCardMove(newState, header)}
          animation={200}
          onStart={(e) => handleStartDrag(e, header)}
          onEnd={(e) => handleEndDrag(e, header)}
          group="capital" >
          {content.map((item : ItemInterface, index : number) => (
            <div className="card-wr" key={item.id} id={'' + item.id}>
              <h4>{item.requestName} </h4>
              <h6>{item.estimatedCost}</h6>
              <p>{item.county} <label>{item.status}</label></p>
              <Dropdown overlay={cardOptions({index, header, handleCardDelete})} className="menu-wr">
                <span className="ant-dropdown-link" style={{ cursor: 'pointer' }}>
                  <img src="/Icons/icon-60.svg" alt="" />
                </span>
              </Dropdown>
            </div>
          ))}
        </ReactSortable>
        );
    } else {
      return;
    }
  }

  return (
    <div className="work-request">
      {headers.drafts.map((header: string, index: number) => (
        <div key={index}>
          <h3>{header.replace(/([A-Z])/g, ' $1')}</h3>
          <div
            className={"col-wr " + containerClass}
            style={getContainerStyle(header)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => handleDragEnter(header)} >
            {getSortableContent(panelState[header], header)}
          </div>
        </div>
      ))}

    </div>
  )
}
