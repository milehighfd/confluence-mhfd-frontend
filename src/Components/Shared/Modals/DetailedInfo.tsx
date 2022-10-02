import React from 'react';
import { Row, Col } from 'antd';
import { Detailed } from '../../../store/types/detailedTypes';

const DetailedInfo = ({ detailedPage }: { detailedPage: Detailed }) => {
  const detailed = detailedPage as any;
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
    {detailed?.projecttype && <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Stream</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.streamname}</p>
        </Col>
        { detailed?.projecttype === 'Capital' ? <>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Start Year</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.startyear ? detailed?.startyear : 'N/A'}</p>
        </Col>
        </> : <>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Subtype</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.projectsubtype ? detailed?.projectsubtype : 'N/A'}</p>
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
      { detailed?.projecttype === 'Capital' && <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Completed Year</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.completedyear ? detailed?.completedyear : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>LG Manager</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.lgmanager ? detailed?.lgmanager : 'N/A'}</p>
        </Col>
      </Row>}
      {detailed?.projecttype === 'Capital' && <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>MHFD Manager</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.mhfdmanager ? detailed?.mhfdmanager : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>OnBase</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.onbaseid ? detailed?.onbaseid : 'N/A'}</p>
        </Col>
      </Row>}
      {(detailed?.problemtype || (detailed?.projecttype === 'Capital')) && <Row>
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
          <p>{detailed?.startyear ? detailed?.startyear : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Completed Year</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.completedyear ? detailed?.completedyear : 'N/A'}</p>
        </Col>
      </Row> }
    </>}
  </div>
};

export default DetailedInfo;
