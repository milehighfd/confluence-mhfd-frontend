import React, { useState, useEffect } from "react";
import { Alert } from 'antd';

export const AlertStatus = ({ type, message }: {
  type: 'error' | 'success',
  message: string
}) => {
  return (
    <div>
      <div className="alert-mm">
        <Alert type={type} message={message} banner />
      </div>
    </div>
  );
};
