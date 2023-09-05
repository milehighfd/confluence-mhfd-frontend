import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const StackedBarChart = ({}) => {
  const [maxValue, setMaxValue] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const totalWidth:any = document.getElementById('ProjectRoadmapHeader')?.clientWidth;
  console.log('totalWidth', totalWidth)
  // const totalWidth = 260;
  const totalHeight = 200;
  const margin = {top: 10, right: 30, bottom: 20, left: 50},
        width = totalWidth - margin.left - margin.right,
        height = totalHeight - margin.top - margin.bottom;
  const data = [
    {group: 'banana', Nitrogen: '12', normal: '1', stress: '13'},
    {group: 'poacee', Nitrogen: '6', normal: '6', stress: '33'},
    {group: 'sorgho', Nitrogen: '11', normal: '28', stress: '12'},
    {group: 'triticum', Nitrogen: '19', normal: '6', stress: '1'},
    {group: 'banana1', Nitrogen: '12', normal: '1', stress: '13'},
    {group: 'poacee2', Nitrogen: '6', normal: '6', stress: '33'},
    {group: 'sorgho3', Nitrogen: '11', normal: '28', stress: '12'},
    {group: 'triticum3', Nitrogen: '19', normal: '6', stress: '1'}
  ];
  const subGroups = ['Nitrogen', 'normal', 'stress'];

  useEffect(() => {
    const totals:any = {};
    data.forEach((item:any) => {
        if (!totals[item.group]) {
            totals[item.group] = 0;
        }
        subGroups.forEach((subGroup:any) => {
            totals[item.group] += parseInt(item[subGroup]);
        });
    });
    
    let maxSum = -Infinity;
    let maxGroup = '';
    for (const group in totals) {
        if (totals[group] > maxSum) {
            maxSum = totals[group];
            maxGroup = group;
        }
    }
    
    console.log("Totals:", totals);
    console.log("Max Sum Group:", maxGroup);
    console.log("Max Sum:", maxSum);
    setMaxValue(maxSum)
  }, []);

  useEffect(() => {
    d3.select(svgRef.current).select('g').remove();
    const svg = d3.select(svgRef.current)
      .attr('width', totalWidth)
      .attr('height', totalHeight)
      // .attr("viewBox", `0 0 ${totalWidth} ${totalHeight} `)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    const groups = data.map(d => (d.group));
    const x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding(0.2);

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, maxValue])
      .range([ height, 0 ]);
    svg.append("g")
      .attr('class', 'y-axis-stackedbar-chart')
      .call(d3.axisLeft(y));

    // color palette = one color per subgroup
    const color = d3.scaleOrdinal()
      .domain(subGroups)
      .range(['#e41a1c','#377eb8','#4daf4a'])

    //stack the data? --> stack per subgroup
    const stackedData = d3.stack()
      .keys(subGroups)
      (data as any)

    // Show the bars
    svg.append("g")
      .selectAll("g")
      .data(stackedData)
      .enter().append("g")
        .attr("fill", (d: any): any => { return color(d.key); })
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data((d: any): any => { return d; })
        .enter().append("rect")
          .attr("x", (d:any):any => { return x(d.data.group); })
          .attr("y", (d:any): any => { return y(d[1]); })
          .attr("height", (d:any) => { const dimention = (y(d[0]) ?? 0) - (y(d[1]) ?? 0); return dimention; })
          .attr("width",x.bandwidth())
          .attr("rx", 1.5)
          .attr('stroke', 'white')
          .style('stroke-linecap', 'round')
  } ,[data]);
  return (
    <>
      <svg ref={svgRef} width="100%" height="100%" />
    </>
  );
}

export default StackedBarChart;