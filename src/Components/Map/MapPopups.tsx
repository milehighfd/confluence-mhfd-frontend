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
    if(x == -1) {
        return 'No Cost data';
    }
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
              ( item.organization?.length + item.streamname?.length > 39) ? 
              (<><h6>{item.organization} </h6><h6>{item.streamname}</h6></>) :
              (<h6>{item.organization} <span style={{float: 'right'}}>{item.streamname}</span></h6>)
          }
          <h5>{item.value != -1 ? '$':''}{numberWithCommas(item.value)} <span style={{float: 'right'}}><b id={item.popupId}>0</b> Components</span></h5>
          <hr/>
          <div style={{display: 'flex', width:'100%', marginTop: '12px'}}>
            <p style={item.type === 'problems' ? problemStyle.status[priorityType] : projectStyle.status}>{item.type === 'problems' ? item.priority : capitalize(item.projecctype)}</p>
            <span style={{color: item.type !=='problems' ? '#11093c' : '', opacity: item.type  !== 'problems' ? '0.6' : '', textAlign: 'right', width:'50%', marginBottom:'0px'}}>{item.type === 'problems' ? ((item.status == '-'?'0%':item.status) + " Solved" ) : capitalize(item.status)}</span>
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
// export const StreamPopup = ({id, item} : any) => {
  
//   for (const key in item) {
//       if (!item[key]) {
//           item[key] = '-';
//       }
//   }
  
