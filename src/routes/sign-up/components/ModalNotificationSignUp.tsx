import React from 'react';
import { Button, Col, Modal, Row} from 'antd';

const ModalNotificationSignUp = ({ visible, setVisible, message }: {   visible: boolean, setVisible: any, message: string }) => {
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <Modal
      className="detailed-version detailed-upload-pre-signup"
      style={{ width: '34%' }}
      visible={visible}
      centered
      onCancel={handleCancel}
      forceRender={false}
      destroyOnClose>
      <div className="detailed">
        <Row className="detailed-h" gutter={[16, 8]}>
          <Col xs={{ span: 12 }} lg={{ span: 21 }}>
            <h1 style={{marginTop: '15px'}}>{message}
            </h1>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 3 }} style={{textAlign: 'end'}}>
            <Button className="btn-transparent" onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
          </Col>
        </Row>
        <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white'}}>
            <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{color: '#11093c', textAlign:'end'}}>
              <button className="btn-purple"  style={{width: '95%', height:'auto', padding: '6px'}} onClick={()=>{setVisible(false)}}>CONTINUE</button>
            </Col>
        </Row>
      </div>
    </Modal>
  )
};

export default ModalNotificationSignUp;