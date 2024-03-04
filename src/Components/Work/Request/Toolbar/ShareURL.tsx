import { useNotifications } from 'Components/Shared/Notifications/NotificationsProvider';
import { Button, Popover, notification } from 'antd';
import { UPCOMING_PROJECTS } from 'constants/constants';
import React, { useEffect, useState } from 'react';

const ShareURL = (parentName?: any) => {
  const { openNotification } = useNotifications();
  const [hoverText, setHoverText] = useState('Board link is copied and shareable with users who also have access to this board.');
  useEffect(() => { 
      if (parentName === UPCOMING_PROJECTS) {
        setHoverText('Share the Upcoming Project link, accessible to everyone.');
      }
  },[parentName]);
  return (
    <Popover
      className={parentName === UPCOMING_PROJECTS ?'buttons-tab':'buttons-header'}
      content={<div className='popover-text'><b>Share URL:</b> {hoverText}</div>}
      placement="bottomLeft" overlayClassName='popover-work-header project-popover'
    >
    <Button 
    className='buttons'
    type='link'   
     onClick={
      () => {
        navigator.clipboard.writeText(window.location.href);
        openNotification('Success','success',  'Board URL copies to your clipboard.');
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
