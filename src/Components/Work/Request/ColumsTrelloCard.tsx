import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Button } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAttachmentDispatch } from 'hook/attachmentHook';
import { useProjectDispatch, useProjectState } from 'hook/projectHook';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { useProfileState } from 'hook/profileHook';
import TrelloLikeCard from 'Components/Work/Request/TrelloLikeCard';
import { ADMIN, BOARD_STATUS_TYPES, STAFF, WORK_PLAN, WORK_REQUEST, YEAR_LOGIC_2024 } from 'constants/constants';
import ColorService from 'Components/Work/Request/ColorService';
import useFakeLoadingHook from 'hook/custom/useFakeLoadingHook';
import { SPONSOR_ID } from 'constants/databaseConstants';

let columDragAction = [false, 0, 0];
let fixedDragAction = [false, 0, 0];
let scrollValues: any = [0, 0, 0, 0, 0, 0];
let scrollByIds: any = [];

const ColumsTrelloCard = ({
  flagforScroll,
  type,
  selectView
}: {
  flagforScroll: any
  type: string,
  selectView: string
}) => {
  const { columns2: columns, tabKey, locality, year, namespaceId, boardStatus, loadingColumns, filterRequest } = useRequestState();
  const { 
    moveProjectsManual, 
    handleMoveFromColumnToColumn, 
    setVisibleCreateOrImport,
    setVisibleCreateProject
  } = useRequestDispatch();
  const { userInformation } = useProfileState();
  const { clear } = useAttachmentDispatch();
  const { setStreamsIds, setComponentsFromMap, setGlobalSearch, sendProjectToBoardYear } = useProjectDispatch();
  const {
    globalProjectData, 
    globalSearch,
  } = useProjectState();
  const cardRefs = useRef<HTMLDivElement[][]>([]);
  let scrollValuesInit: any = [0, 0, 0, 0, 0, 0];
  const [onScrollValue, setOnScrollValue] = useState(scrollValuesInit);

  useEffect(() => {
    if (!globalSearch) {
    setTimeout(() => {
      if (document.getElementById(`column_${tabKey}_1`)) {
        scrollValues.forEach((element: any, index: any) => {
          scrollByIds[index] = document.getElementById(`column_${tabKey}_${index}`);
          scrollByIds[index].scrollTop = onScrollValue[index];
        });
      }
    }, 1000);
    }
  }, [flagforScroll]);

  const onClickNewProject = () => {
    clear();
    //setVisibleCreateProject(true);   
    setVisibleCreateOrImport(true);
    setStreamsIds([]);
    setComponentsFromMap([]);
  };
  const fakeLoading = useFakeLoadingHook(tabKey);
  useEffect(() => {
    const nameSpaceLocality = namespaceId.locality === 'MHFD District Work Plan' ? 'Mile High Flood District' : namespaceId.locality;
    if (globalSearch && globalProjectData.project_id  && nameSpaceLocality === globalProjectData.locality && !fakeLoading && !loadingColumns && selectView === 'card') {
      scrollTo(globalProjectData.project_id);
    }
  }, [globalProjectData, loadingColumns, namespaceId, fakeLoading, selectView]);
  
  const scrollTo = (globalProjectId: any) => {
    const results = columns.map((x: any, index: number) => {
      const row = x.projects.findIndex((y: any) => y.project_id === globalProjectId);
      return { column: index, index: row };
    });
  
    if (results.every((x: any) => x.index === -1)) {
      setGlobalSearch(false);
      return;
    }
    results.forEach((x: any, index: number) => {
      if (x.index !== -1) {
        cardRefs.current[x.column][x.index]?.scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
        });        
      }
    });
    setGlobalSearch(false);
  };
  const getColumnProjectType = (code_project_type_id: number) => {
    switch (code_project_type_id) {
      case 8: // Routine trash
        return 1;
      case 11: // Vegetation Management
        return 2;
      case 9: // Sediment Removal
        return 3; 
      case 10: // General Maintenance
      case 17: // Minor Repairs
        return 4;
      case 7:  // Restoration
        return 5;
      default:
        return 0;
    }
  };
  const isFilterApplied = () => {
    // check if filterRequest has any selected value with true 
    let filterApplied = false;
    for (const key in filterRequest) {
      if (filterRequest[key].selected) {
        filterApplied = true;
        break;
      }
    }
    return filterApplied;
  }
  const onDropV2 = (
    originColumnPosition: number,
    targetColumnPosition: number,
    sourcePosition: number,
    targetPosition: number,
  ) => {
    if (isFilterApplied()) {
      return;
    }
    const projectId = columns[originColumnPosition].projects[sourcePosition]?.projectData?.project_id;
    const projectData = columns[originColumnPosition].projects[sourcePosition]?.projectData;
    let projectExistOutsideGivenColumn = false;
    const doesProjectExistOutsideGivenColumn = (projectId:number, columns:any, excludedColumnPosition:number) => {
      for (let i = 0; i < columns.length; i++) {
        if (i !== excludedColumnPosition && columns[i].title !== "Workspace") {
          for (const project of columns[i].projects) {
            if (project.project_id === projectId) {
              return true;
            }
          }
        }
      }
      return false;
    };
    if (doesProjectExistOutsideGivenColumn(projectId, columns, originColumnPosition) && targetColumnPosition === 0) {
      projectExistOutsideGivenColumn = true;
    }
    let moveMaintenance = false;
    if (tabKey === 'Maintenance') {
      const currentSubType =
        columns[originColumnPosition].projects[sourcePosition]?.projectData?.code_project_type?.code_project_type_id;
      const posibleTargetColumn = getColumnProjectType(currentSubType);
      if (
        (originColumnPosition === 0 &&
          (targetColumnPosition === originColumnPosition || targetColumnPosition === posibleTargetColumn)) || // from 0 to subtype column
        targetColumnPosition === 0 || targetColumnPosition === originColumnPosition // from subtype to subtype or 0
      ) {
        moveMaintenance = true;
      }
    }
    const isNotApprovedWR = boardStatus !== BOARD_STATUS_TYPES.APPROVED && namespaceId.type === WORK_REQUEST;
    if ((tabKey !== 'Maintenance' || moveMaintenance) 
      && !projectExistOutsideGivenColumn
      && (isNotApprovedWR || namespaceId.type === WORK_PLAN)
    ) {
      if (originColumnPosition === targetColumnPosition) {
        moveProjectsManual({
          originColumnPosition,
          targetColumnPosition,
          sourcePosition,
          targetPosition,
          isWorkPlan: namespaceId.type === WORK_PLAN,
          projectData
        });
      } else {
        handleMoveFromColumnToColumn({
          originColumnPosition,
          targetColumnPosition,
          sourcePosition,
          targetPosition,
          isWorkPlan: namespaceId.type === WORK_PLAN,
          projectData
        });
        if (namespaceId.type === WORK_PLAN 
          && boardStatus === 'Approved' && 
          namespaceId.year >= YEAR_LOGIC_2024          
        ){
        //   const dataOutsideColumn = (projectId: number, columns: any, excludedColumnPosition: number) => {
        //     const foundProjects = [];
        //     for (let i = 0; i < columns.length; i++) {
        //       if (i !== excludedColumnPosition && columns[i].title !== "Workspace") {
        //         for (const project of columns[i].projects) {
        //           if (project.project_id === projectId) {
        //             foundProjects.push(project);
        //           }
        //         }
        //       }
        //     }
        //     return foundProjects.length > 0 ? foundProjects : [];
        //   };
        //   const dataInColumn = columns[originColumnPosition].projects[sourcePosition];
        //   const projectsOutsideColumn = dataOutsideColumn(projectId, columns, originColumnPosition);
        //   const ranksAndReqs = projectsOutsideColumn.reduce((acc: any, obj: any) => {
        //     const ranks: any = {};
        //     for (let i = 0; i <= 5; i++) {
        //       const rank = obj[`rank${i}`];
        //       const req = obj[`req${i}`];
        //       if (rank !== undefined && req !== undefined) {
        //         ranks[`rank${i}`] = rank;
        //         ranks[`req${i}`] = req;
        //       }
        //     }
        //     acc.push(ranks);
        //     return acc;
        //   }, []);
        //   const currentYear = +namespaceId.year;
        //   let targetRank: number | null = null;
        //   for (let i = 1; i <= 5; i++) {
        //     if (dataInColumn[`rank${i}`] !== undefined) {
        //       targetRank = i;
        //       break;
        //     }
        //   }
        //   const years: number[] = [];
        //   const extraAmounts: number[] = [];
        //   ranksAndReqs.forEach((obj: any) => {
        //     for (let i = 1; i <= 5; i++) {
        //       if (obj[`rank${i}`] !== undefined && obj[`req${i}`] !== undefined) {
        //         years.push(currentYear + i - 1);
        //         if (i === targetColumnPosition) {
        //           extraAmounts.push(dataInColumn[`req${targetRank}`] + obj[`req${i}`]);
        //         } else {
        //           extraAmounts.push(obj[`req${i}`]);
        //         }
        //       }
        //     }
        //   });
        //   const sponsor = (columns[originColumnPosition].projects[sourcePosition].projectData?.project_partners.find((x: any) => x.code_partner_type_id === SPONSOR_ID)?.business_associate?.business_name)   
        //   sendProjectToBoardYear(
        //     columns[originColumnPosition].projects[sourcePosition]?.projectData?.project_id,
        //     namespaceId.year,
        //     years,
        //     sponsor,
        //     namespaceId.projecttype,
        //     extraAmounts,
        //     ''
        //   );
        }        
      }
    }
  };

  return (
    <DragDropContext
      onDragEnd={result => {
        const { source, destination } = result;
        if (!destination) {
          return;
        }
        if (boardStatus === BOARD_STATUS_TYPES.APPROVED && (userInformation.designation !== ADMIN && userInformation.designation !== STAFF)){
          return;
        }
        const sourceColumn = +source.droppableId;
        const destColumn = +destination.droppableId;
        const sPosition = +source.index;
        const dPosition = +destination.index;
        onDropV2(sourceColumn, destColumn, sPosition, dPosition);

        if (document.getElementById(`column_${tabKey}_1`)) {
          scrollValues.forEach((_: any, index: any) => {
            scrollValues[index] = document.getElementById(`column_${tabKey}_${index}`)?.scrollTop;
            setOnScrollValue(scrollValues);
          });
        }
      }}
    >      
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
                  fixedDragAction[0] && columnIdx === Math.trunc(Number(fixedDragAction[1]))
                    ? { backgroundColor: '#f2f4ff' }
                    : {}
                }
                onScroll={(e: any) => {
                  if (document.getElementById('modalProjectView') === null) {
                    scrollValues[columnIdx] = e.currentTarget?.scrollTop;
                    setOnScrollValue(scrollValues);
                  }
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                {column.hasCreateOption && (
                  <Button className="btn-transparent button-createProject " onClick={onClickNewProject}>
                    {<img src="/Icons/icon-18.svg" style={{ marginBottom: '2px' }} alt="" />}
                    Create Project
                  </Button>
                )}
                {column.projects.map((p: any, i: number, arr: any[]) => {
                  if (!cardRefs.current[columnIdx]) {
                    cardRefs.current[columnIdx] = [];
                  }
                  columDragAction = fixedDragAction;
                  const valuePosition: number = Number(columDragAction[2]);
                  const valuePositionx: number = Number(columDragAction[1]);
                  if (
                    i === Math.trunc(valuePosition) &&
                    columDragAction[0] &&
                    columnIdx === Math.trunc(valuePositionx) &&
                    columns[1].title !== 'Debris Management'
                  ) {
                    if (i === 0 && columnIdx === 0 && fixedDragAction[0]) {
                      return (
                        <Fragment key={`${p.project_id}_${i}`}>
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
                                  type={type === 'WORK_REQUEST' ? 'WORK_REQUEST' : 'WORK_PLAN'}
                                  namespaceId={namespaceId}
                                  project={p}
                                  columnIdx={columnIdx}
                                  rowIdx={i}
                                  tabKey={tabKey}
                                  editable={
                                    boardStatus !== 'Approved' ||
                                    userInformation.designation === ADMIN || userInformation.designation === STAFF
                                  }
                                  locality={locality}
                                  borderColor={ColorService.getColor(type === 'WORK_REQUEST' ? 'WORK_REQUEST' : 'WORK_PLAN', p, arr, columnIdx)}
                                  divRef={(el:any) => { cardRefs.current[columnIdx][i] = el; }}
                                  cardRefs={cardRefs}
                                />
                              </div>
                            )}
                          </Draggable>
                        </Fragment>
                      );
                    } else {
                      return (
                        <Fragment key={`${p.project_id}_${i}`}>
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
                                  type={type === 'WORK_REQUEST' ? 'WORK_REQUEST': 'WORK_PLAN'}
                                  namespaceId={namespaceId}
                                  project={p}
                                  columnIdx={columnIdx}
                                  rowIdx={i}
                                  tabKey={tabKey}
                                  editable={
                                    boardStatus !== 'Approved' ||
                                    userInformation.designation === ADMIN || userInformation.designation === STAFF
                                  }
                                  locality={locality}
                                  borderColor={ColorService.getColor(type === 'WORK_REQUEST' ? 'WORK_REQUEST': 'WORK_PLAN', p, arr, columnIdx)}
                                  divRef={(el:any) => { cardRefs.current[columnIdx][i] = el; }}
                                />
                              </div>
                            )}
                          </Draggable>
                        </Fragment>
                      );
                    }
                  } else {
                    if (i === 0 && columnIdx === 0 && fixedDragAction[0]) {
                    } else {
                      return (
                        <Fragment key={`${p.project_id}_${i}`}>
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
                                  type={type === 'WORK_REQUEST' ? 'WORK_REQUEST': 'WORK_PLAN'}
                                  namespaceId={namespaceId}
                                  project={p}
                                  columnIdx={columnIdx}
                                  rowIdx={i}
                                  tabKey={tabKey}
                                  editable={
                                    boardStatus !== 'Approved' ||
                                    userInformation.designation === ADMIN || userInformation.designation === STAFF
                                  }
                                  locality={locality}
                                  borderColor={ColorService.getColor(type === 'WORK_REQUEST' ? 'WORK_REQUEST': 'WORK_PLAN', p, arr, columnIdx)}
                                  divRef={(el:any) => { cardRefs.current[columnIdx][i] = el; }}
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
  );
};

export default ColumsTrelloCard;
