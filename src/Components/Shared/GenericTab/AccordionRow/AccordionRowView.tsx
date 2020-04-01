import * as React from "react";
import { Row, Timeline, Col } from "antd";

export default ({data, numberWithCommas} : {data: any, numberWithCommas: Function}) => {

    return <Row key={data.componentName}>
        <Col span={9}>
            <Timeline>
                <Timeline.Item className="line-00" color={data.color}>
                    <span><div className="line-02"></div> {data.componentName} <img className="img-h" src={data.image} alt="" /></span>
                </Timeline.Item>
            </Timeline>
        </Col>
        <Col span={5}>
            <p> {data.jurisdiction} </p>
        </Col>
        <Col span={4}>
            <p> ${numberWithCommas(data.howCost)} </p>
        </Col>
        <Col span={6}>
            <p> {data.studyName} </p>
        </Col>
    </Row>
}
