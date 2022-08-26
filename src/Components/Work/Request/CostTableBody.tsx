import { Popover } from 'antd';
import React from 'react';
import { boardType } from './RequestTypes';
import { formatter } from './RequestViewUtil';

const CostTableBody = ({ type, countySum, isFiltered, tabKey }: {
  type: boardType,
  countySum: any,
  isFiltered: boolean,
  tabKey: any
}) => {
  const list = [
    {
        "aoi": "Mile High Flood District",
        "filter": null
    },
    {
        "aoi": "Adams",
        "filter": "County"
    },
    {
        "aoi": "Arapahoe County",
        "filter": "County"
    },
    {
        "aoi": "Arvada",
        "filter": ""
    },
    {
        "aoi": "Aurora",
        "filter": ""
    },
    {
        "aoi": "Boulder",
        "filter": ""
    },
    {
        "aoi": "Boulder County",
        "filter": "County"
    },
    {
        "aoi": "Boulder Creek Service Area",
        "filter": "Service Area"
    },
    {
        "aoi": "Bow Mar",
        "filter": ""
    },
    {
        "aoi": "Brighton",
        "filter": ""
    },
    {
        "aoi": "Broomfield County",
        "filter": "County"
    },
    {
        "aoi": "Castle Pines",
        "filter": ""
    },
    {
        "aoi": "Castle Rock",
        "filter": ""
    },
    {
        "aoi": "Centennial",
        "filter": ""
    },
    {
        "aoi": "Cherry Creek Service Area",
        "filter": "Service Area"
    },
    {
        "aoi": "Cherry Hills Village",
        "filter": ""
    },
    {
        "aoi": "Columbine Valley",
        "filter": ""
    },
    {
        "aoi": "Commerce City",
        "filter": ""
    },
    {
        "aoi": "Denver County",
        "filter": "County"
    },
    {
        "aoi": "Douglas County",
        "filter": "County"
    },
    {
        "aoi": "Edgewater",
        "filter": ""
    },
    {
        "aoi": "Englewood",
        "filter": ""
    },
    {
        "aoi": "Erie",
        "filter": ""
    },
    {
        "aoi": "Federal Heights",
        "filter": ""
    },
    {
        "aoi": "Foxfield",
        "filter": ""
    },
    {
        "aoi": "Glendale",
        "filter": ""
    },
    {
        "aoi": "Golden",
        "filter": ""
    },
    {
        "aoi": "Greenwood Village",
        "filter": ""
    },
    {
        "aoi": "Jefferson County",
        "filter": "County"
    },
    {
        "aoi": "Lafayette",
        "filter": ""
    },
    {
        "aoi": "Lakeside",
        "filter": ""
    },
    {
        "aoi": "Lakewood",
        "filter": ""
    },
    {
        "aoi": "Littleton",
        "filter": ""
    },
    {
        "aoi": "Lochbuie",
        "filter": ""
    },
    {
        "aoi": "Lone Tree",
        "filter": ""
    },
    {
        "aoi": "Lousiville",
        "filter": ""
    },
    {
        "aoi": "Morrison",
        "filter": ""
    },
    {
        "aoi": "Mountain View",
        "filter": ""
    },
    {
        "aoi": "Northeast Service Area",
        "filter": "Service Area"
    },
    {
        "aoi": "Northglenn",
        "filter": ""
    },
    {
        "aoi": "North Service Area",
        "filter": "Service Area"
    },
    {
        "aoi": "Parker",
        "filter": ""
    },
    {
        "aoi": "Sand Creek Service Area",
        "filter": "Service Area"
    },
    {
        "aoi": "SEMSWA",
        "filter": ""
    },
    {
        "aoi": "Sheridan",
        "filter": ""
    },
    {
        "aoi": "South Service Area",
        "filter": "Service Area"
    },
    {
        "aoi": "Southwest Service Area",
        "filter": "Service Area"
    },
    {
        "aoi": "Superior",
        "filter": ""
    },
    {
        "aoi": "Thornton",
        "filter": ""
    },
    {
        "aoi": "Westminster",
        "filter": ""
    },
    {
        "aoi": "West Service Area",
        "filter": "Service Area"
    },
    {
        "aoi": "Wheat Ridge",
        "filter": ""
    }
  ];
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
