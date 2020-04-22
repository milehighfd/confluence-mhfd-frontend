import React, { useState } from 'react';
import { Dropdown, Menu, Button, Row, Col, Input } from 'antd';

import { ReactSortable, ItemInterface, Sortable } from 'react-sortablejs';
import { Link } from 'react-router-dom';

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

const CostsRow = ({ children } : any) => (
  <Row className="cost-rows">
    {children}
  </Row>
);


export default ({ headers, panelState, setPanelState, handleSaveDraftCard } : { headers : any, panelState : any, setPanelState : Function, handleSaveDraftCard : Function }) => {
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

  const handleEndDrag = (event : Sortable.SortableEvent, header : string) => {
    /* Verifier if item already exists on array to avoid multiple equal values */
    const stateValidator = panelState[dragged.parent].find((x : ItemInterface) => (
      x.id === dragged.id
    ));

    if (header !== dragged.parent && !stateValidator) {
      if (!event.pullMode) {
        updatePanelStateOnDrag(header, event.newIndex as number);
      } else {
        const prevIndex = headers.drafts.indexOf(header);
        const nextIndex = headers.drafts.indexOf(dragged.parent);
        let selectedItemId = '';

        if (prevIndex < nextIndex) {
          selectedItemId = headers.drafts[nextIndex - 1]
        } else {
          selectedItemId = headers.drafts[nextIndex + 1]
        }

        updatePanelStateOnDrag(selectedItemId, event.newIndex as number);
      }
    } 

    setContainerClass('col-wr');
    setIsDragging(false);
  }

  const updatePanelStateOnDrag = (oldId : string, oldIndex : number) => {
    const selectedItem = panelState[oldId].find((x : ItemInterface) => x.id === dragged.id);

    if (selectedItem) {
      const oldState = [...panelState[oldId]];
      const newState = [...panelState[dragged.parent]];
      newState.push(selectedItem);
      oldState.splice(oldIndex, 1);
  
      setPanelState({ ...panelState, [dragged.parent]: newState, [oldId]: oldState });
    }
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

            {header === 'workspace' &&
              <Link to='/new-project-types'>
                <Button className="btn-create">
                  <img src="/Icons/icon-18.svg" alt="" />
                  Create Project
                </Button>
              </Link>
            }

            {getSortableContent(panelState[header], header)}
          </div>

          <div className="cost-wr">
            {header === 'workspace' ?
              <Col>
                <CostsRow><h5>TOTAL REQUESTED</h5></CostsRow>
                <CostsRow><h5>Target Cost</h5></CostsRow>
                <CostsRow><h5>Differential</h5></CostsRow>
              </Col>
              :
              <Col>
                <CostsRow><Input placeholder="Enter target cost" /></CostsRow>
                <CostsRow><Input className="input-pp" placeholder="Enter target cost" /></CostsRow>
                <CostsRow><Input className="input-rr" placeholder="XXX Difference" /></CostsRow>
              </Col>
            }

            {header === headers.drafts[headers.drafts.length - 1] &&
              <Row>
                <Button onClick={() => handleSaveDraftCard()} >
                  Submit to Admin
                  </Button>
              </Row>
            }
          </div>
        </div>
      ))}

    </div>
  )
}
