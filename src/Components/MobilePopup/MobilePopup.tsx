import React from "react";
import { Carousel } from 'antd';
import { numberWithCommas } from '../../utils/utils';
import { useMapDispatch } from "../../hook/mapHook";
import { MENU_OPTIONS } from "../../constants/constants";

export default ({items,  seeDetails}: {items: any, seeDetails: Function}) => {
  const {setSelectedPopup} = useMapDispatch();
  const card = (data: any, index: number) => (
    <div
      onClick={() => {
        if (data.type && data.type === MENU_OPTIONS.PROBLEMS || data.type === 'project') {
          seeDetails(data);
        }
      }}
      key={'mobile-popup-' + index}
      onTouchEnd={() => {
        if (data.type && data.type === MENU_OPTIONS.PROBLEMS || data.type === 'project') {
          seeDetails(data);
        }
      }}
    >
      <div className="popup-mobile">
        <div style={data.image? {width: '40%'} : {width: '0%'}}>
          {data.image && <img style={data.projecttype === 'Restoration' ? {objectFit: 'fill'} : {}} src={data.image} alt="" />}
        </div>
        <div style={data.image? {width: '60%', padding: '10px'} : {width: '100%', padding: '10px'}}>
          {data.title && data.type === MENU_OPTIONS.PROBLEMS && <h6>{data.title}</h6>}
          {data.projecttype && <h6>{data.projecttype} Project</h6>}
          <h4>{items[0].type === 'line'? 'Line' : 'Area'} Measurement</h4>
          {data.layer && data.layer != "Components" && data.layer != MENU_OPTIONS.MEASURES && data.layer != 'Streams' && <h4>{data.layer}</h4>}
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
          {data.layer != MENU_OPTIONS.MEASURES && <h6 style={{width: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}><a className="sub-title">Stream: </a>{ data.streamname ? data.streamname: "Unnamed Stream"}</h6>}
          {items[0].type === 'line' && <h6><a className="sub-title">Distance: </a>{items[0].perimeterFeet?items[0].perimeterFeet:0} Feet ({items[0].perimeterMi?items[0].perimeterMi:0} Miles)</h6>}
          {items[0].type !== 'line' && <h6><a className="sub-title">Area: </a>{items[0].area?items[0].area:0} Acres</h6>}
          {data.value && <p><b>Cost:</b> ${numberWithCommas(data.value)} </p>}
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
          {data.layer === MENU_OPTIONS.MEASURES &&
            <p style={{position:'absolute', marginTop: '3vh'}}>
              <span id={"buttonzoom-" + items[0].id} style={{float: 'none', width:'30vh'}} className="button-c">
                <a style={{color:'#11093C', fontSize: '14px'}}>
                  <img className='img-measure-03' style={{ height: '19px', display: 'initial', width:'19px', position:'absolute'}}></img>
                  <span style={{color:'#11093C', fontSize: '14px', float:'none', marginLeft: '20px'}}>Center on this area</span>
                </a>
              </span >
              <span id={"buttondelete-" + items[0].id} style={{float: 'none', marginLeft:'5vh', width:'30vh'}} className="button-c">
                <a style={{color:'#11093C', fontSize: '14px'}}>
                  <img className='img-measure-04' style={{ height: '19px', width:'19px', position:'absolute', display: 'initial'}}></img>
                  <span style={{color:'#11093C', fontSize: '14px', float:'none', marginLeft: '20px'}}>Delete</span>
                </a>
              </span >
            </p>
          }
        </div>
      </div>
    </div>
  );
 return   <div>

            <div className="poup-map-mobile">
              <Carousel style={{marginLeft:'10px'}} afterChange={(current: number) => {
                setSelectedPopup(current);
              }}>
                {items && items.length && items.map((item: any, index: number) => {
                  return card(item, index);
                })}
              </Carousel>
            </div>
         </div>

};
