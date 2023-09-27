import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import FinancialsPopup from './FinancialsPopup';
import { useFinancialDispatch, useFinancialState } from 'hook/financialHook';

const StackedBarChart = ({ projectId }: { projectId: any }) => {
  const { financialInformation } = useFinancialState();
  const { getFinancialData } = useFinancialDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [dataPopup, setDataPopup] = useState({});
  const svgRef = useRef<SVGSVGElement>(null);
  const barWidth = 60;
  const totalHeight = 350;
  const [data, setData] = useState<any>([]);
  const subGroups = ['funding', 'income', 'agreement', 'additional'];
  const margin = {top: 10, right: 30, bottom: 20, left: 50};
  const totalWidth = barWidth * data.length + margin.left + margin.right;
  const width = totalWidth - margin.left - margin.right;
  const height = totalHeight - margin.top - margin.bottom;

  useEffect(() => {
    getFinancialData(projectId, {});
    setData([
      {group: 'Jan-22', funding: '100', income:0, mhfd: '250', mhfd2: '250', southsuburdan: 0,  Semswa: '250' , 'wilson&company': '182'},
      {group: 'Feb-22', funding: '6', income:0, mhfd: '6', Southsububan: '33' , semswa: '6'},
      {group: 'Mar-22', funding: '11', income: '28', agreement: '12' , additional: '3'},
      {group: 'Apr-22', funding: '19', income: '6', agreement: '1' , additional: '30'},
      {group: 'May-22', funding: '12', income: '1', agreement: '13' , additional: '12'},
      {group: 'Jun-22', funding: '6', income: '6', agreement: '33' , additional: '10'},
      {group: 'Jul-22', funding: '11', income: '28', agreement: '12' , additional: '9'},
      {group: 'Aug-22', funding: '19', income: '6', agreement: '1' , additional: '3'},
      {group: 'Sep-22', funding: '12', income: '1', agreement: '13' , additional: '12'},
      {group: 'Oct-22', funding: '6', income: '6', agreement: '33' , additional: '6'},
      {group: 'Nov-22', funding: '11', income: '28', agreement: '12' , additional: '3'},
      {group: 'Dec-22', funding: '19', income: '6', agreement: '1' , additional: '30'},
      {group: 'Jan-23', funding: '12', income: '1', agreement: '13' , additional: '12'},
      {group: 'Feb-23', funding: '6', income: '6', agreement: '33' , additional: '10'},
      {group: 'Mar-23', funding: '11', income: '28', agreement: '12' , additional: '9'},
      {group: 'Apr-23', funding: '19', income: '6', agreement: '1' , additional: '3'},
      {group: 'May-23', funding: '12', income: '1', agreement: '13' , additional: '12'},
      {group: 'Jun-23', funding: '6', income: '6', agreement: '33' , additional: '6'},
      {group: 'Jul-23', funding: '11', income: '28', agreement: '12' , additional: '3'},
      {group: 'Aug-23', funding: '19', income: '6', agreement: '1' , additional: '30'},
      {group: 'Sep-23', funding: '12', income: '1', agreement: '13' , additional: '12'},
      {group: 'Oct-23', funding: '6', income: '6', agreement: '33' , additional: '10'},
      {group: 'Nov-23', funding: '11', income: '28', agreement: '12' , additional: '9'},
      {group: 'Dec-23', funding: '19', income: '6', agreement: '1' , additional: '3'}
    ]);
  }, []);

  useEffect(() => {
    console.log(financialInformation);
    const ATTRIB_GROUP = 'effective_date';
    const groupedInformation = financialInformation.reduce((prev: any, cur: any) => {
      if (!prev[cur[ATTRIB_GROUP]]) {
        prev[cur[ATTRIB_GROUP]] = [];
      }
      prev[cur[ATTRIB_GROUP]].push(cur);
      return prev;
    }, {});
    const Keys = Object.keys(groupedInformation);

    const sortedDates = Object.keys(groupedInformation).sort((a:any, b:any) =>  new Date(b).getTime() - new Date(a).getTime());

    const resultArray = sortedDates.map(date => ({
      date,
      data: groupedInformation[date]
    }));
    console.log('result', resultArray);

    let availableFund = 0;
    // iterate through the keys and group inside each object by project_partner_name and emcumbered.is_income
    const newGroupedInformation: any = {};
    Keys.forEach((key: any) => {
      const expenditure = groupedInformation[key].filter((item: any) => !item?.encumbered?.is_income);
      const expenditureSum = expenditure.reduce((prev: any, cur: any) => {
        return prev + cur?.encumbered?.cost;
      }, 0);
      const areIncome = groupedInformation[key].filter((item: any) => item?.encumbered?.is_income);
      // split areIncome by project_partner_name, one group where project_partner_name = MHFD and other group where project_partner_name != MHFD
      const mhfdIncome = areIncome.filter((item: any) => item?.project_partner_name === 'MHFD');
      const otherIncome = areIncome.filter((item: any) => item?.project_partner_name !== 'MHFD');
      const mhfdIncomeSum = mhfdIncome.reduce((prev: any, cur: any) => {
        return prev + cur?.encumbered?.cost;
      }, 0);
      const otherIncomeSum = otherIncome.reduce((prev: any, cur: any) => {
        return prev + cur?.encumbered?.cost;
      }, 0);
      newGroupedInformation[key] = {
        availableFund,
        mhfdfunds: mhfdIncome,
        localfunds: otherIncome,
        expenditure
      }; 
      console.log('current available before sum', key, availableFund, mhfdIncomeSum,otherIncomeSum, expenditureSum);
      availableFund = availableFund + mhfdIncomeSum + otherIncomeSum - expenditureSum;
    });
    console.log('ORIGINAL', newGroupedInformation);
  }, [financialInformation]);
  const applyBackgroundRect = (type: string, x: any, y:any, d: any, backgroundRect: any, sumGroups: any) => {
    if (type === 'add') {
      backgroundRect
      .attr('y',  y(sumGroups[d.data.group]) - 7)
      .attr('height', (y(0) ?? 0) - (y(sumGroups[d.data.group]) ) + 6 )
      .attr('x',  d3.event.target.x.animVal.value - 7)
      .attr('width', x.bandwidth() + 13)
      .attr("rx", 5)
      .attr('class', `background-rect-visible`)
      .attr('id', `rect-${d.data.group}`);
      d3.select(`#${d.data.group}`).attr('class', 'x-axis-selected');  
    } else {
      backgroundRect.attr('class', 'background-rect-hidden').attr("id", 'rect-undefined');
      d3.select(`#${d.data.group}`).attr('class', 'x-axis-stackedbar-chart text');  
    }
  }
  const buildChart = (dataChart: any) => {
    const totals:any = {};
      data.forEach((item:any) => {
        if (!totals[item.group]) {
          totals[item.group] = 0;
        }
        subGroups.forEach((subGroup:any) => {
          totals[item.group] += parseInt(item[subGroup]);
        });
      });
    let maxValue;
    let tickValues;
    let sumGroups: any;
    let maxSum = -Infinity;
    for (const group in totals) {
        if (totals[group] > maxSum) {
            maxSum = totals[group];
        }
    }
    sumGroups = totals;
    maxValue = maxSum;
    const tickValue:any = Array.from({ length: Math.ceil(maxSum / 10) + 1 }, (_, i) => i * 10);
    tickValues = tickValue;

    d3.select(svgRef.current).select('.stackedBar-chart').remove();
    const svg = d3.select(svgRef.current)
      .attr('width', totalWidth)
      .attr('height', totalHeight)
      .append("g")
      .attr("id", "stackedBar-chart")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    const groups = dataChart.map((d: any) => (d.group));
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
    const y: any = d3.scaleLinear()
      .domain([0, maxValue])
      .range([ height, 0 ]);
    svg.append("g")
      .attr('class', 'y-axis-stackedbar-chart')
      .call(d3.axisLeft(y).tickValues(tickValues));

      // color palette = one color per subgroup
    const color = d3.scaleOrdinal()
      .domain(subGroups)
      .range(['#5D3DC7','#29C499','#047CD7','#F4BE01']);
  
    d3.select(".x-axis-stackedbar-chart").selectAll("text").attr("id", function(d:any) { return d});
  
    //stack the data? --> stack per subgroup
    const stackedData = d3.stack()
      .keys(subGroups)
      (dataChart as any);
    const backgroundRect = svg
      .append("g")
      .append('rect')
      .attr('y',  150)
      .attr('height',  0)
      .attr('x',  100)
      .attr('width', 0)
      .attr("rx", 5)
      .attr("id", 'background-rect');
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
          .on("mouseover", (d: any) => {
            const selection = d3.select(`#rect-${d.data.group}`);
            if (!selection.empty()) { // true the rect is already there // false the rect is of other or doesnt exist 
              applyBackgroundRect('remove', x , y, d, backgroundRect, sumGroups);
              setOpenPopup(false);
            } else {
              d3.select('.x-axis-selected').attr('class', 'x-axis-stackedbar-chart text');
              applyBackgroundRect('add', x , y, d, backgroundRect, sumGroups);
              setDataPopup(d.data);
              setOpenPopup(true);
            }
          })
          .on("mouseout", (d: any) => {
            const selection = d3.select(`#rect-${d.data.group}`);
            if (!selection.empty()) { // true the rect is already there // false the rect is of other or doesnt exist 
              applyBackgroundRect('remove', x , y, d, backgroundRect, sumGroups);
              setOpenPopup(false);
            } 
          });
  }

  useEffect(() => {
    if(data.length) {
      buildChart(data);
    }
  } ,[data]);
 // Agreement
  return (
    <>
      { openPopup && <FinancialsPopup popupData={dataPopup}/>}
      <div id='stackedBar-chart-container' style={{overflowY: 'auto', position: 'relative', marginTop: '50px', marginBottom: '10px'}}>
        <svg ref={svgRef} width="100%" height="100%" />
      </div>
      <div className='roadmap-body-display ' style={{ paddingTop: '0px' }}>
        <span className="span-dots-roadmap">
          <div className="roadmap-circle" style={{ backgroundColor: '#5D3DC7' }} />
          <span className='roadmap-dots-leyend'>Available Fund</span> 
        </span>
        <span className="span-dots-roadmap">
          <div className="roadmap-circle" style={{ backgroundColor: '#29C499' }} />
          <span className='roadmap-dots-leyend'>Funding (MHFD Funds)</span>
        </span>
        <span className="span-dots-roadmap">
          <div className="roadmap-circle" style={{ backgroundColor: '#047CD7' }} />
          <span className='roadmap-dots-leyend'>Income (LG Funds)</span>
        </span>
        <span className="span-dots-roadmap">
          <div className="roadmap-circle" style={{ backgroundColor: '#F4BE01' }} />
          <span className='roadmap-dots-leyend'>Agreement</span>
        </span>
      </div>
    </>
  );
}

export default StackedBarChart;