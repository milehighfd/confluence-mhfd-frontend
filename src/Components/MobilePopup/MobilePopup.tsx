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
          {data.proj_name && <h6><a className="sub-title">Project Name: </a>{data.proj_name}</h6>}
          {data.mep_status && <h6><a className="sub-title">MEP Status: </a> {data.mep_status}</h6>}
          {data.name && <h4>{data.name}</h4>}
          {data.project_subtype && <h6><a className="sub-title">Type: </a>{data.project_subtype}</h6>}
          {data.frequency && <h6><a className="sub-title">Frequency: </a>{data.frequency}</h6>}
          {data.type && <h6><a className="sub-title">Type: </a>{data.type}</h6>}
          {data.subtype && <h6><a className="sub-title">Subtype: </a>{data.subtype}</h6>}
          {data.status && <h6><a className="sub-title">Status: </a>{data.status}</h6>}
          {data.hydgrpdcd && <h6><a className="sub-title">Hydrologic Group: </a>{data.hydgrpdcd}</h6>}
          {data.muname && <h6><a className="sub-title">Mapunit Name: </a>{data.muname}</h6>}
          {data.dam_name && <h6><a className="sub-title">Dam Name: </a>{data.dam_name}</h6>}
          {data.hazard_class && <h6><a className="sub-title">Hazard Class: </a>{data.hazard_class}</h6>}
          {data.value && <p><b>Cost:</b> ${numberWithCommas(data.value)} </p>}
          {data.scale && <h6><a className="sub-title"></a>Scale: {data.scale}</h6>}
          {data.date_created && <h6><a className="sub-title">Date created: </a>{data.date_created}</h6>}
          {data.bcz_specname && <h6><a className="sub-title">Species Name: </a>{data.bcz_specname}</h6>}
          {data.bcz_expdate && <h6><a className="sub-title">Expiration Date: </a>{data.bcz_expdate}</h6>}
          {data.sitename && <h6><a className="sub-title">Site Name: </a>{data.sitename}</h6>}
          {data.sitetype && <h6><a className="sub-title">Site Type: </a>{data.sitetype}</h6>}
          {data.watershedmanager && <h6><a className="sub-title">Watershed Manager: </a>{data.watershedmanager}</h6>}
          {data.constructionmanagers && <h6><animate className="sub-title">Construction Managers: </animate>{data.constructionmanagers}</h6>}
        </div>
      </div>
    </div>
  );
 return   <div>

            <div className="poup-map-mobile">
              <Carousel>
                {items && items.length && items.map((item: any, index: number) => {
                  return card(item, index);
                })}
              </Carousel>
            </div>
         </div>

};
