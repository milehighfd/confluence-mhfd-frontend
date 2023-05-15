import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAttachmentDispatch } from 'hook/attachmentHook';
import { useProjectDispatch } from 'hook/projectHook';
import { filterByJurisdictionAndCsaSelected, hasPriority, onDropFunction } from './RequestViewUtil';
import TrelloLikeCard from './TrelloLikeCard';
import WsService from './WsService';
import { ADMIN, STAFF } from 'constants/constants';

let columDragAction = [false, 0, 0];
let fixedDragAction = [false, 0, 0];
let scrollValues:any= [0,0,0,0,0,0];
let scrollByIds:any = [];

const ColumsTrelloCard = ({
  columns,
  setColumns,
  tabKey,
  locality,
  setVisibleCreateProject,
  jurisdictionSelected,
  csaSelected,
  jurisdictionFilterList,
  csaFilterList,
  prioritySelected,
  year,
  type,
  setLoading,
  deleteProject,
  namespaceId,
  saveData,
  boardStatus,
  notIsFiltered,
  ColorService,
  userDesignation,
  flagforScroll
}: {
  columns: any;
  setColumns: any;
  tabKey: any;
  locality: any;
  setVisibleCreateProject: any;
  jurisdictionSelected: any;
  csaSelected: any;
  jurisdictionFilterList: any;
  csaFilterList: any;
  prioritySelected: any;
  year: any;
  type: any;
  setLoading: any;
  deleteProject: any;
  namespaceId: any;
  saveData: any;
  boardStatus: any;
  notIsFiltered: any;
  ColorService: any;
  userDesignation: any;
  flagforScroll: any;
}) => {
  const { clear } = useAttachmentDispatch();
  const { setStreamsIds, setComponentsFromMap } = useProjectDispatch();
  const divRef = useRef(null);
  let scrollValuesInit:any= [0,0,0,0,0,0];
  const [onScrollValue, setOnScrollValue] = useState(scrollValuesInit);

  useEffect(() => {
    setTimeout(() => {
      if( document.getElementById(`column_${tabKey}_1`)){
        scrollValues.forEach((element:any, index:any ) => {
          scrollByIds[index] = document.getElementById(`column_${tabKey}_${index}`);
          scrollByIds[index].scrollTop = onScrollValue[index];
        });
      }
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if( document.getElementById(`column_${tabKey}_1`)){
        scrollValues.forEach((element:any, index:any ) => {
          scrollByIds[index] = document.getElementById(`column_${tabKey}_${index}`);
          scrollByIds[index].scrollTop = onScrollValue[index];
        });
      }
    }, 1000);
  }, [flagforScroll]);

  const onDrop = (projectid: number, state: boolean, sourceColumn: number, sourcePosition: number, destColumn: number, destPosition: number) => {
    let cols = onDropFunction(projectid, columns, tabKey, state, sourceColumn, sourcePosition, destColumn, destPosition, saveData);
    if(cols) {
      WsService.sendUpdate(cols);
      setColumns(cols);
    }
  }

  const onClickNewProject = () => {
    clear();
    setVisibleCreateProject(true);
    setStreamsIds([]);
    setComponentsFromMap([]);
  };

  return <DragDropContext onDragEnd={result => 
    {
      const { source, destination } = result;
      if (!destination){
        return;
      }
      const sourceColumn = +source.droppableId;
      const destColumn = +destination.droppableId;
      const sPosition = +source.index;
      const dPosition = +destination.index;

      onDrop(columns[sourceColumn].projects[sPosition].project_id, true, sourceColumn, sPosition, destColumn, dPosition);

      if( document.getElementById(`column_${tabKey}_1`)){
        scrollValues.forEach((element:any, index:any ) => {
          scrollValues[index] = document.getElementById(`column_${tabKey}_${index}`)?.scrollTop
          setOnScrollValue(scrollValues)
        });
      }
    }
    }>
      {columns.map((column: any, columnIdx: number) => (
    
    <div className="container-drag" id={`container_${tabKey}`} key={columnIdx + Math.random()}>
      <h3 className="title-panel">{column.title == 'Debris Management' ? 'Trash & Debris mngt' : column.title}</h3>
      
        <Droppable droppableId={`${columnIdx}`}>
          {droppableProvided => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              id={`column_${tabKey}_${columnIdx}`}
              className={column.hasCreateOption ? 'col-wr droppable colum-hascreate' : 'col-wr droppable'}
              style={
                fixedDragAction[0] && columnIdx === Math.trunc(Number(fixedDragAction[1])) ? { backgroundColor: '#f2f4ff' } : {}
              }
              onScroll={(e:any)=>{
                  if(document.getElementById('modalProjectView')===null){
                    scrollValues[columnIdx] = e.currentTarget?.scrollTop
                    setOnScrollValue(scrollValues)
                  }       
                  e.preventDefault()
                  e.stopPropagation()
                }}
            >
              {column.hasCreateOption && (
                <Button className="btn-transparent button-createProject " onClick={onClickNewProject}>
                  {<img src="/Icons/icon-18.svg" style={{ marginBottom: '2px' }} alt="" />}
                  Create Project
                </Button>
              )}
              {column.projects
                .filter((p: any) =>
                  filterByJurisdictionAndCsaSelected(
                    jurisdictionSelected,
                    csaSelected,
                    jurisdictionFilterList,
                    csaFilterList,
                    p,
                  ),
                )
                .filter((p: any) => { return hasPriority(p, prioritySelected, columnIdx)})
                .map((p: any, i: number, arr: any[]) => {
                  columDragAction = fixedDragAction;
                  const valuePosition: number = Number(columDragAction[2]);
                  const valuePositionx: number = Number(columDragAction[1]);
                  if (
                    i === Math.trunc(valuePosition) &&
                    columDragAction[0] &&
                    columnIdx === Math.trunc(valuePositionx) &&
                    columns[1].title !== 'Debris Management'
                  ) {
                    if (
                      i === 0 &&
                      columnIdx === 0 &&
                      fixedDragAction[0]
                    ) {
                      return (
                        <>
                          <div
                            style={{
                              backgroundColor: '#ffff00',
                              opacity: '0.5',
                              width: '100%',
                              height: `0px`,
                              marginBottom: '10px',
                              borderRadius: '5px',
                            }}
                          >
                            <br></br>
                          </div>
                          <Draggable key={i} draggableId={`${columnIdx}_${i}`} index={i}>
                            {draggableProvided => (
                              <div
                                {...draggableProvided.draggableProps}
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.dragHandleProps}
                              >
                                <TrelloLikeCard
                                  key={i}
                                  year={year}
                                  type={type}
                                  setLoading={setLoading}
                                  delProject={deleteProject}
                                  namespaceId={namespaceId}
                                  project={p}
                                  columnIdx={columnIdx}
                                  rowIdx={i}
                                  saveData={saveData}
                                  tabKey={tabKey}
                                  editable={boardStatus !== 'Approved' || (userDesignation === ADMIN || userDesignation === STAFF)}
                                  filtered={!notIsFiltered}
                                  locality={locality}
                                  borderColor={ColorService.getColor(
                                    type,
                                    p,
                                    arr,
                                    year,
                                    columnIdx,
                                    boardStatus !== 'Approved',
                                  )}
                                  divRef={divRef}
                                />
                              </div>
                            )}
                          </Draggable>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <div
                            style={{
                              backgroundColor: '#d6d8e0',
                              opacity: '0.5',
                              width: '100%',
                              height: `0px`,
                              marginBottom: '10px',
                              borderRadius: '5px',
                            }}
                          >
                            <br></br>
                          </div>
                          <Draggable key={i} draggableId={`${columnIdx}_${i}`} index={i}>
                            {draggableProvided => (
                              <div
                                {...draggableProvided.draggableProps}
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.dragHandleProps}
                              >
                                <TrelloLikeCard
                                  key={i}
                                  year={year}
                                  type={type}
                                  setLoading={setLoading}
                                  delProject={deleteProject}
                                  namespaceId={namespaceId}
                                  project={p}
                                  columnIdx={columnIdx}
                                  rowIdx={i}
                                  saveData={saveData}
                                  tabKey={tabKey}
                                  editable={boardStatus !== 'Approved' || (userDesignation === ADMIN || userDesignation === STAFF)}
                                  filtered={!notIsFiltered}
                                  locality={locality}
                                  borderColor={ColorService.getColor(
                                    type,
                                    p,
                                    arr,
                                    year,
                                    columnIdx,
                                    boardStatus !== 'Approved',
                                  )}
                                  divRef={divRef}
                                />
                              </div>
                            )}
                          </Draggable>
                        </>
                      );
                    }
                  } else {
                    if (
                      i === 0 &&
                      columnIdx === 0 &&
                      fixedDragAction[0]
                    ) {
                    } else {
                      return (
                        <>
                          <Draggable key={i} draggableId={`${columnIdx}_${i}`} index={i}>
                            {draggableProvided => (
                              <div
                                {...draggableProvided.draggableProps}
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.dragHandleProps}
                              >
                                <TrelloLikeCard
                                  key={i}
                                  year={year}
                                  type={type}
                                  setLoading={setLoading}
                                  delProject={deleteProject}
                                  namespaceId={namespaceId}
                                  project={p}
                                  columnIdx={columnIdx}
                                  rowIdx={i}
                                  saveData={saveData}
                                  tabKey={tabKey}
                                  editable={boardStatus !== 'Approved' || (userDesignation === ADMIN || userDesignation === STAFF)}
                                  filtered={!notIsFiltered}
                                  locality={locality}
                                  borderColor={ColorService.getColor(
                                    type,
                                    p,
                                    arr,
                                    year,
                                    columnIdx,
                                    boardStatus !== 'Approved',
                                  )}
                                  divRef={divRef}
                                />
                              </div>
                            )}
                          </Draggable>
                        </>
                      );
                    }
                  }
                })}
              {Math.trunc(Number(columDragAction[2])) >= column.projects.length &&
                columnIdx === Math.trunc(Number(columDragAction[1])) &&
                columDragAction[0] &&
                columns[1].title !== 'Debris Management' && (
                  <div
                    style={{
                      backgroundColor: '#d6d8e0',
                      opacity: '0.5',
                      width: '100%',
                      height: `0px`,
                      marginBottom: '10px',
                      borderRadius: '5px',
                    }}
                  >
                    <br></br>
                  </div>
                )}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
    </div>
  ))}
  </DragDropContext>
};
export default ColumsTrelloCard;
