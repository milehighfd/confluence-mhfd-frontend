import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { colorScale } from '../constants/PhaseViewData';
import { usePortflioState } from 'hook/portfolioHook';

const ModalGraphic = () => {
  const { scheduleList, positionModalGraphic, dataModal: dataProject } = usePortflioState();
  const [actualEndDate, setActualEndDate] = useState<any>()
  const [modifiedDate, setModifiedDate] = useState<any>()
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  useEffect(() => {
    const modified_date = dataProject?.data?.project_status?.filter((x: any) => x.code_phase_type_id === dataProject?.phase_id)[0]?.modified_date;
    setModifiedDate(modified_date)
    if (dataProject?.to !== null) {
      let check1 = moment.utc(dataProject?.to, 'YYYY-MM-DD');
      let monthEnd = check1.format('MM');
      monthEnd = monthNames[+monthEnd - 1];
      let dayEnd = check1.format('DD');
      let yearEnd = check1.format('YYYY');
      setActualEndDate(`Due on ${monthEnd} ${dayEnd}, ${yearEnd}.`)
    }    
  }, [dataProject])

  const colorStatus = (d:any)=>{
    let currentIndex = 0;
    let phaseIndex = 0;
    if (d?.data?.code_phase_types){
      currentIndex = (d?.data?.code_phase_types?.findIndex((x: any) => x?.phase_id === d?.data?.phaseId))
      phaseIndex = (d?.data?.code_phase_types?.findIndex((x: any) => x?.phase_id === d?.phase_id))
    }else{
      currentIndex = (scheduleList?.findIndex((x: any) => x?.phase_id === d?.data?.phaseId))
      phaseIndex = (scheduleList?.findIndex((x: any) => x?.phase_id === d?.phase_id))
    }
    let color = '';
    let today = moment()
    if (currentIndex > phaseIndex) {
      color = 'Done'
    } else if (currentIndex === phaseIndex) {
      if (d?.to) {
        const diffDates = ((moment(d?.to).diff(today, 'M', true)))
        if (diffDates < 0) {
          color = 'Overdue'
        } else {
          color = 'Current'
        }
      } else {
        color = 'Current'
      }
    } else {
      color = 'NotStarted'
    }
    return (d.type === 'title' ? '#C9C5D8' : colorScale[color]);
  }
  if (Object.keys(dataProject).length > 0) {
    return (
      <div className='modal-graphic' id='popup-phaseview' style={{ left: positionModalGraphic.left, top: positionModalGraphic.top, borderTopColor: colorStatus(dataProject) }}>
        <p className="title">{dataProject.schedulePhase}</p>
        <p style={{ color: 'white' }}>{dataProject?.data.rowLabel}</p>
        <hr></hr>
        <p>{dataProject.actualNumber <= 1 ? `${dataProject.actualNumber} Action Item of ${dataProject.scheduleList} Remaining` :
          `${dataProject.actualNumber} Action Items of ${dataProject.scheduleList} Remaining`}</p>
        <hr></hr>
        <p>{!actualEndDate ? 'No data available.' : actualEndDate}</p>
        <p>{!modifiedDate ? 'No data available.' : `Modified : ${moment(modifiedDate).format('MMMM d, YYYY')}`}</p>
      </div>
    )
  } else {
    return (
      <div className='modal-graphic' id='popup-phaseview' style={{ left: positionModalGraphic.left, top: positionModalGraphic.top }}>
        <p className="title">-</p>
        <p style={{ color: 'white' }}>-</p>
        <hr></hr>
        <p>{`- Action Item of - Closed`}</p>
        <hr></hr>
        <p>No data available.</p>
      </div>
    )
  }
};

export default ModalGraphic;
