import { ArrowDownOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Popover, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { NewProjectsFilter } from '../../../Components/FiltersProject/NewProjectsFilter/NewProjectsFilter';

const ModalFields = ({visible, setVisible}: {visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <Modal
      className="detailed-version modal-fields"
      style={{ top: 123, width: '322px', height:'551px' }}
      visible={visible}
      onCancel={() => setVisible(false)}
      forceRender={false}
      destroyOnClose>
      <div className="detailed">
        <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor:'white'}}>
          <Col xs={{ span: 12 }} lg={{ span: 20 }}>
            <h1 style={{marginTop: '15px'}}>Choose which fields to view in your table:
            </h1>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 4 }} style={{textAlign: 'end'}}>
            <Button className="btn-transparent" onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
          </Col>
        </Row>
        <Row className="detailed-h" gutter={[16, 16]} style={{backgroundColor: 'white', paddingTop:'0px'}}>
          <Col xs={{ span: 12 }} lg={{ span: 24}}>
            <div>
              <h1 style={{fontSize:'16px'}}>Project Name<InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#b3aec9'}}/></h1>
            </div>
            <Row className="row-modal-list-view">
              <Col xs={{ span: 12 }} lg={{ span: 22}}>
                <p style={{marginBottom:'15px'}}>Status <Popover
                  content={
                    <div className='popoveer-00'>
                      <p> Problems related to existing flood or fluvial hazard to life and property.</p>
                    </div>
                  }
                >
                  <InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#b3aec9'}}/></Popover>
                </p>
                <p style={{marginBottom:'15px'}}>Estimated Cost <InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#b3aec9'}}/></p>
                <p style={{marginBottom:'15px'}}>Number of Components  <InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#b3aec9'}}/></p>
                <p style={{marginBottom:'15px'}}>MHFD Dollars Allocated <InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#b3aec9'}}/></p>
                <p style={{marginBottom:'15px'}}>Year Initiated <InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#b3aec9'}}/></p>
                <p style={{marginBottom:'15px'}}>Year Completed <InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#b3aec9'}}/></p>
                <p style={{marginBottom:'15px'}}>Service Area <InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#b3aec9'}}/></p>
                <p style={{marginBottom:'15px'}}>County <InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#b3aec9'}}/></p>
                <p style={{marginBottom:'15px'}}>Consultant <InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#b3aec9'}}/></p>
                <p style={{marginBottom:'15px'}}>Contractor <InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#b3aec9'}}/></p>
                <p style={{marginBottom:'15px'}}>Jurisdiction <InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#b3aec9'}}/></p>
                <p style={{marginBottom:'15px'}}>Local Government Manager <InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#b3aec9'}}/></p>
                <p style={{marginBottom:'15px'}}>Stream Name <InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#b3aec9'}}/></p>
                <p style={{marginBottom:'15px'}}>Work Plan Year <InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#b3aec9'}}/></p>
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 2}}>
                <Checkbox  style={{marginBottom:'15px'}}></Checkbox><br/>
                <Checkbox  style={{marginBottom:'15px'}}></Checkbox><br/>
                <Checkbox  style={{marginBottom:'15px'}}></Checkbox><br/>
                <Checkbox  style={{marginBottom:'15px'}}></Checkbox><br/>
                <Checkbox  style={{marginBottom:'15px'}}></Checkbox><br/>
                <Checkbox  style={{marginBottom:'15px'}}></Checkbox><br/>
                <Checkbox  style={{marginBottom:'15px'}}></Checkbox><br/>
                <Checkbox  style={{marginBottom:'15px'}}></Checkbox><br/>
                <Checkbox  style={{marginBottom:'15px'}}></Checkbox><br/>
                <Checkbox  style={{marginBottom:'15px'}}></Checkbox><br/>
                <Checkbox  style={{marginBottom:'15px'}}></Checkbox><br/>
                <Checkbox  style={{marginBottom:'15px'}}></Checkbox><br/>
                <Checkbox style={{marginBottom:'15px'}} ></Checkbox><br/>
                <Checkbox  style={{marginBottom:'15px'}}></Checkbox><br/>
              </Col>
            </Row>
            <div style={{textAlign:'end', paddingTop:'8px', paddingRight:'10px'}} >
              <Button style={{width:'50%', fontSize:'17.5px', opacity:'0.6', mixBlendMode: 'normal'}} className="btn-transparent">Clear</Button>
              <Button style={{width:'50%', height:'40px',fontSize:'17.5px'}} className='btn-purple'>Save</Button>
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  )
};

export default ModalFields;