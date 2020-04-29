import React, { useMemo } from 'react';
import * as d3Scale from 'd3-scale';
import { VALUE_GRAPH, LINE } from '../../constants/constants';


export default () => {
  const xScale = d3Scale.scaleLinear()
      .domain([0, 100])
      .range([10, 320])
  const bars = (item: {value: number, name: string}, y: number) => {
      return <>
        <text key={"bar-text-title" + y} className="text-font-title" y={y + 15} x="10">{item.name}</text>
        <rect key={"bar-yellow" + y} width={xScale(100) - 10} y={y + 20} x="10" height="20" style={{fill: "#fac774"}}> </rect>
        <rect key={"bar-green" + y} width={xScale(item.value) - 10} y={y + 20} x="10" height="20" style={{fill: "#29c499"}}> </rect>
        <text key={"bar-text-title-percentage" + y} className="text-font-percentage" y={y + 35} x={item.value !== 100 ? 285: 277} >{item.value + '% '}</text>
      </>
  }

  const line = (size: number, value: number) => {
    return <>
      <g className="tick" opacity="1" transform={"translate(" + xScale(value) + ",0)"}>
        <line key={"line-key" + value} className="line" stroke="currentColor" y2={size}></line>
        <text key={"line-text" + value} fill="currentColor" y="3" dy="0.71em"></text>
      </g>
    </>
    
}

  const Axis = () => {
    const ticks = useMemo(() => {
      return xScale.ticks()
        .map(value => ({
          value,
          xOffset: xScale(value)
        }))
    }, [])
    return (
      <svg key="axis" height={"40"} width={"100%"}>
        <path
          d=""
          stroke="currentColor"
        />
        {ticks.map(({ value, xOffset }) => (
          <g
            key={value}
            transform={`translate(${xOffset}, 0)`}
          >
            {/* <line
              y2="6"
              stroke="currentColor"
            /> */}
            <text
              key={value}
              style={{
                fontSize: "10px",
                textAnchor: "middle",
                transform: "translateY(20px)"
              }}>
              {value}
            </text>
          </g>
        ))}
      </svg>
    )
  }


  return <>
    <div className="work-pc">
      <div className="wp-chart">
        <h5>Requests by Jurisdiction <img src="/Icons/icon-19.svg" alt="" /></h5>
        <div style={{ height: "240px", width: "304", overflowY: "auto" }} id="graph">
          <svg key="bars" height={VALUE_GRAPH.length * 60} width={"320"}>
            {VALUE_GRAPH.map((item:{value: number, name: string}, index: number) => {
              return bars(item, (index * 60))
            })}
            {LINE.map((value:number) => {
              return line(VALUE_GRAPH.length * 60, value)
            })}
          </svg>
          
        </div>
        <div style={{ height: "40px", width: "320" }}>
          {Axis()}
        </div>
      </div>
      <div className="wp-chart">
        <h5>Distribution Across Jurisdictions <img src="/Icons/icon-19.svg" alt="" /></h5>
        <div style={{ height: "280px", width: "100%" }}>
          <svg key="donut" height={"280"} width={"100%"} >

          </svg>
        </div>
      </div>
    </div>
  </>


}