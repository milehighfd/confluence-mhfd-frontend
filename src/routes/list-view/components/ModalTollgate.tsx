import { ArrowDownOutlined, CalendarOutlined, EyeInvisibleOutlined, EyeOutlined, InfoCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { NewProjectsFilter } from '../../../Components/FiltersProject/NewProjectsFilter/NewProjectsFilter';

const { RangePicker }:any = DatePicker;

const ModalTollgate = ({visible, setVisible}: {visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const dateFormatList = ['MM/DD/YYYY', 'MM/DD/YY'];
  const [valueInput, setValueInput] = useState({
    oneL: '0',
    oneR:'0',
    twoL: '1',
    twoR: '1',
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
      visible={visible}
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
              <Col xs={{ span: 12 }} lg={{ span: 16}}>
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 8}} style={{textAlign:'center'}}>
                <h3 style={{marginBottom:'0px', color: '#11093C'}}>Duration</h3>
              </Col>
            </Row>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 24}}>
            <Row style={{height:'30px',overflowY: 'auto'}} className="row-modal-list-view">
              <Col xs={{ span: 12 }} lg={{ span: 8}}>
                <Row style={{height: '30px'}} >
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                  </Col>
                </Row>
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 8}}>
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
              <Col xs={{ span: 12 }} lg={{ span: 8}}>
                <Row style={{height: '30px'}}>
                  <Col xs={{ span: 12 }} lg={{ span: 12}} style={{textAlign:'center'}}>
                    <h5>Weeks</h5>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 12}} style={{textAlign:'center'}}>
                    <h5>Days</h5>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="detailed-h list-tollgate" gutter={[16, 16]} style={{backgroundColor: 'white', paddingTop:'0px'}}>
          <Col xs={{ span: 12 }} lg={{ span: 24}}>
            <Row style={{height: '357px', overflowY: 'auto'}} className="row-modal-list-view tollgate-body">
              <Col xs={{ span: 12 }} lg={{ span: 8}} style={{paddingRight:'10px'}}>
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
              <Col xs={{ span: 12 }} lg={{ span: 8}}>
                <p className='calendar-toollgate'>
                  <RangePicker bordered={false} format={dateFormatList}/>
                </p>
                <p className='calendar-toollgate'>
                    <RangePicker bordered={false} format={dateFormatList}/>
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker bordered={false} format={dateFormatList}/>
                </p>
                <p className='calendar-toollgate'>
                    <RangePicker bordered={false} format={dateFormatList}/>
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker bordered={false} format={dateFormatList}/>
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker bordered={false} format={dateFormatList}/>
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker bordered={false} format={dateFormatList}/>
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker bordered={false} format={dateFormatList}/>
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker bordered={false} format={dateFormatList}/>
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker bordered={false} format={dateFormatList}/>
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker bordered={false} format={dateFormatList}/>
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker bordered={false} format={dateFormatList}/>
                </p>
                <p className='calendar-toollgate'>
                  <RangePicker bordered={false} format={dateFormatList}/>
                </p>
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 8}} style={{paddingLeft:'10px'}}>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-l' maxLength={2} value={valueInput.oneL} onChange={(e)=>{setValueInput({...valueInput, oneL:e.target.value})}}></input>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-r' maxLength={2} value={valueInput.oneR} onChange={(e)=>{setValueInput({...valueInput, oneR:e.target.value})}}></input>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-l' maxLength={2} value={valueInput.twoL} onChange={(e)=>{setValueInput({...valueInput, twoL:e.target.value})}}></input>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-r'  maxLength={2} value={valueInput.twoR} onChange={(e)=>{setValueInput({...valueInput, twoR:e.target.value})}}></input>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-l'  maxLength={2} value={valueInput.threeL} onChange={(e)=>{setValueInput({...valueInput, threeL:e.target.value})}}></input>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-r'  maxLength={2} value={valueInput.threeR} onChange={(e)=>{setValueInput({...valueInput, threeR:e.target.value})}}></input>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-l' maxLength={2} value={valueInput.fourL} onChange={(e)=>{setValueInput({...valueInput, fourL:e.target.value})}}></input>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-r' maxLength={2} value={valueInput.fourR} onChange={(e)=>{setValueInput({...valueInput, fourR:e.target.value})}}></input>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-l' maxLength={2} value={valueInput.fiveL} onChange={(e)=>{setValueInput({...valueInput, fiveL:e.target.value})}}></input>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-r' maxLength={2} value={valueInput.fiveR} onChange={(e)=>{setValueInput({...valueInput, fiveR:e.target.value})}}></input>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-l' maxLength={2} value={valueInput.sixL} onChange={(e)=>{setValueInput({...valueInput, sixL:e.target.value})}}></input>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-r' maxLength={2} value={valueInput.sixR} onChange={(e)=>{setValueInput({...valueInput, sixR:e.target.value})}}></input>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-l' maxLength={2} value={valueInput.sevenL} onChange={(e)=>{setValueInput({...valueInput, sevenL:e.target.value})}}></input>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-r' maxLength={2} value={valueInput.sevenR} onChange={(e)=>{setValueInput({...valueInput, sevenR:e.target.value})}}></input>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-l' maxLength={2} value={valueInput.eightL} onChange={(e)=>{setValueInput({...valueInput, eightL:e.target.value})}}></input>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-r' maxLength={2} value={valueInput.eightR} onChange={(e)=>{setValueInput({...valueInput, eightR:e.target.value})}}></input>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-l' maxLength={2} value={valueInput.nineL} onChange={(e)=>{setValueInput({...valueInput, nineL:e.target.value})}}></input>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-r' maxLength={2} value={valueInput.nineR} onChange={(e)=>{setValueInput({...valueInput, nineR:e.target.value})}}></input>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-l' maxLength={2} value={valueInput.tenL} onChange={(e)=>{setValueInput({...valueInput, tenL:e.target.value})}}></input>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-r' maxLength={2} value={valueInput.tenR} onChange={(e)=>{setValueInput({...valueInput, tenR:e.target.value})}}></input>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-l' maxLength={2} value={valueInput.elevenL} onChange={(e)=>{setValueInput({...valueInput, elevenL:e.target.value})}}></input>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-r' maxLength={2} value={valueInput.elevenR} onChange={(e)=>{setValueInput({...valueInput, elevenR:e.target.value})}}></input>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-l' maxLength={2} value={valueInput.twelveL} onChange={(e)=>{setValueInput({...valueInput, twelveL:e.target.value})}}></input>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-r' maxLength={2} value={valueInput.twelveR} onChange={(e)=>{setValueInput({...valueInput, twelveR:e.target.value})}}></input>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-l' maxLength={2} value={valueInput.thirteenL} onChange={(e)=>{setValueInput({...valueInput, thirteenL:e.target.value})}}></input>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <input className='duration-toollgate duration-toollgate-r' maxLength={2} value={valueInput.thirteenR} onChange={(e)=>{setValueInput({...valueInput, thirteenR :e.target.value})}}></input>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 12 }} lg={{ span: 12}}>
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 12}} style={{textAlign:'end', marginTop:'10px'}}>
                <Button style={{width:'50%', fontSize:'17.5px', opacity:'0.6', mixBlendMode: 'normal'}} className="btn-transparent">Clear</Button>
                <Button style={{width:'50%', height:'40px',fontSize:'17.5px'}} className='btn-purple'>Save</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Modal>
  )
};

export default ModalTollgate;