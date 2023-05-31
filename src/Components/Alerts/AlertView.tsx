import React, {useEffect, useState} from "react";
import { Button, Checkbox, Col, Modal, Row } from 'antd';
import store from "../../store";
import { ADMIN, STAFF } from "../../constants/constants";

const stateValue = {
  visible: false
}
export const AlertView = ({isWorkPlan, visibleAlert, setVisibleAlert, setSave, sponsor, jurisdictions, counties, serviceareas, type, isEdit, sendToWr, setsendToWR, locality}:
  {isWorkPlan: boolean, visibleAlert : boolean, setVisibleAlert: Function, setSave: Function, sponsor: string, jurisdictions: any, counties: any, serviceareas: any, type: string, isEdit: boolean, sendToWr: boolean, setsendToWR: Function,
  locality: any} ) => {
  const [state, setState] = useState(stateValue);
  const appUser = store.getState().appUser;
  const showCheckBox = appUser.designation === ADMIN || appUser.designation === STAFF;
  const [workPlanString, setWorkPlanString] = useState('');


  useEffect(() => {
    
    if (isWorkPlan) {
      setWorkPlanString(locality.join(','));
    } else {
      const newString = counties ? counties.join(', ') : serviceareas.join(', ');
      setWorkPlanString(newString);
    }
  }, [isWorkPlan, counties, serviceareas, locality]);

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
  console.log(isWorkPlan, "  console.log(isWorkPlan);");
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
                <p className="title">
                  Work Request
                </p>
                <p className={`information ${(!sendToWr && showCheckBox)  ? 'disabled':''}`}>
                  {jurisdictions.join(', ')}
                </p>
              </Col>}
              {!isEdit && <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{color: '#11093c'}}>
                <p className="title">
                  Work Plan ({type} Project)
                </p>
                <p className={`information ${!showCheckBox ? 'disabled': ''}`}>
                  {workPlanString}
                </p>
              </Col>}
              {
                (isWorkPlan &&showCheckBox && !isEdit && !locality.includes('MHFD District')) && <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
                  <div>
                    <Checkbox
                      style={{paddingRight:'10px', paddingTop:'10px'}}
                      checked={sendToWr}
                      onChange={() => setsendToWR(!sendToWr)}
                      disabled={isWorkPlan}
                    />
                    Send this project to the Work Request board
                  </div>
                </Col>
              }
              <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{color: '#11093c'}}>
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
