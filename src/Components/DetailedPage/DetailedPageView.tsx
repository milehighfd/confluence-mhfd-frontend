import React, { useState, useEffect } from "react";

import DetailedModal from '../Shared/Modals/DetailedModal';
import { useLocation } from 'react-router-dom';
import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER } from '../../constants/constants';
import { isNull } from "util";

export default ({displayModal, detailed, loaderDetailedPage, componentsOfProblems, loaderTableCompoents ,getDetailedPageProblem,
    getDetailedPageProject, getComponentsByProblemId, existDetailedPageProject, existDetailedPageProblem, componentCounter, getComponentCounter} : any) => {
    const [visible, setVisibleModal] = useState(useLocation().search ? true: false);
    const location = useLocation().search;
    const setVisible = () => {
        console.log('disabled');
    }
    const [data, setData] = useState({
        problemid: '',
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
        if(location.includes('?objectid=') && location.includes('&cartoid=') && location.includes('&type=') && location.includes('&id=')) {
          const params = location.split('&');
          if(params.length === 4) {
            const objectid = params[0].replace('?objectid=', '');
            const cartoid = params[1].replace('cartoid=', '');
            const type = params[2].replace('type=', '');
            const id = params[3].replace('id=', '');
            const url = 'objectid=' + objectid + '&cartoid=' + cartoid + '&type=' + type;
            existDetailedPageProject(url);
            const auxData = {...data};
            auxData.objectid = objectid;
            auxData.value = cartoid;
            auxData.type = type;
            auxData.id = id;
            setData(auxData);
          }
        }
      }, []);
    return <>
        { displayModal && visible && <DetailedModal
        detailed={detailed}
        getDetailedPageProblem={getDetailedPageProblem}
        getDetailedPageProject={getDetailedPageProject}
        loaderDetailedPage={loaderDetailedPage}
        getComponentsByProblemId={getComponentsByProblemId}
        type={data.problemid ? FILTER_PROBLEMS_TRIGGER: FILTER_PROJECTS_TRIGGER}
        data={data}
        visible={visible}
        setVisible={setVisible}
        componentsOfProblems={componentsOfProblems}
        loaderTableCompoents={loaderTableCompoents}
        componentCounter={componentCounter}
        getComponentCounter={getComponentCounter}
      />}
    </>
}