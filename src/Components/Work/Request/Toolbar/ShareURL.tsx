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
    <Popover content={<span>Export:<br/>Download a CSV of the board below.</span>} placement='bottom' overlayClassName='popover-work-header' >
    <Button 
    className='buttons-header'
    type='link'
    style={{border:'none'}}
     onClick={
      () => {
        navigator.clipboard.writeText(window.location.href);
        openNotification();
      }
    }>
      <img
        id='share'
        src='/Icons/ic-list.png'
      
        alt=""
      />
    </Button>
    </Popover>
  );
};

export default ShareURL;
