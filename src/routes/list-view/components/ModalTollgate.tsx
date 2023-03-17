import { ArrowDownOutlined, CalendarOutlined, EyeInvisibleOutlined, EyeOutlined, InfoCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, InputNumber, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import moment from 'moment';

const { RangePicker }:any = DatePicker;

const ModalTollgate = ({visible, setVisible}: {visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const dateFormatList = ['MM/DD/YYYY', 'MM/DD/YY'];
  const defaultDateValue = moment('01/01/2022','MM/DD/YYYY');
  const [dateValue, setDateValue] = useState({
    draft:  [null,null],
    work_request:  [null,null],
    work_plan: [null,null],
    startup: [null,null],
    initial_funding: [null,null],
    consultant_procurement:  [null,null],
    conceptual_design: [null,null],
    preliminary_design: [null,null],
    final_design: [null,null],
    construction_contracting: [null,null],
    construction: [null,null],
    substantial_completion: [null,null],
    closed: [null,null],
  })
  const [valueInput, setValueInput] = useState({
    oneL: '0',
    oneR:'0',
    twoL: 1,
    twoR: 0,
    threeL:'2',
    threeR:'2',
    fourL:'3',
    fourR:'3',
    fiveL:'4',
    fiveR:'4',
    sixL:'5',
    sixR:'5',
    sevenL:'6',
    sevenR:'6',
    eightL:'7',
    eightR:'7',
    nineL:'8',
    nineR:'8',
    tenL:'9',
    tenR:'9',
    elevenL:'10',
    elevenR:'10',
    twelveL:'11',
    twelveR:'11',
    thirteenL:'12',
    thirteenR:'12',
})
  return (
    <Modal
      className="detailed-version modal-tollgate"
      style={{ top: 123, width: '322px', height:'551px' }}
      visible={true}
      onCancel={() => setVisible(false)}
      forceRender={false}
      destroyOnClose>
      <div className="detailed">
        <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor:'white', paddingBottom:'10px'}}>
          <Col xs={{ span: 12 }} lg={{ span: 20 }}>
            <h1 style={{marginTop: '15px'}}>Tollgate Creek</h1>
            <p>Define the time period for each phase.</p>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 4 }} style={{textAlign: 'end'}}>
            <Button className="btn-transparent" onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
          </Col>
        </Row>
        <Row className="detailed-h detailed-hh" gutter={[16, 16]} style={{backgroundColor: 'white', paddingTop:'0px', paddingBottom:'0px'}}>
          <Col xs={{ span: 12 }} lg={{ span: 24}}>
            <Row>
              <Col xs={{ span: 12 }} lg={{ span: 9}}>
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 10}} style={{textAlign:'center'}}>
                <h3 style={{marginBottom:'0px', color: '#11093C'}} className='dates-title'>Dates</h3>
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 5}} style={{textAlign:'center'}}>
                <h3 style={{marginBottom:'0px', color: '#11093C'}}>Duration</h3>
              </Col>
            </Row>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 24}}>
            <Row style={{height:'30px',overflowY: 'auto'}} className="row-modal-list-view">
              <Col xs={{ span: 12 }} lg={{ span: 9}}>
                <Row style={{height: '30px'}} >
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                  </Col>
                </Row>
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 10}}>
                <Row style={{height: '30px'}}>
                  <Col xs={{ span: 12 }} lg={{ span: 10}} style={{textAlign:'center'}}>
                    <h5>Start Date</h5>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}} style={{textAlign:'center'}}>
                    <h5>End Date</h5>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 3}} style={{textAlign:'center'}}>
                  </Col>
                </Row>
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 5}}>
                <Row style={{height: '30px'}}>
                  <Col xs={{ span: 12 }} lg={{ span: 24}} style={{textAlign:'center'}}>
                    <h5>Weeks</h5>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="detailed-h list-tollgate" gutter={[16, 16]} style={{backgroundColor: 'white', paddingTop:'0px'}}>
          <Col xs={{ span: 12 }} lg={{ span: 24}}>
            <Row style={{height: '357px', overflowY: 'auto'}} className="row-modal-list-view tollgate-body">
              <Col xs={{ span: 12 }} lg={{ span: 9}} style={{paddingRight:'10px'}} className='left-tollgate'>
                <p style={{marginBottom:'25px'}}>Draft</p>
                <p style={{marginBottom:'25px'}}>Work Request (WR)</p>
                <p style={{marginBottom:'25px'}}>Work Plan (WP)</p>
                <p style={{marginBottom:'25px'}}>Startup</p>
                <p style={{marginBottom:'25px'}}>Initial Funding</p>
                <p style={{marginBottom:'25px'}}>Consultant Procurement</p>
                <p style={{marginBottom:'25px'}}>Conceptual Design</p>
                <p style={{marginBottom:'25px'}}>Preliminary Design</p>
                <p style={{marginBottom:'25px'}}>Final Design</p>
                <p style={{marginBottom:'25px'}}>Construction Contracting</p>
                <p style={{marginBottom:'25px'}}>Construction</p>
                <p style={{marginBottom:'25px'}}>Substantial Completion</p>
                <p style={{marginBottom:'25px'}}>Closed</p>
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 10}}>
                <p className='calendar-toollgate'>
                  <RangePicker
                    bordered={false}
                    onCalendarChange={(e:any)=>{console.log(e);setDateValue({...dateValue, draft:[e? e[0]:null, e? (e[1]? e[1]:e[0]):null]})}}
                    format={dateFormatList}
                    value={[dateValue.draft[0], dateValue.draft[1]]}
                  />
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker
                    bordered={false}
                    onCalendarChange={(e:any)=>{setDateValue({...dateValue, work_request:[e? e[0]:null, e? (e[1]? e[1]:e[0]):null]})}}
                    format={dateFormatList}
                    value={[dateValue.work_request[0], dateValue.work_request[1]]}
                  />
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker
                    bordered={false}
                    onCalendarChange={(e:any)=>{setDateValue({...dateValue, work_plan:[e? e[0]:null, e? (e[1]? e[1]:e[0]):null]})}}
                    format={dateFormatList}
                    value={[dateValue.work_plan[0], dateValue.work_plan[1]]}
                  />
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker
                    bordered={false}
                    onCalendarChange={(e:any)=>{setDateValue({...dateValue, startup:[e? e[0]:null, e? (e[1]? e[1]:e[0]):null]})}}
                    format={dateFormatList}
                    value={[dateValue.startup[0], dateValue.startup[1]]}
                  />
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker
                    bordered={false}
                    onCalendarChange={(e:any)=>{setDateValue({...dateValue, initial_funding:[e? e[0]:null, e? (e[1]? e[1]:e[0]):null]})}}
                    format={dateFormatList}
                    value={[dateValue.initial_funding[0], dateValue.initial_funding[1]]}
                  />
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker
                    bordered={false}
                    onCalendarChange={(e:any)=>{setDateValue({...dateValue, consultant_procurement:[e? e[0]:null, e? (e[1]? e[1]:e[0]):null]})}}
                    format={dateFormatList}
                    value={[dateValue.consultant_procurement[0], dateValue.consultant_procurement[1]]}
                  />
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker
                    bordered={false}
                    onCalendarChange={(e:any)=>{setDateValue({...dateValue, conceptual_design:[e? e[0]:null, e? (e[1]? e[1]:e[0]):null]})}}
                    format={dateFormatList}
                    value={[dateValue.conceptual_design[0], dateValue.conceptual_design[1]]}
                  />
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker
                    bordered={false}
                    onCalendarChange={(e:any)=>{setDateValue({...dateValue, preliminary_design:[e? e[0]:null, e? (e[1]? e[1]:e[0]):null]})}}
                    format={dateFormatList}
                    value={[dateValue.preliminary_design[0], dateValue.preliminary_design[1]]}
                  />
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker
                    bordered={false}
                    onCalendarChange={(e:any)=>{setDateValue({...dateValue, final_design:[e? e[0]:null, e? (e[1]? e[1]:e[0]):null]})}}
                    format={dateFormatList}
                    value={[dateValue.final_design[0], dateValue.final_design[1]]}
                  />                </p>
                <p className='calendar-toollgate'>
                  <RangePicker
                    bordered={false}
                    onCalendarChange={(e:any)=>{setDateValue({...dateValue, construction_contracting:[e? e[0]:null, e? (e[1]? e[1]:e[0]):null]})}}
                    format={dateFormatList}
                    value={[dateValue.construction_contracting[0], dateValue.construction_contracting[1]]}
                  />
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker
                    bordered={false}
                    onCalendarChange={(e:any)=>{setDateValue({...dateValue, construction:[e? e[0]:null, e? (e[1]? e[1]:e[0]):null]})}}
                    format={dateFormatList}
                    value={[dateValue.construction[0], dateValue.construction[1]]}
                  />
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker
                    bordered={false}
                    onCalendarChange={(e:any)=>{setDateValue({...dateValue, substantial_completion:[e? e[0]:null, e? (e[1]? e[1]:e[0]):null]})}}
                    format={dateFormatList}
                    value={[dateValue.substantial_completion[0], dateValue.substantial_completion[1]]}
                  />
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker
                    bordered={false}
                    onCalendarChange={(e:any)=>{setDateValue({...dateValue, closed:[e? e[0]:null, e? (e[1]? e[1]:e[0]):null]})}}
                    format={dateFormatList}
                    value={[dateValue.closed[0], dateValue.closed[1]]}
                  />
                </p>
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 5}} style={{paddingLeft:'10px'}}>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 24}}>
                    <InputNumber className='duration-toollgate duration-toollgate-l' min={1} max={10} defaultValue={3} onChange={(e)=>{setValueInput({...valueInput, twoL:e})}} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 24}}>
                    <InputNumber className='duration-toollgate duration-toollgate-l' min={1} max={10} defaultValue={3} onChange={(e)=>{setValueInput({...valueInput, twoL:e})}} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 24}}>
                    <InputNumber className='duration-toollgate duration-toollgate-l' min={1} max={10} defaultValue={3} onChange={(e)=>{setValueInput({...valueInput, twoL:e})}} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 24}}>
                    <InputNumber className='duration-toollgate duration-toollgate-l' min={1} max={10} defaultValue={3} onChange={(e)=>{setValueInput({...valueInput, twoL:e})}} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 24}}>
                    <InputNumber className='duration-toollgate duration-toollgate-l' min={1} max={10} defaultValue={3} onChange={(e)=>{setValueInput({...valueInput, twoL:e})}} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 24}}>
                    <InputNumber className='duration-toollgate duration-toollgate-l' min={1} max={10} defaultValue={3} onChange={(e)=>{setValueInput({...valueInput, twoL:e})}} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 24}}>
                    <InputNumber className='duration-toollgate duration-toollgate-l' min={1} max={10} defaultValue={3} onChange={(e)=>{setValueInput({...valueInput, twoL:e})}} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 24}}>
                    <InputNumber className='duration-toollgate duration-toollgate-l' min={1} max={10} defaultValue={3} onChange={(e)=>{setValueInput({...valueInput, twoL:e})}} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 24}}>
                    <InputNumber className='duration-toollgate duration-toollgate-l' min={1} max={10} defaultValue={3} onChange={(e)=>{setValueInput({...valueInput, twoL:e})}} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 24}}>
                    <InputNumber className='duration-toollgate duration-toollgate-l' min={1} max={10} defaultValue={3} onChange={(e)=>{setValueInput({...valueInput, twoL:e})}} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 24}}>
                    <InputNumber className='duration-toollgate duration-toollgate-l' min={1} max={10} defaultValue={3} onChange={(e)=>{setValueInput({...valueInput, twoL:e})}} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 24}}>
                    <InputNumber className='duration-toollgate duration-toollgate-l' min={1} max={10} defaultValue={3} onChange={(e)=>{setValueInput({...valueInput, twoL:e})}} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 24}}>
                    <InputNumber className='duration-toollgate duration-toollgate-l' min={1} max={10} defaultValue={3} onChange={(e)=>{setValueInput({...valueInput, twoL:e})}} />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 12 }} lg={{ span: 12}}>
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 12}} style={{textAlign:'end', marginTop:'10px'}}>
                <Button style={{width:'49%', fontSize:'17.5px', opacity:'0.6', mixBlendMode: 'normal'}} className="btn-transparent btn-tollgate">Clear</Button>
                <Button style={{width:'49%', height:'40px',fontSize:'17.5px'}} className='btn-purple btn-tollgate'>Save</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Modal>
  )
};

export default ModalTollgate;