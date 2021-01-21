import React, {useState} from "react";
import { Alert,  Modal, Button, Card, Carousel } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { numberWithCommas } from '../../utils/utils';
import { date } from "yup";
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
          {data.proj_name && <h6><h6 className="sub-title">Project Name: </h6>{data.proj_name}</h6>}
          {data.mep_status && <h6><h6 className="sub-title">MEP Status: </h6> {data.mep_status}</h6>}
          {data.name && <h4>{data.name}</h4>}
          {data.project_subtype && <h6><h6 className="sub-title">Type: </h6>{data.project_subtype}</h6>}
          {data.frequency && <h6><h6 className="sub-title">Frequency: </h6>{data.frequency}</h6>}
          {data.type && <h6><h6 className="sub-title">Type: </h6>{data.type}</h6>}
          {data.subtype && <h6><h6 className="sub-title">Subtype: </h6>{data.subtype}</h6>}
          {data.status && <h6><h6 className="sub-title">Status: </h6>{data.status}</h6>}
          {data.hydgrpdcd && <h6><h6 className="sub-title">Hydrologic Group: </h6>{data.hydgrpdcd}</h6>}
          {data.muname && <h6><h6 className="sub-title">Mapunit Name: </h6>{data.muname}</h6>}
          {data.dam_name && <h6><h6 className="sub-title">Dam Name: </h6>{data.dam_name}</h6>}
          {data.hazard_class && <h6><h6 className="sub-title">Hazard Class: </h6>{data.hazard_class}</h6>}
          {data.value && <p><b>Cost:</b> ${numberWithCommas(data.value)} </p>}
          {data.scale && <h6><h6 className="sub-title"></h6>Scale: {data.scale}</h6>}
          {data.date_created && <h6><h6 className="sub-title">Date created: </h6>{data.date_created}</h6>}
          {data.bcz_specname && <h6><h6 className="sub-title">Species Name: </h6>{data.bcz_specname}</h6>}
          {data.bcz_expdate && <h6><h6 className="sub-title">Expiration Date: </h6>{data.bcz_expdate}</h6>}
          {data.sitename && <h6><h6 className="sub-title">Site Name: </h6>{data.sitename}</h6>}
          {data.sitetype && <h6><h6 className="sub-title">Site Type: </h6>{data.sitetype}</h6>}
          {data.watershedmanager && <h6><h6 className="sub-title">Watershed Manager: </h6>{data.watershedmanager}</h6>}
          {data.constructionmanagers && <h6><h6 className="sub-title">Construction Managers: </h6>{data.constructionmanagers}</h6>}
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
