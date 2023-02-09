import React from "react";
import { Col, Radio } from "antd";

const RadioDesignation = ({index, value, name}: {index: number, value: string, name: string}) => {
    //console.log('valueee',value)
    return  <Radio value={value} style={{marginBottom: '10px', width:'45%'}} >{name}</Radio>
    
    // <Col key={index} span={4}>
    //     <div className="user-card">
    //         <p><Radio value={value}></Radio></p>
    //         <div className="user-d"><h6>{name}</h6></div>
    //     </div>
    // </Col>
};

export default RadioDesignation;
