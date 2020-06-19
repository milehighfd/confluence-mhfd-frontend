import React from 'react';
import { Col, Card } from 'antd';

import { ComponentType } from '../../../Classes/MapTypes';

export default ({ data, type, numberWithCommas }: { data: any, type: string, numberWithCommas: Function}) => {
    const getComponentSizes = (components : Array<ComponentType>) => {
        if (components && components.length) {
            let sideText = ' Components';
            if (components.length === 1) {
                sideText = sideText.slice(0, -1);
            }
            return components.length + sideText;
        } else {
            return '';
        }
    }
    return <Col span={6}>
    <Card
        hoverable
        style={{width: '100%'}}
        className="card-information"
        cover={
            data.mainImage ? <img alt="example" src={data.mainImage} /> : <img alt="example" src="/Icons/default.png" />
        }
    >
        <div style={{height: 40}}>
            <h4>{data.requestName}</h4>
        </div>
        {type === 'Problems' ? <h6>{data.county ? data.county : 'No County'}</h6> :
        <h6>{data.county ? data.county : 'No Sponsor'}</h6>}

        <h5>${numberWithCommas(data.finalCost?data.finalCost:data.estimatedCost)} <span style={{ float: 'right' }}><b>{getComponentSizes(data.components)}</b> </span></h5>
        <hr />
        {type === 'Problems' ? (
            <div style={{ display: 'flex', width: '100%' }}>
                <p style={{ color: 'red', width: '65%', fontSize: '13px' }}>{data.priority}</p>
                <span style={{ textAlign: 'right', width: '35%', fontSize: '13px' }}>{data.percentage}</span>
            </div>
        ) : (
                <div style={{ display: 'flex', width: '100%' }}>
                    <p style={{ color: ' #11093c', width: '65%', opacity: '0.6', fontSize: '13px' }}>{data.projecttype }</p>
                    <span style={{ textAlign: 'right', width: '35%', color: ' #11093c', opacity: '0.6', fontSize: '13px' }}>{data.status}</span>
                </div>
            )}
    </Card>
</Col>
}
