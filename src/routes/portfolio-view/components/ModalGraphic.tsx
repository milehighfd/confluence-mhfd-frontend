import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import { colorScale } from '../constants/PhaseViewData';

const ModalGraphic = ({
  positionModalGraphic,
  dataProject,
  scheduleList
}: {
  positionModalGraphic?: any,
  dataProject?: any,
  scheduleList?:any
}) => {
  const [actualEndDate, setActualEndDate] = useState<any>()
  const [modifiedDate, setModifiedDate] = useState<any>()
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  useEffect(() => {
    const modified_date = dataProject?.d?.project_status?.filter((x: any) => x.code_phase_type_id === dataProject?.phase_id)[0]?.modified_date;
    setModifiedDate(modified_date)
    if (Object.keys(dataProject).length === 0) return;
    const controller = new AbortController();
    datasets.postData(
      `${SERVER.STATUS}`,
      { code_phase_type_id: dataProject.phase_id, project_id: dataProject.d.project_id },
      datasets.getToken(),
      controller.signal
    )
      .then((rows) => {
        if (Object.keys(rows).length > 0) {
          if (rows[0].actual_end_date !== null) {
            let check1 = moment(rows[0].actual_end_date, 'YYYY-MM-DD');
            let monthEnd = check1.format('MM');
            monthEnd = monthNames[+monthEnd - 1];
            let dayEnd = check1.format('DD');
            let yearEnd = check1.format('YYYY');
            setActualEndDate(`Due on ${monthEnd} ${dayEnd}, ${yearEnd}.`)
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
    return () => {
      controller.abort();
    };
  }, [dataProject])

  const colorStatus = (d:any)=>{
    let currentIndex = (scheduleList?.findIndex((x: any) => x?.phase_id === d?.d?.phaseId))
    let phaseIndex = (scheduleList?.findIndex((x: any) => x?.phase_id === d?.phase_id))
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
        <p style={{ color: 'white' }}>{dataProject.d.rowLabel}</p>
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
