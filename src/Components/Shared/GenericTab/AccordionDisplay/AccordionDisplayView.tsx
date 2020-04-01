import * as React from "react";
import { Row, Col, Progress } from "antd";

export default ({ information, numberWithCommas } : { information: any, numberWithCommas: Function}) => {
    return <Row className="tab-head">
        <Col span={9}>{information.requestName}</Col>
        <Col span={5}>{information.jurisdiction}</Col>
        <Col span={4}>${numberWithCommas(information.finalCost?information.finalCost:information.estimatedCost)}</Col>
        <Col span={4} style={{ textAlign: 'center' }}>
            <p>90%</p>
            <Progress percent={90} showInfo={false} style={{ height: '4px !important' }} />
        </Col>
        <Col span={2}>{ information.components ? (information.components.length ? <img  src="/Icons/icon-20.svg" alt="" /> : '') : '' }</Col>
    </Row>
}