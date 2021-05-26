import React, { useEffect } from 'react';
import RequestView from '../Request/RequestView';
import { useProjectState, useProjectDispatch } from '../../../hook/projectHook';

const WorkPlan = () => {
  return (
    <RequestView type={'WORK_PLAN'} isFirstRendering={true}/>
  )
}

export default WorkPlan;
