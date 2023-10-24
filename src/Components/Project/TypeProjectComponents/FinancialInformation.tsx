import React, { useState } from 'react';
import { Row, Col, Input, Timeline, Popover, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import {  WINDOW_WIDTH } from 'constants/constants';
import { useProjectState } from 'hook/projectHook';

interface Props {
  formatter: any;
  getSubTotalCost: any;
  getOverheadCost: any;
  onChangeOverheadDescription: any;
  overheadDescription: string;
  onChangeAdditionalCost: any;
  additionalCost: number;
  additionalDescription: string;
  contentOverheadCost: any;
  contentAdditionalCost: any;
  getTotalCost: any;
  onChangeAdditionalDescription: any;
  overheadValues: any;
  overheadCosts: any;
  changeValue: any;
  index: number;
}
const { Option } = Select;

export const FinancialInformation = ({
  formatter,
  getSubTotalCost,
  getOverheadCost,  
  onChangeOverheadDescription,
  overheadDescription,
  onChangeAdditionalCost,
  additionalCost,
  additionalDescription,
  contentOverheadCost,
  contentAdditionalCost,
  getTotalCost,
  onChangeAdditionalDescription,
  overheadValues,
  overheadCosts,
  changeValue,
  index
}:Props) => {
  const { 
    disableFieldsForLG,
    } = useProjectState();
  const timelineItems = [
    { label: 'Mobilization', index: 1 },
    { label: 'Traffic Control', index: 2 },
    { label: 'Utility Coordination / Relocation', index: 3 },
    { label: 'Stormwater Management / Erosion Control', index: 4 },
    { label: 'Engineering', index: 5 },
    { label: 'Contract Admin / Construction Management', index: 6 },
    { label: 'Legal / Administrative', index: 7 },
    { label: 'Contingency', index: 8 },
  ];
  function renderTimelineItem(label: string, index: number) {    
    return (
      <Timeline.Item color="purple" key={index}>
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 17 }}><label>{label}</label></Col>
          <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }} style={{marginTop:'-7.5px'}}>
            <Select
              placeholder={overheadValues[index] + '%'}
              dropdownClassName="menu-medium"
              value={overheadValues[index] + '%'}
              listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
              onSelect={(e:any)=>changeValue(e, index)}
              bordered={false}
              disabled={disableFieldsForLG}
              style={{fontSize: '12px', marginTop: '-2px'}}
            >
              {Array.from({ length: 20 }, (_, i) => i * 5).map((value) => (
                <Option key={value} value={value}>{value}%</Option>
              ))}
            </Select>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}>{formatter.format(overheadCosts[index])}</Col>
        </Row>
      </Timeline.Item>
    );
  }

  return (
    <div>
      <div className="sub-title-project">
        <h5 className="requestor-information">{index}. FINANCIAL INFORMATION </h5>
      </div>
      <Row className="cost-project">
        <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 20 }}>PROPOSED ACTIONS SUBTOTAL COST</Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}><b>{formatter.format( getSubTotalCost())}</b></Col>
      </Row>
      <hr/>
      <Row className="sub-project">
        <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 17 }}>
          <p className='title-sub-project'>Overhead Cost &nbsp;&nbsp;<Popover content={contentOverheadCost}><InfoCircleOutlined style={{color:'#c5c2d5'}} /></Popover></p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }}>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}><p className='title-sub-project'>{formatter.format(getOverheadCost())}</p></Col>
      </Row>

      <Timeline className="sub-project" style={{marginTop:'10px'}}>
        {timelineItems.map(({ label, index }) => renderTimelineItem(label, index))}              
      </Timeline>

      <Row className="sub-project">
        <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 18 }}>
          <Input disabled={disableFieldsForLG} placeholder={overheadDescription!==""? overheadDescription  +"": "Overhead Cost Description"} onChange={onChangeOverheadDescription} value={overheadDescription}/>
        </Col>
      </Row>
      <br/>

      <Row className="sub-project">
        <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 20 }}>
          <p>Additional Cost <Popover content={contentAdditionalCost}><img src="/Icons/icon-19.svg" alt="" height="10px" className='icon-cost'/></Popover></p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}>
          <Input disabled={disableFieldsForLG} style={{paddingLeft:'0px'}} placeholder="$0" onChange={onChangeAdditionalCost} value={formatter.format(additionalCost ? additionalCost : 0)}/>
        </Col>
      </Row>
      <Row className="sub-project">
        <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 18 }}>
          <Input disabled={disableFieldsForLG} placeholder={additionalDescription!==""? additionalDescription  +"":"Additional Cost Description"} onChange={(description) => onChangeAdditionalDescription(description)} value={additionalDescription}/>
        </Col>
      </Row>
      <hr/>
      <Row className="cost-project">
        <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 20 }}>TOTAL COST</Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}><b>{formatter.format(getTotalCost() ? getTotalCost() : 0)}</b></Col>
      </Row>
    </div>
  );
};

export default FinancialInformation;