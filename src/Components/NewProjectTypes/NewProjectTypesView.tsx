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
                  <div><Button>Capital</Button></div>
                  <div><Button>Maintenance</Button></div>
                  <div><Button>Study</Button></div>
                  <div><Button>Acquisition</Button></div>
                  <div><Button>Special</Button></div>
                </div>
              </Row>
          </Layout>
      </Layout>
    </Layout>
     </>
}