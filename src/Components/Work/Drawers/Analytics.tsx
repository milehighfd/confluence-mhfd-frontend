import React, { useState, useEffect } from "react";
import { Drawer, Select, Popover } from 'antd';
import HorizontalBarChart from "../../FiltersProject/NewProblemsFilter/HorizontalBarChart";
import { formatter, MaintenanceTypes } from "../Request/RequestViewUtil";
import { CHART_CONSTANTS } from "../../FiltersProject/NewProblemsFilter/Charts.constants";

const { Option } = Select;

const Analytics = ({
  visible, setVisible, data, tabKey, initialYear
}: {
  visible: boolean,
  setVisible: Function,
  data: any,
  tabKey: string,
  initialYear: number
}) => {
  const getLabel = ()=>{
    if(tabKey == 'Capital' || tabKey == 'Maintenance') {
      return "County"
    } else {
      return "Service Area"
    }
  }
  const contentCounty = (<div className="popver-info">This graphic indicates the number of requests within each Jurisdiction broken out by {getLabel()}.</div>);
  const contentDollars = (<div className="popver-info"> This graphic indicates the dollar amount of requests within each Jurisdiction broken out by {getLabel()}.</div>);
  const [width, setWidth]   = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
  }
  useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const [year, setYear] = useState(+initialYear);
  const years = [];
  for (var i = 0 ; i < 5 ; i++) {
    years.push(+initialYear + i);
  }

  let maxiQ = 0;
  let quantityData = data.map((d: any) => {
    maxiQ = Math.max(maxiQ, d[`cnt${year - initialYear + 1}`]);
    return {
      value: d.locality,
      counter: d[`cnt${year - initialYear + 1}`],
      selected: true
    }
  })

  let maxiA = 0;
  let amountData = data.map((d: any) => {
    maxiA = Math.max(maxiA, d[`req${year - initialYear + 1}`]);
    return {
      value: d.locality,
      counter: d[`req${year - initialYear + 1}`],
      selected: true
    }
  })
  let countiesNames = data.map((d: any) => d.locality).join(',');
  let barsColor = '#261964';
  let groupingType = ['Capital', 'Maintenance'].includes(tabKey) ? 'County': 'Service Area';

  return (
    <Drawer
      title={
        <h5>
          <img src="/Icons/work/chat.svg" alt="" className="menu-wr" /> Analytics
          <Select defaultValue={year} onChange={setYear}>
            {
              years.map((y, i) => (
                <Option key={i} value={y}>{
                  tabKey !== 'Maintenance' ? y : MaintenanceTypes[i]
                }</Option>
              ))
            }
          </Select>
        </h5>
      }
      placement="right"
      closable={true}
      onClose={() => setVisible(false)}
      visible={visible}
      className="work-utilities"
      mask={false}
    >
      <h6>Requests by {groupingType} <Popover content={contentCounty} placement="top" > <img src="/Icons/icon-19.svg" alt="" height="10px" /> </Popover></h6>
      <div className="graph" >
        {maxiQ > 0 &&
        <HorizontalBarChart
          data={quantityData}
          selected={countiesNames}
          onSelect={() => {}}
          defaultValue={[]}
          color={barsColor}
          axisLabel={''}
          scrollClass={'svg-scroll-analytics'}
          showControls={false}
          withClickEvent={false}
          withAnimation={false}
          spaceBetween={40}
          minHeight={40}
          width={220}
          opacityOpaque={CHART_CONSTANTS.opacityFull}
          labelOverflowRight={true}
          minBarSize={0}
        />
        }
      </div>

      <h6>Dollars Requested by {groupingType} <Popover content={contentDollars} placement="topRight" arrowPointAtCenter> <img src="/Icons/icon-19.svg" alt="" height="10px" /> </Popover></h6>
      <div className="graph" >
      {maxiA > 0 &&
      <HorizontalBarChart
          data={amountData}
          selected={countiesNames}
          onSelect={() => {}}
          defaultValue={[]}
          color={barsColor}
          axisLabel={''}
          scrollClass={'svg-scroll-analytics'}
          showControls={false}
          withClickEvent={false}
          withAnimation={false}
          spaceBetween={40}
          minHeight={40}
          width={220}
          barLabelFormatter={(d: any)=> {
            return formatter.format(d.counter)
          }}
          opacityOpaque={CHART_CONSTANTS.opacityFull}
          labelOverflowRight={true}
          minBarSize={0}
        />
      }
      </div>
    </Drawer>
  )
}

export default Analytics;
