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
            <h1 style={{marginTop: '15px'}}>Documentation Changelog
            </h1>
          </Col>
          <Col xs={{ span: 12 }} lg={{ span: 11 }} style={{textAlign: 'end'}}>
            <Button className="btn-transparent" onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
          </Col>
        </Row>
        <Row className="detailed-h" gutter={[16, 8]} style={{backgroundColor: 'white'}}>
          <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c', overflowY: 'scroll', height: '400px'}} className='scroll-version'>
            <p style={{color: '#11093c', fontWeight: '500', paddingBottom: '10px'}}>V2.2 - April 1, 2023</p>
            <ul>
                <li>The following views are open for Review: My Confluence, Main Map (except for Action Filters), PM tools (except for Filters and List View Sort)</li>
                <li>New features and functionality include: redesigned guide overlay for each view, progress bar for each group within the PM Tools, expanded 'Vendor' table within the Detail Page, new icon for the Stream Improvement layer, and new terminology for Proposed Actions, Problem Groups, and Problems </li>
            </ul>
            <p style={{color: '#11093c', fontWeight: '500', paddingBottom: '10px'}}>V2.1 - March 31, 2023</p>
            <ul>
                <li>The following views are open for review: Main Map, My Confluence, Problem Detail Page, Project Detail Page, User Settings, Work Request, Work Plan, Create Project (x5), List View (PM Tools), Phase View, Schedule View</li>
                <li>Functionality under development include: Map Notes, Project map style, and the Schedule View (Editing dates), Detail Page Exports, the Attachments, and Notifications</li>
            </ul>
            <p style={{color: '#11093c', fontWeight: '500', paddingBottom: '10px'}}>v2.0 - March 17, 2023</p>
            <ul>
                <li>First beta release with the following views sourced from the new Confluence Data Hub: Sign-Up, Main Map, My Confluence, User Settings, Project Detail Page, Problem Detail Page, Create Project (Capital, Maintenance, Studies, Acquisition, R&D), Work Request, Work Plan and List View (PM Tools)</li>
                <li>Browser Review based on Chrome, Firefox, Edge, and Safari</li>
                <li>Screen Resolution Review based on 1920x1080, 1440x700, 1440x900, 2560x1080, 2560x1440, 3840x2160</li>
                <li>The following views remain under development: the Phase View and the Calendar View</li>
                <li>The following features remain under development: Share URL, Export Detail Pages, the Financial Section (Detail Pages), Attachments, and Notifications</li>
                <li>Notable issues to be addressed include project routing between the Work Request and Work Plan; project status update when approving the Work Request and Work Plan; password reset; year completed filter for projects; group by stream in the List View</li>
            </ul>
            <p style={{color: '#11093c', fontWeight: '500', paddingBottom: '10px'}}>v1.5 - January 12, 2023</p>
            <ul>
                <li>Improved usability and project card movement within the Work Request and Work Plan boards</li>
                <li>Improved performance in the Work Request and Work Plan boards</li>
                <li>Bug fixes related to the Work Plan filters and Project pop-ups</li>
                <li>New "Clear All" button in the Work Plan filters</li>
            </ul>
            <p style={{color: '#11093c', fontWeight: '500', paddingBottom: '10px'}}>v1.4 - October 3, 2022</p>
            <ul>
              <li>New priority label for Work Request/Plan cards</li>
              <li>New priority filter and reset inside Work Plans</li>
              <li>Copy projects from previous board years to the current Work Request/Plan</li>
              <li>Update Work Plan Maintenance budget layout inside Analytics</li>
            </ul>
            <p style={{color: '#11093c', fontWeight: '500', paddingBottom: '10px'}}>v1.3 - September 29, 2022</p>
            <ul>
              <li>Updated teams/chats placeholder in the project detail page</li>
              <li>Added problem parts, land use land cover, and stream improvement measure layers</li>
              <li>Added problem-based clustering</li>
              <li>New work request and work plan routing mechanism and design</li>
              <li>Improved uploader in the 'Create Project' module</li>
              <li>New problem parts section in the project detail page</li>
              <li>Updated design for map filters</li>
              <li>New card and detail page images by project type</li>
              <li>Improved design for work plan maintenance boards</li>
              <li>New 3D map sky view</li>
              <li>New login interface</li>
              <li>New feedback form in the sidebar</li>
            </ul>
            <p style={{color: '#11093c', fontWeight: '500', paddingBottom: '10px'}}>v1.2 - July 7, 2022</p>
            <ul>
              <li>Library update MapboxGL v2</li>
              <li>Replace problem dataset and references</li>
              <li>New graphical filter view</li>
              <li>General bug and UI fixes across mapping management, create project, and main map view</li>
              <li>New Mapbox Sky API showing atmospheric view in the 'Component' 3D view</li>
              <li>Update project status in the Work Request and Work Plan</li>
            </ul>
            <p style={{color: '#11093c', fontWeight: '500', paddingBottom: '10px'}}>v1.1 - May 6, 2022</p>
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
