import * as React from "react";
import { Row, Col, Progress } from "antd";

export default () => {
    return <Row className="tab-head">
        <Col span={9}>Piney Creek Channel Restoration</Col>
        <Col span={5}>Westminster</Col>
        <Col span={4}>$450,200</Col>
        <Col span={4} style={{ textAlign: 'center' }}>
            <p>90%</p>
            <Progress percent={90} showInfo={false} style={{ height: '4px !important' }} />
        </Col>
        <Col span={2}><img src="/Icons/icon-20.svg" alt="" /></Col>
    </Row>
}