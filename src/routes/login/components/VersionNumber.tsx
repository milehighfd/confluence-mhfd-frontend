import { Button, Col, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

const VersionNumber = ({visible, setVisible}: {visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <Modal
      className="detailed-version-login"
      centered= {true}
      style={{width:'70%'}}
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
            <p style={{ color: '#11093c', fontWeight: '500', paddingBottom: '10px' }}>v2.5 - December 22, 2023</p>
            <ul>
              <li>Enhanced workflow for transferring projects from the Work Plan to the Project Management Module</li>
              <li>New Import Project feature for any Work Request or Work Plan board</li>
              <li>Email all users - incl. Local Government staff, Consultants and Contractors, MHFD Staff, and MHFD Senior Managers - when the Work Plan is approved</li>
              <li>Email MHFD Staff and Senior Mangers when a Work Request is submitted by a Local Government</li>
              <li>New project activity logs within the Project Detail and Edit project views</li>
              <li>Require Consultants and Contractors to list their Organization when registering</li>
            </ul>
            <p style={{ color: '#11093c', fontWeight: '500', paddingBottom: '10px' }}>v2.4 - November 13, 2023</p>
            <ul>
              <li>New Project Discussion within the Create Project module and Project Profile</li>
              <li>New In-App and Email Notifications sent to Project Partners whose projects receive a discussion update</li>
              <li>New manually updated 'Actual Project Estimated Cost' within the Create Project module</li>
              <li>Update layer symbology for Streams; Projects; Projects in the Work Request & Work Plan; Problems; Proposed Actions; and Stream Management Corridors</li>              
            </ul>
            <p style={{ color: '#11093c', fontWeight: '500', paddingBottom: '10px' }}>v2.3 - October 10, 2023</p>
            <ul>
              <li>New Universal Search feature located in the header</li>
              <li>Updated design for the 'Edit Amount' module that allows users to capture various types of funding requests</li>
              <li>New 'Edit Amount' section in the Create/Edit Project Form</li>
              <li>New Action items creation workflow within the Project Management view</li>
              <li>Mapping updates for Stream Management Corridors, Problems, R&D projects and Studies</li>
              <li>New Financial Graphic within the project detail page</li>
              <li>Updated references from "Proposed Actions" to "Proposed Scope of Work" in the Create Project form for CIP projects</li>   
              <li>New 'Make Project Active' workflow that transfers a project from the Work Plan to the Project Management view</li>   
              <li>New 'Project Archive' feature within the card in the board views</li>   
              <li>New Editable 'Project Highlight' view within the Detail Page</li>                
            </ul>
            <p style={{ color: '#11093c', fontWeight: '500', paddingBottom: '10px' }}>v2.2 - September 5, 2023</p>
            <ul>
              <li>New List Views for the Main Map, Work Request and Work Plan views</li>
              <li>New Problem cluster design</li>
              <li>New Search bar in the Work Request and Work Plan</li>
              <li>Updated Main Map filter</li>
              <li>Mapping performance and bug fixes</li>              
            </ul>
            <p style={{color: '#11093c', fontWeight: '500', paddingBottom: '10px'}}>v2.1 - August 4, 2023</p>
            <ul>
                <li>Refreshed user interface with a new integrated map view that preserves the map state when transitioning between the main map, work request and work plan</li>
                <li>New table view in the Main Map</li>
                <li>Mapping performance enhancements and bug fixes</li>
                <li>Wider 'Create Project' module for easier navigation</li>
                <li>Interchangeable 'Create Project' worflows across all project types</li>
                <li>New 'Create Project' attributes that allow for assiging a project to a County (rather than outlining a geometry) or to the South Platte River</li>
                <li>General UI enhancements across all views</li>
            </ul>
            <p style={{color: '#11093c', fontWeight: '500', paddingBottom: '10px'}}>v2.0 - June 14, 2023</p>
            <ul>
                <li>First beta release with the following views sourced from the new Confluence Data Hub: Sign-Up, Main Map, My Confluence, User Settings, Project Detail Page, Problem Detail Page, Create Project (Capital, Maintenance, Studies, Acquisition, R&D), Work Request, Work Plan and List View (PM Tools)</li>
                <li>Browser Review based on Chrome, Firefox, Edge, and Safari</li>
                <li>Screen Resolution Review based on 1920x1080, 1440x700, 1440x900, 2560x1080, 2560x1440, 3840x2160</li>
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
