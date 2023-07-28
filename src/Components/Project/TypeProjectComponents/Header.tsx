import React, { useState, useEffect } from "react";
import { Button, Dropdown, Popover } from 'antd';
import { HeartFilled, HeartOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import { ACQUISITION_POPUP, CAPITAL_POPUP, CONTENT_POPUP_ACQUISITION, CONTENT_POPUP_CAPITAL, CONTENT_POPUP_MAINTENANCE, CONTENT_POPUP_R_D, CONTENT_POPUP_STUDY, MAINTENANCE_POPUP, R_D_POPUP, STUDY_POPUP } from "../Constants/Constants";

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

  let content;
  switch (selectedType) {
    case CAPITAL_POPUP:
      content = CONTENT_POPUP_CAPITAL;
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
    default:
      content = CONTENT_POPUP_CAPITAL;
  }

  return (
    <div className="head-project">
      <div className='project-title'>
        <label data-value={nameProject} style={{ width: '100%' }}>
          <div className='project-name-icons'>
            <textarea className="project-name" value={nameProject} onChange={onChange} style={{
              height: lengthName > 259 ? 'unset' : '34px'
            }} />
            <div className='ico-title'>
              <Button className={favorite ? "btn-transparent" : "btn-transparent"} onClick={() => { setFavorite(!favorite) }}>
                {favorite ? <HeartFilled className='heart'/>:<HeartOutlined className='ico-heart'/>}
              </Button>
              <img src="/Icons/ic_send_purple.svg" alt="" height="16px"></img>
            </div>
          </div>
          <p className='project-sub-name'>{locationData}</p>
        </label>
      </div>
      <div className='project-type'>
        {isEdit?<p>{selectedType}</p>:<Dropdown overlay={menuTypeProjects} trigger={['click']} overlayClassName="drop-menu-type-project" placement="bottomRight" onVisibleChange={() => { setOpenDropdownTypeProject(!openDropdownTypeProject) }}>
          <div className="drop-espace">
            <a onClick={e => e.preventDefault()} style={{ marginLeft: '2%', display: 'flex', alignItems: 'center' }}>
              {<p>{selectedType}</p>} &nbsp;
              {openDropdownTypeProject ? <UpOutlined style={{ color: '#251863', fontSize: '14px' }} /> : <DownOutlined style={{ color: '#251863', fontSize: '14px' }} />}
            </a>
          </div>
        </Dropdown>}
        <Popover content={content}>
          <img className="hh-img" src="/Icons/project/question.svg" alt="" height="18px" />
        </Popover>
      </div>
    </div>
  );
};