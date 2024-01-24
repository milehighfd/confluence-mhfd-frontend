import React, { useEffect, useState } from "react";
import { AutoComplete, Button, Col, DatePicker, Dropdown, Input, InputNumber, Menu, Modal, Popover, Radio, Row, Select } from "antd";
import { WINDOW_WIDTH } from "constants/constants";
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import moment from "moment";
import { InfoCircleOutlined, LockOutlined, MoreOutlined } from "@ant-design/icons";
import { OverlappingDatesAlert } from "Components/Alerts/OverlappingAlert";
import { useNotifications } from "Components/Shared/Notifications/NotificationsProvider";
import { useRequestDispatch } from "hook/requestHook";

const { RangePicker }: any = DatePicker;

const { Option } = Select;

const EditDatesModal = ({
  visible,
  setVisible,
  project,
}:{
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  project: any
}) => {
  const [step, setStep] = useState<number>(0);
  const [phaseList, setPhaseList] = useState<any[]>([]);
  const [selectedPhase, setSelectedPhase] = useState<any>(null);
  const [startDate, setStartDate] = useState<any>(null);
  const [dates, setDates] = useState<any[]>([]);
  const [dateIndex, setDateIndex] = useState<number>(0);
  const [generateDates, setGenerateDates] = useState<boolean>(false);
  const [invalidDateIndex, setInvalidDateIndex] = useState(-1);
  const [calendarValue, setCalendarValue] = useState('');
  const [calendarPhase, setCalendarPhase] = useState(0);
  const [viewOverlappingAlert, setViewOverlappingAlert] = useState(false);
  const [overlapping, setOverlapping] = useState(false);
  const [emptyDatesAlert, setEmptyDatesAlert] = useState(false);
  const [primaryStream, setPrimaryStream] = useState<{ id: any, name: string, value: number }>({ id: null, name: '', value: -1 });
  const [location, setLocation] = useState<string>('');
  const [mhfdLead, setMhfdLead] = useState<{ id: any, name: string }>({ id: null, name: '' });
  const [onBase, setOnBase] = useState<number>(0);
  const [disabledFields, setDisabledFields] = useState<any>({primary_stream: false, location: false, mhfd_lead: false, on_base: true});
  const [mhfdStaffList, setMhfdStaffList] = useState<any[]>([]);
  const [streamList, setStreamList] = useState<any[]>([]);
  const [isCountyWide, setIsCountyWide] = useState<boolean>(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const CODES_NOT_STREAM = [15]

  const { openNotification } = useNotifications();
  const [onBaseNumber, setOnBaseNumber] = useState('no');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const {
    loadColumns, 
  } = useRequestDispatch();
  const [keyword, setKeyword] = useState('');

  const handleSearch = (value: string) => {
    setKeyword(value);
  };
  const dateFormatList = ['MM/DD/YYYY', 'MM/DD/YY'];
  const colorScale: any = {
    Done: '#5D3DC7',
    Active: '#047CD7',
    NotStarted: '#D4D2D9',
    Current: '#047CD7',
    Overdue: '#F5575C',
  };

  useEffect(() => {
    const type = project?.code_project_type?.code_project_type_id || 0;
    datasets
      .postData(`${SERVER.PHASE_TYPE}`, { tabKey: type }, datasets.getToken())
      .then(rows => {
      setPhaseList(rows?.map((x:any)=>{
        return {label: x?.phase_name, value: x?.code_phase_type_id}
      }))
      setDates(
        rows?.map((x: any) => {
          return {
            from: undefined,
            to: undefined,
            name: x.phase_name,
            duration: x.duration,
            duration_type: x.duration_type,
            phase_id: x.code_phase_type_id,
            current: false,
            locked: false,
          };
        }),
      );
    })
    .catch((e) => {
      console.log(e);
    })
  },[project])

  useEffect(() => {
    datasets.getData(`${SERVER.ACTIVE_DETAILS}/${project?.project_id}`, datasets.getToken()).then((data: any) => {
      let newDisabledFields = { ...disabledFields };
      setIsCountyWide(data?.projectLocation?.is_county_wide)
      if (data?.projectLocation?.location){
        setLocation(data.projectLocation.location)
        newDisabledFields = { ...newDisabledFields, location: true }
      }
      if (data?.projectLocation?.onbase_project_number){
        setOnBase(data.projectLocation.onbase_project_number)
        setOnBaseNumber('yes')
      }
      if(data?.projectStreams?.primaryStream){
        const streamName = data.projectStreams.primaryStream.project_stream.stream.stream_name;
        const streamId = data.projectStreams.primaryStream.stream_id;
        const projectStreamId = data.projectStreams.primaryStream.project_stream_id;
        setPrimaryStream({ id: streamId, name: streamName, value:projectStreamId})
        newDisabledFields = { ...newDisabledFields, primary_stream: true }
      }
      const mhfdLead = data?.projectStaff?.mhfdLead?.business_associate_contact;
      if(mhfdLead){
        setMhfdLead({id: mhfdLead.business_associate_contact_id, name: mhfdLead.contact_name})
        newDisabledFields = { ...newDisabledFields, mhfd_lead: true }
      }
      setDisabledFields(newDisabledFields);
      setMhfdStaffList(data?.projectStaff?.mhfdStaff)
      setStreamList(data?.projectStreams?.projectStreams)
    })
  }, [project]);

  const [allFiedsRequired, setAllFiedsRequired] = useState<boolean>(true);

  useEffect(() => {
    if (CODES_NOT_STREAM.includes(project?.code_project_type?.code_project_type_id) || isCountyWide){
      setAllFiedsRequired(false);
    }
  }, [project, isCountyWide, CODES_NOT_STREAM]);

  useEffect(() => {
    let requiredFields = ['phase', 'start_date', 'primary_stream', 'mhfd_lead', 'location'];
    let nameFields = ['Phase', 'Start date', 'Primary stream', 'MHFD lead', 'Location'];

    if (!allFiedsRequired){
      requiredFields = ['phase', 'start_date', 'mhfd_lead'];
      nameFields = ['Phase', 'Start date', 'MHFD lead'];
    }

    const fields = [
      { field: 'phase', name: 'Phase', condition: selectedPhase },
      { field: 'start_date', name: 'Start date', condition: startDate },
      { field: 'primary_stream', name: 'Primary stream', condition: primaryStream?.id > 0 },
      { field: 'mhfd_lead', name: 'MHFD lead', condition: mhfdLead?.id > 0 },
      { field: 'location', name: 'Location', condition: location },
    ];

    fields.forEach(({ field, name, condition }) => {
      if (condition) {
        const index = requiredFields.indexOf(field);
        if (index > -1) {
          requiredFields.splice(index, 1);
          nameFields.splice(index, 1);
        }
      }
    });
    setMissingFields(nameFields);
  }, [selectedPhase, startDate, primaryStream, mhfdLead, project, isCountyWide, location, allFiedsRequired]);

  useEffect(() => {
    if (selectedPhase && startDate) {
      updateDate(dateIndex, startDate);
      setCurrent(dateIndex);
    }
  }, [generateDates]);

  const updateDate = (index: number, date: any) => {
    const newDates = [...dates];
    newDates[index].from = date;
    let type = '';
    if (newDates[index].duration_type.trim() === 'MONTH') {
      type = 'M';
    } else if (newDates[index].duration_type.trim() === 'YEAR') {
      type = 'Y';
    }
    newDates[index].to = date.clone().add(newDates[index].duration, type);
    newDates[index].duration = Math.round(Math.abs(newDates[index].from.diff(newDates[index].to, type)));
    propagateDates(newDates, index);
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
  };

  const parseDuration = (duration: string) => {
    const type = duration.trim()[0];
    return type;
  };

  const paintCircle = (index: number) => {
    const currentIndex = dates.findIndex((x: any) => x.current);
    const dateDiff = dates.find((x: any) => x.current)?.to;
    let today = moment();
    const diffDates = moment(dateDiff).diff(today, 'M', true);
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
  let items = [
    { key: 'current-phase', label: 'Set Current Phase' },
    { key: 'lock-phase', label: 'Lock Phase' },
  ];
  const menu = (element: any, index: number) => {
    return (
      <Menu
        className="tollgate-modal-menu"
        items={items}
        onClick={({ key }) => {
          switch (key) {
            case 'lock-phase':
              lockData(index);
              break;
            case 'current-phase':
              setCurrent(index);
              break;
          }
        }}
      />
    );
  };
  
  function lockData(index: any) {
    const newDates: any = [...dates];
    newDates[index].locked = !newDates[index].locked;
    setDates(newDates);
  }

  const updateEndDate = (index: number, date: any) => {
    const newDates = [...dates];
    newDates[index].to = date;
    let type = '';
    if (newDates[index].duration_type.trim() === 'MONTH') {
      type = 'M';
    } else if (newDates[index].duration_type.trim() === 'YEAR') {
      type = 'Y';
    }
    newDates[index].duration = Math.round(date.diff(newDates[index].from, type));
    propagateDates(newDates, index);
  };

  const updateDuration = (index: number, duration: any) => {
    const newDates = [...dates];
    newDates[index].duration = +duration;
    let type = parseDuration(newDates[index].duration_type);
    newDates[index].to = newDates[index].from.clone().add(duration, type);
    propagateDates(newDates, index);
  };

  const setCurrent = (index: number) => {
    const newDates = [...dates];
    newDates.forEach((x: any) => (x.current = false));
    newDates[index].current = true;
    if (newDates[index].from && newDates[index].to && newDates[index].from.isValid() && newDates[index].to.isValid()) {
      newDates[index].locked = true;
    }
    setDates(newDates);
  };

  useEffect(() => {
      setInvalidDateIndex(-1);
      let isOverlap = true;
      dates?.forEach((x: any, i: number) => {
        if (x.from && x.to && x.from.isValid() && x.to.isValid()) {
          if (i + 1 < dates.length) {
            if (x.to.isAfter(dates[i + 1].from)) {
              setInvalidDateIndex(i);
              // setViewOverlappingAlert(true);
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
  }, [dates]);

  function sendData() {    
    if (dates.some((date) => !date.from || !date.to)) {
      setEmptyDatesAlert(true);
    } else {
      handleActivation();
    }
  }

  const handleActivation = async () => {
    const hasProjectStream = primaryStream?.value > 0;
    const streamId = hasProjectStream ? primaryStream?.value : primaryStream?.id;
    const sendData = {
      project_id: project?.project_id,
      location: location,
      primaryStream: streamId,
      mhfdLead: mhfdLead?.id,
      hasProjectStream
    }
    try {
      await datasets.postData(`${SERVER.ACTIVATE_PROJECT}`, { ...sendData }, datasets.getToken());  
      const res = await datasets.postData(
        SERVER.CREATE_STATUS_GROUP,
        {
          project_id: project?.project_id,
          phases: dates,
        },
        datasets.getToken(),
      );  
      openNotification('Success! Your project was activated correctly!', "success");
      setStep(0);
      setVisible(false);
      loadColumns();
    } catch (error) {
      console.error(error);
      openNotification(`Error.`, "warning", 'An error occurred while activating your project.');
    }
  };

  function resetData() {
    setVisible(false);
  }
  const renderOption = (item: any) => {
    const stream_name = item.stream_name || 'NA';
    return {
      key: `${item.stream_id}`,
      value: `${item.stream_name}`,
      label: (
        <div className="global-search-item">
          <h6 className="wraptext">{stream_name}</h6>
          <h5 className="wraptext" style={{ whiteSpace: 'normal' }}>{item.place_name}</h5>
        </div>
      ),
    }
  };
  return(
    <>
      {emptyDatesAlert && (
        <OverlappingDatesAlert visibleAlert={emptyDatesAlert} setVisibleAlert={setEmptyDatesAlert} />
      )}
      {viewOverlappingAlert && (
        <OverlappingDatesAlert visibleAlert={viewOverlappingAlert} setVisibleAlert={setViewOverlappingAlert} />
      )}
    <Modal
      title="How much funding from MHFD is being requested for the following years:"
      centered
      visible={visible}
      onOk={()=>{setVisible(false)}}
      onCancel={()=>{setVisible(false)}}
      className="work-modal-edit-dates"
      width= '666px'
    > 
      <div className="step-body">
        <div className="header-step">
          <div className={step === 0 ? 'step-active':"step"}>
            <p>STEP 1</p>
            <p className="p-active">Start here</p>
          </div>
          <div className={step === 1 ? 'step-active':"step"}>
            <p>STEP 2</p>
            <p className="p-active">Current phase & date </p>
          </div>
          <div className={step === 2 ? 'step-active':"step"}>
            <p>STEP 3</p>
            <p className="p-active">Confirm </p>
          </div>
        </div>
        <div className="name-project">
          {`${project?.code_project_type?.project_type_name} Project`}
          <h1>{project?.project_name}</h1>
          <p>{step=== 0 ? 'Let’s begin.': 'Define the current phase and start date'}</p>
        </div>
        {step === 0 && (
          <div className="body-edit-dates">
            <div className="img-confetti">
              {/* <img src="Icons/ic-confetti.svg" alt="ic-confetti"/> */}
              <br/>
              Hooray! 
              <br/>
              Let’s add context to your project!
            </div>
          </div>
        )}
        {step === 1 && (
          <>
                {(!onBase || onBase <= 0) && <div className="header-3">
        An OnBase number has not yet been assigned.<br />
        Please continue activating the project
      </div>}
          <div className="body-edit-dates">
            <div className="form-edit-dates">
              <label>1. Current Project Phase &nbsp;<Popover placement="top"
                content={
                  <div className="popoveer-00">
                    <b>Phase:</b> The current phase of the project. Phases are detailed milestones specific to each project type.
                  </div>
                }
              >
                <InfoCircleOutlined style={{opacity:0.4, marginRight:'2px'}} />
              </Popover></label><br/>
              <Select
                placeholder="Select phase"
                style={{ width: '100%', fontSize: '12px', marginBottom: '16px' }}
                listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
                value={selectedPhase}
                onChange={(value: string) => {
                  setSelectedPhase(value)
                  setDateIndex(phaseList.findIndex(x => x.value === value))
                }}
              >
                {phaseList.map((phase, index) => (
                  <Option key={index} value={phase.value}>
                    {phase.label}
                  </Option>
                ))}
              </Select>
              <label>2. Start Date &nbsp;<Popover placement="top"
                content={
                  <div className="popoveer-00">
                    <b>Phase Start Date:</b> Estimated start date of the selected phase. The date entered will be used to prepopulate your project’s schedule.
                  </div>
                }
              >
                <InfoCircleOutlined style={{opacity:0.4, marginRight:'2px'}} />
              </Popover></label><br />
              <DatePicker
                  format="MM-DD-YYYY"
                value = {startDate}
                style={{ width: '100%', borderRadius: '5px', height: '36px', marginBottom: '16px' }}
                onChange={(date: any) => setStartDate(date)}
              />
                <label>
                  3. Primary Stream &nbsp;<Popover placement="top"
                content={
                  <div className="popoveer-00">
                    <b>Primary Stream:</b> The primary stream the project is impacting. Primary Stream is a requirement for generating the Onbase Project Name.
                  </div>
                }
              >
                <InfoCircleOutlined style={{opacity:0.4, marginRight:'2px'}} />
              </Popover> {allFiedsRequired ? '' : <em>(optional)</em>}
                </label><br />
              <AutoComplete
                dropdownMatchSelectWidth={true} 
                style={{ width: '100%', fontSize: '12px', marginBottom: '16px' }}
                options={streamList.length > 0 ? [...streamList.map(renderOption), {}] : streamList.map(renderOption)}
                placeholder="Select primary stream"
                listHeight={windowWidth > 2554 ? (windowWidth > 3799 ? 500 : 300) : 188}
                filterOption={(inputValue: any, option: any) => {
                  if(option.value){
                    return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                  return false;
                }
                }
                onSelect = {(value: any) => {
                  const selectedItem = streamList.find(item => item.stream_name.toString() === value);
                  if (selectedItem) {
                    if (selectedItem.project_stream_id){
                      setPrimaryStream({ id: selectedItem.stream_id, name: selectedItem.stream_name, value: selectedItem.project_stream_id });
                    }                    
                  }
                  setKeyword(value);
                  }
                }
                className="search-input"
                dropdownClassName="search-input-dropdown-stream"
              />
              <label>4. MHFD Lead &nbsp;<Popover placement="top"
                content={
                  <div className="popoveer-00">
                    <b>MHFD Lead:</b> The MHFD staff serving as the primary manager for the project.
                  </div>
                }
              >
                <InfoCircleOutlined style={{opacity:0.4, marginRight:'2px'}} />
              </Popover></label><br />
                <Select
                  placeholder="Select lead"
                  style={{ width: '100%', fontSize: '12px', marginBottom: '16px' }}
                  listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
                  onChange={(value: string) => {
                    const selectedStaff = mhfdStaffList.find(staff => staff.id.toString() === value);
                    if (selectedStaff) {
                      setMhfdLead({ id: selectedStaff.id, name: selectedStaff.value });
                    }
                  }}
                  value={mhfdLead?.id !== null ? mhfdLead.id.toString() : undefined}
                  disabled={disabledFields?.mhfd_lead}
                >
                  {
                    mhfdStaffList.map((staff) => (
                      <Option key={staff.id} value={staff.id.toString()}>
                        {staff.value}
                      </Option>
                    ))
                  }
                </Select>
                <label>
                  5. Location &nbsp;<Popover placement="top"
                content={
                  <div className="popoveer-00">
                    <b>Location:</b> Cross streets or landmarks of the project limits. Location is a requirement for generating the Onbase Project Name.
                  </div>
                }
              >
                <InfoCircleOutlined style={{opacity:0.4, marginRight:'2px'}} />
              </Popover> {allFiedsRequired ? '' : <em>(optional)</em>}
                </label><br />
                <Input
                  value={location}
                  disabled={disabledFields?.location}
                  placeholder="Type a location"
                  style={{ width: '100%', borderRadius: '5px', height: '36px' }}
                  onChange={(e) => setLocation(e.target.value)}
                />
            </div>
          </div>
          </>
        )}
        {step === 2 && (
          <div className="body-edit-dates-step2">
            <div style={{ display: 'flex' }}>
              <span className="span-dots-heder">
                <div className="circulo" style={{ backgroundColor: '#5D3DC7' }} />
                <span style={{ marginLeft: '1px', marginRight: '15px' }}>Done</span>
              </span>
              <span className="span-dots-heder">
                <div className="circulo" style={{ backgroundColor: '#047CD7' }} />
                <span style={{ marginLeft: '1px', marginRight: '15px' }}>Current</span>
              </span>
              <span className="span-dots-heder">
                <div className="circulo" style={{ backgroundColor: '#D4D2D9' }} />
                <span style={{ marginLeft: '1px', marginRight: '15px' }}>Not Started</span>
              </span>
              <span className="span-dots-heder">
                <div className="circulo" style={{ backgroundColor: '#F5575C' }} />
                <span style={{ marginLeft: '1px', marginRight: '15px' }}>Overdue</span>
              </span>
            </div>
            <Row
              className="tollgate-header tollgate-header-head"
              gutter={[16, 16]}
            >
              <Col xs={{ span: 12 }} lg={{ span: 24 }}>
                <Row className="tollgate-row-list-view">
                  <Col xs={{ span: 12 }} lg={{ span: 9 }}>
                    <Row style={{ height: '30px' }}>
                      <Col xs={{ span: 12 }} lg={{ span: 11 }}></Col>
                      <Col xs={{ span: 12 }} lg={{ span: 11 }}></Col>
                    </Row>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 10 }}>
                    <Row style={{ height: '30px' }}>
                      <Col xs={{ span: 12 }} lg={{ span: 10 }} style={{ textAlign: 'center' }}>
                        <h5>Start</h5>
                      </Col>
                      <Col xs={{ span: 12 }} lg={{ span: 11 }} style={{ textAlign: 'center' }}>
                        <h5>End</h5>
                      </Col>
                      <Col xs={{ span: 12 }} lg={{ span: 3 }} style={{ textAlign: 'center' }}></Col>
                    </Row>
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 5 }}>
                    <Row style={{ height: '30px' }}>
                      <Col xs={{ span: 12 }} lg={{ span: 24 }} style={{ textAlign: 'center' }}>
                        <h5>Months</h5>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row
              className="tollgate-header"
              gutter={[16, 16]}
              style={{ paddingTop: '0px', paddingBottom: '20px' }}
            >
              <Col xs={{ span: 12 }} lg={{ span: 24 }}>
                <Row className="tollgate-row-list-view  tollgate-body">
                  <Col xs={{ span: 12 }} lg={{ span: 9 }} className="left-tollgate">
                    {dates?.map((x: any, index: number) => {
                      return (
                        <div key={x.phase_id} className="text-tollgate-title">
                          <span className='name-tollgate' style={{color: invalidDateIndex === index ? 'red' : undefined }}>
                            <span className="span-dots-tollgate">
                              <div className="toolgate-circle" style={{ backgroundColor: colorScale[paintCircle(index)] }} />
                            </span>
                            {x.name.replace(/([A-Z])/g, ' $1')}
                          </span>
                          <span className='dots-tollgate'>
                            {x.locked && <LockOutlined />}
                            <Dropdown overlay={menu(x, index)} placement="bottomRight">
                              <MoreOutlined />
                            </Dropdown>
                          </span>
                        </div>
                      );
                    })}
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 10 }}>
                    {dates?.map((x: any, index: number) => {
                      return (
                        <div className="calendar-toollgate" key={x.phase_id}>
                          <RangePicker
                            bordered={false}
                            onCalendarChange={(e: any) => {
                              if (!x?.from || e[0].format('DD/MM/YYYY') !== x.from?.format('DD/MM/YYYY')) {
                                if (!e[0] && e[1]) {
                                  updateDate(index, e[1]);
                                }
                                updateDate(index, e[0]);
                              }
                              if (e[1]) {
                                updateEndDate(index, e[1]);
                              }
                              if (x.current) {
                                x.locked = true;
                              }
                              setCalendarValue(e[0]);
                              setCalendarPhase(x.phase_id);
                            }}
                            format={dateFormatList}
                            value={[x.from, x.to]}
                          />
                        </div>
                      );
                    })}
                  </Col>
                  <Col xs={{ span: 12 }} lg={{ span: 5 }} style={{ paddingLeft: '10px' }}>
                    {dates?.map((x: any, index: number) => {
                      return (
                        <Row key={x.phase_id}>
                          <Col xs={{ span: 12 }} lg={{ span: 24 }}>
                            <InputNumber
                              className="duration-toollgate duration-toollgate-l"
                              min={1}
                              max={48}
                              defaultValue={x.duration}
                              value={x.duration}
                              onChange={e => {
                                updateDuration(index, e);
                              }}
                            />
                          </Col>
                        </Row>
                      );
                    })}
                  </Col>
                </Row>

              </Col>
            </Row>
          </div>
        )}
        <div className="foot-edit-dates">
          <Button className="btn-transparent"
            onClick={() => resetData()}>
            Cancel
          </Button>
          <Button className="btn-purple"
            onClick={() =>{if(step === 2) {
              if (overlapping) {
                setViewOverlappingAlert(true)
              }else{
                sendData()
              }
            }else{
              if (step === 1 && missingFields.length > 0) {
                openNotification(`Please fill the following fields: ${missingFields.join(', ')}`, "warning");
                return
              }
              if (step === 1 && selectedPhase && startDate){
                setGenerateDates(!generateDates)
              }
              setStep(step + 1)
            }}}
          >
          {step === 2 ?'Activate':'Next'}</Button>
        </div>
      </div>
    </Modal>
    </>
  )
};

export default EditDatesModal;