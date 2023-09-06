import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import FinancialsPopup from './FinancialsPopup';

const StackedBarChart = ({}) => {
  const [maxValue, setMaxValue] = useState(0);
  const [tickValues, setTickValues] = useState([]);
  const [sumGroups, setSumGroups] = useState<any>([]);
  // const [openPopup, setOpenPopup] = useState(false);
  const openPopup = useRef(false);
  // const [dataPopup, setDataPopup] = useState<any>({}); 
  const dataPopup = useRef({});
  const svgRef = useRef<SVGSVGElement>(null);
  const barWidth = 60;
  // const totalWidth:any = document.getElementById('ProjectRoadmapHeader')?.clientWidth;
  const totalHeight = 350;
  const data = [
    {group: 'banana', Nitrogen: '12', normal: '1', stress: '13' , additional: '12'},
    {group: 'poacee', Nitrogen: '6', normal: '6', stress: '33' , additional: '6'},
    {group: 'sorgho', Nitrogen: '11', normal: '28', stress: '12' , additional: '3'},
    {group: 'triticum', Nitrogen: '19', normal: '6', stress: '1' , additional: '30'},
    {group: 'banana1', Nitrogen: '12', normal: '1', stress: '13' , additional: '12'},
    {group: 'cacc', Nitrogen: '6', normal: '6', stress: '33' , additional: '10'},
    {group: 'sorgho3', Nitrogen: '11', normal: '28', stress: '12' , additional: '9'},
    {group: 'triticum3', Nitrogen: '19', normal: '6', stress: '1' , additional: '3'},
    {group: 'b55', Nitrogen: '12', normal: '1', stress: '13' , additional: '12'},
    {group: 'poa2cee', Nitrogen: '6', normal: '6', stress: '33' , additional: '6'},
    {group: 'sorg1ho', Nitrogen: '11', normal: '28', stress: '12' , additional: '3'},
    {group: 'triti2cum', Nitrogen: '19', normal: '6', stress: '1' , additional: '30'},
    {group: 'ban', Nitrogen: '12', normal: '1', stress: '13' , additional: '12'},
    {group: 'poac3ee2', Nitrogen: '6', normal: '6', stress: '33' , additional: '10'},
    {group: 'sorg41ho3', Nitrogen: '11', normal: '28', stress: '12' , additional: '9'},
    {group: 'trit123icum3', Nitrogen: '19', normal: '6', stress: '1' , additional: '3'},
    {group: '555ana', Nitrogen: '12', normal: '1', stress: '13' , additional: '12'},
    {group: 'po23e', Nitrogen: '6', normal: '6', stress: '33' , additional: '6'},
    {group: 's13ho', Nitrogen: '11', normal: '28', stress: '12' , additional: '3'},
    {group: 'tr2cum', Nitrogen: '19', normal: '6', stress: '1' , additional: '30'},
    {group: 'barr', Nitrogen: '12', normal: '1', stress: '13' , additional: '12'},
    {group: 'poacee2', Nitrogen: '6', normal: '6', stress: '33' , additional: '10'},
    {group: 'sor222o3', Nitrogen: '11', normal: '28', stress: '12' , additional: '9'},
    {group: '6555um3', Nitrogen: '19', normal: '6', stress: '1' , additional: '3'}
  ];
  const subGroups = ['Nitrogen', 'normal', 'stress', 'additional'];
  const margin = {top: 10, right: 30, bottom: 20, left: 50};
  const totalWidth = barWidth * data.length + margin.left + margin.right;
  const width = totalWidth - margin.left - margin.right;
  const height = totalHeight - margin.top - margin.bottom;
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
    setSumGroups(totals)
    console.log("Totals:", totals);
    console.log("Max Sum Group:", maxGroup);
    console.log("Max Sum:", maxSum);
    setMaxValue(maxSum)
    const tickValue:any = Array.from({ length: Math.ceil(maxSum / 10) + 1 }, (_, i) => i * 10);
    setTickValues(tickValue)
  }, []);


  const applyBackgroundRect = (type: string, svg: any, x: any, y:any, d: any, backgroundRect: any) => {
    if (type === 'add') {
      console.log('Funcion', type);
      backgroundRect
      .attr('y',  y(sumGroups[d.data.group]) - 7)
      .attr('height', (ddd:any) => { const dimention = (y(0) ?? 0) - (y(sumGroups[d.data.group]) ); return dimention + 6;})
      .attr('x',  d3.event.target.x.animVal.value - 7)
      .attr('width', x.bandwidth() + 13)
      .attr("rx", 5)
      .attr('class', 'background-rect-visible');
      d3.select(`#${d.data.group}`).attr('class', 'x-axis-selected');  
    } else {
      backgroundRect.attr('class', 'background-rect-hidden');
      d3.select(`#${d.data.group}`).attr('class', 'x-axis-stackedbar-chart text');  
    }
    
  }
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
      .padding(0.15);

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr('class', 'x-axis-stackedbar-chart')
      .call(d3.axisBottom(x).tickSizeOuter(0));

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr('class', 'x-axis-stackedbar-chart-for-background')
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, maxValue])
      .range([ height, 0 ]);
    svg.append("g")
      .attr('class', 'y-axis-stackedbar-chart')
      .call(d3.axisLeft(y).tickValues(tickValues));

    // color palette = one color per subgroup
    const color = d3.scaleOrdinal()
      .domain(subGroups)
      .range(['#5D3DC7','#047CD7','#29C499','#F4BE01']);

    d3.select(".x-axis-stackedbar-chart").selectAll("text").attr("id", function(d:any) { return d});

    //stack the data? --> stack per subgroup
    const stackedData = d3.stack()
      .keys(subGroups)
      (data as any)
    const backgroundRect = svg
        .append("g")
        .append('rect')
        .attr('y',  150)
        .attr('height',  100)
        .attr('x',  100)
        .attr('width', x.bandwidth()+10)
        .attr("rx", 5)
        .attr("id", 'background-rect')
        .attr("class", 'background-rect-hidden');
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
          .attr("width", x.bandwidth())
          .attr("rx", 5)
          .attr('stroke', 'white')
          .attr('stroke-width', '2')
          .style('stroke-linecap', 'round')
          .on("click", (d: any) => {
            console.log('d', d.data, 'open popup ', openPopup.current);
            if (!openPopup.current) {
              d3.select('.x-axis-selected').attr('class', 'x-axis-stackedbar-chart text');
              applyBackgroundRect('add', svg, x , y, d, backgroundRect);
              dataPopup.current = d.data;
              
              openPopup.current = true;
            } else {
              applyBackgroundRect('remove', svg, x , y, d, backgroundRect);
              openPopup.current = false;
            }
              

              
            
          });
  } ,[data]);
  return (
    <>
    {openPopup.current && <FinancialsPopup popupData={dataPopup.current}/>}
      <div id='stackedBar-chart-container' style={{overflowY: 'auto', position: 'relative'}}>
        <svg ref={svgRef} width="100%" height="100%" />
      </div>
      <div className='roadmap-body-display ' style={{ paddingTop: '0px' }}>
        <span className="span-dots-roadmap">
          <div className="roadmap-circle" style={{ backgroundColor: '#5D3DC7' }} />
          <span className='roadmap-dots-leyend'>Funding (MHFD Funds)</span>
        </span>
        <span className="span-dots-roadmap">
          <div className="roadmap-circle" style={{ backgroundColor: '#047CD7' }} />
          <span className='roadmap-dots-leyend'>Income (LG Funds)</span>
        </span>
        <span className="span-dots-roadmap">
          <div className="roadmap-circle" style={{ backgroundColor: '#29C499' }} />
          <span className='roadmap-dots-leyend'>Agreement</span>
        </span>
      </div>
    </>
  );
}

export default StackedBarChart;