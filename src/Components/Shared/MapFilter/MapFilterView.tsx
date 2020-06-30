import React, { useState } from "react";
import { Checkbox, Row, Col, Button } from 'antd';
import { FLOODPLAINS_FEMA_FILTERS,
        FLOODPLAINS_NON_FEMA_FILTERS,
        WATERSHED_FILTERS,
        STREAMS_FILTERS,
        SERVICE_AREA_FILTERS,
        MUNICIPALITIES_FILTERS,
        COUNTIES_FILTERS,
        MHFD_BOUNDARY_FILTERS,
        PROBLEMS_TRIGGER,
        PROJECTS_TRIGGER,
        COMPONENT_LAYERS,
        MEP_PROJECTS,
        ROUTINE_MAINTENANCE,
        PROJECTS_MAP_STYLES} from '../../../constants/constants';

export default ({ selectCheckboxes, setVisibleDropdown, selectedLayers, setSelectedCheckBox, removePopup } : 
        { selectCheckboxes : Function,  setVisibleDropdown: Function, selectedLayers: any, setSelectedCheckBox: Function, removePopup: Function }) => {
  const [checkBoxes, setCheckboxes] = useState(selectedLayers);
  
  return <div className="ant-dropdown-menu" style={{ background: '#fff', width: '43.8vw', left: '-15px', margin:'0px 20px', padding:'15px 15px 10px 15px' }}>
          <Row gutter={[24, 16]} className="filter-map">
          <Checkbox.Group value={checkBoxes} onChange={(items) => {
              setSelectedCheckBox(items);
              setCheckboxes(items);
            }}>
              <Col span={9}>
                <h6>HYDROLOGIC</h6>
                  <p><Checkbox value={FLOODPLAINS_FEMA_FILTERS}>Floodplains</Checkbox></p>
                  <p><Checkbox value={FLOODPLAINS_NON_FEMA_FILTERS}>FEMA NFHL</Checkbox></p>
                  <p><Checkbox value={WATERSHED_FILTERS}>Watersheds</Checkbox></p>
                  <p><Checkbox value={STREAMS_FILTERS}>Streams</Checkbox></p>
              </Col>
              <Col span={7}>
                <h6>BOUNDARIES</h6>
                <p><Checkbox value={SERVICE_AREA_FILTERS}>Service Areas</Checkbox></p>
                <p><Checkbox value={MUNICIPALITIES_FILTERS}>Municipalities</Checkbox></p>
                <p><Checkbox value={COUNTIES_FILTERS}>Counties</Checkbox></p>
                <p><Checkbox value={MHFD_BOUNDARY_FILTERS}>MHFD Boundary</Checkbox></p>
              </Col>
              <Col span={8}>
                <h6>MHFD DATA</h6>
                <p><Checkbox value={PROBLEMS_TRIGGER}>Problems</Checkbox></p>
                <p><Checkbox value={COMPONENT_LAYERS}>Components</Checkbox></p>
                <p><Checkbox defaultChecked={true} value={PROJECTS_MAP_STYLES}>Projects</Checkbox></p>
                <p><Checkbox value={MEP_PROJECTS}>MEP Projects</Checkbox></p>
                <p><Checkbox value={ROUTINE_MAINTENANCE}>Routine Maintenance</Checkbox></p>
              </Col>
            </Checkbox.Group>
          </Row>

          <div className="btn-footer">
            <Button className="btn-00" onClick={() => {
              setSelectedCheckBox([]);
              setCheckboxes([]);
              removePopup();
              setVisibleDropdown(false);
              selectCheckboxes([]);
            }}>Clear Map</Button>
            <Button className="btn-01" onClick={() => {
              selectCheckboxes(checkBoxes);
              setVisibleDropdown(false);
              removePopup();
            }}>Apply</Button>
          </div>
     </div>
}
