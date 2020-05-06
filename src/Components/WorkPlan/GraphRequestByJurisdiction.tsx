import React from 'react';
import GraphOnD3View from '../Shared/D3/GraphOnD3View';

export default () => {


  return <div className="work-pc">
      <div className="wp-chart">
        <h5>Requests by Jurisdiction <img src="/Icons/icon-19.svg" alt="" /></h5>
        <GraphOnD3View />
      </div>
      <div className="wp-chart">
        <h5>Distribution Across Jurisdictions <img src="/Icons/icon-19.svg" alt="" /></h5>
        <div style={{ height: "280px", width: "100%" }}>
          <svg key="donut" height={"280"} width={"100%"} >

          </svg>
        </div>
      </div>
    </div>

}