import React from 'react';
import { Popover } from 'antd';
import { boardType } from 'Components/Work/Request/RequestTypes';
import { formatter } from 'Components/Work/Request/RequestViewUtil';
import { useRequestState } from 'hook/requestHook';

const CostTableBody = ({ type, countySum, tabKey }: {
  type: boardType,
  countySum: any,
  tabKey: any
}) => {
  const suffix = type === 'WORK_PLAN' ? (tabKey === 'Study' ? 'Service Area' : 'County') : '';
  const { showFilters: isFiltered } = useRequestState();
  const getLabel = () => {
    if (tabKey === 'Capital' || tabKey === 'Maintenance') {
      return "County"
    } else {
      return "Service Area"
    }
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
          {`${countySum.locality} ${suffix}`}
          <Popover content={content00}>
            <img src="/Icons/icon-19.svg" alt="" height="10px" style={{ marginLeft: '4px' }} />
          </Popover>
        </label>
      </div>
      <div style={{ opacity: isFiltered ? 0.5 : 1 }}>{countySum.req1 ? formatter.format(Math.floor(countySum.req1)) : `$0`}</div>
      <div style={{ opacity: isFiltered ? 0.5 : 1 }}>{countySum.req2 ? formatter.format(Math.floor(countySum.req2)) : `$0`}</div>
      <div style={{ opacity: isFiltered ? 0.5 : 1 }}>{countySum.req3 ? formatter.format(Math.floor(countySum.req3)) : `$0`}</div>
      <div style={{ opacity: isFiltered ? 0.5 : 1 }}>{countySum.req4 ? formatter.format(Math.floor(countySum.req4)) : `$0`}</div>
      <div style={{ opacity: isFiltered ? 0.5 : 1 }}>{countySum.req5 ? formatter.format(Math.floor(countySum.req5)) : `$0`}</div>
    </div>
  );
};

export default CostTableBody;
