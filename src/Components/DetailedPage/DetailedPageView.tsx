import React, { useState, useEffect } from "react";

import DetailedModal from '../Shared/Modals/DetailedModal';
import { useLocation } from 'react-router-dom';
import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER } from '../../constants/constants';
import { useDetailedState } from "../../hook/detailedHook";
import { useMapDispatch } from "../../hook/mapHook";

const DetailedPageView = () => {
  const { existDetailedPageProject, existDetailedPageProblem } = useMapDispatch();
  const { displayModal, detailed } = useDetailedState();
    const visible = useLocation().search ? true : false;
    const location = useLocation().search;
    const setVisible = () => {
        console.log('disabled');
    }
    const [data, setData] = useState({
        problemid: '',
        projectid: '',
        id: '',
        objectid: '',
        value: '',
        type: ''
      });
      useEffect(() => {
        if(location.includes('problemid=')) {
          const id = location.replace('?problemid=', '');
          existDetailedPageProblem(id);
          const auxData = {...data};
          auxData.problemid = id;
          setData(auxData);
        }
        if(location.includes('projectid=')) {
          const params = location.split('&');
          if(params.length === 2) {
            const type = params[0].replace('?type=', '');
            const projectid = params[1].replace('projectid=', '');
            const url = 'type=' + type + '&projectid=' + projectid;
            existDetailedPageProject(url);
            const auxData = {...data};
            auxData.type = type;
            auxData.projectid = projectid;
            setData(auxData);
          }
        }
      }, []);
    return <>
        { displayModal && visible && <DetailedModal
        detailed={detailed}
        type={data.problemid ? FILTER_PROBLEMS_TRIGGER: FILTER_PROJECTS_TRIGGER}
        data={data}
        visible={visible}
        setVisible={setVisible}
      />}
    </>
}

export default DetailedPageView;
