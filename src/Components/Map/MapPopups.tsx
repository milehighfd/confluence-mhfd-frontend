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

export const MainPopup = ({ trigger, item } : any) => (
    <div className="map-pop-00">
      <Card hoverable>
        <div className="headmap">
            {trigger === 'problems'?'PROBLEM':'PROJECT'}
        </div>
        <div className="bodymap">
          <h4>{item.requestName}</h4>
          <h6>{item.jurisdiction}</h6>
          <h5>${numberWithCommas(item.estimatedCost)} <span style={{float: 'right'}}><b>5</b> Components</span></h5>
          <hr/>
          <div style={{display: 'flex', width:'100%', marginTop: '12px'}}>
            <p style={trigger === 'problems'?problemStyle.status:projectStyle.status}>{trigger === 'problems'?'High Priority':capitalize(item.projectType)}</p>
            <span style={{color: trigger!=='problems'?'#11093c':'', opacity: trigger !== 'problems'?'0.6':'', textAlign: 'right', width:'50%', marginBottom:'0px'}}>{trigger === 'problems'?'80%':capitalize(item.status)}</span>
          </div>
        </div>
      </Card>
    </div>
);

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
