import React, { useState } from "react";
import { Col, Card, Popover } from "antd";
import { ComponentType } from "../../../Classes/MapTypes";
import DetailedModal from "../Modals/DetailedModal";

import { numberWithCommas } from '../../../utils/utils';
import { Detailed } from "../../../store/types/detailedTypes";

const content = (<div className="popoveer-00">Project Sponsor</div>);
const type = (<div className="popoveer-00">Project Type</div>);
const status = (<div className="popoveer-00">Status</div>);
const cost = (<div className="popoveer-00">Project Cost</div>);
const total = (<div className="popoveer-00">Number Project</div>);

export default ({ data, type, getDetailedPageProblem, getDetailedPageProject, detailed, loaderDetailedPage, setHighlighted, getComponentsByProblemId, componentsOfProblems, loaderTableCompoents }:
                { data: any, type: string, getDetailedPageProblem: Function, getDetailedPageProject: Function, detailed: Detailed, loaderDetailedPage: boolean, 
                setHighlighted: Function, getComponentsByProblemId: Function, componentsOfProblems: any, loaderTableCompoents: boolean }) => {
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
      {visible && <DetailedModal
        detailed={detailed}
        getDetailedPageProblem={getDetailedPageProblem}
        getDetailedPageProject={getDetailedPageProject}
        loaderDetailedPage={loaderDetailedPage}
        getComponentsByProblemId={getComponentsByProblemId}
        type={type}
        data={data}
        visible={visible}
        setVisible={setVisible}
        componentsOfProblems={componentsOfProblems}
        loaderTableCompoents={loaderTableCompoents}
      />}

      <Col span={8}>
        <Card
          hoverable
          style={{ width: '100%' }}
          onClick={() => setVisible(true)}
          onMouseEnter={() =>  setHighlighted({type: data.type, value: data.value})}
          onMouseLeave={()=> setHighlighted({type: '', value: ''})}
          className="card-information"
          cover={
            data.image ? <img alt="example" src={data.image} /> : <img alt="example" src="/Icons/default.png" />
          }
        >
          <div style={{ height: 40 }}>
            <h4>{data.requestName}</h4>
          </div>
          {type === 'Problems' ? <Popover placement="topLeft" content={content}><h6>{data.jurisdiction ? data.jurisdiction : 'No County'}</h6></Popover> : <h6>{data.jurisdiction ? data.jurisdiction : 'No Sponsor'}</h6>}
          <Popover placement="topLeft" content={cost}>
           <h5>${numberWithCommas(data.finalCost ? data.finalCost : data.estimatedCost)} <Popover content={total}><span style={{ float: 'right' }}><b>{data.totalComponents} Components</b></span></Popover> </h5>
          </Popover>
          <hr />
          {type === 'Problems' ? (
            <div style={{ display: 'flex', width: '100%' }}>
            <Popover placement="topLeft" content={type}>
              <p style={{ color: 'red', width: '58%', fontSize: '13px' }}>{data.priority} Priority</p>
            </Popover>
            <Popover content={status}>
              <span style={{ textAlign: 'right', width: '42%', fontSize: '13px' }}>Solved {data.percentage}%</span>
            </Popover>
            </div>
          ) : (
              <div style={{ display: 'flex', width: '100%' }}>
               <Popover placement="topLeft" content={type}>
                 <p style={{ color: ' #11093c', width: '58%', opacity: '0.6', fontSize: '13px' }}>{data.projecttype}</p>
               </Popover>
               <Popover content={status}>
                  <span style={{ textAlign: 'right', width: '42%', color: ' #11093c', opacity: '0.6', fontSize: '13px' }}>{data.status}</span>
                </Popover>
              </div>
            )}
        </Card>
      </Col>
    </>
  );
}
