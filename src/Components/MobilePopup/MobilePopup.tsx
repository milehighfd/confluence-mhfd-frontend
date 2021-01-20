import React, {useState} from "react";
import { Alert,  Modal, Button, Card, Carousel } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const stateValue = {
  visible: false
}
export default (items: any) => {
  console.log('my items ', items);
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
  const card = (data: any) => (
    <div>
      <div className="popup-mobile">
        <div style={{width: '40%'}}><img src="/Icons/eje.png" alt="" /></div>
        <div style={{width: '60%', padding: '10px'}}>
          {data.title && data.type === 'problems' && <h4>{data.title}</h4>}
          {data.projecctype && <h4>{data.projecctype}</h4>}
          {data.layer && <h4>{data.layer}</h4>}
          {data.feature && <h6>{data.feature}</h6>}
          {data.mepstatus && <h6>{data.mepstatus}</h6>}
          {data.name && <h6>{data.name}</h6>}
          {data.subtype && <h6>{data.subtype}</h6>}
          {data.status && <h6>{data.status}</h6>}
          {data.hydgrpdcd && <h6>{data.hydgrpdcd}</h6>}
          {data.muname && <h6>{data.muname}</h6>}
          {data.dam_name && <h6>{data.dam_name}</h6>}
          {data.hazard_class && <h6>{data.hazard_class}</h6>}
          {data.value && <p><b>${data.value}</b> </p>}
        </div>
      </div>
    </div>
  );
 return   <div>

            <div className="poup-map-mobile">
              <Carousel autoplay>
                {items && items.length && items.map((item: any) => {
                  return card(item);
                })}
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
