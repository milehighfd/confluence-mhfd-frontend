import React from "react";
import { Button, Col, Modal, Row } from 'antd';

export const DeleteAlert = ({ visibleAlert, setVisibleAlert, action, name }: {
  visibleAlert: boolean,
  setVisibleAlert: Function,
  action: Function,
  name: string
}) => {
  const handleOk = (e: any) => {
    setVisibleAlert(false);
    action();
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
          <Col xs={{ span: 12 }} lg={{ span: 13 }}>
            <h1 style={{marginTop: '15px'}}>Confirm Project Deletion
            </h1>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 11 }} style={{textAlign: 'end'}}>
            <Button className="btn-transparent" onClick={() => setVisibleAlert (false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
          </Col>
        </Row>
        <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white'}}>
          <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
            <p style={{color: '#11093c', fontWeight: '500', paddingBottom: '10px'}}>Please confirm that the project will be deleted. This includes all cards of the same project located across various years.</p>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{color: '#11093c'}}>
                {/* <h2>Saving will create a draft project within {sponsor}'s Work Request. Do you want to continue?</h2> */}
                <button className="btn-borde" onClick={handleCancel} style={{width: '95%'}}>Cancel</button>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{color: '#11093c', textAlign:'end'}}>
                <button className="btn-purple"  style={{width: '95%'}} onClick={handleOk}><span>Delete</span></button>
              </Col>
          <Col>
    </Col>
    </Row>
    </Modal>
  )

};
