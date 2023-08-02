import React from "react";
import { Button, Col, Modal, Row } from 'antd';

export const WrongModal = ({ visible, setVisible }: {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}) => {

  
  return (
    <div>
      <div >
        <Modal
          centered
          visible={visible}
          onOk={()=>{setVisible(false)}}
          onCancel={()=>{setVisible(false)}}
          className="modal-confirm"
          width="400px"
        >
        <div className="detailed">
          <Row className="detailed-h" gutter={[16, 8]}>
            <Col xs={{ span: 20 }} lg={{ span: 20 }}>
              <h1 style={{marginTop: '15px'}}>Something went wrong!
              </h1>
            </Col>
            <Col xs={{ span: 4 }} lg={{ span: 4 }} style={{textAlign: 'end'}}>
              <Button className="btn-transparent" onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
            </Col>
          </Row>
          <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white'}}>
          <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
            <div className="img-wrong">
              <img src="Icons/ic-wrong.svg" alt="wrong"/>
            </div>
            <p>
              Please toggle all project type selections in the submission sidebar in order to submit your Work Request. 
            </p>
          </Col>
          <Col xs={{ span: 48 }} lg={{ span: 24 }}>
            <button className="btn-borde" onClick={()=>{setVisible(false)}}  style={{width:'100%'}}>Return to Submission</button>
          </Col>
        </Row>
        </div>
        </Modal>
      </div>
    </div>
  )

};
