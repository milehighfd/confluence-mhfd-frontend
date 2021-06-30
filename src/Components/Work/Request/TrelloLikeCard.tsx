import React, { useEffect, useRef, useState } from 'react';

import { Menu, Popover } from 'antd';
import AmountModal from './AmountModal';
import { useProjectDispatch } from '../../../hook/projectHook';
import { ModalProjectView } from './../../ProjectModal/ModalProjectView'
import { deleteData, getToken } from '../../../Config/datasets';
import { SERVER } from '../../../Config/Server.config';

import CardStatService from './CardService';
import { DeleteAlert } from './DeleteAlert';
import LoadingView from '../../Loading/LoadingView';
import { boardType } from './RequestTypes';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

const TrelloLikeCard = ({ year, type, namespaceId, setLoading, delProject, project, columnIdx, rowIdx, saveData, tabKey, editable, locality, filtered, borderColor }: {
  year: number,
  type: boardType,
  namespaceId: string,
  setLoading: Function,
  delProject: Function,
  project: any,
  columnIdx: number,
  rowIdx: number,
  saveData: Function,
  tabKey: string,
  editable: boolean,
  filtered: boolean,
  locality: any,
  borderColor: string,
}) => {
  const divRef = useRef(null);
  const {setZoomProject, updateSelectedLayers} = useProjectDispatch();
  const {
    projectid,
    projectname,
    jurisdiction,
    projectsubtype,
    status
  } = project.projectData;
  const [goingToBeDeleted, setGoingToBeDeleted] = useState(false);
  const [amount, setAmount] = useState(project[`req${columnIdx}`]);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showModalProject, setShowModalProject] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const deleteProject = () => {
    delProject(projectid)
    setLoading(true);
    deleteData(`${SERVER.URL_BASE}/board/project/${projectid}/${namespaceId}`, getToken())
      .then((r) => {
        console.log('r', r)
        setLoading(false)
      })
      .catch((e) => {
        console.log('e', e)
        setLoading(false)
      })
  }

  const content = (
    <Menu className="js-mm-00">
      <Menu.Item onClick={() => setShowModalProject(true)}>
        <span><img src="/Icons/icon-04.svg" alt="" width="10px" style={{ opacity: '0.5', marginTop:'-2px' }} /> Edit Project</span>
      </Menu.Item>
      {
        editable &&
        <Menu.Item onClick={() => setShowAmountModal(true)}>
          <span>
            <img src="/Icons/icon-90.svg" alt="" width="8px" style={{ opacity: '0.5', marginTop:'-2px', marginRight:'8.8px' }} />
            Edit Amount
          </span>
        </Menu.Item>
      }
      <Menu.Item onClick={()=> setZoomProject(project.projectData)}>
        <span><img src="/Icons/icon-13.svg" alt="" width="10px" style={{ opacity: '0.5', marginTop:'-2px', marginRight:'4.6px' }} /> Zoom to</span>
      </Menu.Item>
      {
        editable &&
      <Menu.Item onClick={() => setShowDeleteAlert(true)}>
        <span>
          <img src="/Icons/icon-16.svg" alt="" width="10px" style={{marginTop:'-3px', marginRight:'6.8px'}} />
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

  useEffect(() => {
    setAmount(project[`req${columnIdx}`])
  }, [project, columnIdx])

  useEffect(()=>{
    if(showModalProject) {
      updateSelectedLayers([]);
    }
  },[showModalProject]);

  if (goingToBeDeleted) {
    return <div className="card-wr">
      <LoadingView />
    </div>
  }

  let statusLabel = null;
  if (year <= 2021) {
    statusLabel = status;
  } else {
    if (columnIdx === 0) {
      statusLabel = 'Draft';
    } else {
      if (type ==='WORK_REQUEST') {
        if (editable) {
          statusLabel = 'Draft';
        } else {
          statusLabel = 'Requested';
        }
      } else {
        if (editable) {
          statusLabel = 'Requested';
        } else {
          statusLabel = 'Approved';
        }
      }
    }
  }
  let color = null, backgroundColor = null;
  switch(statusLabel) {
    case 'Requested':
      backgroundColor = 'rgba(94, 61, 255, 0.15)';
      color = '#9309EA';
      break;
    case 'Approved':
      backgroundColor = 'rgba(97, 158, 234, 0.15)';
      color = '#497BF3';
      break;
    case 'Initiated':
      backgroundColor = 'rgba(41, 196, 153, 0.08)';
      color = '#139660';
      break;
    case 'Cancelled':
      backgroundColor = 'rgba(255, 0, 0, 0.08)';
      color = '#FF0000';
      break;
    case 'Complete':
      backgroundColor = 'rgba(41, 196, 153, 0.08)';
      color = '#06242D';
      break;
    default:
      color= '#FF8938';
      backgroundColor = 'rgba(255, 221, 0, 0.3)';
  }

  return (
    <>
    {
      showDeleteAlert &&
      <DeleteAlert
        visibleAlert={showDeleteAlert}
        setVisibleAlert={setShowDeleteAlert}
        action={deleteProject}
        name={projectname}
        />
    }
    {showModalProject &&
    <ModalProjectView
        visible= {showModalProject}
        setVisible= {setShowModalProject}
        data={project.projectData}
        showDefaultTab={true}
        locality={locality}
        editable= {editable}
    />
    }
    <AmountModal
      project={project}
      projectId={projectid}
      visible={showAmountModal}
      setVisible={setShowAmountModal}
      startYear={year}
      saveData={saveData}
      tabKey={tabKey}
      projectsubtype={projectsubtype}
      />
    <div ref={divRef} className="card-wr" style={{ borderLeft: `3px solid ${borderColor}`, borderRadius: '4px' }} draggable={editable && !filtered} onDragStart={e => onDragStart(e, projectid)}
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
      <label className="purple">{project.origin}</label>
      <label className="yellow" style={{color, backgroundColor}}>{statusLabel}</label>
      {
        !(showAmountModal || showModalProject || showDeleteAlert) &&
        <Popover placement="bottom" overlayClassName="work-popover menu-item-custom dots-menu" content={content} trigger="click">
          <div className="dot-position" onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="menu-wr" width="3" height="13" viewBox="0 0 3 13" >
            <defs>
              <clipPath id="clip-path">
                <path id="Trazado_296" data-name="Trazado 296" d="M1.5-3A1.5,1.5,0,0,1,3-1.5,1.5,1.5,0,0,1,1.5,0,1.5,1.5,0,0,1,0-1.5,1.5,1.5,0,0,1,1.5-3Zm0-5A1.5,1.5,0,0,1,3-6.5,1.5,1.5,0,0,1,1.5-5,1.5,1.5,0,0,1,0-6.5,1.5,1.5,0,0,1,1.5-8Zm0-5A1.5,1.5,0,0,1,3-11.5,1.5,1.5,0,0,1,1.5-10,1.5,1.5,0,0,1,0-11.5,1.5,1.5,0,0,1,1.5-13Z" fill="none" clipRule="evenodd"/>
              </clipPath>
            </defs>
            <g id="Grupo_290" data-name="Grupo 290" transform="translate(0 13)">
              <g id="Grupo_289" data-name="Grupo 289" clipPath="url(#clip-path)">
                <path id="Trazado_295" data-name="Trazado 295" d="M-5-18H8V5H-5Z" fill={isHovered ? '#0F232C' : 'rgba(36,24,98,0.2)'}/>
              </g>
            </g>
          </svg>
          </div>
        </Popover>
      }
    </div>
    </>
  )

}

export default TrelloLikeCard;
