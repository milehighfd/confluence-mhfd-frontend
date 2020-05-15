import React, { useState } from 'react';
import { Col, Button, Upload, Spin, message, Modal, Row, Input, Dropdown, Menu } from 'antd';
import { User, ProjectName } from '../../../Classes/TypeList';
import { PROJECT_TYPES_AND_NAME } from '../../../constants/constants';

const menu = (
  <Menu className="js-mm-00">
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

export default ({ user, countProjects, uploadImage, spinImage, spinValue }: { user: User, countProjects: ProjectName[], uploadImage: Function,  spinImage: boolean, spinValue: Function }) => {
  const stateValue = {
    visible: false
  }
  const [state, setState] = useState(stateValue);
  const showModal = () => {
    const auxState = {...state};
    auxState.visible = true;
    setState(auxState);
  };

  const handleOk = (e: any) => {
    console.log(e);
    const auxState = {...state};
    auxState.visible = false;
    setState(auxState);
  };

  const handleCancel = (e: any) => {
    console.log(e);
    const auxState = {...state};
    auxState.visible = false;
    setState(auxState);
  };

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
    <div style={{ position: 'relative' }}>
      <Spin spinning={spinImage} delay={500}>
        {user.photo ? <img className="profile-img" src={user.photo} alt="" /> :
        <img className="profile-img" src="/Icons/icon-28.svg" alt="" />}
      </Spin>
      <div className="profile-change">
        <Upload showUploadList={false} beforeUpload={beforeUpload} customRequest={dummyRequest} onChange={({ file }: any) => {
          if (fileImage.uid !== file.uid) {
            setFileImage({...file});
            spinValue(true);
            console.log('eta entrando aunque no quieras');

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
      <Button className="add-tag"><img src="/Icons/icon-18.svg" alt="" height="18px" /> Add Tags</Button>
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
      </div>
      <div className="edit-profile">
        <Button  onClick={showModal}>
          <img src="/Icons/icon-72.svg" alt="" height="18px" /> Edit Profile
         </Button>
         <Modal
           centered
           visible={state.visible}
           onOk={handleOk}
           onCancel={handleCancel}
           className="modal-edit"
           width="700px"
         >

         <h4>Edit Profile</h4>
         <div className="gutter-example">
            <h6>PERSONAL INFO</h6>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}><Input placeholder="First Name" /></Col>
              <Col className="gutter-row" span={12}><Input placeholder="Last Name" /></Col>
            </Row>
            <br></br>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}><Input placeholder="Email" /></Col>
              <Col className="gutter-row" span={12}><Input placeholder="Phone" /></Col>
            </Row>
          </div>

          <hr></hr>

          <div className="gutter-example">
             <h6>USER DESIGNATION</h6>
             <Row gutter={16}>
               <Col className="gutter-row" span={12}><Input placeholder="Account Type" disabled /></Col>
               <Col className="gutter-row" span={12}>
               <Dropdown overlay={menu}>
                 <Button>
                   Organization <img src="icons/icon-12.svg" alt=""/>
                 </Button>
               </Dropdown>
               </Col>
             </Row>
             <br></br>
             <Row gutter={16}>
               <Col className="gutter-row" span={12}><Input placeholder="Title" /></Col>
               <Col className="gutter-row" span={12}><Input placeholder="Zip Code" /></Col>
             </Row>
           </div>

          <hr></hr>

          <div className="gutter-example">
            <h6>Areas of Interest</h6>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <Dropdown overlay={menu}>
                  <Button>
                    City <img src="icons/icon-12.svg" alt=""/>
                  </Button>
                </Dropdown>
              </Col>

              <Col className="gutter-row" span={12}>
                <Dropdown overlay={menu}>
                  <Button>
                    Contry <img src="icons/icon-12.svg" alt=""/>
                  </Button>
                </Dropdown>
              </Col>
            </Row>
            <br></br>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
              <Dropdown overlay={menu}>
                <Button>
                  Service Area <img src="icons/icon-12.svg" alt=""/>
                </Button>
              </Dropdown>
              </Col>
            </Row>
          </div>
          <br></br>
          <div className="gutter-example" style={{textAlign: 'center'}}>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
               <Button className="cancel">Cancel</Button>
                <Button className="save">Save</Button>
              </Col>
            </Row>
          </div>
         </Modal>
      </div>
    </Col>
  </>
}
