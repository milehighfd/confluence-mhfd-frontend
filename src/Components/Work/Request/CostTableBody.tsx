import { Popover } from 'antd';
import React from 'react';
import { formatter } from './RequestViewUtil';

const content00 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>);

const CostTableBody = ({ countySum, isFiltered }: {
  countySum: any,
  isFiltered: boolean
}) => {

  return (
    <div className="tab-body-line">
      <div>
        <label>
          {countySum.locality}
          <Popover content={content00}><img src="/Icons/icon-19.svg" alt="" height="10px" style={{ marginLeft: '4px' }} />
          </Popover>
        </label>
      </div>
      <div style={{opacity: isFiltered ? 0.5 : 1 }}>{countySum.req1 ? formatter.format(countySum.req1) : `$0`}</div>
      <div style={{opacity: isFiltered ? 0.5 : 1 }}>{countySum.req2 ? formatter.format(countySum.req2) : `$0`}</div>
      <div style={{opacity: isFiltered ? 0.5 : 1 }}>{countySum.req3 ? formatter.format(countySum.req3) : `$0`}</div>
      <div style={{opacity: isFiltered ? 0.5 : 1 }}>{countySum.req4 ? formatter.format(countySum.req4) : `$0`}</div>
      <div style={{opacity: isFiltered ? 0.5 : 1 }}>{countySum.req5 ? formatter.format(countySum.req5) : `$0`}</div>
    </div>
  )
}

export default CostTableBody;
