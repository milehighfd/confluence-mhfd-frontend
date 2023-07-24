import React, { useState, useEffect } from "react";
import { Button, Dropdown, Popover } from 'antd';
import { HeartFilled, HeartOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';

interface HeaderProps {
  nameProject: string;
  onChange: any;
  favorite: any;
  setFavorite: any;
  content: any;
  menuTypeProjects: any;
  locationData: any;
  selectedType: any;
}

export const Header = ({ nameProject, onChange, favorite, setFavorite, content, menuTypeProjects, locationData, selectedType }: HeaderProps) => {
  const [openDropdownTypeProject, setOpenDropdownTypeProject] = useState(false);
  const lengthName = nameProject.length;

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
                {favorite ? <HeartFilled className='heart' /> : <HeartOutlined />}
              </Button>
              <img src="/Icons/ic_send.svg" alt="" height="16px"></img>
            </div>
          </div>
          <p className='project-sub-name'>{locationData}</p>
        </label>
      </div>
      <div className='project-type'>
        <Dropdown overlay={menuTypeProjects} trigger={['click']} overlayClassName="drop-menu-type-project" placement="bottomRight" onVisibleChange={() => { setOpenDropdownTypeProject(!openDropdownTypeProject) }}>
          <div className="drop-espace">
            <a onClick={e => e.preventDefault()} style={{ marginLeft: '2%', display: 'flex', alignItems: 'baseline' }}>
              {<p>{selectedType}</p>} &nbsp;
              {openDropdownTypeProject ? <UpOutlined style={{ color: '#251863', fontSize: '14px' }} /> : <DownOutlined style={{ color: '#251863', fontSize: '14px' }} />}
            </a>
          </div>
        </Dropdown>
        <Popover content={content}>
          <img className="hh-img" src="/Icons/project/question.svg" alt="" height="18px" />
        </Popover>
      </div>
    </div>
  );
};