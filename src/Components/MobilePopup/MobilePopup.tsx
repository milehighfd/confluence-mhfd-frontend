import React, {useState} from "react";
import { Alert,  Modal, Button, Card, Carousel } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { numberWithCommas } from '../../utils/utils';
import { date } from "yup";
import { useMapDispatch } from "../../hook/mapHook";
const stateValue = {
  visible: false
}
export default ({items,  seeDetails}: {items: any, seeDetails: Function}) => {
  const [state, setState] = useState(stateValue);
  const showModal = () => {
    const auxState = {...state};
    auxState.visible = true;
    setState(auxState);
  };
  const {setSelectedPopup} = useMapDispatch();
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
    <div onClick={() => {
      if (data.type && data.type === 'problems' || data.type === 'project') {
        seeDetails(data);
      }
    }} key={'mobile-popup-' + index}>
      <div className="popup-mobile">
        <div style={data.image? {width: '40%'} : {width: '0%'}}>
          {data.image && <img src={data.image} alt="" />}
        </div>
        <div style={data.image? {width: '60%', padding: '10px'} : {width: '100%', padding: '10px'}}>
          {data.title && data.type === 'problems' && <h6>{data.title}</h6>}
          {data.projecttype && <h6>{data.projecttype} Project</h6>}
          {data.layer && data.layer != "Components" && data.layer != 'Streams' && <h4>{data.layer}</h4>}
          {data.layer && data.layer == "Components" && <h6>{data.layer}</h6>}
          {data.proj_name && <h6><a className="sub-title">Project Name: </a>{data.proj_name}</h6>}
          {data.mep_status && <h6><a className="sub-title">MEP Status: </a> {data.mep_status}</h6>}
          {data.name && <h4>{data.name}</h4>}
          {data.project_subtype && <h6><a className="sub-title">Type: </a>{data.project_subtype}</h6>}
          {data.frequency && <h6><a className="sub-title">Frequency: </a>{data.frequency}</h6>}
          {data.subtype && <h6><a className="sub-title">Subtype: </a>{data.subtype}</h6>}
          {data.studyyear && <h6><a className="sub-title">Study Year: </a>{data.studyyear}</h6>}
          {data.status && <h6><a className="sub-title">Status: </a>{data.status}</h6>}
          {data.hydgrpdcd && <h6><a className="sub-title">Hydrologic Group: </a>{data.hydgrpdcd}</h6>}
          {data.muname && <h6><a className="sub-title">Mapunit Name: </a>{data.muname}</h6>}
          {data.dam_name && <h6><a className="sub-title">Dam Name: </a>{data.dam_name}</h6>}
          {data.hazard_class && <h6><a className="sub-title">Hazard Class: </a>{data.hazard_class}</h6>}
          {<h6><a className="sub-title">Stream: </a>{ data.streamname ? data.streamname: "Unnamed Stream"}</h6>}
          
          {data.value && <p><b>Cost:</b> ${numberWithCommas(data.value)} </p>}
          {/* {data.streamname && <p className="stream">{data.streamname}</p>} */}
          {data.scale && <h6><a className="sub-title"></a>Scale: {data.scale}</h6>}
          {data.date_created && <h6><a className="sub-title">Date created: </a>{data.date_created}</h6>}
          {data.bcz_specname && <h6><a className="sub-title">Species Name: </a>{data.bcz_specname}</h6>}
          {data.bcz_expdate && <h6><a className="sub-title">Expiration Date: </a>{data.bcz_expdate}</h6>}
          {data.sitename && <h6><a className="sub-title">Site Name: </a>{data.sitename}</h6>}
          {data.sitetype && <h6><a className="sub-title">Site Type: </a>{data.sitetype}</h6>}
          {data.watershedmanager && <h6><a className="sub-title">Watershed Manager: </a>{data.watershedmanager}</h6>}
          {data.constructionmanagers && <h6><animate className="sub-title">Construction Managers: </animate>{data.constructionmanagers}</h6>}
          
          {data.mhfd_code ? <h6><a className="sub-title">MHFD Code:</a>  {data.mhfd_code}</h6> : ''}
          {data.catch_sum ? <h6><a className="sub-title">Tributary:</a>  {Math.round(data.catch_sum) + " acres"}</h6> : ''}
          {data.str_ft ?<h6> <a className="sub-title">Reach Length:</a>  {Math.round(data.str_ft) + " ft"}</h6> : ''}
          {data.slope ?<h6> <a className="sub-title">Slope:</a>  {(data.slope * 100).toFixed(2) + "%"}</h6> : ''}
        </div>
      </div>
    </div>
  );
 return   <div>

            <div className="poup-map-mobile">
              <Carousel afterChange={(current: number) => {
                setSelectedPopup(current);
              }}>
                {items && items.length && items.map((item: any, index: number) => {
                  return card(item, index);
                })}
              </Carousel>
            </div>
         </div>

};
