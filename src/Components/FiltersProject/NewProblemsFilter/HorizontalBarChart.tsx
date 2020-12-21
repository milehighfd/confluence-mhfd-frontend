import React, { useEffect, useRef } from 'react';

import * as d3 from 'd3';

const HorizontalBarChart = ({ data, selected, onSelect }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const labelmap: any = {
    0: '0 - 25%',
    25: '25 - 50%',
    50: '50 - 75%',
    75: '75 - 100%'
  }

  let selectedData = selected.split(',').filter((r: any) => r !== '').map((r: any) => +r);

  useEffect(() => {
    data = data.map((r: any) => {
      let index = selectedData.indexOf(r.value)
      return {
        value: r.value,
        count: r.count,
        selected: index === -1 ? false : true
      }
    })

    const width = 200;
    const height = 200;

    d3.select(svgRef.current).select('g').remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")

    let maxi: any = d3.max(data, (d:any) => d.count);

    var x = d3.scaleLinear()
      .domain([0, maxi])
      .range([0, width]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
  
    var y:any = d3.scaleBand()
      .range([10, height ])
      .domain(data.map(function(d:any) { return d.value; }))
      .padding(.1);
    svg.append("g")
      .call(d3.axisLeft(y))
  
    var ydr:any = (d:any) => { return y(d.value)+10 };
    svg.selectAll("myRect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", x(0) )
      .attr("y", ydr)
      .attr("width", function(d:any) { return x(d.count); })
      .attr("height", 25 )
      .attr("fill", "#261964")
      .style("opacity", function(d:any) {
        let index = selectedData.indexOf(d.value);
        if (index !== -1) {
          return 1;
        } else {
          return 0.7;
        }
      })
      .on('click', (d: any, i: number) => {
        let index = selectedData.indexOf(d.value);
        if (index !== -1) {
          selectedData.splice(index, 1);
        } else {
          selectedData.push(d.value);
        }
        selectedData = selectedData.map((r: any) => `${r}`)
        onSelect(selectedData)
      })

    svg
      .selectAll('.labels')
      .data(data)
      .enter()
      .append('text')
      .text(function(d:any){ return labelmap[d.value] })
      .attr("transform", function(d:any) {
        let xo = 10 ;
        let yo = ydr(d) - 5;
        return `translate(${xo}, ${yo})`;
      })
      .style("font-size", 14)

    svg
      .selectAll('.count')
      .data(data)
      .enter()
      .append('text')
      .text(function(d:any){ return d.count })
      .attr("transform", function(d:any) {
        let xo = x(d.count) - (d.count < 10 ? 10 : 20);
        let yo = ydr(d) + 15;
        return `translate(${xo}, ${yo})`;
      })
      .style("font-size", 14)
      .style('fill', 'white')

  }, [data, selected])

  return (
    <svg ref={svgRef} />
  )
}

export default HorizontalBarChart;