import React from "react";
import { Modal } from 'antd';
import { boardType } from "./RequestTypes";

export const SubmitModal = ({ boardSubstatus, type, visibleAlert, setVisibleAlert, setSave, boardStatus, currentStatus, pending  }: {
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

  let currentApproved = currentStatus === 'Approved';
  let approved = boardStatus === 'Approved';

  let ls = boardSubstatus ? boardSubstatus.split(',') : [];


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
        >{
          (!pending || ls.length == 5) && <h2>{currentApproved ? 'Only notes will be updated.' : <div>By approving, you will<br/>no longer be able to edit.</div> }</h2>
        }
        {
          (pending && ls.length < 5) && <h2>{ type === 'WORK_REQUEST' ?
            'Work Request submission is unavailable until all project types are selected for approval.' :
            'Can not submit while still have pending work request' }</h2> 
        }
        {
            !approved &&
            <button className="btn-borde" onClick={handleCancel}>Cancel</button>
          }
          {!pending &&
            <button className="btn-purple" onClick={handleOk}>
            { currentApproved ? 'OK' : 'Approve' }
          </button>}
        </Modal>
      </div>
    </div>
  )

};
