import React, { useEffect, useState } from "react";
import * as d3 from 'd3';
import { dataDot, colorScale } from "../constants/PhaseViewData";
import { Button, Col, Input, Layout, message, Popover, Row, Select, Space, Steps, Table, Tabs, Tag } from 'antd';

const { Step } = Steps;

const PhaseView = ({openTable}:{openTable:boolean[]}) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  useEffect(() => {
    var margin = { top: -22, right: 30, bottom: -25, left: 10 },
      width = 1575 - margin.left - margin.right,
      height = 265 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let datas = dataDot;

    let arrayForCirclesAndLines = [];
    for (var i = 0; i < datas[0].data.length; i++) {
      arrayForCirclesAndLines.push(i);
    }

    // Add X axis
    var x = d3.scaleLinear().domain([0, 16]).range([margin.left, width]);
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
          .attr("stroke-width", "2.5px");
      }
    });
    const radius = 12;
    arrayForCirclesAndLines.forEach((r) => {
      let circles = svg.selectAll("mycircle").data(datas).enter();

      circles
        .append("circle")
        .attr("cx", xdr(r))
        .attr("cy", (d: any) => {
          let ydname: any = y(d.name);
        return ydname;
        })
        .attr("r", radius)
        .style("fill", function (d) {
          return colorScale[d.data[r].status];
        });
      circles
        .append("circle")
        .attr("cx", xdr(r))
        .attr("cy", (d: any) => {
          let ydname: any = y(d.name);
        return ydname;
        })
        .attr("r", radius - 1)
        .style("fill", function (d) {
          return "white";
        });
      circles
        .append("circle")
        .attr("cx", xdr(r))
        .attr("cy", (d: any) => {
          let ydname: any = y(d.name);
        return ydname;
        })
        .attr("r", radius - 3)
        .style("fill", function (d) {
          return colorScale[d.data[r].status];
        });
      svg
        .selectAll("myText")
        .data(datas)
        .enter()
        .append("text")
        .attr("class", "circletext")
        .attr('fill', '#ffffff')
        .attr('font-size', 11)
        .text(function (d) {
          return d.data[r].value;
        })
        .attr("x", function (d) {
          const offset =
            +d.data[r].value > 9 ? xdr(r) - radius / 2 : xdr(r) - radius / 4;
          return offset;
        })
        .attr("y", (d: any) => {
          let ydname: any = y(d.name);
          return ydname + radius / 3;
        });
    });
  }, [openTable]);
  
  return <div className="phaseview-body">
    <div className="phaseview-content">
      <div className="phaseview-title">
        <p>Draft</p>
        <p>Work Request (WR)</p>
        <p>Work Plan (WP)</p>
        <p>Startup</p>
        <p>Funding</p>
        <p>Consultant Procurement</p>
        <p>Conceptual Design</p>
        <p>Preliminary Design</p>
        <p>Final Design</p>
        <p>Construction Contracting</p>
        <p>Construction</p>
        <p>Documenta tion</p>
        <p>Establishment</p>
        <p>Closeout</p>
        <p>Closed</p>
      </div>
      <div className="container-timeline">
      <div className="header-timeline"></div>
      <div className="phaseview-timeline" style={!openTable[0] ? {paddingBottom:'6px'}:{}}>
        {openTable[0] && <>
         <div id="my_dataviz"></div>
      </>}
      </div>
      <div className="header-timeline"></div>
        <div className="phaseview-timeline"  style={!openTable[0] ? {paddingBottom:'6px'}:{}}>
          {openTable[1] && <><Steps>
            <Step status="finish" icon={<span className="border-active"><span className="active">3</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">9</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">4</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">8</span></span>}/>
            <Step status="process" icon={<span className="border-final"><span className="final">6</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">13</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
          </Steps>
          <Steps>
            <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">15</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">4</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">7</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
            <Step status="finish" icon={<span className="border-final"><span className="final">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">20</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">6</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
            </Steps></>}
        </div>
        <div className="header-timeline"></div>
        <div className="phaseview-timeline" style={!openTable[0] ? {paddingBottom:'6px'}:{}}>
          {openTable[2] && <><Steps>
            <Step status="finish" icon={<span className="border-active"><span className="active">3</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">9</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">4</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">8</span></span>}/>
            <Step status="process" icon={<span className="border-final"><span className="final">6</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">13</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
          </Steps>
          <Steps>
            <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">15</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">4</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">7</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
            <Step status="finish" icon={<span className="border-final"><span className="final">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">20</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">6</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
          </Steps>
          <Steps>
            <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">15</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">4</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">7</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
            <Step status="finish" icon={<span className="border-final"><span className="final">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">20</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">6</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
            </Steps></>}
        </div>
      </div>
    </div>
  </div>
};

export default PhaseView;