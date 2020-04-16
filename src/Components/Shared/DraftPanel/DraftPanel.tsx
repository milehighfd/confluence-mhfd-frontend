import React, { useState } from 'react';
import { Dropdown, Button, Menu } from 'antd';

import { ReactSortable } from 'react-sortablejs';

const SORTABLE_ITEMS = [
  {
    id: 'kyei281238',
    requestName: 'West Tollgate Creek GSB Drops',
    totalCost: '$410,000',
    county: 'Aurora',
    status: 'Draft'
  },
  {
    id: 'asd123c3t1',
    requestName: 'Westminster Creek GSB Drops',
    totalCost: '$410,000',
    county: 'Aurora',
    status: 'Draft'
  },
  {
    id: 'xx2131ff12',
    requestName: 'Denver River Fix',
    totalCost: '$410,000',
    county: 'Aurora',
    status: 'Draft'
  },
  {
    id: 'x12321e213',
    requestName: 'Potato Town',
    totalCost: '$410,000',
    county: 'Aurora',
    status: 'Draft'
  }
];

const SELECTED_ITEMS = [
  {
    id: 'xasd2fg234',
    requestName: 'Mac n Cheese',
    totalCost: '$120,000',
    county: 'Denver',
    status: 'Draft'
  }
]

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

export default ({ headers } : { headers : Array<string | number> }) => {
  const [state, setState] = useState(SORTABLE_ITEMS);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedState, setSelectedState] = useState(SELECTED_ITEMS);
  const [containerClass, setContainerClass] = useState('col-wr');
  const [dragged, setDragged] = useState({ id: '', parent: '' });

  const handleDragEnter = (trigger : string | number) => {
    if (isDragging) {
      setDragged({ ...dragged, parent: '' + trigger })
    }
  }

  const handleDragLeave = (event : any) => {
    if (isDragging) {
    }
  }

  const handleStartDrag = (event : any, trigger : string | number) => {
    const index : number = event.oldIndex;
    if (trigger === 'WORKSPACE') {
      setDragged({id: state[index].id, parent: '' + trigger}); 
    } else {
      setDragged({id: selectedState[index].id, parent: '' + trigger});
    }

    setContainerClass('col-wr col-hovered');
    setIsDragging(true);
  }

  const handleEndDrag = (event : any, trigger : string | number) => {
    if (!event.pullMode && '' + trigger !== dragged.parent) {
      if (trigger === 'WORKSPACE') {
        const item : any = state.find((x : any) => x.id === dragged.id);
        const newState = [...selectedState];
        newState.push(item);
        setSelectedState(newState);
        state.splice(event.oldIndex, 1);
      } else {
        const item : any = selectedState.find((x : any) => x.id === dragged.id);
        const newState = [...state];
        newState.push(item);
        setState(newState);
        selectedState.splice(event.oldIndex, 1);
      }
    }

    setContainerClass('col-wr');
    setIsDragging(false);
  }

  const getContainerStyle = (header : string | number) => {
    if ('' + header === dragged.parent && isDragging) {
      return {
        borderColor: 'green',
        backgroundColor: '#12a80d25'
      };
    } else {
      return {};
    }
  }

  return (
    <div className="work-request">
      <div>
        <h3>Workspace</h3>
        <div 
          className={containerClass}
          style={getContainerStyle('WORKSPACE')}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => handleDragEnter('WORKSPACE')}
          onDragLeave={() => handleDragLeave('WORKSPACE')} >
          <Button className="btn-create"><img src="/Icons/icon-18.svg" alt="" /> Create Project</Button>
          <ReactSortable 
            list={state} 
            setList={setState} 
            animation={200}
            onStart={(e) => handleStartDrag(e, 'WORKSPACE')}
            onEnd={(e) => handleEndDrag(e, 'WORKSPACE')}
            group="capital" >
            {state.map((item : any) => (
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
        </div>
      </div>
      
      {headers.map((header: string | number, index: number) => (
        <div key={index}>
          <h3>{header}</h3>
          <div 
            className={"col-wr " + containerClass}
            style={getContainerStyle(header)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => handleDragEnter(header)}
            onDragLeave={() => handleDragLeave(header)} >
            {header === headers[0] ?
              <ReactSortable
                list={selectedState}
                setList={setSelectedState}
                animation={200}
                onStart={(e) => handleStartDrag(e, header)}
                onEnd={(e) => handleEndDrag(e, header)}
                group="capital" >
                {selectedState.map((item : any) => (
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
              :
              null
            }
          </div>
        </div>
      ))}

    </div>
  )
}
