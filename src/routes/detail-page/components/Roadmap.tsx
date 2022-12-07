import React, { useState, useEffect } from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { DATA_SOLUTIONS } from "../constants";
import * as d3 from 'd3';
import { dataDot1,dataDot2, dataDot3,colorScale  } from "routes/portfolio-view/constants/PhaseViewData";
import ModalGraphic from "routes/portfolio-view/components/ModalGraphic";


const Roadmap = ({setOpenPiney, openPiney}:{setOpenPiney: React.Dispatch<React.SetStateAction<boolean>>, openPiney:boolean}) => {
  const [timeOpen, setTimeOpen] = useState(true);

  const windowWidth: any = window.innerWidth;

  const [graphicOpen, setGrapphicOpen] = useState(false);
  const [positionModalGraphic, setPositionModalGraphic]= useState({left: 500, top:500})
  const [svgStatePhase, setSvgStatePhase] = useState<any>();
  let heightDiv1  = document.getElementById(`testing1`)?.offsetHeight;
  let heightDiv2  = document.getElementById(`testing2`)?.offsetHeight;
  let heightDiv3  = document.getElementById(`testing3`)?.offsetHeight;
  let svg:any;

    // console.log(windowWidth);
    const marginLeft = (windowWidth>=3001 && windowWidth<=3999 ? 26:(windowWidth>=2550 && windowWidth<=3000 ? 20:(windowWidth>=2001 && windowWidth<=2549 ? 29:(windowWidth>=1450 && windowWidth<=2000 ? 16 :(windowWidth>=1199 && windowWidth<=1449 ? 14 :14)))))
    const marginRight = (windowWidth>=1900 && windowWidth<=2549 ? 15 : (windowWidth>=2550 && windowWidth<=3999 ? 19: 13) )
    const marginTop = (windowWidth>=3001 && windowWidth<=3999 ? -41:(windowWidth>=1900 && windowWidth<=2549 ? -25 : (windowWidth>=2550 && windowWidth<=3000 ? -31: -15.8)))
  
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
        .attr("id", "Completed_Delayed")
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
        .attr("id", "Active_NotStarted")
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
        .attr("id", "Active_Delayed")
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
        .attr("id", "Delayed_NotStarted")
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

    let margin = { top: marginTop, right: marginRight, bottom: -26, left: marginLeft };
    let width: any = document.getElementById('phaseviewTitleDetailPage')?.offsetWidth;//= 1405 - margin.left - margin.right,
    let heightDiv: any;
      heightDiv  = document.getElementById(`ProjectRoadmapHeader`)?.offsetHeight; //265 - margin.top - margin.bottom;
      console.log('height div',heightDiv)
      let factorHeight = (windowWidth>=3001 && windowWidth<=3999 ? 10:0);
    let height: any  = factorHeight + heightDiv +30;
  // append the svg object to the body of the page
   svg = d3
    .select(`#dotchart_${dataDotchart[0].id}_detailPage`)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    //.attr("viewBox", `0 0 ${width + 50} ${height - 20}`)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    setSvgStatePhase(svg);
  let datas = dataDetailed;

  let arrayForCirclesAndLines = [];
  for (var i = 0; i < datas[0].data.length; i++) {
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
        return d.name;
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
            let ydname: any = y(d.name);
          return ydname;
        })
        .attr("height", 2)
        .attr("stroke", (d: any) => {
          let colorstroke: any = colorScale[d.data[r].status];
          return colorstroke;
        })
        .attr("stroke", function(d: any) {      
          let currentStatus = d.data[r].status.replace(/\s+/g, '');
          let nextStatus = d.data[r+1].status.replace(/\s+/g, '');
          //console.log(currentStatus, nextStatus)
          return ( 
            (currentStatus === nextStatus) ?
          colorScale[d.data[r].status]
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
      return `${d.jurisdiction}${d.specificId}_${d.data[r].phase}_detailPage`;
      })
      .attr("cx", xdr(r))
      .attr("cy", (d: any) => {
        let ydname: any = y(d.name);
      return ydname;
      })
      .attr("r", radius)
      .style("fill", function (d: any) {
        return colorScale[d.data[r].status];
      })
    circles
      .append("circle")
      .attr("cx", xdr(r))
      .attr("cy", (d: any) => {
        let ydname: any = y(d.name);
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
        let ydname: any = y(d.name);
      return ydname;
      })
      .attr("r", radius - 3)
      .style("fill", function (d: any) {
        return colorScale[d.data[r].status];
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
        return d.data[r].tasks;
      })
      .attr("x", function (d: any) {
        const factorCenter:any = (windowWidth>=2001 && windowWidth<=2549 ? 18 : (windowWidth>=2550 && windowWidth<=3999 ? 1.65: (windowWidth>=1450 && windowWidth<=2000 ? 1.7 :(windowWidth>=1199 && windowWidth<=1449 ? 2 :2))))
        const offset =
          +d.data[r].tasks > 9 ? xdr(r) - radius / factorCenter : xdr(r) - radius / 4;
        return offset;
      })
      .attr("y", (d: any) => {
        let ydname: any = y(d.name);
        return ydname + radius / 3;
      })

      ;
      circles
      .append("circle")
      .attr('id', (d:any)=>{ return `${d.jurisdiction}${d.specificId}_${d.data[r].phase}_detailPage_outer`})
      .attr("cx", xdr(r))
      .attr("cy", (d: any) => {
        let ydname: any = y(d.name);
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
          console.log(d3.event)
        let popupfactorTop = (windowWidth>=3001 && windowWidth<=3999 ? 210:(windowWidth>=2550 && windowWidth<=3000 ? 170:(windowWidth>=2001 && windowWidth<=2549 ? 60:(windowWidth>=1450 && windowWidth<=2000 ?150:(windowWidth>=1199 && windowWidth<=1449?100:100)))))
        let popupfactorLeft = (windowWidth>=3001 && windowWidth<=3999 ? 875:(windowWidth>=2550 && windowWidth<=3000 ? 575:(windowWidth>=2001 && windowWidth<=2549 ? 60:(windowWidth>=1450 && windowWidth<=2000 ?445:(windowWidth>=1199 && windowWidth<=1449?600:600)))))
        let widthOfPopup: any =document.getElementById('popup-phaseview')?.offsetWidth;
        let heightOfPopup: any =document.getElementById('popup-phaseview')?.offsetHeight;
        //let heightOfPopup: any =document.getElementById('popup-phaseview')?.offsetHeight;
        let positionTop: any=d3.event.pageY-heightOfPopup -20;
        let positionLeft: any=d3.event.pageX - widthOfPopup/2 ;
        setPositionModalGraphic({left: positionLeft,top:positionTop})
        //d3.selectAll('.text-search:hover').attr('text-search');
        d3.select(`#${d3.event.target.id.slice(0, -6)}`).style('fill', '#454150');
       }
      })
      .on("mouseout",(d: any) =>{
        setGrapphicOpen(false);
        setPositionModalGraphic({left: 10000,top:10000})
        d3.select(`#${d3.event.target.id.slice(0, -6)}`).style('fill', function (d: any) {
          return colorScale[d.data[r].status];
        });
      })
      ;
  });
  }
  useEffect(() => {

      phaseChart(dataDot1);
  }, []);

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
    {graphicOpen && <ModalGraphic positionModalGraphic={positionModalGraphic}/>}
      <Row id='ProjectRoadmapHeader'>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <h3 style={{marginBottom:'15px', marginTop:'20px'}} id="project-roadmap">PROJECT ROADMAP</h3>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 16 }} style={{alignSelf: 'center'}}>
          <div className="line-01"></div>
        </Col>
      </Row>
      <Row>
      <div className="phaseview-content">
        <div className="phaseview-title-label" id='phaseviewTitleDetailPage' style={{marginBottom:'10px'}}>
          <p style={{border:'transparent'}}>DRAFT</p>
          <p>REQUESTED</p>
          <p>APPROVED</p>
          <p style={{display:'flex', width:'40%'}}><hr className='hr2'></hr>ACTIVE<hr></hr></p>
          <p style={{display:'flex', width:'33.33333335%'}}><hr ></hr>CLOSEOUT<hr></hr></p>
          <p>CLOSED</p>
        </div>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="roadmap-detail-modal">
          <div id="dotchart_1_detailPage" ></div>
          {/* <img src="/picture/calendar.png" width='100%' onClick={()=>{setOpenPiney(true)}}/> */}
        </Col>
        <div className="phaseview-title" id='phaseviewTitleDetailPage'>
          <p>Draft</p>
          <p>Work Request<br/>(WR)</p>
          <p>Work Plan<br/>(WP)</p>
          <p>Startup</p>
          <p>Funding</p>
          <p>Consultant Procurement</p>
          <p>Conceptual Design</p>
          <p>Preliminary<br/>Design</p>
          <p>Final<br/>Design</p>
          <p>Construction Contracting</p>
          <p>Construction</p>
          {windowWidth>=1199 && windowWidth<=1449 ? <p>Documen-<br/>tation</p>: <p>Documentation</p>}
          <p>Establishment</p>
          <p>Closeout</p>
          <p>Closed</p>
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
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <h3 style={{marginBottom:'15px', marginTop:'20px'}} id="graphical-view">GRAPHICAL VIEW</h3>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 16 }} style={{alignSelf: 'center'}}>
          <div className="line-01"></div>
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