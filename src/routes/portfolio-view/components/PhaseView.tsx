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
    openPiney,
    setOpenPiney }
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
      openPiney: boolean,
      setOpenPiney: any    
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
      .attr("id", "Completed_Active")
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
      .attr("id", "Completed_delayed")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0")
      .attr("y2", "0");
    completedtoDelayed.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", '#5E5FE2')
    completedtoDelayed.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", '#F5575C')

    let ActivetoNotStarted = svgDefinitions.append("linearGradient");
    ActivetoNotStarted
      .attr("id", "Completed_Inactive")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0")
      .attr("y2", "0");
    ActivetoNotStarted.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", '#5E5FE2')
    ActivetoNotStarted.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", '#D4D2D9')

    let Cancelled = svgDefinitions.append("linearGradient");
    Cancelled
      .attr("id", "Active_Completed")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0")
      .attr("y2", "0");
    Cancelled.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", '#047CD7')
    Cancelled.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", '#D4D2D9')

    let ActivetoDelayed = svgDefinitions.append("linearGradient");
    ActivetoDelayed
      .attr("id", "Inactive_Cancelled")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0")
      .attr("y2", "0");
    ActivetoDelayed.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", '#D4D2D9')
    ActivetoDelayed.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", '#D4D2D9')

    let CancelledtoClosed = svgDefinitions.append("linearGradient");
    CancelledtoClosed
      .attr("id", "Cancelled_Closed")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0")
      .attr("y2", "0");
    CancelledtoClosed.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", '#D4D2D9')
    CancelledtoClosed.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", '#D4D2D9')

    let ClosedtoCloseout = svgDefinitions.append("linearGradient");
    ClosedtoCloseout
      .attr("id", "Closed_Closeout")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0")
      .attr("y2", "0");
    ClosedtoCloseout.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", '#D4D2D9')
    ClosedtoCloseout.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", '#D4D2D9')

    let ActivetoInactive = svgDefinitions.append("linearGradient");
    ActivetoInactive
      .attr("id", "Active_Inactive")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0")
      .attr("y2", "0");
    ActivetoInactive.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", '#5E5FE2')
    ActivetoInactive.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", '#D4D2D9')
    let ActivetoCancelled = svgDefinitions.append("linearGradient");
    ActivetoCancelled
      .attr("id", "Active_Cancelled")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0")
      .attr("y2", "0");
    ActivetoCancelled.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", '#5E5FE2')
    ActivetoCancelled.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", '#D4D2D9')
    let CancelledtoCloseout = svgDefinitions.append("linearGradient");
    CancelledtoCloseout
      .attr("id", "Cancelled_Closeout")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0")
      .attr("y2", "0");
    CancelledtoCloseout.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", '#D4D2D9')
    CancelledtoCloseout.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", '#D4D2D9')
  }


  const phaseChart = (dataDotchart: any, index: number) => {
    if (Object.keys(scheduleList).length > 0) {
      let margin = { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft };
      let width: any = totalLabelWidth;//document.getElementById('phaseviewTitlleWidth')?.offsetWidth;//= 1405 - margin.left - margin.right,
      let heightDiv: any;
      heightDiv = document.getElementById(`${dataDotchart[index].id}`)?.offsetHeight; //265 - margin.top - margin.bottom;
      let factorHeight = (windowWidth >= 3001 && windowWidth <= 3999 ? 0 : 0);
      let height: any = factorHeight + heightDiv + 3;
      // append the svg object to the body of the page
      removeAllChildNodes(document.getElementById(`dotchart_${dataDotchart[index].id}`))
      svg = d3
        .select(`#dotchart_${dataDotchart[index].id}`)
        .append("svg")
        .attr("width", totalLabelWidth)//
        .attr("height", height + margin.top + margin.bottom)
        //.attr("viewBox", `0 0 ${width + 50} ${height - 20}`)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      setSvgStatePhase(svg);
      //dataDotchart =dataDotchart[0].values
      let datas = dataDotchart[index].values;
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
            return d.id;
          })
        )
        .padding(1);
      svg.append("g").style('visibility', 'hidden').call(d3.axisLeft(y));

      // Lines
      arrayForCirclesAndLines.forEach((r) => {
        if (r < arrayForCirclesAndLines.length - 1) {
          svg
            .selectAll("myline")
            .data(datas)
            .enter()
            .append("rect")
            .attr("x", xdr(r))
            .attr("width", xdr(r + 1) - xdr(r))
            .attr("y", (d: any) => {
              let ydname: any = y(d.id);
              return ydname;
            })
            .attr("height", 2)
            .attr("stroke", (d: any) => {
              let colorstroke: any = colorScale[(scheduleList[r].status)];
              return colorstroke;
            })
            .attr("stroke", function (d: any) {
              let currentStatus = scheduleList[r].status.replace(/\s+/g, '');
              let nextStatus = scheduleList[r+1].status.replace(/\s+/g, '');
              return (
                (currentStatus === nextStatus) ?
                  colorScale[(scheduleList[r].status)]
                  : (`url(#${currentStatus}_${nextStatus})`))
            })
            // .attr("stroke", "url(#textBg)")
            .attr("stroke-width", "2.5px");
        }
      });
      const radius = (windowWidth >= 3001 && windowWidth <= 3999 ? 24 : (windowWidth >= 2001 && windowWidth <= 2549 ? 14 : (windowWidth >= 2550 && windowWidth <= 3000 ? 20 : (windowWidth >= 1450 && windowWidth <= 2000 ? 15 : (windowWidth >= 1199 && windowWidth <= 1449 ? 12 : 12)))));
      let circles = svg.selectAll("mycircle").data(datas).enter();
      arrayForCirclesAndLines.forEach((r) => {
        circles
          .append("circle")
          .attr('id', (d: any) => {
            return `${d.id}_${(scheduleList[r].phase)}`;
          })
          .attr("cx", xdr(r))
          .attr("cy", (d: any) => {
            let ydname: any = y(d.id);
            return ydname;
          })
          .attr("r", radius)
          .style("fill", function (d: any) {
            return colorScale[(scheduleList[r].status)];
          })
        circles
          .append("circle")
          .attr("cx", xdr(r))
          .attr("cy", (d: any) => {
            let ydname: any = y(d.id);
            return ydname;
          })
          .attr("r", radius - 1)
          .style("fill", function (d: any) {
            return "white";
          })

        circles
          .append("circle")
          .attr("cx", xdr(r))
          .attr("cy", (d: any) => {
            let ydname: any = y(d.id);
            return ydname;
          })
          .attr("r", radius - 3)
          .style("fill", function (d: any) {
            return colorScale[(scheduleList[r].status)];
          })

        svg
          .selectAll("myText")
          .data(datas)
          .enter()
          .append("text")
          .attr('id', (d: any) => { 
            return `${d.id}_${scheduleList[r].phase_id}${d.project_id}_text` })
            .attr('id2', (d: any) => { 
              return `${d.id}_${scheduleList[r].phase_id}${d.project_id}_text` })
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
            let ydname: any = y(d.id);
            return ydname + radius / 3;
          })

          ;
        circles
          .append("circle")
          .attr('id', (d: any) => { return `${d.id}_${scheduleList[r].phase_id}${d.project_id}_outer` })
          .attr("cx", xdr(r))
          .attr("cy", (d: any) => {
            let ydname: any = y(d.id);
            return ydname;
          })
          .attr("r", radius + 0.5)
          .style("fill", 'white')
          .style('opacity', 0)
          .on("click", (d: any) => {            
            setOpenPiney(false)
            let searchTextId2 = d3.event.target.id.slice(0, -6);
            let actualNumber = d3.selectAll(`#${searchTextId2}_text`).text();
            console.log(d)
            setPopUpData({
              project_name: d.rowLabel,
              phase: scheduleList[r].phase,
              project_type: d.project_type,
              phase_id: scheduleList[r].phase_id,
              project_id: d.project_id,
              d3_pos: searchTextId2,
              d3_text: actualNumber,
              mhfd: d.mhfd,
              estimated_cost: d.estimated_cost
            })
            setOpenPiney(true)
          })
          .on("mousemove", (d: any) => {
            let popupVisible: any = document.getElementById('popup-phaseview');
            setGrapphicOpen(true);
            let searchTextId2 = d3.event.target.id.slice(0, -6);
            let actualNumber = d3.selectAll(`#${searchTextId2}_text`).text();
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
    }
  }
  const removeAllChildNodes = (parent: any) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };
  useEffect(() => {

    if (Object.keys(rawData).length > 0) {
      rawData.map((elem: any, index: number) => (
        removeAllChildNodes(document.getElementById(`dotchart_${elem.id}`))
      ));
    }
    // setTimeout(() => {
    //   for (let index = 0; index < completeData.length; index++) {
    //     if (openTable[index]) {
    //       if (Object.keys(completeData1).length > 0) {
    //         phaseChart(completeData1, index);
    //       } else {
    //         phaseChart(completeData, index);
    //       }
    //     }
    //   }
    // }, 210);
    for (let index = 0; index < rawData.length; index++) {
      phaseChart(rawData, index);
    }
  }, [updatePhaseList, rawData, indexParent, windowWidth]);


  useEffect(() => {
    let z = []
    datasets.postData(`${SERVER.PHASE_TYPE}`, { tabKey: tabKey })
      .then((rows) => {  
        setPhaseList(rows)  
        let counter = 0;
        z = rows.map((x: any) => {
          counter++;
          return (
            {
              categoryNo: counter,
              from: moment('2023/11/21 00:00:00'),
              to: moment('2023/12/30 00:00:00'),
              status: x?.code_status_type?.status_name,
              name: x.phase_name,
              phase: x.phase_name,
              tasks: x.code_rule_action_items.length,
              phase_id: x.code_phase_type_id,             
              tasksData: x.code_rule_action_items
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
    console.log(tabKey)
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
    <div className="phaseview-body">
      {openPiney && (
        <div className="piney-text">
          <PineyView setOpenPiney={setOpenPiney} data={popUpData} userName={userName} setUpdateAction={setUpdateAction} updateAction={updateAction}/>
        </div>
      )}
      <div className="phaseview-content">
        <div
          className="header-title"
          ref={headerRef}
          onScrollCapture={(e: any) => {
            if(phaseRef.current && indexParent && phaseRef.current){
              let dr: any = phaseRef.current;
              let dr1: any = headerRef.current;
              if (searchRef.current[indexParent] && phaseRef.current) {
                phaseRef.current.scrollTo(dr1.scrollLeft, dr.scrollTop);
              }
            }
          }}
        >
          <div className="phaseview-title-label" style={{ width: totalLabelWidth, paddingRight:'13px' }} id="phaseviewTitlleWidth">
            {/* <p style={{ border: 'transparent' }} className='border-transparent'>Draft</p>
            <p>Requested</p> */}
            {/* <p style={{ border: 'transparent' }}  className='border-transparent'>Approved</p>
            <p style={{ display: 'flex', width: '46.15384615384615%' }}>
              <hr className="hr2"></hr>Active<hr className="hr2"></hr>
            </p>
            <p style={{ display: 'flex', width: '38.46153846153846%' }}>
              <hr></hr>Closeout<hr></hr>
            </p>
            <p>Closed</p> */}
            {/*TO DO: Dotty*/}
            {availableStatusList.map((item: any, index: number) => {
              // console.log('item', item)
              return <p style={index === 0 ? { display: 'flex', width: item[1] , border: 'transparent'}:{ display: 'flex', width: item[1] }}>
                <hr className="hr2" style={{width:item[1]/2 - 48}}></hr>{item[0]}<hr className="hr2" style={{width:item[1]/2 - 48}}></hr>
              </p>
            })}
          </div>
          <div style={{ width: totalLabelWidth, paddingRight:'13px' }} className="phaseview-title" id="phaseviewTitlleWidth">
            {/* <p>Draft</p>
            <p>
              Work Request
              <br />
              (WR)
            </p> */}
            {phaseList.map((item: any) => {
              return <p style={{ width: labelWidth }}>{item.phase_name}</p>
            })}
          </div>
        </div>
        <div className="header-timeline" style={{borderTop: '1px solid #d4d2d9', width: '100%'}}></div>
          <div
            // style={{ width: totalLabelWidth }}
            className="container-timeline"           
            ref={el => phaseRef.current = el}
            style={{paddingLeft:'5px'}}
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
            {completeData.map((elem: any, index: number) => (
              <div>
                <div className="phaseview-timeline" style={{ width: totalLabelWidth }}>
                  <div id={`dotchart_${elem.id}`}></div>
                </div>
                {lengthData - 1 === index ? '' : <div className="header-timeline" style={{ width: totalLabelWidth}}></div>}
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default PhaseView;