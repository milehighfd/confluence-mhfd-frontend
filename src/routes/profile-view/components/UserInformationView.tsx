import React, { useState } from 'react';
import { Col, Button, Upload, message, Popover } from 'antd';
import { PROJECT_TYPES_AND_NAME } from '../constants/constants';
import ModalEditUserView from '../../../Components/Profile/ProfileComponents/ModalEditUserView';
import { useProfileDispatch, useProfileState } from '../../../hook/profileHook';
import { useMapState } from '../../../hook/mapHook';

const UserInformationView = ({
  setFilter
}: {
  setFilter: Function
}) => {
  const {
    updateUserInformation,
    getGroupOrganization,
    uploadImage,
    spinValue
  } = useProfileDispatch();
  const {
    userInformation: user,
    groupOrganization
  } = useProfileState();
  const {
    favoriteProjectCards: projects
  } = useMapState();

  const phone = (<div style={{fontSize: '12px'}}>{user.phone ? user.phone: '-'}</div>);
  const mail = (<div style={{fontSize: '12px'}}>{user.email ? user.email: '-'}</div>);
  const content = (<div className="popoveer-00">Number of Projects among your Favorites of each Project Type.</div>);

  const [ fileImage, setFileImage ] = useState({ uid: ''});
  const beforeUpload = (file: any) => {
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('Image must smaller than 5MB!');
    }
    return isLt2M;
  }

  const hideProfile = () => {
  }

  const typeProjects = PROJECT_TYPES_AND_NAME;
  return <> <Col xs={{ span: 24 }} lg={{ span: 12 }} className="profile-info">
    <div style={{ position: 'relative', minWidth: '135px', width: '135px', height: '120px' }}>
        {user.photo ? <img className="profile-img" src={user.photo} alt="" /> :
        <img className="profile-img" src="/Icons/icon-28.svg" alt="" style={{borderRadius: '50%'}}/> }
      <div className="profile-change">
        <Upload showUploadList={false} beforeUpload={beforeUpload} onChange={({ file }: any) => {
          if (fileImage.uid !== file.uid) {
            setFileImage({...file});
            spinValue(true);
            uploadImage([{ ...file }]);
          }
        }} >
          <Button type="default" shape="circle" className="btn-edit-00">
            <img src="/Icons/icon-66.svg" alt="" style={{marginTop: '-4px'}}/>
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
        <Popover content={phone} >
          <Button type="default" shape="circle">
            <a href={'tel:'+user.phone}><img src="/Icons/icon-65.svg" alt="" height="15px" /></a>
          </Button>
        </Popover>
        <Popover content={mail}>
          <Button type="default" shape="circle">
            <a href={'mailto:'+user.email}>
              <img src="/Icons/icon-64.svg" alt="" height="15px" />
            </a>
          </Button>
        </Popover>
      </div>
    </div>
  </Col>
    <Col xs={{ span: 24 }} lg={{ span: 12 }} className="profile-project">
      <div className="profile-table" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
        <div className="cursor-pointer-span" onClick={() => {
            setFilter('');
          }}>
          <span className="text-profile-projects" >
            {projects.length? projects.length: 0}
          </span> <span className="span-text" style={{ paddingRight: "8px" }}> Total Projects </span>
          <label>|</label>
        </div>
        {typeProjects.map((element: { name: string, id: string }, index: number) => {
          return <div className="cursor-pointer-span" key={index} onClick={() => {
            setFilter(element.id);
          }}>
            <span className="text-profile-projects" >
              {projects.filter((project: any) => project.projecttype === element.id).length}
            </span>
            <span className="span-text" style={{ paddingRight: "8px" }}>
              {element.name}
            </span>
            <label>|</label>
          </div>
        })}
        <Popover content={content} placement="left"><div className="mobile-display" style={{height:'20px'}}><img src="/Icons/icon-19.svg" alt="" style={{marginTop:'-3px', cursor: 'pointer'}} /></div></Popover>
      </div>
      <ModalEditUserView updateUserInformation={updateUserInformation} user={user} isVisible={false}
        hideProfile={hideProfile} groupOrganization={groupOrganization} getGroupOrganization={getGroupOrganization} />
    </Col>
  </>
}

export default UserInformationView;
