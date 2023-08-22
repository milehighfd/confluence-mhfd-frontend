import React, { useEffect, useRef, useState } from 'react';

import * as d3 from 'd3';
import { Button } from 'antd';

const PieChart = ({ data, type, selected, onSelect, defaultValue,selectedData, setSelectedData }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // const [selectedData, setSelectedData] = useState<any[]>([]);

  useEffect(() => {
    setSelectedData(selected ? selected.split(',') : []);
  }, [selected]);
  const isProb = type === 'problemtype';
  const labelValues = isProb ? '' : 'Projects';
  useEffect(() => {
    let total: any;
    let pieChartData: any;
    total = data.reduce((a: number, x: any) => a + x.counter, 0);
    pieChartData = data.map((d: any) => {
      return {
        key: d.value === 'Stream Function' ? 'Stream Condition': d.value,
        counter: d.counter,
        value: d.counter / total
      }
    });

    const width = 200;
    const height = 100;
    const radius = 30;
    
    var arc2 = d3.arc()
      .innerRadius(radius * 0.78)
      .outerRadius(radius + 5);
    var arc3 = d3.arc()
      .innerRadius(radius * 0.68)
      .outerRadius(radius * 1.27);
    var color = d3.scaleOrdinal()
      .domain(pieChartData.map((r: any) => r.key))
      .range(["#5E63E4", "#8893E7", "#C8CEFC", "#29c49a", "#66d5ff"]);

    var pie = d3.pie()
      .value(function (d: any) { return d.value; })

    d3.select(svgRef.current).select('g').remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width + 50} ${height - 20}`)
      .append("g")
      .attr("transform", "translate(" + width / 1.9 + "," + height / 1.7 + ")");
    
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
        setSelectedData(selectedData.filter((_:any, ind:any) => ind !== index))
      } else {
        setSelectedData([...selectedData, d.data.key])
      }
    }

    slicesSelected
    .enter()
    .append('path')
    .attr('fill', (d: any): any => { return '#ddd'; })
      .style("opacity", 1)
    .on('click', clickFn)
    // .transition().duration(2000)
    .attr('d', (d: any) => {
      let index = selectedData.indexOf(d.data.key);
      return index === -1 ? arc2(d) : arc3(d);
    })
    .attr("transform", "translate(" + -width/4.5 + "," + -20+ ")");

  slicesSelected.exit().remove();

    slices
      .enter()
      .append('path')
      .attr('fill', (d: any): any => { return (color(d.data.key)) })
      .style("opacity", 1)
      .on('click', clickFn)
      .attr('d', (d: any) => {
        return arc2(d);
      })
      .attr("transform", "translate(" + -width/4.5 + "," + -20+ ")"); 

    slices.exit().remove();
    var separationJump = 80;
    var fontSize = 7.5;
    var legendsText = svg
      .selectAll('slices')
      .data(data_ready)

    legendsText.exit().remove();

    legendsText
      .enter()
      .append('text')
      .text(function (d: any) { 
        console.log('d', d);
        return `${d.data.key} (${d.data.counter})`})
      .attr("transform", (d: any, i) => {
        // let xo = -radius + (i * separationJump) - 42;
        // let yo = radius + 32;
        // let xo = (i<3 ? -radius + (i * separationJump) - 42 : -radius + ((i-3) * separationJump) - 42);
        let xo = radius -2
        // let yo = (i<3 ? radius + 32 :radius + 67 );
        let yo = -radius/0.85 + (i * (separationJump/6)) +2.5
        return `translate(${xo},${yo})`;
      })
      .style("font-size", fontSize)

    legendsText
      .text(function (d: any) { return d.data.key })
      .attr("transform", (d: any, i) => {
        let xo = -radius + (i * separationJump) - 42;
        let yo = radius + 32;
        return `translate(${xo},${yo})`;
      })
      .style("font-size", fontSize)

    //   var legendsCounterText = svg
    //   .selectAll('slices')
    //   .data(data_ready)

    // legendsCounterText.exit().remove();

    // legendsCounterText
    //   .enter()
    //   .append('text')
    //   .text(function (d: any) {  return (isProb ? d.data?.key?.split(' ')[1] + ' (':'') + d.data.counter + (isProb ? ')':'') + ' ' + labelValues })
    //   .attr("transform", (d: any, i) => {
    //     let xo = -radius + (i * separationJump) - 42;
    //     let yo = radius + 45;
    //     return `translate(${xo},${yo})`;
    //   })
    //   .style("font-size", fontSize)

    // legendsCounterText
    //   .text(function (d: any) { return d.data.key })
    //   .attr("transform", (d: any, i) => {
    //     let xo = -radius + (i * separationJump) - 42;
    //     let yo = radius + 45;
    //     return `translate(${xo},${yo})`;
    //   })
    //   .style("font-size", fontSize)

    var legendsCircles = svg 
      .selectAll('slices')
      .data(data_ready);

    legendsCircles.exit().remove();

    legendsCircles
      .enter().append("circle")
      // .style("stroke", "gray")
      .style("fill", (d: any): any => {
        return color(d.data.key)
      })
      .attr("r", 3)
      .attr("cx", (d: any, i) => {
        // return -radius + (i * separationJump) - 50
        return radius -10
      })
      .attr("cy", (d: any, i) => {
        // return radius + 29.5
        return -radius/0.85 + (i * (separationJump/6))
      });
  }, [data, selectedData]);

  const apply = () => {
    if (isProb) {
      onSelect(selectedData.join(','))
    } else if (type === 'projecttype') {
      onSelect(selectedData)
    }
  }

  const reset = () => {
    onSelect(defaultValue);
  }

  return (
    <>
      {/* <div>
      <Button className="btn-svg" onClick={apply}>
        <u>Apply</u>
      </Button>
      &nbsp;|&nbsp;
      <Button className="btn-svg" onClick={reset}>
        <u>Reset</u>
      </Button>
      </div> */}
      <svg ref={svgRef} />
    </>
  )
}

export default PieChart;
