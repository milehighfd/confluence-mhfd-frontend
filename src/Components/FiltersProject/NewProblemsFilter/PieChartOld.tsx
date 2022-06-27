import React, { useEffect, useRef, useState } from 'react';

import * as d3 from 'd3';
import { Button } from 'antd';

import { CHART_CONSTANTS, CHART_CONSTANTS_INV } from './Charts.constants';

const PieChart = ({ data, type, selected, onSelect, defaultValue }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [selectedData, setSelectedData] = useState<any[]>([]);

  useEffect(() => {
    setSelectedData(selected ? selected.split(',') : []);
  }, [selected]);


  useEffect(() => {
    let total: any;
    let pieChartData: any;
    total = data.reduce((a: number, x: any) => a + x.counter, 0);
    pieChartData = data.map((d: any) => {
      return {
        key: d.value,
        counter: d.counter,
        value: d.counter / total
      }
    });

    const width = 180;
    const height = 180;
    const radius = 85;

    var arc = d3.arc()
      .innerRadius(radius * 0.57)
      .outerRadius(radius);

    var arc2 = d3.arc()
      .innerRadius(radius * 0.57)
      .outerRadius(radius + 5);

    var color = d3.scaleOrdinal()
      .domain(pieChartData.map((r: any) => r.key))
      .range(["#251963", "#fd687e", "#ffdd04", "#29c49a", "#66d5ff"]);

    var pie = d3.pie()
      .value(function (d: any) { return d.value; })

    d3.select(svgRef.current).select('g').remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width + 100} ${height + 75}`)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    var data_ready: any = pie(pieChartData)
    var slices = svg
      .selectAll('slices')
      .data(data_ready)

    let clickFn = (d: any) => {
      let index = selectedData.indexOf(d.data.key);
      if (index !== -1) {
        setSelectedData(selectedData.filter((_, ind) => ind !== index))
      } else {
        setSelectedData([...selectedData, d.data.key])
      }
    }

    slices
      .attr('fill', (d: any): any => { return (color(d.data.key)) })
      .style("opacity", (d: any) => {
        let index = selectedData.indexOf(d.data.key);
        return index === -1 ? ( type == 'projecttype'? CHART_CONSTANTS.opacityOpaque: CHART_CONSTANTS_INV.opacityOpaque) : ( type == 'projecttype'? CHART_CONSTANTS.opacityFull: CHART_CONSTANTS_INV.opacityFull);
      })
      .on('click', clickFn)
      .transition().duration(2000)
      .attr('d', (d: any) => {
        let index = selectedData.indexOf(d.data.key);
        return index !== -1 ? arc2(d) : arc(d)
      })

    slices
      .enter()
      .append('path')
      .attr('fill', (d: any): any => { return (color(d.data.key)) })
      .style("opacity", (d: any) => {
        let index = selectedData.indexOf(d.data.key);
        return index === -1 ? ( type == 'projecttype'? CHART_CONSTANTS.opacityOpaque: CHART_CONSTANTS_INV.opacityOpaque) : ( type == 'projecttype'? CHART_CONSTANTS.opacityFull: CHART_CONSTANTS_INV.opacityFull);
      })
      .on('click', clickFn)
      .transition().duration(2000)
      .attr('d', (d: any) => {
        let index = selectedData.indexOf(d.data.key);
        return index !== -1 ? (type == 'projecttype'?arc2(d):arc(d)) : (type == 'projecttype'?arc(d):arc2(d))
      })

    slices.exit().remove();

    var texts = svg
      .selectAll('slices')
      .data(data_ready);

    texts
      .text((d: any) => { return d.value === 0 ? '' : d3.format(".0%")(d.value) })
      .attr("transform", (d: any) => { return "translate(" + arc.centroid(d) + ")"; })
      .attr("fill", "white")
      .attr('font-weight', 'bold')
      .style("text-anchor", "middle")
      .style("font-size", 12)
      .on('click', clickFn)

    texts
      .enter()
      .append('text')
      .text((d: any) => { return d.value === 0 ? '' : d3.format(".0%")(d.value) })
      .attr("transform", (d: any) => { return "translate(" + arc.centroid(d) + ")"; })
      .attr("fill", "white")
      .attr('font-weight', 'bold')
      .style("text-anchor", "middle")
      .style("font-size", 12)
      .on('click', clickFn)

    texts.exit().remove()

    var legendsText = svg
      .selectAll('slices')
      .data(data_ready)

    legendsText.exit().remove();

    legendsText
      .enter()
      .append('text')
      .text(function (d: any) {  return d.data.key == 'Human Connection'? 'Community Values':d.data.key })
      .attr("transform", (d: any, i) => {
        let xo = (i % 2 === 0 ? -radius : 30) + 27;
        let yo = ((radius + Math.floor(i / 2) * 20) + 35);
        return `translate(${xo},${yo})`;
      })
      .style("font-size", 14)

    legendsText
      .text(function (d: any) { return d.data.key })
      .attr("transform", (d: any, i) => {
        let xo = (i % 2 === 0 ? -radius : 30) + 27;
        let yo = ((radius + Math.floor(i / 2) * 20) + 35);
        return `translate(${xo},${yo})`;
      })
      .style("font-size", 14)

    var legendsBar = svg
      .selectAll('slices')
      .data(data_ready)

    legendsBar.exit().remove();

    legendsBar
      .style("fill", (d: any): any => {
        return color(d.data.key)
      })
      .attr("x", (d: any, i) => {
        return (i % 2 === 0 ? -radius : 33)
      })
      .attr("y", (d: any, i) => {
        return radius + 29.5 + Math.floor(i / 2) * 20
      })
      .attr('width', 15)
      .attr('height', 4)

    legendsBar.enter()
      .append('rect')
      .style("fill", (d: any): any => {
        return color(d.data.key)
      })
      .attr("x", (d: any, i) => {
        return (i % 2 === 0 ? -radius : 33)
      })
      .attr("y", (d: any, i) => {
        return radius + 29.5 + Math.floor(i / 2) * 20
      })
      .attr('width', 15)
      .attr('height', 4)

  }, [data, selectedData]);

  const apply = () => {
    // if (type === 'problemtype') {
    //   onSelect(selectedData.join(','))
    // } else if (type === 'projecttype') {
    //   onSelect(selectedData)
    // }
    console.log('selected data with no effect', selectedData);
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

export default PieChart;
