import React, { useState } from "react";
import { Col, Card } from "antd";
import { ComponentType } from "../../../Classes/MapTypes";
import DetailedModal from "../Modals/DetailedModal";

import { numberWithCommas } from '../../../utils/utils';

export default ({ data, type }: { data: any, type: string }) => {
  const [visible, setVisible] = useState(false);
  const getComponentSizes = (components : Array<ComponentType>) => {
      if (components && components.length) {
          let sideText = ' Components';
          if (components.length === 1) {
              sideText = sideText.slice(0, -1);
          } 
          return components.length + sideText;
      } else {
          return '0 Components';
      }
  }
  return (
    <>
        <DetailedModal 
          data={data}
          visible={visible}
          setVisible={setVisible}
        />

      <Col span={8}>
        <Card
          hoverable
          style={{ width: '100%' }}
          onClick={() => setVisible(true)}
          className="card-information"
          cover={
            data.image ? <img alt="example" src={data.image} /> : <img alt="example" src="/Icons/default.png" />
          }
        >
          <div style={{ height: 40 }}>
            <h4>{data.requestName}</h4>
          </div>
          {type === 'Problems' ? <h6>{data.jurisdiction ? data.jurisdiction : 'No County'}</h6> : <h6>{data.jurisdiction ? data.jurisdiction : 'No Sponsor'}</h6>}
          <h5>${numberWithCommas(data.finalCost ? data.finalCost : data.estimatedCost)} <span style={{ float: 'right' }}><b>{getComponentSizes(data.components)}</b> </span></h5>
          <hr />
          {type === 'Problems' ? (
            <div style={{ display: 'flex', width: '100%' }}>
              <p style={{ color: 'red', width: '50%' }}>{data.priority} Priority</p>
              <span style={{ textAlign: 'right', width: '50%' }}>{data.percentage}%</span>
            </div>
          ) : (
              <div style={{ display: 'flex', width: '100%' }}>
                <p style={{ color: ' #11093c', width: '50%', opacity: '0.6' }}>{data.projecttype}</p>
                <span style={{ textAlign: 'right', width: '50%', color: ' #11093c', opacity: '0.6' }}>{data.status}</span>
              </div>
            )}
        </Card>
      </Col>
    </>
  );
}