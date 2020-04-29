import React from 'react';
import { Col, Button } from 'antd';
import { User, ProjectName } from '../../../Classes/TypeList';
import { PROJECT_TYPES_AND_NAME } from '../../../constants/constants';

export default ({user, countProjects} : {user: User, countProjects: ProjectName[]}) => {
  let total = 0;
  countProjects.forEach(element => {
    total += element.count
  })
  const typeProjects = PROJECT_TYPES_AND_NAME;
  return <> <Col span={13} className="profile-info">
    <div style={{ position: 'relative' }}><img className="profile-img" src="/Icons/icon-28.svg" alt="" />
      <div className="profile-change"><Button type="default" shape="circle" className="btn-edit-00"><img src="/Icons/icon-66.svg" alt="" /></Button></div>
    </div>
    <div className="profile-dat">
      <div className="profile-name">
        <h3>{user.name}</h3>
        <span>District Manager</span>
      </div>
      <div className="profile-contact">
        <Button type="default" shape="circle">
          <img src="/Icons/icon-65.svg" alt="" height="15px" />
        </Button>
        <Button type="default" shape="circle">
          <img src="/Icons/icon-64.svg" alt="" height="15px" />
        </Button>
        <Button type="default" shape="circle">
          <img src="/Icons/icon-67.svg" alt="" height="15px" />
        </Button>
      </div>
    </div>
    <div className="profile-prot">
      <Button>Aurora</Button>
      <Button>Westminster</Button>
    </div>
    <div>

    </div>
  </Col>
    <Col span={11} className="profile-project">
      <div className="profile-table" style={{paddingLeft: "0px", paddingRight: "0px"}}>
        <span className="text-profile-projects" >
          {total}
        </span> <span style={{paddingRight: "12px"}}> Total Projects </span> |
        {typeProjects.map((element: {name: string, id: string}, index: number) => {
          return <>
          <span className="text-profile-projects" >
            {countProjects.filter((project) => project._id === element.id)[0]?.count ? countProjects.filter((project) => project._id === element.id)[0].count : 0} 
          </span>
          <span style={{paddingRight: "12px"}}>
            {element.name} 
          </span> {(typeProjects.length - 1) !== index ? '|' : ''}</>
        })}
      </div>
    </Col>
  </>
}