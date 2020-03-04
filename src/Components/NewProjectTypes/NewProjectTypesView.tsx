import React from "react";
import { Layout, Row, Col, Form, Icon, Input, Button,  } from 'antd';
import NavbarView from "../Navbar/NavbarContainer";
import SidebarView from "../Sidebar/SidebarContainer";

const {Content} =Layout;

export default () => {
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
                  <Input size="large" style={{ width: '693px' }} placeholder="Name your project"/>
                </Col>
                <div className="btn-creation01">
                  <div><Button>
                    <img className="img-h" src="/Icons/icon-37.svg" alt=""/>
                    <img className="img-a" src="/Icons/icon-38.svg" alt=""/>
                  <span>Capital</span></Button></div>
                  <div><Button>
                    <img className="img-h" src="/Icons/icon-39.svg" alt=""/>
                    <img className="img-a" src="/Icons/icon-40.svg" alt=""/>
                  <span>Maintenance</span></Button></div>
                  <div><Button>
                    <img className="img-h" src="/Icons/icon-41.svg" alt=""/>
                    <img className="img-a" src="/Icons/icon-42.svg" alt=""/>
                  <span>Study</span></Button></div>
                  <div><Button>
                    <img className="img-h" src="/Icons/icon-43.svg" alt=""/>
                    <img className="img-a" src="/Icons/icon-44.svg" alt=""/>
                  <span>Acquisition</span></Button></div>
                  <div><Button>
                    <img className="img-h" src="/Icons/icon-45.svg" alt=""/>
                    <img className="img-a" src="/Icons/icon-46.svg" alt=""/>
                  <span>Special</span></Button></div>
                </div>
              </Row>
          </Layout>
      </Layout>
    </Layout>
     </>
}