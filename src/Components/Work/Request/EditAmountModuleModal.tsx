import { Col, Input, Modal, Row } from 'antd';
import React, { useEffect } from 'react';

const EditAmountModuleModal = ({ project, visible, setVisible }: {project: any; visible: boolean; setVisible: Function }) => {
  
  const statusColor:any = {
    1: {color: '#FF8938', backgroundColor: 'rgba(255, 221, 0, 0.3)', projectStatus: 'Draft'},
    2: {color: '#9309EA', backgroundColor: 'rgba(94, 61, 255, 0.15)', projectStatus: 'Requested'},
    3: {color: '#139660', backgroundColor: 'rgba(143, 252, 83, 0.3)', projectStatus: 'Approved'},
    8: {color: '#FF0000', backgroundColor: 'rgba(255, 0, 0, 0.08)', projectStatus: 'Cancelled'},
    5: {color: '#139660', backgroundColor: 'rgba(143, 252, 83, 0.3)', projectStatus: 'Active'},
    9: {color: '#9309EA', backgroundColor: 'rgba(204, 146, 240, 0.2)', projectStatus: 'Closed'},
  }
  const defaultColor = {color: '#FF8938', backgroundColor: 'rgba(255, 221, 0, 0.3)', projectStatus: ''}

  useEffect(() => {
    console.log('project', project);
    console.log(listCounties(project))
  }, [project]);

  const listCounties = (project:any) =>{
    let counties = '';
    project?.projectData?.project_counties?.forEach((element: any) => {
      counties = counties + element.county_name + ', ';
    });
    return counties.slice(0, counties.length - 2);
  }

  const listServiceAreas = (project:any) =>{
    let serviceArea = '';
    project?.projectData?.project_service_areas?.forEach((element: any) => {
      serviceArea = serviceArea + element.service_area_name + ', ';
    });
    return serviceArea.slice(0, serviceArea.length - 2);
  }
  
    const getColorAndStatus = (status: string) => {
      const {color, backgroundColor, projectStatus} = statusColor[status] || defaultColor;
      return <span style={{color, backgroundColor}}>{projectStatus}</span>;
    }

  return (
    <Modal
      visible={visible}
      centered
      onCancel={() => setVisible(false)}
      className="edit-amount-modal"
      okText="Save"
      cancelText="Clear"
    >
      <Row className="edit-amount-modal-header">
        <Col className="edit-amount-modal-header-text">
          <h2>{project?.projectData?.project_name}</h2>
          <p>{project?.projectData?.code_project_type?.project_type_name} Project • {listCounties(project)} County • {listServiceAreas(project)} Service Area</p>
        </Col>
        <Col>
          <p>Status</p>
          {getColorAndStatus(project?.code_status_type_id)}
        </Col>
        <Col>
          <p>Phase</p>
          <span style={{ backgroundColor: '#E3EDF5', color: '#288CC4' }}>Consultant Procurement</span>
        </Col>
        <Col>
          <p>Estimated Cost</p>
          <h1>$5,262,129</h1>
        </Col>
      </Row>
      <Col className="edit-amount-modal-body">
        <Row className="edit-amount-modal-body-title">
          How much funding is the Local Government providing and requesting from MHFD?
        </Row>
        <div className="edit-amount-modal-body-table">
          <Row className="edit-amount-modal-body-table-title">
            <Col>Years</Col>
            <Col>MHFD Funding</Col>
            <Col>
              Arvada <p>Sponsor</p>
            </Col>
            <Col>
              Westiminister <p>Co-Sponsor</p>
            </Col>
            <Col>
              Broomfield <p>Co-Sponsor</p>
            </Col>
          </Row>
          <Row>
            <Col>Prior Funding</Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'500.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'500.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'500.000'} />
            </Col>
          </Row>
          <Row>
            <Col>2023</Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'250.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'250.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'250.000'} />
            </Col>
          </Row>
          <Row>
            <Col>2023</Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
          </Row>
          <Row>
            <Col>2023</Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
          </Row>
          <Row>
            <Col>2023</Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
            <Col>
              <Input prefix="$" defaultValue={'100.000'} />
            </Col>
          </Row>
          <Row className="edit-amount-modal-body-table-sum">
            <Col>Total Sum Requested</Col>
            <Col>$500.000</Col>
            <Col>$1,050,000</Col>
            <Col>$1,050,000</Col>
            <Col>$1,050,000</Col>
          </Row>
          <Row className="edit-amount-modal-body-table-total">
            <Col>Total Combined Funding</Col>
            <Col>$4,320,500</Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </div>
      </Col>
    </Modal>
  );
};

export default EditAmountModuleModal;
