import React, { useState } from "react";
import { Col, Card, Popover, Menu, Dropdown, Button } from "antd";
import { ComponentType } from "../../../Classes/MapTypes";
import DetailedModal from "../Modals/DetailedModal";

import { numberWithCommas } from '../../../utils/utils';
import { Detailed } from "../../../store/types/detailedTypes";

const content = (<div className="popoveer-00">Project Sponsor</div>);
const status = (<div className="popoveer-00">Status</div>);
const cost = (<div className="popoveer-00">Project Cost</div>);
const total = (<div className="popoveer-00">Number Project</div>);


export default ({ data, type, getDetailedPageProblem, getDetailedPageProject, detailed, loaderDetailedPage, setHighlighted, getComponentsByProblemId, componentsOfProblems, loaderTableCompoents, selectedOnMap, componentCounter,
  getComponentCounter, setZoomProjectOrProblem }:
                { data: any, type: string, getDetailedPageProblem: Function, getDetailedPageProject: Function, detailed: Detailed, loaderDetailedPage: boolean,
                setHighlighted: Function, getComponentsByProblemId: Function, componentsOfProblems: any, loaderTableCompoents: boolean, selectedOnMap: any, componentCounter: number,
                getComponentCounter: Function, setZoomProjectOrProblem: Function }) => {
  const [visible, setVisible] = useState(false);
  const changeCenter = () => {
    setZoomProjectOrProblem(data.coordinates);
  }
  const menu = (
    <Menu className="js-mm-00" >
      {/* <div className="card-arrow-menu" ></div> */}
      <div className="drop-head">LIST ACTIONS</div>
      <Menu.Item onClick={(e: any) => {changeCenter()}}>
        <span className="menu-item-text" style={{opacity:'0.5'}}>Zoom to Feature</span>
      </Menu.Item>
      <Menu.Item disabled={true}>
        <span className="menu-item-text" style={{opacity:'0.5'}}>Favorite Card</span>
      </Menu.Item>
      <Menu.Item disabled={true}>
        <span className="menu-item-text" style={{opacity:'0.5'}}>Comment</span>
      </Menu.Item>
      <Menu.Item disabled={true}>
        <span className="menu-item-text" style={{opacity:'0.5'}}>Add Team Member</span>
      </Menu.Item>
    </Menu>
  );
  
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
        componentCounter={componentCounter}
        getComponentCounter={getComponentCounter}
      />}

      <Col span={8}>
        <Card
          hoverable
          style={{ width: '100%', boxShadow: (selectedOnMap.id === data.cartodb_id && selectedOnMap.tab.includes(type.toLocaleLowerCase())) ? '0 2px 8px #28c499' : '' }}
          onClick={() => setVisible(true)}
          onMouseEnter={() =>  setHighlighted({type: data.type, value: data.value})}
          onMouseLeave={()=> setHighlighted({type: '', value: ''})}
          className="card-information"
          cover={
            data.image ? <img alt="example" src={data.image} /> : <img alt="example" src="/Icons/default.png" />
          }
        >
          <Popover content={menu} placement="bottomLeft" trigger="click">
            <Button className="btn-card" onClick={(e: any) => e.stopPropagation()}>...</Button>
          </Popover>
          <div style={{ height: 40 }}>
            <h4>{data.requestName}</h4>
          </div>
          {type === 'Problems' ? <Popover placement="topLeft" content={content}><h6>{data.jurisdiction ? data.jurisdiction : 'No County'}</h6></Popover> : <h6>{data.sponsor ? data.sponsor : 'No Sponsor'}</h6>}
          <Popover placement="topLeft" content={cost}>
           <h5>${numberWithCommas(data.finalCost ? data.finalCost : data.estimatedCost)} <Popover content={total}><span style={{ float: 'right' }}><b>{data.totalComponents} Components</b></span></Popover> </h5>
          </Popover>
          <hr />
          {type === 'Problems' ? (
            <div style={{ display: 'flex', width: '100%' }}>
            <Popover placement="topLeft" content={type}>
              {data.priority === 'High' ? <p style={{ color: 'red', width: '58%', fontSize: '13px' }}>{data.priority} Priority</p> :
              data.priority === 'Low' ? <p style={{ color: '#28c499', width: '58%', fontSize: '13px' }}>{data.priority} Priority</p> :
              <p style={{ color: '#FFD300', width: '58%', fontSize: '13px' }}>{data.priority} Priority</p>
              }
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
