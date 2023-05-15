import React from 'react';
import { useLocation } from 'react-router-dom';
import RequestView from 'Components/Work/Request/RequestView';

const RequestLayout = () => {
  const location = useLocation();

  return (
    <RequestView
      type={location.pathname === '/work-request' ? 'WORK_REQUEST' : 'WORK_PLAN'}
      isFirstRendering={true}
    />
  );
};

export default RequestLayout;
