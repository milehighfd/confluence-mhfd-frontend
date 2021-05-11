import React, { useState, useEffect } from "react";
import { Alert } from 'antd';

export const AlertStatus = ({ type, message, int }: {
  type: 'error' | 'success',
  message: string,
  int: number
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 4000);
  }, [type, message, int]);

  if (!visible) {
    return null;
  }

  return (
    <div>
      <div className="alert-mm">
        <Alert type={type} message={message} banner />
      </div>
    </div>
  )

};
