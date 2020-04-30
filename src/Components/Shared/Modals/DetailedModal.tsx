import React from 'react';
import { Modal } from 'antd';
import DetailedView from '../../DetailedProblem/DetailedView';

export default ({ visible, setVisible, data } : { visible : boolean, setVisible: Function, data : any }) => {

  return (
    <>
      <Modal
        className="detailed-modal"
        style={{ top: 60 }}
        visible={visible}
        onCancel={() => setVisible(false)}
        destroyOnClose
      >
        <DetailedView
          data={data}
          setVisible={setVisible} />
      </Modal>
    </>
  )
}
