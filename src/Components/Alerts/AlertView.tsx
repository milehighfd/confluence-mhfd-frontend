import React, {useState} from "react";
import { Alert,  Modal, Button, Card, Carousel } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const stateValue = {
  visible: false
}
export default () => {
  const [state, setState] = useState(stateValue);
  const showModal = () => {
    const auxState = {...state};
    auxState.visible = true;
    setState(auxState);
  };

  const handleOk = (e: any) => {
    console.log(e);
    const auxState = {...state};
    auxState.visible = false;
    setState(auxState);
  };

  const handleCancel = (e: any) => {
    console.log(e);
    const auxState = {...state};
    auxState.visible = false;
    setState(auxState);
  };
 return   <div>
            <div className="alert-mm">
              <Alert type="error" message="Jon Villines just commented on your project 'Piney Creek Channel Restoration'" banner />
            </div>
            <div >
              <Button type="primary" onClick={showModal}>
                 Open Modal
               </Button>
               <Modal
                 centered
                 visible={state.visible}
                 onOk={handleOk}
                 onCancel={handleCancel}
                 className="modal-confirm"
                 width="400px"
               >
                 <h2>Are you sure want to submit the draft project?</h2>
                 <button className="btn-borde">Cancel</button>
                 <button className="btn-purple">Submit</button>
               </Modal>
            </div>

            <div className="map-pop-02">
              <div className="headmap">LAYERS</div>
              <div className="layer-popup">
                <Button className="btn-transparent"><img src="/Icons/icon-75.svg" alt=""/> Detention Facilities <RightOutlined /></Button>
                <div className="map-pop-00">
                  <Card hoverable>
                    <div className="bodymap">
                      <h4>Irondale Gulch - Montbello Tributary @ Upper Irondale Gulch Watershed 2019</h4>
                      <h6>Denver</h6>
                      <h5>$$2,134,000 <span style={{float: 'right'}}><b>4</b> Components</span></h5>
                      <hr/>
                      <div style={{display: 'flex', width:'100%', marginTop: '12px'}}>
                        <p>Capital</p>
                        <span>Initiated</span>
                      </div>
                    </div>
                    <div style={{ padding: '10px', marginTop: '-15px', color: '#28C499', display:'flex'}}>
                        <Button  style={{ width: '50%', marginRight: '10px'}} className="btn-purple">Create Project</Button>
                        <Button  style={{ width: '50%', color: '#28C499' }} className="btn-borde">See Details</Button>
                    </div>
                  </Card>
                </div>
              </div>
              <div className="layer-popup">
                <Button className="btn-transparent"><img src="/Icons/icon-76.svg" alt=""/> Problems <RightOutlined /></Button>
                <div className="map-pop-00">
                  <Card hoverable>
                    <div className="bodymap">
                      <h4>Irondale Gulch - Montbello Tributary @ Upper Irondale Gulch Watershed 2019</h4>
                      <h6>Denver</h6>
                      <h5>$$2,134,000 <span style={{float: 'right'}}><b>4</b> Components</span></h5>
                      <hr/>
                      <div style={{display: 'flex', width:'100%', marginTop: '12px'}}>
                        <p>Capital</p>
                        <span>Initiated</span>
                      </div>
                    </div>
                    <div style={{ padding: '10px', marginTop: '-15px', color: '#28C499', display:'flex'}}>
                        <Button  style={{ width: '50%', marginRight: '10px'}} className="btn-purple">Create Project</Button>
                        <Button  style={{ width: '50%', color: '#28C499' }} className="btn-borde">See Details</Button>
                    </div>
                  </Card>
                </div>
              </div>
              <div className="layer-popup">
                <Button className="btn-transparent"><img src="/Icons/icon-75.svg" alt=""/> Watersheds <RightOutlined /></Button>
                <div className="map-pop-00">
                  <Card hoverable>
                    <div className="bodymap">
                      <h4>Irondale Gulch - Montbello Tributary @ Upper Irondale Gulch Watershed 2019</h4>
                      <h6>Denver</h6>
                      <h5>$$2,134,000 <span style={{float: 'right'}}><b>4</b> Components</span></h5>
                      <hr/>
                      <div style={{display: 'flex', width:'100%', marginTop: '12px'}}>
                        <p>Capital</p>
                        <span>Initiated</span>
                      </div>
                    </div>
                    <div style={{ padding: '10px', marginTop: '-15px', color: '#28C499', display:'flex'}}>
                        <Button  style={{ width: '50%', marginRight: '10px'}} className="btn-purple">Create Project</Button>
                        <Button  style={{ width: '50%', color: '#28C499' }} className="btn-borde">See Details</Button>
                    </div>
                  </Card>
                </div>
              </div>
              <div className="layer-popup">
                <Button className="btn-transparent"><img src="/Icons/icon-76.svg" alt=""/> MEP Referrals <RightOutlined /></Button>
                <div className="map-pop-00">
                  <Card hoverable>
                    <div className="bodymap">
                      <h4>Irondale Gulch - Montbello Tributary @ Upper Irondale Gulch Watershed 2019</h4>
                      <h6>Denver</h6>
                      <h5>$$2,134,000 <span style={{float: 'right'}}><b>4</b> Components</span></h5>
                      <hr/>
                      <div style={{display: 'flex', width:'100%', marginTop: '12px'}}>
                        <p>Capital</p>
                        <span>Initiated</span>
                      </div>
                    </div>
                    <div style={{ padding: '10px', marginTop: '-15px', color: '#28C499', display:'flex'}}>
                        <Button  style={{ width: '50%', marginRight: '10px'}} className="btn-purple">Create Project</Button>
                        <Button  style={{ width: '50%', color: '#28C499' }} className="btn-borde">See Details</Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            <div className="poup-map-mobile">
              <Carousel autoplay>
                <div>
                  <div className="popup-mobile">
                    <div style={{width: '40%'}}><img src="/Icons/eje.png" alt="" /></div>
                    <div style={{width: '60%', padding: '10px'}}>
                      <h4>Baseline Road at Dry Creek Ditch No. 3</h4>
                      <h6>Boulder County</h6>
                      <p><b>$2,500,0000</b> <span> Components</span></p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="popup-mobile">
                    <div style={{width: '40%'}}><img src="/Icons/eje.png" alt="" /></div>
                    <div style={{width: '60%', padding: '10px'}}>
                      <h4>Baseline Road at Dry Creek Ditch No. 3</h4>
                      <h6>Boulder County</h6>
                      <p><b>$2,500,0000</b> <span> Components</span></p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="popup-mobile">
                    <div style={{width: '40%'}}><img src="/Icons/eje.png" alt="" /></div>
                    <div style={{width: '60%', padding: '10px'}}>
                      <h4>Baseline Road at Dry Creek Ditch No. 3</h4>
                      <h6>Boulder County</h6>
                      <p><b>$2,500,0000</b> <span> Components</span></p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="popup-mobile">
                    <div style={{width: '40%'}}><img src="/Icons/eje.png" alt="" /></div>
                    <div style={{width: '60%', padding: '10px'}}>
                      <h4>Baseline Road at Dry Creek Ditch No. 3</h4>
                      <h6>Boulder County</h6>
                      <p><b>$2,500,0000</b> <span> Components</span></p>
                    </div>
                  </div>
                </div>
              </Carousel>
            </div>
         </div>

};
