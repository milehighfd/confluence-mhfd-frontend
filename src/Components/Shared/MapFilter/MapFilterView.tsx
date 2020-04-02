import * as React from "react";
import { Layout, Checkbox, Row, Col, Button } from 'antd';
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
        COMPONENTS_TRIGGER, 
        MEP_PROJECTS,
        ROUTINE_MAINTENANCE} from '../../../constants/constants';

export default ({ selectCheckboxes, handleSelectAll, handleResetAll, selectedLayers } : { selectCheckboxes : Function, handleSelectAll: Function, handleResetAll: Function, selectedLayers: Array<string> }) => {
  return <Layout style={{ background: '#fff', width: '43.8vw', left: '-235px', margin:'0px 20px', padding:'15px 15px 10px 15px' }}>
          <Row gutter={[24, 16]} className="filter-map">
          <Checkbox.Group value={selectedLayers} onChange={(items) => selectCheckboxes(items)}>
              <Col span={9}>
                <h6>HYDROLOGIC</h6>
                  <p><Checkbox value={FLOODPLAINS_FEMA_FILTERS}>Floodplains - FEMA SFHA</Checkbox></p>
                  <p><Checkbox value={FLOODPLAINS_NON_FEMA_FILTERS}>Floodplains - Non - FEMA</Checkbox></p>
                  <p><Checkbox value={WATERSHED_FILTERS}>Watershed</Checkbox></p>
                  <p><Checkbox value={STREAMS_FILTERS}>Streams</Checkbox></p>
              </Col>
              <Col span={7}>
                <h6>BOUNDARIES</h6>
                <p><Checkbox value={SERVICE_AREA_FILTERS}>Service Area</Checkbox></p>
                <p><Checkbox value={MUNICIPALITIES_FILTERS}>Municipalities</Checkbox></p>
                <p><Checkbox value={COUNTIES_FILTERS}>Counties</Checkbox></p>
                <p><Checkbox value={MHFD_BOUNDARY_FILTERS}>MHFD Boundary</Checkbox></p>
              </Col>
              <Col span={8}>
                <h6>MHFD DATA</h6>
                <p><Checkbox value={PROBLEMS_TRIGGER}>Problem</Checkbox></p>
                <p><Checkbox value={COMPONENTS_TRIGGER}>Components</Checkbox></p>
                <p><Checkbox value={PROJECTS_TRIGGER}>Projects</Checkbox></p>
                <p><Checkbox value={MEP_PROJECTS}>MEP Projects</Checkbox></p>
                <p><Checkbox value={ROUTINE_MAINTENANCE}>Routine Maintenance</Checkbox></p>
              </Col>
            </Checkbox.Group>
          </Row>

          <div className="btn-footer">
            <Button className="btn-00" onClick={() => handleResetAll()}>Clear Map</Button>
            <Button className="btn-01" onClick={() => handleSelectAll()}>Apply All Layers</Button>
          </div>
     </Layout>
}
