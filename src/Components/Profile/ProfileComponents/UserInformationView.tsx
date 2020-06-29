import React, { useState } from 'react';
import { Col, Button, Upload, Spin, message, Popover } from 'antd';
import { User, ProjectName } from '../../../Classes/TypeList';
import { PROJECT_TYPES_AND_NAME } from '../../../constants/constants';
import ModalEditUserView from './ModalEditUserView';

const phone = (<div style={{fontSize: '12px'}}>(PHONE NUMBER) FROM EDIT PROFILE</div>);
const mail = (<div style={{fontSize: '12px'}}>(EMAIL) FROM EDIT PROFILE</div>);
const county = (<div style={{fontSize: '12px'}}>(CITY), (COUNTY) FROM EDIT PROFILE</div>);
const tag = (<div className="popoveer-00">Tags help to identify your area of interest. Add or remove tags to help focus your default content.</div>);
const content = (<div className="popoveer-00">Number of Projects within the Area of Interest, as defined by the "Default Map Zoom Area" in the "Edit Profile" section</div>);

export default ({ user, countProjects, uploadImage, spinImage, spinValue, updateUserInformation }: { user: User, countProjects: ProjectName[], uploadImage: Function,  spinImage: boolean, spinValue: Function, updateUserInformation : Function}) => {

  const dummyRequest = ({ onSuccess }: { onSuccess: Function }) => {
    setTimeout(() => onSuccess("ok"), 0);
  }
  const [ fileImage, setFileImage ] = useState({ uid: ''});
  let total = 0;
  countProjects.forEach(element => {
    total += element.count
  });
  const beforeUpload = (file: any) => {
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('Image must smaller than 5MB!');
    }
    return isLt2M;
  }
  const typeProjects = PROJECT_TYPES_AND_NAME;
  return <> <Col span={12} className="profile-info">
    <div style={{ position: 'relative', minWidth: '135px', width: '135px', height: '120px' }}>
      <Spin spinning={spinImage} delay={500}>
        {user.photo ? <img className="profile-img" src={user.photo} alt="" /> :
        <img className="profile-img" src="/Icons/icon-28.svg" alt="" />}
      </Spin>
      <div className="profile-change">
        <Upload showUploadList={false} beforeUpload={beforeUpload} customRequest={dummyRequest} onChange={({ file }: any) => {
          if (fileImage.uid !== file.uid) {
            setFileImage({...file});
            spinValue(true);
            uploadImage([{ ...file }]);
          }
        }} >
          <Button type="default" shape="circle" className="btn-edit-00">
            <img src="/Icons/icon-66.svg" alt="" />
          </Button>
        </Upload>
      </div>
    </div>
    <div className="profile-dat">
      <div className="profile-name">
        <h3>{user.name}</h3>
      <span>{user.title ? user.title: ''}</span>
      </div>
      <div className="profile-contact">
        <Popover content={phone}>
          <Button type="default" shape="circle">
            <img src="/Icons/icon-65.svg" alt="" height="15px" />
          </Button>
        </Popover>
        <Popover content={mail}>
          <Button type="default" shape="circle">
            <img src="/Icons/icon-64.svg" alt="" height="15px" />
          </Button>
        </Popover>
        <Popover content={county}>
          <Button type="default" shape="circle">
            <img src="/Icons/icon-67.svg" alt="" height="15px" />
          </Button>
        </Popover>
      </div>
    </div>
    <div className="profile-prot">
      <Button>Aurora</Button>
      <Button>Westminster</Button>
      <Popover content={tag} placement="bottom">
        <Button className="add-tag"><img src="/Icons/icon-18.svg" alt="" height="18px" /> Add Tags</Button>
      </Popover>
    </div>
  </Col>
    <Col span={12} className="profile-project">
      <div className="profile-table" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
        <span className="text-profile-projects" >
          {total}
        </span> <span style={{ paddingRight: "8px" }}> Total Projects </span> |
        {typeProjects.map((element: { name: string, id: string }, index: number) => {
          return <span key={index}>
            <span className="text-profile-projects" >
              {countProjects.filter((project) => project._id === element.id)[0]?.count ? countProjects.filter((project) => project._id === element.id)[0].count : 0}
            </span>
            <span style={{ paddingRight: "8px" }}>
              {element.name}
            </span> {(typeProjects.length - 1) !== index ? '|' : ''}
          </span>
        })}
        <Popover content={content} placement="left"><img src="/Icons/icon-19.svg" alt="" style={{marginTop:'-3px', cursor: 'pointer'}} /></Popover>
      </div>
      <ModalEditUserView updateUserInformation={updateUserInformation} user={user} />
    </Col>
  </>
}
