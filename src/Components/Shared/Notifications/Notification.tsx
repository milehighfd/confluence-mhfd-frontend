import React from 'react';
import { notification } from 'antd';

export default function Notification() {

  const openNotification = () => {
    notification.config({
      duration: 0, // Set the duration to 0 for the notification to stay open until manually closed
    });
  };
  
  return (<></> );
}
