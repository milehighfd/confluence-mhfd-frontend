import * as React from "react";
import { Row, Timeline, Col } from "antd";

export default (props: any) => {

    return <Row>
        <Col span={9}>
            <Timeline>
                <Timeline.Item className="line-00" color={props.data.color}>
                    <p><div className="line-02"></div> {props.data.field1} <img className="img-h" src={props.data.image} alt="" /></p>
                </Timeline.Item>
            </Timeline>
        </Col>
        <Col span={5}>
            <p> {props.data.field2} </p>
        </Col>
        <Col span={4}>
            <p> {props.data.field3} </p>
        </Col>
        <Col span={6}>
            <p> {props.data.field4} </p>
        </Col>
    </Row>
}