//   return <div id={"popup-" + id} className="map-pop-00">
//     <Card hoverable>
//       <div className="headmap">
//           STREAM
//       </div>
//       <div className="bodymap">
//         <h4>{capitalize(item.title)}</h4>
//       </div>
//     </Card>
//   </div>
// };
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
            <span style={{color: item.type !=='problems' ? '#11093c' : '', opacity: item.type  !== 'problems' ? '0.6' : '', textAlign: 'right', width:'50%', marginBottom:'0px'}}>{item.type === 'problems' ?  ((item.status == '-'?'0%':item.status) + " Solved" ) : capitalize(item.status)}</span>
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
export const StreamPopupFull = ({ id, item } : any) => {
    return <div id={'popup-' + id} className="map-pop-01">
        <Card hoverable>
        <div className="headmap">
            Stream
        </div>
        <div className="bodymap">
            {item.streamname ? <h4>{item.streamname}</h4> : <h4>Unnamed Stream</h4>}
            {item.mhfd_code ? <p><i>MHFD Code:</i>  {item.mhfd_code}</p> : ''}
            {item.catch_sum ? <p><i>Tributary:</i>  {Math.round(item.catch_sum) + " acres"}</p> : ''}
            {item.str_ft ? <p><i>Reach Length:</i>  {Math.round(item.str_ft) + " ft"}</p> : ''}
            {item.slope ? <p><i>Slope:</i>  {(item.slope * 100).toFixed(2) + "%"}</p> : ''}
        </div>
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
            {item.subtype ? <p><i>Subtype:</i>  {item.subtype}</p> : ''}
            {item.estimatedcost ? <p><i>Estimated Cost:</i>  ${numberWithCommas(item.estimatedcost)}</p> : ''}
            {item.studyyear ? <p><i>Study Year:</i>  {item.studyyear}</p> : ''}
            {item.status ? <p><i>Status:</i>  {item.status}</p> : ''}
            {item.streamname ? <p><i>Stream:</i>  {item.streamname}</p> : ''}
            {item.studyname ? <p><i>Study Name:</i>  {item.studyname}</p> : ''}
            {item.jurisdiction ? <p><i>Jurisdiction:</i>  {item.jurisdiction}</p> : ''}
            {item.problem ? <p><i>Problem:</i>  {item.problem}</p> : ''}
            {item.description ? <p><i>Description:</i>  {item.description}</p> : ''}

            {item.contract ? <p><i>Contract:</i>  {item.contract}</p> : ''}
            {item.contractor ? <p><i>Contractor:</i>  {item.contractor}</p> : ''}
            {item.local_gov ? <p><i>Local Government:</i>  {item.local_gov}</p> : ''}
            {item.mow_frequency ? <p><i>Frequency:</i>  {item.mow_frequency}</p> : ''}
            {item.debris_frequency ? <p><i>Frequency:</i>  {item.debris_frequency}</p> : ''}
            {item.acreage ? <p><i>Acreage:</i>  {item.acreage}</p> : ''}
            {item.length ? <p><i>Length:</i>  {item.length}</p> : ''}

            {item.hydgrpdcd ? <p><i>Hydrologic Group:</i> {item.hydgrpdcd}</p> : ''}
            {item.muname ? <p><i>Mapunit Name:</i> {item.muname}</p> : ''}
            {item.aws0150wta ? <p><i>Available Water Storage 0-150 cm:</i> {item.aws0150wta}</p> : ''}
            {item.drclassdcd ? <p><i>Drainage Class:</i> {item.drclassdcd}</p> : ''}
            {item.nrcsweb ? <p><i>Web Soil Survey:</i> NA</p> : ''}

            {item.dam_name ? <p><i>Dam Name:</i> {item.dam_name}</p> : ''}
            {item.hazard_class ? <p><i>Hazard Class:</i> {item.hazard_class}</p> : ''}
            {item.year_completed ? <p><i>Year Completed:</i> {item.year_completed}</p> : ''}
            {item.dam_height ? <p><i>Dam Height (ft):</i> {item.dam_height}</p> : ''}
            {item.more_information ? <p><i>DWR Website:</i> <a href={item.more_information} target="_blank">Link</a></p> : ''}
            {item.scale ? <p><i>Scale:</i> {item.scale}</p> : ''}
            {item.date_created ? <p><i>Date created:</i> {item.date_created}</p> : ''}
            {item.expirationdate ? <p><i>Expiration Date:</i> {item.expirationdate}</p>: ''}
            {item.website ? <p className="text-popup"><i>Website:</i>  <a href={item.website} target="_blank">See website here</a></p> : ''}
            {item.letter ? <p className="text-popup"><i>Letter:</i>  <a href={item.letter} target="_blank">See letter here</a></p> : ''}
            {item.map ? <p className="text-popup"><i>Map:</i>  <a href={item.map} target="_blank">See map here</a></p> : ''}

            {item.sitename ? <p><i> Site Name:</i> {item.sitename}</p> : ''}
            {item.sitetype ? <p><i> Site Type:</i> {item.sitetype}</p> : ''}
            {item.bmptype ? <p><i> BMP Type:</i> {item.bmptype}</p> : ''}

            {item.str_name ? <p><i>Stream Name:</i> {item.str_name}</p> : ''}
            
            {item.pondname? <p><i>Pond Name:</i>  {item.pondname}</p> : ''}
            {item.projectno ? <p><i>Project Number:</i>  {item.projectno}</p> : ''}
            {/* {item.projno ? <p><i>Project Number:</i>  {item.projno}</p> : ''} */}
            {item.mep_eligibilitystatus ? <p><i>MEP Status:</i>  {item.mep_eligibilitystatus}</p> : ''}
            
            
            {item.mepstatusdate ? <p><i>MEP Status Date:</i>  {item.mepstatusdate}</p> : ''}
            {item.notes ? <p><i>Notes/Comments:</i>  {item.notes}</p> : ''}
            {item.mep_summarynotes ? <p><i>Notes/Comments:</i>  {item.mep_summarynotes}</p> : ''}
            {item.servicearea ? <p><i>Service Area:</i>  {item.servicearea}</p> : ''}
            {item.mhfd_servicearea ? <p><i>Service Area:</i>  {item.mhfd_servicearea}</p> : ''}
            {item.watershedmanager ? <p><i>Watershed Manager:</i>  {item.watershedmanager}</p> : ''}
            {item.constructionmanagers ? <p><i>Construction Managers:</i>  {item.constructionmanagers}</p> : ''}
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
          {item.type ? <h4><i>{item.type}</i> </h4> : ''}
          {item.feature ? <h4>{item.feature}</h4> : ''}
          {item.subtype ? <p><i>Subtype:</i>  {item.subtype}</p> : ''}
          {item.estimatedcost ? <p><i>Estimated Cost:</i>  ${numberWithCommas(item.estimatedcost)}</p> : ''}
          {item.studyyear ? <p><i>Study Year:</i>  {item.studyyear}</p> : ''}
          {item.status ? <p><i>Status:</i>  {item.status}</p> : ''}
          {item.streamname ? <p><i>Stream:</i>  {item.streamname}</p> : ''}
          {item.studyname ? <p><i>Study Name:</i>  {item.studyname}</p> : ''}
          
          {item.jurisdiction ? <p><i>Jurisdiction:</i>  {item.jurisdiction}</p> : ''}
          {item.problem ? <p><i>Problem:</i>  {item.problem}</p> : ''}
          {item.description ? <p><i>Description:</i>  {item.description}</p> : ''}

          {item.contract ? <p><i>Contract:</i>  {item.contract}</p> : ''}
          {item.contractor ? <p><i>Contractor:</i>  {item.contractor}</p> : ''}
          {item.local_gov ? <p><i>Local Government:</i>  {item.local_gov}</p> : ''}
          {item.mow_frequency ? <p><i>Frequency:</i>  {item.mow_frequency}</p> : ''}
          {item.debris_frequency ? <p><i>Frequency:</i>  {item.debris_frequency}</p> : ''}
          {item.acreage ? <p><i>Acreage:</i>  {item.acreage}</p> : ''}
          {item.length ? <p><i>Length:</i>  {item.length}</p> : ''}

          {item.hydgrpdcd ? <p><i>Hydrologic Group:</i> {item.hydgrpdcd}</p> : ''}
          {item.muname ? <p><i>Mapunit Name:</i> {item.muname}</p> : ''}
          {item.aws0150wta ? <p><i>Available Water Storage 0-150 cm:</i> {item.aws0150wta}</p> : ''}
          {item.drclassdcd ? <p><i>Drainage Class:</i> {item.drclassdcd}</p> : ''}
          {item.nrcsweb ? <p><i>Web Soil Survey:</i> NA</p> : ''}

          {item.dam_name ? <p><i>Dam Name:</i> {item.dam_name}</p> : ''}
          {item.hazard_class ? <p><i>Hazard Class:</i> {item.hazard_class}</p> : ''}
          {item.year_completed ? <p><i>Year Completed:</i> {item.year_completed}</p> : ''}
          {item.dam_height ? <p><i>Dam Height (ft):</i> {item.dam_height}</p> : ''}
          {item.more_information ? <p><i>DWR Website:</i> <a href={item.more_information} target="_blank">{item.more_information}</a></p> : ''}
          {item.scale ? <p><i>Scale:</i> {item.scale}</p> : ''}
          {item.date_created ? <p><i>Date created:</i> {item.date_created}</p> : ''}
          {item.expirationdate ? <p><i>Expiration Date:</i> {item.expirationdate}</p>: ''}
          {item.website ? <p className="text-popup"><i>Website:</i>  <a href={item.website} target="_blank">See website here</a></p> : ''}
          {item.letter ? <p className="text-popup"><i>Letter:</i>  <a href={item.letter} target="_blank">See letter here</a></p> : ''}
          {item.map ? <p className="text-popup"><i>Map:</i>  <a href={item.map} target="_blank">See map here</a></p> : ''}

          {item.sitename ? <p><i> Site Name:</i> {item.sitename}</p> : ''}
          {item.sitetype ? <p><i> Site Type:</i> {item.sitetype}</p> : ''}
          {item.bmptype ? <p><i> BMP Type:</i> {item.bmptype}</p> : ''}

          {item.str_name ? <p><i>Stream Name:</i> {item.str_name}</p> : ''}
          {item.pondname? <p><i>Pond Name:</i>  {item.pondname}</p> : ''}
          {item.projectno ? <p><i>Project Number:</i>  {item.projectno}</p> : ''}
          {item.mep_eligibilitystatus ? <p><i>MEP Status:</i>  {item.mep_eligibilitystatus}</p> : ''}
          {item.mepstatus ? <p><i>MEP Status:</i>  {item.mepstatus}</p> : ''}
          {item.mepstatusdate ? <p><i>MEP Status Date:</i>  {item.mepstatusdate}</p> : ''}
          
          {item.notes ? <p><i>Notes/Comments:</i>  {item.notes}</p> : ''}
          {item.mep_summarynotes ? <p><i>Notes/Comments:</i>  {item.mep_summarynotes}</p> : ''}
          {item.servicearea ? <p><i>Service Area:</i>  {item.servicearea}</p> : ''}
          {item.mhfd_servicearea ? <p><i>Service Area:</i>  {item.mhfd_servicearea}</p> : ''}
          {item.watershedmanager ? <p><i>Watershed Manager:</i>  {item.watershedmanager}</p> : ''}
          {item.constructionmanagers ? <p><i>Construction Managers:</i>  {item.constructionmanagers}</p> : ''}
          {isComponent && !isWR && item.projectid === undefined && <Button id={'component-'+id}  style={{ width: '100%', marginTop: '10px'}} className="btn-purple" >{item.added}</Button>}
      </div>
      </Card>
  </div>
};