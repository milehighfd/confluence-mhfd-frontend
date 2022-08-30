import { Button, Col, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

const LegendModal = ({visible, setVisible}: {visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <Modal
      className="detailed-version"
      style={{ top: 200, width: '70%' }}
      visible={visible}
      onCancel={() => setVisible(false)}
      forceRender={false}
      destroyOnClose>
      <div className="detailed">
        <Row className="detailed-h" gutter={[16, 8]}>
          <Col xs={{ span: 12 }} lg={{ span: 13 }}>
            <h1 style={{marginTop: '15px'}}>Problem Types
            </h1>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 11 }} style={{textAlign: 'end'}}>
            <Button className="btn-transparent" onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
          </Col>
        </Row>
        <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white'}}>
          <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
            <p style={{color: 'rgb(17 9 60)'}}><span style={{fontWeight:'600'}}>Flood Hazard </span> Problems associated with flood waters that may pose safety or risk concerns related to people, property, and the environment today. Problems related to existing flood or fluvial hazard to life and property.</p>
            <br></br>
            <p style={{color: 'rgb(17 9 60)'}}><span style={{fontWeight:'600'}}>Stream Function </span> Problems associated with a streams function and its performance related to the Five Elements (hydrology, hydraulics, geomorphology, vegetation, and community values). Problems related to the physical, environmental, and social function or condition of the stream in an urban context.</p>
            <br></br>
            <p style={{color: 'rgb(17 9 60)'}}><span style={{fontWeight:'600'}}>Watershed Change </span>  Problems related to flood waters that may pose safety or functional concerns related to people, property, and the environment due to changing watershed conditions (land use, topography, regional detention, etc).</p>
            <br></br>
          </Col>
        </Row>
      </div>
    </Modal>
  )
};

export default LegendModal;