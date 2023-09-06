import React from "react";
import { Button, Col, Modal, Row } from 'antd';

export const ArchiveAlert = ({ 
  visibleAlert, 
  setVisibleAlert,
  setArchiveProjectAction 
}: {
  visibleAlert: boolean,
  setVisibleAlert: Function,
  setArchiveProjectAction: Function,
}) => {
  const handleOk = (e: any) => {
    setVisibleAlert(false);
    setArchiveProjectAction(true);
  };

  const handleCancel = (e: any) => {
    setVisibleAlert(false);
  };

  return (
    <Modal
      centered
      visible={visibleAlert}
      onOk={handleOk}
      onCancel={handleCancel}
      className="modal-confirm"
      width="400px"
    >
      <Row className="detailed-h" gutter={[16, 8]}>
        <Col xs={{ span: 12 }} lg={{ span: 18 }}>
          <h1 style={{marginTop: '15px'}}>
            Archive Project
          </h1>
        </Col>
        <Col xs={{ span: 12 }} lg={{ span: 6 }} style={{textAlign: 'end'}}>
          <Button className="btn-transparent" onClick={() => setVisibleAlert (false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
        </Col>
      </Row>
      <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white'}}>
        <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
          <p style={{color: '#11093c', fontWeight: '500', paddingBottom: '10px'}}>
            Are you sure you want to archive this project? This action cannot be undone.
          </p>
        </Col>
      </Row>
      <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white', paddingTop:'0px'}}>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 12 }}
          style={{ color: '#11093c', paddingLeft: 'none' }}
        >
          <button
            className="btn-borde"
            onClick={handleCancel}
            style={{ width: '95%' }}
          >
            Cancel
          </button>
        </Col>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 12 }}
          style={{ color: '#11093c', textAlign: 'end', paddingLeft: 'none' }}
        >
          <button
            className="btn-purple"
            style={{ width: '95%' }}
            onClick={handleOk}
          >
            <span>
              Archive
            </span>
          </button>
        </Col>
      </Row>
    </Modal>
  );
};
