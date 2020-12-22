import React, { useEffect, useRef } from 'react';

import * as d3 from 'd3';


const PieChart = ({ data, type, selected, onSelect }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const selectedData = selected ? selected.split(',') : [];

  useEffect(() => {
    let total: any;
    let pieChartData: any;
    if (type === 'problemtype') {
      total = data.length;
      pieChartData = data.map((d:any) => {
        let index = selectedData.indexOf(d);
        return {
          key: d,
          counter: 1,
          selected: index === -1 ? false : true,
          value: 1 / total
        }
      });
    } else if (type === 'projecttype') {
      total = data.reduce((a: number, x: any) => a + x.counter, 0);
      pieChartData = data.map((d:any) => {
        let index = selectedData.indexOf(d.value);
        return {
          key: d.value,
          counter: d.counter,
          selected: index === -1 ? false : true,
          value: d.counter / total
        }
      });
    }

    const width = 150;
    const height = 150;
    const radius = 70;

    var arc = d3.arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius);

    var arc2 = d3.arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius + 5);

    var color = d3.scaleOrdinal()
      .domain(pieChartData.map((r: any) => r.key))
      .range(["#917cd9", "#fd687e", "#fac774", "#29c49a", "#32a4fc"]);

    var pie = d3.pie()
      .value(function (d: any) { return d.value; })

    d3.select(svgRef.current).select('g').remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width + 100)
      .attr("height", height + 50)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var data_ready: any = pie(pieChartData)

    var slices = svg
      .selectAll('slices')
      .data(data_ready)
    
    slices
      .enter()
      .append('path')
      .attr('fill', (d: any): any => { return (color(d.data.key)) })
      .style("opacity", 0.7)
      .on('click', (d: any) => {
        let index = selectedData.indexOf(d.data.key);
        if (index !== -1) {
          selectedData.splice(index, 1);
        } else {
          selectedData.push(d.data.key);
        }
        if (type === 'problemtype') {
          onSelect(selectedData.join(','))
        } else if (type === 'projecttype') {
          onSelect(selectedData)
        }
      })
      .transition().duration(2000)
      .attr('d', (d: any) => d.data.selected ? arc2(d) : arc(d) )

    slices.exit().remove();

    var texts = svg
      .selectAll('slices')
      .data(data_ready);

    texts
      .enter()
      .append('text')
      .text(function (d: any) { return d3.format(".0%")(d.value) })
      .attr("transform", function (d: any) { return "translate(" + arc.centroid(d) + ")"; })
      .style("text-anchor", "middle")
      .style("font-size", 10)
    
    texts.exit().remove()

    svg
      .selectAll('slices')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function (d: any) { return d.data.key })
      .attr("transform", function (d: any, i) { return "translate(" + ((i % 2 === 0 ? -75 : 30) + 22) + ',' + ((75 + Math.floor(i / 2) * 20) + 5) + ")"; })
      .style("font-size", 10)

    svg
      .selectAll('slices')
      .data(data_ready)
      .enter()
      .append('rect')
      .style("fill", (d: any): any => {
        return color(d.data.key)
      })
      .attr("x", function (d: any, i) { return (i % 2 === 0 ? -75 : 30) })
      .attr("y", function (d: any, i) { return 75 + Math.floor(i / 2) * 20 })
      .attr('width', 20)
      .attr('height', 6)

  }, [data, selected]);

  return (
    <svg ref={svgRef} />
  )
}

export default PieChart;
