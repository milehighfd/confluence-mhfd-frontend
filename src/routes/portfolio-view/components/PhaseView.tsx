import React, { useEffect, useState } from "react";
import * as d3 from 'd3';
import { dataDot1, dataDot2, dataDot3,colorScale } from "../constants/PhaseViewData";
import { Button, Col, Input, Layout, message, Popover, Progress, Checkbox, Row, Select, Space, Steps, Table, Tabs, Tag } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, CloseOutlined, FormOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import PineyView from "./PineyView";
import ModalGraphic from "./ModalGraphic";

const { Step } = Steps;

const PhaseView = (
  {rawData,openTable, phaseRef, searchRef, graphicOpen, setGrapphicOpen, positionModalGraphic,setPositionModalGraphic}
  :{
    rawData:any,
    openTable:boolean[],
    phaseRef:React.MutableRefObject<HTMLDivElement | null>,
    searchRef:React.MutableRefObject<HTMLDivElement | null>,
    graphicOpen:boolean,
    setGrapphicOpen:React.Dispatch<React.SetStateAction<boolean>>,
    positionModalGraphic:{
      left: number;
      top: number;
  }
    setPositionModalGraphic:React.Dispatch<React.SetStateAction<{
      left: number;
      top: number;
  }>>;
      }) => {
  const [current, setCurrent] = useState(0);
  // const [graphicOpen, setGrapphicOpen] = useState(false);
  // const [positionModalGraphic, setPositionModalGraphic]= useState({left: 152, top:75})
  const [openPiney, setOpenPiney] = useState(false);
  const windowWidth: any = window.innerWidth;
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const [svgStatePhase, setSvgStatePhase] = useState<any>();
  let heightDiv1  = document.getElementById(`testing1`)?.offsetHeight;
  let heightDiv2  = document.getElementById(`testing2`)?.offsetHeight;
  let heightDiv3  = document.getElementById(`testing3`)?.offsetHeight;
  let svg:any;

    // console.log(windowWidth);
    const marginLeft = (windowWidth>=3001 && windowWidth<=3999 ? 55:(windowWidth>=2550 && windowWidth<=3000 ? 37.5:(windowWidth>=2001 && windowWidth<=2549 ? 29:(windowWidth>=1450 && windowWidth<=2000 ? 28 :(windowWidth>=1199 && windowWidth<=1449 ? 20 :20)))))
    const marginRight = (windowWidth>=1900 && windowWidth<=2549 ? 30 : (windowWidth>=2550 && windowWidth<=3999 ? 40: 20) )
    const marginTop = (windowWidth>=3001 && windowWidth<=3999 ? -41:(windowWidth>=1900 && windowWidth<=2549 ? -27 : (windowWidth>=2550 && windowWidth<=3000 ? -31: -22)))
    const marginBottom = (windowWidth>=2550 && windowWidth<=3000 ? -43:(windowWidth>=1900 && windowWidth<=2549 ? -35 :-26))

    const sortedData = rawData.filter((elem: any) => elem.id.includes('Title'));
    const completeData = sortedData.map((elem: any) => {
      return {
        ...elem,
        values: rawData.filter((elemRaw: any) => !elemRaw.id.includes('Title') && elemRaw.headerLabel === elem.headerLabel)
      }
    });
    const lengthData = completeData.length;
    const gradientLinesClass = (svgDefinitions:any)=>{
      let completedtoActive = svgDefinitions.append("linearGradient");
      completedtoActive
        .attr("id", "completed_active")
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
        .attr("id", "completed_delayed")
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
        .attr("id", "active_notStarted")
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
        .attr("id", "active_delayed")
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
    
   const phaseChart = (dataDotchart: any, index:number) => {
    

    let margin = { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft };
    let width: any = document.getElementById('phaseviewTitlleWidth')?.offsetWidth;//= 1405 - margin.left - margin.right,
    let heightDiv: any;
      heightDiv  = document.getElementById(`${dataDotchart[index].id}`)?.offsetHeight; //265 - margin.top - margin.bottom;
      let factorHeight = (windowWidth>=3001 && windowWidth<=3999 ? 10:0);
    let height: any  = factorHeight + heightDiv +3;
  // append the svg object to the body of the page
   svg = d3
    .select(`#dotchart_${dataDotchart[index].id}`)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    //.attr("viewBox", `0 0 ${width + 50} ${height - 20}`)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    setSvgStatePhase(svg);
    //dataDotchart =dataDotchart[0].values
  let datas = dataDotchart[index].values;
  let arrayForCirclesAndLines = [];
  for (var i = 0; i < datas[0].schedule.length; i++) {
    arrayForCirclesAndLines.push(i);
  }

  let svgDefinitions = svg.append("defs");
  svg.selectAll("defs")
      .data(datas)
      .enter()

      gradientLinesClass(svgDefinitions)

  // Add X axis
  var x = d3.scaleLinear().domain([0, 15]).range([margin.left, width +margin.right]);
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
          let colorstroke: any = colorScale[d.schedule[r].status];
          return colorstroke;
        })
        .attr("stroke", function(d: any) {      
          let currentStatus = d.schedule[r].status.replace(/\s+/g, '');
          let nextStatus = d.schedule[r+1].status.replace(/\s+/g, '');
          return ( 
            (currentStatus === nextStatus) ?
          colorScale[d.schedule[r].status]
          : (`url(#${currentStatus}_${nextStatus})`))
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
      return `${d.id}_${d.schedule[r].phase}`;
      })
      .attr("cx", xdr(r))
      .attr("cy", (d: any) => {
        let ydname: any = y(d.id);
      return ydname;
      })
      .attr("r", radius)
      .style("fill", function (d: any) {
        return colorScale[d.schedule[r].status];
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
        return colorScale[d.schedule[r].status];
      })

    svg
      .selectAll("myText")
      .data(datas)
      .enter()
      .append("text")
      .attr("class", "circletext")
      .attr('fill', '#ffffff')
      .attr('font-size',(windowWidth>=3001 && windowWidth<=3999 ? 23 :(windowWidth>=2001 && windowWidth<=2549 ? 18 : (windowWidth>=2550 && windowWidth<=3000 ? 21: (windowWidth>=1450 && windowWidth<=2000 ? 16 :(windowWidth>=1199 && windowWidth<=1449 ? 11 :11))))))
      .text(function (d: any) {
        return d.schedule[r].tasks;
      })
      .attr("x", function (d: any) {
        const factorCenter:any = (windowWidth>=2001 && windowWidth<=2549 ? 18 : (windowWidth>=2550 && windowWidth<=3999 ? 1.65: (windowWidth>=1450 && windowWidth<=2000 ? 1.7 :(windowWidth>=1199 && windowWidth<=1449 ? 2 :2))))
        const offset =
          +d.schedule[r].tasks > 9 ? xdr(r) - radius / factorCenter : xdr(r) - radius / 4;
        return offset;
      })
      .attr("y", (d: any) => {
        let ydname: any = y(d.id);
        return ydname + radius / 3;
      })

      ;
      circles
      .append("circle")
      .attr('id', (d:any)=>{ return `${d.id}_${d.schedule[r].phase}_outer`})
      .attr("cx", xdr(r))
      .attr("cy", (d: any) => {
        let ydname: any = y(d.id);
      return ydname;
      })
      .attr("r", radius+0.5)
      .style("fill", 'white')
      .style('opacity', 0)
      .on("click", (d: any) => setOpenPiney(true))
      .on("mousemove", (d: any) =>{
        let popupVisible:any =document.getElementById('popup-phaseview');
        setGrapphicOpen(true);
        if (popupVisible !== null){
        let popupfactorTop = (windowWidth>=3001 && windowWidth<=3999 ? 210:(windowWidth>=2550 && windowWidth<=3000 ? 170:(windowWidth>=2001 && windowWidth<=2549 ? 60:(windowWidth>=1450 && windowWidth<=2000 ?150:(windowWidth>=1199 && windowWidth<=1449?140:140)))))
        let popupfactorLeft = (windowWidth>=3001 && windowWidth<=3999 ? 875:(windowWidth>=2550 && windowWidth<=3000 ? 575:(windowWidth>=2001 && windowWidth<=2549 ? 60:(windowWidth>=1450 && windowWidth<=2000 ?445:(windowWidth>=1199 && windowWidth<=1449?345:345)))))
        let widthOfPopup: any =document.getElementById('popup-phaseview')?.offsetWidth;
        let heightOfPopup: any =document.getElementById('popup-phaseview')?.offsetHeight;
        //let heightOfPopup: any =document.getElementById('popup-phaseview')?.offsetHeight;
        let positionTop: any=d3.event.layerY-heightOfPopup+popupfactorTop;
        let positionLeft: any=d3.event.layerX - widthOfPopup/2 +popupfactorLeft;
        setPositionModalGraphic({left: positionLeft,top:positionTop})
        //d3.selectAll('.text-search:hover').attr('text-search');
        d3.select(`#${d3.event.target.id.slice(0, -6)}`).style('fill', '#454150');
        let searchTextId = d3.event.target.id.substring(0, d3.event.target.id.indexOf('_'));
        d3.select(`#${searchTextId}`).style('background-color','#fafafa');
       }
      })
      .on("mouseout",(d: any) =>{
        setGrapphicOpen(false);
        setPositionModalGraphic({left: 10000,top:10000})
        d3.select(`#${d3.event.target.id.slice(0, -6)}`).style('fill', function (d: any) {
          return colorScale[d.schedule[r].status];
        });
        let searchTextId = d3.event.target.id.substring(0, d3.event.target.id.indexOf('_'));
        d3.select(`#${searchTextId}`).style('background-color','white');
      })
      ;
  });
  }
  useEffect(() => {
    for (let index = 0; index < completeData.length; index++) {
      phaseChart(completeData,index);
    }
  }, []);

  useEffect(() => {
      const removeAllChildNodes = (parent: any) => {
        while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
        }
      };
      completeData.map((elem: any, index: number) => (
        removeAllChildNodes(document.getElementById(`dotchart_${elem.id}`))
      ));
      setTimeout(() => {
        for (let index = 0; index < completeData.length; index++) {
          if(openTable[index]){
            phaseChart(completeData,index);
          }
        }        
      }, 210);

}, [openTable, windowWidth]);

  
  return (
    <div className="phaseview-body">
      {openPiney && (
        <div className="piney-text">
          <PineyView setOpenPiney={setOpenPiney} />
        </div>
      )}
      <div className="phaseview-content">
        <div className="phaseview-title-label" id="phaseviewTitlleWidth">
          <p style={{ border: 'transparent' }}>Draft</p>
          <p>Requested</p>
          <p>Approved</p>
          <p style={{ display: 'flex', width: '40%' }}>
            <hr className="hr2"></hr>Active<hr></hr>
          </p>
          <p style={{ display: 'flex', width: '33.33333335%' }}>
            <hr></hr>Closeout<hr></hr>
          </p>
          <p>Closed</p>
        </div>
        <div className="phaseview-title" id="phaseviewTitlleWidth">
          <p>Draft</p>
          <p>
            Work Request
            <br />
            (WR)
          </p>
          <p>
            Work Plan
            <br />
            (WP)
          </p>
          <p>Startup</p>
          <p>Funding</p>
          <p>Consultant Procurement</p>
          <p>Conceptual Design</p>
          <p>
            Preliminary
            <br />
            Design
          </p>
          <p>
            Final
            <br />
            Design
          </p>
          <p>Construction Contracting</p>
          <p>Construction</p>
          {windowWidth >= 1199 && windowWidth <= 1449 ? (
            <p>
              Documen-
              <br />
              tation
            </p>
          ) : (
            <p>Documentation</p>
          )}
          <p>Establishment</p>
          <p>Closeout</p>
          <p>Closed</p>
        </div>
        <div className="header-timeline"></div>
        <div
            className="container-timeline"
            ref={phaseRef}
            onScroll={(e: any) => {
              let dr: any = phaseRef.current;
              if (searchRef.current) {
                searchRef.current.scrollTo(0, dr.scrollTop);
              }
            }}
          >
        {completeData.map((elem: any, index: number) => (
          <div>
            <div className="phaseview-timeline">
              <div id={`dotchart_${elem.id}`}></div>
            </div>
            {lengthData-1 ===index ?'': <div className="header-timeline"></div>}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default PhaseView;