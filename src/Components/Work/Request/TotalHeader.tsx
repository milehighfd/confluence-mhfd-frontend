import React from 'react';
import { filterByJurisdictionAndCsaSelected, formatter } from './RequestViewUtil';

const TotalHeader = ({ columns, jurisdictionSelected, csaSelected, jurisdictionFilterList, csaFilterList }: {
    columns: any[],
    jurisdictionSelected: any[],
    csaSelected: any[],
    jurisdictionFilterList: any[],
    csaFilterList: any[]
  }) => {
    let totals = [0, 0, 0, 0, 0];
    columns.forEach((col: any, colIdx: number) => {
      if (colIdx === 0) return;
      col.projects.filter((p: any) => filterByJurisdictionAndCsaSelected(jurisdictionSelected, csaSelected, jurisdictionFilterList, csaFilterList, p))
      .forEach((p: any) => {
        totals[colIdx - 1] += p[`req${colIdx}`];
      })
    })
    return (
      <div className="tab-head-project">
        <div><label>Total Cost</label></div>
        {
          totals.map((t, i) => (
            <div key={i}>{t ? formatter.format(Math.floor(t)) : '$0'}</div>
          ))
        }
      </div>
    )
}

export default TotalHeader;
