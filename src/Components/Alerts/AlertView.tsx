import React, {useState} from "react";
import { Button, Checkbox, Col, Modal, Row } from 'antd';

const stateValue = {
  visible: false
}
export const AlertView = ({visibleAlert, setVisibleAlert, setSave, sponsor, jurisdictions, counties, serviceareas}:
  {visibleAlert : boolean, setVisibleAlert: Function, setSave: Function, sponsor: string, jurisdictions: any, counties: any, serviceareas: any} ) => {
  const [state, setState] = useState(stateValue);

  const handleOk = (e: any) => {
    console.log(e);
    const auxState = {...state};
    auxState.visible = false;
    setVisibleAlert(false);
    setState(auxState);
    setSave(true);
  };

  const handleCancel = (e: any) => {
    console.log(e);
    const auxState = {...state};
    auxState.visible = false;
    setVisibleAlert(false);
    setState(auxState);
  };
 return (
  <>
  {visibleAlert}
    <div>
      <div >
        <Modal
          centered
          visible={visibleAlert}
          onOk={handleOk}
          onCancel={handleCancel}
          className="modal-confirm"
          width="400px"
        >
          <div className="detailed">
            <Row className="detailed-h" gutter={[16, 8]}>
              <Col xs={{ span: 44 }} lg={{ span: 20 }}>
                <h1 style={{marginTop: '15px'}}>Confirm your project
                </h1>
              </Col>
              <Col xs={{ span: 4 }} lg={{ span: 4 }} style={{textAlign: 'end'}}>
                <Button className="btn-transparent" onClick={() => setVisibleAlert(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
              </Col>
            </Row>
            <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white'}}>
              <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
                <p style={{color: '#11093c', fontWeight: '500', paddingBottom: '10px'}}>This project will be routed to the following boards:</p>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{color: '#11093c'}}>
              {/* <h2>Saving will create a draft project within {sponsor}'s Work Request. Do you want to continue?</h2> */}
                <p className="title">
                  Work Request
                </p>
                <p className="information" style={{color:'#11093C', opacity:'0.5'}}>
                  {jurisdictions.join(', ')}
                </p>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{color: '#11093c'}}>
                <p className="title">
                  Work Plan (Capital Project)
                </p>
                <p className="information" style={{color:'#11093C', fontWeight:'700'}}>
                  {counties ? counties.join(', ') : serviceareas.join(', ')}
                </p>
              </Col>
              <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
                <div>
                  <Checkbox style={{paddingRight:'10px', paddingTop:'10px'}}></Checkbox>Send this project to the Work Request board
                </div>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{color: '#11093c'}}>
                {/* <h2>Saving will create a draft project within {sponsor}'s Work Request. Do you want to continue?</h2> */}
                <button className="btn-borde" onClick={handleCancel} style={{width: '95%'}}>Cancel</button>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{color: '#11093c', textAlign:'end'}}>
                <button className="btn-purple"  style={{width: '95%'}} onClick={handleOk}><span>Submit Project</span></button>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    </div>
  </>)

};
