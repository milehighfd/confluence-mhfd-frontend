import React, { useState, useEffect } from 'react';

import { Menu, Popover } from 'antd';
import AmountModal from './AmountModal';

const TrelloLikeCard = ({ project }: { project: any }) => {
  const {
    projectid,
    projectname,
    price,
    jurisdiction,
    status
  } = project;

  const [showAmountModal, setShowAmountModal] = useState(false);

  const content = (
    <Menu className="js-mm-00">
      <Menu.Item>
        <span><img src="/Icons/icon-04.svg" alt="" width="10px" style={{ opacity: '0.5' }} /> Edit Project</span>
      </Menu.Item>
      <Menu.Item onClick={() => setShowAmountModal(true)}>
        <span>
          <img src="/Icons/icon-90.svg" alt="" width="8px" style={{ opacity: '0.5' }} />
          Edit Amount
        </span>
      </Menu.Item>
      <Menu.Item>
        <span><img src="/Icons/icon-13.svg" alt="" width="10px" style={{ opacity: '0.5' }} /> Zoom to</span>
      </Menu.Item>
      <Menu.Item>
        <span><img src="/Icons/icon-16.svg" alt="" width="10px" /> Delete</span>
      </Menu.Item>
    </Menu>
  );

  const onDragStart = (e: any, id: any) => {
    e.dataTransfer.setData('id', id);
  }

  return (
    <>
    <AmountModal visible={showAmountModal} setVisible={setShowAmountModal} />
    <div className="card-wr" style={{ borderLeft: '3px solid #9faeb1' }} draggable onDragStart={e => onDragStart(e, projectid)}>
      <h4>{projectname}</h4>
      <h6>{price}</h6>
      <label className="purple">{jurisdiction}</label>
      <label className="yellow">{status}</label>
      {
        !showAmountModal && 
        <Popover placement="bottom" overlayClassName="work-popover" content={content} trigger="click">
          <img src="/Icons/icon-60.svg" alt="" className="menu-wr" />
        </Popover>
      }
    </div>
    </>
  )

}

export default TrelloLikeCard;
