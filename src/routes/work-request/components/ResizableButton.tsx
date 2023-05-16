import { Button } from 'antd';
import { MEDIUM_SCREEN_LEFT, MEDIUM_SCREEN_RIGHT } from 'constants/constants';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import React, { useState } from 'react';

const ResizableButton = () => {
  const emptyStyle: React.CSSProperties = {};
  const [rotationStyle, setRotationStyle] = useState<any>(emptyStyle);
  const { leftWidth } = useRequestState();
  const { setLeftWidth } = useRequestDispatch();


  const updateWidth = () => {
    if (leftWidth === (MEDIUM_SCREEN_RIGHT - 1)) {
      setLeftWidth(MEDIUM_SCREEN_LEFT);
      setRotationStyle({ transform: 'rotate(180deg)', marginRight: '-4px', right: '4px', position: 'relative' });
    } else {
      setLeftWidth(MEDIUM_SCREEN_RIGHT - 1);
      setRotationStyle(emptyStyle);
    }
  }

  return (
    <Button id="resizable-btn" className="btn-coll" onClick={updateWidth}>
      <img style={rotationStyle} src="/Icons/icon-34.svg" alt="" width="18px" />
    </Button>
  )
};

export default ResizableButton;
