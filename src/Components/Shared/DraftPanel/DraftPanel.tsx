import React, { useState, useEffect } from 'react';
import { Dropdown, Menu } from 'antd';

import { ReactSortable } from 'react-sortablejs';
import { ProjectTypes } from '../../../Classes/MapTypes';

const menu = (
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
    <Menu.Item>
      <span className="menu-card-item" style={{color: 'red'}}>
        Delete
      </span>
    </Menu.Item>
  </Menu>
);

export default ({ headers, panel, moveDraftCard } : { headers : Array<string | number>, panel : any, moveDraftCard : Function }) => {
  const [dragged, setDragged] = useState({ id: '', parent: '' });
  const [isDragging, setIsDragging] = useState(false);
  const [containerClass, setContainerClass] = useState('col-wr');
  const [panelState, setPanelState] = useState<any>({});

  useEffect(() => {
    if (panel && panel.workspace) {
      setPanelState(panel);
    }
  }, [panel]);

  const handleDragEnter = (trigger : string) => {
    if (isDragging) {
      setDragged({ ...dragged, parent: '' + trigger })
    }
  }

  const handleDragLeave = (event : any) => {
    if (isDragging) {
    }
  }

  const handleStartDrag = (event : any, parent : string) => {
    const index : number = event.oldIndex;
    setDragged({ id: panelState[parent][index].id, parent })
    setContainerClass('col-wr col-hovered');
    setIsDragging(true);
  }

  const handleEndDrag = (event : any, header : string) => {
    if (!event.pullMode && '' + header !== dragged.parent) {
      const item : any = panelState[header].find((x : any) => x.id === dragged.id);
      const oldState = [...panelState[header]];
      const newState = [...panelState[dragged.parent]];
      newState.push(item);
      oldState.splice(event.oldIndex, 1);
      setPanelState({ ...panelState, [dragged.parent]: newState, [header]: oldState });
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

  const handleCardMove = (newState : Array<ProjectTypes>, header : string) => {
    setPanelState({ ...panelState, [header] : newState});
  }

  const getSortableContent = (content: any, header: string) => {
    if (content && content.length) {
      return (
        <ReactSortable
          list={content}
          setList={(newState) => handleCardMove(newState, header)}
          animation={200}
          onStart={(e) => handleStartDrag(e, header)}
          onEnd={(e) => handleEndDrag(e, header)}
          group="capital" >
          {panelState[header].map((item: any) => (
            <div className="card-wr" key={item.id}>
              <h4>{item.requestName} </h4>
              <h6>{item.totalCost}</h6>
              <p>{item.county} <label>{item.status}</label></p>
              <Dropdown overlay={menu} className="menu-wr">
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
      {headers.map((header: any, index: number) => (
        <div key={index}>
          <h3>{header}</h3>
          <div
            className={"col-wr " + containerClass}
            style={getContainerStyle(header)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => handleDragEnter(header)}
            onDragLeave={() => handleDragLeave(header)} >
            {getSortableContent(panelState[header], header)}
          </div>
        </div>
      ))}

    </div>
  )
}
