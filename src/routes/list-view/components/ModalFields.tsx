import { ArrowDownOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Row } from 'antd';
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
                <p style={{marginBottom:'15px'}}>Status </p>
                <p style={{marginBottom:'15px'}}>Estimated Cost <InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#b3aec9'}}/></p>
                <p style={{marginBottom:'15px'}}>Number of Components  </p>
                <p style={{marginBottom:'15px'}}>MHFD Dollars Allocated <InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#b3aec9'}}/></p>
                <p style={{marginBottom:'15px'}}>Year Initiated </p>
                <p style={{marginBottom:'15px'}}>Year Completed </p>
                <p style={{marginBottom:'15px'}}>Service Area </p>
                <p style={{marginBottom:'15px'}}>County </p>
                <p style={{marginBottom:'15px'}}>Consultant </p>
                <p style={{marginBottom:'15px'}}>Contractor </p>
                <p style={{marginBottom:'15px'}}>Jurisdiction </p>
                <p style={{marginBottom:'15px'}}>Local Government Manager </p>
                <p style={{marginBottom:'15px'}}>Stream Name </p>
                <p style={{marginBottom:'15px'}}>Work Plan Year </p>
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
            <div style={{textAlign:'end'}} className="button-footer-modal-field">
              <Button style={{width:'50%'}} className="btn-transparent">Clear</Button>
              <Button style={{width:'50%'}} className='btn-purple'>Save</Button>
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  )
};

export default ModalFields;