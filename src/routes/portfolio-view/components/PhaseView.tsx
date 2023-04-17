import React, { cloneElement, useEffect, useRef, useState } from "react";
import * as d3 from 'd3';
import { dataDot1, dataDot2, dataDot3, colorScale } from "../constants/PhaseViewData";
import { Button, Col, Input, Layout, message, Popover, Progress, Checkbox, Row, Select, Space, Steps, Table, Tabs, Tag } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, CloseOutlined, FormOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import PineyView from "./PineyView";
import ModalGraphic from "./ModalGraphic";
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import moment from 'moment';
import Search from "./Search";

const { Step } = Steps;

const PhaseView = (
  { rawData,
    openTable,
    phaseRef,
    searchRef,
    graphicOpen,
    setGrapphicOpen,
    positionModalGraphic,
    setPositionModalGraphic,
    indexParent,
    tabKey,
    userName,
    setDataModal,
    setTollData,
    openPiney,
    setOpenPiney,
    collapsePhase,
    setOpenModalTollgate,
    tableRef,
    setOpenTable,
    //hoverTable,
    //setHoverTable,
    scheduleRef,
    setCompleteData,
    setNewData,
    index,
    groupsBy,
    setCurrentGroup,
    setSearchWord,
    fullData,
    email,
    searchWord,
    setCollapsePhase,
    optionSelect,
  }
    : {
      rawData: any,
      openTable: boolean[],
      phaseRef: React.MutableRefObject<HTMLDivElement | null>;
      searchRef: React.MutableRefObject<any>,
      graphicOpen: boolean,
      setGrapphicOpen: React.Dispatch<React.SetStateAction<boolean>>,
      positionModalGraphic: {
        left: number;
        top: number;
      }
      setPositionModalGraphic: React.Dispatch<React.SetStateAction<{
        left: number;
        top: number;
      }>>,
      indexParent: number;
      tabKey: any,
      userName: string,
      setDataModal: any,
      setTollData: any,
      openPiney: boolean,
      setOpenPiney: any,
      collapsePhase: any,
      setOpenModalTollgate: Function,
      tableRef: React.MutableRefObject<any>,
      scheduleRef: React.MutableRefObject<HTMLDivElement | null>,
      setOpenTable:React.Dispatch<React.SetStateAction<boolean[]>>,
      //hoverTable: any,
      //setHoverTable:React.Dispatch<React.SetStateAction<number | undefined>>,
      setCompleteData: Function,
      setNewData: Function,
      index: number,
      groupsBy: any[],
      setCurrentGroup: Function,
      setSearchWord: Function,
      fullData: any,
      email: string,
      searchWord: string,
      setCollapsePhase: Function,
      optionSelect:any,
    }) => {
  const [current, setCurrent] = useState(0);
  // const [graphicOpen, setGrapphicOpen] = useState(false);
  // const [positionModalGraphic, setPositionModalGraphic]= useState({left: 152, top:75})
  

  const [phaseList, setPhaseList] = useState<any>([])
  const [statusList, setStatusList] = useState<any>([])
  const [availableStatusList, setAvailableStatusList] = useState<any>([])
  const [updatePhaseList, setUpdatePhaseList] = useState(false);
  const [scheduleList, setScheduleList] = useState<any>({})
  const [completeData1, setCompleteData1] = useState<any>({})
  const [actionsDone,setActionsDone] = useState<any>({})
  const [updateAction,setUpdateAction] = useState(false);
  const phaseRef1 = useRef<null | HTMLDivElement>(null);
  const [popUpData, setPopUpData] = useState<any>({});
  const [userBrowser, setUserBrowser] = useState<any>()
  const headerRef = useRef<null | HTMLDivElement>(null);
  const [statusCounter,setStatusCounter] = useState(0);

  const windowWidth: any = window.innerWidth;
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const [svgStatePhase, setSvgStatePhase] = useState<any>();
  let heightDiv1 = document.getElementById(`testing1`)?.offsetHeight;
  let heightDiv2 = document.getElementById(`testing2`)?.offsetHeight;
  let heightDiv3 = document.getElementById(`testing3`)?.offsetHeight;
  let svg: any;

  
  const labelWidth = windowWidth > 2000 && windowWidth <= 2999 ? 150 : windowWidth >= 3001 && windowWidth <= 3999 ? 185 : 95;
  let totalLabelWidth = phaseList.length * labelWidth;
  
  const marginLeft = (windowWidth >= 3001 && windowWidth <= 3999 ? 45 : (windowWidth >= 2550 && windowWidth <= 3000 ? 32.5 : (windowWidth >= 2001 && windowWidth <= 2549 ? 29 : (windowWidth >= 1450 && windowWidth <= 2000 ? 20 : (windowWidth >= 1199 && windowWidth <= 1449 ? 22 : 20)))))
  const marginRight = (windowWidth >= 1900 && windowWidth <= 2549 ? 30 : (windowWidth >= 2550 && windowWidth <= 3000 ? 50 : (windowWidth >= 3001 && windowWidth <= 3999 ? 40 : 30)))
  const marginTop = (windowWidth >= 3001 && windowWidth <= 3999 ? -41.2 : (windowWidth >= 1900 && windowWidth <= 2549 ? -27 : (windowWidth >= 2550 && windowWidth <= 3000 ? -31 : -22)))
  const marginBottom = (windowWidth >= 3001 && windowWidth <= 3999 ? -40.5 : (windowWidth >= 2550 && windowWidth <= 3000 ? -43 : (windowWidth >= 1900 && windowWidth <= 2549 ? -35 : -26)))
  const prevData = rawData.map((elem: any) => {
    return {
      ...elem,
      schedule: elem.schedule.filter((val: any) => val.phase !== 'Draft' && val.phase !== 'WorkRequest')
    }
  });
  const sortedData = prevData.filter((elem: any) => elem.id.includes('Title'));
  const completeData = sortedData.map((elem: any) => {
    return {
      ...elem,
      values: prevData.filter((elemRaw: any) => !elemRaw.id.includes('Title') && elemRaw.headerLabel === elem.headerLabel)
    }
  });
  const lengthData = completeData.length;
  const gradientLinesClass = (svgDefinitions: any) => {
    let completedtoActive = svgDefinitions.append("linearGradient");
    completedtoActive
      .attr("id", "Done_Current")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0")
      .attr("y2", "0");
    completedtoActive.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", '#5E5FE2')
    completedtoActive.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", '#047CD7')

    let completedtoDelayed = svgDefinitions.append("linearGradient");
    completedtoDelayed
      .attr("id", "Current_NotStarted")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0")
      .attr("y2", "0");
    completedtoDelayed.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", '#047CD7')
    completedtoDelayed.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", '#D4D2D9')

    let ActivetoNotStarted = svgDefinitions.append("linearGradient");
    ActivetoNotStarted
      .attr("id", "Overdue_NotStarted")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0")
      .attr("y2", "0");
    ActivetoNotStarted.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", '#F5575C')
    ActivetoNotStarted.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", '#D4D2D9')

  }


  const phaseChart = (dataDotchart: any) => {      
    if (Object.keys(scheduleList).length > 0) {
      let margin = { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft };
      let width: any = totalLabelWidth;//document.getElementById('phaseviewTitlleWidth')?.offsetWidth;//= 1405 - margin.left - margin.right,
      let heightDiv: any;
      // heightDiv =document.getElementById(`${dataDotchart.id}`)?.offsetHeight; //265 - margin.top - margin.bottom;
      heightDiv = (windowWidth >= 3001 && windowWidth <= 3999 ? 146.6 : (windowWidth >= 2550 && windowWidth <= 3000 ? 127.56 : (windowWidth >= 2001 && windowWidth <= 2549 ? 117 : (windowWidth >= 1450 && windowWidth <= 2000 ? 106.12 : (windowWidth >= 1199 && windowWidth <= 1449 ? 78 : 78)))))
      let factorHeight = (windowWidth >= 3001 && windowWidth <= 3999 ? 0 : 0);
      let height: any = factorHeight + heightDiv + 3;
      let heightContainer: any = height + margin.top + margin.bottom;
      if (heightContainer>0){              
      // append the svg object to the body of the page
      removeAllChildNodes(document.getElementById(`dotchart_${dataDotchart.id.replace(/\s/g, '')}`))
      svg = d3
        .select(`#dotchart_${dataDotchart.id.replace(/\s/g, '')}`)
        .append("svg")
        .attr("width", totalLabelWidth)//
        .attr("height", heightContainer)
        //.attr("viewBox", `0 0 ${width + 50} ${height - 20}`)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        setSvgStatePhase(svg);
        //dataDotchart =dataDotchart[0].values
        // let datas = dataDotchart.values;  
          let datas = [dataDotchart];   
          let arrayForCirclesAndLines = [];
          for (var i = 0; i < scheduleList.length; i++) {
            arrayForCirclesAndLines.push(i);
          }
          let svgDefinitions = svg.append("defs");
          svg.selectAll("defs")
            .data(datas)
            .enter()

          gradientLinesClass(svgDefinitions)

          // Add X axis
          var x = d3.scaleLinear().domain([0, phaseList.length]).range([margin.left, width + margin.right]);
          let xdr: any = (r: any) => {
            let offset: any = x(r);
            return offset;
          }
          svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .style('visibility', 'hidden')
            .call(d3.axisBottom(x));

          // Y axis
          var y = d3
            .scaleBand()
            .range([0, height])
            .domain(
              datas.map((d: any) => {
                return d.id.replace(/\s/g, '')
              })
            )
            .padding(1);
          svg.append("g")
          .style('visibility', 'hidden')
          .call(d3.axisLeft(y));          
          
                        
       
     
          let hasDateData = true;
          let button = svg.selectAll("button").data(datas).enter().append("g");
          button
            .append("rect")
            .attr('rx', 3)
            .attr('ry', 3)
            .attr("x", () => {
              let xAddButton: any = (windowWidth >= 3001 && windowWidth <= 3999 ? -25 : (windowWidth >= 2001 && windowWidth <= 2549 ? -23 : (windowWidth >= 2550 && windowWidth <= 3000 ? -20 : (windowWidth >= 1450 && windowWidth <= 2000 ? -13 : (windowWidth >= 1199 && windowWidth <= 1449 ? -10 : 10))))); 
             return xdr(0) + xAddButton})
            .attr("width", () => {
              let widthAddButton: any = (windowWidth >= 3001 && windowWidth <= 3999 ? 25 : (windowWidth >= 2001 && windowWidth <= 2549 ? 23 : (windowWidth >= 2550 && windowWidth <= 3000 ? 21 : (windowWidth >= 1450 && windowWidth <= 2000 ? 20 : (windowWidth >= 1199 && windowWidth <= 1449 ? -10 : 10)))));
              // console.log('ydname', ydname, ydname + 10)
              return xdr(0 + 1) - xdr(0) + widthAddButton;
            })
            // (windowWidth >= 3001 && windowWidth <= 3999 ? 23 : (windowWidth >= 2001 && windowWidth <= 2549 ? 18 : (windowWidth >= 2550 && windowWidth <= 3000 ? 21 : (windowWidth >= 1450 && windowWidth <= 2000 ? 16 : (windowWidth >= 1199 && windowWidth <= 1449 ? 11 : 11)))))
            
            .attr("y", (d: any) => {
              let ydname: any = y(d.id.replace(/\s/g, ''));
              // console.log('ydname', ydname, ydname + 10)
              let yAddButton: any = (windowWidth >= 3001 && windowWidth <= 3999 ? -15 : (windowWidth >= 2001 && windowWidth <= 2549 ? 18 : (windowWidth >= 2550 && windowWidth <= 3000 ? -15 : (windowWidth >= 1450 && windowWidth <= 2000 ? -12 : (windowWidth >= 1199 && windowWidth <= 1449 ? -9 : 10))))); 
              return ydname + yAddButton;
            })
            .attr("height", (windowWidth >= 3001 && windowWidth <= 3999 ? 40 : (windowWidth >= 2001 && windowWidth <= 2549 ? 18 : (windowWidth >= 2550 && windowWidth <= 3000 ? 32 : (windowWidth >= 1450 && windowWidth <= 2000 ? 28 : (windowWidth >= 1199 && windowWidth <= 1449 ? 25 : 25))))))
            .style("fill", "#251863")
            .style('visibility', (d: any) => {        
              if(statusCounter === (d?.project_status).filter((ps:any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4).length){
                hasDateData = false;
              }
              //return hasDateData ? 'visible':'hidden'})
              return 'hidden'})
            .attr('stroke', '#251863')
            .style('stroke-linecap', 'round')
            .on("click", function (d: any) {
              const sendTollgate = { d, scheduleList }
              setTollData(sendTollgate);    
              setOpenModalTollgate(true);
            })
            hasDateData = true;
            svg
            .selectAll("editText")
            .data(datas)
            .enter()
            .append("text")
            .attr("class", "circletext")
            .attr('fill', '#ffffff')
            .attr('font-size', (windowWidth >= 3001 && windowWidth <= 3999 ? 23 : (windowWidth >= 2001 && windowWidth <= 2549 ? 18 : (windowWidth >= 2550 && windowWidth <= 3000 ? 21 : (windowWidth >= 1450 && windowWidth <= 2000 ? 16 : (windowWidth >= 1199 && windowWidth <= 1449 ? 11 : 11))))))
            .attr('font-weight', 600)
            .text('Add Dates')
            .attr("x", () => {
              let xAddButton: any = (windowWidth >= 3001 && windowWidth <= 3999 ? 23 : (windowWidth >= 2001 && windowWidth <= 2549 ? 18 : (windowWidth >= 2550 && windowWidth <= 3000 ? 14 : (windowWidth >= 1450 && windowWidth <= 2000 ? 6 : (windowWidth >= 1199 && windowWidth <= 1449 ? 4 : 2)))));
              // console.log('ydname', ydname, ydname + 10)
              return xdr(0) + xAddButton
            })
            .attr("y", (d: any) => {
              let ydname: any = y(d.id.replace(/\s/g, ''));
              // console.log('ydname', ydname, ydname + 10)
              let yAddButton: any = (windowWidth >= 3001 && windowWidth <= 3999 ? 15 : (windowWidth >= 2001 && windowWidth <= 2549 ? 13 : (windowWidth >= 2550 && windowWidth <= 3000 ? 9 : (windowWidth >= 1450 && windowWidth <= 2000 ? 7 : (windowWidth >= 1199 && windowWidth <= 1449 ? 7 : 2)))));
              return ydname + yAddButton;
            })
            .style('visibility', (d: any) => {
              if(statusCounter === (d?.project_status).filter((ps:any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4).length){
                hasDateData = false;
              }
              //return hasDateData ? 'visible':'hidden'})
              return 'hidden'})
              .on("click", function (d: any) {
                const sendTollgate = { d, scheduleList }
                setTollData(sendTollgate);    
                setOpenModalTollgate(true);
              })
            ;

          // Lines
          let z1 = true;
          let colorChange = true;
          arrayForCirclesAndLines.forEach((r) => {  
            hasDateData = true        
            if (r < arrayForCirclesAndLines.length - 1) {
              svg
                .selectAll("myline")
                .data(datas)
                .enter()
                .append("rect")
                .attr("x", xdr(r))
                .attr("width", xdr(r + 1) - xdr(r))
                .attr("y", (d: any) => {
                  let ydname: any = y(d.id.replace(/\s/g, ''));
                  return ydname;
                })
                .attr("height", 2)
                .attr("stroke", (d: any) => {
                  if(d.phaseId === scheduleList[r].code_phase_type_id){             
                    return colorScale['Current'];
                  }else if(d.project_status[r]?.is_done){
                    return colorScale['Done'];
                  }else{
                    return colorScale['NotStarted'];
                  }
                  // let colorstroke: any = colorScale[(scheduleList[r].status)];
                  // if(d.phaseId === scheduleList[r].code_phase_type_id){
                  //   z1 = false;
                  //   colorstroke = colorScale['Current'];
                  // }else if(z1){
                  //   colorstroke = colorScale['Done'];
                  // }else{
                  //   colorstroke = colorScale['NotStarted'];
                  // }           
                  // return colorstroke;
                })
                .attr("stroke", function (d: any) {
                  const endDate = (d?.project_status?.find((x:any)=>x.code_phase_type_id === d.phaseId)?.actual_end_date)
                  let today = moment()                
                  let indexStatus;
                  scheduleList.forEach((element:any, index:number) => {
                    if(d.phaseId === element.code_phase_type_id){
                      indexStatus = index;
                    }
                  });
                  if(indexStatus === r){     
                    if (endDate){
                      const diffDates = ((moment(endDate).diff(today, 'M', true)))
                      if(diffDates>0){
                        return `url(#Current_NotStarted)`;      
                      }else{
                        return `url(#Overdue_NotStarted)`;
                      }
                    }else{
                      return `url(#Current_NotStarted)`;      
                    }       
                  } 
                  if( indexStatus && r < indexStatus-1){
                    return colorScale['Done'];
                  }
                  if(indexStatus&& r === indexStatus-1){
                    return `url(#Done_Current)`
                  }
                  else{
                    return colorScale['NotStarted'];
                  } 
                })
                // .attr("stroke", "url(#textBg)")
                .attr("stroke-width", "2.5px")
                // .style('visibility', (d: any) => {
                //   if(statusCounter === (d?.project_status).filter((ps:any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4).length){
                //     hasDateData = false;
                //   }
                //   return hasDateData ? 'hidden':'visible'})
            }
          });
      const radius = (windowWidth >= 3001 && windowWidth <= 3999 ? 24 : (windowWidth >= 2001 && windowWidth <= 2549 ? 14 : (windowWidth >= 2550 && windowWidth <= 3000 ? 20 : (windowWidth >= 1450 && windowWidth <= 2000 ? 15 : (windowWidth >= 1199 && windowWidth <= 1449 ? 12 : 12)))));
      let circles = svg.selectAll("mycircle").data(datas).enter();
      let z = true;
      arrayForCirclesAndLines.forEach((r) => {        
        hasDateData = true
        circles
          .append("circle")
          .attr('id', (d: any) => {
            return `${d.id.replace(/\s/g, '')}_${(scheduleList[r].phase)}`;
          })
          .attr("cx", xdr(r))
          .attr("cy", (d: any) => {
            let ydname: any = y(d.id.replace(/\s/g, ''));
            return ydname;
          })
          .attr("r", radius)
          .style("fill", function (d: any) {  
            let indexStatus;
            const endDate = (d?.project_status?.find((x:any)=>x.code_phase_type_id === d.phaseId)?.actual_end_date)
            let today = moment()                           
            scheduleList.forEach((element:any, index:number) => {
              if(d.phaseId === element.code_phase_type_id){
                indexStatus = index;
              }
            });
            if(indexStatus === r){    
              if (endDate){
                const diffDates = ((moment(endDate).diff(today, 'M', true)))
                if(diffDates>0){
                  return colorScale['Current'];      
                }else{
                  return colorScale['Overdue'];
                }
              }else{
                return colorScale['Current'];      
              }                
            } 
            if( indexStatus && r < indexStatus){
              return colorScale['Done'];
            }else{
              return colorScale['NotStarted'];
            } 

            // if(d.phaseId === scheduleList[r].code_phase_type_id){             
            //   return colorScale['Current'];
            // }else if(d.project_status[r]?.is_done){
            //   return colorScale['Done'];
            // }else{
            //   return colorScale['NotStarted'];
            // }            
          })
          // .style('visibility', (d: any) => {
          //   if(statusCounter === (d?.project_status).filter((ps:any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4).length){
          //     hasDateData = false;
          //   }
          //   return hasDateData ? 'hidden':'visible'})
          //   hasDateData = true
        circles
          .append("circle")
          .attr("cx", xdr(r))
          .attr("cy", (d: any) => {
            let ydname: any = y(d.id.replace(/\s/g, ''));
            return ydname;
          })
          .attr("r", radius - 1)
          .style("fill", function (d: any) {
            return "white";
          })
          // .style('visibility', (d: any) => {
          //   if(statusCounter === (d?.project_status).filter((ps:any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4).length){
          //     hasDateData = false;
          //   }
          //   return hasDateData ? 'hidden':'visible'})
          //   hasDateData = true
        circles
          .append("circle")
          .attr("cx", xdr(r))
          .attr("cy", (d: any) => {
            let ydname: any = y(d.id.replace(/\s/g, ''));
            return ydname;
          })
          .attr("r", radius - 3)
          .style("fill", function (d: any) {
            let indexStatus;
            const endDate = (d?.project_status?.find((x:any)=>x.code_phase_type_id === d.phaseId)?.actual_end_date)
            let today = moment()                           
            scheduleList.forEach((element:any, index:number) => {
              if(d.phaseId === element.code_phase_type_id){
                indexStatus = index;
              }
            });
            if(indexStatus === r){    
              if (endDate){
                const diffDates = ((moment(endDate).diff(today, 'M', true)))
                if(diffDates>0){
                  return colorScale['Current'];      
                }else{
                  return colorScale['Overdue'];
                }
              }else{
                return colorScale['Current'];      
              }                
            } 
            if( indexStatus && r < indexStatus){
              return colorScale['Done'];
            }else{
              return colorScale['NotStarted'];
            }    

            // if(d.phaseId === scheduleList[r].code_phase_type_id){             
            //   return colorScale['Current'];
            // }else if(d.project_status[r]?.is_done){
            //   return colorScale['Done'];
            // }else{
            //   return colorScale['NotStarted'];
            // }      
          })
          // .style('visibility', (d: any) => {
          //   if(statusCounter === (d?.project_status).filter((ps:any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4).length){
          //     hasDateData = false;
          //   }
          //   return hasDateData ? 'hidden':'visible'})
            hasDateData = true
        svg
          .selectAll("myText")
          .data(datas)
          .enter()
          .append("text")
          .attr('id', (d: any) => { 
            return `${(d.id).replaceAll(' ','')}_${scheduleList[r].phase_id}${d.project_id}_text` })
            .attr('id2', (d: any) => { 
              return `${(d.id).replaceAll(' ','')}_${scheduleList[r].phase_id}${d.project_id}_text` })
          .attr("class", "circletext")
          .attr('fill', '#ffffff')
          .attr('font-size', (windowWidth >= 3001 && windowWidth <= 3999 ? 23 : (windowWidth >= 2001 && windowWidth <= 2549 ? 18 : (windowWidth >= 2550 && windowWidth <= 3000 ? 21 : (windowWidth >= 1450 && windowWidth <= 2000 ? 16 : (windowWidth >= 1199 && windowWidth <= 1449 ? 11 : 11))))))
          .text(function (d: any) {                 
            let counterdown = 0;           
            for (let i = 0; i < Object.keys(actionsDone).length ; i++){
              if (d.project_id === actionsDone[i].project_id){
                // for (let j = 0; j < Object.keys(scheduleList[r].tasksData).length ; j++){
                //   if(scheduleList[r].tasksData[j].code_rule_action_item_id === actionsDone[i].code_rule_action_item_id){                    
                //     counterdown = counterdown + 1;
                //     break;
                //   }                 
                // }    
                counterdown += scheduleList[r].tasksData.some((option: any) => option.code_rule_action_item_id === actionsDone[i].code_rule_action_item_id);            
              }              
            }
            //console.log(scheduleList[r].tasks)
            return scheduleList[r].tasks-counterdown
          })
          .attr("x", function (d: any) {
            const factorCenter: any = (windowWidth >= 2001 && windowWidth <= 2549 ? 18 : (windowWidth >= 2550 && windowWidth <= 3000 ? 1.65 : (windowWidth >= 3001 && windowWidth <= 3999 ? 1.8 :(windowWidth >= 1450 && windowWidth <= 2000 ? 1.6 : (windowWidth >= 1199 && windowWidth <= 1449 ? 1.8 : 2)))))
            let offset = 0;
              offset =
                +scheduleList[r].tasks > 9 ? xdr(r) - radius / factorCenter : xdr(r) - radius / 4;            
            return offset;
          })
          .attr("y", (d: any) => {
            let ydname: any = y(d.id.replace(/\s/g, ''));
            return ydname + radius / 3;
          })
          // .style('visibility', (d: any) => {
          //   if(statusCounter === (d?.project_status).filter((ps:any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4).length){
          //     hasDateData = false;
          //   }
          //   return hasDateData ? 'hidden':'visible'})
          // ;
          hasDateData = true
        circles
          .append("circle")
          .attr('id', (d: any) => { return `${d.id.replace(/\s/g, '')}_${scheduleList[r].phase_id}${d.project_id}_outer` })
          .attr("cx", xdr(r))
          .attr("cy", (d: any) => {
            let ydname: any = y(d.id.replace(/\s/g, ''));
            return ydname;
          })
          .attr("r", radius + 0.5)
          .style("fill", 'white')
          .style('opacity', 0)
          // .style('visibility', (d: any) => {
          //   if(statusCounter === (d?.project_status).filter((ps:any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4).length){
          //     hasDateData = false;
          //   }
          //   return hasDateData ? 'hidden':'visible'})
          .on("click", (d: any) => {  
            setOpenPiney(false)            
            console.log(d)
            let searchTextId2 = d3.event.target.id.slice(0, -6);
            let actualNumber = d3.selectAll(`#${searchTextId2}_text`).text();  
            let flag = ((d?.project_status)?.find((ps:any) => !ps?.planned_start_date || !ps?.planned_end_date))  
            let dataParsed = d?.project_status?.map((z: any, index: number) => {  
              return {    
                project_data: d,
                objectId: index + 1,
                type: 'rect',
                categoryNo: index + 1,
                from: moment(z?.planned_start_date),
                to: moment(z?.planned_end_date),
                status: z?.code_phase_type?.code_status_type?.status_name,
                name: z?.code_phase_type?.phase_name.replaceAll(' ',''),
                phase: z?.code_phase_type?.phase_name.replaceAll(' ',''),
                phaseId: z.code_phase_type_id,
                tasks: 10,
                show: (statusCounter === (d?.project_status)?.filter((ps:any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4).length && !flag),
                current : d?.phaseId === z?.code_phase_type_id,
                isDone : z.is_done,
                isLocked : z.is_locked
              };          
             })
             let scheduleParsed = {...d,schedule : dataParsed}
            setPopUpData({
              project_name: d.rowLabel,
              phase: scheduleList[r].phase,
              project_type: d.project_type,
              phase_id: scheduleList[r].phase_id,
              project_id: d.project_id,
              d3_pos: searchTextId2,
              d3_text: actualNumber,
              mhfd: d.mhfd,
              estimated_cost: d.estimated_cost,
              data: scheduleParsed,
              scheduleList: scheduleList
            })            
            setOpenPiney(true)
          })
          .on("mousemove", (d: any) => {
            let popupVisible: any = document.getElementById('popup-phaseview');
            setGrapphicOpen(true);
            let searchTextId2 = d3.event.target.id.slice(0, -6);
            let actualNumber = d3.selectAll(`#${searchTextId2.replaceAll(' ','')  }_text`).text();
            const lenghtSc = Object.keys(scheduleList[r].tasksData).length
            const phaseSc = (scheduleList[r].phase)   
            const phaseId = (scheduleList[r].phase_id)              
            const sendModal = { d, actualNumber: actualNumber, scheduleList: lenghtSc, schedulePhase: phaseSc, phase_id: phaseId }
            setDataModal(sendModal);      
            if (popupVisible !== null) {
              let popupfactorTop = (windowWidth >= 3001 && windowWidth <= 3999 ? 205 : 
                (windowWidth >= 2550 && windowWidth <= 3000 ? 165 : 
                  (windowWidth >= 2001 && windowWidth <= 2549 ? 60 : 
                    (windowWidth >= 1450 && windowWidth <= 2000 ? 160 : 
                      (windowWidth >= 1199 && windowWidth <= 1449 ? 140 : 140)))))
              if(userBrowser=== 'Safari'){
                popupfactorTop = (windowWidth >= 3001 && windowWidth <= 3999 ? 400 : 
                  (windowWidth >= 2550 && windowWidth <= 3000 ? 335 : 
                    (windowWidth >= 2001 && windowWidth <= 2549 ? 60 : 
                      (windowWidth >= 1450 && windowWidth <= 2000 ? 285 : 
                        (windowWidth >= 1199 && windowWidth <= 1449 ? 250 : 140)))))
              }
              if(userBrowser=== 'Edge'){
                popupfactorTop = (windowWidth >= 3001 && windowWidth <= 3999 ? 245 : 
                  (windowWidth >= 2550 && windowWidth <= 3000 ? 180 : 
                    (windowWidth >= 2001 && windowWidth <= 2549 ? 60 : 
                      (windowWidth >= 1450 && windowWidth <= 2000 ? 170 : 
                        (windowWidth >= 1199 && windowWidth <= 1449 ? 155 : 140)))))
              }
              let popupfactorLeft = (windowWidth >= 3001 && windowWidth <= 3999 ? 875 : (windowWidth >= 2550 && windowWidth <= 3000 ? 575 : (windowWidth >= 2001 && windowWidth <= 2549 ? 60 : (windowWidth >= 1450 && windowWidth <= 2000 ? 445 : (windowWidth >= 1199 && windowWidth <= 1449 ? 345 : 345)))))
              let widthOfPopup: any = document.getElementById('popup-phaseview')?.offsetWidth;
              let heightOfPopup: any = document.getElementById('popup-phaseview')?.offsetHeight;
              //let heightOfPopup: any =document.getElementById('popup-phaseview')?.offsetHeight;
              let positionTop: any = d3.event.layerY - heightOfPopup + popupfactorTop;
              let positionLeft: any = d3.event.layerX - widthOfPopup / 2 + popupfactorLeft;
              setPositionModalGraphic({ left: positionLeft, top: positionTop })
              //d3.selectAll('.text-search:hover').attr('text-search');
              d3.select(`#${d3.event.target.id.slice(0, -6)}`).style('fill', '#454150');
              let searchTextId = d3.event.target.id.substring(0, d3.event.target.id.indexOf('_'));
              d3.select(`#${searchTextId}`).style('background-color', '#fafafa');
              d3.select(`#${searchTextId}`).style('text-decoration','underline');
            }
          })
          .on("mouseout", (d: any) => {
            setGrapphicOpen(false);
            setPositionModalGraphic({ left: 10000, top: 10000 })
            d3.select(`#${d3.event.target.id.slice(0, -6)}`).style('fill', function (d: any) {
              return colorScale[d.schedule[r].status];
            });
            let searchTextId = d3.event.target.id.substring(0, d3.event.target.id.indexOf('_'));
            d3.select(`#${searchTextId}`).style('background-color', 'white');
            d3.select(`#${searchTextId}`).style('text-decoration','none');
          })
          ;
      });
    }}
  }
  const removeAllChildNodes = (parent: any) => {
    while (parent !== null && parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };
  useEffect(() => {
    if (Object.keys(rawData).length > 0) {
      rawData.map((elem: any, index: number) => (
        elem.values.map((value:any) => (
          removeAllChildNodes(document.getElementById(`dotchart_${value.id.replace(/\s/g, '')}`))
        )) 
      ));
    }
    // setTimeout(() => {
      for (let index = 0; index < rawData.length; index++) {
        const updatedValues = rawData[index].values.map((obj:any) => ({
          ...obj,
          idExt: rawData[index].id
        }));
        rawData[index].values = updatedValues;
        if(openTable[index]){
        rawData[index].values.forEach((element:any) => {
          phaseChart(element);
        }); 
      }
        // phaseChart(rawData[index]);
      }
    // }, 500);
    
  }, [updatePhaseList, rawData, indexParent, windowWidth,collapsePhase, openTable]);


  useEffect(() => {
    let z = []
    datasets.postData(`${SERVER.PHASE_TYPE}`, { tabKey: tabKey })
      .then((rows) => {  
        setPhaseList(rows)  
        setStatusCounter(rows.length)
        let counter = 0;
        z = rows.map((x: any) => {
          counter++;
          return (
            {
              categoryNo: counter,
              from: moment(null),
              to: moment(null),
              status: x?.code_status_type?.status_name,
              name: x.phase_name,
              phase: x.phase_name,
              tasks: x.code_rule_action_items.length,
              phase_id: x.code_phase_type_id,             
              tasksData: x.code_rule_action_items,
              duration: x.duration,
              duration_type: x.duration_type,
              code_phase_type_id: x.code_phase_type_id
            })
        })
        setScheduleList(z);
        const y = rows.map((x: any) => {
          return x.code_status_type;
        })
        setStatusList(y)
        setUpdatePhaseList(!updatePhaseList) 
        return rows
      })
      .catch((e) => {
        console.log(e);
      })
  }, [actionsDone])

  useEffect(() => {
    let browser;
    function getUserBrowser() { 
      if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
     {
         browser ='Opera'
     }
     else if(navigator.userAgent.indexOf("Edg") != -1 )
     {
         browser ='Edge'
     }
     else if(navigator.userAgent.indexOf("Chrome") != -1 )
     {
         browser ='Chrome'
     }
     else if(navigator.userAgent.indexOf("Safari") != -1)
     {
         browser ='Safari'
     }
     else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
     {
          browser ='Firefox'
     }
     else 
     {
        browser ='unknown'
     }
     }
     getUserBrowser()
    setUserBrowser(browser)
    datasets.getData(`${SERVER.PROJECT_ACTION_ITEM}`, {   
    }).then((e) => {     
      setActionsDone(e);
    }).catch((e) => {
      console.log(e);
    })  
  }, [tabKey,updateAction])


  useEffect(() => {
    const z: any = [];
    statusList.map((img: any) => {
      if (z.indexOf(img.status_name) === -1) {
        z.push(img.status_name)
      }
    });
    const counts = z.map((item1: any) => ([
      item1,
      (statusList.filter((item: any) => item.status_name === item1).length) * labelWidth
    ]));
    setAvailableStatusList(counts)
  }, [updatePhaseList])



  return (
    <Row>
      <Col xs={{ span: 10 }} lg={{ span: 5 }}>
        <Search
          searchWord={searchWord}
          searchRef={searchRef}
          tableRef={tableRef}
          setOpenTable={setOpenTable}
          openTable={openTable}
          //hoverTable={hoverTable}
          //setHoverTable={setHoverTable}
          phaseRef={phaseRef}
          scheduleRef={scheduleRef}
          rawData={fullData}
          setCompleteData={setCompleteData}
          setNewData={setNewData}
          index={index}
          groupsBy={groupsBy}
          setCurrentGroup={setCurrentGroup}
          setSearchWord={setSearchWord}
          fullData={rawData}
          email={email}
          setCollapsePhase={setCollapsePhase}
          optionSelect={optionSelect}
          collapsePhase={collapsePhase}
        />
      </Col>
      <Col xs={{ span: 34 }} lg={{ span: 19 }}>
        <div className="phaseview-body">
          {openPiney && (
            <div className="piney-text">
              <PineyView
                setOpenPiney={setOpenPiney}
                data={popUpData}
                userName={userName}
                setUpdateAction={setUpdateAction}
                updateAction={updateAction}
                setOpenModalTollgate={setOpenModalTollgate}
                setTollData={setTollData}
              />
            </div>
          )}
          <div className="phaseview-content">
            <div
              className="header-title"
              ref={headerRef}
              onScrollCapture={(e: any) => {
                if (phaseRef.current && indexParent && phaseRef.current) {
                  let dr: any = phaseRef.current;
                  let dr1: any = headerRef.current;
                  if (searchRef.current[indexParent] && phaseRef.current) {
                    phaseRef.current.scrollTo(dr1.scrollLeft, dr.scrollTop);
                  }
                }
              }}
            >
              <div className="phaseview-title-label" style={{ width: totalLabelWidth, paddingRight: '13px' }} id="phaseviewTitlleWidth">
                {availableStatusList.map((item: any, index: number) => {
                  // console.log('item', item)
                  return <p style={index === 0 ? { display: 'flex', width: item[1], border: 'transparent' } : { display: 'flex', width: item[1] }}>
                    <hr className="hr2" style={{ width: item[1] / 2 - 48 }}></hr>{item[0]}<hr className="hr2" style={{ width: item[1] / 2 - 48 }}></hr>
                  </p>
                })}
              </div>
              <div style={{ width: totalLabelWidth, paddingRight: '13px' }} className="phaseview-title" id="phaseviewTitlleWidth">
                {phaseList.map((item: any) => {
                  return <p style={{ width: labelWidth }}>{item.phase_name}</p>
                })}
              </div>
            </div>
            <div className="header-timeline" style={{ borderTop: '1px solid #d4d2d9', width: '100%' }}></div>
            <div
              // style={{ width: totalLabelWidth }}
              className="container-timeline"
              ref={el => phaseRef.current = el}
              style={{ paddingLeft: '5px' }}
              onScroll={(e: any) => {
                let dr: any = phaseRef.current;
                if (searchRef.current[indexParent] && headerRef.current) {
                  // console.log(headerRef.current?.scrollLeft, headerRef.current?.scrollTop, dr.scrollLeft, dr.scrollTop, 'INI',e.target.scrollTop,e.target.scrollLeft)
                  searchRef.current[indexParent].scrollTo(dr.scrollLeft, dr.scrollTop);
                  headerRef.current?.scrollTo(dr.scrollLeft, dr.scrollTop);
                  // console.log(headerRef.current?.scrollLeft, headerRef.current?.scrollTop, dr.scrollLeft, dr.scrollTop, "FIN")
                }
              }}
            >
            {rawData.map((elem: any, index: number) => (
              elem.values.map((value:any,indexinside:number) => {
                return <div>
                <div className="phaseview-timeline" style={{ width: totalLabelWidth }}>
                  <div id={`dotchart_${value.id.replace(/\s/g, '')}`}></div>
                </div>
                {elem.values.length - 1 === indexinside && rawData.length-1 !==index ? <div className="header-timeline" style={{ width: totalLabelWidth}}></div>:''}
              </div>
              })
            ))}
          </div>
        </div>
    </div>
    </Col>
    </Row>
  );
};

export default PhaseView;