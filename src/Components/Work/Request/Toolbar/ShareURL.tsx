import { Button, Popover, notification } from 'antd';
import { UPCOMING_PROJECTS } from 'constants/constants';
import React, { useEffect, useState } from 'react';

const ShareURL = (parentName?: any) => {
  const [hoverText, setHoverText] = useState('Board link is copied and shareable with users who also have access to this board.');
  const openNotification = () => {
    notification.open({
      message: `Share URL Copied to clipboard`,
      duration: 5
    });
  };
  useEffect(() => { 
      if (parentName === UPCOMING_PROJECTS) {
        setHoverText('Share the Upcoming Project link, accessible to everyone.');
      }
  },[parentName]);
  return (
    <Popover
      className={parentName === UPCOMING_PROJECTS ?'buttons-tab':'buttons-header'}
      content={<div className='popover-text'>Share URL: <br/>{hoverText}</div>}
      placement="bottomLeft" overlayClassName='popover-work-header'
    >
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
        src='Icons/ic-005.svg'  
        //style={{ WebkitMask: "url('/Icons/ic-link.svg') no-repeat center" }}
        alt=""
      />
    </Button>
    </Popover>
  );
};

export default ShareURL;
