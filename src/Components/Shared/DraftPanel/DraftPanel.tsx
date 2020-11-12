import React, { useEffect, useState } from 'react';
import { Dropdown, Menu, Button, Row, Col, Input } from 'antd';

import { Link } from 'react-router-dom';
import { DraftPanelTypes, ProjectTypes } from '../../../Classes/MapTypes';

import { DragDropContext, Droppable, Draggable, DropResult, DraggableLocation } from 'react-beautiful-dnd';

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

const CostsRow = ({ children } : { children : React.ReactNode}) => (
  <Row className="cost-rows">
    {children}
  </Row>
);

const numberWithCommas = (x : number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const WorkPlanWrapper = ({ children, workPlanWrapper } : { children : React.ReactNode, workPlanWrapper? : boolean }) => (
  <>
    {workPlanWrapper ?
      <Col span={3}>
        {children}
      </Col>
        :
    <>{children}</>
    }
  </>
);

const onCardSort = (list : Array<string>, startIndex : number, endIndex : number) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const onCardMove = (
  source : Array<string>,
  destination : Array<string>,
  droppableSource : DraggableLocation,
  droppableDestination : DraggableLocation
  ) => {

  const sourceClone = [...source];
  const destClone = [...destination];
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result : any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getListStyle = (isDraggingOver: boolean) => (
  isDraggingOver ? {
    backgroundColor: '#12a80d25',
    borderColor: 'green',
  } : {}
);

export default ({ headers, panelState, setPanelState, handleSaveDraftCard, workPlanGraphs, workPlanWrapper } : DraftPanelTypes) => {

  const [panelCosts, setPanelCosts] = useState<any>({});

  useEffect(() => {
    const headerCosts : any = {};
    Object.keys(panelState).forEach((key : string) => {
      let estimatedCosts = 0;
      panelState[key].forEach((item : ProjectTypes) => {
        estimatedCosts += item.estimatedCost as number;
      });
      headerCosts[key] = estimatedCosts;
    });
    setPanelCosts(headerCosts);
  }, [panelState]);

  const getList = (id : string) => panelState[id];

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = onCardSort(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      setPanelState({ ...panelState, [source.droppableId]: items });
    } else {
      const result = onCardMove(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      const oldState = result[source.droppableId];
      const newState = result[destination.droppableId];

      setPanelState({
        ...panelState,
        [source.droppableId]: oldState,
        [destination.droppableId]: newState
      });
    }
  }

  const handleCardDelete = (index : number, header : string) => {
    const updatedState = [...panelState[header]];
    updatedState.splice(index, 1);
    setPanelState({ ...panelState, [header]: updatedState });
  }

  const getSortableContent = (content: Array<ProjectTypes>, header: string) => (
    <>
      {content && content.length ? content.map((item: ProjectTypes, index: number) => (
        <Draggable
          key={'' + item._id}
          draggableId={'' + item._id}
          index={index} >
          {(provided, snapshot) => (
            <div
              className="card-wr"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps} >
              <h4>{item.requestName} </h4>
              <h6>{'$' + numberWithCommas(item.estimatedCost as number)}</h6>
              <p>{item.county} <label>{item.status}</label></p>
              <Dropdown overlay={cardOptions({ index, header, handleCardDelete })} className="menu-wr">
                <span className="ant-dropdown-link" style={{ cursor: 'pointer' }}>
                  <img src="/Icons/icon-60.svg" alt="" />
                </span>
              </Dropdown>
            </div>
          )}
        </Draggable>
      )): null }
    </>
  )

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {headers.drafts.map((header: string, index: number) => (
          <div key={index}>
            <WorkPlanWrapper workPlanWrapper={workPlanWrapper}>
              <div style={{ height: 44 }}>
                <h3>
                  {header.replace(/([A-Z])/g, ' $1')}
                  {(header === 'workspace' && workPlanWrapper) &&
                    <>{' '}<img src="/Icons/icon-19.svg" alt="" /></>
                  }
                </h3>
              </div>

              <Droppable droppableId={header}>
                {(provided, snapshot) => (
                  <div
                    className={snapshot.isDraggingOver ? "col-wr col-hovered" : "col-wr"}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {header === 'workspace' &&
                      <Link to='/new-project-types'>
                        <Button className="btn-create">
                          <img src="/Icons/icon-18.svg" alt="" />
                            Create Project
                          </Button>
                      </Link>
                    }

                    {getSortableContent(panelState[header], header)}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <div className="cost-wr">
                {header === 'workspace' ?
                  <Col>
                    <CostsRow><h5>TOTAL REQUESTED</h5></CostsRow>
                    <CostsRow><h5>Target Cost</h5></CostsRow>
                    <CostsRow><h5>Differential</h5></CostsRow>
                  </Col>
                  :
                  <Col>
                    <CostsRow>
                      <span>
                        ${numberWithCommas(panelCosts[header] ?  panelCosts[header] : 0)}
                      </span>
                    </CostsRow>
                    <CostsRow><Input className="input-pp" placeholder="Enter target cost" /></CostsRow>
                    <CostsRow><Input className="input-rr" placeholder="XXX Difference" /></CostsRow>
                  </Col>
                }

                {(!workPlanGraphs && header === headers.drafts[headers.drafts.length - 1]) &&
                  <Row>
                    <Button className="btn-purple" onClick={() => handleSaveDraftCard()} >
                      Submit to Admin
                  </Button>
                  </Row>
                }
              </div>
            </WorkPlanWrapper>
          </div>
        ))}
        {workPlanGraphs}
      </DragDropContext>
    </>
  )
}
