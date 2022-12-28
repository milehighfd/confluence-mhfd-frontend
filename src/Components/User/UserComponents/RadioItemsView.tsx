import React from "react";
import { Col, Radio } from "antd";

const RadioItemsView = ({index, value, name}: {index: number, value: string, name: string}) => {
    console.log('valueee',value)
    return <Col key={index} span={4}>
        <div className="user-card">
            <p><Radio value={value}></Radio></p>
            <div className="user-d"><h6>{name}</h6></div>
        </div>
    </Col>
};

export default RadioItemsView;
