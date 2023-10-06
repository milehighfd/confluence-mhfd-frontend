import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import FinancialsPopup from './FinancialsPopup';
import { useFinancialDispatch, useFinancialState } from 'hook/financialHook';
import { Col, Row } from 'antd';
import FinancialsClickPopup from '../FinancialsClickPopup';

const StackedBarChart = ({ projectId }: { projectId: any }) => {
  const { financialInformation, clickOpenPopup } = useFinancialState();
  const { getFinancialData,setClickOpenPopup } = useFinancialDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [dataPopup, setDataPopup] = useState({});
  const [clickDataPopup, setClickDataPopup] = useState({});
  const svgRef = useRef<SVGSVGElement>(null);
  const yAxisSvgRef = useRef<SVGSVGElement>(null);
  const currentStatePopup = useRef(false);
  const barWidth = 60;
  const totalHeight = 350;
  const [data, setData] = useState<any>([]);
  const [expenditureArray, setExpenditureArray] = useState<any>([]);
  const [mhfdIncomeArray, setMhfdIncomeArray] = useState<any>([]);
  const [otherIncomeArray, setOtherIncomeArray] = useState<any>([]);
  const [totalSumData, setTotalSumData] = useState<any>([]);
  const [costType, setCostType] = useState<any>('');
  const [subGroups, setSubGroups] = useState<any>(['availableFund', 'mhfdIncomeSum', 'expenditureSum', 'otherIncomeSum']);
  const [colors, setColors] = useState<any>(['#5D3DC7', '#29C499', '#F4BE01', '#047CD7']);
  const colorAndGroup:any= {
    '#5D3DC7' :'availableFund' ,
    '#29C499' :'mhfdIncomeSum' ,
    '#F4BE01' :'expenditureSum' ,
    '#047CD7' :'otherIncomeSum' 
  }
  // const subGroups = ['funding', 'income', 'agreement', 'additional'];
  const margin = { top: 10, right: 30, bottom: 20, left: 6 };
  const marginLeftForAxis = 100;
  const widthForAxis = 100;
  const totalWidth = barWidth * data.length + margin.left + margin.right;
  const width = totalWidth - margin.left - margin.right;
  const height = totalHeight - margin.top - margin.bottom;

  useEffect(() => {
    getFinancialData(projectId, {});
  }, []);

  useEffect(() => {
    currentStatePopup.current = clickOpenPopup ;
  }, [clickOpenPopup]);

  useEffect(() => {
    const ATTRIB_GROUP = 'effective_date';
    const groupedInformation = financialInformation.reduce((prev: any, cur: any) => {
      if (!prev[cur[ATTRIB_GROUP]]) {
        prev[cur[ATTRIB_GROUP]] = [];
      }
      prev[cur[ATTRIB_GROUP]].push(cur);
      return prev;
    }, {});

    const sortedDates = Object.keys(groupedInformation).sort(
      (a: any, b: any) => new Date(a).getTime() - new Date(b).getTime(),
    );

    const resultArray = sortedDates.map(date => ({
      date,
      data: groupedInformation[date],
    }));
    let availableFund = 0;
    const newGroupedInformation: any = [];
    let expenditures:any = [];
    let mhfdIncomes:any = [];
    let otherIncomes:any = [];
    resultArray.forEach((value: any, index: any) => {
      const dataValue = value.data;
            const expenditure = dataValue.filter((item: any) => !item?.encumbered?.is_income);
      expenditures = expenditures.concat(expenditure);
      const expenditureSum = expenditure.reduce((prev: any, cur: any) => {
        return prev + cur?.encumbered?.cost;
      }, 0);
      const areIncome = dataValue.filter((item: any) => item?.encumbered?.is_income);
      const mhfdIncome = areIncome.filter((item: any) => item?.project_partner_name === 'MHFD');
      mhfdIncomes = mhfdIncomes.concat(mhfdIncome);
      const otherIncome = areIncome.filter((item: any) => item?.project_partner_name !== 'MHFD');
      otherIncomes = otherIncomes.concat(otherIncome);
      const mhfdIncomeSum = mhfdIncome.reduce((prev: any, cur: any) => {
        return prev + cur?.encumbered?.cost;
      }, 0);
      const otherIncomeSum = otherIncome.reduce((prev: any, cur: any) => {
        return prev + cur?.encumbered?.cost;
      }, 0);
      availableFund -= expenditureSum;
      newGroupedInformation.push({
        availableFund: availableFund<0 ? 0 : Math.abs(availableFund), // purple
        mhfdfunds: mhfdIncome,
        localfunds: otherIncome,
        expenditure,
        group: value.date,
        mhfdIncomeSum: mhfdIncomeSum, // green
        otherIncomeSum: otherIncomeSum, // blue
        expenditureSum: Math.abs(expenditureSum), // yellow
        dateDisplay: value.date
      });
      availableFund = availableFund + mhfdIncomeSum + otherIncomeSum ;
    });
    setExpenditureArray(expenditures);
    setMhfdIncomeArray(mhfdIncomes);
    setOtherIncomeArray(otherIncomes);
    let setLocals = new Set(); 
    let maxMhfdCounter = 0;
    newGroupedInformation.forEach((element: any) => {
      element?.localfunds?.forEach((elem: any) => {
        setLocals.add(elem.project_partner_name);
      });
      if (maxMhfdCounter < element?.mhfdfunds?.length) {  
        maxMhfdCounter = element.mhfdfunds.length;
      }
    });
    let informationForchart: any = [];
    newGroupedInformation.forEach((element: any) => {
      const newParsedData: any = {
        group: reduceYearinDate(element.group),
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
    for(let i = 0 ; i < maxMhfdCounter; i++) {
      newSubGroups.push(`mhfd${i}`);
      newColorsGroups.push('#29C499');
    }
    setLocals.forEach((localName: any) => {
      newSubGroups.push(localName);
      newColorsGroups.push('#047CD7');
    });
    newSubGroups.push('expenditureSum');
    newColorsGroups.push('#F4BE01');
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

  const reduceYearinDate = (date: any) => {
    var parts = date.split('-');
    var formattedDate = parts[0] + '-' + parts[1] + '-' + parts[2].substring(2);
    return formattedDate;
  }

  const rgbToHex = (rgb: string) => {
    const rgbValues = rgb?.match(/\d+/g)?.map(Number);
      const hexValues = rgbValues?.map(value => {
      const hex = value.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    });
      const hexColor = '#' + hexValues?.join('');
    return hexColor.toUpperCase();
  }

  const buildChart = (dataChart: any) => {
    const removechart: any = document.getElementById('svg-ref');
    const removeAxis: any = document.getElementById('svg-axis');
    removeAllChildNodes(removechart);
    removeAllChildNodes(removeAxis)
    const totals: any = {};
    data.forEach((item: any) => {
      if (!totals[item.group]) {
        totals[item.group] = 0;
      }
      subGroups.forEach((subGroup: any) => {
        totals[item.group] += parseInt(item[subGroup]);
      });
    });
    let maxValue;
    // let tickValues;
    let sumGroups: any;
    let maxSum = -Infinity;
    for (const group in totals) {
      if (totals[group] > maxSum) {
        maxSum = totals[group];
      }
    }
    sumGroups = totals;
    maxValue = maxSum;

    let dollarformat = function(d:any) { return '$' + d3.format(',.0f')(d) };
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
      const svgAxis = d3
      .select(yAxisSvgRef.current)
      .attr('width', widthForAxis)
      .attr('height', totalHeight)
      .append('g')
      .attr('id', 'axis-stackedBar-chart')
      .attr('transform', 'translate(' + marginLeftForAxis + ',' + margin.top + ')');
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
      .range([height, 0])
  
    svg
      .append('g')
      .attr('class', 'y-axis-stackedbar-chart')
      .call(d3.axisLeft(y).tickFormat(dollarformat));

    svgAxis
      .append('g')
      .attr('class', 'y-axis-stackedbar-chart')
      .call(d3.axisLeft(y).tickFormat(dollarformat));

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
      .attr('id', (d: any) => { return `id_${d.data.group}_${(d[1]+d[0]).toString().replace('.','_')}`})
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
      .on('mouseenter', (d: any) => {
        if (!currentStatePopup.current) {
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
        }
      })
      .on('mouseout', (d: any) => {
        const selection = d3.select(`#rect-${d.data.group}`);
        if (!selection.empty()) {
          // true the rect is already there // false the rect is of other or doesnt exist
          applyBackgroundRect('remove', x, y, d, backgroundRect, sumGroups);
          setOpenPopup(false);
        }
      })
      .on('click', (d: any) => {
        setOpenPopup(false);

        d3.selectAll('.clickedBar').attr('opacity', '1').attr('class','')
        d3.select(`#id_${d.data.group}_${(d[1]+d[0]).toString().replace('.','_')}`).attr('opacity', '0.8').attr('class','clickedBar');
        const colorInside = rgbToHex(d3.select(`#id_${d.data.group}_${(d[1]+d[0]).toString().replace('.','_')}`).style('fill'))
        if (colorAndGroup[colorInside] !== 'availableFund') {
          setCostType(colorAndGroup[colorInside])
          setTotalSumData(d.data)
          let dataToSendPopup: any = [];
          let sumPriorGroups =d.data.mhfdIncomeSum + d.data.availableFund;
          if (colorAndGroup[colorInside] === 'mhfdIncomeSum') {
            const filteredMhfdIncomeArray = mhfdIncomeArray.filter((item: any) => reduceYearinDate(item.effective_date) === d.data.group);
            dataToSendPopup = filteredMhfdIncomeArray;
          } else if (colorAndGroup[colorInside] === 'expenditureSum') {
            const filteredExpenditureArray = expenditureArray.filter((item: any) => reduceYearinDate(item.effective_date) === d.data.group);
            dataToSendPopup = filteredExpenditureArray;
          } else if (colorAndGroup[colorInside] === 'otherIncomeSum') {
            const filteredOtherIncomeArray = otherIncomeArray.filter((item: any) => reduceYearinDate(item.effective_date) === d.data.group);
            dataToSendPopup = filteredOtherIncomeArray;
            dataToSendPopup.forEach((item: any) => {
              sumPriorGroups += (sumPriorGroups +item?.encumbered?.cost);
              d3.select(`#id_${d.data.group}_${sumPriorGroups.toString().replace('.','_')}`).attr('opacity', '0.8').attr('class','clickedBar');
              sumPriorGroups =d.data.mhfdIncomeSum + d.data.availableFund +item?.encumbered?.cost;
            });
          }
          setClickDataPopup(dataToSendPopup);
          setClickOpenPopup(true);
        } else {
          setClickOpenPopup(false);
        }
      });
  };

  useEffect(() => {
    console.log('data', data);
    if (data.length) {
      buildChart(data);
    }
  }, [data, subGroups, colors]);

  return (
    <>
      <Row>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 24 }}
          style={{ display: 'flex', alignItems: 'center' }}
          className="subtitle-detail"
        >
          <h3 style={{ paddingBottom: '15px', paddingTop: '20px', marginRight: '35px' }} id="project-financials">
            PROJECT FINANCIALS
          </h3>
          <div className="line-01" style={{ marginBottom: '15px', marginTop: '20px', width: '73%' }}></div>
        </Col>
      </Row>
      {clickOpenPopup && <FinancialsClickPopup popupData={clickDataPopup} totalSumData={totalSumData} type={costType} setVisible={setClickOpenPopup}/>}
      {openPopup && <FinancialsPopup popupData={dataPopup} />}
      <div
        id="stackedBar-chart-container"
        style={{ position: 'relative', marginTop: '-15px', marginBottom: '10px' }}
      >
        <Row>
          <Col>
            <svg id={'svg-axis'} ref={yAxisSvgRef} width="100%" height="100%" />
          </Col>
          <Col style={{ overflowY: 'auto', width: '88%'}}>
          <svg id={'svg-ref'} ref={svgRef} width="100%" height="100%" />
          </Col>
        </Row>
      </div>
      <div className="roadmap-body-display " style={{ paddingTop: '0px' }}>
        <span className="span-dots-roadmap">
          <div className="roadmap-circle" style={{ backgroundColor: '#5D3DC7' }} />
          <span className="roadmap-dots-leyend">Available Funds</span>
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
          <span className="roadmap-dots-leyend">Vendor Agreements</span>
        </span>
      </div>
    </>
  );
};

export default StackedBarChart;
