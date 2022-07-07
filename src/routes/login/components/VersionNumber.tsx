import { Button, Col, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

const VersionNumber = ({visible, setVisible}: {visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <Modal
      className="detailed-version"
      style={{ top: 60, width: '70%' }}
      visible={visible}
      onCancel={() => setVisible(false)}
      forceRender={false}
      destroyOnClose>
      <div className="detailed">
        <Row className="detailed-h" gutter={[16, 8]}>
          <Col xs={{ span: 12 }} lg={{ span: 13 }}>
            <h1 style={{marginTop: '10px'}}>Documentation Changelog
            </h1>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 11 }} style={{textAlign: 'end'}}>
            <Button className="btn-transparent" onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
          </Col>
        </Row>
        <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white'}}>
          <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c', fontWeight: '500'}}>
            <p style={{color: '#11093c'}}>v1.2 - July 7, 2022</p>
            <ul>
              <li>Library update MapboxGL v2</li>
              <li>Replace problem dataset and references</li>
              <li>New graphical filter view</li>
              <li>General bug and UI fixes across mapping management, create project, and main map view</li>
              <li>New Mapbox Sky API showing atmospheric view in the 'Component' 3D view</li>
              <li>Update project status in the Work Request and Work Plan</li>
            </ul>
            <p style={{color: '#11093c'}}>v1.1 - May 6, 2022</p>
            <ul>
              <li>New Map Measurement, Notes and History functions for an improved user experience</li>
              <li>Bug fixes for pop-ups</li>
              <li>Refactored source code eliminating deprecated libraries, component, and functions</li>
              <li>Updated project and problem costs based on the total cost of corresponding components</li>
              <li>Added UI Improvements showing inputs required when creating a project</li>
              <li>Map layer adjustments to Block Clearance Zones, Streams, Studies (Projects). Service Area Labeling, and Stream Management Corridors</li>
            </ul>
          </Col>
        </Row>
      </div>
    </Modal>
  )
};

export default VersionNumber;
