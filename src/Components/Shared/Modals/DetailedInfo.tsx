import React from 'react';
import { Row, Col } from 'antd';
import { Detailed } from '../../../store/types/detailedTypes';

const DetailedInfo = ({ detailedPage }: { detailedPage: any }) => {
  const detailed = detailedPage as any;
  const getYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  }
  return <div className="detailed-info">
    {detailed?.problemid && <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Stream</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.streamname ? detailed?.streamname : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Priority</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p style={{width: '35%', color: ' #11093c', opacity: '0.6', fontSize: '13px' }}> {detailed?.problempriority ? detailed?.problempriority : 'N/A'} </p>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Source Name</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.sourcename ? detailed?.sourcename : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Source</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.source ? detailed?.source : 'N/A'}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Description</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.problemdescription ? detailed?.problemdescription : 'N/A'}</p>
        </Col>
      </Row>
    </>}
    {detailedPage?.project_status?.code_phase_type?.code_project_type?.project_type_name && <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Stream</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{'N/A'}</p>
        </Col>
        { detailedPage?.project_status?.code_phase_type?.code_project_type?.project_type_name.includes('Capital') ? <>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Start Year</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.created_date ? getYear(detailed?.created_date) : 'N/A'}</p>
        </Col>
        </> : <>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Subtype</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailedPage?.project_status?.code_phase_type?.code_project_type?.project_type_name ? 
            detailedPage?.project_status?.code_phase_type?.code_project_type?.project_type_name : 'N/A'
            }</p>
        </Col>
        </>}
      </Row>

      { detailed?.projecttype === 'Maintenance' && <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Project Status</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.status ? detailed?.status : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Frequency</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.frequency ? detailed?.frequency + ' times per year' : 'N/A'}</p>
        </Col>
      </Row>}
      {(detailed?.projecttype === 'Maintenance' && detailed?.projectsubtype !== 'Debris Management') && <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Completed Year</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 20 }}>
          <p>{detailed?.completedyear ? detailed?.completedyear : 'N/A'}</p>
        </Col>
      </Row>
      }
      { detailedPage?.project_status?.code_phase_type?.code_project_type?.project_type_name.includes('Capital') && <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Completed Year</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>LG Manager</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{'N/A'}</p>
        </Col>
      </Row>}
      {detailedPage?.project_status?.code_phase_type?.code_project_type?.project_type_name.includes('Capital') && <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>MHFD Lead/PM</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>OnBase</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.onbase_project_number ? detailed?.onbase_project_number : 'N/A'}</p>
        </Col>
      </Row>}
      {(detailed?.problemtype || (
        detailedPage?.project_status?.code_phase_type?.code_project_type?.project_type_name.includes('Capital')
      )) && <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Description</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 20 }}>
          <p>{detailed?.description ? detailed?.description : 'N/A'}</p>
        </Col>
      </Row>
      }
      {detailed?.projecttype === 'Study' && <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Tributary A</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>N/A</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Tributary B</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>N/A</p>
        </Col>
      </Row> }
      {detailed?.projecttype === 'Study' && <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Start Year</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.created_date ? getYear(detailed?.created_date) : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Completed Year</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{'N/A'}</p>
        </Col>
      </Row> }
    </>}
  </div>
};

export default DetailedInfo;
