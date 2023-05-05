import { LockOutlined, MoreOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, InputNumber, Row, Menu,Dropdown } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import * as datasets from "../../../Config/datasets";
import { SERVER } from '../../../Config/Server.config';
import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER } from "constants/constants";
import { OverlappingDatesAlert } from '../../../Components/Alerts/OverlappingAlert';
import DetailModal from 'routes/detail-page/components/DetailModal';

const { RangePicker }:any = DatePicker;

const ModalTollgate = ({
  visible, 
  setVisible, 
  dataProject,
  saveCB,
  setOpenPiney,  
  setUpdatedGroup,
  setSecondaryUpdatedGroup,
}: {
  visible: boolean, 
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  dataProject?:any,
  saveCB?: any,
  setOpenPiney?: any,
  setUpdatedGroup?: any,
  setSecondaryUpdatedGroup?: any,
}) => {
  const dateFormatList = ['MM/DD/YYYY', 'MM/DD/YY'];
  const defaultDateValue = moment('01/01/2022','MM/DD/YYYY');
  const [dateValue, setDateValue] = useState<any[]>([]);
  const [currentPhase,setCurrentPhase] = useState(-1);
  const [codePhaseTypeId,setCodePhaseTypeId] =useState(-1);
  const [calendarValue,setCalendarValue] =useState('');
  const [calendarPhase,setCalendarPhase] =useState(0);
  const [phasesData,setPhasesData] =useState([]);
  const [phaseIsSet, setPhaseIsSet] = useState(false);
  const [invalidDateIndex, setInvalidDateIndex] = useState(-1);
  const [detailOpen, setDetailOpen] = useState(false);
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
    thirteenR: '12',
  })
  const colorScale: any = {
    Done: '#5E5FE2',
    Active: '#047CD7',
    NotStarted: '#D4D2D9',
    Current: '#047CD7',
    Overdue:'#F5575C',
  };
  const [dates, setDates]: any[] = useState([]);
  const [viewOverlappingAlert, setViewOverlappingAlert] = useState(false);
  const [overlapping, setOverlapping] = useState(false);
  const [originPhase, setOriginPhase] = useState(null);
  
  const parseDuration = (duration: string) => { 
    const type = duration.trim()[0];
    return type;
  };
  const propagateDates = (array: any, index: number) => {
    let newDates: any = [...array];
    const reversed = newDates.slice(0, index + 1).reverse();
    let reverseLocked: number = 0;
    let locked: number = 0;
    reversed.forEach((x: any, i: number) => {
      if (i > 0) {
        if (!reverseLocked && !x.locked) {
          x.to = reversed[i - 1].from.clone().subtract(1, 'd');
          let type = parseDuration(x.duration_type);
          x.from = x.to.clone().subtract(x.duration, type);
        }
        reverseLocked |= x.locked;
      }
    });
    newDates = [...reversed.reverse(), ...newDates.slice(index + 1)];
    newDates.forEach((x: any, i: number) => {
      if (i > index && i > 0) {
        if (!locked && !x.locked) {
          x.from = newDates[i - 1].to.clone().add(1, 'd');
          let type = parseDuration(x.duration_type);
          x.to = x.from.clone().add(x.duration, type);
        }
        locked |= x.locked;
      }
    });
    setDates(newDates);
  }

  useEffect(() => {
    if(visible){
      setInvalidDateIndex(-1);
      let isOverlap = true;
      dates?.forEach((x: any, i: number) => {
        if (x.from && x.to && x.from.isValid() && x.to.isValid()) {
          if (i + 1 < dates.length) {
            if (x.to.isAfter(dates[i + 1].from)) {
              setInvalidDateIndex(i);
              setViewOverlappingAlert(true);
              setOverlapping(true);
              isOverlap = false;
            } else {
              if (isOverlap) {
                setOverlapping(false);              
              }
            }
          }
        }
      });
    }    
  }, [dates]);

  const updateDate = (index: number, date: any) => {
    const newDates = [...dates];
    newDates[index].from = date;
    let type = '';
    if (newDates[index].duration_type.trim() === 'MONTH') {
      type = 'M';
    }
    else if (newDates[index].duration_type.trim() === 'YEAR') {
      type = 'Y';
    }
    newDates[index].to = date.clone().add(newDates[index].duration, type);
    newDates[index].duration = Math.round(Math.abs(newDates[index].from.diff(newDates[index].to, type)));
    propagateDates(newDates, index);
  };

  const updateEndDate = (index: number, date: any) => {
    const newDates = [...dates];
    newDates[index].to = date;
    let type = '';
    if (newDates[index].duration_type.trim() === 'MONTH') {
      type = 'M';
    }
    else if (newDates[index].duration_type.trim() === 'YEAR') {
      type = 'Y';
    }
    newDates[index].duration = Math.round(date.diff(newDates[index].from, type));
    propagateDates(newDates, index);
  }

  const setCurrent = (index: number) => {
    const newDates = [...dates];
    newDates.forEach((x: any) => x.current = false);
    newDates[index].current = true;
    if (newDates[index].from && newDates[index].to && newDates[index].from.isValid() && newDates[index].to.isValid()) {
      newDates[index].locked = true;
    }
    setDates(newDates);
  }

  const updateDuration = (index: number, duration: any) => {
    const newDates = [...dates];
    newDates[index].duration = +duration;
    let type = parseDuration(newDates[index].duration_type);
    newDates[index].to = newDates[index].from.clone().add(duration, type);
    propagateDates(newDates, index);
  };

  const paintCircle = (index: number) => {
    const currentIndex = dates.findIndex((x: any) => x.current);
    const dateDiff = dates.find((x: any) => x.current)?.to;
    let today = moment()
    const diffDates = ((moment(dateDiff).diff(today, 'M', true)))
    if (currentIndex === -1) {
      return 'NotStarted';
    }
    if (index < currentIndex) {
      return 'Done';
    }
    if (index === currentIndex) {
      if (diffDates < 0) {
        return 'Overdue';
      } else {
        return 'Current';
      }
    }
    return 'NotStarted';
  };
  useEffect(() => {
    const currentId = dataProject?.d?.phaseId;
    const currentStatus = dataProject?.scheduleList?.find((x: any) => x.phase_id === currentId)?.code_status_type_id;
    setOriginPhase(currentStatus);
    setDates(dataProject?.scheduleList?.map((x:any)=>{
      const date = dataProject?.d?.schedule.find((z:any) => z.phaseId === x.phase_id);   
      let duration = 0;
      if (date?.from && moment(date?.from).isValid() && date?.to && moment(date?.to).isValid()){
        duration =  Math.round(Math.abs(moment(date?.from).diff(moment(date?.to), 'M')));
      }else{
        duration = x.duration
      }
      return {
        from: date?.from && moment(date?.from).isValid() ? moment(date?.from) : undefined,
        to: date?.to && moment(date?.to).isValid() ? moment(date?.to) : undefined,
        name: date?.name ?? x.name,
        duration: duration,
        duration_type: x.duration_type,
        phase_id: date?.phase_id ?? x.phase_id,
        current: date?.current ?? false,
        locked : date?.current && date?.from && moment(date?.from).isValid() 
         && date?.to && moment(date?.to).isValid() ? true : (date?.isLocked ?? false)
      };
    }));    
  }, [visible]);
  useEffect(() => {
    if (Object.keys(phasesData).length > 0) {
      const indexPhase = (phasesData?.findIndex((x: any) => x.phase_id === codePhaseTypeId));
      const phaseDatas: any = (phasesData.map((x: any, index: number) => {
        if (index === indexPhase) {
          return {
            ...x, current: 'Current',
            locked: true,
          };
        }
        else if (index < indexPhase) {
          return {
            ...x, current: 'Done'
          };
        } else {
          return {
            ...x, current: 'NotStarted'
          };
        }
      }))
      setPhasesData(phaseDatas)
    }
    if(phaseIsSet){
      setPhaseIsSet(false)
    }
  }, [codePhaseTypeId])
 
  useEffect(() => {
    let lockedUp = false;
    let lockedDown = false;
    if (!phaseIsSet) {
      if (codePhaseTypeId === calendarPhase) {
        if (Object.keys(dataProject).length > 0) {
          const current = moment(calendarValue);
          const currentPast = moment(calendarValue);
          const indexPhase = (phasesData?.findIndex((x: any) => x.phase_id === codePhaseTypeId));
          const reverseData = ([].concat(phasesData?.slice(0, indexPhase).reverse(), phasesData?.slice(indexPhase)))
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
                endDate: index !== reverseData.length - 1 ? moment(current).subtract(1, 'd') : moment(current),     
                locked: index === indexPhase ? true : false,           
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
                startDate: moment(currentPast),
                locked: index === indexPhase ? true : false,
              };
            }
          }));
          setDateValue(([].concat(dateValues.slice(0, indexPhase).reverse(), dateValues.slice(indexPhase))))
        }
        if (Object.keys(phasesData).length > 0) {
          const indexPhase = (phasesData?.findIndex((x: any) => x.phase_id === codePhaseTypeId));
          const phaseDatas: any = (phasesData.map((x: any, index: number) => {
            if (index === indexPhase) {
              return {
                ...x, locked: true
              };
            } else {
              return {
                ...x
              }
            }
          }))
          setPhasesData(phaseDatas)
          setPhaseIsSet(true)
        }
      }
    }else{
      if (Object.keys(dateValue).length > 0) {      
        const current = moment(calendarValue);
        const currentPast = moment(calendarValue);
        const currentDates: any = dateValue;       
        const indexPhase = (currentDates?.findIndex((x: any) => x.code_phase_type_id === calendarPhase));
        const reverseData = ([].concat(currentDates?.slice(0, indexPhase).reverse(), currentDates?.slice(indexPhase)))
        const dateValues: any = (reverseData.map((x: any, index: number) => {
          if (index >= indexPhase) {
            if (x.locked) {
              lockedDown = true;          
            }
            if (!lockedDown){            
              const now = moment(current);
              current.add(x.duration, 'M');
              return {
                project_id: x.project_id,
                current: index === indexPhase ? 1 : 0,
                key: x.key,
                name: x.name,
                phase_id: x.phase_id,
                code_phase_type_id: x.code_phase_type_id,
                startDate: now.clone(),
                duration: x.duration,
                endDate: index !== reverseData.length - 1 ? moment(current).subtract(1, 'd') : moment(current),
                locked: x.locked,
              };
            }else{
              return {
                ...x
              };
            }           
          } 
          else {
            if (x.locked) {
              lockedUp = true;              
            }
            if (!lockedUp){
              const now1 = moment(currentPast);
              currentPast.subtract(x.duration, 'M');
              return {
                project_id: dataProject?.d?.project_id,
                current: 0,
                key: x.key,
                name: x.name,
                code_phase_type_id: x.code_phase_type_id,
                endDate: now1.clone().subtract(1, 'd'),
                duration: x.duration,
                startDate: moment(currentPast),
                locked: x.locked,
              };
            }else{
              return {
                ...x
              }
            }            
          }        
        }
        ));
        setDateValue(([].concat(dateValues.slice(0, indexPhase).reverse(), dateValues.slice(indexPhase))))
      }
    }

  }, [calendarPhase]);
