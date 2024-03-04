import React, { useState, useEffect } from "react";
import { Button, Dropdown, Popover } from 'antd';
import { HeartFilled, HeartOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import { ACQUISITION_POPUP, CAPITAL_POPUP, CONTENT_POPUP_ACQUISITION, CONTENT_POPUP_CAPITAL, CONTENT_POPUP_MAINTENANCE, CONTENT_POPUP_MINOR_REPAIR, CONTENT_POPUP_RESTORATION, CONTENT_POPUP_ROUNTINE_TRASH, CONTENT_POPUP_R_D, CONTENT_POPUP_SEDIMENT_REMOVAL, CONTENT_POPUP_STUDY, CONTENT_POPUP_VEGETATION_MANAGEMENT, MAINTENANCE_POPUP, MINOR_REPAIR_POPUP, RESTORATION_POPUP, ROUNTINE_TRASH_POPUP, R_D_POPUP, SEDIMENT_REMOVAL_POPUP, STUDY_POPUP, VEGETATION_MANAGEMENT_POPUP } from "../Constants/Constants";
import { useProjectState } from "hook/projectHook";

interface HeaderProps {
  nameProject: string;
  onChange: any;
  favorite: any;
  setFavorite: any;
  menuTypeProjects: any;
  locationData: any;
  selectedType: any;
  isEdit: boolean;
}

export const Header = ({ 
  nameProject, 
  onChange, 
  favorite, 
  setFavorite, 
  menuTypeProjects, 
  locationData, 
  selectedType,
  isEdit 
  }: HeaderProps) => {
  const [openDropdownTypeProject, setOpenDropdownTypeProject] = useState(false);
  const lengthName = nameProject.length;
  const {
    disableFieldsForLG,
  } = useProjectState();

  let content;
  switch (selectedType) {
    case CAPITAL_POPUP:
      content = CONTENT_POPUP_CAPITAL;
      break;
      case ROUNTINE_TRASH_POPUP:
      content = CONTENT_POPUP_ROUNTINE_TRASH;
      break;
    case VEGETATION_MANAGEMENT_POPUP:
      content = CONTENT_POPUP_VEGETATION_MANAGEMENT;
      break;
    case SEDIMENT_REMOVAL_POPUP:
      content = CONTENT_POPUP_SEDIMENT_REMOVAL;
      break;
    case MINOR_REPAIR_POPUP:
      content = CONTENT_POPUP_MINOR_REPAIR;
      break;
    case RESTORATION_POPUP:
      content = CONTENT_POPUP_RESTORATION;
      break;
    case MAINTENANCE_POPUP:
      content = CONTENT_POPUP_MAINTENANCE;
      break;
    case R_D_POPUP:
      content = CONTENT_POPUP_R_D;
      break;
    case STUDY_POPUP:
      content = CONTENT_POPUP_STUDY;
      break;
    case ACQUISITION_POPUP:
      content = CONTENT_POPUP_ACQUISITION;
      break;
    case ROUNTINE_TRASH_POPUP:
      content = CONTENT_POPUP_ROUNTINE_TRASH;
      break;
    case VEGETATION_MANAGEMENT_POPUP:
      content = CONTENT_POPUP_VEGETATION_MANAGEMENT;
      break;
    case SEDIMENT_REMOVAL_POPUP:
      content = CONTENT_POPUP_SEDIMENT_REMOVAL;
      break;
    case MINOR_REPAIR_POPUP:
      content = CONTENT_POPUP_MINOR_REPAIR;
      break;
    case RESTORATION_POPUP:
      content = CONTENT_POPUP_RESTORATION;
      break;
    default:
      content = CONTENT_POPUP_MAINTENANCE;
  }
  
  return (
    <div className="head-project">
      <div className='project-title'>
        <div className='project-name-icons'>
            <textarea
              className="project-name"
              value={nameProject}
              onChange={onChange}
              style={{
                height: lengthName > 259 ? 'unset' : '34px'
              }}
              disabled={disableFieldsForLG}
              // cols={
              //   isEdit
              //   ? (lengthName> 33 ? 33 : lengthName )
              //   : (
              //     selectedType === CAPITAL_POPUP || selectedType === R_D_POPUP || selectedType === STUDY_POPUP || selectedType === ACQUISITION_POPUP 
              //     ? (lengthName> 27 ? 27: lengthName)
              //     :(lengthName> 22 ? 22: lengthName)
              //   )
              // } 
            />
            {/* {Icons Favorite and Send } */}
            {/* <div className='ico-title'>
              <Button className={favorite ? "btn-transparent" : "btn-transparent"} onClick={() => { setFavorite(!favorite) }}>
                {favorite ? <HeartFilled className='heart'/>:<HeartOutlined className='ico-heart'/>}
              </Button>
              <img src="/Icons/ic_send_purple.svg" alt="" height="16px"></img>
            </div> */}
        </div>
        <p className='project-sub-name'>{locationData}</p>
      </div>
      <div className='project-type'>
        {isEdit?<p>{selectedType === 'Special'? 'R&D':selectedType }</p>
        :<Dropdown overlay={menuTypeProjects} trigger={['click']} overlayClassName="drop-menu-type-project" placement="bottomRight" onVisibleChange={() => { setOpenDropdownTypeProject(!openDropdownTypeProject) }}>
          <div className="drop-espace">
            <a onClick={e => e.preventDefault()} style={{ marginLeft: '2%', display: 'flex', alignItems: 'center' }}>
              {<p>{selectedType}</p>} &nbsp;
              {openDropdownTypeProject ? <UpOutlined style={{ color: '#251863', fontSize: '14px' }} /> : <DownOutlined style={{ color: '#251863', fontSize: '14px' }} />}
            </a>
          </div>
        </Dropdown>}
        <Popover content={content} overlayClassName="popover-no-arrow project-popover">
          <img className="hh-img" src="/Icons/project/question.svg" alt="" height="18px" />
        </Popover>
      </div>
    </div>
  );
};