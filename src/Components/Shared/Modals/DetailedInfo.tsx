import React from 'react';
import { Row, Col } from 'antd';
import { Detailed } from '../../../store/types/detailedTypes';

export default ({ detailedPage }: { detailedPage: Detailed }) => {
  const detailed = detailedPage as any;
  return <div className="detailed-info">
    {detailed.problemid && <>
      <Row>
        <Col span={4}>
          <label><i>Stream</i></label>
        </Col>
        <Col span={8}>
          <p>{detailed.streamname ? detailed.streamname : '-'}</p>
        </Col>
        <Col span={4}>
          <label><i>Priority</i></label>
        </Col>
        <Col span={8}>
          <p style={{width: '35%', color: ' #11093c', opacity: '0.6', fontSize: '13px' }}> {detailed.problempriority ? detailed.problempriority : '-'} </p>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <label><i>Source Name</i></label>
        </Col>
        <Col span={8}>
          <p>{detailed.sourcename ? detailed.sourcename : '-'}</p>
        </Col>
        <Col span={4}>
          <label><i>Source</i></label>
        </Col>
        <Col span={8}>
          <p>{detailed.source ? detailed.source : '-'}</p>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <label><i>Description</i></label>
        </Col>
        <Col span={20}>
          <p>{detailed.problemdescription ? detailed.problemdescription : '-'}</p>
        </Col>
      </Row>
    </>}
    {detailed.projecttype && <>
      <Row>
        <Col span={4}>
          <label><i>Stream</i></label>
        </Col>
        <Col span={8}>
          <p>{detailed.streamname}</p>
        </Col>
        { detailed.projecttype === 'Capital' ? <>
        <Col span={4}>
          <label><i>Start Year</i></label>
        </Col>
        <Col span={8}>
          <p>{detailed.startyear ? detailed.startyear : '-'}</p>
        </Col>
        </> : <>
        <Col span={4}>
          <label><i>Subtype</i></label>
        </Col>
        <Col span={8}>
          <p>{detailed.projectsubtype ? detailed.projectsubtype : '-'}</p>
        </Col>
        </>}
      </Row>

      { detailed.projecttype === 'Maintenance' && <Row>
        <Col span={4}>
          <label><i>Project Status</i></label>
        </Col>
        <Col span={8}>
          <p>{detailed.status ? detailed.status : '-'}</p>
        </Col>
        <Col span={4}>
          <label><i>Frequency</i></label>
        </Col>
        <Col span={8}>
          <p>{detailed.frequency ? detailed.frequency + ' times per year' : '-'}</p>
        </Col>
      </Row>}
      {(detailed.projecttype === 'Maintenance' && detailed.projectsubtype !== 'Debris Management') && <Row>
        <Col span={4}>
          <label><i>Completed Year</i></label>
        </Col>
        <Col span={20}>
          <p>{detailed.completedyear ? detailed.completedyear : '-'}</p>
        </Col>
      </Row>
      }
      { detailed.projecttype === 'Capital' && <Row>
        <Col span={4}>
          <label><i>Completed Year</i></label>
        </Col>
        <Col span={8}>
          <p>{detailed.completedyear ? detailed.completedyear : '-'}</p>
        </Col>
        <Col span={4}>
          <label><i>LG Manager</i></label>
        </Col>
        <Col span={8}>
          <p>{detailed.lgmanager ? detailed.lgmanager : '-'}</p>
        </Col>
      </Row>}
      {detailed.projecttype === 'Capital' && <Row>
        <Col span={4}>
          <label><i>MHFD Manager</i></label>
        </Col>
        <Col span={20}>
          <p>{detailed.mhfdmanager ? detailed.mhfdmanager : '-'}</p>
        </Col>
      </Row>}
      {(detailed.problemtype || (detailed.projecttype === 'Capital')) && <Row>
        <Col span={4}>
          <label><i>Description</i></label>
        </Col>
        <Col span={20}>
          <p>{detailed.description ? detailed.description : '-'}</p>
        </Col>
      </Row>
      }
      {detailed.projecttype === 'Study' && <Row>
        <Col span={4}>
          <label><i>Tributary A</i></label>
        </Col>
        <Col span={8}>
          <p>-</p>
        </Col>
        <Col span={4}>
          <label><i>Tributary B</i></label>
        </Col>
        <Col span={8}>
          <p>-</p>
        </Col>
      </Row> }
      {detailed.projecttype === 'Study' && <Row>
        <Col span={4}>
          <label><i>Start Year</i></label>
        </Col>
        <Col span={8}>
          <p>{detailed.startyear ? detailed.startyear : '-'}</p>
        </Col>
        <Col span={4}>
          <label><i>Completed Year</i></label>
        </Col>
        <Col span={8}>
          <p>{detailed.completedyear ? detailed.completedyear : '-'}</p>
        </Col>
      </Row> }
    </>}
  </div>
}