let items = [
  { key: 'current-phase', label: 'Set Current Phase' },
  { key: 'lock-phase', label: 'Lock Phase' },
];
  const menu = (element: any, index: number) => {
    items = [
      { key: 'current-phase', label: 'Set Current Phase' },
      { key: 'lock-phase', label: element.locked ? 'Unlock Phase' : 'Lock Phase' },
    ];
    return <Menu
      className="menu-login-dropdown"
      style={{ marginTop: '12px' }}
      items={items}
      onClick={({ key }) => {
        switch (key) {
          case 'lock-phase':
            lockData(index)
            break;
            case 'current-phase':
            setCurrent(index)
            break;         
        }
      }}
    />
  };

  function resetData() {
    const copy = dates?.map((x: any) => {
      if (x.locked) {
        return {
          ...x
        }
      }
      return {
        ...x,
        from: undefined,
        to: undefined,
      }
    });
    setDates(copy);

    setDateValue([])
    setCurrentPhase(-1);
    setCodePhaseTypeId(-1)
    setCalendarValue('')
    setCalendarPhase(0)
  }
  function sendData() {
    const currentId = dates?.find((x: any) => x.current)?.phase_id;
    const currentStatus = dataProject.scheduleList?.find((x: any) => x.phase_id === currentId)?.code_status_type_id;  
    datasets.postData(SERVER.CREATE_STATUS_GROUP, 
      {
        project_id: dataProject.d.project_id,
        phases: dates
      }, datasets.getToken()).then(async res => {
        saveCB();
        setVisible(false);
        setOpenPiney(false);
        setUpdatedGroup(originPhase);
        setSecondaryUpdatedGroup(currentStatus);     
      });
  }

  function lockData(index: any) {
    const newDates: any = [...dates];
    newDates[index].locked = !newDates[index].locked;
    setDates(newDates);
  }
  return (
    <>
      {detailOpen && <DetailModal
        visible={detailOpen}
        setVisible={setDetailOpen}
        data={dataProject?.d}
        type={FILTER_PROJECTS_TRIGGER}
      />}
      {
        viewOverlappingAlert && (
          <OverlappingDatesAlert
            visibleAlert={viewOverlappingAlert}
            setVisibleAlert={setViewOverlappingAlert}
          />
          )
      }
      <Modal
        className="detailed-version modal-tollgate"
        style={{ top: 123, width: '322px', height:'551px' }}
        visible={visible}
        onCancel={() => setVisible(false)}
        forceRender={false}
        destroyOnClose>
        <div className="detailed">
          <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor:'white', paddingBottom:'10px', paddingTop:'10px'}}>
            <Col xs={{ span: 12 }} lg={{ span: 20 }}>
              <p style={{marginTop: '15px',color: '#11093C', fontWeight: '500'}}>{`${(dataProject?.d?.project_type==='Study'?'Planning':dataProject?.d?.project_type)} Project` || 'N/A'}</p>
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
              <Button className="btn-transparent" onClick={() => setDetailOpen(true)} style={{padding: '0px 8px'}}><img src="/Icons/send.svg" alt="" height="15px" /></Button>
              <Button className="btn-transparent" onClick={() => setVisible(false)} style={{padding: '0px 8px'}}><img src="/Icons/ic_close.svg" alt="" height="15px" /></Button>
            </Col>
          </Row>
          <Row className="detailed-h detailed-hh" gutter={[16, 16]} style={{backgroundColor: 'white', paddingTop:'0px', paddingBottom:'0px'}}>
            {/* <Col xs={{ span: 12 }} lg={{ span: 24}}>
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
            </Col> */}
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
                      <h5>Duration (Months)</h5>
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
                  {dates?.map((x:any, index: number) => {
                    return (
                      <div key={x.phase_id} className='text-tollgate-title'>
                        <span style={{marginBottom:'25px', color: invalidDateIndex === index ? 'red' : undefined }}>
                          <span className="span-dots-heder">
                            <div className="circulo" style={{backgroundColor: colorScale[paintCircle(index)] }}/>
                          </span>
                          {x.name}
                        </span>
                        <span>
                          { x.locked && <LockOutlined /> }
                          <Dropdown overlay={menu(x, index)} placement="bottomRight" >
                            <MoreOutlined />
                          </Dropdown>
                        </span>
                      </div>
                  )
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
                {dates?.map((x: any, index: number) => {         
                  return (
                    <div className='calendar-toollgate' key={x.phase_id}>
                      <RangePicker
                        bordered={false}
                        
                        onCalendarChange={(e:any)=>{
                          if (!x?.from || e[0].format('DD/MM/YYYY') !== x.from?.format('DD/MM/YYYY')) {
                            updateDate(index, e[0]);
                          }
                          if (e[1]) {
                            updateEndDate(index, e[1]);
                          }
                          if (x.current) {
                            x.locked = true;
                          }
                          setCalendarValue(e[0]);
                          setCalendarPhase(x.phase_id)
                        }}
                        format={dateFormatList}
                        value={[ x.from, x.to ]}
                      />
                    </div>
                  )
                  })}
                </Col>
                <Col xs={{ span: 12 }} lg={{ span: 5}} style={{paddingLeft:'10px'}}>
                  {dates?.map((x: any, index: number) => {
                    return <Row key={x.phase_id}>
                      <Col xs={{ span: 12 }} lg={{ span: 24 }}>
                        <InputNumber 
                          className='duration-toollgate duration-toollgate-l'
                          min={1}
                          max={48}
                          defaultValue={x.duration}
                          value={x.duration}
                          onChange={(e) => { updateDuration(index, e) }} 
                        />
                      </Col>
                    </Row>
                  })}
                </Col>
              </Row>
              <Row>
                <Col xs={{ span: 12 }} lg={{ span: 12}}>
                </Col>
                <Col xs={{ span: 12 }} lg={{ span: 12}} style={{textAlign:'end', marginTop:'10px'}}>
                  <Button style={{width:'49%', fontSize:'17.5px', opacity:'0.6', mixBlendMode: 'normal'}} className="btn-transparent btn-tollgate" onClick={()=>resetData()}>Clear</Button>
                  <Button style={{width:'49%', height:'40px',fontSize:'17.5px'}} className='btn-purple btn-tollgate' onClick={overlapping?()=>setViewOverlappingAlert(true):()=>sendData()}>Save</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  )
};

export default ModalTollgate;