import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, DatePicker, Input, Menu, Progress, Row, Steps} from 'antd';
import { ClockCircleOutlined, CloseOutlined, InfoCircleOutlined, PlusCircleFilled} from "@ant-design/icons";
import moment from 'moment';
import TextArea from "antd/lib/input/TextArea";
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import * as d3 from 'd3';
import { FILTER_PROJECTS_TRIGGER } from "constants/constants";
import { UseDebouncedEffect } from "routes/Utils/useDebouncedEffect";
import { usePortflioState, usePortfolioDispatch } from "hook/portfolioHook";
import DetailModal from 'routes/detail-page/components/DetailModal';
import { useProfileState } from "hook/profileHook";
import { useMapState } from "hook/mapHook";

const { Step } = Steps;
const PineyView = ({ isDetail,setOpenPiney, setUpdateAction, updateAction }: 
  { setOpenPiney: any, 
    setUpdateAction?: any, 
    updateAction?: any,
    isDetail:boolean
    }) => {     
  const {setOpenModalTollgate, setDatesData, setIsFromDetailPage, setUpdateActionItem} = usePortfolioDispatch();
  const { pineyData, updateGroup, updateActionItem } = usePortflioState();
  const { tabActiveNavbar } = useMapState();
  const data = pineyData;
  const appUser = useProfileState();
  const userName = appUser.userInformation?.name;
  const dateFormatList = ['MM/DD/YYYY', 'MM/DD/YY'];
  const [editView, setEditView] = useState(false);
  const [counterD, setCounterD]= useState(+data.d3_text)
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [actionList, setActionList] = useState<any>([])
  const [updateList, setupdateList] = useState(true)
  const [percent, setPercent] = useState(0)
  const [lengthActions, setLengthActions] = useState(0)
  const [lengthCreatedActions, setLengthCreatedActions] = useState(0)
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
  const [disabledLG, setDisabledLG] = useState(appUser?.isLocalGovernment || appUser?.userInformation?.designation === 'government_staff');
  const [createdActions, setCreatedActions] = useState<any>([]);
  const [focusedInputs, setFocusedInputs] = useState<any>({});
  const [inputValues, setInputValues] = useState<any>([]);
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  useEffect(() => {   
    datasets.postData(`${SERVER.PHASE_TYPE}/phases`, { code_phase_type_id: data.phase_id, project_id: data.project_id })
      .then((rows) => {
        setActionList(rows.map((x: any) => {
          let isChecked = false;
          if (Object.keys(x.project_action_items)?.length > 0) {
            isChecked = true;
          }
          return { 
            action_item_name: x.action_item_name, 
            code_phase_type_id: x.code_phase_type_id, 
            code_rule_action_item_id: x.code_rule_action_item_id, 
            isChecked 
          }
        }
        ))
        setLengthActions(rows.length)
      })
      .catch((e) => {
        console.log(e);
      })
   
  }, [updateActionItem,note])

  useEffect(() => {
    datasets.postData(`${SERVER.PROJECT_CHECKLIST}`, { code_phase_type_id: data.phase_id, project_id: data.project_id })
      .then((rows) => {
        setCreatedActions(rows)
        setInputValues(rows.map((x: any) => x.checklist_todo_name))
        setLengthCreatedActions(rows.length)
      })
  }, [updateActionItem])

  useEffect(() => {
    if (actionList.length > 0 || createdActions.length > 0) {
      let totalLength = lengthActions + lengthCreatedActions
      let counterActions = actionList.filter((x: any) => x.isChecked === true).length + createdActions.filter((x: any) => x.completed_date && x.completed_user_id).length
      setPercent(Math.floor(counterActions / totalLength * 100))
    }
  }, [createdActions, actionList])

  const handleAddTask = () => {
    datasets.postData(`${SERVER.PROJECT_CHECKLIST}/create`, { code_phase_type_id: data.phase_id, project_id: data.project_id }, datasets.getToken())
      .then((rows) => {        
        updatePopupMax(true);
        updateGraph(true);
        updatePopUpCalendar(true);
        setUpdateActionItem(); 
      })
  };

  const deleteCreatedAction = (item: any) => {
    const is_completed = !!(item.completed_date && item.completed_user_id);
    datasets.deleteDataWithBody(`${SERVER.PROJECT_CHECKLIST}`, { project_checklist_id: item.project_checklist_id }, datasets.getToken())
      .then((rows) => {
        if (rows) {          
          updatePopupMax(false)
          if (!is_completed) {
            updateGraph(false)
            updatePopUpCalendar(false)
          }
          setUpdateActionItem();
        }
      })
  };

  useEffect(() => {
    const scrollPosition = document.getElementById('pineyBody')
    if(scrollPosition){
      scrollPosition.scrollTop = 0
    }
  }, [data])

  useEffect(() => {    
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
  }, [data, updateActionItem, updateGroup])

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

  const updateGraph = (add: boolean) => {    
    if (!pineyData?.idPopUp && !pineyData?.categoryNo) {
      //setupdateList(!updateList)
      setUpdateActionItem();
      if (add) {
        d3.selectAll(`#${data.d3_pos}_text`).text(+counterD + 1);
        if (+counterD === 9) {
          let xPos = d3.select(`#${data.d3_pos}_text`).attr('x')
          d3.select(`#${data.d3_pos}_text`).attr('x', +xPos - 3.3)
        }
        setCounterD(counterD + 1);
      } else {
        d3.selectAll(`#${data.d3_pos}_text`).text(+counterD - 1);
        if (+counterD === 10) {
          let xPos = d3.select(`#${data.d3_pos}_text`).attr('x')
          d3.select(`#${data.d3_pos}_text`).attr('x', +xPos + 3.3)
        }
        setCounterD(counterD - 1);
      }
    }
  }

  const updatePopUpCalendar = (add: boolean) => {        
    //setupdateList(!updateList)
    setUpdateActionItem();
    if (pineyData?.idPopUp && pineyData?.categoryNo) {
      if (add) {
        const rectElemId = `#${startsWithNumber(pineyData?.idPopUp) ?
          pineyData?.idPopUp.replaceAll(' ', '').replace(/[^a-zA-Z]/g, '') :
          pineyData?.idPopUp.replaceAll(' ', '').replace(/[^a-zA-Z0-9]/g, '')}_${pineyData.categoryNo}`;
        const elementById = d3.select(rectElemId);
        const counterDById = + elementById.attr('data-counter-done') + 1;
        console.log(counterDById)
        d3.selectAll(rectElemId).attr('data-counter-done', counterDById);
      } else {
        const rectElemId = `#${startsWithNumber(pineyData?.idPopUp) ?
          pineyData?.idPopUp.replaceAll(' ', '').replace(/[^a-zA-Z]/g, '') :
          pineyData?.idPopUp.replaceAll(' ', '').replace(/[^a-zA-Z0-9]/g, '')}_${pineyData.categoryNo}`;
        const elementById = d3.select(rectElemId);
        const counterDById = + elementById.attr('data-counter-done') - 1;
        d3.selectAll(rectElemId).attr('data-counter-done', counterDById);
      }
    }
  }

  function startsWithNumber(str:string) {
    return /^\d/.test(str);
  }

  const updatePopupMax = (add: boolean) => {        
    //setupdateList(!updateList)
    setUpdateActionItem();
    if (pineyData?.idPopUp && pineyData?.categoryNo) {
      if (add){
        const rectElemId = `#${startsWithNumber(pineyData?.idPopUp) ?
          pineyData?.idPopUp.replaceAll(' ', '').replace(/[^a-zA-Z]/g, '') :
          pineyData?.idPopUp.replaceAll(' ', '').replace(/[^a-zA-Z0-9]/g, '')}_${pineyData.categoryNo}`;
        const elementById = d3.select(rectElemId);
        const counterDById = elementById.attr('data-counter-total') ;
        d3.selectAll(rectElemId).attr('data-counter-total', +counterDById + 1);
      }else{
        const rectElemId = `#${startsWithNumber(pineyData?.idPopUp) ?
          pineyData?.idPopUp.replaceAll(' ', '').replace(/[^a-zA-Z]/g, '') :
          pineyData?.idPopUp.replaceAll(' ', '').replace(/[^a-zA-Z0-9]/g, '')}_${pineyData.categoryNo}`;
        const elementById = d3.select(rectElemId);
        const counterDById = elementById.attr('data-counter-total');
        d3.selectAll(rectElemId).attr('data-counter-total', +counterDById - 1);
      }      
    }else{
      if (add) {
        let newCounter = +d3.select(`#${data.d3_pos}_text`).attr('data-counter-d') + 1;
        d3.selectAll(`#${data.d3_pos}_text`).attr('data-counter-d', newCounter).text(counterD);
      } else {
        let newCounter = +d3.select(`#${data.d3_pos}_text`).attr('data-counter-d') - 1;
        d3.selectAll(`#${data.d3_pos}_text`).attr('data-counter-d', newCounter).text(counterD);
      }
    }    
  }

  const saveActionData = (item: any) => {   
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
      updateGraph(false)
      updatePopUpCalendar(false)
    }).catch((e) => {
      console.log(e);
    })
  };
  const deleteActionData = (item: any) => {
    datasets.deleteDataWithBody(`${SERVER.PROJECT_ACTION_ITEM}`, {
      code_rule_action_item_id: item.code_rule_action_item_id,
      project_id: data.project_id
    }).then((e) => { 
      updateGraph(true)
      updatePopUpCalendar(true)
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
  
  const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
  
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };
  
  const handleInputChange = (actionName: string, data: any) => {
    datasets.putData(`${SERVER.PROJECT_CHECKLIST}/update-name`, { project_checklist_id: data.project_checklist_id, checklist_todo_name: actionName }, datasets.getToken())
      .then((rows) => {
        if (rows) {
          setUpdateActionItem();
        }
      })
  };

  const toggleCreatedAction = (item: any) => {
    const is_completed = !!(item.completed_date && item.completed_user_id);
    datasets.putData(`${SERVER.PROJECT_CHECKLIST}/toggle`, { project_checklist_id: item.project_checklist_id, is_completed: is_completed }, datasets.getToken())
      .then((rows) => {
        if (rows) {
          setUpdateActionItem();
          if (is_completed) {
            updateGraph(true)
            updatePopUpCalendar(true)
          }else{
            updateGraph(false)
            updatePopUpCalendar(false)
          }
        }
      }
     )
  };  


  React.useEffect(() => {
    handleInputChangeRef.current = handleInputChange;
  }, [handleInputChange]);
  const handleInputChangeRef = React.useRef<(value: string, data: any) => void>(handleInputChange);

  type HandleInputChangeArgs = [string, any];

  const debouncedHandleInputChange = React.useMemo(
    () => debounce((...args: HandleInputChangeArgs) => handleInputChangeRef.current(...args), 1000),
    []
  );
  
  const handleChange = (value: string, data: any, index: number) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);
    debouncedHandleInputChange(value, data);
  };
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
          <TextArea
            rows={4}
            style={{ marginBottom: '15px', color: '#706b8a', resize: 'none' }}
            className='text-area-piney'
            onChange={handleOnchange}
            value={newNote}
            placeholder="Add note here"
            disabled={disabledLG}
          />
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
                <p className="text-piney-body">
                  {!actualStartDate ? 'No Data Available ' : actualStartDate+" "}
                  {!disabledLG && <span className='span-tollgate' style={{ textDecorationLine: 'underline' }} onClick={() => { openTollModal() }}>Edit</span>}
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p >End Date</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
                <p className="text-piney-body">
                  {!actualEndDate ? 'No Data Available ' : actualEndDate+" "}
                  {!disabledLG && <span className='span-tollgate' style={{ textDecorationLine: 'underline' }} onClick={() => { openTollModal() }}>Edit</span>}
                </p>
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
              onClick={disabledLG ? undefined : (e) => {
                if (x.isChecked) {
                  deleteActionData(x)
                } else {
                  saveActionData(x)
                }
              }}
            >
              <p>{x.action_item_name}</p>
              <Checkbox checked={x.isChecked}></Checkbox>
            </div>)
          })}
          {createdActions.map((x: any, index: number) => {
            return (
              <div key={x.project_checklist_id} className="add-checkbox-item"
                onClick={(e) => {
                  if (!disabledLG){
                    toggleCreatedAction(x)
                  }                  
                }
                }>
                <div
                  className={x.completed_date && x.completed_user_id ? "checkbox-select-active checkbox-select" : "checkbox-select"}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Input
                    value={inputValues[index]}
                    placeholder="New Checklist Item"
                    onChange={(e) => {
                      handleChange(e.target.value, x, index)
                    }}
                    onClick={(e) => e.stopPropagation()}
                    disabled={disabledLG}
                    style={{
                      height: '25px',
                      flex: '1',
                      border: 'none', 
                      background: 'transparent', 
                      outline: 'none', 
                      borderBottom: focusedInputs[x.project_checklist_id] ? '1px solid black' : '1px solid transparent'
                    }}
                    onFocus={() => setFocusedInputs((prevState:any) => ({ ...prevState, [x.project_checklist_id]: true }))}
                    onBlur={() => setFocusedInputs((prevState:any) => ({ ...prevState, [x.project_checklist_id]: false }))}
                  />
                  <Checkbox
                    disabled={disabledLG}
                    checked={x.completed_date && x.completed_user_id}
                    style={{ marginLeft: '10px' }}
                  ></Checkbox>
                </div>
                <CloseOutlined
                  onClick={(e) => {
                    if (!disabledLG) {
                      e.stopPropagation();
                      deleteCreatedAction(x);
                    }
                  }}
                  style={{ lineHeight: '1', padding: '0' }}
                />
              </div>
            );
          })}
          <div className="add-checkbox" onClick={handleAddTask}>
            <p><PlusCircleFilled />&nbsp;&nbsp;  Create another task</p>
          </div>
        </div>
      </div>
    </>
  )
};

export default PineyView;