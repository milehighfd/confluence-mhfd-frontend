import React, { useEffect, useState } from "react";
import { Button, Calendar, Checkbox, Col, DatePicker, Dropdown, Input, Layout, Menu, message, Popover, Progress, Row, Select, Space, Steps, Table, Tabs, Tag } from 'antd';
import { NewProjectsFilter } from "../../../Components/FiltersProject/NewProjectsFilter/NewProjectsFilter";
import { ClockCircleOutlined, CloseOutlined, DownOutlined, FormOutlined, InfoCircleOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import moment from 'moment';
import TextArea from "antd/lib/input/TextArea";
import { drag } from "d3";
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import * as d3 from 'd3';

const { Step } = Steps;
const PineyView = ({ setOpenPiney, data, userName, setUpdateAction, updateAction }: 
  { setOpenPiney: any, 
    data?: any, 
    userName?: string
    setUpdateAction?: any, 
    updateAction?: any,
    }) => {     
  const dateFormatList = ['MM/DD/YYYY', 'MM/DD/YY'];
  const [openDrop, setOpenDrop] = useState(false);
  const [editView, setEditView] = useState(false);
  const [counterD, setCounterD]= useState(+data.d3_text)
  const [checkboxValue, setCheckboxValue] = useState({
    draft: true,
    sign: false,
    request: false,
    send: false,
    pay: false,
  });
  const menu = (
    <Menu
      className="card-dropdown"
      items={[
        {
          key: '1-1',
          label: <>
            <img src="/picture/user.png" height={30} width="30" style={{marginRight:'5px'}}/>
            <span style={{fontSize:'14px'}}>Jon Villines</span>
          </>,
        },
        {
          key: '1-2',
          label: <>
            <img src="/picture/user01.png"height={30} width="30" style={{marginRight:'5px'}}/>
            <span style={{fontSize:'14px'}}>Jane Smith </span>
          </>,
        },
        {
          key: '1-3',
          label: <>
            <img src="/picture/user02.png"height={30} width="30" style={{marginRight:'5px'}}/>
            <span style={{fontSize:'14px'}}>Robert Croquette  </span>
          </>,
        },
      ]}
    />
  );
  const [actionList, setActionList] = useState<any>([])
  const [updateList, setupdateList] = useState(true)
  const [percent, setPercent] = useState(0)
  const [note,setNote] =useState('')
  const [newNote,setNewNote] =useState('')
  const [actualStartDate,setActualStartDate] = useState<any>()
  const [actualEndDate,setActualEndDate] = useState<any>()
  const [newStartDate,setNewStartDate] = useState<any>()
  const [newEndDate,setNewEndDate] = useState<any>()
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  useEffect(() => {    
    console.log(counterD)
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
          return { action_item_name: x.action_item_name, code_phase_type_id: x.code_phase_type_id, code_rule_action_item_id: x.code_rule_action_item_id, isChecked }
        }
        ))
        setPercent(Math.floor(counter / lengthActions * 100))
      })
      .catch((e) => {
        console.log(e);
      })
   
  }, [updateList,newNote])

  useEffect(() => {
    setNote('')
    setNewNote('')
    datasets.postData(`${SERVER.STATUS}`, { code_phase_type_id: data.phase_id, project_id: data.project_id })
      .then((rows) => {
        if (Object.keys(rows).length > 0) {
          setNote(rows[0].comments)
          setNewNote(rows[0].comments)
          let check = moment(rows[0].actual_start_date, 'YYYY-MM-DD');
          let month = check.format('MM');
          month = monthNames[+month - 1];
          let day = check.format('DD');
          let year = check.format('YYYY');
          let check1 = moment(rows[0].actual_end_date, 'YYYY-MM-DD');
          let monthEnd = check1.format('MM');
          monthEnd = monthNames[+monthEnd - 1];
          let dayEnd = check1.format('DD');
          let yearEnd = check1.format('YYYY');
          setActualStartDate(`${month} ${day}, ${year}`)
          setActualEndDate(`${monthEnd} ${dayEnd}, ${yearEnd}`)
          setNewStartDate(`${month} ${day}, ${year}`)
          setNewEndDate(`${monthEnd} ${dayEnd}, ${yearEnd}`)
        }
      })
      .catch((e) => {
        console.log(e);
      })
  }, [data, updateList])

  useEffect(() => {
    if (newNote !== note || newStartDate !== actualStartDate || newEndDate !== actualEndDate) {
      datasets.putData(`${SERVER.STATUS}`, { code_phase_type_id: data.phase_id, project_id: data.project_id, comments: newNote })
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
      setCounterD(counterD+1);
    }).catch((e) => {
      console.log(e);
    }) 
  };
  function onSelectDateStart(date: any, dateString: any) { 
    const newDate = new Date(dateString);      
    const month = newDate.toLocaleString('default', { month: 'long' });
    const day=(newDate.toLocaleString("default", { day: "2-digit" }));
    const year=(newDate.getFullYear());
    setNewStartDate(`${month} ${day}, ${year}`)
  }
  function onSelectDateEnd(date: any, dateString: any) { 
    const newDate = new Date(dateString);      
    const month = newDate.toLocaleString('default', { month: 'long' });
    const day=(newDate.toLocaleString("default", { day: "2-digit" }));
    const year=(newDate.getFullYear());
    setNewEndDate(`${month} ${day}, ${year}`)
  }
  return (
    <>
      <div className="header-piney" style={{marginBottom:'20px'}}>
        <CloseOutlined onClick={()=>{setOpenPiney(false)}}/>
        <FormOutlined style={{fontSize:'20px'}} className={editView ? 'active-btn-piney active-btn-piney-edit':'active-btn-piney-edit'} onClick={()=>{setEditView(!editView)}}/>
      </div>
      <div className="body-piney">
        <h1 style={{ color: 'rgb(37 24 99)', fontSize: '16px', marginBottom: '15px' }}>{data.project_name}</h1>
        <div style={{ marginBottom: '7px' }}>
          <span className="tag-blue">{data.phase}</span>
          </div>
        <div style={{ marginBottom: '25px' }}>
          <span className="tag-blue">{data.project_type}</span>
        </div>
        <div className="body-piney-body">
          <p style={{ marginBottom:'5px', fontWeight:'700', opacity:'0.6'}}>Notes</p>
          {editView? <><TextArea rows={4} style={{marginBottom:'15px'}} onChange={e => setNewNote(e.target.value)} defaultValue={newNote}/></>:
            <p>{newNote}<span style={{fontWeight:'700'}}></span></p>
          }
          <div className="form-text-calendar">
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p>MHFD Lead/PM</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
                {/* {editView ?
                  <>
                    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']} getPopupContainer={(trigger:any) => trigger.parentNode} onVisibleChange={()=>{setOpenDrop(!openDrop)}}>
                      <Space style={{border:'1px solid #eae8f0', borderRadius:'17.5px', padding:'3px 5px', width:'100%', justifyContent:'space-between'}}>
                        <div><img src="/picture/user.png" alt="" height="24px" style={{borderRadius: '50%'}}/> <span>Jon Villines</span></div>
                        {openDrop ? <UpOutlined style={{color:'#251863'}} /> : < DownOutlined style={{color:'#251863'}} />}
                      </Space>
                    </Dropdown>
                  </>
                  : */}
                  <>
                    <img src="/picture/user.png" alt="" height="24px" style={{borderRadius: '50%'}}/> <span  style={{opacity:'0.5', color: '#11093C'}}>Jon Villines</span>
                  </>
                {/* } */}
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p>Total Est. Cost <InfoCircleOutlined style={{color:'rgb(205 203 214)'}}/></p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
                {/* {editView ?
                  <input type="text" placeholder="$3,708,000" style={{border:'1px solid #eae8f0', borderRadius:'15px', padding:'3px 8px', width:'100%'}} className='input-focus'></input>
                  : */}
                  <p>$3,708,000</p>
                {/* } */}
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p>Phase</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
                <span style={{opacity:'0.5', color: '#11093C'}}>{data.phase}</span> &nbsp;<span className="tag-blue">{percent+'%'}</span>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p>Start Date</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
                {editView ?
                  <DatePicker className="date-piney-picker" style={{border:'1px solid #eae8f0', borderRadius:'15px', padding:'3px 8px', width:'100%' }} format={dateFormatList} onChange={onSelectDateStart}/>
                  : <p>{actualStartDate === '' ? 'January 1, 2023' : actualStartDate}</p>
                }
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p>End Date</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
                {editView ?
                  <DatePicker className="date-piney-picker" style={{border:'1px solid #eae8f0', borderRadius:'15px', padding:'3px 8px', width:'100%' }} format={dateFormatList} onChange={onSelectDateEnd}/>
                  :<p>{actualEndDate === '' ? 'December 6, 2023' : actualEndDate}</p>
                }
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p>Duration</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
              <ClockCircleOutlined style={{opacity:'0.5', color: '#11093C'}}/>&nbsp; &nbsp;<span  style={{opacity:'0.5', color: '#11093C'}}>5 months  5 days</span>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p>Remaining Time</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
              <ClockCircleOutlined style={{opacity:'0.5', color: '#11093C'}}/>&nbsp; &nbsp;<span  style={{opacity:'0.5', color: '#11093C'}}>5 months  5 days</span>
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
            {actionList.map((x:any) =>{
              //{checkboxValue.draft ? "checkbox-select-active checkbox-select":"checkbox-select"}
              //onClick={(e)=>{setCheckboxValue({...checkboxValue, draft: !checkboxValue.draft })}}
              //onChange={(e)=>{setCheckboxValue({...checkboxValue, draft: !checkboxValue.draft })}}
              return (<div className={x.isChecked ? "checkbox-select-active checkbox-select":"checkbox-select"} 
              onClick={(e)=>{
                if(x.isChecked)
                {deleteData(x)                  
                }else{
                  saveData(x)                  
                }}}>
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