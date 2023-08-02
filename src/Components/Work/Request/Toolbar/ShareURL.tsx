import { Button, Popover, notification } from 'antd';
import React from 'react';

const ShareURL = () => {
  const openNotification = () => {
    notification.open({
      message: `Share URL Copied to clipboard`,
      duration: 5
    });
  };

  return (
    <Popover className='buttons-header' content={<div className='popover-text'>Share URL: <br/>Board link is copied and shareable with users who also have access to this board.</div>} placement="bottomLeft" overlayClassName='popover-work-header' >
    <Button 
    className='buttons'
    type='link'   
     onClick={
      () => {
        navigator.clipboard.writeText(window.location.href);
        openNotification();
      }
    }>
      <img
        className='icon-bt'       
        style={{ WebkitMask: "url('/Icons/ic-link.svg') no-repeat center" }}
        alt=""
      />
    </Button>
    </Popover>
  );
};

export default ShareURL;
