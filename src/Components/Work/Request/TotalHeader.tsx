import React from 'react';
import { formatter } from './RequestViewUtil';

const TotalHeader = ({ columns, jurisdictionSelected, csaSelected }: {
    columns: any[],
    jurisdictionSelected: any[],
    csaSelected: any[]
}) => {
    let totals = [0, 0, 0, 0, 0];
    columns.forEach((col: any, colIdx: number) => {
      if (colIdx === 0) return;
      col.projects.filter((p: any) => {
        return jurisdictionSelected.includes(p.projectData.jurisdiction) && (
          csaSelected.includes(p.projectData.county) ||
          csaSelected.includes(p.projectData.servicearea)
        );
      })
      .forEach((p: any) => {
        totals[colIdx - 1] += p[`req${colIdx}`];
      })
  
    })
    return (
      <div className="tab-head-project">
        <div><label>Total Cost</label></div>
        {
          totals.map((t, i) => (
            <div key={i}>{t ? formatter.format(t) : 0}</div>
          ))
        }
      </div>
    )
}

export default TotalHeader;
