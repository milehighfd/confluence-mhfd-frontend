import { ArrowDownOutlined, CalendarOutlined, InfoCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { NewProjectsFilter } from '../../../Components/FiltersProject/NewProjectsFilter/NewProjectsFilter';

const ModalTollgate = ({visible, setVisible}: {visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
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
        <Row className="detailed-h" gutter={[16, 16]} style={{backgroundColor: 'white', paddingTop:'0px'}}>
          <Col xs={{ span: 12 }} lg={{ span: 24}}>
            <Row style={{height: '357px', overflowY: 'auto'}} className="row-modal-list-view">
              <Col xs={{ span: 12 }} lg={{ span: 11}}>
                <p style={{marginBottom:'25px'}}>Draft </p>
                <p style={{marginBottom:'25px'}}>Work Request (WR) </p>
                <p style={{marginBottom:'25px'}}>Work Plan (WP) </p>
                <p style={{marginBottom:'25px'}}>Startup </p>
                <p style={{marginBottom:'25px'}}>Initial Funding </p>
                <p style={{marginBottom:'25px'}}>Consultant Procurement </p>
                <p style={{marginBottom:'25px'}}>Conceptual Design </p>
                <p style={{marginBottom:'25px'}}>Preliminary Design </p>
                <p style={{marginBottom:'25px'}}>Final Design </p>
                <p style={{marginBottom:'25px'}}>Construction Contracting </p>
                <p style={{marginBottom:'25px'}}>Construction </p>
                <p style={{marginBottom:'25px'}}>Substantial Completion </p>
                <p style={{marginBottom:'25px'}}>Closed </p>
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 13}}>
                <p className='calendar-toollgate'>
                  <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/><RightOutlined style={{fontSize:'9px'}}/> <span style={{color:'#E6E9EA'}}>&nbsp;|&nbsp;</span> <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/> <RightOutlined style={{fontSize:'9px'}}/>
                </p>
                <p className='calendar-toollgate'>
                  <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/><RightOutlined style={{fontSize:'9px'}}/> <span style={{color:'#E6E9EA'}}>&nbsp;|&nbsp;</span> <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/> <RightOutlined style={{fontSize:'9px'}}/>
                </p>
                <p className='calendar-toollgate'>
                  <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/><RightOutlined style={{fontSize:'9px'}}/> <span style={{color:'#E6E9EA'}}>&nbsp;|&nbsp;</span> <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/> <RightOutlined style={{fontSize:'9px'}}/>
                </p>
                <p className='calendar-toollgate'>
                  <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/><RightOutlined style={{fontSize:'9px'}}/> <span style={{color:'#E6E9EA'}}>&nbsp;|&nbsp;</span> <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/> <RightOutlined style={{fontSize:'9px'}}/>
                </p>
                <p className='calendar-toollgate'>
                  <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/><RightOutlined style={{fontSize:'9px'}}/> <span style={{color:'#E6E9EA'}}>&nbsp;|&nbsp;</span> <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/> <RightOutlined style={{fontSize:'9px'}}/>
                </p>
                <p className='calendar-toollgate'>
                  <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/><RightOutlined style={{fontSize:'9px'}}/> <span style={{color:'#E6E9EA'}}>&nbsp;|&nbsp;</span> <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/> <RightOutlined style={{fontSize:'9px'}}/>
                </p>
                <p className='calendar-toollgate'>
                  <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/><RightOutlined style={{fontSize:'9px'}}/> <span style={{color:'#E6E9EA'}}>&nbsp;|&nbsp;</span> <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/> <RightOutlined style={{fontSize:'9px'}}/>
                </p>
                <p className='calendar-toollgate'>
                  <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/><RightOutlined style={{fontSize:'9px'}}/> <span style={{color:'#E6E9EA'}}>&nbsp;|&nbsp;</span> <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/> <RightOutlined style={{fontSize:'9px'}}/>
                </p>
                <p className='calendar-toollgate'>
                  <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/><RightOutlined style={{fontSize:'9px'}}/> <span style={{color:'#E6E9EA'}}>&nbsp;|&nbsp;</span> <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/> <RightOutlined style={{fontSize:'9px'}}/>
                </p>
                <p className='calendar-toollgate'>
                  <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/><RightOutlined style={{fontSize:'9px'}}/> <span style={{color:'#E6E9EA'}}>&nbsp;|&nbsp;</span> <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/> <RightOutlined style={{fontSize:'9px'}}/>
                </p>
                <p className='calendar-toollgate'>
                  <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/><RightOutlined style={{fontSize:'9px'}}/> <span style={{color:'#E6E9EA'}}>&nbsp;|&nbsp;</span> <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/> <RightOutlined style={{fontSize:'9px'}}/>
                </p>
                <p className='calendar-toollgate'>
                  <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/><RightOutlined style={{fontSize:'9px'}}/> <span style={{color:'#E6E9EA'}}>&nbsp;|&nbsp;</span> <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/> <RightOutlined style={{fontSize:'9px'}}/>
                </p>
                <p className='calendar-toollgate'>
                  <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/><RightOutlined style={{fontSize:'9px'}}/> <span style={{color:'#E6E9EA'}}>&nbsp;|&nbsp;</span> <CalendarOutlined /> Wed 4/6 <LeftOutlined style={{fontSize:'9px'}}/> <RightOutlined style={{fontSize:'9px'}}/>
                </p>
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