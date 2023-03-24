import { LockOutlined, MoreOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, InputNumber, Row, Menu,Dropdown } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import * as datasets from "../../../Config/datasets";
import { SERVER } from '../../../Config/Server.config';

const { RangePicker }:any = DatePicker;

const ModalTollgate = ({
  visible, 
  setVisible, 
  dataProject,
  saveCB
}: {
  visible: boolean, 
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  dataProject?:any,
  saveCB?: any
}) => {
  const dateFormatList = ['MM/DD/YYYY', 'MM/DD/YY'];
  const defaultDateValue = moment('01/01/2022','MM/DD/YYYY');
  const [dateValue, setDateValue] = useState<any[]>([])
  const [currentPhase,setCurrentPhase] = useState(-1);
  const [codePhaseTypeId,setCodePhaseTypeId] =useState(-1)
  const [calendarValue,setCalendarValue] =useState([])
  const [calendarPhase,setCalendarPhase] =useState(0)

  
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

  useEffect(() => {
    resetData()
  }, [visible])
  useEffect(() => {
    if (codePhaseTypeId === calendarPhase) {
      if (Object.keys(dataProject).length > 0) {
        const current = moment(calendarValue);
        const currentPast = moment(calendarValue);
        const indexPhase = (dataProject?.scheduleList?.findIndex((x: any) => x.phase_id === codePhaseTypeId));
        const reverseData = ([].concat(dataProject?.scheduleList?.slice(0, indexPhase).reverse(), dataProject?.scheduleList?.slice(indexPhase)))
        const dateValues: any = (reverseData.map((x: any, index: number) => {
          if (index >= indexPhase) {
            const now = moment(current);
            current.add(x.duration, 'M');
            return {
              project_id: dataProject?.d?.project_id,
              current: index === indexPhase ? 1 : 0,
              key: x.categoryNo,
              name: x.name,
              phase_id: x.phase_id,
              code_phase_type_id: x.phase_id,
              startDate: now.clone(),
              duration: x.duration,
              endDate: index !== reverseData.length - 1 ? moment(current).subtract(1, 'd') : moment(current)
            };
          } else {
            const now1 = moment(currentPast);
            currentPast.subtract(x.duration, 'M');
            return {
              project_id: dataProject?.d?.project_id,
              current: 0,
              key: x.categoryNo,
              name: x.name,
              code_phase_type_id: x.phase_id,
              endDate: now1.clone().subtract(1, 'd'),
              duration: x.duration,
              startDate:  moment(currentPast)
            };
          }
        }));
        setDateValue(([].concat(dateValues.slice(0, indexPhase).reverse(), dateValues.slice(indexPhase))))
      }
    }
  }, [calendarPhase]);

let items = [
  { key: 'current-phase', label: 'Set Current Phase' },
  { key: 'lock-phase', label: 'Lock Phase' },
];
  const menu = (element: any) => {
    items = [
      { key: 'current-phase', label: 'Set Current Phase' },
      { key: 'lock-phase', label: 'Lock Phase' },
    ];
    return <Menu
      className="menu-login-dropdown"
      style={{ marginTop: '12px' }}
      items={items}
      onClick={({ key }) => {
        switch (key) {
          case 'lock-phase':
            console.log('lock')
            break;
            case 'current-phase':
            setCodePhaseTypeId(element.code_phase_type_id)
            break;         
        }
      }}
    />
  };

  function resetData() {
    setDateValue([])
    setCurrentPhase(-1);
    setCodePhaseTypeId(-1)
    setCalendarValue([])
    setCalendarPhase(0)
  }
  function sendData() {
    datasets.postData(SERVER.CREATE_STATUS_GROUP, 
      {
        project_id: dataProject.d.project_id,
        phases: dateValue
      }, datasets.getToken()).then(async res => {
        console.log(res);
        saveCB();
        setVisible(false);
      });
  }

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
            <p style={{marginTop: '15px',color: '#11093C', fontWeight: '500'}}>Capital Project</p>
            <h1>{dataProject?.d?.rowLabel||'Tollgate Creek'}</h1>
            <p>Define the time period for each phase.</p>
            <div style={{display:'flex', paddingTop:'10px'}}>
              <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#5E5FE2'}}/>
                  <span style={{marginLeft:'1px', marginRight:'15px'}}>Done</span>
                </span>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#047CD7'}}/>
                  <span style={{marginLeft:'1px', marginRight:'15px'}}>Current</span>
                </span>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#D4D2D9'}}/>
                  <span style={{marginLeft:'1px', marginRight:'15px'}}>Not Started</span>
                </span>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#F5575C'}}/>
                  <span style={{marginLeft:'1px', marginRight:'15px'}}>Overdue</span>
                </span>
            </div>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 4 }} style={{textAlign: 'end'}}>
            <Button className="btn-transparent"  style={{padding: '0px 8px'}}><img src="/Icons/send.svg" alt="" height="15px" /></Button>
            <Button className="btn-transparent" onClick={() => setVisible(false)} style={{padding: '0px 8px'}}><img src="/Icons/ic_close.svg" alt="" height="15px" /></Button>
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
                    <h5>Months</h5>
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
                {dataProject?.scheduleList?.map((x:any, index:number)=>{
                  return <div className='text-tollgate-title'>
                    <p key={x.categoryNo} style={{marginBottom:'25px'}}>
                      <span className="span-dots-heder">
                        <div className="circulo" style={index % 4 === 0 ? {backgroundColor:'#5E5FE2'}:index % 3 === 0 ? {backgroundColor:'#047CD7'}:index % 2 === 0 ? {backgroundColor:'#D4D2D9'}:{backgroundColor:'#F5575C'}}/>
                      </span>
                      {x.name} 
                    </p>
                  <p>{index % 3 === 0 &&<LockOutlined />} <Dropdown overlay={menu(x)} placement="bottomRight" >
                  <MoreOutlined />
                </Dropdown></p></div>
                })}
                {/* <p style={{marginBottom:'25px'}}>Draft <MoreOutlined /></p>
                <p style={{marginBottom:'25px'}}>Work Request (WR) <MoreOutlined /></p>
                <p style={{marginBottom:'25px'}}>Work Plan (WP) <MoreOutlined /></p>
                <p style={{marginBottom:'25px'}}>Startup <MoreOutlined /></p>
                <p style={{marginBottom:'25px'}}>Initial Funding <MoreOutlined /></p>
                <p style={{marginBottom:'25px'}}>Consultant Procurement <MoreOutlined /></p>
                <p style={{marginBottom:'25px'}}>Conceptual Design <MoreOutlined /></p>
                <p style={{marginBottom:'25px'}}>Preliminary Design <MoreOutlined /></p>
                <p style={{marginBottom:'25px'}}>Final Design <MoreOutlined /></p>
                <p style={{marginBottom:'25px'}}>Construction Contracting <MoreOutlined /></p>
                <p style={{marginBottom:'25px'}}>Construction <MoreOutlined /></p>
                <p style={{marginBottom:'25px'}}>Substantial Completion <MoreOutlined /></p>
                <p style={{marginBottom:'25px'}}>Closed <MoreOutlined /></p> */}
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 10}}>
              {dataProject?.scheduleList?.map((x: any) => {
                  const name = x.name;
                  let endDateS =[];
                  let startDateS = [];
                if (dateValue) {
                  endDateS = (dateValue
                    .filter((r: any) => r.key === x.categoryNo)
                    .map((r: any) => {
                      return r.endDate;
                    }))
                  startDateS = (dateValue
                    .filter((r: any) => r.key === x.categoryNo)
                    .map((r: any) => {
                      return r.startDate;
                    }))
                }          
                  return <p className='calendar-toollgate' key={x.phase_id}>
                  <RangePicker
                    bordered={false}
                    onCalendarChange={(e:any)=>{
                      setCalendarValue(e[0]);
                      setCalendarPhase(x.phase_id)
                    }}
                    format={dateFormatList}
                    value={[ startDateS[0],endDateS[0]]}
                  />
                </p>
                })}                
                {/* <p className='calendar-toollgate'>
                  <RangePicker
                    bordered={false}
                    onCalendarChange={(e:any)=>{setDateValue({...dateValue, work_request:[e? e[0]:null, e? (e[1]? e[1]:e[0]):null]})}}
                    format={dateFormatList}
                    value={[dateValue.work_request[0], dateValue.work_request[1]]}
                  />
                </p>                 */}
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 5}} style={{paddingLeft:'10px'}}>
                {dataProject?.scheduleList?.map((x: any) => {
                  return <Row key={x.phase_id}>
                    <Col xs={{ span: 12 }} lg={{ span: 24 }}>
                      <InputNumber className='duration-toollgate duration-toollgate-l' min={1} max={48} defaultValue={x.duration} onChange={(e) => { setValueInput({ ...valueInput, twoL: e }) }} />
                    </Col>
                  </Row>
                })}
                {/* <Row>
                  <Col xs={{ span: 12 }} lg={{ span: 24}}>
                    <InputNumber className='duration-toollgate duration-toollgate-l' min={1} max={10} defaultValue={3} onChange={(e)=>{setValueInput({...valueInput, twoL:e})}} />
                  </Col>
                </Row>                 */}
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 12 }} lg={{ span: 12}}>
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 12}} style={{textAlign:'end', marginTop:'10px'}}>
                <Button style={{width:'49%', fontSize:'17.5px', opacity:'0.6', mixBlendMode: 'normal'}} className="btn-transparent btn-tollgate" onClick={()=>resetData()}>Clear</Button>
                <Button style={{width:'49%', height:'40px',fontSize:'17.5px'}} className='btn-purple btn-tollgate' onClick={()=>sendData()}>Save</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Modal>
  )
};

export default ModalTollgate;