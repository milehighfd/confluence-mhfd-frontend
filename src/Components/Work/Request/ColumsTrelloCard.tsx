import { Button } from 'antd';
import { useAttachmentDispatch } from 'hook/attachmentHook';
import { useProjectDispatch } from 'hook/projectHook';
import React, { useState, useEffect, useRef } from 'react';
import { filterByJurisdictionAndCsaSelected, hasPriority, onDropFn, onDropFunction } from './RequestViewUtil';
import TrelloLikeCard from './TrelloLikeCard';
import WsService from './WsService';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ADMIN, STAFF } from 'constants/constants';

let columDragAction = [false, 0, 0];
let fixedDragAction = [false, 0, 0];
let stop = 0;
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
  const [dragAction, setDragAction] = useState([false, 0, 0]);
  const [dragStart, setDragstart] = useState([0, 0]);
  const { clear } = useAttachmentDispatch();
  const {
    setBoardProjects,
    setZoomProject,
    setStreamsIds,
    setComponentsFromMap,
    setStreamIntersected,
    setComponentIntersected,
  } = useProjectDispatch();
  const [sizeCard, setSizeCard] = useState([0, 0]);
  const divRef = useRef(null);
  const columRef = useRef<null | HTMLDivElement>(null);
  const [onScrollValue, setOnScrollValue] = useState([]);
  var windowWidth = window.innerWidth;
  // const onDrop = (txt: any, columnIdx: number,state:boolean, destColumn:any, destPosition:any) => {
  //   console.log('cols before drop', columns);
  //   let cols = onDropFn(txt, columns, columnIdx, tabKey, state, destColumn, destPosition, saveData);
  //   onDropFunction(txt.id, columns, tabKey, state, );
  //   console.log('Cols After Drop', cols);
  //   if (cols) {
  //     WsService.sendUpdate(cols);
  //     setColumns(cols);
  //   }
  // };

  useEffect(() => {
    setTimeout(() => {
      if( document.getElementById(`column_1`)){
        scrollValues.forEach((element:any, index:any ) => {
          console.log('indexxx', element,index)
          scrollByIds[index] = document.getElementById(`column_${index}`);
          console.log('valor scroll',index, onScrollValue[index])
          scrollByIds[index].scrollTop = onScrollValue[index];
          console.log('entra aqui')
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

  // if( document.getElementById(`column_1`)){
  //   scrollValues.forEach((element:any, index:any ) => {
  //     console.log('indexxx', element,index)
  //     scrollByIds[index] = document.getElementById(`column_${index}`);
  //     console.log('valor scroll',index, onScrollValue[index])
  //     scrollByIds[index].scrollTop = onScrollValue[index];
  //     console.log('entra aqui')
  //   });
  // }

  const onDrop = (projectid: number, state: boolean, sourceColumn: number, sourcePosition: number, destColumn: number, destPosition: number) => {
    let cols = onDropFunction(projectid, columns, tabKey, state, sourceColumn, sourcePosition, destColumn, destPosition, saveData);
    if(cols) {
      WsService.sendUpdate(cols);
      setColumns(cols);
    }
  }
  const onClickNewProject = () => {
    // if (locality === 'MHFD District Work Plan') return;
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
      // if (sInd === dInd){
      //   return;
      // }
      const sPosition = +source.index;
      const dPosition = +destination.index;
      const txt = {
        fromColumnIdx: sourceColumn,
        id: columns[sourceColumn].projects[sPosition].project_id
      };
      // setDragAction([true, dInd, dPos]);
      // fixedDragAction=[true, dInd, dPos];
      // onDrop(txt, sInd,true, dInd, dPos);
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
                  scrollValues[columnIdx] = e.currentTarget?.scrollTop
                  setOnScrollValue(scrollValues)
                }}
              // onDragOver={onDragOver}
              // ref={columRef}
              // onDrop={(e: any) => {console.log(column);onDrop(e, columnIdx); setDragAction([false, 0, 0]);}}
              // onScrollCapture={(e:any)=>{
              //   setTimeout(() => {
              //     columRef.current?.scrollTo(0,0);
              //     e.target.scrollTo(0,0);
              //   }, 5000);
              // }}
              // onDragEnterCapture={(e) => {
              //   if (stop<=1){
              //     let dr: any = divRef.current;
              //     let bounds = dr.getBoundingClientRect();
              //     setSizeCard([bounds.height, bounds.width])
              //     let size= 100;
              //     let sizeCard= 70;
              //     if(windowWidth >= 1900 ){
              //       size=75;
              //       sizeCard=0;
              //     }
              //     if(windowWidth >= 2500 ){
              //       size=80;
              //       sizeCard=0;
              //     }
              //     if(columnIdx !==0 ){
              //       if((e.clientX/bounds.width)-3 >= 0 && ((e.clientY-sizeCard)/bounds.height)-2 >= 0){
              //         setDragAction([true, columnIdx,  ((e.clientY-sizeCard)/bounds.height)-3]);
              //       }
              //     }else{
              //       if((e.clientX/bounds.width)-3 >= 0 && ((e.clientY-size)/bounds.height)-2 >= 0){
              //         setDragAction([true, columnIdx,  ((e.clientY-size)/bounds.height)-3]);
              //       }
              //     }
              //     stop++;
              //   }
              //   e.preventDefault()
              //   e.stopPropagation()
              // }}
              // onDrag={(e) => {
              //   let dr: any = divRef.current;
              //   let bounds = dr.getBoundingClientRect();
              //   let size= 100;
              //   let sizeCard= 70;
              //   if(windowWidth >= 1900 ){
              //     size=75;
              //     sizeCard=0;
              //   }
              //   if(windowWidth >= 2500 ){
              //     size=80;
              //     sizeCard=0;
              //   }
              //   if(columnIdx !== 0){
              //     if((e.clientX/bounds.width)-3 >= 0 && ((e.clientY-sizeCard)/bounds.height)-2 >= 0){
              //       setDragstart([columnIdx,  ((e.clientY-sizeCard)/bounds.height)-2]);
              //     }
              //   }else{
              //     if(columnIdx >= 0 && ((e.clientY - size)/bounds.height)-2 >= 0){
              //       setDragstart([columnIdx,  ((e.clientY - size)/bounds.height)-2]);
              //     }
              //   }
              // }}
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
                      i === Math.trunc(Number(dragStart[1])) &&
                      columnIdx === Math.trunc(Number(dragStart[0])) &&
                      fixedDragAction[0]
                    ) {
                      return (
                        <>
                          <div
                            style={{
                              backgroundColor: '#ffff00',
                              opacity: '0.5',
                              width: '100%',
                              height: `${sizeCard[0]}px`,
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
                              height: `${sizeCard[0]}px`,
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
                      i === Math.trunc(Number(dragStart[1])) &&
                      columnIdx === Math.trunc(Number(dragStart[0])) &&
                      fixedDragAction[0]
                    ) {
                      // return(
                      //   <>
                      //   <div style={{backgroundColor:'#d6d8e0', opacity:'0.5', width:'100%', height:`${sizeCard[0]}px`, marginBottom:'10px', borderRadius:'5px'}}><br></br></div>
                      //   </>
                      // )
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
                      height: `${sizeCard[0]}px`,
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
