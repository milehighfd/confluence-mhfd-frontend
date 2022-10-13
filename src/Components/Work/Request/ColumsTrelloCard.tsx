import { Button } from 'antd';
import { useAttachmentDispatch } from 'hook/attachmentHook';
import { useProjectDispatch } from 'hook/projectHook';
import React, { useState, useEffect, useRef } from 'react';
import { filterByJurisdictionAndCsaSelected, hasPriority, onDropFn } from './RequestViewUtil';
import TrelloLikeCard from './TrelloLikeCard';
import WsService from './WsService';

let columDragAction = [false, 0, 0];
const ColumsTrelloCard = (
  {
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
}:{
  columns:any,
  setColumns:any,
  tabKey:any,
  locality:any,
  setVisibleCreateProject:any,
  jurisdictionSelected:any,
  csaSelected:any,
  jurisdictionFilterList:any,
  csaFilterList:any,
  prioritySelected:any,
  year:any,
  type:any,
  setLoading:any,
  deleteProject:any,
  namespaceId:any,
  saveData:any,
  boardStatus:any,
  notIsFiltered:any,
  ColorService:any
}) => {
  const [dragAction, setDragAction] = useState([false, 0, 0]);
  const {clear} = useAttachmentDispatch();
  const {setBoardProjects, setZoomProject, setStreamsIds, setComponentsFromMap, setStreamIntersected, setComponentIntersected} = useProjectDispatch();
  const [sizeCard, setSizeCard] = useState([0,0])
  const divRef = useRef(null);
  const onDrop = (e: any, columnIdx: number) => {
    let txt = e.dataTransfer.getData("text");
    let cols = onDropFn(txt, columns, columnIdx, tabKey);
    if (cols) {
      WsService.sendUpdate(cols);
      setColumns(cols);
    }
  }
  const onClickNewProject = () => {
    if (locality === 'MHFD District Work Plan') return;
    clear();
    setVisibleCreateProject(true);
    setStreamsIds([]);
    setComponentsFromMap([]);
  }
  const onDragOver = (e: any) => {
    e.preventDefault();
  }
  return (
    columns.map((column:any, columnIdx:number) => (
      <div className="container-drag" key={columnIdx+Math.random()}>
        <h3 className="title-panel">{column.title == 'Debris Management' ? 'Trash & Debris mngt' : column.title}</h3>
        <div
          className={column.hasCreateOption ? "col-wr droppable colum-hascreate":"col-wr droppable"}
          style={dragAction[0] && columnIdx === Math.trunc(Number(dragAction[1])) ? {backgroundColor:'#f2f4ff'} : {}}
          onDragOver={onDragOver}
          onDrop={(e: any) => {onDrop(e, columnIdx); setDragAction([false, 0, 0]);}}
          onDragLeaveCapture={(e) => {
            let dr: any = divRef.current;
            let bounds = dr.getBoundingClientRect();
            setSizeCard([bounds.height, bounds.width])
            if((e.clientX/bounds.width)-3 >= 0 && (e.clientY/bounds.height)-2 >= 0){
              setDragAction([true, (e.clientX/bounds.width)-4,  (e.clientY/bounds.height)-3]);
            }
          }}
        >
          {
            column.hasCreateOption &&
            <Button className="btn-transparent button-createProject " onClick={onClickNewProject} >
              {locality === 'MHFD District Work Plan' ? <img src="/Icons/icon-18-gray.svg" style={{marginBottom:'2px'}} alt=""/>: <img src="/Icons/icon-18.svg" style={{marginBottom:'2px'}} alt=""/>}
              Create Project
            </Button>
          }
          {column.projects
            .filter((p: any) => filterByJurisdictionAndCsaSelected(jurisdictionSelected, csaSelected, jurisdictionFilterList, csaFilterList, p))
            .filter((p: any) => hasPriority(p, prioritySelected, columnIdx))
            .map((p: any, i: number, arr: any[]) => {
              columDragAction = dragAction;
              const valuePosition: number = Number(columDragAction[2]);
              const valuePositionx: number = Number(columDragAction[1]);
              if(i === Math.trunc(valuePosition) && columDragAction[0] && columnIdx === Math.trunc(valuePositionx) && columns[1].title !== "Debris Management" ){
                return(
                  <>
                  <div style={{backgroundColor:'#d6d8e0', opacity:'0.5', width:'100%', height:`${sizeCard[0]}px`, marginBottom:'10px', borderRadius:'5px'}}><br></br></div>
                  <TrelloLikeCard key={i}
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
                    editable={boardStatus !== 'Approved'}
                    filtered={!notIsFiltered}
                    locality={locality}
                    borderColor={ColorService.getColor(type, p, arr, year, columnIdx, boardStatus !== 'Approved')}
                    divRef={divRef}
                  /></>
                )
              }
              else {
                return(
                  <TrelloLikeCard key={i}
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
                    editable={boardStatus !== 'Approved'}
                    filtered={!notIsFiltered}
                    locality={locality}
                    borderColor={ColorService.getColor(type, p, arr, year, columnIdx, boardStatus !== 'Approved')}
                    divRef={divRef}
                  />
                )
              }
              })
          }
          {Math.trunc(Number(columDragAction[2])) >= column.projects.length  && columnIdx === Math.trunc(Number(columDragAction[1])) && columDragAction[0] && columns[1].title !== "Debris Management" &&(
            <div style={{backgroundColor:'#d6d8e0', opacity:'0.5', width:'100%', height:`${sizeCard[0]}px`, marginBottom:'10px', borderRadius:'5px'}}><br></br></div>
          )}
        </div>
      </div>
    ))
  )
}
export default ColumsTrelloCard