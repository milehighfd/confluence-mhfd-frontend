import React, { useState } from "react";
import { Drawer, Select } from 'antd';
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

  return (
    <Drawer
      title={
        <h5>
          <img src="/Icons/work/chat.svg" alt="" className="menu-wr" /> Analytics
          <Select defaultValue={year} onChange={setYear} style={{ width: tabKey !== 'Maintenance' ? 100 : 200 }}>
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
      <h6>Requests by County <img src="/Icons/icon-19.svg" alt="" height="10px" /></h6>
      <div className="graph">
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
          width={220}
          opacityOpaque={CHART_CONSTANTS.opacityFull}
          labelOverflowRight={true}
          minBarSize={0}
        />
        }
      </div>

      <h6>Dollars Requested by County <img src="/Icons/icon-19.svg" alt="" height="10px" /></h6>
      <div className="graph">
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
