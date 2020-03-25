import * as React from "react";
import { Col, Card } from "antd";

export default (props: any) => {

    return <Col key={props.index} span={8}>
        <Card
            hoverable
            style={{ width: '100%' }}
            cover={
                props.data.mainImage ? <img alt="example" src={props.data.mainImage} height="122px" /> : <img alt="example" src="/Icons/eje.png" />
            }
        >
            <h4>{props.data.requestName}</h4>
            <h6>{props.data.jurisdiction}</h6>
            <h5>{props.data.estimatedCost} <span style={{ float: 'right' }}><b>4</b> Components</span></h5>
            <hr />
            {props.type === 'Problems' ? (
                <div style={{ display: 'flex', width: '100%' }}>
                    <p style={{ color: 'red', width: '50%' }}>{props.data.priority}</p>
                    <span style={{ textAlign: 'right', width: '50%' }}>{props.data.percentage}</span>
                </div>
            ) : (
                    <div style={{ display: 'flex', width: '100%' }}>
                        <p style={{ color: ' #11093c', width: '50%', opacity: '0.6' }}>{props.data.projectType === 'propertyAcquisition' ? 'acquisition' : props.data.projectType }</p>
                        <span style={{ textAlign: 'right', width: '50%', color: ' #11093c', opacity: '0.6' }}>{props.data.status}</span>
                    </div>
                )}
        </Card>
    </Col>
}