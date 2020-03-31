import * as React from "react";
import { Row, Timeline, Col } from "antd";

export default (props: any) => {

    return <Row>
        <Col span={9}>
            <Timeline>
                <Timeline.Item className="line-00" color={props.data.color}>
                    <p><div className="line-02"></div> {props.data.componentName} <img className="img-h" src={props.data.image} alt="" /></p>
                </Timeline.Item>
            </Timeline>
        </Col>
        <Col span={5}>
            <p> {props.data.jurisdiction} </p>
        </Col>
        <Col span={4}>
            <p> {props.data.howCost} </p>
        </Col>
        <Col span={6}>
            <p> {props.data.studyName} </p>
        </Col>
    </Row>
}
