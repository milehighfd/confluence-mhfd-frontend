import React, { useState, useEffect } from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { DATA_SOLUTIONS } from "../constants";
import * as d3 from 'd3';
import { dataDot1,dataDot2, dataDot3,colorScale, rawData  } from "routes/portfolio-view/constants/PhaseViewData";
import ModalGraphic from "routes/portfolio-view/components/ModalGraphic";
import * as datasets from "../../../Config/datasets";
import { SERVER } from "Config/Server.config";
import moment from "moment";

const Roadmap = ({setOpenPiney,
   openPiney, 
   data, 
   setPopUpData,
   updateAction,
   setUpdateAction
  }:
  {setOpenPiney: React.Dispatch<React.SetStateAction<boolean>>,
     openPiney:boolean, 
     data:any, 
     setPopUpData: any
     updateAction:any,
     setUpdateAction: any
    }) => {
  const [timeOpen, setTimeOpen] = useState(true);
  const [phaseList, setPhaseList] = useState<any>([])
  const [statusCounter,setStatusCounter] = useState(0);
  const [scheduleList, setScheduleList] = useState<any>({})
  const [statusList, setStatusList] = useState<any>([])
  const [updatePhaseList, setUpdatePhaseList] = useState(false);
  const [actionsDone,setActionsDone] = useState<any>({})
  const [userBrowser, setUserBrowser] = useState<any>()
  
  const [dataModal,setDataModal] = useState<any>([]);
  const [availableStatusList, setAvailableStatusList] = useState<any>([])

  const windowWidth: any = window.innerWidth;
  const labelWidth = windowWidth > 2000 && windowWidth <= 2999 ? 150 : windowWidth >= 3001 && windowWidth <= 3999 ? 185 : 65;
  let totalLabelWidth = phaseList.length * labelWidth;

  const [graphicOpen, setGrapphicOpen] = useState(false);
  const [positionModalGraphic, setPositionModalGraphic]= useState({left: 500, top:500})
  const [svgStatePhase, setSvgStatePhase] = useState<any>();
  let heightDiv1  = document.getElementById(`testing1`)?.offsetHeight;
  let heightDiv2  = document.getElementById(`testing2`)?.offsetHeight;
  let heightDiv3  = document.getElementById(`testing3`)?.offsetHeight;
  let svg:any;

    // console.log(windowWidth);
    const marginLeft = (windowWidth>=3001 && windowWidth<=3999 ? 26:(windowWidth>=2550 && windowWidth<=3000 ? 20:(windowWidth>=2001 && windowWidth<=2549 ? 29:(windowWidth>=1450 && windowWidth<=2000 ? 16 :(windowWidth>=1199 && windowWidth<=1449 ? 17 :14)))))
    const marginRight = (windowWidth>=1900 && windowWidth<=2549 ? 30 : (windowWidth>=2550 && windowWidth<=3000 ? 32: (windowWidth>=3001 && windowWidth<=3999? 40:15)))
    const marginTop = (windowWidth>=3001 && windowWidth<=3999 ? -41:(windowWidth>=1900 && windowWidth<=2549 ? -20 : (windowWidth>=2550 && windowWidth<=3000 ? -35: -15.8)))
  
    const gradientLinesClass = (svgDefinitions:any)=>{
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
        .attr("id", "Active_notStarted")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0")
        .attr("y2", "0");
      ActivetoNotStarted.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", '#047CD7')
      ActivetoNotStarted.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", '#D4D2D9')
    
      let ActivetoDelayed = svgDefinitions.append("linearGradient");
      ActivetoDelayed
        .attr("id", "Active_delayed")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0")
        .attr("y2", "0");
      ActivetoDelayed.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", '#047CD7')
      ActivetoDelayed.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", '#F5575C')
    
      let delayedtoNotStarted = svgDefinitions.append("linearGradient");
      delayedtoNotStarted
        .attr("id", "delayed_notStarted")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0")
        .attr("y2", "0");
      delayedtoNotStarted.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", '#F5575C')
      delayedtoNotStarted.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", '#D4D2D9')  
    }
    
    const phaseChart = (dataDotchart: any) => {

     let dataDetailed = dataDotchart.filter((e:any) => e.specificId === 3);
     if (Object.keys(scheduleList).length > 0) {
    let margin = { top: marginTop, right: marginRight, bottom: -30, left: marginLeft };
    let width: any = totalLabelWidth//document.getElementById('phaseviewTitleDetailPage')?.offsetWidth;//= 1405 - margin.left - margin.right,
    let heightDiv: any;
      heightDiv  = document.getElementById(`ProjectRoadmapHeader`)?.offsetHeight; //265 - margin.top - margin.bottom;
      console.log('height div',heightDiv)
      let factorHeight = (windowWidth>=3001 && windowWidth<=3999 ? 10:0);
    let height: any  = factorHeight + heightDiv +40;
    let heightContainer: any = height + margin.top + margin.bottom;

    if (heightContainer>0){
  // append the svg object to the body of the page
   svg = d3
    .select(`#dotchart_detailPage`)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    //.attr("viewBox", `0 0 ${width + 50} ${height - 20}`)
    .append("g")
    .attr("transform", "translate("+margin.left+","+margin.top+")");
  
    setSvgStatePhase(svg);
  let datas = dataDotchart;

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
  console.log('dqqqqqqqqqqqqqqqs',datas)
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
        // .attr("stroke", (d: any) => {
        //   if(d.phaseId === scheduleList[r].code_phase_type_id){             
        //     return colorScale['Current'];
        //   }else if(d.project_status[r]?.is_done){
        //     return colorScale['Done'];
        //   }else{
        //     return colorScale['NotStarted'];
        //   }
        //   // let colorstroke: any = colorScale[(scheduleList[r].status)];
        //   // if(d.phaseId === scheduleList[r].code_phase_type_id){
        //   //   z1 = false;
        //   //   colorstroke = colorScale['Current'];
        //   // }else if(z1){
        //   //   colorstroke = colorScale['Done'];
        //   // }else{
        //   //   colorstroke = colorScale['NotStarted'];
        //   // }           
        //   // return colorstroke;
        // })
        .attr("stroke", function (d: any) {
          console.log('inside sche',d)
          let indexStatus;
          scheduleList.forEach((element:any, index:number) => {
            console.log('inside con', element.code_phase_type_id)
            if(d.phaseId === element.code_phase_type_id){
              indexStatus = index;
            }
          });
          if(indexStatus === r){             
            return `url(#Current_NotStarted)`;
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
        .attr("stroke-width", "2.5px");
    }
  });
  const radius = (windowWidth>=3001 && windowWidth<=3999 ? 24 : (windowWidth>=2001 && windowWidth<=2549 ? 14 : (windowWidth>=2550 && windowWidth<=3000 ? 20: (windowWidth>=1450 && windowWidth<=2000 ? 15 :(windowWidth>=1199 && windowWidth<=1449 ? 12 :12)))));
  let circles = svg.selectAll("mycircle").data(datas).enter();
  arrayForCirclesAndLines.forEach((r) => {
      circles
      .append("circle")
      .attr('id',(d: any) => {
        return `${d.id}_${(scheduleList[r].phase)}`;
      })
      .attr("cx", xdr(r))
      .attr("cy", (d: any) => {
        let ydname: any = y(d.id);
      return ydname;
      })
      .attr("r", radius)
      .style("fill", function (d: any) {  
        let indexStatus;
        scheduleList.forEach((element:any, index:number) => {
          if(d.phaseId === element.code_phase_type_id){
            indexStatus = index;
          }
        });
        if(indexStatus === r){             
          return colorScale['Current'];
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
    circles
      .append("circle")
      .attr("cx", xdr(r))
      .attr("cy", (d: any) => {
        let ydname: any = y(d.id);
      return ydname;
      })
      .attr("r", radius - 1)
      .style("fill", function (d:any) {
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
        let indexStatus;
        scheduleList.forEach((element:any, index:number) => {
          if(d.phaseId === element.code_phase_type_id){
            indexStatus = index;
          }
        });
        if(indexStatus === r){             
          return colorScale['Current'];
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

    svg
      .selectAll("myText")
      .data(datas)
      .enter()
      .append("text")
      .attr('id', (d: any) => { 
        return `${(d.view).replaceAll(' ','')}_${scheduleList[r].phase_id}${d.project_id}_text` })
        .attr('id2', (d: any) => { 
          return `${(d.view).replaceAll(' ','')}_${scheduleList[r].phase_id}${d.project_id}_text` })
      .attr("class", "circletext")
      .attr('fill', '#ffffff')
      .attr('font-size',(windowWidth>=3001 && windowWidth<=3999 ? 23 :(windowWidth>=2001 && windowWidth<=2549 ? 18 : (windowWidth>=2550 && windowWidth<=3000 ? 21: (windowWidth>=1450 && windowWidth<=2000 ? 16 :(windowWidth>=1199 && windowWidth<=1449 ? 11 :11))))))
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
        let ydname: any = y(d.id);
        return ydname + radius / 3;
      });

      circles
          .append("circle")
          .attr('id', (d: any) => { console.log('qweqwe', d); return `${(d.view).replaceAll(' ','')}_${scheduleList[r].phase_id}${d.project_id}_outer` })
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
            console.log('qqqqqqqqqqqq',searchTextId2, d3.event.target)
            console.log(d3.select(`#${searchTextId2.replaceAll(' ','')}_text`))
            let actualNumber = d3.selectAll(`#${searchTextId2.replaceAll(' ','')}_text`).text();
            console.log('wwwwwwwwwww', actualNumber)
            const lenghtSc = Object.keys(scheduleList[r].tasksData).length
            const phaseSc = (scheduleList[r].phase)   
            const phaseId = (scheduleList[r].phase_id)              
            const sendModal = { d, actualNumber: actualNumber, scheduleList: lenghtSc, schedulePhase: phaseSc, phase_id: phaseId }
            setDataModal(sendModal);      
            if (popupVisible !== null) {
              let popupfactorTop = (windowWidth >= 3001 && windowWidth <= 3999 ? 225 : 
                (windowWidth >= 2550 && windowWidth <= 3000 ? 185 : 
                  (windowWidth >= 2001 && windowWidth <= 2549 ? 160 : 
                    (windowWidth >= 1450 && windowWidth <= 2000 ? 170 : 
                      (windowWidth >= 1199 && windowWidth <= 1449 ? 160 : 140)))))
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
              let popupfactorLeft = (windowWidth >= 3001 && windowWidth <= 3999 ? 875 : 
                (windowWidth >= 2550 && windowWidth <= 3000 ? 575 : 
                  (windowWidth >= 2001 && windowWidth <= 2549 ? 60 : 
                    (windowWidth >= 1450 && windowWidth <= 2000 ? 185 : 
                      (windowWidth >= 1199 && windowWidth <= 1449 ? 70 : 345)))))
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
            // setGrapphicOpen(false);
            // setPositionModalGraphic({ left: 10000, top: 10000 })
            // d3.select(`#${d3.event.target.id.slice(0, -6)}`).style('fill', function (d: any) {
            //   return colorScale[d.schedule[r].status];
            // });
            // let searchTextId = d3.event.target.id.substring(0, d3.event.target.id.indexOf('_'));
            // d3.select(`#${searchTextId}`).style('background-color', 'white');
            // d3.select(`#${searchTextId}`).style('text-decoration','none');
          })
      ;
  })
  }}
  }
  useEffect(() => {
    if(data.length>0){
      phaseChart(data);
    }  
  }, [data,scheduleList]);

  useEffect(() => {
    let z = []
    let typeProject;
    if(data.length > 0){

      console.log('dataaaaaaaaaaaaa', data )
      typeProject =data[0].code_project_type_id
    datasets.postData(`${SERVER.PHASE_TYPE}`, { tabKey: typeProject })
      .then((rows) => {  
        setPhaseList(rows)  
        setStatusCounter(rows.length)
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
    }
  }, [actionsDone,data])

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
  }, [data?.code_project_type_id,updateAction])


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


//   useEffect(() => {
//       const removeAllChildNodes = (parent: any) => {
//         while (parent.firstChild) {
//           parent.removeChild(parent.firstChild);
//         }
//       };
//       for (let index = 0; index < 3; index++) {
//         const chart = document.getElementById(`dotchart_${index+1}_detailPage`);
//           removeAllChildNodes(chart);
//       }
//           phaseChart(dataDot1);


// }, [ windowWidth]);

  return (
    <>
    {graphicOpen && <ModalGraphic positionModalGraphic={positionModalGraphic} dataProject={dataModal}/>}
      <Row id='ProjectRoadmapHeader'>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{display:'flex', alignItems:'center'}} className='subtitle-detail'>
          <h3 style={{marginBottom:'15px', marginTop:'20px', marginRight:'35px'}} id="project-roadmap">PROJECT ROADMAP</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px', width:'75%'}}></div>
        </Col>
      </Row>
      <Row>
      <div className="phaseview-content">
        <div className="phaseview-title-label-roadmap" id='phaseviewTitleDetailPage'>
        {availableStatusList.map((item: any, index: number) => {
              // console.log('item', item)
              return <p style={index === 0 ? { display: 'flex', width: item[1] , border: 'transparent'}:{ display: 'flex', width: item[1] }}>
                <hr className="hr2" style={{width:item[1]/2 - 48}}></hr>{item[0]}<hr className="hr2" style={{width:item[1]/2 - 48}}></hr>
              </p>
            })}
        </div>
          <div id='dotchart_detailPage' ></div>
          {/* <img src="/picture/calendar.png" width='100%' onClick={()=>{setOpenPiney(true)}}/> */}
        <div className="phaseview-title" id='phaseviewTitleDetailPage'>
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
        <div style={{textAlign:'center', paddingTop:'10px'}}>
        <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#5E5FE2'}}/>
                  <span style={{marginLeft:'1px', marginRight:'15px'}}>Done</span>
                </span>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#047CD7'}}/>
                  <span style={{marginLeft:'1px', marginRight:'15px'}}>Current</span>
                </span>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#D4D2D9'}}/>
                  <span style={{marginLeft:'1px', marginRight:'15px'}}>Not Started</span>
                </span>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#F5575C'}}/>
                  <span style={{marginLeft:'1px', marginRight:'15px'}}>Overdue</span>
                </span>
        </div>
      </div>
      </Row>
      <Row style={{opacity:'0.5'}}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{display:'flex', alignItems:'center'}}>
          <h3 style={{marginBottom:'15px', marginTop:'20px', marginRight:'35px'}} id="graphical-view">GRAPHICAL VIEW</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px', width:'77%'}}></div>
        </Col>
      </Row>
      <Row style={{opacity:'0.5'}}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="roadmap-detail-modal">
          <div style={{color: '#11093C'}}>
            <span className={timeOpen ? "span-roadmap-active" :"span-roadmap"} onClick={()=>{setTimeOpen(true)}}>
              By Time</span> | <span className={!timeOpen ? "span-roadmap-active" :"span-roadmap"} onClick={()=>{setTimeOpen(false)}}>By Phase</span>
          </div>
          {timeOpen ? (
            <>
              <img src="/picture/time-graft.png" width='100%'/>
            </>
            
          ): (<img src="/picture/phase.png" width='100%'/>)}
        </Col>
      </Row>
    </>
  )
}

export default Roadmap;