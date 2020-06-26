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
            data.problemtype ? <img alt="example" src={`gallery/${data.problemtype}.jpg`} /> : 
            
            data.attachments ? <img alt="example" src={data.attachments} />  : (
                data.projecttype === 'Capital' ? <img alt="example" src="projectImages/capital.png" /> :
                data.projecttype === 'Study' ? <img alt="example" src="projectImages/study.png" /> :
                data.projecttype === 'Maintenance' ?
                (data.projectsubtype === 'Vegetation Mangement' ? <img alt="example" src="projectImages/maintenance_vegetationmanagement.png" />  :
                data.projectsubtype === 'Sediment Removal' ? <img alt="example" src="projectImages/maintenance_sedimentremoval.png" /> :
                data.projectsubtype === 'Restoration' ? <img alt="example" src="projectImages/maintenance_restoration.png" />  :
                data.projectsubtype === 'Minor Repairs' ? <img alt="example" src="projectImages/maintenance_minorrepairs.png" />  :
                <img alt="example" src="projectImages/maintenance_debrismanagement.png" /> ): <img alt="example" src="Icons/eje.png" />
              )
            
        }
    >
        <div style={{height: 40}}>
            {type === 'Problems' ? <h4>{data.problemname} </h4> : <h4>{data.projectname} </h4> }
            
        </div>
        {type === 'Problems' ? <h6>{data.county ? data.county : 'No County'}</h6> :
        <h6>{data.county ? data.county : 'No Sponsor'}</h6>}

        <h5>${numberWithCommas(data.solutioncost?data.solutioncost:data.estimatedCost)} <span style={{ float: 'right' }}><b>{getComponentSizes(data.components)}</b> </span></h5>
        <hr />
        {type === 'Problems' ? (
            <div style={{ display: 'flex', width: '100%' }}>
                <p style={{ color: 'red', width: '65%', fontSize: '13px' }}>{data.problempriority}</p>
                <span style={{ textAlign: 'right', width: '35%', fontSize: '13px' }}>{data.solutionstatus}</span>
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
