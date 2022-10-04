import { Button, notification } from 'antd';
import React from 'react';

const ShareURL = () => {
  const openNotification = () => {
    notification.open({
      message: `Share URL Copied to clipboard`,
      duration: 5
    });
  };

  return (
    <Button className="btn-opacity" onClick={
      () => {
        navigator.clipboard.writeText(window.location.href);
        openNotification();
      }
    }>
      <img className="icon-bt" style={{ WebkitMask: "url('/Icons/ic_share1.svg') no-repeat center" }} src="" />
    </Button>
  );
};

export default ShareURL;
