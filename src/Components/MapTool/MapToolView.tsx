import React, {useState} from "react";
import { Layout, Card} from 'antd';

const { Meta } = Card;


export default () => {
 return <div>

        <div className="map-pop-00">
          <Card hoverable>
            <div className="headmap">
              PROBLEM
            </div>
            <div className="bodymap">
              <h4>Piney Creek Channel Restoration</h4>
              <h6>Westminster</h6>
              <h5>$400,500 <span style={{float: 'right'}}><b>5</b> Components</span></h5>
              <hr/>
              <div style={{display: 'flex', width:'100%', marginTop: '12px'}}>
                <p style={{color: 'red', width:'50%', marginBottom:'0px'}}>High Priority</p>
                <span style={{textAlign: 'right', width:'50%', marginBottom:'0px'}}>80%</span>
              </div>
            </div>
          </Card>
        </div>

        <br></br>
        <div className="map-pop-00">
          <Card hoverable>
            <div className="headmap">
              Project
            </div>
            <div className="bodymap">
              <h4>Murphy Creek Bank Stabilization</h4>
              <h6>Westminster</h6>
              <h5>$400,500 <span style={{float: 'right'}}><b>5</b> Components</span></h5>
              <hr/>
              <div style={{display: 'flex', width:'100%', marginTop: '12px'}}>
                <p style={{color: ' #11093c', width:'50%', opacity: '0.6', marginBottom:'0px'}}>Maintenance</p>
                <span style={{textAlign: 'right', width:'50%',color: ' #11093c', opacity: '0.6', marginBottom:'0px'}}>Requested</span>
              </div>
            </div>
          </Card>
        </div>

        <br></br>
        <div className="map-pop-01">
          <Card hoverable>
            <div className="headmap">
              Component
            </div>
            <div className="bodymap">
              <h4>Little Dry Creek ARAP MDP Ph B</h4>
              <p><i>Name:</i> 32nd Ave Culvert</p>
              <p><i>Status:</i> Active</p>
              <p><i>Estimated Cost:</i> $500,000</p>
              <p><i>Study Name:</i> Little Dry Creek & Tributaries MDP</p>
              <p><i>Jurisdiction:</i> Arvada</p>
              <p><i>Remove sediment and restore channel to natural condition while improving conveyance.</i></p>
            </div>
          </Card>
        </div>

 </div>
};
