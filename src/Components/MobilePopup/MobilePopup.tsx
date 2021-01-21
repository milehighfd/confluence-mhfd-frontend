import React, {useState} from "react";
import { Alert,  Modal, Button, Card, Carousel } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { numberWithCommas } from '../../utils/utils';
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
        <div style={data.image? {width: '40%'} : {width: '0%'}}>
          {data.image && <img src={data.image} alt="" />}
        </div>
        <div style={data.image? {width: '60%', padding: '10px'} : {width: '100%', padding: '10px'}}>
          {data.title && data.type === 'problems' && <h6>{data.title}</h6>}
          {data.projecttype && <h6>{data.projecttype} Project</h6>}
          {data.layer && <h4>{data.layer}</h4>}
          {data.proj_name && <h6>Project Name: {data.proj_name}</h6>}
          {data.mep_status && <h6>MEP Status: {data.mep_status}</h6>}
          {data.name && <h4>{data.name}</h4>}
          {data.project_subtype && <h6>Type: {data.project_subtype}</h6>}
          {data.frequency && <h6>Frequency: {data.frequency}</h6>}
          {data.type && <h6>Type: {data.type}</h6>}
          {data.subtype && <h6>Subtype: {data.subtype}</h6>}
          {data.status && <h6>{data.status}</h6>}
          {data.hydgrpdcd && <h6>Hydrologic Group: {data.hydgrpdcd}</h6>}
          {data.muname && <h6>Mapunit Name: {data.muname}</h6>}
          {data.dam_name && <h6>{data.dam_name}</h6>}
          {data.hazard_class && <h6>{data.hazard_class}</h6>}
          {data.value && <p><b>Cost:</b> ${numberWithCommas(data.value)} </p>}
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
