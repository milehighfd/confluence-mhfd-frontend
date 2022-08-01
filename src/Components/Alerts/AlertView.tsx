import React, {useEffect, useState} from "react";
import { Button, Checkbox, Col, Modal, Row } from 'antd';
import store from "../../store";
import { ADMIN, STAFF } from "../../constants/constants";

const stateValue = {
  visible: false
}
export const AlertView = ({visibleAlert, setVisibleAlert, setSave, sponsor, jurisdictions, counties, serviceareas, type, isEdit}:
  {visibleAlert : boolean, setVisibleAlert: Function, setSave: Function, sponsor: string, jurisdictions: any, counties: any, serviceareas: any, type: string, isEdit: boolean} ) => {
  const [state, setState] = useState(stateValue);
  const appUser = store.getState().appUser;
  const showCheckBox = appUser.designation === ADMIN || appUser.designation === STAFF;
  const [sendToWR,setsendToWR] = useState(false);
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
  useEffect(() => {
    console.log('Am i editing', isEdit);
  }, [isEdit]);
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
                <h1 style={{marginTop: '15px'}}>{isEdit ? 'Save your project' : 'Confirm your project'}
                </h1>
              </Col>
              <Col xs={{ span: 4 }} lg={{ span: 4 }} style={{textAlign: 'end'}}>
                <Button className="btn-transparent" onClick={() => setVisibleAlert(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
              </Col>
            </Row>
            <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white'}}>
              <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
                <p style={{color: '#11093c', fontWeight: '500', paddingBottom: '10px'}}>{ isEdit ? 'Please confirm your project edits below.' : 'This project will be routed to the following boards:'}</p>
              </Col>
              {!isEdit && <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{color: '#11093c'}}>
              {/* <h2>Saving will create a draft project within {sponsor}'s Work Request. Do you want to continue?</h2> */}
                <p className="title">
                  Work Request
                </p>
                <p className={`information ${(!sendToWR && showCheckBox)  ? 'disabled':''}`}>
                  {jurisdictions.join(', ')}
                </p>
              </Col>}
              {!isEdit && <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{color: '#11093c'}}>
                <p className="title">
                  Work Plan ({type} Project)
                </p>
                <p className={`information ${!showCheckBox ? 'disabled': ''}`}>
                  {counties ? counties.join(', ') : serviceareas.join(', ')}
                </p>
              </Col>}
              {
                (showCheckBox && !isEdit) && <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
                  <div>
                    <Checkbox style={{paddingRight:'10px', paddingTop:'10px'}} checked={sendToWR} onChange={() => setsendToWR(!sendToWR)}></Checkbox>Send this project to the Work Request board
                  </div>
                </Col>
              }

              <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{color: '#11093c'}}>
                {/* <h2>Saving will create a draft project within {sponsor}'s Work Request. Do you want to continue?</h2> */}
                <button className="btn-borde" onClick={handleCancel} style={{width: '95%'}}>Cancel</button>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{color: '#11093c', textAlign:'end'}}>
                <button className="btn-purple"  style={{width: '95%'}} onClick={handleOk}><span>{isEdit? 'Save':'Submit'} Project</span></button>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    </div>
  </>)

};
