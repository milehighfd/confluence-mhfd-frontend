import React from "react";
import { Button, Col, Modal, Row } from 'antd';

export const EmptyDatesAlert = ({ visibleAlert, setVisibleAlert }: {
  visibleAlert: boolean,
  setVisibleAlert: Function,
}) => {
  const handleOk = (e: any) => {
    setVisibleAlert(false);
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
            Empty Dates
          </h1>
        </Col>
        <Col xs={{ span: 12 }} lg={{ span: 6 }} style={{textAlign: 'end'}}>
          <Button className="btn-transparent" onClick={() => setVisibleAlert (false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
        </Col>
      </Row>
      <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white'}}>
        <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
          <p style={{color: '#11093c', fontWeight: '500', paddingBottom: '10px'}}>
            Please update your start and end dates, ensuring all dates are filled out.
          </p>
        </Col>
      </Row>
    </Modal>
  );
};