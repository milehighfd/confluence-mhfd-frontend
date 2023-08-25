import React, { useEffect, useState } from 'react';

import { Menu, MenuProps, Popover } from 'antd';
import AmountModal from './AmountModal';
import { useProjectDispatch } from '../../../hook/projectHook';
import ModalProjectView from 'Components/ProjectModal/ModalProjectView'
import { getToken, postData, getData } from '../../../Config/datasets';
import { SERVER } from '../../../Config/Server.config';

import CardStatService from './CardService';
import { boardType } from './RequestTypes';
import { MoreOutlined } from '@ant-design/icons';
import { CopyProjectAlert } from './CopyProjectAlert';
import { useRequestState } from 'hook/requestHook';
import { STATUS_NAMES } from 'constants/constants';
import EditDatesModal from './EditDatesModal';
import store from 'store/index';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

const TrelloLikeCard = ({ year, type, namespaceId, project, columnIdx, rowIdx, tabKey, editable, locality, borderColor, divRef }: {
  year: number,
  type: boardType,
  namespaceId: string,
  project: any,
  columnIdx: number,
  rowIdx: number,
  tabKey: string,
  editable: boolean,
  locality: any,
  borderColor: string,
  divRef:any,
}) => {
  const { showFilters: filtered } = useRequestState();
  const {setZoomProject, updateSelectedLayers, archiveProject} = useProjectDispatch();
  const { project_id } = project;
  const project_name = project?.projectData?.project_name;
  const proj_status_type_id: any = project?.code_status_type_id ?? 1;
  let status: any =  STATUS_NAMES[proj_status_type_id];
  const {id, board_project_id} = project;
  const [amount, setAmount] = useState(project[`req${columnIdx}`]);
  const priority = project[`originPosition${columnIdx}`];
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showModalProject, setShowModalProject] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [completeProjectData, setCompleteProjectData] = useState<any>(null);
  const [showCopyToCurrentYearAlert, setShowCopyToCurrentYearAlert] = useState(false);
  const appUser = store.getState().profile;
  const [disabledLG, setDisabledLG] = useState(appUser?.isLocalGovernment || appUser?.userInformation?.designation === 'government_staff');

  const pageWidth  = document.documentElement.scrollWidth;
  const getCompleteProjectData = async () => {
    let dataForBoard = {...project.projectData};
    const dataFromDB = await getData(SERVER.V2_DETAILED_PAGE(dataForBoard.project_id), getToken());
    setCompleteProjectData({...dataFromDB, tabKey}); 
  }

  const copyProjectToCurrent = () => {
    postData(
      `${SERVER.URL_BASE}/create/copy`,
      {
        id: project.id,
        project_id,
        locality,
        projecttype: tabKey
      },
      getToken()
    )
      .then((r) => {
        console.log('r', r)
      })
      .catch((e) => {
        console.log('e', e)
      })
  };

  
  const content = () => {
    const items: MenuProps['items'] = [{
      key: '0',
      label: <span style={{borderBottom: '1px solid transparent'}}>
        <img src="/Icons/icon-04.svg" alt="" width="10px" style={{ opacity: '0.5', marginTop: '-2px' }} />
        Edit Project
      </span>,
      onClick: (() => getCompleteProjectData())
    }, {
      key: '1',
      label: <span style={{borderBottom: '1px solid transparent'}}>
        <img src="/Icons/icon-90.svg" alt="" width="10px" style={{ opacity: '0.5', marginTop: '-2px', marginRight: '4px' }} />
        Edit Amount
      </span>,
      onClick: (() => setShowAmountModal(true))
    }, {
      key: '2',
      label: <span style={{borderBottom: '1px solid transparent'}}>
        <img src="/Icons/icon-13.svg" alt="" width="10px" style={{ opacity: '0.5', marginTop: '-2px', marginRight: '4.6px' }} />
        Zoom to
      </span>,
      onClick: (() => { setZoomProject(project.projectData);})
    }];
    if (!editable) {
      items.pop();
      items.splice(1, 1);
    }
    if(disabledLG && type === 'WORK_PLAN'){
      items.splice(0, 1);
    }
    if (type === 'WORK_PLAN' && year != 2023) {
      items.splice(2, 0, {
        key: '4',
        label: <span style={{borderBottom: '1px solid transparent'}}>
          <img src="/Icons/icon-04.svg" alt="" width="10px" style={{ opacity: '0.5', marginTop: '-2px' }} />
          Copy to Current Year
        </span>,
        onClick: (() => setShowCopyToCurrentYearAlert(true))
      });
    }
    items.push({
      key: '5',
      label: <span style={{borderBottom: '1px solid transparent'}}>
        <img src="/Icons/icon-04.svg" alt="" width="10px" style={{ opacity: '0.5', marginTop: '-2px' }} />
        Archive Project
      </span>,
      onClick: (() => archiveProject(project?.projectData?.project_id))
    });
    return (<Menu className="js-mm-00" items={items} />)
  };

  const onDragStart = (e: any, id: any) => {
    e.dataTransfer.setData('text', JSON.stringify({id, fromColumnIdx: columnIdx}));
  }

  let displayName = project_name || '';
  if (displayName.length > 35) {
    displayName = displayName.substr(0,35) + '...';
  }

  useEffect(() => {
    setAmount(project[`req${columnIdx}`])
  }, [project, columnIdx]);
  
  useEffect(() => {
    if (completeProjectData) {
      setShowModalProject(true);
    }
  }, [completeProjectData]);

  useEffect(()=>{
    if(!showModalProject) {
      setCompleteProjectData(null);
    }
  },[showModalProject]);

  let color = null, backgroundColor = null;
  
  switch(status) {
    case 'Requested':
      backgroundColor = 'rgba(94, 61, 255, 0.15)';
      color = '#9309EA';
      break;
    case 'Approved':
      // backgroundColor = 'rgba(97, 158, 234, 0.15)';
      // color = '#497BF3';
      backgroundColor = 'rgba(143, 252, 83, 0.3)';
      color = '#139660';
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
    case 'Active': 
      // backgroundColor = 'rgba(65, 110, 218, 0.08)';
      // color = '#416EDA';
      backgroundColor = 'rgba(143, 252, 83, 0.3)';
      color = '#139660';
      break;
    case 'Inactive':
      // backgroundColor = 'rgba(164, 1688, 248, 0.08)';
      // color = '#A4BCF8';
      backgroundColor = 'rgba(255, 0, 0, 0.08)';
      color = '#FF0000';
      break;
    case 'Closed':
      backgroundColor = 'rgba(204, 146, 240, 0.2)';
      color = '#9309EA';
      break;
    default:
      color= '#FF8938';
      backgroundColor = 'rgba(255, 221, 0, 0.3)';
  }
  
  let labelOrigin = project.origin;
  if (labelOrigin?.length > 9) {
    labelOrigin = labelOrigin.substr(0, 9) + '...';
  }

  return (
    <>
    {
      showCopyToCurrentYearAlert &&
      <CopyProjectAlert
        visibleAlert={showCopyToCurrentYearAlert}
        setVisibleAlert={setShowCopyToCurrentYearAlert}
        action={copyProjectToCurrent}
        />
    }
    {showModalProject &&
    <ModalProjectView
        visible= {showModalProject}
        setVisible= {setShowModalProject}
        data={completeProjectData}
        showDefaultTab={true}
        locality={locality}
        editable= {editable}
    />
    }
    <AmountModal
      project={project}
      visible={showAmountModal}
      setVisible={setShowAmountModal}
      />
      {/* New Modal Edit date */}
    {/* <EditDatesModal visible={showAmountModal}
      setVisible={setShowAmountModal} /> */}
    <div ref={divRef} className="card-wr" style={{ borderLeft: `${pageWidth > 2000? (pageWidth > 3000? '6':'5'):'3'}px solid ${borderColor}`, borderRadius: '4px' }} draggable={editable && !filtered}
      onDragStart={e => {
        onDragStart(e, project_id);
      }}
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
        <div style={{marginRight:'-10px', width:'100%'}}>
          <Popover placement="top" content={<>
            <b>{project_name}</b>
            <br />
            <b>Project: </b> {project_id}
            <br />
            <b>Board project: </b> {board_project_id}
            </>}>
            <h4>{displayName}</h4>
          </Popover>
          <div style={{marginRight:'-10px'}}>
            <h6 style={{marginRight:'-10px'}}>{amount ? formatter.format(amount) : ''}</h6>
            {
              type === 'WORK_PLAN' &&
              <label className="purple-priority"style={{marginRight:'-10px'}}>
                {
                  priority === null ? 'Work Plan' :`No. ${priority + 1}`
                }
              </label>
            }
            <Popover placement="top" content={<>{project.origin}</>} style={{marginRight:'-10px'}}>
              <label className="purple" >{labelOrigin}</label>
            </Popover>
            <label className="yellow" style={{color, backgroundColor,marginRight:'-10px'}}>{status}</label>
            {
              !(showAmountModal || showModalProject || showCopyToCurrentYearAlert) &&
              <Popover placement="bottom" overlayClassName="work-popover menu-item-custom dots-menu" content={content} trigger="click" style={{marginRight:'-10px',cursor: 'pointer'}}>
                <div className="dot-position" onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                  <MoreOutlined className="menu-wr" style={{marginTop:'3px', width:'3px', cursor: 'pointer'}}>
                  <defs>
                    <clipPath id="clip-path" style={{cursor: 'pointer'}}>
                      <path id="Trazado_296" data-name="Trazado 296" d="M1.5-3A1.5,1.5,0,0,1,3-1.5,1.5,1.5,0,0,1,1.5,0,1.5,1.5,0,0,1,0-1.5,1.5,1.5,0,0,1,1.5-3Zm0-5A1.5,1.5,0,0,1,3-6.5,1.5,1.5,0,0,1,1.5-5,1.5,1.5,0,0,1,0-6.5,1.5,1.5,0,0,1,1.5-8Zm0-5A1.5,1.5,0,0,1,3-11.5,1.5,1.5,0,0,1,1.5-10,1.5,1.5,0,0,1,0-11.5,1.5,1.5,0,0,1,1.5-13Z" fill="none" clipRule="evenodd"/>
                    </clipPath>
                  </defs>
                  <g id="Grupo_290" data-name="Grupo 290" transform="translate(0 13)">
                    <g id="Grupo_289" data-name="Grupo 289" clipPath="url(#clip-path)">
                      <path id="Trazado_295" data-name="Trazado 295" d="M-5-18H8V5H-5Z" fill={isHovered ? '#0F232C' : 'rgba(36,24,98,0.2)'}/>
                    </g>
                  </g>
                </MoreOutlined>
                </div>
              </Popover>
            }
          </div>
          
        </div>
      
    </div>
    </>
  )

}

export default TrelloLikeCard;
