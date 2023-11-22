import React from 'react';
import { Col,  Row, } from 'antd';
import ListHistory from './ListHistory';
const History = ({projectId}: {projectId: any}) => {
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="detail-problems-component-header">
          <h3 className="detail-problems-component-title-header" id="history">HISTORY</h3>
          <div className="detail-problems-component-header-right"></div>
        </Col>
      </Row>
      <Row className="history-detailed-layout">
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className='history-detailed-body'>
        <ul className="list-history">
          <ListHistory projectId={projectId} />
          </ul>
        </Col>
      </Row>
    </>
  )
}

export default History;
