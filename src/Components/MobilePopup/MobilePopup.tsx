import React, {useState} from "react";
import { Alert,  Modal, Button, Card, Carousel } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const stateValue = {
  visible: false
}
export default ({items}: {items: any}) => {
  console.log('my items ', items, items.item);
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
  const card = (data: any, index: number) => (
    <div key={'mobile-popup-' + index}>
      <div className="popup-mobile">
        <div style={{width: '40%'}}><img src="/Icons/eje.png" alt="" /></div>
        <div style={{width: '60%', padding: '10px'}}>
          {data.title && data.type === 'problems' && <h6>{data.title}</h6>}
          {data.projecctype && <h6>{data.projecctype} Project</h6>}
          {data.layer && <h6>{data.layer}</h6>}
          {data.feature && <h6>{data.feature}</h6>}
          {data.mepstatus && <h6>{data.mepstatus}</h6>}
          {data.name && <h4>{data.name}</h4>}
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
                {items && items.length && items.map((item: any, index: number) => {
                  console.log('le item ', item);
                  return card(item, index);
                })}
              </Carousel>
            </div>
         </div>

};
