import React, { useEffect, useRef, useState } from 'react';

import { Menu, Popover } from 'antd';
import AmountModal from './AmountModal';
import { useProjectDispatch } from '../../../hook/projectHook';
import { ModalProjectView } from './../../ProjectModal/ModalProjectView'
import { deleteData, getToken } from '../../../Config/datasets';
import { SERVER } from '../../../Config/Server.config';

import CardStatService from './CardService';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

const TrelloLikeCard = ({ project, columnIdx, rowIdx, saveData, tabKey, editable, locality, filtered, borderColor }: {
  project: any,
  columnIdx: number,
  rowIdx: number,
  saveData: Function,
  tabKey: string,
  editable: boolean,
  filtered: boolean,
  locality: any,
  borderColor: string
}) => {
  const divRef = useRef(null);
  const {setZoomProject, updateSelectedLayers} = useProjectDispatch();
  const {
    projectid,
    projectname,
    jurisdiction,
    projectsubtype
  } = project.projectData;

  const amount = project[`req${columnIdx}`];
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showModalProject, setShowModalProject] = useState(false);
  const content = (
    <Menu className="js-mm-00">
      <Menu.Item onClick={() => setShowModalProject(true)}>
        <span><img src="/Icons/icon-04.svg" alt="" width="10px" style={{ opacity: '0.5', marginTop:'-2px' }} /> Edit Project</span>
      </Menu.Item>
      {
        editable &&
        <Menu.Item onClick={() => setShowAmountModal(true)}>
          <span>
            <img src="/Icons/icon-90.svg" alt="" width="8px" style={{ opacity: '0.5', marginTop:'-2px' }} />
            Edit Amount
          </span>
        </Menu.Item>
      }
      <Menu.Item onClick={()=> setZoomProject(project.projectData)}>
        <span><img src="/Icons/icon-13.svg" alt="" width="10px" style={{ opacity: '0.5', marginTop:'-2px' }} /> Zoom to</span>
      </Menu.Item>
      {
        editable &&
      <Menu.Item onClick={() => {
        deleteData(`${SERVER.URL_BASE}/board/project/${projectid}`, getToken())
        .then((r) => {
          console.log('r', r)
        })
        .catch((e) => {
          console.log('e', e)
        })
      }}>
        <span>
          <img src="/Icons/icon-16.svg" alt="" width="10px" style={{marginTop:'-3px'}} />
          Delete
        </span>
      </Menu.Item>
      }
    </Menu>
  );

  const onDragStart = (e: any, id: any) => {
    e.dataTransfer.setData('text', JSON.stringify({id, fromColumnIdx: columnIdx}));
  }

  let displayName = projectname;
  if (projectname.length > 35) {
    displayName = projectname.substr(0,35) + '...';
  }

  let displayJurisdiction = jurisdiction;
  if (jurisdiction.startsWith('Unincorporated')) {
    displayJurisdiction = jurisdiction.substr('Unincorporated'.length + 1);
  }
  useEffect(()=>{
    if(showModalProject) {
      updateSelectedLayers([]);
    } 
  },[showModalProject]);
  return (
    <>
    {showModalProject &&
    <ModalProjectView
        visible= {showModalProject}
        setVisible= {setShowModalProject}
        data={project.projectData}
        showDefaultTab={true}
        locality={locality}
    />
    }
    <AmountModal
      project={project}
      projectId={projectid}
      visible={showAmountModal}
      setVisible={setShowAmountModal}
      startYear={2021}
      saveData={saveData}
      tabKey={tabKey}
      projectsubtype={projectsubtype}
      />
    <div ref={divRef} className="card-wr" style={{ borderLeft: `3px solid ${borderColor}` }} draggable={editable && !filtered} onDragStart={e => onDragStart(e, projectid)}
      onDrop={(e: any) => {
        let dr: any = divRef.current;
        let bounds = dr.getBoundingClientRect();
        let halfY = (bounds.bottom + bounds.top) / 2;
        let isBottomHalf = e.clientY >= halfY;
        if (isBottomHalf) {
          CardStatService.setPosition(rowIdx + 1)
        } else {
          CardStatService.setPosition(rowIdx)
        }
        e.preventDefault();
      }}>
      <h4>{displayName}</h4>
      <h6>{amount ? formatter.format(amount) : ''}</h6>
      <label className="purple">{displayJurisdiction}</label>
      <label className="yellow">{editable ? 'Draft' : 'Requested'}</label>
      {
        !showAmountModal &&
        <Popover placement="bottom" overlayClassName="work-popover menu-item-custom" content={content} trigger="click">
          <img src="/Icons/icon-60.svg" alt="" className="menu-wr" />
        </Popover>
      }
    </div>
    </>
  )

}

export default TrelloLikeCard;
