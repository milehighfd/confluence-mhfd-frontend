import React, { useState } from 'react';
import { Dropdown,  Button } from 'antd';
import MapFilterView from 'Components/Shared/MapFilter/MapFilterView';

const MapDropdownLayers = ({
  selectCheckboxes,
  selectedLayers,
  removePopup,
  isWR
}: {
  selectCheckboxes: Function,
  selectedLayers: any,
  removePopup: Function
  isWR?: boolean
}) => {
  const [visibleDropdown, setVisibleDropdown] = useState(false);

  return (
    <Dropdown overlayClassName="dropdown-map-layers"
      visible={visibleDropdown}
      onVisibleChange={(flag: boolean) => {
        setVisibleDropdown(flag);
      }}
      overlay={MapFilterView({ selectCheckboxes, setVisibleDropdown, selectedLayers, removePopup, isWR })}
      trigger={['click']}>
      <Button>
        <span className="btn-02"></span>
      </Button>
    </Dropdown>
  );
};

export default MapDropdownLayers;
