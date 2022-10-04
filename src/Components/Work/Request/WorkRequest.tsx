import React from 'react';
import RequestView from 'Components/Work/Request/RequestView';

const WorkRequest = () => {
  return (
    <RequestView
      type={'WORK_REQUEST'}
      isFirstRendering={true}
    />
  );
};

export default WorkRequest;
