import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Timeline, Popover, Select, Button } from 'antd';
import { ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import {  WINDOW_WIDTH } from 'constants/constants';
import { useProjectState } from 'hook/projectHook';
import { log } from 'console';
import TextArea from 'antd/lib/input/TextArea';

interface Props {
  data:any;
  formatter: any;
  getSubTotalCost: any;
  getOverheadCost: any;
  estimatedCostInput: any;
  setEstimatedCostInput: any;
  onChangeOverheadDescription: any;
  overheadDescription: string;
  onChangeAdditionalCost: any;
  additionalCost: number;
  additionalDescription: string;
  contentOverheadCost: any;
  contentRecommendedBudget: any;
  contentAdditionalCost: any;
  getTotalCost: any;
  onChangeAdditionalDescription: any;
  overheadValues: any;
  overheadCosts: any;
  changeValue: any;
  index: number;
  setOpen:any;
  open:boolean;
}
const { Option } = Select;
export const FinancialInformation = ({
  data,
  formatter,
  getSubTotalCost,
  getOverheadCost,
  estimatedCostInput,
  setEstimatedCostInput,
  onChangeOverheadDescription,
  overheadDescription,
  onChangeAdditionalCost,
  additionalCost,
  additionalDescription,
  contentOverheadCost,
  contentRecommendedBudget,
  contentAdditionalCost,
  getTotalCost,
  onChangeAdditionalDescription,
  overheadValues,
  overheadCosts,
  changeValue,
  index,
  setOpen,
  open,
}:Props) => {
  const [estimatedCostFromDB, setEstimatedCostFromDB] = useState(estimatedCostInput);
  const [lastmodifiedBy, setLastmodifiedBy] = useState('');
  const [lastmodifiedDate, setLastmodifiedDate] = useState('');
  const { completeCosts } = useProjectState();
  const {
    disableFieldsForLG,
    } = useProjectState();
  const timelineItems = [
    { label: 'Dewatering', index: 0 },
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
  const hide = () => {
    setOpen(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const currentValue = inputValue.replace(/,/g, '');
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(currentValue) || currentValue === '' || currentValue === '-') {
      const valueToChange:any = inputValue ? (+currentValue) : null;
      setEstimatedCostFromDB(valueToChange);
    }
  };
  const confirmEstimatecost = () => {
    setEstimatedCostInput(estimatedCostFromDB);
    setOpen(false);
  }
  const contentPopOver = (
    <div className="popover-estimatedCost">
      <p className='title'>
      Stored Estimated Cost:
      </p>
      <Input prefix='$' value={estimatedCostFromDB ? estimatedCostFromDB.toLocaleString('en-US') : 0} onChange={handleChange}/>
      {(lastmodifiedBy && lastmodifiedDate) ? <p className='last-updated'>Last updated by {lastmodifiedBy} on {lastmodifiedDate} </p>: <p> </p>}
      <div className="popover-estimatedCost-footer">
        <Button  className="btn-borde" onClick={hide}>Close</Button>
        <Button className="btn-purple" onClick={confirmEstimatecost}><span className="text-color-disable">Confirm</span></Button>
      </div >
    </div>
  )
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const year = String(date.getUTCFullYear()).substring(2);
    const filteredDate = `${month}/${day}/${year}`;
    return filteredDate;
  }
  useEffect(() => {
    if(data !== 'no data' || data === undefined){
      let estimatedCostFromData = data?.project_costs.filter((e: any) => e.code_cost_type_id === 1)[0];
      setEstimatedCostFromDB(estimatedCostFromData ? estimatedCostFromData.cost : 0);
    }
  }, [data]);
  useEffect(() => {
    if(completeCosts?.projectData?.currentCost.length !== 0){
      let lastModify = completeCosts?.projectData?.currentCost.filter((e: any) => e.code_cost_type_id === 1)[0]
      let completeName = completeCosts?.estimatedCostUser;
      setLastmodifiedBy(completeName ? `${completeName?.firstName} ${completeName?.lastName}` : '');
      setLastmodifiedDate(lastModify ? formatDate(lastModify?.last_modified) : '');
    }
  }, [completeCosts]);
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
          <p className='title-sub-project'>Overhead Cost &nbsp;&nbsp;<Popover content={contentOverheadCost}><InfoCircleOutlined style={{color:'#C5C2D5'}} /></Popover></p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }}>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}><p className='title-sub-project'>{formatter.format(getOverheadCost())}</p></Col>
      </Row>
      <Timeline className="sub-project" style={{marginTop:'10px'}}>
        {timelineItems.map(({ label, index }) => renderTimelineItem(label, index))}
      </Timeline>
        <Row className="sub-project input-width">
          <Col xs={{ span: 20 }} lg={{ span: 18 }} xxl={{ span: 18 }}>
            <TextArea autoSize={{ minRows: 1, maxRows: 3 }} className='financial-input' disabled={disableFieldsForLG} placeholder={overheadDescription!==""? overheadDescription  +"": "Include Overhead Cost Description"} onChange={onChangeOverheadDescription} value={overheadDescription}/>
          </Col>
        </Row>
        <br/>
        <Row className="sub-project">
          <Col xs={{ span: 24 }} lg={{ span: 13}} xxl={{ span: 13}}>
            <p>Additional Cost <Popover content={contentAdditionalCost}><img src="/Icons/icon-19.svg" alt="" height="10px" className='icon-cost'/></Popover></p>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} xxl={{ span: 8 }} className='col-input-badget'>
            <Input className='bold-text input-reverse' disabled={disableFieldsForLG} style={{paddingLeft:'0px'}} placeholder="$0" onChange={onChangeAdditionalCost} value={formatter.format(additionalCost ? additionalCost : 0)}/>
          </Col>
        </Row>
        <Row className="sub-project input-width">
          <Col xs={{ span: 24 }} lg={{ span: 18}} xxl={{ span: 18 }}>
            <TextArea autoSize={{ minRows: 1, maxRows: 3 }}  className='financial-input' disabled={disableFieldsForLG} placeholder={additionalDescription!==""? additionalDescription  +"":"Include Cost Description"} onChange={(description) => { description.target.value.length <= 500 &&onChangeAdditionalDescription(description)}} value={additionalDescription}/>
          </Col>
        </Row>
        <br/>
        <Row className="sub-project">
          <Col xs={{ span: 18 }} lg={{ span: 13 }} xxl={{ span: 13 }}>
            <p className='title-sub-project recomended-margin'>RECOMMENDED PROJECT BUDGET &nbsp;&nbsp;<Popover content={contentRecommendedBudget}><InfoCircleOutlined style={{color:'#C5C2D5'}} /></Popover></p>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} xxl={{ span: 8 }} className='col-input-badget'>
            <Input className='bold-text input-reverse' disabled={disableFieldsForLG} style={{paddingLeft:'0px'}} placeholder="$0" onChange={onChangeAdditionalCost} value={formatter.format(additionalCost ? additionalCost : 0)}/>
          </Col>
        </Row>
        <div className='budget-container'>
          <Row className="sub-project">
            <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 18 }}>
              <p className='title-sub-project'>ACTUAL PROJECT ESTIMATED COST &nbsp;&nbsp;<Popover content={contentRecommendedBudget}><InfoCircleOutlined style={{color:'#C5C2D5'}} /></Popover></p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 6 }}>
              <Input className='budget-input bold-text input-reverse-badget' disabled={disableFieldsForLG} style={{paddingLeft:'0px'}} placeholder="$0" onChange={onChangeAdditionalCost} value={formatter.format(additionalCost ? additionalCost : 0)}/>
            </Col>
          </Row>
          <Row className="sub-project">
            <Col xs={{ span: 24 }} lg={{ span: 24 }} xxl={{ span: 24 }}>
              <p style={{marginBottom: '8px'}}>This value represents the most recent cost estimate based on current project conditions. The value displayed may be sourced from OnBase or manually updated in this screen.</p>
            </Col>
          </Row>
          <Row className="sub-project">
            <Col xs={{ span: 24 }} lg={{ span: 23 }} xxl={{ span: 23 }}>
              <TextArea autoSize={{ minRows: 1, maxRows: 3 }}  className='financial-input budget-input-color' disabled={disableFieldsForLG} placeholder={additionalDescription!==""? additionalDescription  +"":"Include Cost Description"} onChange={(description) => { description.target.value.length <= 500 && onChangeAdditionalDescription(description)}} value={additionalDescription}/>
            </Col>
          </Row>
        </div>
      <hr/>
      {/* <Row className="cost-project">
        <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 20 }}>TOTAL CALCULATED ESTIMATED COST</Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}><b>{`${formatter.format(getTotalCost() ? getTotalCost() : 0)} `}</b>
        <Popover
          content={contentPopOver}
          // trigger={'click'}
          visible={open}
        >
          <ExclamationCircleOutlined onClick={()=> setOpen(true)} style={{opacity:"0.4", paddingTop: '3px'}}/>
        </Popover>
        </Col>
      </Row> */}
    </div>
  );
};
export default FinancialInformation;