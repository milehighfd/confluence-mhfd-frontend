import React from 'react';
import { Card } from 'antd';

const problemStyle = {
    status: {
        color: 'red',
        width:'50%', 
        marginBottom:'0px'
    }
};

const projectStyle = {
    status: {
        color: '#11093c',
        opacity: '0.6',
        width:'50%', 
        marginBottom:'0px'
    }
}

const numberWithCommas = (x : number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const capitalize = (s : string) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export const MainPopup = ({ item } : any) => {
    for (const key in item) {
        if (!item[key]) {
            item[key] = '-';
        }
    }
    return <div className="map-pop-00">
      <Card hoverable>
        <div className="headmap">
            {capitalize(item.title)}
        </div>
        <div className="bodymap">
          <h4>{item.name}</h4>
          <h6>{item.organization}</h6>
          <h5>${numberWithCommas(item.value)} <span style={{float: 'right'}}><b>0</b> Components</span></h5>
          <hr/>
          <div style={{display: 'flex', width:'100%', marginTop: '12px'}}>
            <p style={item.type === 'problems' ? problemStyle.status:projectStyle.status}>{item.type === 'problems' ? item.priority : capitalize(item.projecctype)}</p>
            <span style={{color: item.type !=='problems' ? '#11093c' : '', opacity: item.type  !== 'problems' ? '0.6' : '', textAlign: 'right', width:'50%', marginBottom:'0px'}}>{item.type === 'problems' ? item.status : capitalize(item.status)}</span>
          </div>
        </div>
      </Card>
    </div>
};

export const ComponentPopup = ({ item } : any) => (
    <div className="map-pop-01">
        <Card hoverable>
        <div className="headmap">
            Component
        </div>
        <div className="bodymap">
            <h4>{item.componentName}</h4>
            <p><i>Name:</i> 32nd Ave Culvert</p>
            <p><i>Status:</i> Active</p>
            <p><i>Estimated Cost:</i> $500,000</p>
            <p><i>Study Name:</i> {item.studyName}</p>
            <p><i>Jurisdiction:</i> {item.jurisdiction}</p>
            <p><i>Remove sediment and restore channel to natural condition while improving conveyance.</i></p>
        </div>
        </Card>
    </div>
);
