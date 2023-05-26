import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Button } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useLocation } from 'react-router-dom';
import { useAttachmentDispatch } from 'hook/attachmentHook';
import { useProjectDispatch } from 'hook/projectHook';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { useProfileState } from 'hook/profileHook';
import { filterByJurisdictionAndCsaSelected, hasPriority } from 'Components/Work/Request/RequestViewUtil';
import TrelloLikeCard from 'Components/Work/Request/TrelloLikeCard';
import WsService from 'Components/Work/Request/WsService';
import { ADMIN, STAFF } from 'constants/constants';
import ColorService from 'Components/Work/Request/ColorService';

let columDragAction = [false, 0, 0];
let fixedDragAction = [false, 0, 0];
let scrollValues: any = [0, 0, 0, 0, 0, 0];
let scrollByIds: any = [];

const ColumsTrelloCard = ({
  deleteProject,
  notIsFiltered,
  flagforScroll
}: {
  deleteProject: any;
  notIsFiltered: any;
  flagforScroll: any;
}) => {
  const location = useLocation();
  const type = location.pathname === '/work-request' ? 'WORK_REQUEST' : 'WORK_PLAN';
  const {
    columns2: columns,
    tabKey,
    locality,
    jurisdictionSelected,
    csaSelected,
    jurisdictionFilterList,
    csaFilterList,
    prioritySelected,
    year,
    namespaceId,
    boardStatus,
  } = useRequestState();
  const {
    setVisibleCreateProject,
    loadOneColumn,
    setColumns2Manual
  } = useRequestDispatch();
  const { userInformation } = useProfileState();
  const { clear } = useAttachmentDispatch();
  const { setStreamsIds, setComponentsFromMap } = useProjectDispatch();
  const divRef = useRef(null);
  let scrollValuesInit: any = [0, 0, 0, 0, 0, 0];
  const [onScrollValue, setOnScrollValue] = useState(scrollValuesInit);

  useEffect(() => {
    setTimeout(() => {
      if (document.getElementById(`column_${tabKey}_1`)) {
        scrollValues.forEach((element: any, index: any) => {
          scrollByIds[index] = document.getElementById(`column_${tabKey}_${index}`);
          scrollByIds[index].scrollTop = onScrollValue[index];
        });
      }
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (document.getElementById(`column_${tabKey}_1`)) {
        scrollValues.forEach((element: any, index: any) => {
          scrollByIds[index] = document.getElementById(`column_${tabKey}_${index}`);
          scrollByIds[index].scrollTop = onScrollValue[index];
        });
      }
    }, 1000);
  }, [flagforScroll]);

  const onClickNewProject = () => {
    clear();
    setVisibleCreateProject(true);
    setStreamsIds([]);
    setComponentsFromMap([]);
  };

  const onDropV2 = (
    originColumnPosition: number,
    targetColumnPosition: number,
    sourcePosition: number,
    targetPosition: number
  ) => {
    const board_project_id = columns[originColumnPosition].projects[sourcePosition].board_project_id;
    const originColumn = `rank${originColumnPosition}`;
    const targetColumn = `rank${targetColumnPosition}`;
    
    if (originColumn === targetColumn) {
      let previousPosition = targetPosition - 1;
      let nextPosition = targetPosition;
      if (targetPosition === sourcePosition) return;
      if (targetPosition > sourcePosition) {
        previousPosition = targetPosition;
        nextPosition = targetPosition + 1;
      }
      let _columns = JSON.parse(JSON.stringify(columns));
      const project = _columns[originColumnPosition].projects[sourcePosition];
      _columns[originColumnPosition].projects.splice(sourcePosition, 1);
      let previousCardId: any = null;
      if (previousPosition >= 0) {
        previousCardId = columns[targetColumnPosition].projects[previousPosition].board_project_id;
      }
      let nextCardId: any = null;
      if (nextPosition < columns[targetColumnPosition].projects.length) {
        nextCardId = columns[targetColumnPosition].projects[nextPosition].board_project_id;
      }
      const data = {
        board_id: namespaceId,
        board_project_id,
        originColumn,
        targetColumn,
        previousCardId,
        nextCardId
      };
      console.log('data', data);
      WsService.sendUpdate(data);
      _columns[targetColumnPosition].projects.splice(targetPosition, 0, project);
      setColumns2Manual(_columns);
      setTimeout(() => {
        loadOneColumn(namespaceId, originColumnPosition);
      }, 2000);
    } else {
      let previousPosition = targetPosition - 1;
      let nextPosition = targetPosition;
      let previousCardId: any = null;
      if (previousPosition >= 0) {
        previousCardId = columns[targetColumnPosition].projects[previousPosition].board_project_id;
      }
      let nextCardId: any = null;
      if (nextPosition < columns[targetColumnPosition].projects.length) {
        nextCardId = columns[targetColumnPosition].projects[nextPosition].board_project_id;
      }
      const data = {
        board_id: namespaceId,
        board_project_id,
        originColumn,
        targetColumn,
        previousCardId,
        nextCardId
      };
      console.log('data', data);
      WsService.sendUpdate(data);
      let _columns = JSON.parse(JSON.stringify(columns));
      _columns[targetColumnPosition].projects.splice(targetPosition, 0, _columns[originColumnPosition].projects[sourcePosition])

      _columns[originColumnPosition].projects.splice(sourcePosition, 1);
      setColumns2Manual(_columns);
      setTimeout(() => {
        loadOneColumn(namespaceId, originColumnPosition);
        loadOneColumn(namespaceId, targetColumnPosition);
      }, 2000);
    }
  }
  return <DragDropContext onDragEnd={result => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const sourceColumn = +source.droppableId;
    const destColumn = +destination.droppableId;
    const sPosition = +source.index;
    const dPosition = +destination.index;
    onDropV2(
      sourceColumn,
      destColumn,
      sPosition,
      dPosition
    );
    // onDrop(columns[sourceColumn].projects[sPosition].project_id, true, sourceColumn, sPosition, destColumn, dPosition);

    if (document.getElementById(`column_${tabKey}_1`)) {
      scrollValues.forEach((element: any, index: any) => {
        scrollValues[index] = document.getElementById(`column_${tabKey}_${index}`)?.scrollTop
        setOnScrollValue(scrollValues)
      });
    }
  }
  }>
    {columns.map((column: any, columnIdx: number) => (

      <div className="container-drag" id={`container_${tabKey}`} key={columnIdx}>
        <h3 className="title-panel">{column.title === 'Debris Management' ? 'Trash & Debris mngt' : column.title}</h3>

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
              onScroll={(e: any) => {
                if (document.getElementById('modalProjectView') === null) {
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
                .filter((p: any) => { return hasPriority(p, prioritySelected, columnIdx) })
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
                        <Fragment key={p.project_id}>
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
                                  delProject={deleteProject}
                                  namespaceId={namespaceId}
                                  project={p}
                                  columnIdx={columnIdx}
                                  rowIdx={i}
                                  tabKey={tabKey}
                                  editable={boardStatus !== 'Approved' || (userInformation.designation === ADMIN || userInformation.designation === STAFF)}
                                  filtered={!notIsFiltered}
                                  locality={locality}
                                  borderColor={ColorService.getColor(
                                    type,
                                    p,
                                    arr,
                                    columnIdx,
                                  )}
                                  divRef={divRef}
                                />
                              </div>
                            )}
                          </Draggable>
                        </Fragment>
                      );
                    } else {
                      return (
                        <Fragment key={p.project_id}>
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
                                  delProject={deleteProject}
                                  namespaceId={namespaceId}
                                  project={p}
                                  columnIdx={columnIdx}
                                  rowIdx={i}
                                  tabKey={tabKey}
                                  editable={boardStatus !== 'Approved' || (userInformation.designation === ADMIN || userInformation.designation === STAFF)}
                                  filtered={!notIsFiltered}
                                  locality={locality}
                                  borderColor={ColorService.getColor(
                                    type,
                                    p,
                                    arr,
                                    columnIdx,
                                  )}
                                  divRef={divRef}
                                />
                              </div>
                            )}
                          </Draggable>
                        </Fragment>
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
                        <Fragment key={p.project_id}>
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
                                  delProject={deleteProject}
                                  namespaceId={namespaceId}
                                  project={p}
                                  columnIdx={columnIdx}
                                  rowIdx={i}
                                  tabKey={tabKey}
                                  editable={boardStatus !== 'Approved' || (userInformation.designation === ADMIN || userInformation.designation === STAFF)}
                                  filtered={!notIsFiltered}
                                  locality={locality}
                                  borderColor={ColorService.getColor(
                                    type,
                                    p,
                                    arr,
                                    columnIdx,
                                  )}
                                  divRef={divRef}
                                />
                              </div>
                            )}
                          </Draggable>
                        </Fragment>
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
