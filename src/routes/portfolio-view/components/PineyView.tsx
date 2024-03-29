import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, DatePicker, Menu, Progress, Row, Steps} from 'antd';
import { ClockCircleOutlined, InfoCircleOutlined} from "@ant-design/icons";
import moment from 'moment';
import TextArea from "antd/lib/input/TextArea";
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import * as d3 from 'd3';
import { FILTER_PROJECTS_TRIGGER } from "constants/constants";
import { UseDebouncedEffect } from "routes/Utils/useDebouncedEffect";
import store from 'store';
import { usePortflioState, usePortfolioDispatch } from "hook/portfolioHook";
const DetailModal = React.lazy(() => import('routes/detail-page/components/DetailModal'));

const { Step } = Steps;
const PineyView = ({ isDetail,setOpenPiney, setUpdateAction, updateAction }: 
  { setOpenPiney: any, 
    setUpdateAction?: any, 
    updateAction?: any,
    isDetail:boolean
    }) => {     
  const {setOpenModalTollgate, setDatesData, setIsFromDetailPage} = usePortfolioDispatch();
  const { pineyData, updateGroup } = usePortflioState();
  const data = pineyData;
  const appUser = store.getState().profile;
  const userName = appUser.userInformation?.name;
  const dateFormatList = ['MM/DD/YYYY', 'MM/DD/YY'];
  const [editView, setEditView] = useState(false);
  const [counterD, setCounterD]= useState(+data.d3_text)
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [actionList, setActionList] = useState<any>([])
  const [updateList, setupdateList] = useState(true)
  const [percent, setPercent] = useState(0)
  const [note,setNote] =useState('')
  const [newNote,setNewNote] =useState('')
  const [actualStartDate,setActualStartDate] = useState<any>()
  const [actualEndDate,setActualEndDate] = useState<any>()
  const [newStartDate,setNewStartDate] = useState<any>()
  const [newEndDate,setNewEndDate] = useState<any>()
  const [sendStartDate,setSendStartDate] = useState<any>()
  const [sendEndDate,setSendEndDate] = useState<any>()
  const [duration,setDuration] = useState<any>()
  const [remaining,setRemaining] = useState<any>()
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  useEffect(() => {    
    let counter = 0;
    let lengthActions = 0;
    datasets.postData(`${SERVER.PHASE_TYPE}/phases`, { code_phase_type_id: data.phase_id, project_id: data.project_id })
      .then((rows) => {
        setActionList(rows.map((x: any) => {
          let isChecked = false;
          if (Object.keys(x.project_action_items)?.length > 0) {
            isChecked = true;
            counter = counter + 1;
          }
          lengthActions = rows.length;
          return { 
            action_item_name: x.action_item_name, 
            code_phase_type_id: x.code_phase_type_id, 
            code_rule_action_item_id: x.code_rule_action_item_id, 
            isChecked 
          }
        }
        ))
        setPercent(Math.floor(counter / lengthActions * 100))
      })
      .catch((e) => {
        console.log(e);
      })
   
  }, [updateList,note])

  useEffect(() => {
    const scrollPosition = document.getElementById('pineyBody')
    if(scrollPosition){
      scrollPosition.scrollTop = 0
    }
    datasets.postData(`${SERVER.STATUS}`, { code_phase_type_id: data.phase_id, project_id: data.project_id })
      .then((rows) => {
        if (Object.keys(rows).length > 0) {
          if(rows[0].actual_start_date !== null){
            let check = moment(rows[0].actual_start_date, 'YYYY-MM-DD');
            let month = check.format('MM');
            month = monthNames[+month - 1];
            let day = check.format('DD');
            let year = check.format('YYYY');
            setActualStartDate(`${month} ${day}, ${year}`)
            setNewStartDate(`${month} ${day}, ${year}`)
            setSendStartDate(rows[0].actual_start_date)
          }
          if(rows[0].actual_end_date !== null){
            let check1 = moment(rows[0].actual_end_date, 'YYYY-MM-DD');
            let monthEnd = check1.format('MM');
            monthEnd = monthNames[+monthEnd - 1];
            let dayEnd = check1.format('DD');
            let yearEnd = check1.format('YYYY');          
            setActualEndDate(`${monthEnd} ${dayEnd}, ${yearEnd}`)          
            setNewEndDate(`${monthEnd} ${dayEnd}, ${yearEnd}`)
            setSendEndDate(rows[0].actual_end_date)
          }
          if (rows[0].actual_end_date !== null && rows[0].actual_start_date !== null) {
            let today = moment()
            let start = moment(rows[0].actual_start_date)
            let end = moment(rows[0].actual_end_date)
            setDuration((end.diff(start, 'M', true)).toFixed(1))
            setRemaining((end.diff(today, 'M', true)).toFixed(1))
          }          
          setNote(rows[0].comment);
          setNewNote(rows[0].comment);
        } else{    
          setNote('')
          setNewNote('')
        }
      })
      .catch((e) => {
        console.log(e);
      })
  }, [data, updateList, updateGroup])

  useEffect(() => {
    if (newNote !== note || newStartDate !== actualStartDate || newEndDate !== actualEndDate) {
      datasets.putData(`${SERVER.STATUS}`, { code_phase_type_id: data.phase_id, project_id: data.project_id, comment: newNote, actual_start_date: sendStartDate, actual_end_date: sendEndDate })
        .then((rows) => {
          setNote(newNote)
          setActualStartDate(newStartDate)
          setActualEndDate(newEndDate)
          console.log(rows)
        })
        .catch((e) => {
          console.log(e);
        })
    }
  }, [editView])

  const saveData = (item: any) => {   
    const formatTime = moment().format('YYYY-MM-DD HH:mm:ss');
    datasets.postData(`${SERVER.PROJECT_ACTION_ITEM}`, {
      code_rule_action_item_id: item.code_rule_action_item_id,
      project_id: data.project_id,
      created_by: userName,
      last_modified_by: userName,
      last_modified_date: formatTime,
      completed_date: formatTime,
      created_date: formatTime
    }).then((e) => { 
      setupdateList(!updateList) 
      d3.selectAll(`#${data.d3_pos}_text`).text(+counterD-1);
      if(+counterD===10){
        let xPos = d3.select(`#${data.d3_pos}_text`).attr('x')
        d3.select(`#${data.d3_pos}_text`).attr('x', +xPos+3.3)
      }
      setCounterD(counterD-1);
    }).catch((e) => {
      console.log(e);
    })
  };
  const deleteData = (item: any) => {
    datasets.deleteDataWithBody(`${SERVER.PROJECT_ACTION_ITEM}`, {
      code_rule_action_item_id: item.code_rule_action_item_id,
      project_id: data.project_id
    }).then((e) => { 
      setupdateList(!updateList) 
      d3.selectAll(`#${data.d3_pos}_text`).text(+counterD+1);
      if(+counterD===9){
        let xPos = d3.select(`#${data.d3_pos}_text`).attr('x')
        d3.select(`#${data.d3_pos}_text`).attr('x', +xPos-3.3)
      }
      setCounterD(counterD+1);
    }).catch((e) => {
      console.log(e);
    }) 
  };
  function onSelectDateStart(date: any, dateString: any) {   
    setSendStartDate(moment(date))  
    const newDate = new Date(dateString);      
    const month = newDate.toLocaleString('default', { month: 'long' });
    const day=(newDate.toLocaleString("default", { day: "2-digit" }));
    const year=(newDate.getFullYear());
    setNewStartDate(`${month} ${day}, ${year}`)
  }
  function onSelectDateEnd(date: any, dateString: any) { 
    setSendEndDate(moment(date)) 
    const newDate = new Date(dateString);      
    const month = newDate.toLocaleString('default', { month: 'long' });
    const day=(newDate.toLocaleString("default", { day: "2-digit" }));
    const year=(newDate.getFullYear());
    setNewEndDate(`${month} ${day}, ${year}`)
  }
  UseDebouncedEffect(() => {
    if (newNote !== '') {
      datasets.putData(`${SERVER.STATUSCOMMENT}`, { 
        code_phase_type_id: data.phase_id, 
        project_id: data.project_id, 
        comment: newNote,
      })
      .catch((e) => {
        console.log(e);
      })
      setNewNote(newNote);
    }
  }, [newNote], 500);

  const handleOnchange = (e: any) => {
    if (newNote !== '') {
      setNewNote(e.target.value)
    }
  }

  const openTollModal = () => {
    setOpenModalTollgate(true);
    if(isDetail){
      setIsFromDetailPage(true)
    }else{
      setIsFromDetailPage(false)
    }    
  }
  return (
    <>
      {
        visibleDetail && <DetailModal visible={visibleDetail} setVisible={setVisibleDetail} data={data} type={FILTER_PROJECTS_TRIGGER} />
      }
      <div className="header-piney" style={{ marginBottom: '20px' }}>
        <Button
          className="btn-transparent"
          onClick={() => { setOpenPiney(false) }}
          style={{ padding: '0px 0px' }}
        >
          <img src="/Icons/ic-close-piney.svg" alt="" height="20px" />
        </Button>
        {
          isDetail === true ? (<></>) :
            (<Button
              className="btn-transparent"
              onClick={() => { setVisibleDetail(true) }}
              style={{ padding: '0px 0px' }}
            >
              <img src="/Icons/ic_send.svg" alt="" height="16px" />
            </Button>)
        }
      </div>
      <div className="body-piney">
        <p style={{ marginBottom: '0px' }}>{`${(data?.project_type==='Study'?'Study':data?.project_type + ' Project')}` || 'N/A'}</p>
        <h1 style={{ color: 'rgb(37 24 99)', fontSize: '16px', marginBottom: '7px' }}>{data.project_name}</h1>
        <div style={{ marginBottom: '15px' }}>
          <span className="tag-blue">{data.phase}</span>
        </div>
        <div className="body-piney-body" id='pineyBody' style={{ paddingBottom: '30px' }}>
          <p style={{ marginBottom: '5px', fontWeight: '700', opacity: '0.6' }}>Notes</p>
          <TextArea rows={4} style={{ marginBottom: '15px', color: '#706b8a', resize:'none'}} className='text-area-piney' onChange={handleOnchange} value={newNote} placeholder="Add note here"/>
          <div className="form-text-calendar">
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p>MHFD Lead</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>               
                  <>
                    <span   className="text-piney-body">{!data.mhfd?'N/A':data.mhfd}</span>
                  </>               
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p >Total Est. Cost <InfoCircleOutlined style={{color:'rgb(205 203 214)'}}/></p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>                
                  <p  className="text-piney-body">{!data.estimated_cost?'N/A':formatter.format(data.estimated_cost)}</p>                
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p >Phase</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
                <p className="span-option">
                  <span  className="text-piney-body">{data.phase}</span> &nbsp;<span className="tag-blue">{percent+'%'}</span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p >Start Date</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
                <p className="text-piney-body">{!actualStartDate ? 'No Data Available' : actualStartDate} <span className='span-tollgate' style={{textDecorationLine:'underline'}} onClick={()=>{openTollModal()}}>Edit</span></p>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p >End Date</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
                <p className="text-piney-body">{!actualEndDate ? 'No Data Available' : actualEndDate} <span className='span-tollgate'  style={{textDecorationLine:'underline'}} onClick={()=>{openTollModal()}}>Edit</span></p>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p >Duration</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
              <ClockCircleOutlined  className="text-piney-body"/>&nbsp; &nbsp;<span   className="text-piney-body">{duration?`${duration} Months`: 'No data available'}</span>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p >Remaining Time</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
              <ClockCircleOutlined  className="text-piney-body"/>&nbsp; &nbsp;<span  className="text-piney-body">{remaining?`${remaining} Months`:'No data available'}</span>
              </Col>
            </Row>
          </div>
          <p style={{marginTop:'10px', marginBottom:'5px', fontWeight:'700'}}>Action Items</p>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 4 }}>
                <p style={{fontSize:'12px', fontWeight:'700', paddingTop:'2px'}}>{percent+'%'}</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 20 }}>
                <Progress percent={percent} />
              </Col>
          </Row>
          {actionList.map((x: any) => {
            return (<div key={x.code_rule_action_item_id} className={x.isChecked ? "checkbox-select-active checkbox-select" : "checkbox-select"}
              onClick={(e) => {
                if (x.isChecked) {
                  deleteData(x)
                } else {
                  saveData(x)
                }
              }}>
              <p>{x.action_item_name}</p>
              <Checkbox checked={x.isChecked}></Checkbox>
            </div>)
          })}
        </div>
      </div>
    </>
  )
};

export default PineyView;