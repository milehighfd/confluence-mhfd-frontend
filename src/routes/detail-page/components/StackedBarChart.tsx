import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import FinancialsPopup from './FinancialsPopup';
import { useFinancialDispatch, useFinancialState } from 'hook/financialHook';
import { Col, Row } from 'antd';
import FinancialsClickPopup from '../FinancialsClickPopup';

const getCummulativeData = (dataValue: any) => {
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
  return {
    expenditure,
    expenditureSum,
    mhfdIncome,
    mhfdIncomeSum,
    otherIncome,
    otherIncomeSum,
  };
};

const getDataForRestorationCharts = (resultArray: any) => {
  let availableFund = 0;
  return resultArray.map((value: any, index: any) => {
    const {
      expenditure, expenditureSum,
      mhfdIncome, mhfdIncomeSum,
      otherIncome, otherIncomeSum
    } = getCummulativeData(value.data);
    let mhfdBottom, mhfdTop,
      otherBottom, otherTop,
      expenditureBottom, expenditureTop,
      fundingBottom, fundingTop,
      bottom, top;
    
    bottom = 0;
    fundingBottom = 0;
    fundingTop = availableFund;
    mhfdBottom = fundingTop;
    mhfdTop = mhfdBottom + mhfdIncomeSum;
    otherBottom = mhfdTop;
    otherTop = otherBottom + otherIncomeSum;
    expenditureBottom = otherTop;
    expenditureTop = expenditureBottom + expenditureSum;
    top = expenditureTop;

    return {
      date: value.date,
      mhfdBottom,
      mhfdTop,
      otherBottom,
      otherTop,
      expenditureBottom,
      expenditureTop,
      fundingBottom,
      fundingTop,
      mhfdIncome,
      otherIncome,
      expenditure,
      bottom,
      top,
      mhfdIncomeSum,
      otherIncomeSum,
      availableFund,
      expenditureSum,
    }
  });
}

const getDataForNormalCharts = (resultArray: any) => {
  let cummulativeFund = 0;
  return resultArray.map((value: any, index: any) => {
    const {
      expenditure, expenditureSum,
      mhfdIncome, mhfdIncomeSum,
      otherIncome, otherIncomeSum
    } = getCummulativeData(value.data);
    let mhfdBottom, mhfdTop,
      otherBottom, otherTop,
      expenditureBottom, expenditureTop,
      fundingBottom, fundingTop,
      bottom, top;

    const initialPoint = cummulativeFund;
    const change = mhfdIncomeSum + otherIncomeSum - expenditureSum;
    if (change !== 0 && (change + initialPoint) === 0) {
      cummulativeFund = 0;
      if (change > 0) {
        bottom = initialPoint;
        mhfdBottom = bottom;
        mhfdTop = bottom + mhfdIncomeSum;
        otherBottom = mhfdTop;
        otherTop = otherBottom + otherIncomeSum;
        top = otherTop;
      } else {
        top = initialPoint;
        expenditureTop = top;
        expenditureBottom = top - expenditureSum;
        bottom = expenditureBottom;
      }
    } else {
      const signChange = (cummulativeFund + change) * cummulativeFund < 0;
      cummulativeFund += change;
      if (signChange) {
        if (change > 0) {
          bottom = initialPoint;
          mhfdBottom = bottom;
          mhfdTop = bottom + mhfdIncomeSum;
          otherBottom = mhfdTop;
          otherTop = otherBottom + otherIncomeSum;
          top = otherTop;
        } else {
          top = initialPoint;
          expenditureTop = top;
          expenditureBottom = top - expenditureSum;
          bottom = expenditureBottom;
        }
      } else {
        if (cummulativeFund >= 0) {
          bottom = 0;
          fundingBottom = bottom;
          fundingTop = initialPoint - expenditureSum;
          expenditureBottom = fundingTop;
          expenditureTop = initialPoint;
          mhfdBottom = expenditureTop;
          mhfdTop = mhfdBottom + mhfdIncomeSum;
          otherBottom = mhfdTop;
          otherTop = otherBottom + otherIncomeSum;
          top = otherTop;
        } else {
          top = 0;
          mhfdTop = top;
          mhfdBottom = mhfdTop - mhfdIncomeSum;
          otherTop = mhfdBottom;
          otherBottom = otherTop - otherIncomeSum;
          fundingTop = otherBottom;
          fundingBottom = initialPoint;
          expenditureTop = fundingBottom;
          expenditureBottom = expenditureTop - expenditureSum;
          bottom = expenditureBottom;
        }
      }
    }

    return {
      date: value.date,
      mhfdBottom,
      mhfdTop,
      otherBottom,
      otherTop,
      expenditureBottom,
      expenditureTop,
      fundingBottom,
      fundingTop,
      mhfdIncome,
      otherIncome,
      expenditure,
      bottom,
      top,
      mhfdIncomeSum,
      otherIncomeSum,
      availableFund: initialPoint >= 0 ? initialPoint : 0,
      expenditureSum: initialPoint >= 0 ? expenditureSum : Math.abs(cummulativeFund),
    }
  });
}

