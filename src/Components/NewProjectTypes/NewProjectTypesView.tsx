import React, { useState } from "react";
import { Layout, Row, Col, Form, Icon, Input, Button, } from 'antd';
import NavbarView from "../Navbar/NavbarContainer";
import SidebarView from "../Sidebar/SidebarContainer";
import { useLocation } from "react-router-dom";
const { Content } = Layout;


export default () => {

  const project = () => (
    <div className="btn-creation01">
      <div><Button>
        <img className="img-h" src="/Icons/icon-37.svg" alt="" />
        <img className="img-a" src="/Icons/icon-38.svg" alt="" />
        <span>Capital</span></Button></div>
      <div><Button onClick={() => {
        setCreate(maintenance);
      }}>
        <img className="img-h" src="/Icons/icon-39.svg" alt="" />
        <img className="img-a" src="/Icons/icon-40.svg" alt="" />
        <span>Maintenance</span></Button></div>
      <div><Button onClick={() => {
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
        <img className="img-h" src="/Icons/icon-37.svg" alt="" />
        <img className="img-a" src="/Icons/icon-38.svg" alt="" />
        <span>Debris Management</span></Button></div>
      <div><Button>
        <img className="img-h" src="/Icons/icon-39.svg" alt="" />
        <img className="img-a" src="/Icons/icon-40.svg" alt="" />
        <span>Vegetation Management</span></Button></div>
      <div><Button>
        <img className="img-h" src="/Icons/icon-41.svg" alt="" />
        <img className="img-a" src="/Icons/icon-42.svg" alt="" />
        <span>Sediment Removal</span></Button></div>
      <div><Button>
        <img className="img-h" src="/Icons/icon-43.svg" alt="" />
        <img className="img-a" src="/Icons/icon-44.svg" alt="" />
        <span>Minor Repairs</span></Button></div>
      <div><Button>
        <img className="img-h" src="/Icons/icon-45.svg" alt="" />
        <img className="img-a" src="/Icons/icon-46.svg" alt="" />
        <span>Restoration</span></Button></div>
    </div>
  );

  const study = () => (
    <div className="btn-creation01">
      <div><Button>
        <img className="img-h" src="/Icons/icon-37.svg" alt="" />
        <img className="img-a" src="/Icons/icon-38.svg" alt="" />
        <span>Master Plan Only</span></Button></div>
      <div><Button>
        <img className="img-h" src="/Icons/icon-39.svg" alt="" />
        <img className="img-a" src="/Icons/icon-40.svg" alt="" />
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
          <Row className="content-new01">
            <Col>
              <h1>Create a new project</h1>
            </Col>
            <Col>
              <Input size="large" style={{ width: '480px' }} placeholder="Name your project" onChange={(event) => {
                console.log(event.target.value);
              }}/>
            </Col>
            {create}
          </Row>
        </Layout>
      </Layout>
    </Layout>
  </>
}
