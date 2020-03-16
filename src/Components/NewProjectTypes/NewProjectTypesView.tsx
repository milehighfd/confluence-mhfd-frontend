import React, { useState } from "react";
import { Layout, Row, Col, Form, Icon, Input, Button, } from 'antd';
import NavbarView from "../Shared/Navbar/NavbarContainer";
import SidebarView from "../Shared/Sidebar/SidebarContainer";
import { useLocation, Redirect } from "react-router-dom";
import ButtonProjectTypesView from "./ButtonProjectTypes/ButtonProjectTypesView";
import { buttonsNewProject } from "../../constants/constants"
// import 
const { Content } = Layout;


export default () => {
  const [arrow, setArrow] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [route, setRoute] = useState<string>('');
  const [nameProject, setNameProject] = useState<string>('');
  const [create, setCreate] = useState(buttonsNewProject);
  const [title, setTitle] = useState('new');

  if(redirect) {
    return <Redirect to={route + "/" + nameProject} />
  }
  return <>
    <Layout>
      <NavbarView></NavbarView>
      <Layout>
        <SidebarView></SidebarView>
        <Layout className="content-create">
        {(arrow) ? (<div className="back-around">
          <Button onClick={() => {
            setArrow(false);
            setCreate(buttonsNewProject);
            setTitle('new');
          }}><img src="/Icons/icon-07.svg" alt=""/><span>Back</span></Button>
        </div>) : ''}
          <Row className="content-new01">
            <Col>
              <h1>Create a {title} project</h1>
            </Col>
            <Col span={24}>
              <Input size="large" style={{ width: '480px' }} placeholder="Name your project" onChange={(event) => {
                setNameProject(event.target.value);
              }} />
            </Col>
            <div className="btn-creation01">
              {create.map( (itemButton: any) => {
                return <ButtonProjectTypesView
                  buttons={itemButton}
                  setNameProject={setNameProject}
                  setRedirect={setRedirect}
                  nameProject={nameProject}
                  setRoute={setRoute}
                  setArrow={setArrow}
                  setCreate={setCreate}
                  setTitle={setTitle} />
              })}
            </div>
          </Row>
        </Layout>
      </Layout>
    </Layout>
  </>
}
