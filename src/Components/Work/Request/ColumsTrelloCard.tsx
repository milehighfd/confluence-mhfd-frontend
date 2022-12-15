import { Button } from 'antd';
import { useAttachmentDispatch } from 'hook/attachmentHook';
import { useProjectDispatch } from 'hook/projectHook';
import React, { useState, useEffect, useRef } from 'react';
import { filterByJurisdictionAndCsaSelected, hasPriority, onDropFn } from './RequestViewUtil';
import TrelloLikeCard from './TrelloLikeCard';
import WsService from './WsService';

let columDragAction = [false, 0, 0];
let stop = 0;
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
  ColorService:any,
}) => {
  const [dragAction, setDragAction] = useState([false, 0, 0]);
  const [dragStart, setDragstart] = useState([0, 0]);
  const {clear} = useAttachmentDispatch();
  const {setBoardProjects, setZoomProject, setStreamsIds, setComponentsFromMap, setStreamIntersected, setComponentIntersected} = useProjectDispatch();
  const [sizeCard, setSizeCard] = useState([0,0])
  const divRef = useRef(null);
  const columRef = useRef<null | HTMLDivElement>(null); 
  const [onScrollValue, setOnScrollValue] = useState(-1);
  var windowWidth = window.innerWidth ;
  const onDrop = (e: any, columnIdx: number) => {
    let txt = e.dataTransfer.getData("text");
    console.log('txt', txt)
    console.log('columns', columns)
    console.log('columnIdx', columnIdx)
    console.log('dragAction', dragAction)
    let cols = onDropFn(txt, columns, columnIdx, tabKey, dragAction);
    if (cols) {
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
  }
  const onDragOver = (e: any) => {
    stop=0
    e.preventDefault();
  }
  // useEffect(()=>{
  //   console.log('qui', onScrollValue)
  //   // if(onScrollValue){
  //   //   console.log('Dotty', onScrollValue)
  //   //   // setOnScrollValue(false)
  //   // }else{
  //   //   // console.log('Dotty....')
  //   // }
  // },[onScrollValue])
  return (
    columns.map((column:any, columnIdx:number) => (
      <div className="container-drag" key={columnIdx+Math.random()}>
        <h3 className="title-panel">{column.title == 'Debris Management' ? 'Trash & Debris mngt' : column.title}</h3>
        <div
          className={column.hasCreateOption ? "col-wr droppable colum-hascreate":"col-wr droppable"}
          style={dragAction[0] && columnIdx === Math.trunc(Number(dragAction[1])) ? {backgroundColor:'#f2f4ff'} : {}}
          onDragOver={onDragOver}
          ref={columRef}
          onDrop={(e: any) => {onDrop(e, columnIdx); setDragAction([false, 0, 0]);}}
          onScrollCapture={(e:any)=>{
            setTimeout(() => {
              columRef.current?.scrollTo(0,0);
              e.target.scrollTo(0,0);
            }, 5000);
          }}
          // onDragEnter={(e) => {
          //   console.log('stop',stop)
          //   if (stop<=1){
          //     console.log('dragEnter')
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
          //     console.log('what is inside',dragAction)
          //     stop++;
          //   }
          //   e.preventDefault()
          //   e.stopPropagation()
          // }}
          onDragEnterCapture={(e) => {
            console.log('stop',stop)
            if (stop<=1){
              console.log('dragEnter')
              let dr: any = divRef.current;
              let bounds = dr.getBoundingClientRect();
              setSizeCard([bounds.height, bounds.width])
              let size= 100;
              let sizeCard= 70;
              if(windowWidth >= 1900 ){
                size=75;
                sizeCard=0;
              }
              if(windowWidth >= 2500 ){
                size=80;
                sizeCard=0;
              }
              if(columnIdx !==0 ){
                if((e.clientX/bounds.width)-3 >= 0 && ((e.clientY-sizeCard)/bounds.height)-2 >= 0){
                  setDragAction([true, columnIdx,  ((e.clientY-sizeCard)/bounds.height)-3]);
                }
              }else{
                if((e.clientX/bounds.width)-3 >= 0 && ((e.clientY-size)/bounds.height)-2 >= 0){
                  setDragAction([true, columnIdx,  ((e.clientY-size)/bounds.height)-3]);
                }
              }
              console.log('what is inside',dragAction)
              stop++;
            }
            e.preventDefault()
            e.stopPropagation()
          }}
          onDrag={(e) => {
            let dr: any = divRef.current;
            let bounds = dr.getBoundingClientRect();
            let size= 100;
            let sizeCard= 70;
            if(windowWidth >= 1900 ){
              size=75;
              sizeCard=0;
            }
            if(windowWidth >= 2500 ){
              size=80;
              sizeCard=0;
            }
            if(columnIdx !== 0){
              if((e.clientX/bounds.width)-3 >= 0 && ((e.clientY-sizeCard)/bounds.height)-2 >= 0){
                setDragstart([columnIdx,  ((e.clientY-sizeCard)/bounds.height)-2]);
              }
            }else{
              if(columnIdx >= 0 && ((e.clientY - size)/bounds.height)-2 >= 0){
                setDragstart([columnIdx,  ((e.clientY - size)/bounds.height)-2]);
              }
            }
          }}
        >
          {
            column.hasCreateOption &&
            <Button className="btn-transparent button-createProject " onClick={onClickNewProject}>
              { <img src="/Icons/icon-18.svg" style={{marginBottom:'2px'}} alt=""/>}
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
                if(i===Math.trunc(Number(dragStart[1])) && columnIdx === Math.trunc(Number(dragStart[0])) && dragAction[0]){
                  return(
                    <>
                    <div style={{backgroundColor:'#d6d8e0', opacity:'0.5', width:'100%', height:`${sizeCard[0]}px`, marginBottom:'10px', borderRadius:'5px'}}><br></br></div>
                    </>
                  )
                } else {
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
              }
              else {
                if(i===Math.trunc(Number(dragStart[1])) && columnIdx === Math.trunc(Number(dragStart[0])) && dragAction[0]){
                  // return(
                  //   <>
                  //   <div style={{backgroundColor:'#d6d8e0', opacity:'0.5', width:'100%', height:`${sizeCard[0]}px`, marginBottom:'10px', borderRadius:'5px'}}><br></br></div>
                  //   </>
                  // )
                } else {
                  return(
                    <>
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