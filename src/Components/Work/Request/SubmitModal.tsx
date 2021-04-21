import React from "react";
import { Modal } from 'antd';

export const SubmitModal = ({ visibleAlert, setVisibleAlert, setSave, boardStatus, currentStatus }: {
  visibleAlert: boolean,
  setVisibleAlert: Function,
  setSave: Function,
  boardStatus: string,
  currentStatus: string
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
          <h2>{currentApproved ? 'Only notes will be updated.' : 'By approving, you will no longer be able to edit.'}</h2>
          {
            !approved &&
            <button className="btn-borde" onClick={handleCancel}>Cancel</button>
          }
          <button className="btn-purple" onClick={handleOk}>
            { currentApproved ? 'OK' : 'Approve' }
          </button>
        </Modal>
      </div>
    </div>
  )

};
