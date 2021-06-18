import React from "react";
import { Modal } from 'antd';
import { boardType } from "./RequestTypes";

export const SubmitModal = ({ locality, boardsLength, boardSubstatus, type, visibleAlert, setVisibleAlert, setSave, boardStatus, currentStatus, pending  }: {
  locality: string,
  boardsLength: number,
  boardSubstatus: string,
  type: boardType,
  visibleAlert: boolean,
  setVisibleAlert: Function,
  setSave: Function,
  boardStatus: string,
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
    isPending = ls.length !== boardsLength;
  } else {
    isPending = pending;
  }

  
  let currentApproved = currentStatus === 'Approved';
  let approved = boardStatus === 'Approved';
  let hasChecksAlertText = `${type === 'WORK_REQUEST' ? 'Work Request': 'District Work Plan'} submission is unavailable until all ${type === 'WORK_REQUEST' ? 'project types' : 'Work Plans'} are selected for approval.`;
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
          {
            (!isPending) && <h2>{ currentApproved ? 'Only notes will be updated.' : <div>
              By Approving, you are submitting your jurisdiction's {type === 'WORK_REQUEST' ? 'Work Request' : 'Work Plan'} to MHFD for review. You will no longer be able to edit.
            </div> } </h2>
          }
          {
            (isPending) && <h2>{ hasChecks ? hasChecksAlertText : notChecksAlertText }</h2> 
          }
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
        </Modal>
      </div>
    </div>
  )

};
