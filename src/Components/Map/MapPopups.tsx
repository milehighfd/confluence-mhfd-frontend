import React from 'react';
import { Card, Button } from 'antd';
import { getData, getToken, postData } from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import { getComponentCounter } from '../../store/actions/mapActions';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import { MENU_OPTIONS } from '../../constants/constants';
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
export const MainPopup = ({id, item, test, sw, ep } : {id: number, item: any, test: (e: any) => void, sw?: any, ep?: any}) => {
    for (const key in item) {
        if (!item[key]) {
            item[key] = '-';
        }
    }
    if(!test) {
      test = () => {};
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
          <h5>{item.value != -1 ? '$':''}{item.value ? numberWithCommas(item.value) : '0'} <span style={{float: 'right'}}><b>{item.component_count ? (item.component_count != '-' ? item.component_count : 0) : 0}</b> Components</span></h5>
          <hr/>
          <div style={{display: 'flex', width:'100%', marginTop: '12px'}}>
            <p style={
                item.type ===  MENU_OPTIONS.PROBLEMS ? (problemStyle.status[priorityType] ? problemStyle.status[priorityType] : problemStyle.status['-'] ) : projectStyle.status 
              }>{item.type ===  MENU_OPTIONS.PROBLEMS ? item.priority : capitalize(item.projecctype)}</p>
            <span style={{color: item.type !== MENU_OPTIONS.PROBLEMS ? '#11093c' : '', opacity: item.type  !==  MENU_OPTIONS.PROBLEMS ? '0.6' : '', textAlign: 'right', width:'50%', marginBottom:'0px'}}>{item.type === MENU_OPTIONS.PROBLEMS ? ((item.status == '-'?'0%':item.status) + " Solved" ) : capitalize(item.status)}</span>
          </div>
        </div>
        { !ep && <div style={{ padding: '10px', marginTop: '-15px', color: '#28C499', display:'flex'}}>
            { item.type != 'project' && <Button id={"buttonCreate-" + id} style={{ width: '50%', marginRight: '10px'}} className="btn-purple" >Create Project</Button>}
            <Button id={"buttonPopup-" + id} style={{ width: sw? '100%' : '50%', color: '#28C499' }} onClick={() => test(item)} className="btn-borde">See Details</Button>
        </div>} 
        { ep && <div style={{ padding: '10px', marginTop: '-15px', color: '#28C499', display:'flex'}}>
            <Button id={"buttonEdit-" + id} style={{ width: sw? '100%' : '50%', color: '#28C499' }} onClick={() => test(item)} className="btn-borde">Edit Project</Button>
        </div>}
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
          <h5>${numberWithCommas(item.value)} <span style={{float: 'right'}}><b >{item.component_count ? (item.component_count != '-' ? item.component_count : 0) : 0}</b> Components</span></h5>
          <hr/>
          <div style={{display: 'flex', width:'100%', marginTop: '12px'}}>
            <p style={item.type === MENU_OPTIONS.PROBLEMS ? problemStyle.status[priorityType] : projectStyle.status}>{item.type === MENU_OPTIONS.PROBLEMS ? item.priority : capitalize(item.projecctype)}</p>
            <span style={{color: item.type !==MENU_OPTIONS.PROBLEMS ? '#11093c' : '', opacity: item.type  !== MENU_OPTIONS.PROBLEMS ? '0.6' : '', textAlign: 'right', width:'50%', marginBottom:'0px'}}>{item.type === MENU_OPTIONS.PROBLEMS ?  ((item.status == '-'?'0%':item.status) + " Solved" ) : capitalize(item.status)}</span>
          </div>
        </div>
        { !ep && <div style={{ padding: '10px', marginTop: '-15px', color: '#28C499', display:'flex'}}>
            {  item.type != 'project' && <Button id={"buttonComponents-" + id} style={{ width: '50%', marginRight: '10px'}} className="btn-purple" >Add Comp.</Button>}
            <Button id={"buttonPopup-" + id} style={{ width: item.type == 'project'? '100%' : '50%', color: '#28C499' }} className="btn-borde">See Details</Button>
        </div>} 
        { ep && <div style={{ padding: '10px', marginTop: '-15px', color: '#28C499', display:'flex'}}>
            <Button id={"buttonEdit-" + id} style={{ width: item.type == 'project'? '100%' : '50%', color: '#28C499' }} className="btn-borde">Edit Project</Button>
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

export const MeasurePopup = ({ id, item, isComponent } : any) => { 

  return <div className='measurecontainer'  > 
      <div id={'measure-block'} className="measure-block">
        <div className="headmap">
          <h4>{item.type === 'line'? 'Line' : 'Area'} Measurement</h4>
        </div>
        <hr style={{opacity: 0.4, width: '96%'}}></hr>
        <div className="bodymapvalues" >
          <>
            {item.type === 'line' && <span >Distance: <b>{item.perimeterFeet?item.perimeterFeet:0} Feet ({item.perimeterMi?item.perimeterMi:0} Miles)</b> </span>}
            {item.type !== 'line' && <span >Area: <b>{item.area?item.area:0} Acres</b> </span>}
          </>
        </div>
        <hr style={{opacity: 0.4, width: '96%'}}></hr>
        <p className='paragraph'> 
          <span id={"buttonzoom-" + id} style={{paddingRight:'5px'}} className="button-c"><a style={{color:'#11093C'}}><img className='img-measure-03'></img> <b>Center on this area</b></a></span >
          <span id={"buttondelete-" + id} style={{paddingLeft:'22px'}} className="button-c"><a style={{color:'#11093C'}}><img className='img-measure-04'></img> <b>Delete</b></a></span >
        </p>
      </div>
    </div>
}
export const ComponentPopup = ({ id, item, isComponent } : any) => {
  if(item.layer == 'County') {
    item.feature = item.feature +" County";
    isComponent = false;
  } else if (item.layer == 'Service Area') {
    item.feature = item.feature + " Service Area";
    isComponent = false;
  } else if ( item.layer == 'Municipality') {
    isComponent = false;
  } else if ( item.layer == 'FEMA Flood Hazard') {
    isComponent = false;
  } else if ( item.layer == 'Floodplains (Non-FEMA)') {
    isComponent = false;
  } else if (item.layer.includes('LOMC')) {
    isComponent = false;
  } else if (item.layer.includes('Effective')) {
    isComponent = false;
  }
  else if (item.layer.includes('Stream Management Corridor')) {
    isComponent = false;
  }
  else if (item.layer.includes('Active Stream Corridor')) {
    isComponent = false;
  }
  else if (item.layer.includes('Fluvial Hazard Buffe')) {
    isComponent = false;
  }
  else if (item.layer.includes('Active Stream Corridor')) {
    isComponent = false;
  }
  else if (item.layer.includes('Fluvial Hazard Buffer')) {
    isComponent = false;
  }
  else if (item.layer.includes('Watershed Change Line')) {
    isComponent = false;
  }
  else if (item.layer.includes('Flood Hazard Point')) {
    isComponent = false;
  }
  else if (item.layer.includes('Flood Hazard Polygon')) {
    isComponent = false;
  }
  else if (item.layer.includes('Flood Hazard Line')) {
    isComponent = false;
  }
  else if (item.layer.includes('Stream Function Point')) {
    isComponent = false;
  }
  else if (item.layer.includes('Stream Function Polygon')) {
    isComponent = false;
  }
  else if (item.layer.includes('Stream Function Line')) {
    isComponent = false;
  }
  else if (item.layer.includes('Watershed Change Polygon')) {
    isComponent = false;
  }
    return <div id={'popup-' + id} className="map-pop-01">
        <Card hoverable
        >
        <div className="headmap">
            {item.layer}
        </div>
        <div className={!(item.layer.includes('Effective') || item.layer.includes('LOMC')) ? "bodymap" : 'bodymap listofelements'}>
            {item.type ? <h4>{item.type} </h4> : ''}
            {item.feature ? <h4>{item.feature}</h4> : ''}
            {item.subtype ? <p><i>Subtype:</i>  {item.subtype}</p> : ''}
            {item.estimatedcost ? <p><i>Estimated Cost:</i>  ${numberWithCommas(item.estimatedcost)}</p> : ''}
            {item.studyyear ? <p><i>Study Year:</i>  {item.studyyear}</p> : ''}
            {item.status && !item.layer.includes('LOMC') ? <p><i>Status:</i>  {item.status}</p> : ''}
            {item.streamname ? <p><i>Stream:</i>  {item.streamname}</p> : ''}
            {item.studyname && !item.layer.includes('LOMC') && !item.layer.includes('Effective') ? <p><i>Study Name:</i>  {item.studyname}</p> : ''}
            {item.jurisdiction ? <p><i>Jurisdiction:</i>  {item.jurisdiction}</p> : ''}
            {item.description ? <p><i>Description:</i>  {item.description}</p> : ''}
            {item.contract ? <p><i>Contract:</i>  {item.contract}</p> : ''}
            {item.contractor ? <p><i>Contractor:</i>  {item.contractor}</p> : ''}
            {item.local_gov ? <p><i>Local Government:</i>  {item.local_gov}</p> : ''}
            {item.problem ? <p><i>Problem:</i>  <a href="#" id={"problemdetail"+id}>{item.problem}</a></p> : ''}
            {item.mow_frequency ? <p><i>Frequency:</i>  {item.mow_frequency}</p> : ''}
            {item.debris_frequency ? <p><i>Frequency:</i>  {item.debris_frequency}</p> : ''}
            {item.acreage ? <p><i>Acreage:</i>  {item.acreage}</p> : ''}
            {item.length ? <p><i>Length:</i>  {item.length}</p> : ''}
            {item.problem_part_category ? <p><i>Problem Part Category:</i>  {item.problem_part_category}</p> : ''}
            {item.problem_part_subcategory ? <p><i>Problem Part Subcategory:</i>  {item.problem_part_subcategory}</p> : ''}
            {item.problem_part_name ? <p><i>Problem Part Name:</i>  {item.problem_part_name}</p> : ''}
            {item.problem_part_description ? <p><i>Description: </i>  {item.problem_part_description}</p> : ''}
            {item.source_name ? <p><i>Source Name:</i>  {item.source_name}</p> : ''}
            {item.source_complete_year ? <p><i>Source Completion Year:</i>  {item.source_complete_year}</p> : ''}
            {item.stream_name ? <p><i>Stream Name:</i>  {item.stream_name}</p> : ''}
            {item.local_government ? <p><i>Local Government:</i>  {item.local_government}</p> : ''}

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
            {item.mep_eligibilitystatus ? <p><i>MEP Status:</i>  {item.mep_eligibilitystatus}</p> : ''}
            
            {item.area?<p><i>Area:</i> {item.area} Acre</p>:''}
            {(item.perimeterFeet && item.perimeterMi) ?<p><i>Distance:</i> {item.perimeterFeet} Feet ( {item.perimeterMi} Miles)</p>:''}
            
            {item.lomc_case ? <p><i>LOMC Case:</i>  {item.lomc_case}</p> : ''}
            {item.lomc_type ? <p><i>LOMC Type:</i>  {item.lomc_type}</p> : ''}
            {item.lomc_identifier ? <p><i>LOMC Identifier:</i>  {item.lomc_identifier}</p> : ''}
            {item.status_date ? <p><i>Status Date:</i>  {item.status_date}</p> : ''}
            {item.status && item.layer.includes('LOMC') ? <p><i>Status:</i>  {item.status}</p> : ''}
            {item.effective_date ? <p><i>Effective Date:</i>  {item.effective_date}</p> : ''}
            
            {item.uniqueid ? <p><i>Unique ID:</i>  {item.uniqueid}</p> : ''}
            {item.streamname_mhfd ? <p><i>Stream Name (MHFD):</i>  {item.streamname_mhfd}</p> : ''}
            {item.streamname_fema ? <p><i>Stream Name (FEMA):</i>  {item.streamname_fema}</p> : ''}
            {item.studyname && item.studydate? <p><i>Study Name and Date:</i>  {`${item.studyname} and ${item.studydate}`}</p> : ''}
            {item.modellocation_mip ? <p><i>Model Location (MIP):</i> {item.modellocation_mip == '-'? item.modellocation_mip:<a href={item.modellocation_mip} target="_blank">Link</a>} </p> : ''}
            {item.modellocation_local ? <p><i>Model Location (MHFD):</i>  {item.modellocation_local == '-' ? item.modellocation_local : <a href={item.modellocation_local} target="_blank"> Link </a>}</p> : ''}
            {item.notes ? <p><i>Notes:</i>  {item.notes}</p> : ''}
            {item.hydra_modeltype ? <p><i>Model Type (Hydra ):</i>  {item.hydra_modeltype}</p> : ''}
            {item.hydra_modeldate ? <p><i>Model Date (Hydra):</i>  {item.hydra_modeldate}</p> : ''}
            {item.hydra_modelname ? <p><i>Model Name (Hydra):</i>  {item.hydra_modelname}</p> : ''}
            {item.hydro_modeltype ? <p><i>Model Type (Hydro):</i>  {item.hydro_modeltype}</p> : ''}
            {item.hydro_modeldate ? <p><i>Model Date (Hydro):</i>  {item.hydro_modeldate}</p> : ''}
            {item.hydro_modelname ? <p><i>Model Name (Hydro):</i>  {item.hydro_modelname}</p> : ''}
            {item.original_source_data ? <p><i>Original Source Data:</i>  {item.original_source_data}</p> : ''}
            {item.legacycode ? <p><i>Legacy Code:</i>  {item.legacycode}</p> : ''}
            

            {item.mepstatusdate ? <p><i>MEP Status Date:</i>  {item.mepstatusdate}</p> : ''}
            {item.notes && !item.layer.includes('LOMC') && !item.layer.includes('Effective')? <p><i>Notes/Comments:</i>  {item.notes}</p> : ''}
            {item.mep_summarynotes ? <p><i>Notes/Comments:</i>  {item.mep_summarynotes}</p> : ''}
            {item.servicearea ? <p><i>Service Area:</i>  {item.servicearea}</p> : ''}
            {item.mhfd_servicearea ? <p><i>Service Area:</i>  {item.mhfd_servicearea}</p> : ''}
            {item.watershedmanager ? <p><i>Watershed Manager:</i>  {item.watershedmanager}</p> : ''}
            {item.email? <p><i>Contact Us: </i><a href={`mailto:${item.email}`}> {item.email}</a></p>:''}
            {item.constructionmanagers ? <p><i>Construction Manager:</i>  {item.constructionmanagers}</p> : ''}
            {item.city ? <p><i>City:</i>  {item.city}</p> : ''}
            {item.mhfd_code ? <p><i>MHFD Code:</i>  {item.mhfd_code}</p> : ''}
            {item.catch_acre ? <p><i>Acreage:</i>  {item.catch_acre}</p> : ''}
            {item.dfirm_id ? <p><i>DFIRM ID:</i>  {item.dfirm_id}</p> : ''}
            {item.fld_zone ? <p><i>Flood Zone:</i>  {item.fld_zone}</p> : ''}
            {item.zone_subty ? <p><i>Flood Zone Subtype:</i>  {item.zone_subty}</p> : ''}
            {item.sfha_tf ? <p><i>Special Flood Hazard Zone:</i>  {item.sfha_tf}</p> : ''}
            {item.study_name ? <p><i>Study Name:</i>  {item.study_name}</p> : ''}
            {item.floodplain_source ? <p><i>Source:</i>  {item.floodplain_source}</p> : ''}
            {item.floodplain_type ? <p><i>Flood Zone Subtype:</i>  {item.floodplain_type}</p> : ''}
            {item.county ? <p><i>County:</i>  {item.county}</p> : ''}
            {item.service_area ? <p><i>Service Area:</i>  {item.service_area}</p> : ''}
            {item.notes_floodplains ? <p><i>Notes:</i>  {item.notes_floodplains}</p> : ''}
            {item.volume ? <p><i>Volume:</i>  {item.volume} acre-ft</p> : ''}
            {isComponent && item.projectid === undefined && <Button id={"buttonCreate-" + id} style={{ width: '100%', marginTop: '10px'}} className="btn-purple">Create Project</Button>}
            {item.layer == MENU_OPTIONS.MEASURES && 
              <div style={{ padding: '10px', marginTop: '15px', color: '#28C499', display:'flex'}}>
                <Button id={"buttonzoom-" + id} style={{ width: '50%', height: '43px', whiteSpace: 'normal', wordWrap: 'break-word', marginRight: '10px'}} className="btn-purple" >Center to this area</Button>
                <Button id={"buttondelete-" + id} style={{ width: '50%',height: '43px', whiteSpace: 'normal', wordWrap: 'break-word', color: '#28C499' }} className="btn-borde">Delete</Button>
              </div>
            }
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
          {item.description ? <p><i>Description:</i>  {item.description}</p> : ''}

          {item.contract ? <p><i>Contract:</i>  {item.contract}</p> : ''}
          {item.contractor ? <p><i>Contractor:</i>  {item.contractor}</p> : ''}
          {item.local_gov ? <p><i>Local Government:</i>  {item.local_gov}</p> : ''}
          {item.mow_frequency ? <p><i>Frequency:</i>  {item.mow_frequency}</p> : ''}
          {item.debris_frequency ? <p><i>Frequency:</i>  {item.debris_frequency}</p> : ''}
          {item.acreage ? <p><i>Acreage:</i>  {item.acreage}</p> : ''}
          {item.length ? <p><i>Length:</i>  {item.length}</p> : ''}
          {item.problem ? <p><i>Problem:</i>  {item.problem}</p> : ''}

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
          
          {item.notes  ? <p><i>Notes/Comments:</i>  {item.notes}</p> : ''}
          {item.mep_summarynotes ? <p><i>Notes/Comments:</i>  {item.mep_summarynotes}</p> : ''}
          {item.servicearea ? <p><i>Service Area:</i>  {item.servicearea}</p> : ''}
          {item.mhfd_servicearea ? <p><i>Service Area:</i>  {item.mhfd_servicearea}</p> : ''}
          {item.watershedmanager ? <p><i>Watershed Manager:</i>  {item.watershedmanager}</p> : ''}
          {item.constructionmanagers ? <p><i>Construction Manager:</i>  {item.constructionmanagers}</p> : ''}
          {item.city ? <p><i>City:</i>  {item.city}</p> : ''}
          {item.mhfd_code ? <p><i>MHFD Code:</i>  {item.mhfd_code}</p> : ''}
          {item.catch_acre ? <p><i>Acreage:</i>  {item.catch_acre}</p> : ''}
          {item.dfirm_id ? <p><i>DFIRM ID:</i>  {item.dfirm_id}</p> : ''}
          {item.fld_zone ? <p><i>Flood Zone:</i>  {item.fld_zone}</p> : ''}
          {item.zone_subty ? <p><i>Flood Zone Subtype:</i>  {item.zone_subty}</p> : ''}
          {item.sfha_tf ? <p><i>Special Flood Hazard Zone:</i>  {item.sfha_tf}</p> : ''}
          {item.study_name ? <p><i>Study Name:</i>  {item.study_name}</p> : ''}
          {item.floodplain_source ? <p><i>Source:</i>  {item.floodplain_source}</p> : ''}
          {item.floodplain_type ? <p><i>Flood Zone Subtype:</i>  {item.floodplain_type}</p> : ''}
          {item.county ? <p><i>County:</i>  {item.county}</p> : ''}
          {item.service_area ? <p><i>Service Area:</i>  {item.service_area}</p> : ''}
          {item.notes_floodplains ? <p><i>Notes:</i>  {item.notes_floodplains}</p> : ''}
          {isComponent && !isWR && item.projectid === undefined && <Button id={'component-'+id}  style={{ width: '100%', marginTop: '10px'}} className="btn-purple" >{item.added}</Button>}
      </div>
      </Card>
  </div>
};