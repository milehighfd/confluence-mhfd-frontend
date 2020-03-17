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

export const MainPopup = ({ trigger, name, jurisdiction } : any) => (
    <div className="map-pop-00">
      <Card hoverable>
        <div className="headmap">
            {trigger === 'problems'?'PROBLEM':'PROJECT'}
        </div>
        <div className="bodymap">
          <h4>{name}</h4>
          <h6>{jurisdiction}</h6>
          <h5>$400,500 <span style={{float: 'right'}}><b>5</b> Components</span></h5>
          <hr/>
          <div style={{display: 'flex', width:'100%', marginTop: '12px'}}>
            <p style={trigger === 'problems'?problemStyle.status:projectStyle.status}>{trigger === 'problems'?'High Priority':'Mantenance'}</p>
            <span style={{color: trigger!=='problems'?'#11093c':'', opacity: trigger !== 'problems'?'0.6':'', textAlign: 'right', width:'50%', marginBottom:'0px'}}>{trigger === 'problems'?'80%':'Requested'}</span>
          </div>
        </div>
      </Card>
    </div>
);

export const ComponentPopup = ({ name, jurisdiction, studyName } : any) => (
    <div className="map-pop-01">
        <Card hoverable>
        <div className="headmap">
            Component
        </div>
        <div className="bodymap">
            <h4>{name}</h4>
            <p><i>Name:</i> 32nd Ave Culvert</p>
            <p><i>Status:</i> Active</p>
            <p><i>Estimated Cost:</i> $500,000</p>
            <p><i>Study Name:</i> {studyName}</p>
            <p><i>Jurisdiction:</i> {jurisdiction}</p>
            <p><i>Remove sediment and restore channel to natural condition while improving conveyance.</i></p>
        </div>
        </Card>
    </div>
);
