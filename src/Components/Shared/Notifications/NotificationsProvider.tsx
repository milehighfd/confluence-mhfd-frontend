import React, { createContext, useContext } from 'react';
import { notification } from 'antd';
import { NotificationType } from './NotificationsTypes';
import { CheckCircleFilled, CloseCircleFilled, InfoCircleFilled, WarningFilled } from '@ant-design/icons';

type NotificationsContextType = {
  openNotification: (message: string, notificationType: NotificationType, description?: string) => void;
};
type Notification = {
  className: string;
  icon: any;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);
const NotificationsProvider: React.FC = ({ children }) => {
  const openNotification = (message: string, notificationType: NotificationType, description?: string) => {
    let NotificationType = getNotificationbyType(notificationType, description);
    notification.open({
      message: <div>{message}</div>,
      className: NotificationType.className,
      icon: NotificationType.icon,
      description: description ? description : undefined,
    });
  };
  const getNotificationbyType = (notiType: string, description: string | undefined): Notification => {
    switch (notiType) {
      case 'success':
        return {
          className:
            (description === undefined ? 'notification-alert-layout' : 'notification-alert-layout-with-description') +
            ' notification-alert-success',
          icon: <CheckCircleFilled className="notification-icon-success" />,
        };
      case 'warning':
        return {
          className:
            (description === undefined ? 'notification-alert-layout' : 'notification-alert-layout-with-description') +
            ' notification-alert-warning',
          icon: <WarningFilled className="notification-icon-warning" />,
        };
      case 'info':
        return {
          className:
            (description === undefined ? 'notification-alert-layout' : 'notification-alert-layout-with-description') +
            ' notification-alert-info',
          icon: <InfoCircleFilled className="notification-icon-info" />,
        };
      case 'critical':
        return {
          className:
            (description === undefined ? 'notification-alert-layout' : 'notification-alert-layout-with-description') +
            ' notification-alert-critical',
          icon: <CloseCircleFilled className="notification-icon-critical" />,
        };
      default:
        return {
          className: description === undefined ? 'notification-alert-layout' : 'notification-alert-layout-with-description',
          icon: {},
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
