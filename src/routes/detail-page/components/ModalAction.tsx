import React from "react";
import { Avatar, Badge, Button, Carousel, Checkbox, Col, Dropdown, Menu, Modal, Progress, Row, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import DetailInformationProject from "./DetailInformationProject";
import ComponentSolucions from "./ComponentSolucions";
import Roadmap from "./Roadmap";
import Financials from "./Financials";
import Management from "./Management";
import Map from "./Map";
import Documents from "./Documents";
import { BarsOutlined, CheckOutlined, CheckSquareOutlined, ClockCircleOutlined, CloseCircleFilled, FileOutlined, FlagOutlined, MenuOutlined, PaperClipOutlined, PlusOutlined, TagOutlined, TeamOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";

const ModalAction = ({visible, setVisible}:{visible: boolean, setVisible: Function}) => {
  const menu = (
    <Menu
      className="card-dropdown"
      items={[
        {
          key: '1',
          type: 'group',
          label: 'People',
          children: [
            {
              key: '1-1',
              label: <>
                <img src="/picture/user.png" height={30} width="30" style={{marginRight:'5px'}}/>
                <span style={{fontSize:'14px'}}>Dan Hill </span>
              </>,
            },
            {
              key: '1-2',
              label: <>
                <img src="/picture/user01.png"height={30} width="30" style={{marginRight:'5px'}}/>
                <span style={{fontSize:'14px'}}>Jane Smith </span>
              </>,
            },
            {
              key: '1-3',
              label: <>
                <img src="/picture/user02.png"height={30} width="30" style={{marginRight:'5px'}}/>
                <span style={{fontSize:'14px'}}>Robert Croquette  </span>
              </>,
            },
          ],
        },
      ]}
    />
  );
  return (
    <Modal
      className="action-modal"
      style={{ top: 30, width:'760px' }}
      visible={visible}
      onCancel={() => setVisible(false)}
      forceRender={false}
      destroyOnClose>
      <div className="detailed" style={{ width:'100%' }}>
        <Row className="detailed-h" gutter={[16, 8]} style={{background:'#f8f8fa'}}>
          <Col xs={{ span: 24 }} lg={{ span: 21 }}>
            <div className="header-detail">
              <h1 style={{marginTop:'10px'}}>Action Item 1: Schedule Kickoff Meeting</h1>
              </div>
          </Col>
          <Col xs={{ span: 4 }} lg={{ span: 3 }}style={{ textAlign: 'right' }}>
            <Tooltip title="Close Window">
              <Button className="btn-transparent mobile-display" onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
            </Tooltip>
          </Col>
        </Row>
        <div className="body-action">
          <Row className="action-body">
            <Col xs={{ span: 24 }} lg={{ span: 6 }}>
              <p><ClockCircleOutlined />&nbsp; Due Date</p>
            </Col>
            <Col xs={{ span: 4 }} lg={{ span: 18 }}>
              <p>April 26, 2022</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 6 }}>
              <p><TeamOutlined />&nbsp; Assignee</p>
            </Col>
            <Col xs={{ span: 4 }} lg={{ span: 18 }}>
              <div style={{display:'flex'}}>
                <img src="/picture/user.png" height={24} width="24" /><p style={{margin:'0px 8px'}}>Dan Hill </p>
                <img src="/picture/user01.png"height={24} width="24" /><p style={{margin:'0px 8px'}}>Jane Smith </p>
                <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                  <PlusOutlined  style={{fontSize:'18px'}}/>
                </Dropdown>
              </div>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 6 }}>
              <p><TagOutlined style={{WebkitTransform: 'rotate(-90deg)'}}/>&nbsp;Status </p>
            </Col>
            <Col xs={{ span: 4 }} lg={{ span: 18 }}>
              <span className="tag-yellow">In Progress</span>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 6 }}>
              <p><FlagOutlined />&nbsp; Priority</p>
            </Col>
            <Col xs={{ span: 4 }} lg={{ span: 18 }}>
              <span className="tag-red">Very High</span>
            </Col>
          

          </Row>
          <Row className="action-body" style={{paddingTop:'0px'}}>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <p style={{fontWeight:'700'}}><MenuOutlined />&nbsp; Description</p>
              <TextArea rows={3} placeholder="Add a more detailed description..." maxLength={4} className="text-action"/>
            </Col>
          </Row>
          <Row className="action-body" style={{paddingTop:'0px'}}>
            <Col xs={{ span: 24 }} lg={{ span: 16 }}>
              <p style={{fontWeight:'700'}}><CheckSquareOutlined />&nbsp; Checklist</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{textAlign:'end'}}>
              <Button style={{color:'Delete', border:'1px solid #F1F0F3'}}>Delete</Button>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{paddingLeft:'20px'}}>
              <Progress percent={0} style={{color:'#11093C', marginBottom:'10px'}}/>
              <Checkbox style={{marginBottom:'10px'}}><Badge dot><Avatar size={24} style={{backgroundColor:'#4961F6', fontSize:'16px'}}>RS</Avatar></Badge>&nbsp; This is my first task</Checkbox><br/>
              <Checkbox style={{marginBottom:'10px'}}><Badge dot><Avatar size={24} style={{backgroundColor:'#4961F6', fontSize:'16px'}}>RS</Avatar></Badge>&nbsp; This is my first task</Checkbox><br/>
              <div className="content-progress">
                <div>
                  <CheckOutlined />&nbsp; <span style={{opacity:'0.5'}}>Add new task</span>
                </div>
                <div>
                  <Badge dot><Avatar size={24} style={{backgroundColor:'#4961F6', fontSize:'16px'}}>RS</Avatar></Badge>
                  <Button className="btn-purple" style={{height:'28px', marginLeft:'10px'}}>Save</Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="action-body" style={{paddingTop:'0px'}}>
            <Col xs={{ span: 24 }} lg={{ span: 16 }}>
              <p style={{fontWeight:'700'}}><BarsOutlined />&nbsp; Activity</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{paddingLeft:'25px', marginBottom:'10px'}}>
              <Badge dot className="badge-inactive"><Avatar size={24} src="/picture/user01.png" /></Badge><span className="title" style={{marginLeft:'10px'}}>Jane Smith</span><span className="title" style={{opacity:'0.5'}}>&nbsp; &#8226; &nbsp; 6 min ago</span> 
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 18 }} style={{paddingLeft:'25px'}}>
              <span className="title" style={{opacity:'0.5'}}>Hi Dan! Could you take quick look at these Landing Page designs?
              Thanks so much!</span> 
            </Col>
            <br></br>
            <br></br>
            <br></br>
            <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{paddingLeft:'20px', textAlign:'end'}}>
              <Button style={{padding:'3px 5px'}}>Hide Details</Button>
            </Col>
            <br></br>
            <br></br>
            <br></br>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <TextArea rows={3} placeholder="Comment or type ‘/’ for commands" maxLength={200} className="text-action"/>
              <div className="button-tex-area">
                <Button className="btn-purple">Comment</Button>
              </div>
            </Col>
          </Row>
          <Row className="action-body" style={{paddingTop:'0px'}}>
            <Col xs={{ span: 24 }} lg={{ span: 16 }}>
              <p style={{fontWeight:'700'}}><PaperClipOutlined style={{display:'contents'}}/>&nbsp; Related Documents</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{paddingLeft:'25px'}}>
              <span style={{color:'#251863', marginRight:'10px'}}><FileOutlined style={{opacity:' 0.35'}}/>&nbsp;8.13.22-tollgate-creek-crm.xlsx&nbsp;<CloseCircleFilled style={{opacity:' 0.15'}}/></span>
              <span style={{color:'#251863', marginRight:'10px'}}><FileOutlined style={{opacity:' 0.35'}}/>&nbsp;8.13.22-tollgate-creek-crm.xlsx&nbsp;<CloseCircleFilled style={{opacity:' 0.15'}}/></span>
            </Col>
          </Row>
        </div>
        
      </div>
    </Modal>
  )
}

export default ModalAction;