import React, { useState } from "react";
import { Drawer, Select } from 'antd';
import HorizontalBarChart from "../../FiltersProject/NewProblemsFilter/HorizontalBarChart";

const { Option } = Select;

const Analytics = ({
  visible, setVisible, data, showYearDropdown, initialYear
}: {
  visible: boolean,
  setVisible: Function,
  data: any,
  showYearDropdown: boolean,
  initialYear: number
}) => {
  const [year, setYear] = useState(initialYear);

  const years = [];
  for (var i = 0 ; i < 5 ; i++) {
    years.push(initialYear + i);
  }

  let quantityData = data.map((d: any) => {
    return {
      value: d.county,
      counter: d[`cnt${year - initialYear + 1}`],
      selected: true
    }
  })

  let amountData = data.map((d: any) => {
    return {
      value: d.county,
      counter: d[`req${year - initialYear + 1}`],
      selected: true
    }
  })

  let countiesNames = data.map((d: any) => d.county).join(',');
  let barsColor = '#261964';

  return (
    <Drawer
      title={
        <h5>
          <img src="/Icons/work/chat.svg" alt="" className="menu-wr" /> STATUS
          {
            showYearDropdown && 
            <Select defaultValue={year} onChange={setYear} style={{ width: 75 }}>
              {
                years.map((y, i) => (
                  <Option key={i} value={y}>{y}</Option>
                ))
              }
            </Select>
          }
        </h5>
      }
      placement="right"
      closable={true}
      onClose={() => setVisible(false)}
      visible={visible}
      className="work-utilities"
    >
      <h6>Requests by County <img src="/Icons/icon-19.svg" alt="" height="10px" /></h6>
      <div className="graph">
        <HorizontalBarChart
          data={quantityData}
          selected={countiesNames}
          onSelect={() => {}}
          defaultValue={[]}
          color={barsColor}
          axisLabel={'Number of Projects'}
          scrollClass={'svg-scroll-analytics'}
          showControls={false}
        />
      </div>

      <h6>Dollars Requested by County <img src="/Icons/icon-19.svg" alt="" height="10px" /></h6>
      <div className="graph">
      <HorizontalBarChart
          data={amountData}
          selected={countiesNames}
          onSelect={() => {}}
          defaultValue={[]}
          color={barsColor}
          axisLabel={'Dollars'}
          scrollClass={'svg-scroll-analytics'}
          showControls={false}
        />
      </div>
    </Drawer>
  )
}

export default Analytics;
