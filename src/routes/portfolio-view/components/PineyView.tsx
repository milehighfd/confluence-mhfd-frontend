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
import DetailModal from "routes/detail-page/components/DetailModal";
import ModalTollgate from "routes/list-view/components/ModalTollgate";

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
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [tollgate, setTollgate] = useState(false);
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
  const [sendStartDate,setSendStartDate] = useState<any>()
  const [sendEndDate,setSendEndDate] = useState<any>()
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
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
   
  }, [updateList,note])

  useEffect(() => {
    setNote('')
    setNewNote('')
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
          setNote(rows[0].comment)
          setNewNote(rows[0].comment)     
        }
      })
      .catch((e) => {
        console.log(e);
      })
  }, [data, updateList])

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
  return (
    <>
      {visibleDetail && <DetailModal visible={visibleDetail} setVisible={setVisibleDetail} data={data} type='project' />
      }
      {tollgate && <ModalTollgate visible={tollgate} setVisible={setTollgate} />}
      <div className="header-piney" style={{marginBottom:'20px'}}>
        {/* <CloseOutlined onClick={()=>{setOpenPiney(false)}}/>
        <FormOutlined style={{fontSize:'20px'}} className={editView ? 'active-btn-piney active-btn-piney-edit':'active-btn-piney-edit'} onClick={()=>{setVisibleDetail(true)}}/> */}
        <Button
          className="btn-transparent"
          onClick={()=>{setOpenPiney(false)}}
          style={{padding:'0px 0px'}}
        >
          <img src="/Icons/ic-close-piney.svg" alt="" height="20px" />
        </Button>
        <Button
          className="btn-transparent"
          onClick={()=>{setVisibleDetail(true)}}
          style={{padding:'0px 0px'}}
        >
          <img src="/Icons/ic_send.svg" alt="" height="16px" />
        </Button>
      </div>
      <div className="body-piney">
        <p style={{marginBottom:'0px'}}>Capital Project</p>
        <h1 style={{ color: 'rgb(37 24 99)', fontSize: '16px', marginBottom: '7px' }}>{data.project_name}</h1>
        <div style={{ marginBottom: '15px' }}>
          <span className="tag-blue">{data.phase} {data.project_type}</span>
        </div>
        <div className="body-piney-body">
          <p style={{ marginBottom:'5px', fontWeight:'700', opacity:'0.6'}}>Notes</p>
          {!editView? <><TextArea rows={4} style={{marginBottom:'15px'}} onChange={e => setNewNote(e.target.value)} defaultValue={!!newNote?newNote:'Add note here'}/></>:
            <p>{!!newNote?newNote:'Add note here'}<span style={{fontWeight:'700'}}></span></p>
          }
          <div className="form-text-calendar">
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p style={{opacity:0.6}}>MHFD Lead/PM</p>
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
                    <img src="/picture/user-default.svg" alt="" height="24px" style={{borderRadius: '50%'}}/> <span  style={{ color: '#11093C'}}>{!data.mhfd?'N/A':data.mhfd}</span>
                  </>
                {/* } */}
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p  style={{opacity:0.6}}>Total Est. Cost <InfoCircleOutlined style={{color:'rgb(205 203 214)'}}/></p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
                {/* {editView ?
                  <input type="text" placeholder="$3,708,000" style={{border:'1px solid #eae8f0', borderRadius:'15px', padding:'3px 8px', width:'100%'}} className='input-focus'></input>
                  : */}
                  <p>{!data.estimated_cost?'N/A':formatter.format(data.estimated_cost)}</p>
                {/* } */}
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p style={{ opacity:0.6}}>Phase</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
                <p className="span-option">
                  <span style={{color: '#11093C'}}>{data.phase}</span> &nbsp;<span className="tag-blue">{percent+'%'}</span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p style={{opacity:0.6}}>Start Date</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
                {editView ?
                  <DatePicker className="date-piney-picker" style={{border:'1px solid #eae8f0', borderRadius:'15px', padding:'3px 8px', width:'100%' }} format={dateFormatList} onChange={onSelectDateStart}/>
                  : <p>{!actualStartDate ? 'January 1, 2023' : actualStartDate} <span className='span-tollgate' style={{textDecorationLine:'underline'}} onClick={()=>{setTollgate(true)}}>Edit</span></p>
                }
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p style={{ opacity:0.6}}>End Date</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
                {editView ?
                  <DatePicker className="date-piney-picker" style={{border:'1px solid #eae8f0', borderRadius:'15px', padding:'3px 8px', width:'100%' }} format={dateFormatList} onChange={onSelectDateEnd}/>
                  :<p>{!actualEndDate ? 'December 6, 2023' : actualEndDate} <span className='span-tollgate'  style={{textDecorationLine:'underline'}} onClick={()=>{setTollgate(true)}}>Edit</span></p>
                }
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p style={{opacity:0.6}}>Duration</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
              <ClockCircleOutlined style={{color: '#11093C'}}/>&nbsp; &nbsp;<span  style={{color: '#11093C'}}>5 months  5 days</span>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p style={{opacity:0.6}}>Remaining Time</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
              <ClockCircleOutlined style={{color: '#11093C'}}/>&nbsp; &nbsp;<span  style={{color: '#11093C'}}>5 months  5 days</span>
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