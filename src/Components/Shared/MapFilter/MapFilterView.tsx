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
        PROJECTS_MAP_STYLES,
        SERVICE_AREA_LAYERS,
        MUNICIPALITIES,
        COUNTIES_LAYERS,
        STUDIES,
        FLOODPLAINS,
        FEMA_FLOOD_HAZARD,
        XSTREAMS} from '../../../constants/constants';

export default ({ selectCheckboxes, setVisibleDropdown, selectedLayers, setSelectedCheckBox, removePopup, isExtendedView } : 
        { selectCheckboxes : Function,  setVisibleDropdown: Function, selectedLayers: any, setSelectedCheckBox: Function, removePopup: Function, isExtendedView: boolean }) => {
  // const [checkBoxes, setCheckboxes] = useState(selectedLayers);
  
  return <div className="ant-dropdown-menu" style={{ background: '#fff', width: '43.8vw', left: '-15px', margin:'0px 20px', padding:'15px 15px 10px 15px' }}>
          <Row gutter={[24, 16]} className="filter-map">
          <Checkbox.Group value={selectedLayers} onChange={(items) => {
              setSelectedCheckBox(items);
              // setCheckboxes(items);
              selectCheckboxes(items);
              removePopup();
            }}>
              <Col span={9}>
                <h6>HYDROLOGIC</h6>
                  <p><Checkbox value={FLOODPLAINS}>Floodplains</Checkbox></p>
                  <p><Checkbox value={FEMA_FLOOD_HAZARD}>FEMA NFHL</Checkbox></p>
                  <p><Checkbox value={WATERSHED_FILTERS}>Watersheds</Checkbox></p>
                  <p style={{display: 'none'}}><Checkbox value={STREAMS_FILTERS}>Streams</Checkbox></p>
              </Col>
              <Col span={7}>
                <h6>BOUNDARIES</h6>
                <p><Checkbox value={SERVICE_AREA_LAYERS}>Service Areas</Checkbox></p>
                <p><Checkbox value={MUNICIPALITIES}>Municipalities</Checkbox></p>
                <p><Checkbox value={COUNTIES_LAYERS}>Counties</Checkbox></p>
                <p style={{display: 'none'}}><Checkbox value={MHFD_BOUNDARY_FILTERS}>MHFD Boundary</Checkbox></p>
              </Col>
              <Col span={8}>
                <h6>MHFD DATA</h6>
                <p><Checkbox disabled={!isExtendedView} defaultChecked={true} value={PROBLEMS_TRIGGER}>Problems</Checkbox></p>
                <p><Checkbox value={COMPONENT_LAYERS}>Components</Checkbox></p>
                <p><Checkbox disabled={!isExtendedView} defaultChecked={true} value={PROJECTS_MAP_STYLES}>Projects</Checkbox></p>
                <p><Checkbox value={MEP_PROJECTS}>MEP Referrals</Checkbox></p>
                <p><Checkbox value={ROUTINE_MAINTENANCE}>Routine Maintenance</Checkbox></p>
              </Col>
            </Checkbox.Group>
          </Row>

          <div className="btn-footer">
            <Button className="btn-00" onClick={() => {
              if (isExtendedView) { 
                setSelectedCheckBox([MHFD_BOUNDARY_FILTERS, XSTREAMS]);
                // setCheckboxes([]);
                selectCheckboxes([MHFD_BOUNDARY_FILTERS, XSTREAMS]);
              } else {
                setSelectedCheckBox([PROBLEMS_TRIGGER, PROJECTS_MAP_STYLES, MHFD_BOUNDARY_FILTERS, XSTREAMS]);
                // setCheckboxes([PROBLEMS_TRIGGER, PROJECTS_MAP_STYLES]);
                selectCheckboxes([PROBLEMS_TRIGGER, PROJECTS_MAP_STYLES, MHFD_BOUNDARY_FILTERS, XSTREAMS]);
              }
              removePopup();
              setVisibleDropdown(false);
            }}>Clear Map</Button>
            
          </div>
     </div>
}
