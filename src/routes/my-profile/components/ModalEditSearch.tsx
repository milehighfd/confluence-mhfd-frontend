import { Button, Col, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { NewProjectsFilter } from '../../../Components/FiltersProject/NewProjectsFilter/NewProjectsFilter';

const ModalEditSearch = ({visible, setVisible}: {visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <Modal
      className="detailed-version"
      style={{ top: 60, width: '532px' }}
      visible={visible}
      onCancel={() => setVisible(false)}
      forceRender={false}
      destroyOnClose>
      <div className="detailed">
        <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor:'white'}}>
          <Col xs={{ span: 12 }} lg={{ span: 13 }}>
            <h1 style={{marginTop: '15px'}}>Edit Saved Search
            </h1>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 11 }} style={{textAlign: 'end'}}>
            <Button className="btn-transparent" onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
          </Col>
        </Row>
        <div style={{margin:'0px'}} className="line-01"></div>
        <Row className="detailed-h" gutter={[16, 16]} style={{backgroundColor: 'white'}}>
          <Col xs={{ span: 12 }} lg={{ span: 24}}>
          <NewProjectsFilter />
          <div style={{textAlign:'end'}} className="button-footer-modal">
            <Button className='btn-purple'>Update Saved Search</Button>
          </div>
          </Col>
        </Row>
      </div>
    </Modal>
  )
};

export default ModalEditSearch;
