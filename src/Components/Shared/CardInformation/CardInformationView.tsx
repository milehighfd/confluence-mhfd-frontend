import * as React from "react";
import { Col, Card } from "antd";

export default ({ data, type, numberWithCommas }: { data: any, type: string, numberWithCommas?: Function}) => {
    

    return <Col span={8}>
        <Card
            hoverable
            style={{width: '100%'}}
            className="card-information"
            cover={
                data.mainImage ? <img alt="example" src={data.mainImage} /> : <img alt="example" src="/Icons/eje.png" />
            }
        >
            <div style={{height: 40}}>
                <h4>{data.requestName}</h4>
            </div>
            <h6>{data.jurisdiction?data.jurisdiction:'No County'}</h6>
        {/* <h5>${numberWithCommas!(data.finalCost?data.finalCost:data.estimatedCost)} <span style={{ float: 'right' }}><b>{ data.components ? (data.components.length ? '$' + JSON.parse(data.components[0]).length + 'Components' : '') : '' }</b> </span></h5> */}
        <h5>{data.finalCost}</h5>
            <hr />
            {type === 'Problems' ? (
                <div style={{ display: 'flex', width: '100%' }}>
                    <p style={{ color: 'red', width: '50%' }}>{data.priority}</p>
                    <span style={{ textAlign: 'right', width: '50%' }}>{data.percentage}</span>
                </div>
            ) : (
                    <div style={{ display: 'flex', width: '100%' }}>
                        <p style={{ color: ' #11093c', width: '50%', opacity: '0.6' }}>{data.projectType === 'propertyAcquisition' ? 'acquisition' : data.projectType }</p>
                        <span style={{ textAlign: 'right', width: '50%', color: ' #11093c', opacity: '0.6' }}>{data.status}</span>
                    </div>
                )}
        </Card>
    </Col>
}