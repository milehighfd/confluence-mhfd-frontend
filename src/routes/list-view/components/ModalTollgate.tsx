import { ArrowDownOutlined, CalendarOutlined, EyeInvisibleOutlined, EyeOutlined, InfoCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { NewProjectsFilter } from '../../../Components/FiltersProject/NewProjectsFilter/NewProjectsFilter';

const { RangePicker }:any = DatePicker;

const ModalTollgate = ({visible, setVisible}: {visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const dateFormatList = ['MM/DD/YYYY', 'MM/DD/YY'];
  return (
    <Modal
      className="detailed-version modal-tollgate"
      style={{ top: 123, width: '322px', height:'551px' }}
      visible={visible}
      onCancel={() => setVisible(false)}
      forceRender={false}
      destroyOnClose>
      <div className="detailed">
        <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor:'white'}}>
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
                <h3 style={{marginBottom:'0px'}}>Duration</h3>
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
                    <p className='duration-toollgate duration-toollgate-l'>0</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-r'>0</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-l'>1</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-r'>1</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-l'>2</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-r'>2</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-l'>3</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-r'>3</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-l'>4</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-r'>4</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-l'>5</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-r'>5</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-l'>6</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-r'>6</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-l'>7</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-r'>7</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-l'>8</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-r'>8</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-l'>9</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-r'>9</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-l'>10</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-r'>10</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-l'>11</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-r'>11</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-l'>12</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 2}}>
                    <p className='duration-toollgate border-tollgate' >|</p>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 11}}>
                    <p className='duration-toollgate duration-toollgate-r'>12</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div style={{textAlign:'end', marginTop:'10px'}} >
              <Button style={{width:'40%', fontSize:'17.5px', opacity:'0.6', mixBlendMode: 'normal'}} className="btn-transparent">Clear</Button>
              <Button style={{width:'40%', height:'40px',fontSize:'17.5px'}} className='btn-purple'>Save</Button>
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  )
};

export default ModalTollgate;