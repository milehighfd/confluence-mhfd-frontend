import React from "react";
import { Modal } from 'antd';

export const SubmitModal = ({ visibleAlert, setVisibleAlert, setSave, boardStatus }: {
  visibleAlert: boolean,
  setVisibleAlert: Function,
  setSave: Function,
  boardStatus: string
}) => {

  const handleOk = (e: any) => {
    if (boardStatus !== 'Approved') {
      setSave();
    } else {
      setVisibleAlert(false);
    }
  };

  const handleCancel = (e: any) => {
    setVisibleAlert(false);
  };

  let approved = boardStatus === 'Approved';


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
            <h2>{approved ? 'Already Submitted' : 'Submit Work Request?'}</h2>
            {
              !approved &&
              <button className="btn-borde" onClick={handleCancel}>Cancel</button>
            }
            <button className="btn-purple" onClick={handleOk}>
              { approved ? 'OK' : 'Submit' }
            </button>
          </Modal>
        </div>
      </div>
    </>)

};
