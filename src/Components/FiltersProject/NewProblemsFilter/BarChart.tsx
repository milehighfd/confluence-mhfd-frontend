import React, { useEffect, useRef, useState } from 'react';

import * as d3 from 'd3';
import { Button } from 'antd';
import { CHART_CONSTANTS } from './Charts.constants';

const BarChart = ({ data, selected, onSelect, defaultValue, axisLabel }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedData, setSelectedData] = useState<any[]>([]);

  useEffect(() => {
    let sData = selected.split(',');
    setSelectedData(sData);
  }, [selected])

  data = data.map((d: any) => {
    let index = selectedData.indexOf(d.value);
    return {
      value: d.value,
      counter: d.counter,
      selected: index === -1 ? false : true
    };
  }).reverse();

  useEffect(() => {
    const width = 200;
    const height = 200;

    d3.select(svgRef.current).select('g').remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      // .attr("width", width)
      // .attr("height", height)
      .append("g")

    var y = d3.scaleLinear().rangeRound([height, 0]);

    var accum: any[] = [];
    data.forEach((d: any, i:number) => {
      accum.push(d.counter + (i > 0 ? accum[i-1] : 0))
    });

    let sum = d3.sum(data, function(d:any) { return d.counter });
    
    y.domain([0, sum]);

    let yAccFn: any = (d:any, i: number) => {
      return y(accum[i]);
    }
    let yCountFn: any = (d:any) => {
      return y(d.counter);
    }

    var singleBars = svg
      .selectAll(".singlebar")
      .data(data)
      
    var newBars = singleBars
      .enter()
      .append("rect")
    
    singleBars
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
          return CHART_CONSTANTS.opacityFull;
        } else {
          return CHART_CONSTANTS.opacityOpaque;
        }
      })
      .on('click', (d: any) => {
        let index = selectedData.indexOf(d.value);
        if (index !== -1) {
          setSelectedData(selectedData.filter((_, ind) => ind !== index))
        } else {
          setSelectedData([...selectedData, d.value])
        }
      })

    newBars
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
          return CHART_CONSTANTS.opacityFull;
        } else {
          return CHART_CONSTANTS.opacityOpaque;
        }
      })
      .on('click', (d: any) => {
        let index = selectedData.indexOf(d.value);
        if (index !== -1) {
          setSelectedData(selectedData.filter((_, ind) => ind !== index))
        } else {
          setSelectedData([...selectedData, d.value])
        }
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

      svg.selectAll('.hleftlabel').remove();

      svg
        .append('g')
        .attr('class', 'hleftlabel')
        .attr('transform', `translate(${15}, ${height / 2}) rotate(270) skewX(-20)`)
        .append('text')
        .text(axisLabel)
        .style("text-anchor", "middle")
        .style('opacity', 0.40);

  }, [data, selectedData])

  const apply = () => {
    onSelect(selectedData)
  }

  const reset = () => {
    onSelect(defaultValue);
  }

  return (
    <>
      <div>
      <Button className="btn-svg" onClick={apply}>
        <u>Apply</u>
      </Button>
      &nbsp;|&nbsp;
      <Button className="btn-svg" onClick={reset}>
        <u>Reset</u>
      </Button>
      </div>
      <svg ref={svgRef} />
    </>
  )
}

export default BarChart;
