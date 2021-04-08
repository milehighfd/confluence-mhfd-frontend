import React, { useRef, useState } from 'react';

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

const TrelloLikeCard = ({ project, columnIdx, rowIdx, saveData }: {
  project: any,
  columnIdx: number,
  rowIdx: number,
  saveData: Function
}) => {
  const divRef = useRef(null);
  const {setZoomProject} = useProjectDispatch();
  const {
    projectid,
    projectname,
    jurisdiction,
    status
  } = project.projectData;
  const amount = project[`req${columnIdx}`];
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showModalProject, setShowModalProject] = useState(false);
  const content = (
    <Menu className="js-mm-00">
      <Menu.Item onClick={() => setShowModalProject(true)}>
        <span><img src="/Icons/icon-04.svg" alt="" width="10px" style={{ opacity: '0.5' }} /> Edit Project</span>
      </Menu.Item>
      <Menu.Item onClick={() => setShowAmountModal(true)}>
        <span>
          <img src="/Icons/icon-90.svg" alt="" width="8px" style={{ opacity: '0.5' }} />
          Edit Amount
        </span>
      </Menu.Item>
      <Menu.Item onClick={()=> setZoomProject(project.projectData)}>
        <span><img src="/Icons/icon-13.svg" alt="" width="10px" style={{ opacity: '0.5' }} /> Zoom to</span>
      </Menu.Item>
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
          <img src="/Icons/icon-16.svg" alt="" width="10px" />
          Delete
        </span>
      </Menu.Item>
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

  return (
    <>
    {showModalProject &&
    <ModalProjectView
        visible= {showModalProject}
        setVisible= {setShowModalProject}
        data={project.projectData}
        showDefaultTab={true}
    />
    }
    <AmountModal
      project={project}
      projectId={projectid}
      visible={showAmountModal}
      setVisible={setShowAmountModal}
      startYear={2021}
      saveData={saveData}
      />
    <div ref={divRef} className="card-wr" style={{ borderLeft: '3px solid #9faeb1' }} draggable onDragStart={e => onDragStart(e, projectid)}
      onDrop={(e: any) => {
        console.log('point', e.clientX, e.clientY)
        console.log('droppen on top trello like card');
        let dr: any = divRef.current;
        let bounds = dr.getBoundingClientRect();
        let halfY = bounds.bottom - bounds.top;

        let isBottomHalf = e.clientY >= halfY;
        if (isBottomHalf) {
          CardStatService.setPosition(rowIdx)
        } else {
          CardStatService.setPosition(rowIdx + 1)
        }
        
        console.log('isBottomHalf', isBottomHalf)

        let isInsideX = bounds.left <= e.clientX && e.clientX <= bounds.right;
        console.log('isInsideX', isInsideX)

        console.log ('getBoundingClientRect', dr.getBoundingClientRect());
        e.preventDefault();
      }}>
      <h4>{displayName}</h4>
      <h6>{amount ? formatter.format(amount) : ''}</h6>
      <label className="purple">{displayJurisdiction}</label>
      <label className="yellow">{status}</label>
      {
        !showAmountModal &&
        <Popover placement="bottom" overlayClassName="work-popover" content={content} trigger="click">
          <img src="/Icons/icon-60.svg" alt="" className="menu-wr" />
        </Popover>
      }
    </div>
    </>
  )

}

export default TrelloLikeCard;
