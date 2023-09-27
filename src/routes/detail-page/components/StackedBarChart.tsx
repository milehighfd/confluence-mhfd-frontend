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
  const [subGroups, setSubGroups] = useState<any>(['availableFund', 'mhfdIncomeSum', 'expenditureSum', 'otherIncomeSum']);
  const [colors, setColors] = useState<any>(['#5D3DC7', '#29C499', '#F4BE01', '#047CD7']);
  // const subGroups = ['funding', 'income', 'agreement', 'additional'];
  const margin = { top: 10, right: 30, bottom: 20, left: 100 };
  const totalWidth = barWidth * data.length + margin.left + margin.right;
  const width = totalWidth - margin.left - margin.right;
  const height = totalHeight - margin.top - margin.bottom;

  useEffect(() => {
    getFinancialData(projectId, {});
    // setData([
    //   { availableFund: 0, group: '10-31-2018', mhfdIncomeSum: 50, otherIncomeSum: 50, expenditureSum: 0 },
    //   { availableFund: 10.213, group: '05-02-2019', mhfdIncomeSum: 25, otherIncomeSum: 25, expenditureSum: 0 },
    //   { availableFund: 60, group: '03-02-2020', mhfdIncomeSum: 25, otherIncomeSum: 25, expenditureSum: 0 },
    //   { availableFund: 11.222, group: '06-10-2020', mhfdIncomeSum: 0, otherIncomeSum: 0, expenditureSum: 12 },
    //   { availableFund: 80, group: '08-11-2020', mhfdIncomeSum: 0, otherIncomeSum: 0, expenditureSum: 87 },
    //   { availableFund: 17, group: '02-10-2021', mhfdIncomeSum: 0, otherIncomeSum: 0, expenditureSum: 83 },
    //   { availableFund: 90.6555, group: '03-16-2021', mhfdIncomeSum: 0, otherIncomeSum: 0, expenditureSum: 18 },
    //   { availableFund: 62, group: '05-03-2021', mhfdIncomeSum: 25, otherIncomeSum: 25, expenditureSum: 0 },
    //   { availableFund: 12, group: '08-23-2021', mhfdIncomeSum: 0, otherIncomeSum: 0, expenditureSum: 14 },
    //   { availableFund: 48, group: '10-31-2021', mhfdIncomeSum: 0, otherIncomeSum: 0, expenditureSum: 15 },
    //   { availableFund: 14, group: '05-13-2022', mhfdIncomeSum: 50, otherIncomeSum: 50, expenditureSum: 0 },
    //   { availableFund: 20, group: '09-26-2022', mhfdIncomeSum: 0, otherIncomeSum: 0, expenditureSum: 5 },
    //   { availableFund: 11, group: '11-20-2022', mhfdIncomeSum: 0, otherIncomeSum: 0, expenditureSum: 40 },
    //   { availableFund: 11, group: '11-30-2022', mhfdIncomeSum: 10, otherIncomeSum: 0, expenditureSum: 0 },
    //   { availableFund: 21, group: '01-16-2023', mhfdIncomeSum: 0, otherIncomeSum: 0, expenditureSum: 54 },
    //   { availableFund: 20, group: '03-05-2023', mhfdIncomeSum: 0, otherIncomeSum: 0, expenditureSum: 65 },
    //   { availableFund: 33, group: '05-18-2023', mhfdIncomeSum: 32, otherIncomeSum: 80, expenditureSum: 0 },
    //   { availableFund: 17, group: '06-21-2023', mhfdIncomeSum: 0, otherIncomeSum: 0, expenditureSum: 99 },
    // ]);
    // setData([
    //   {group: 'Jan-22', funding: '100', income:0, mhfd: '250', mhfd2: '250', southsuburdan: 0,  Semswa: '250' , 'wilson&company': '182'},
    //   {group: 'Feb-22', funding: '6', income:0, mhfd: '6', Southsububan: '33' , semswa: '6'},
    //   {group: 'Mar-22', funding: '11', income: '28', agreement: '12' , additional: '3'},
    //   {group: 'Apr-22', funding: '19', income: '6', agreement: '1' , additional: '30'},
    //   {group: 'May-22', funding: '12', income: '1', agreement: '13' , additional: '12'},
    //   {group: 'Jun-22', funding: '6', income: '6', agreement: '33' , additional: '10'},
    //   {group: 'Jul-22', funding: '11', income: '28', agreement: '12' , additional: '9'},
    //   {group: 'Aug-22', funding: '19', income: '6', agreement: '1' , additional: '3'},
    //   {group: 'Sep-22', funding: '12', income: '1', agreement: '13' , additional: '12'},
    //   {group: 'Oct-22', funding: '6', income: '6', agreement: '33' , additional: '6'},
    //   {group: 'Nov-22', funding: '11', income: '28', agreement: '12' , additional: '3'},
    //   {group: 'Dec-22', funding: '19', income: '6', agreement: '1' , additional: '30'},
    //   {group: 'Jan-23', funding: '12', income: '1', agreement: '13' , additional: '12'},
    //   {group: 'Feb-23', funding: '6', income: '6', agreement: '33' , additional: '10'},
    //   {group: 'Mar-23', funding: '11', income: '28', agreement: '12' , additional: '9'},
    //   {group: 'Apr-23', funding: '19', income: '6', agreement: '1' , additional: '3'},
    //   {group: 'May-23', funding: '12', income: '1', agreement: '13' , additional: '12'},
    //   {group: 'Jun-23', funding: '6', income: '6', agreement: '33' , additional: '6'},
    //   {group: 'Jul-23', funding: '11', income: '28', agreement: '12' , additional: '3'},
    //   {group: 'Aug-23', funding: '19', income: '6', agreement: '1' , additional: '30'},
    //   {group: 'Sep-23', funding: '12', income: '1', agreement: '13' , additional: '12'},
    //   {group: 'Oct-23', funding: '6', income: '6', agreement: '33' , additional: '10'},
    //   {group: 'Nov-23', funding: '11', income: '28', agreement: '12' , additional: '9'},
    //   {group: 'Dec-23', funding: '19', income: '6', agreement: '1' , additional: '3'}
    // ]);
    return () => {
      console.log('DELETE');
      d3.select(svgRef.current)
      .remove();
    }
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

    const sortedDates = Object.keys(groupedInformation).sort(
      (a: any, b: any) => new Date(a).getTime() - new Date(b).getTime(),
    );

    const resultArray = sortedDates.map(date => ({
      date,
      data: groupedInformation[date],
    }));
    let availableFund = 0;
    const newGroupedInformation: any = [];
    resultArray.forEach((value: any, index: any) => {
      const dataValue = value.data;
      const expenditure = dataValue.filter((item: any) => !item?.encumbered?.is_income);
      const expenditureSum = expenditure.reduce((prev: any, cur: any) => {
        return prev + cur?.encumbered?.cost;
      }, 0);
      const areIncome = dataValue.filter((item: any) => item?.encumbered?.is_income);
      const mhfdIncome = areIncome.filter((item: any) => item?.project_partner_name === 'MHFD');
      const otherIncome = areIncome.filter((item: any) => item?.project_partner_name !== 'MHFD');
      const mhfdIncomeSum = mhfdIncome.reduce((prev: any, cur: any) => {
        return prev + cur?.encumbered?.cost;
      }, 0);
      const otherIncomeSum = otherIncome.reduce((prev: any, cur: any) => {
        return prev + cur?.encumbered?.cost;
      }, 0);
      newGroupedInformation.push({
        availableFund: Math.abs(availableFund), // purple
        mhfdfunds: mhfdIncome,
        localfunds: otherIncome,
        expenditure,
        group: value.date,
        mhfdIncomeSum: mhfdIncomeSum, // green
        otherIncomeSum: otherIncomeSum, // blue
        expenditureSum: Math.abs(expenditureSum), // yellow
        dateDisplay: value.date
      });
      availableFund = availableFund + mhfdIncomeSum + otherIncomeSum - expenditureSum;
    });
    let setLocals = new Set(); 
    let maxMhfdCounter = 0;
    newGroupedInformation.forEach((element: any) => {
      element?.localfunds?.forEach((elem: any) => {
        console.log('Elemen', elem.project_partner_name);
        setLocals.add(elem.project_partner_name);
      });
      if (maxMhfdCounter < element?.mhfdfunds?.length) {  
        maxMhfdCounter = element.mhfdfunds.length;
      }
    });
    let informationForchart: any = [];
    newGroupedInformation.forEach((element: any) => {
      const newParsedData: any = {
        group: element.group,
        availableFund: element.availableFund,
        expenditureSum: element.expenditureSum,
        mhfdIncomeSum: element.mhfdIncomeSum,
        otherIncomeSum: element.otherIncomeSum
        // element
      };
      setLocals.forEach((localName: any) => {
        const valueLocal = element.localfunds.filter((item: any) => item.project_partner_name === localName)[0]?.encumbered?.cost;
        newParsedData[localName] = valueLocal ?? 0;
      });
      for(let i = 0 ; i < maxMhfdCounter; i++) {
        const valueMhfd = element.mhfdfunds[i]?.encumbered?.cost;
        newParsedData[`mhfd${i}`] = valueMhfd ?? 0;
      }
      informationForchart.push(newParsedData);
    });
    let newSubGroups = ['availableFund'];
    let newColorsGroups = ['#5D3DC7'];
    setLocals.forEach((localName: any) => {
      newSubGroups.push(localName);
      newColorsGroups.push('#047CD7');
    });
    for(let i = 0 ; i < maxMhfdCounter; i++) {
      newSubGroups.push(`mhfd${i}`);
      newColorsGroups.push('#29C499');
    }
    newSubGroups.push('expenditureSum');
    newColorsGroups.push('#F4BE01');
    console.log('New Grouped Information', informationForchart);
    setSubGroups(newSubGroups);
    setColors(newColorsGroups);
    setData(informationForchart);
  }, [financialInformation]);
  const applyBackgroundRect = (type: string, x: any, y: any, d: any, backgroundRect: any, sumGroups: any) => {
    if (type === 'add') {
      backgroundRect
        .attr('y', y(sumGroups[d.data.group]) - 7)
        .attr('height', (y(0) ?? 0) - y(sumGroups[d.data.group]) + 6)
        .attr('x', d3.event.target.x.animVal.value - 7)
        .attr('width', x.bandwidth() + 13)
        .attr('rx', 5)
        .attr('class', `background-rect-visible`)
        .attr('id', `rect-${d.data.group}`);
      d3.select(`#id${d.data.group}`).attr('class', 'x-axis-selected');
    } else {
      backgroundRect.attr('class', 'background-rect-hidden').attr('id', 'rect-undefined');
      d3.select(`#id${d.data.group}`).attr('class', 'x-axis-stackedbar-chart text');
    }
  };
  const removeAllChildNodes = (parent: any) => {
    if (parent !== null && parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };
  const buildChart = (dataChart: any) => {
    const removechart: any = document.getElementById('svg-ref');
    removeAllChildNodes(removechart);
    const totals: any = {};
    data.forEach((item: any) => {
      console.log('Item ', item);
      if (!totals[item.group]) {
        totals[item.group] = 0;
      }
      subGroups.forEach((subGroup: any) => {
        console.log('ITEM MAPSEr', subGroup, item[subGroup]);
        totals[item.group] += parseInt(item[subGroup]);
      });
    });
    let maxValue;
    // let tickValues;
    let sumGroups: any;
    console.log('Titals ', totals);
    let maxSum = -Infinity;
    for (const group in totals) {
      if (totals[group] > maxSum) {
        maxSum = totals[group];
      }
    }
    sumGroups = totals;
    maxValue = maxSum;
    console.log('Max Sum', maxSum, totals);
    // const tickValue: any = Array.from({ length: Math.ceil(maxSum / 10) + 1 }, (_, i) => i * 10);
    // tickValues = tickValue;

    d3.select(svgRef.current)
      .select('.stackedBar-chart')
      .remove();
    const svg = d3
      .select(svgRef.current)
      .attr('width', totalWidth)
      .attr('height', totalHeight)
      .append('g')
      .attr('id', 'stackedBar-chart')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const groups = dataChart.map((d: any) => d.group);
    const x = d3
      .scaleBand()
      .domain(groups)
      .range([0, width])
      .padding(0.15);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .attr('class', 'x-axis-stackedbar-chart')
      .call(d3.axisBottom(x).tickSizeOuter(0));

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .attr('class', 'x-axis-stackedbar-chart-for-background')
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    const y: any = d3
      .scaleLinear()
      .domain([0, maxValue * 1.1])
      .range([height, 0]);
    svg
      .append('g')
      .attr('class', 'y-axis-stackedbar-chart')
      .call(d3.axisLeft(y));

    // color palette = one color per subgroup
    const color = d3
      .scaleOrdinal()
      .domain(subGroups)
      .range(colors);

    d3.select('.x-axis-stackedbar-chart')
      .selectAll('text')
      .attr('id', function(d: any) {
        return 'id'+d;
      });

    //stack the data? --> stack per subgroup
    const stackedData = d3.stack().keys(subGroups)(dataChart as any);
    const backgroundRect = svg
      .append('g')
      .append('rect')
      .attr('y', 150)
      .attr('height', 0)
      .attr('x', 100)
      .attr('width', 0)
      .attr('rx', 5)
      .attr('id', 'background-rect');
    // Show the bars
    svg
      .append('g')
      .selectAll('g')
      .data(stackedData)
      .enter()
      .append('g')
      .attr('fill', (d: any): any => {
        return color(d.key);
      })
      .selectAll('rect')
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data((d: any): any => {
        return d;
      })
      .enter()
      .append('rect')
      .attr('x', (d: any): any => {
        return x(d.data.group);
      })
      .attr('y', (d: any): any => {
        return y(d[1]);
      })
      .attr('height', (d: any) => {
        const dimention = (y(d[0]) ?? 0) - (y(d[1]) ?? 0);
        return dimention;
      })
      .attr('width', x.bandwidth())
      .attr('rx', 5)
      .attr('stroke', 'white')
      .attr('stroke-width', '2')
      .style('stroke-linecap', 'round')
      .on('mouseover', (d: any) => {
        const selection = d3.select(`#rect-${d.data.group}`);
        if (!selection.empty()) {
          // true the rect is already there // false the rect is of other or doesnt exist
          applyBackgroundRect('remove', x, y, d, backgroundRect, sumGroups);
          setOpenPopup(false);
        } else {
          d3.select('.x-axis-selected').attr('class', 'x-axis-stackedbar-chart text');
          applyBackgroundRect('add', x, y, d, backgroundRect, sumGroups);
          setDataPopup(d.data);
          setOpenPopup(true);
        }
      })
      .on('mouseout', (d: any) => {
        const selection = d3.select(`#rect-${d.data.group}`);
        if (!selection.empty()) {
          // true the rect is already there // false the rect is of other or doesnt exist
          applyBackgroundRect('remove', x, y, d, backgroundRect, sumGroups);
          setOpenPopup(false);
        }
      });
  };

  useEffect(() => {
    if (data.length) {
      buildChart(data);
    }
  }, [data, subGroups, colors]);
  // Agreement
  return (
    <>
      {openPopup && <FinancialsPopup popupData={dataPopup} />}
      <div
        id="stackedBar-chart-container"
        style={{ overflowY: 'auto', position: 'relative', marginTop: '50px', marginBottom: '10px' }}
      >
        <svg id={'svg-ref'} ref={svgRef} width="100%" height="100%" />
      </div>
      <div className="roadmap-body-display " style={{ paddingTop: '0px' }}>
        <span className="span-dots-roadmap">
          <div className="roadmap-circle" style={{ backgroundColor: '#5D3DC7' }} />
          <span className="roadmap-dots-leyend">Available Fund</span>
        </span>
        <span className="span-dots-roadmap">
          <div className="roadmap-circle" style={{ backgroundColor: '#29C499' }} />
          <span className="roadmap-dots-leyend">Funding (MHFD Funds)</span>
        </span>
        <span className="span-dots-roadmap">
          <div className="roadmap-circle" style={{ backgroundColor: '#047CD7' }} />
          <span className="roadmap-dots-leyend">Income (LG Funds)</span>
        </span>
        <span className="span-dots-roadmap">
          <div className="roadmap-circle" style={{ backgroundColor: '#F4BE01' }} />
          <span className="roadmap-dots-leyend">Agreement</span>
        </span>
      </div>
    </>
  );
};

export default StackedBarChart;
