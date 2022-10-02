import React, { useState } from 'react';
import { Row, Col } from 'antd';
import TeamModal from './TeamModal';
import { PlusOutlined } from '@ant-design/icons';

export default () => {
  const [selected, setSelected] = useState(true);
  return (
    <div className="chat-r" style={{opacity:'0.7'}}>
      <Row style={{paddingBottom: '15px'}}>
        <Col span={5}>
          <div
            className="chart-title"
            onClick={() => {setSelected(true)}}
            role="button"
            tabIndex={0}
          >
            <h5 className={selected ? 'active-title': ''}>Team</h5>
          </div>
        </Col>
        <Col span={16}>
          <div
            className="chart-title"
            onClick={() => {setSelected(false)}}
            role="button"
            tabIndex={1}
          >
            <h5 className={!selected ? 'active-title': ''}>Action Iteams</h5>
          </div>
        </Col>
        <Col span={2} style={{textAlign:'end'}}>
          <PlusOutlined />
        </Col>
      </Row>
      {selected && <TeamModal />}
    </div>
  )
}
