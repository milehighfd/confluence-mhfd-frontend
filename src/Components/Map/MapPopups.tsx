import React from 'react';
import { Card, Button } from 'antd';
import { getData, getToken, postData } from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import { getComponentCounter } from '../../store/actions/mapActions';
import { ConsoleSqlOutlined } from '@ant-design/icons';
const problemStyle: any = {
    status: {
        'Low': {
            color: '#28c499',
            width:'50%',
            marginBottom:'0px'
        }, 'Medium': {
            color: '#FFD300',
            width:'50%',
            marginBottom:'0px'
        }, 'High': {
            color: 'red',
            width:'50%',
            marginBottom:'0px'
        }, '-': {
            color: 'black',
            width:'50%',
            marginBottom:'0px'
        }
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

const numberWithCommas = (x : number) => {
    x = Math.round(x);
    if (!x) x = 0;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const capitalize = (s : string) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}
export const MainPopup = ({id, item, test, sw, ep } : any) => {
    for (const key in item) {
        if (!item[key]) {
            item[key] = '-';
        }
    }
    let priorityType: string = '';
    if (item.priority) {
        priorityType = item.priority.split(' ')[0];
    }
    return <div id={"popup-" + id} className="map-pop-00">
      <Card hoverable>
        <div className="headmap">
            {capitalize(item.title)}
        </div>
        <div className="bodymap">
          <h4>{item.name}</h4>
          {
              (item.organization.length + item.streamname.length > 39) ? 
              (<><h6>{item.organization} </h6><h6>{item.streamname}</h6></>) :
              (<h6>{item.organization} <span style={{float: 'right'}}>{item.streamname}</span></h6>)
          }
          <h5>${numberWithCommas(item.value)} <span style={{float: 'right'}}><b id={item.popupId}>0</b> Components</span></h5>
          <hr/>
          <div style={{display: 'flex', width:'100%', marginTop: '12px'}}>
            <p style={item.type === 'problems' ? problemStyle.status[priorityType] : projectStyle.status}>{item.type === 'problems' ? item.priority : capitalize(item.projecctype)}</p>
            <span style={{color: item.type !=='problems' ? '#11093c' : '', opacity: item.type  !== 'problems' ? '0.6' : '', textAlign: 'right', width:'50%', marginBottom:'0px'}}>{item.type === 'problems' ? item.status : capitalize(item.status)}</span>
          </div>
        </div>
        { !ep && <div style={{ padding: '10px', marginTop: '-15px', color: '#28C499', display:'flex'}}>
            { item.type != 'project' && <Button id={"buttonCreate-" + id} style={{ width: '50%', marginRight: '10px'}} className="btn-purple" >Create Project</Button>}
            <Button id={"buttonPopup-" + id} style={{ width: sw? '100%' : '50%', color: '#28C499' }} onClick={() => test()} className="btn-borde">See Details</Button>
        </div>} 
        { ep && <div style={{ padding: '10px', marginTop: '-15px', color: '#28C499', display:'flex'}}>
            <Button id={"buttonEdit-" + id} style={{ width: sw? '100%' : '50%', color: '#28C499' }} onClick={() => test()} className="btn-borde">Edit Project</Button>
        </div>}
      </Card>
    </div>
};
export const StreamPopup = ({id, item} : any) => {
  
  for (const key in item) {
      if (!item[key]) {
          item[key] = '-';
      }
  }
  
  return <div id={"popup-" + id} className="map-pop-00">
    <Card hoverable>
      <div className="headmap">
          STREAM
      </div>
      <div className="bodymap">
        <h4>{capitalize(item.title)}</h4>
      </div>
    </Card>
  </div>
};
export const MainPopupCreateMap = ({id, item, test, sw, ep } : any) => {
  
  for (const key in item) {
        if (!item[key]) {
            item[key] = '-';
        }
    }
    let priorityType: string = '';
    if (item.priority) {
        priorityType = item.priority.split(' ')[0];
    }
    return <div id={"popup-" + id} className="map-pop-00">
      <Card hoverable>
        <div className="headmap">
            {capitalize(item.title)}
        </div>
        <div className="bodymap">
          <h4>{item.name}</h4>
          {
              (item.organization.length + item.streamname.length > 39) ? 
              (<><h6>{item.organization} </h6><h6>{item.streamname}</h6></>) :
              (<h6>{item.organization} <span style={{float: 'right'}}>{item.streamname}</span></h6>)
          }
          <h5>${numberWithCommas(item.value)} <span style={{float: 'right'}}><b id={item.popupId}>0</b> Components</span></h5>
          <hr/>
          <div style={{display: 'flex', width:'100%', marginTop: '12px'}}>
            <p style={item.type === 'problems' ? problemStyle.status[priorityType] : projectStyle.status}>{item.type === 'problems' ? item.priority : capitalize(item.projecctype)}</p>
            <span style={{color: item.type !=='problems' ? '#11093c' : '', opacity: item.type  !== 'problems' ? '0.6' : '', textAlign: 'right', width:'50%', marginBottom:'0px'}}>{item.type === 'problems' ? item.status : capitalize(item.status)}</span>
          </div>
        </div>
        { !ep && <div style={{ padding: '10px', marginTop: '-15px', color: '#28C499', display:'flex'}}>
            {  item.type != 'project' && <Button id={"buttonComponents-" + id} style={{ width: '50%', marginRight: '10px'}} className="btn-purple" >Add Comp.</Button>}
            <Button id={"buttonPopup-" + id} style={{ width: item.type == 'project'? '100%' : '50%', color: '#28C499' }} onClick={() => test()} className="btn-borde">See Details</Button>
        </div>} 
        { ep && <div style={{ padding: '10px', marginTop: '-15px', color: '#28C499', display:'flex'}}>
            <Button id={"buttonEdit-" + id} style={{ width: item.type == 'project'? '100%' : '50%', color: '#28C499' }} onClick={() => test()} className="btn-borde">Edit Project</Button>
        </div>}
      </Card>
    </div>
};

export const ComponentPopup = ({ id, item, isComponent } : any) => {
    return <div id={'popup-' + id} className="map-pop-01">
        <Card hoverable>
        <div className="headmap">
            {item.layer}
        </div>
        <div className="bodymap">
            {item.type ? <h4>{item.type} </h4> : ''}
            {item.feature ? <h4>{item.feature}</h4> : ''}
            {item.subtype ? <p>Subtype:  {item.subtype}</p> : ''}
            {item.estimatedcost ? <p>Estimated Cost:  ${numberWithCommas(item.estimatedcost)}</p> : ''}
            {item.studyyear ? <p>Study Year:  {item.studyyear}</p> : ''}
            {item.status ? <p>Status:  {item.status}</p> : ''}
            {item.streamname ? <p>Stream Name:  {item.streamname}</p> : ''}
            {item.studyname ? <p>Study Name:  {item.studyname}</p> : ''}
            {item.jurisdiction ? <p>Jurisdiction:  {item.jurisdiction}</p> : ''}
            {item.problem ? <p>Problem:  {item.problem}</p> : ''}
            {item.description ? <p>Description:  {item.description}</p> : ''}

            {item.contract ? <p>Contract:  {item.contract}</p> : ''}
            {item.contractor ? <p>Contractor:  {item.contractor}</p> : ''}
            {item.local_gov ? <p>Local Government:  {item.local_gov}</p> : ''}
            {item.mow_frequency ? <p>Frequency:  {item.mow_frequency}</p> : ''}
            {item.debris_frequency ? <p>Frequency:  {item.debris_frequency}</p> : ''}
            {item.acreage ? <p>Acreage:  {item.acreage}</p> : ''}
            {item.length ? <p>Length:  {item.length}</p> : ''}

            {item.hydgrpdcd ? <p>Hydrologic Group: {item.hydgrpdcd}</p> : ''}
            {item.muname ? <p>Mapunit Name: {item.muname}</p> : ''}
            {item.aws0150wta ? <p>Available Water Storage 0-150 cm: {item.aws0150wta}</p> : ''}
            {item.drclassdcd ? <p>Drainage Class: {item.drclassdcd}</p> : ''}
            {item.nrcsweb ? <p>Web Soil Survey: NA</p> : ''}

            {item.dam_name ? <p>Dam Name: {item.dam_name}</p> : ''}
            {item.hazard_class ? <p>Hazard Class: {item.hazard_class}</p> : ''}
            {item.year_completed ? <p>Year Completed: {item.year_completed}</p> : ''}
            {item.dam_height ? <p>Dam Height (ft): {item.dam_height}</p> : ''}
            {item.more_information ? <p>DWR Website: <a href={item.more_information} target="_blank">{item.more_information}</a></p> : ''}
            {item.scale ? <p>Scale: {item.scale}</p> : ''}
            {item.date_created ? <p>Date created: {item.date_created}</p> : ''}
            {item.expirationdate ? <p>Expiration Date: {item.expirationdate}</p>: ''}
            {item.website ? <p className="text-popup">Website:  <a href={item.website} target="_blank">See website here</a></p> : ''}
            {item.letter ? <p className="text-popup">Letter:  <a href={item.letter} target="_blank">See letter here</a></p> : ''}
            {item.map ? <p className="text-popup">Map:  <a href={item.map} target="_blank">See map here</a></p> : ''}

            {item.sitename ? <p> Site Name: {item.sitename}</p> : ''}
            {item.sitetype ? <p> Site Type: {item.sitetype}</p> : ''}
            {item.bmptype ? <p> BMP Type: {item.bmptype}</p> : ''}

            {item.str_name ? <p>Stream Name: {item.str_name}</p> : ''}

            {item.projectno ? <p>Project Number:  {item.projectno}</p> : ''}
            {item.mepstatus ? <p>MEP Status:  {item.mepstatus}</p> : ''}
            {item.mepstatusdate ? <p>MEP Status Date:  {item.mepstatusdate}</p> : ''}
            {item.notes ? <p>Notes/Comments:  {item.notes}</p> : ''}
            {item.servicearea ? <p>Service Area:  {item.servicearea}</p> : ''}
            {item.watershedmanager ? <p>Watershed Manager:  {item.watershedmanager}</p> : ''}
            {item.constructionmanagers ? <p>Construction Managers:  {item.constructionmanagers}</p> : ''}
            {isComponent && item.projectid === undefined && <Button id={"buttonCreate-" + id} style={{ width: '100%', marginTop: '10px'}} className="btn-purple">Create Project</Button>}
        </div>
        </Card>
    </div>
};


export const ComponentPopupCreate = ({ id, item, isComponent, isWR } : any) => {
    return <div id={'popup-' + id} className="map-pop-01">
      <Card hoverable>
      <div className="headmap">
          {item.layer}
      </div>
      <div className="bodymap">
          {item.type ? <h4>{item.type} </h4> : ''}
          {item.feature ? <h4>{item.feature}</h4> : ''}
          {item.subtype ? <p>Subtype:  {item.subtype}</p> : ''}
          {item.estimatedcost ? <p>Estimated Cost:  ${numberWithCommas(item.estimatedcost)}</p> : ''}
          {item.studyyear ? <p>Study Year:  {item.studyyear}</p> : ''}
          {item.status ? <p>Status:  {item.status}</p> : ''}
          {item.streamname ? <p>Stream Name:  {item.streamname}</p> : ''}
          {item.studyname ? <p>Study Name:  {item.studyname}</p> : ''}
          
          {item.jurisdiction ? <p>Jurisdiction:  {item.jurisdiction}</p> : ''}
          {item.problem ? <p>Problem:  {item.problem}</p> : ''}
          {item.description ? <p>Description:  {item.description}</p> : ''}

          {item.contract ? <p>Contract:  {item.contract}</p> : ''}
          {item.contractor ? <p>Contractor:  {item.contractor}</p> : ''}
          {item.local_gov ? <p>Local Government:  {item.local_gov}</p> : ''}
          {item.mow_frequency ? <p>Frequency:  {item.mow_frequency}</p> : ''}
          {item.debris_frequency ? <p>Frequency:  {item.debris_frequency}</p> : ''}
          {item.acreage ? <p>Acreage:  {item.acreage}</p> : ''}
          {item.length ? <p>Length:  {item.length}</p> : ''}

          {item.hydgrpdcd ? <p>Hydrologic Group: {item.hydgrpdcd}</p> : ''}
          {item.muname ? <p>Mapunit Name: {item.muname}</p> : ''}
          {item.aws0150wta ? <p>Available Water Storage 0-150 cm: {item.aws0150wta}</p> : ''}
          {item.drclassdcd ? <p>Drainage Class: {item.drclassdcd}</p> : ''}
          {item.nrcsweb ? <p>Web Soil Survey: NA</p> : ''}

          {item.dam_name ? <p>Dam Name: {item.dam_name}</p> : ''}
          {item.hazard_class ? <p>Hazard Class: {item.hazard_class}</p> : ''}
          {item.year_completed ? <p>Year Completed: {item.year_completed}</p> : ''}
          {item.dam_height ? <p>Dam Height (ft): {item.dam_height}</p> : ''}
          {item.more_information ? <p>DWR Website: <a href={item.more_information} target="_blank">{item.more_information}</a></p> : ''}
          {item.scale ? <p>Scale: {item.scale}</p> : ''}
          {item.date_created ? <p>Date created: {item.date_created}</p> : ''}
          {item.expirationdate ? <p>Expiration Date: {item.expirationdate}</p>: ''}
          {item.website ? <p className="text-popup">Website:  <a href={item.website} target="_blank">See website here</a></p> : ''}
          {item.letter ? <p className="text-popup">Letter:  <a href={item.letter} target="_blank">See letter here</a></p> : ''}
          {item.map ? <p className="text-popup">Map:  <a href={item.map} target="_blank">See map here</a></p> : ''}

          {item.sitename ? <p> Site Name: {item.sitename}</p> : ''}
          {item.sitetype ? <p> Site Type: {item.sitetype}</p> : ''}
          {item.bmptype ? <p> BMP Type: {item.bmptype}</p> : ''}

          {item.str_name ? <p>Stream Name: {item.str_name}</p> : ''}

          {item.projectno ? <p>Project Number:  {item.projectno}</p> : ''}
          {item.mepstatus ? <p>MEP Status:  {item.mepstatus}</p> : ''}
          {item.mepstatusdate ? <p>MEP Status Date:  {item.mepstatusdate}</p> : ''}
          {item.notes ? <p>Notes/Comments:  {item.notes}</p> : ''}
          {item.servicearea ? <p>Service Area:  {item.servicearea}</p> : ''}
          {item.watershedmanager ? <p>Watershed Manager:  {item.watershedmanager}</p> : ''}
          {item.constructionmanagers ? <p>Construction Managers:  {item.constructionmanagers}</p> : ''}
          {isComponent && !isWR && item.projectid === undefined && <Button id={'component-'+id}  style={{ width: '100%', marginTop: '10px'}} className="btn-purple" >{item.added}</Button>}
      </div>
      </Card>
  </div>
};