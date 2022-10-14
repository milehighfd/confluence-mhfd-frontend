import { Popover } from 'antd';
import React from 'react';
import { boardType } from './RequestTypes';
import { formatter } from './RequestViewUtil';
import { list } from './../../../constants/constants';

const CostTableBody = ({ type, countySum, isFiltered, tabKey }: {
  type: boardType,
  countySum: any,
  isFiltered: boolean,
  tabKey: any
}) => {
 
  const getLabel = ()=>{
    if(tabKey === 'Capital' || tabKey === 'Maintenance') {
      return "County"
    } else {
      return "Service Area"
    }
  }
  const getSuffix = (name: string) => {
    const element = list.filter((el: any) => {
      return el.aoi.includes(name);
    });
    if (element.length) {
      return element[0].filter;
    }
    return '';
  }
  const localityName = (name: string) => {
    return name.includes('County') || name.includes('county') || name.includes('Service Area') 
      ? name : name + ` ${getSuffix(name)}`;
  }
  const content00 = (
    <div className="popver-info">
      Breakdown of project budget requests by {type === 'WORK_REQUEST' ? `${getLabel()} within each` : ''} , where applicable.
    </div>
  );
  return (
    <div className="tab-body-line">
      <div>
        <label>
          {localityName(countySum.locality)}
          <Popover content={content00}>
            <img src="/Icons/icon-19.svg" alt="" height="10px" style={{ marginLeft: '4px' }} />
          </Popover>
        </label>
      </div>
      <div style={{opacity: isFiltered ? 0.5 : 1 }}>{countySum.req1 ? formatter.format(Math.floor(countySum.req1)) : `$0`}</div>
      <div style={{opacity: isFiltered ? 0.5 : 1 }}>{countySum.req2 ? formatter.format(Math.floor(countySum.req2)) : `$0`}</div>
      <div style={{opacity: isFiltered ? 0.5 : 1 }}>{countySum.req3 ? formatter.format(Math.floor(countySum.req3)) : `$0`}</div>
      <div style={{opacity: isFiltered ? 0.5 : 1 }}>{countySum.req4 ? formatter.format(Math.floor(countySum.req4)) : `$0`}</div>
      <div style={{opacity: isFiltered ? 0.5 : 1 }}>{countySum.req5 ? formatter.format(Math.floor(countySum.req5)) : `$0`}</div>
    </div>
  )
}

export default CostTableBody;
