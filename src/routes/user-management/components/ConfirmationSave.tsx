import React from 'react';
import { Button, Col, Modal, Row} from 'antd';

const ConfirmationSave = ({ visible, setVisible }: {  visible: boolean , setVisible: Function }) => {
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <Modal
      className="detailed-version detailed-upload-save"
      style={{ top: 'calc(50vh - 100px)' }}
      visible={visible}
      onCancel={handleCancel}
      forceRender={false}
      destroyOnClose>
      <div className="detailed">
        <Row className="detailed-h" gutter={[16, 8]}>
          <Col xs={{ span: 12 }} lg={{ span: 21 }}>
            <h1 style={{marginTop: '15px'}}>Your entry has been successfully saved!
            </h1>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 3 }} style={{textAlign: 'end'}}>
            <Button className="btn-transparent" onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
          </Col>
        </Row>
      </div>
    </Modal>
  )
};

export default ConfirmationSave;