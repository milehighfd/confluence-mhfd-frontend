import React, { useMemo } from 'react';
import * as d3Scale from 'd3-scale';
import { VALUE_GRAPH, LINE } from '../../../constants/constants';

export default () => {
  const xScale = d3Scale.scaleLinear()
    .domain([0, 100])
    .range([10, 320]);

  const bars = (item: { value: number, name: string }, y: number) => {
    return <g key={y}>
      <text key={"bar-text-title" + y} className="text-font-title" y={y + 15} x="10">{item.name}</text>
      <rect key={"bar-yellow" + y} width={xScale(100) - 10} y={y + 20} x="10" height="20" style={{ fill: "#fac774" }}> </rect>
      <rect key={"bar-green" + y} width={xScale(item.value) - 10} y={y + 20} x="10" height="20" style={{ fill: "#29c499" }}> </rect>
      <text key={"bar-text-title-percentage" + y} className="text-font-percentage" y={y + 35} x={item.value !== 100 ? 285 : 277} >{item.value + '% '}</text>
    </g>
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
          <g key={value} transform={`translate(${xOffset}, 0)`} >
            <text key={value} style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(20px)"
            }}> {value}
            </text>
          </g>
        ))}
      </svg>
    )
  }
  const line = (size: number, value: number) => {
    return <g key={value} className="tick" opacity="1" transform={"translate(" + xScale(value) + ",0)"}>
      <line key={"line-key" + value} className="line" stroke="currentColor" y2={size}></line>
      <text key={"line-text" + value} fill="currentColor" y="3" dy="0.71em"></text>
    </g>
  }
  return <>
      <div style={{ height: "240px", width: "304", overflowY: "auto" , maxHeight: "240px"}} id="graph">
        <svg key="bars" height={VALUE_GRAPH.length * 60} width={"320"}>
          <g>
            {VALUE_GRAPH.map((item: { value: number, name: string }, index: number) => {
              return bars(item, (index * 60))
            })}
          </g>
          <g>
            {LINE.map((value: number) => {
              return line(VALUE_GRAPH.length * 60, value)
            })}
          </g>
        </svg>

      </div>
      <div style={{ height: "40px", width: "320" }}>
        {Axis()}
      </div>

  </>
}