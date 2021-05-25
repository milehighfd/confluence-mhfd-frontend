import React, { useEffect } from 'react';
import RequestView from '../Request/RequestView';
import { useProjectState, useProjectDispatch } from '../../../hook/projectHook';

const WorkPlan = () => {
  const { setBoardProjects } = useProjectDispatch();  
  useEffect(()=>{
    setBoardProjects(['-212c1asdf20']);
  },[]);
    return (
        <RequestView type={'WORK_PLAN'} />
    )
}

export default WorkPlan;