const getChartData = (financialInformation: any, isRestoration: boolean) => {
  const ATTRIB_GROUP = 'effective_date';
  const groupedInformation = ([
    ...financialInformation,
    // {
    //   "effective_date":"06-07-2023",
    //   "project_partner_name":"Muller Engineering Company, Inc.",
    //   "encumbered":{
    //     "is_income":true,
    //     "cost":540718
    //   }
    // },
    // {
    //   "effective_date":"07-07-2023",
    //   "project_partner_name":"MHFD",
    //   "encumbered":{
    //     "is_income":true,
    //     "cost":10718
    //   }
    // }
  ]).reduce((prev: any, cur: any) => {
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
  const resultArrayFiltered = resultArray.filter((item: any) => item.date !== 'null');
  const updatedData = resultArrayFiltered.map((item:any) => {
    const [day, month, year] = item.date.split('-');
    const twoDigitYear = year.slice(-2);
    return {
      ...item,
      date: `${day}-${month}-${twoDigitYear}`
    };
  });

  if (isRestoration) {
    return getDataForRestorationCharts(updatedData);
  } else {
    return getDataForNormalCharts(updatedData);
  }
};

const StackedBarChart = ({ projectId, isRestoration }: { projectId: any; isRestoration: boolean }) => {
  const divRef = useRef<HTMLDivElement>(null);
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
  const [costType, setCostType] = useState<any>('');

  useEffect(() => {
    getFinancialData(projectId, {});
  }, []);

  useEffect(() => {
    currentStatePopup.current = clickOpenPopup ;
  }, [clickOpenPopup]);

  useEffect(() => {
    const chartData = getChartData(financialInformation, isRestoration);
    buildChart(chartData);
  }, [financialInformation]);

  const buildChart = (dataChart: any) => {
    const containerWidth: number = divRef.current?.clientWidth as number - 50;
    //const margin = { top: 10, right: 30, bottom: 20, left: 6 };
    const margin = { top: 0, right: 30, bottom: 20, left: 6 };
    const marginLeftForAxis = 100;
    const widthForAxis = 100;
    const totalWidth = barWidth * dataChart.length + margin.left + margin.right;
    const width = totalWidth - margin.left - margin.right;
    const height = totalHeight - margin.top - margin.bottom;

    const largestWidth = Math.max(totalWidth, containerWidth);

    const removechart: any = document.getElementById('svg-ref');
    const removeAxis: any = document.getElementById('svg-axis');
    removeAllChildNodes(removechart);
    removeAllChildNodes(removeAxis)

    let maxValue = Math.max(...dataChart.map((item: any) => item.top));
    let minValue = Math.min(...dataChart.map((item: any) => item.bottom));

    let dollarformat = function(d: any) {
      if (d < 0) {
        return '($' + d3.format(',.0f')(-d) + ')';
      }
      return '$' + d3.format(',.0f')(d);
    };

    d3.select(svgRef.current)
      .select('.stackedBar-chart')
      .remove();
    const svg = d3
      .select(svgRef.current)
      .attr('width', largestWidth)
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
    const groups = dataChart.map((d: any) => d.date);

    const x = d3
      .scaleBand()
      .domain(groups)
      .range([0, width])
      .padding(0.15);

    const axisGroup = svg.append('g');
    axisGroup
      .attr('transform', `translate(0, ${height})`)
      .attr('class', 'x-axis-stackedbar-chart')
      .call(d3.axisBottom(x).tickSizeOuter(0));

    axisGroup.select(".domain").attr('d', `M0.5,0.5H${largestWidth}`);

    const axisGroupBackground = svg.append('g');

    axisGroupBackground
      .attr('transform', `translate(0, ${height})`)
      .attr('class', 'x-axis-stackedbar-chart-for-background')
      .call(d3.axisBottom(x).tickSizeOuter(0));
    axisGroupBackground.select('.domain').remove();
        let radius = 10;
      axisGroupBackground.append('rect')
        .attr('id', 'hack')
        .attr('x', 0.5)
        .attr('y', 5)
        .attr('width', largestWidth-6)
        .attr('height', 15)
        .attr('rx', radius)
        .attr('fill', 'gray')
        .attr('opacity', 0.1)
        .attr('ry', radius).raise();

    const offset = (maxValue - minValue) * 0.01;

    const y: any = d3
      .scaleLinear()
      .domain([minValue - offset, maxValue + offset])
      .range([height, 0])

    svg
      .append('g')
      .attr('class', 'y-axis-stackedbar-chart')
      .call(d3.axisLeft(y).tickFormat(dollarformat));

    svgAxis
      .append('g')
      .attr('class', 'y-axis-stackedbar-chart')
      .call(d3.axisLeft(y).tickFormat(dollarformat));

    d3.select('.x-axis-stackedbar-chart')
      .selectAll('text')
      .attr('id', function(d: any) {
        return 'id'+d;
      });

    d3.select(svgRef.current).select('#chart2').remove();
    let g = d3.select(svgRef.current).append('g').attr('id', 'chart2');
    const props = ['funding', 'mhfd', 'other', 'expenditure'];
    const propMapping: any = {
      'funding' :'availableFund',
      'mhfd' :'mhfdIncomeSum',
      'expenditure' :'expenditureSum',
      'other' :'otherIncomeSum'
    };
    const colorMapping: any = {
      'funding' :'#5D3DC7',
      'mhfd' :'#29C499',
      'expenditure' :'#F4BE01',
      'other' :'#047CD7'
    };
    dataChart.forEach((data: {
      date: string;
      mhfdBottom: number;
      mhfdTop: number;
      otherBottom: number;
      otherTop: number;
      expenditureBottom: number;
      expenditureTop: number;
      top: number;
      bottom: number;
      fundingBottom: number;
      fundingTop: number;
      expenditureSum: number;
      mhfdIncomeSum: number;
      otherIncomeSum: number;
      availableFund: number;
      mhfdIncome: any[],
      otherIncome: any[],
      expenditure: any[],
    }) => {
      props.forEach((prop) => {
        const topValue = (data as any)[`${prop}Top`];
        const bottomValue = (data as any)[`${prop}Bottom`];
        const backgroundRect = svg
        .append('g')
        .append('rect')
        .attr('y', 150)
        .attr('height', 0)
        .attr('x', 100)
        .attr('width', 0)
        .attr('rx', 5)
        .attr('id', 'background-rect');
        if (topValue !== undefined && bottomValue !== undefined) {
          const color = prop === 'funding' ? (data.fundingBottom >= 0 ? colorMapping[prop] : colorMapping['expenditure']) : colorMapping[prop] ;

          const currentRect = g.append('rect')
            .attr('x', x(data.date) as any)
            .attr('y', y(topValue))
            .attr('width', x.bandwidth())
            .attr('rx', 5)
            .attr('stroke', 'white')
            .attr('stroke-width', '2')
            .style('stroke-linecap', 'round')
            .attr('height', Math.abs(y(bottomValue) - y(topValue)))
            .attr('fill', color);

          currentRect.on('mouseenter', (d: any) => {
            if (!currentStatePopup.current) {
              if (openPopup) {
                applyBackgroundRect('remove', data.date, x(data.date), y(data.top), Math.abs(y(data.top) - y(data.bottom)), x.bandwidth(), backgroundRect);
                setOpenPopup(false);
              } else {
                d3.select('.x-axis-selected').attr('class', 'x-axis-stackedbar-chart text');
                applyBackgroundRect('add', data.date, x(data.date), y(data.top), Math.abs(y(data.top) - y(data.bottom)), x.bandwidth(), backgroundRect);
                setDataPopup({
                  date: data.date,
                  expenditureSum: data.expenditureSum,
                  mhfdIncomeSum: data.mhfdIncomeSum,
                  otherIncomeSum: data.otherIncomeSum,
                  availableFund: data.availableFund,
                });
                setOpenPopup(true);
              }
            }
          })
          .on('mouseout', () => {
            applyBackgroundRect('remove', data.date, x(data.date), y(data.top), Math.abs(y(data.top) - y(data.bottom)), x.bandwidth(), backgroundRect);
            setOpenPopup(false);
          })
          .on('click', (d: any) => {
            setOpenPopup(false);
            d3.selectAll('.clickedBar').attr('opacity', '1').attr('class','')
            currentRect.attr('opacity', '0.8').attr('class','clickedBar');

            if (propMapping[prop] !== 'availableFund') {
              setCostType(propMapping[prop])
              let dataToSendPopup: any = [];
              // let sumPriorGroups = data.mhfdIncomeSum + data.availableFund;
              if (propMapping[prop] === 'mhfdIncomeSum') {
                dataToSendPopup = data.mhfdIncome;
              } else if (propMapping[prop] === 'expenditureSum') {
                dataToSendPopup = data.expenditure;
              } else if (propMapping[prop] === 'otherIncomeSum') {
                dataToSendPopup = data.otherIncome;
                // const filteredOtherIncomeArray = otherIncomeArray.filter((item: any) => reduceYearinDate(item.effective_date) === d.data.group);
                // dataToSendPopup = filteredOtherIncomeArray;
                // dataToSendPopup.forEach((item: any) => {
                //   sumPriorGroups += (sumPriorGroups +item?.encumbered?.cost);
                //   d3.select(`#id_${d.data.group}_${sumPriorGroups.toString().replace('.','_')}`).attr('opacity', '0.8').attr('class','clickedBar');
                //   sumPriorGroups =d.data.mhfdIncomeSum + d.data.availableFund +item?.encumbered?.cost;
                // });
              }
              setClickDataPopup({
                date: data.date,
                value: (data as any)[propMapping[prop]],
                records: dataToSendPopup,
                color
              });
              setClickOpenPopup(true);
            } else {
              setClickOpenPopup(false);
            }
          });
        }
      });
    });
    if (minValue < 0) {
      g.append("line")
        .attr("x1", 0)
        .attr("x2", largestWidth)
        .attr("y1", y(0))
        .attr("y2", y(0))
        .attr("stroke", "gray")
        .attr("stroke-width", 1);
    }
  };
  const applyBackgroundRect = (type: string, date: any, x: any, y: any, h: any, w: any, backgroundRect: any) => {
    if (type === 'add') {
      backgroundRect
        .attr('y', y - 6)
        .attr('height', h+12)
        .attr('x', x - 12)
        .attr('width', w+12)
        .attr('rx', 5)
        .attr('class', `background-rect-visible`)
      d3.select(`#id${date}`).attr('class', 'x-axis-selected');
    } else {
      backgroundRect.attr('class', 'background-rect-hidden');
      d3.select(`#id${date}`).attr('class', 'x-axis-stackedbar-chart text');
    }
  };

  const removeAllChildNodes = (parent: any) => {
    if (parent !== null && parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

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
      {clickOpenPopup && <FinancialsClickPopup popupData={clickDataPopup} type={costType} setVisible={setClickOpenPopup}/>}
      {openPopup && <FinancialsPopup popupData={dataPopup} />}
      <div
        id="stackedBar-chart-container"
        style={{ position: 'relative', marginTop: '-15px', marginBottom: '10px' }}
      >
        <Row>
          <Col>
            <svg id={'svg-axis'} ref={yAxisSvgRef} width="100%" height="100%" />
          </Col>
          <Col ref={divRef} style={{ overflowY: 'auto', width: '88%'}}>
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
