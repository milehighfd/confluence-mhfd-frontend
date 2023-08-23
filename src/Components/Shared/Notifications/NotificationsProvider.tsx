import React, { createContext, useContext } from 'react';
import { notification } from 'antd';
import { NotificationType } from './NotificationsTypes';
import { CheckCircleFilled, WarningFilled } from '@ant-design/icons';
import { duration } from 'moment';

type NotificationsContextType = {
  openNotification: (message: string, notificationType: NotificationType, description?: string) => void;
  openNotificationWithDescription: (message: string, notificationType: NotificationType, description?: string) => void;
};
type Notification = {
  className: string;
  icon: any;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);
const NotificationsProvider: React.FC = ({ children }) => {
  const openNotification = (message: string, notificationType: NotificationType, description?: string) => {
    let NotificationType = getNotificationbyType(notificationType, description);
    alert(NotificationType.className)
    notification.open({
      message:<div>{message}</div>,
      className: NotificationType.className,
      icon: NotificationType.icon,
      description: description? description: undefined,
      duration: 100
    });
  };
  const openNotificationWithDescription= (message: string, notificationType: NotificationType, description?: string) => {
    let NotificationType = getNotificationbyType(notificationType, description);
    notification.open({
      message:<div>{message}</div>,
      className: NotificationType.className,
      icon: NotificationType.icon,
      description,
    });
  };

  const getNotificationbyType = (notiType: string, description: string|undefined): Notification => {
    switch (notiType) {
      case 'success':
        return {
          className: (description===undefined?'notification-alert-layout':'notification-alert-layout-with-description') + ' notification-alert-success',
          icon: <CheckCircleFilled className='notification-icon-success'/>,
        };
      case 'warning':
        return {
          className: (description===undefined?'notification-alert-layout':'notification-alert-layout-with-description') + ' notification-alert-warning',
          icon: <WarningFilled className='notification-icon-warning'/>,
        };
      default:
        return {
            className: 'notification-alert-layout',
            icon: <CheckCircleFilled className='notification-icon-success'/>,
          };
    }
  };

  return <NotificationsContext.Provider value={{ openNotification, openNotificationWithDescription }}>{children}</NotificationsContext.Provider>;
};

const useNotifications = (): NotificationsContextType => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};

export { NotificationsProvider, useNotifications };
