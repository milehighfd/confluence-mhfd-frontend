import React, { useEffect, useRef } from 'react';

import * as d3 from 'd3';

const BarChart = ({ data, selected, onSelect }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);

  let selectedData = selected.split(',');

  data = data.map((d: any) => {
    let index = selectedData.indexOf(d.value);
    return {
      value: d.value,
      count: d.count,
      selected: index === -1 ? false : true
    };
  }).reverse();

  useEffect(() => {
    const width = 150;
    const height = 200;

    d3.select(svgRef.current).select('g').remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")

    var y = d3.scaleLinear().rangeRound([height, 0]);

    var accum: any[] = [];
    data.forEach((d: any, i:number) => {
      accum.push(d.count + (i > 0 ? accum[i-1] : 0))
    });

    let sum = d3.sum(data, function(d:any) { return d.count });
    
    y.domain([0, sum]);

    let yAccFn: any = (d:any, i: number) => {
      return y(accum[i]);
    }
    let yCountFn: any = (d:any) => {
      return y(d.count);
    }

    var singleBars = svg
      .selectAll(".singlebar")
      .data(data)
      
    singleBars
      .enter()
      .append("rect")
      .attr("x", 50)
      .attr("y", yAccFn)
      .attr('width', 50)
      .attr('height', function (d:any, ) {
        return height - yCountFn(d);
      })
      .attr('fill', (d:any, i) => {
        if (i === 0) return '#29c499';
        else if (i === 1) return '#ffdd00';
        return '#fe687e';
      })
      .style("opacity", function(d:any) {
        let index = selectedData.indexOf(d.value);
        if (index !== -1) {
          return 1;
        } else {
          return 0.7;
        }
      })
      .on('click', (d: any) => {
        let index = selectedData.indexOf(d.value);
        if (index !== -1) {
          selectedData.splice(index, 1);
        } else {
          selectedData.push(d.value);
        }
        onSelect(selectedData)
      })
    
    var labels =  svg
      .selectAll('.labels')
      .data(data);

    labels
      .enter()
      .append('text')
      .text(function(d:any){ return d.value })
      .attr("transform", function(d:any, i) {
        let xo = 105;
        let yo = yAccFn(d, i) + (height - yCountFn(d)) / 2;
        return `translate(${xo}, ${yo})`;
      })
      .style("font-size", 10)
  }, [data, selected])

  return (
    <svg ref={svgRef}/>
  )
}

export default BarChart;
