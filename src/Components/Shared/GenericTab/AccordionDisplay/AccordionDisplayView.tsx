import * as React from "react";
import { Row, Col, Progress } from "antd";

export default (props: any) => {
    return <Row className="tab-head">
        <Col span={9}>{props.requestName}</Col>
        <Col span={5}>{props.jurisdiction}</Col>
        <Col span={4}>{props.finalCost}</Col>
        <Col span={4} style={{ textAlign: 'center' }}>
            <p>90%</p>
            <Progress percent={90} showInfo={false} style={{ height: '4px !important' }} />
        </Col>
        <Col span={2}><img  src="/Icons/icon-20.svg" alt="" /></Col>
    </Row>
}