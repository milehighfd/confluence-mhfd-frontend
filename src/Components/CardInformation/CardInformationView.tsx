import * as React from "react";
import { Col, Card } from "antd";

export default (props: any) => {
    const a = [];
    if (props.type === 'Problems') {
        a.push(<div style={{ display: 'flex', width: '100%' }}>
            <p style={{ color: 'red', width: '50%' }}>{props.data.field6}</p>
            <span style={{ textAlign: 'right', width: '50%' }}>{props.data.field7}</span>
        </div>)
    } else {
        a.push(<div style={{ display: 'flex', width: '100%' }}>
            <p style={{ color: ' #11093c', width: '50%', opacity: '0.6' }}>Maintenance</p>
            <span style={{ textAlign: 'right', width: '50%', color: ' #11093c', opacity: '0.6' }}>Requested</span>
        </div>)
    }

    return <Col span={8}>
        <Card
            hoverable
            style={{ width: '100%' }}
            cover={<img alt="example" src={props.data.image} />}
        >
            <h4>{props.data.field1}</h4>
            <h6>{props.data.field2}</h6>
            <h5>{props.data.field3} <span style={{ float: 'right' }}><b>{props.data.field4}</b> Components</span></h5>
            <hr />
            {props.type === 'Problems' ? (
                <div style={{ display: 'flex', width: '100%' }}>
                    <p style={{ color: 'red', width: '50%' }}>{props.data.field6}</p>
                    <span style={{ textAlign: 'right', width: '50%' }}>{props.data.field7}</span>
                </div>
            ) : (
                    <div style={{ display: 'flex', width: '100%' }}>
                        <p style={{ color: ' #11093c', width: '50%', opacity: '0.6' }}>Maintenance</p>
                        <span style={{ textAlign: 'right', width: '50%', color: ' #11093c', opacity: '0.6' }}>Requested</span>
                    </div>
                )}
        </Card>
    </Col>
}