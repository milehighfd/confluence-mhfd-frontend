import React from "react";
import { Button, Col, Modal, Row } from 'antd';
import { boardType } from "./RequestTypes";

export const SubmitModal = ({ locality, boardsLength, boardSubstatus, type, visibleAlert, setVisibleAlert, setSave, currentStatus, pending  }: {
  locality: string,
  boardsLength: number,
  boardSubstatus: string,
  type: boardType,
  visibleAlert: boolean,
  setVisibleAlert: Function,
  setSave: Function,
  currentStatus: string,
  pending: boolean
}) => {

  const handleOk = (e: any) => {
    setSave();
    setVisibleAlert(false);
  };

  const handleCancel = (e: any) => {
    setVisibleAlert(false); 
  };

  let hasChecks = type === 'WORK_REQUEST' || locality === 'MHFD District Work Plan';
  let isPending = null;
  if (hasChecks) {
    let ls = boardSubstatus ? boardSubstatus.split(',') : [];
    ls = ls.map(l => l?.toLowerCase()).filter(r => r !== 'INTEG.SYNC'.toLowerCase());
    isPending = ls.length !== boardsLength;
  } else {
    isPending = pending;
  }

  
  let currentApproved = currentStatus === 'Approved';
  let hasChecksAlertText = `${type === 'WORK_REQUEST' ? 'Unavailable': 'District Work Plan submission is unavailable'} until all ${type === 'WORK_REQUEST' ? 'project types' : 'Work Plans'} are selected for approval.`;
  let notChecksAlertText = `Work Plan submission is unavailable until all underlying Work Requests are submitted.`;

  return (
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
            <Col xs={{ span: 20 }} lg={{ span: 20 }}>
              <h1 style={{marginTop: '15px'}}>{type === 'WORK_REQUEST' ? 'Work Request' : 'Work Plan'} Submission
              </h1>
            </Col>
            <Col xs={{ span: 4 }} lg={{ span: 4 }} style={{textAlign: 'end'}}>
              <Button className="btn-transparent" onClick={() => setVisibleAlert(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
            </Col>
          </Row>
          <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white'}}>
          <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
            {
              (!isPending) && <h2>{ currentApproved ? 'Only notes will be updated.' : <div>
                By Approving, you are submitting your jurisdiction's {type === 'WORK_REQUEST' ? 'Work Request' : 'Work Plan'} to MHFD for review. You will no longer be able to edit.
              </div> } </h2>
            }
            {
              (isPending) && <p style={{color: '#11093c'}}>{ hasChecks ? hasChecksAlertText : notChecksAlertText }</p> 
            }
          </Col>
          <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c', textAlign:'center'}}>
            { !isPending && <button className="btn-borde" onClick={handleCancel}>Cancel</button>}
            {
              isPending ? (
                <button className="btn-purple" onClick={handleCancel}>
                  OK
                </button>
              ) : (
                <button className="btn-purple" onClick={handleOk}>
                  { (currentApproved) ? 'OK' : 'Approve' }
                </button>
              )
            }
          </Col>
        </Row>
        </div>
        </Modal>
      </div>
    </div>
  )

};
