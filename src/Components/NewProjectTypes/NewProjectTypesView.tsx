import React, { useState } from "react";
import { Layout, Row, Col, Form, Icon, Input, Button, } from 'antd';
import NavbarView from "../Navbar/NavbarContainer";
import SidebarView from "../Sidebar/SidebarContainer";
import { useLocation } from "react-router-dom";
const { Content } = Layout;


export default () => {
  const [arrow, setArrow] = useState<boolean>(false);
  const project = () => (
    <div className="btn-creation01">
      <div><Button>
        <img className="img-h" src="/Icons/icon-37.svg" alt="" />
        <img className="img-a" src="/Icons/icon-38.svg" alt="" />
        <span>Capital</span></Button></div>
      <div><Button onClick={() => {
        setArrow(true);
        setCreate(maintenance);
      }}>
        <img className="img-h" src="/Icons/icon-39.svg" alt="" />
        <img className="img-a" src="/Icons/icon-40.svg" alt="" />
        <span>Maintenance</span></Button></div>
      <div><Button onClick={() => {
        setArrow(true);
        setCreate(study);
      }}>
        <img className="img-h" src="/Icons/icon-41.svg" alt="" />
        <img className="img-a" src="/Icons/icon-42.svg" alt="" />
        <span>Study</span></Button></div>
      <div><Button>
        <img className="img-h" src="/Icons/icon-43.svg" alt="" />
        <img className="img-a" src="/Icons/icon-44.svg" alt="" />
        <span>Acquisition</span></Button></div>
      <div><Button>
        <img className="img-h" src="/Icons/icon-45.svg" alt="" />
        <img className="img-a" src="/Icons/icon-46.svg" alt="" />
        <span>Special</span></Button></div>
    </div>
  );
  const maintenance = () => (
    <div className="btn-creation01">
      <div><Button>
        <img className="img-h" src="/Icons/icon-47.svg" alt="" />
        <img className="img-a" src="/Icons/icon-48.svg" alt="" />
        <span>Debris Management</span></Button></div>
      <div><Button>
        <img className="img-h" src="/Icons/icon-49.svg" alt="" />
        <img className="img-a" src="/Icons/icon-50.svg" alt="" />
        <span>Vegetation Management</span></Button></div>
      <div><Button>
        <img className="img-h" src="/Icons/icon-51.svg" alt="" />
        <img className="img-a" src="/Icons/icon-52.svg" alt="" />
        <span>Sediment Removal</span></Button></div>
      <div><Button>
        <img className="img-h" src="/Icons/icon-53.svg" alt="" />
        <img className="img-a" src="/Icons/icon-54.svg" alt="" />
        <span>Minor Repairs</span></Button></div>
      <div><Button>
        <img className="img-h" src="/Icons/icon-55.svg" alt="" />
        <img className="img-a" src="/Icons/icon-56.svg" alt="" />
        <span>Restoration</span></Button></div>
    </div>
  );

  const study = () => (
    <div className="btn-creation01">
      <div><Button>
        <img className="img-h" src="/Icons/icon-57.svg" alt="" />
        <img className="img-a" src="/Icons/icon-68.svg" alt="" />
        <span>Master Plan Only</span></Button></div>
      <div><Button>
        <img className="img-h" src="/Icons/icon-58.svg" alt="" />
        <img className="img-a" src="/Icons/icon-59.svg" alt="" />
        <span>Fhad Only</span></Button></div>
    </div>
  );

  const [create, setCreate] = useState(project);
  return <>
    <Layout>
      <NavbarView></NavbarView>
      <Layout>
        <SidebarView></SidebarView>
        <Layout className="content-create">
        {(arrow) ? (<div className="back-around">
          <Button onClick={() => {
            setArrow(false);
            setCreate(project);
          }}><img src="/Icons/icon-07.svg" alt=""/><span>Back</span></Button>
        </div>) : ''}
          <Row className="content-new01">
            <Col>
              <h1>Create a new project</h1>
            </Col>
            <Col span={24}>
              <Input size="large" style={{ width: '480px' }} placeholder="Name your project" onChange={(event) => {
                console.log(event.target.value);
              }} />
            </Col>
            {create}
          </Row>
        </Layout>
      </Layout>
    </Layout>
  </>
}
