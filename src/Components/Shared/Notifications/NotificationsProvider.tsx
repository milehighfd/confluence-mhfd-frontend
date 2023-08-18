import React, { createContext, useContext } from 'react';
import { notification } from 'antd';
import { NotificationType } from './NotificationsTypes';
import { CheckCircleFilled } from '@ant-design/icons';

type NotificationsContextType = {
  openNotification: (message: string, notificationType: NotificationType) => void;
};
type Notification = {
  className: string;
  icon: any;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);
const NotificationsProvider: React.FC = ({ children }) => {
  const openNotification = (message: string, notificationType: NotificationType) => {
    let NotificationType = getNotificationbyType(notificationType);
    notification.open({
      message,
      className: NotificationType.className,
      icon: NotificationType.icon,
      // duration:10060,
    });
  };

  const getNotificationbyType = (notiType: string): Notification => {
    switch (notiType) {
      case 'success':
        return {
          className: 'notification-alert-layout',
          icon: <CheckCircleFilled className='notification-icon-success'/>,
        };
      case 'case2':
        return {
          className: 'notification-alert-layout',
          icon: <CheckCircleFilled className='notification-icon-success'/>,
        };
      default:
        return {
            className: 'notification-alert-layout',
            icon: <CheckCircleFilled className='notification-icon-success'/>,
          };
    }
  };

  return <NotificationsContext.Provider value={{ openNotification }}>{children}</NotificationsContext.Provider>;
};

const useNotifications = (): NotificationsContextType => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};

export { NotificationsProvider, useNotifications };
