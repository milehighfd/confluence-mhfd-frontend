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
    console.log('data', data);
  }, [data]);
  const newData = [
    {
      value: type == 'problemtype' ? 'Flood Hazard' : 'Maintenance',
      counter: 45
    },
    {
      value: type == 'problemtype' ? 'Stream Function' : 'Study Areas',
      counter: 30
    }, 
    {
      value: type == 'problemtype' ? 'Failure Development' : 'Capital Projects',
      counter: 25
    }
  ]
  const labelValues = type === 'problemtype' ? 'Problems' : 'Projects';
  data = newData;
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

    const width = 200;
    const height = 180;
    const radius = 50;

    var arc = d3.arc()
      .innerRadius(radius * 0.57)
      .outerRadius(radius);
    
    var arc2 = d3.arc()
      .innerRadius(radius * 0.72)
      .outerRadius(radius + 5);
    var arc3 = d3.arc()
      .innerRadius(radius * 0.60)
      .outerRadius(radius * 1.2);
    var color = d3.scaleOrdinal()
      .domain(pieChartData.map((r: any) => r.key))
      .range(["#5E63E4", "#8893E7", "#C8CEFC", "#29c49a", "#66d5ff"]);

    var pie = d3.pie()
      .value(function (d: any) { return d.value; })

    d3.select(svgRef.current).select('g').remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width + 50} ${height}`)
      .append("g")
      .attr("transform", "translate(" + width / 1.9 + "," + height / 3 + ")");
    
    var data_ready: any = pie(pieChartData)
    var slices = svg
      .selectAll('slices')
      .data(data_ready)
    var slicesSelected = svg
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

    // slices
    //   .attr('fill', (d: any): any => { return (color(d.data.key)) })
    //   .style("opacity", (d: any) => {
    //     let index = selectedData.indexOf(d.data.key);
    //     return index === -1 ? ( type == 'projecttype'? CHART_CONSTANTS.opacityOpaque: CHART_CONSTANTS_INV.opacityOpaque) : ( type == 'projecttype'? CHART_CONSTANTS.opacityFull: CHART_CONSTANTS_INV.opacityFull);
    //   })
    //   .on('click', clickFn)
    //   .transition().duration(2000)
    //   .attr('d', (d: any) => {
    //     let index = selectedData.indexOf(d.data.key);
    //     return index !== -1 ? arc2(d) : arc(d)
    //   })
    slicesSelected
    .enter()
    .append('path')
    .attr('fill', (d: any): any => { return '#ddd'; })
      .style("opacity", 0.5)
    .on('click', clickFn)
    .transition().duration(2000)
    .attr('d', (d: any) => {
      let index = selectedData.indexOf(d.data.key);
      return index === -1 ? arc2(d) : arc3(d);
    })

  slicesSelected.exit().remove();

    slices
      .enter()
      .append('path')
      .attr('fill', (d: any): any => { return (color(d.data.key)) })
      .style("opacity", 1)
      .on('click', clickFn)
      // .transition().duration(2000)
      .attr('d', (d: any) => {
        return arc2(d);
      })

    slices.exit().remove();


    // var texts = svg
    //   .selectAll('slices')
    //   .data(data_ready);

    // texts
    //   .text((d: any) => { return d.value === 0 ? '' : d3.format(".0%")(d.value) })
    //   .attr("transform", (d: any) => { return "translate(" + arc.centroid(d) + ")"; })
    //   .attr("fill", "white")
    //   .attr('font-weight', 'bold')
    //   .style("text-anchor", "middle")
    //   .style("font-size", 12)
    //   .on('click', clickFn)

    // texts
    //   .enter()
    //   .append('text')
    //   .text((d: any) => { return d.value === 0 ? '' : d3.format(".0%")(d.value) })
    //   .attr("transform", (d: any) => { return "translate(" + arc.centroid(d) + ")"; })
    //   .attr("fill", "white")
    //   .attr('font-weight', 'bold')
    //   .style("text-anchor", "middle")
    //   .style("font-size", 12)
    //   .on('click', clickFn)

    // texts.exit().remove()

    var legendsText = svg
      .selectAll('slices')
      .data(data_ready)

    legendsText.exit().remove();

    legendsText
      .enter()
      .append('text')
      .text(function (d: any) {  return d.data.key == 'Human Connection'? 'Community Values':d.data.key })
      .attr("transform", (d: any, i) => {
        let xo = -radius + (i * 69) - 33;
        let yo = radius + 30;
        return `translate(${xo},${yo})`;
      })
      .style("font-size", 7)

    legendsText
      .text(function (d: any) { return d.data.key })
      .attr("transform", (d: any, i) => {
        let xo = -radius + (i * 69) - 33;
        let yo = radius + 30;
        return `translate(${xo},${yo})`;
      })
      .style("font-size", 7)

      var legendsCounterText = svg
      .selectAll('slices')
      .data(data_ready)

    legendsCounterText.exit().remove();

    legendsCounterText
      .enter()
      .append('text')
      .text(function (d: any) {  return d.data.counter + ' ' + labelValues })
      .attr("transform", (d: any, i) => {
        let xo = -radius + (i * 69) - 33;
        let yo = radius + 43;
        return `translate(${xo},${yo})`;
      })
      .style("font-size", 7)

    legendsCounterText
      .text(function (d: any) { return d.data.key })
      .attr("transform", (d: any, i) => {
        let xo = -radius + (i * 69) - 33;
        let yo = radius + 43;
        return `translate(${xo},${yo})`;
      })
      .style("font-size", 7)

    var legendsCircles = svg 
      .selectAll('slices')
      .data(data_ready);

    legendsCircles.exit().remove();

    legendsCircles
      .enter().append("circle")
      .style("stroke", "gray")
      .style("fill", (d: any): any => {
        return color(d.data.key)
      })
      .attr("r", 5)
      .attr("cx", (d: any, i) => {
        return -radius + (i * 69) - 40
      })
      .attr("cy", (d: any, i) => {
        return radius + 29.5
      });
    // var legendsBar = svg
    //   .selectAll('slices')
    //   .data(data_ready)

    // legendsBar.exit().remove();

    // legendsBar
    //   .style("fill", (d: any): any => {
    //     return color(d.data.key)
    //   })
    //   .attr("x", (d: any, i) => {
    //     return (i % 2 === 0 ? -radius : 33)
    //   })
    //   .attr("y", (d: any, i) => {
    //     return radius + 29.5 + Math.floor(i / 2) * 20
    //   })
    //   .attr('width', 15)
    //   .attr('height', 4)

    // legendsBar.enter()
    //   .append('rect')
    //   .style("fill", (d: any): any => {
    //     return color(d.data.key)
    //   })
    //   .attr("x", (d: any, i) => {
    //     return (i % 2 === 0 ? -radius : 33)
    //   })
    //   .attr("y", (d: any, i) => {
    //     return radius + 29.5 + Math.floor(i / 2) * 20
    //   })
    //   .attr('width', 15)
    //   .attr('height', 4)

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
