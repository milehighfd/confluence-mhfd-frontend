import React from 'react';
import { Button, Col, Modal, Row} from 'antd';

const Alert = ({ save, visible, setVisible, message }: { save: Function, visible: { visible: boolean }, setVisible: Function, message: string }) => {
  const handleCancel = () => {
    const auxState = {...visible};
    auxState.visible = false;
    setVisible(false);
  };
  return (
    <Modal
      className="detailed-version detailed-upload-save"
      style={{ top: 'calc(50vh - 100px)', width: '34%' }}
      visible={visible.visible}
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
           <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{color: '#11093c'}}>
              <button className="btn-borde" onClick={handleCancel} style={{width: '95%', height:'auto', padding: '6px'}}>Cancel</button>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{color: '#11093c', textAlign:'end'}}>
              <button className="btn-purple"  style={{width: '95%', height:'auto', padding: '6px'}} onClick={()=>{save()}}>Update</button>
            </Col>
        </Row>
      </div>
    </Modal>
  )
};

export default Alert;
