import React from "react";
import { Col, Radio } from "antd";

export default ({index, value, name}: {index: number, value: string, name: string}) => {
    return <Col key={index} span={4}>
        <div className="user-card">
            <p><Radio value={value}></Radio></p>
            <div className="user-d"><h6>{name}</h6></div>
        </div>
    </Col>
}