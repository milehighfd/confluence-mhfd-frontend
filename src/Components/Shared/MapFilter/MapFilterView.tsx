import * as React from "react";
import { Layout, Checkbox, Row, Col, Button } from 'antd';



export default () => {
  return <Layout style={{ background: '#fff', width: '43.8vw', left: '-285px', margin:'0px 20px', padding:'15px 15px 10px 15px' }}>
          <Row gutter={[24, 16]} className="filter-map">
            <Col span={9}>
              <h6>HYDROLOGIC</h6>
              <p><Checkbox>Floodplains - FEMA SFHA</Checkbox></p>
              <p><Checkbox>Floodplains - Non - FEMA</Checkbox></p>
              <p><Checkbox>Watershed</Checkbox></p>
              <p><Checkbox>Streams</Checkbox></p>
            </Col>
            <Col span={7}>
              <h6>BOUNDARIES</h6>
              <p><Checkbox>Service Area</Checkbox></p>
              <p><Checkbox>Municipalities</Checkbox></p>
              <p><Checkbox>Counties</Checkbox></p>
              <p><Checkbox>MHFD Boundary</Checkbox></p>
            </Col>
            <Col span={8}>
              <h6>MHFD DATA</h6>
              <p><Checkbox>Problem</Checkbox></p>
              <p><Checkbox>Components</Checkbox></p>
              <p><Checkbox>Projects</Checkbox></p>
              <p><Checkbox>MEP Projects</Checkbox></p>
              <p><Checkbox>Routine Maintenance</Checkbox></p>
            </Col>
          </Row>

          <div className="btn-footer">
            <Button className="btn-00">Clear Map</Button>
            <Button className="btn-01">Apply All Layers</Button>
          </div>
     </Layout>
}
