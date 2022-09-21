import React, { useEffect, useState } from "react";
import { Checkbox, Button, Collapse, Popover, Switch } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import {
  WATERSHED_FILTERS,
  STREAMS_FILTERS,
  GUIDELINES,
  PROBLEMS_TRIGGER,
  COMPONENT_LAYERS,
  MEP_PROJECTS,
  ROUTINE_MAINTENANCE,
  PROJECTS_MAP_STYLES,
  SERVICE_AREA_LAYERS,
  MUNICIPALITIES,
  COUNTIES_LAYERS,
  FLOODPLAINS,
  FEMA_FLOOD_HAZARD,
  popUps,
  NRCS_SOILS,
  DWR_DAM_SAFETY,
  STREAM_MANAGEMENT_CORRIDORS,
  BCZ_PREBLE_MEADOW_JUMPING,
  BCZ_UTE_LADIES_TRESSES_ORCHID,
  RESEARCH_MONITORING,
  CLIMB_TO_SAFETY,
  SEMSWA_SERVICE_AREA,
  BORDER,
  BLOCK_CLEARANCE_ZONES_LAYERS,
  AREA_BASED_MASK,
  ACTIVE_LOMS,
  EFFECTIVE_REACHES,
  FLOOD_HAZARDS
} from '../../../constants/constants';


const { Panel } = Collapse;

export const genExtra07 = () => (
  <div className="filter-coll-header" key="fa37JncCHryD">
     <div>OTHER LAYERS</div>
    <Switch key="S22JjzhMaiRr" size="small"/>
  </div>

);

const contentPopOver = (text: string) => {
  return <div className="popoveer-00"><i>{text}</i></div>
}
const contentPopOverWithLink = (text: string, link: string) => {
  return <div className="popoveer-00"><i>{text}</i> <a href={link} target='_blank'>Info Sheet</a></div>
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({
  selectCheckboxes,
  setVisibleDropdown,
  selectedLayers,
  removePopup,
  isWR
}: {
  selectCheckboxes: Function,
  setVisibleDropdown: Function,
  selectedLayers: any,
  removePopup: Function,
  isWR?: boolean
}) => {
  const [switches, setSwitches] = useState({
    [GUIDELINES]: true,
    [PROBLEMS_TRIGGER]: true,
    [FLOOD_HAZARDS.name]: false,
    [STREAMS_FILTERS]: true,
    [PROJECTS_MAP_STYLES.name]: true,
    [COMPONENT_LAYERS.name]: false,
    [MEP_PROJECTS.name]: false,
    [ROUTINE_MAINTENANCE.name]: false,
    [WATERSHED_FILTERS]: false,
    [FLOODPLAINS.name]: false,
    [FEMA_FLOOD_HAZARD]: false,
    [EFFECTIVE_REACHES]: false,
    [ACTIVE_LOMS]: false,
    [SERVICE_AREA_LAYERS.name]: false,
    [COUNTIES_LAYERS.name]: false,
    [MUNICIPALITIES.name]: false,
    [NRCS_SOILS]: false,
    [DWR_DAM_SAFETY]: false,
    [STREAM_MANAGEMENT_CORRIDORS]: false,
    [BLOCK_CLEARANCE_ZONES_LAYERS]: false,
    [BCZ_PREBLE_MEADOW_JUMPING]: false,
    [BCZ_UTE_LADIES_TRESSES_ORCHID]: false,
    [RESEARCH_MONITORING]: false,
    [CLIMB_TO_SAFETY]: false,
    [SEMSWA_SERVICE_AREA]: false
  });

  const [groups, setGroups] = useState( isWR? {
    MHFDData: false,
    hydrologic: false,
    hydraulic: false,
    geomorphology: false,
    environmental: false,
    humanConnection: false,
    boundaries: false,
    workrequest: false
  }:{
    MHFDData: false,
    hydrologic: false,
    hydraulic: false,
    geomorphology: false,
    environmental: false,
    humanConnection: false,
    boundaries: false
  });
  let locationType =  'GUIDELINES';
  useEffect(() => {
    const newGroups: any = {};
    if (switches[PROBLEMS_TRIGGER] && switches[PROJECTS_MAP_STYLES.name] && switches[COMPONENT_LAYERS.name]
      && switches[MEP_PROJECTS.name] && switches[ROUTINE_MAINTENANCE.name]) {
        newGroups['MHFDData'] = true;
      } else {
        newGroups['MHFDData'] = false;
      }
    if ( switches[WATERSHED_FILTERS] && switches[NRCS_SOILS] && switches[STREAMS_FILTERS]) {
      newGroups['hydrologic'] = true;
    } else {
      newGroups['hydrologic'] = false;
    }
    if (switches[FLOODPLAINS.name] && switches[FEMA_FLOOD_HAZARD]
      && switches[EFFECTIVE_REACHES] && switches[ACTIVE_LOMS]) {
      newGroups['hydraulic'] = true;
    } else {
      newGroups['hydraulic'] = false;
    }
    if (switches[SERVICE_AREA_LAYERS.name] && switches[COUNTIES_LAYERS.name] && switches[MUNICIPALITIES.name] && switches[SEMSWA_SERVICE_AREA] ) {
      newGroups['boundaries'] = true;
    } else {
      newGroups['boundaries'] = false;
    }
    if(switches[STREAM_MANAGEMENT_CORRIDORS]){
      newGroups['geomorphology'] = true;
    } else {
      newGroups['geomorphology'] = false;
    }
    if(switches[BLOCK_CLEARANCE_ZONES_LAYERS] && switches[RESEARCH_MONITORING]){
      newGroups['environmental'] = true;
    } else {
      newGroups['environmental'] = false;
    }
    if(switches[CLIMB_TO_SAFETY]  && switches[DWR_DAM_SAFETY]){
      newGroups['humanConnection'] = true;
    } else {
      newGroups['humanConnection'] = false;
    }
      if(switches[BORDER] && switches[AREA_BASED_MASK]) {
        newGroups['workrequest'] = true;
      } else {
        newGroups['workrequest'] = false;
      }
    setGroups({...groups, ...newGroups});
  }, [switches]);
  useEffect(() => {
    const newSwitches: any = {...switches};
    for(let val in newSwitches) {
      newSwitches[val] = false;
    }
    for (const layer of selectedLayers) {
      if (layer.hasOwnProperty('name')) {
        const key: string = layer['name'];
        newSwitches[key] = true;
      } else {
        newSwitches[layer] = true;
      }
    }
      setSwitches(newSwitches);
    
  }, [selectedLayers]);
  useEffect(()=>{
    if(isWR) {
      setSwitches({...switches,...{[BORDER]:false, [AREA_BASED_MASK]:false}})
    }
  },[]);
  const changeGroup = (value: boolean, elements: Array<any>, name: string) => {
    let switchSelected: any[] = [...selectedLayers];
    const newSwitches: any = {};
    setGroups({...groups, [name]: value});
    for (const element of elements) {
      if (element.hasOwnProperty('name')) {
        const key: string = String(element['name']);
        newSwitches[key] = value;
      } else {
        newSwitches[element] = value;
      }
      if (value) {
        switchSelected.push(element);
      } else {
        switchSelected = switchSelected.filter((item) => {
          return element !== item;
        });
      }
    }
    setSwitches({...switches, ...newSwitches});
    selectCheckboxes(switchSelected);
    removePopup();
  }
  const emptyStyle: React.CSSProperties = {};
  const weightStyle: React.CSSProperties = {'fontWeight': 500};
  const genExtra = () => {
    return (<div className="filter-coll-header" key="V41mtzxlYvKW">
      <div key="rO72tK0LK0e1" style={(switches[PROBLEMS_TRIGGER] || switches[PROJECTS_MAP_STYLES.name] ||
        switches[MEP_PROJECTS.name] || switches[ROUTINE_MAINTENANCE.name] || switches[COMPONENT_LAYERS.name]
          || switches[FLOOD_HAZARDS.name]
        )
        ? emptyStyle : emptyStyle }>MHFD DATA </div>
       <Switch key="MFSv8kP07U20" checked={groups['MHFDData']} size="small" onClick={(value, event) => {
         event.stopPropagation();
         changeGroup(value, [PROBLEMS_TRIGGER,
          FLOOD_HAZARDS,
          PROJECTS_MAP_STYLES,
          MEP_PROJECTS,
          ROUTINE_MAINTENANCE,
          COMPONENT_LAYERS], 'MHFDData'
      )} }/>
    </div>)
  };
  const genExtra01 = () => {
    return (
      <div className="filter-coll-header" key="o0J90xA0GWXI">

         <div key="Iwo7J4ogHFZQ" style={(switches[WATERSHED_FILTERS] || switches[NRCS_SOILS]) ? weightStyle : emptyStyle }>{/*<img key="xwQ2RQ0DRJKR" src="/Icons/icon-77.svg" alt="" />*/} HYDROLOGIC </div>
        <Switch key="ETPVzxlFrXL8" checked={groups['hydrologic']} size="small" onClick={(value, event) => {
         event.stopPropagation();
         changeGroup(value, [STREAMS_FILTERS, WATERSHED_FILTERS, NRCS_SOILS
         ], 'hydrologic')}
       }/>
      </div>
  )};
  const genExtra02 = () => {
    return (
    <div className="filter-coll-header" key="b7mtKLHIGhIh">
       <div key="5JuWcFwrgJKd" style={(switches[FLOODPLAINS.name] || switches[FEMA_FLOOD_HAZARD] 
        || switches[ACTIVE_LOMS] || switches[EFFECTIVE_REACHES]) ? weightStyle : emptyStyle}>HYDRAULIC</div>
      <Switch key="KIwYxEF3V7Z8" checked={groups['hydraulic']} size="small" onClick={(value, event) => {
         event.stopPropagation();
         changeGroup(value, [FLOODPLAINS,
          FEMA_FLOOD_HAZARD, ACTIVE_LOMS, EFFECTIVE_REACHES
         ], 'hydraulic')}
       }/>
    </div>
    )
  };

  const genExtra03 = () => {
    return(
      <div className="filter-coll-header" key="KTx0nFe1IX5t">
        <div  key="jH22F5gXOa5L" style={(switches[STREAM_MANAGEMENT_CORRIDORS]) ? weightStyle : emptyStyle}>GEOMORPHOLOGY</div>
        <Switch key="YL8rqDiZSkZf" checked={groups['geomorphology']} size="small" onClick={(value, event) => {
          event.stopPropagation();
          changeGroup(value, [STREAM_MANAGEMENT_CORRIDORS], 'geomorphology')
        }}/>
      </div>
    )
  };


 const genExtra04 = () => {
   return (
    <div className="filter-coll-header" key="oEDAmGTXXqqv">
       <div  key="kCd5WKE2fMtV" style={(switches[BCZ_PREBLE_MEADOW_JUMPING] || switches[BCZ_UTE_LADIES_TRESSES_ORCHID] ||
        switches[RESEARCH_MONITORING]) ? weightStyle : emptyStyle}>ENVIRONMENTAL</div>
      <Switch key="4i6bYuUG67La" checked={groups['environmental']} size="small" onClick={(value, event) => {
          event.stopPropagation();
          changeGroup(value, [BLOCK_CLEARANCE_ZONES_LAYERS, RESEARCH_MONITORING], 'environmental')
        }}/>
    </div>
    )
  };
  const genExtra05 = () => (
    <div className="filter-coll-header" key="SXd5tUbO4bNP">
      <div key="B0TxnkWrSaQy" style={switches[CLIMB_TO_SAFETY] || switches[DWR_DAM_SAFETY] ? weightStyle : emptyStyle}>COMMUNITY VALUES</div>
      <Switch key="G4JLgeipeBlQ" checked={groups['humanConnection']} size="small" onClick={(value, event) => {
          event.stopPropagation();
          changeGroup(value, [CLIMB_TO_SAFETY, DWR_DAM_SAFETY], 'humanConnection')
        }}/>
    </div>
  );



 const genExtra06 = () => {
    return (<div className="filter-coll-header" key="tFFJpgHJYTrW">
      <div key="z0w2kQw1UFK8" style={(switches[SERVICE_AREA_LAYERS.name] || switches[COUNTIES_LAYERS.name] ||
        switches[MUNICIPALITIES.name] || switches[SEMSWA_SERVICE_AREA]) ? weightStyle : emptyStyle}>
        BOUNDARIES
      </div>
      <Switch key="qc4M3tt2un4c" checked={groups['boundaries']} size="small" onClick={(value, event) => {
         event.stopPropagation();
         changeGroup(value, [SERVICE_AREA_LAYERS,
          COUNTIES_LAYERS,
          MUNICIPALITIES,
          SEMSWA_SERVICE_AREA
         ], 'boundaries')}
       }/>
    </div>
  )};
  const genExtra07 = (title: any) => (
    <div className="filter-coll-header" key="DzdiEvq8vmf7">
      <div  key="TZAPjUAZ6Cu8" style={switches[GUIDELINES] ? weightStyle : emptyStyle}>{title} </div>
      <Switch key="7GX33A8WhGwR" checked={groups['workrequest']} size="small" onClick={(value, event) => {
          event.stopPropagation();
          changeGroup(value, [BORDER,AREA_BASED_MASK], 'workrequest')
        }}/>
    </div>
  );
  const onChange = (value: boolean, item: any) => {
    if (item.hasOwnProperty('name')) {
      setSwitches({...switches, [item['name']]: value});
    } else {
      setSwitches({...switches, [item]: value});
    }
    let switchSelected: any[] = [...selectedLayers];
    if (value) {
      switchSelected.push(item);
    } else {
      switchSelected = switchSelected.filter((element) => {
        return element !== item;
      });
    }
    selectCheckboxes(switchSelected);

    removePopup();
  }

  return <div className="ant-dropdown-menu map-filter-s" key="k40pHuxNf5JE">
    <div className="filter-map" key="ItyS3QrBgOCh">
      <div className="title-filter-map" key="WKCDa6eIAd7R">
        <h6>Layers</h6>
        <Button className="btn-transparent" onClick={() => {
          removePopup();
          setVisibleDropdown(false);
        }}><CloseOutlined /></Button>
      </div>
      <Checkbox.Group value={selectedLayers} onChange={(items) => {
        selectCheckboxes(items);
        removePopup();
      }}>
        <Collapse defaultActiveKey={['6asdffds', '1', '2', '3', '4', '5', '6', '7', '8']} key="V4mBA5NQvgvvxJt0">
          { 
          <Panel header="" key="6asdffds" extra={genExtra07(locationType)}>
            <p>
              <img key="jk9N6L5cdFnD" src="/Icons/Filters/ic_borders.png" width="18px" alt="" />
                  Borders
                  <Popover key="LSWV3bvYghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.borders)}>
                <img key="l4EgN5e4poSt" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="7VVlkJw5jSYm" size="small" checked={switches[BORDER]} onClick={(value) => onChange(value, BORDER)} />
            </p>
            <p>
              <img key="4TKi92Ws4iYQ" src="/Icons/Filters/ic_mask.png" width="18px" alt=""  />
                  Area-Based Mask
                  <Popover key="oCSbysV6Nyp5" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.area_based_mask)}>
                <img key="Fl8wCfiE81uF" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="1O736dRsouSm" size="small" checked={switches[AREA_BASED_MASK]} onClick={(value) => onChange(value, AREA_BASED_MASK)} />
            </p>
          </Panel>}
          <Panel header="" key="1" extra={genExtra()}>
            <p>
              <img key="mxq8tfB7PK3Z" src="/Icons/Filters/ic_problems.png" width="18px" alt="" />
                  Problems
                  <Popover key="zmn5lhLm5Qn9" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.problem)}>
                <img key="2F2q9UatPR1G" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="4DNRVR0SBlXw" checked={switches[PROBLEMS_TRIGGER]} size="small" onClick={(value) => onChange(value, PROBLEMS_TRIGGER)} />
            </p>
            
            <p>
              <img key="hygfgsbnF7gs" src="/Icons/ic-problem-parts.png" width="18px" alt="" />
                  Problem Parts
                  <Popover key="uibfUYSsd7" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.problem)}>
                <img key="778POIAOSDaasse" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="COCh15" checked={switches[FLOOD_HAZARDS.name]} size="small" onClick={(value) => onChange(value, FLOOD_HAZARDS)} />
            </p>

            <p>
              <img key="QqgTFRdHgd5n" src="/Icons/Filters/ic_components.png" width="18px" alt="" />
                  Components
                  <Popover key="5ffS4gi9r6YK" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.component)}>
                <img key="VZmgIIaj8ECL" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="fncKQh5TLkvP" checked={switches[COMPONENT_LAYERS.name]} size="small" onClick={(value) => onChange(value, COMPONENT_LAYERS)} />
            </p> 

            <p>
              <img key="PcYEg5ZBeJpu" src="/Icons/Filters/ic_projects.png" width="18px" alt="" />
                  Projects
                  <Popover key="bNdiZq3CbeW2" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.project)}>
                <img key="JcTeKP4j1ayf" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="fXqHqdCQ0n8X" className="projectsswitch" checked={switches[PROJECTS_MAP_STYLES.name]} size="small"  onClick={(value) => onChange(value, PROJECTS_MAP_STYLES)} />
            </p>

            <p>
              <img key="b9jDnEF7oij8" src="/Icons/Filters/ic_MEP.png" width="18px" alt="" />
                  MEP Projects
                  <Popover key="5ls4MqjzLXF9" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.mep_projects)}>
                <img key="APZ8CffopP1a" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="dEfRuPX0AP2U" checked={switches[MEP_PROJECTS.name]} size="small" onClick={(value) => onChange(value, MEP_PROJECTS)} />
            </p>

            <p>
              <img key="DmSWHhgS6DaI" src="/Icons/Filters/ic_routine.png" width="18px" alt="" />
                  Routine Maintenance
                  <Popover key="rE4eb5EEJudC" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.routine_maintenance)}>
                <img key="HACPYCulwMIE" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="1wg57ENyQSc1" checked={switches[ROUTINE_MAINTENANCE.name]} size="small" onClick={(value) => onChange(value, ROUTINE_MAINTENANCE)} />
            </p>
          </Panel>
          <Panel header="" key="2" extra={genExtra01()}>
            <p>
              <img key="VpFnjqz019PZ" src="/Icons/Filters/ic_streams.png" width="18px" alt="" style={{borderRadius:'2px'}}/>
                  Streams
                  <Popover key="LHIIbYWaSAfa" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.watershed)}>
                <img key="M3WnT7oyw2jd" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="sibrryODEhTp" checked={switches[STREAMS_FILTERS]} size="small" onClick={(value) => onChange(value, STREAMS_FILTERS)} />
            </p>
            <p>
              <img key="FzQi73GT6kGX" src="/Icons/Filters/ic_watersheds.png" width="18px" alt="" />
                  Watersheds
                  <Popover key="r5Ul7DOxwxpl" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.watershed)}>
                <img key="wDyAuRx8OLoV" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="P2zTmDzeITNN" checked={switches[WATERSHED_FILTERS]} size="small" onClick={(value) => onChange(value, WATERSHED_FILTERS)} />
            </p> 

            <p>
              <img key="ekLYh8KbLIjE" src="/Icons/Filters/ic_NRCS.png" width="18px" alt="" />
                  NRCS Soils
                  <Popover key="ihK408aNAXrw" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.nrcs_soils)}>
                <img key="koY1HwMtgfSL" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="nmx72gLiLfnK" size="small" checked={switches[NRCS_SOILS]} onClick={(value) => onChange(value, NRCS_SOILS)} />
            </p> 

            <p style={{ display: 'none' }}>
              <img key="lLhtsWpaKMZZ" src="/Icons/Filters/ic_stream.png" width="18px" alt="" style={{borderRadius:'2px'}} />
                  Streams
                  <Popover key="GwTubvFNhAUh" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.stream_mang_corridors)}>
                <img key="ppQASDSBYA4O" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="etwzDWYTQzNz" size="small" onClick={(value) => onChange(value, STREAMS_FILTERS)} />
            </p> 
          </Panel>

          <Panel header="" key="3" extra={genExtra02()}>
            <p>
              <img key="ubMZlqHadfj3" src="/Icons/ic_floodplains@2x.png" width="18px" alt="" style={{borderRadius:'2px'}} />
                  Floodplains (Non-FEMA)
                  <Popover key="sBEOJIkyAevN" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.floodplains)}>
                <img key="ATpYRAYLlutV" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover> <Switch key="j85MnoOfyc1H" checked={switches[FLOODPLAINS.name]}  size="small" onClick={(value) => onChange(value, FLOODPLAINS)} />
            </p> 

            <p>
              <img key="vlF3N8QYaD41" src="/Icons/Filters/ic_FEMA.png" width="18px" alt="" />
                  FEMA Flood Hazard Zones
                  <Popover key="OcK7VDcELgY8" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.fema_flood_hazard_zones)}>
                <img key="SwlQXmiQVvTt" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="4rPe5RdR4xYX" checked={switches[FEMA_FLOOD_HAZARD]} size="small" onClick={(value) => onChange(value, FEMA_FLOOD_HAZARD)} />
            </p>  

            
            <p>
              <img key="B9lUpHdHCMgj" src="/Icons/icon-effective-reaches.png" width="18px" alt="" style={{borderRadius:'2px'}} />
                  Effective Reaches
                  <Popover key="7O7aHaRJRovW" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.effective_reaches)}>
                <img key="GYvKUUrfba7Q" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="pif15LiChpkx" checked={switches[EFFECTIVE_REACHES]} size="small" onClick={(value) => onChange(value, EFFECTIVE_REACHES)} />
            </p> 

            <p>
              <img key="NCGp0AJGgFYA" src="/Icons/lomcs_main.png" width="18px" alt="" style={{borderRadius:'2px'}} />
                  Active LOMCs
                  <Popover key="hPnIxvgndJmg" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.active_lomcs)}>
                <img key="fTqKGbHenWRl" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="gk2KxaVeyGuv" checked={switches[ACTIVE_LOMS]} size="small" onClick={(value) => onChange(value, ACTIVE_LOMS)} />
            </p>
          </Panel>
          <Panel header="" key="4" extra={genExtra03()}>

            <p>
              <img key="Bp89Di5Bmf75" src="/Icons/ic_SMC@2x.png" width="18px" alt="" style={{borderRadius:'2px'}}  />
                  Stream Management Corridors
                  <Popover key="7yY6UlvTQHOL" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOverWithLink(popUps.stream_mang_corridors, 'SMC_info_sheet.pdf')}>
                <img key="RU9fQZXZNdhY" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="Lmj6RqBWmhbH" size="small" checked={switches[STREAM_MANAGEMENT_CORRIDORS]} onClick={(value) => onChange(value, STREAM_MANAGEMENT_CORRIDORS)} />
            </p>
          </Panel>

          <Panel header="" key="5" extra={genExtra04()}>
            <p>
              <img key="RWkrm9BBbIqz" src="/Icons/ic_BlockClearanceZone@2x.png" width="18px" alt="" style={{borderRadius:'2px'}} />
                  Block Clearance Zone
                  <Popover key="qLYDzFjK1SQQ" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.block_clearence_zones)}>
                <img key="Iav2HWJi22Ym" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="9jxkzojp7F06" size="small" checked={switches[BLOCK_CLEARANCE_ZONES_LAYERS]} onClick={(value) => onChange(value, BLOCK_CLEARANCE_ZONES_LAYERS)} />
            </p>
            <p>
              <img key="RQsUotjMAPo4" src="/Icons/Filters/ic_research.png" width="18px" alt=""  />
                  Research/Monitoring
                  <Popover key="txTEfsUbrT3o" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.research_monitoring)}>
                <img key="9e5UQnxpBnIz" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="fzLpO9uF5LTi" size="small" checked={switches[RESEARCH_MONITORING]} onClick={(value) => onChange(value, RESEARCH_MONITORING)} />
            </p>
          </Panel>

          <Panel header="" key="6" extra={genExtra05()}>
            <p>
              <img key="DvH4OKqWywyM" src="/Icons/Filters/ic_climb.png" width="18px" alt="" />
                  Climb to Safety Signs
                  <Popover key="hw9sjRsOQBCm" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.climb_to_safety)}>
                <img key="L61ORS6cONfm" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="hVGdPFx6B4xs" size="small" checked={switches[CLIMB_TO_SAFETY]} onClick={(value) => onChange(value, CLIMB_TO_SAFETY)} />
            </p>
            <p>
              <img key="9YinsTRVwIpC" src="/Icons/Filters/ic_DWR.png" width="18px" alt="" />
                  DWR Dam Safety
                  <Popover key="t7qedHPH0Pbx" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.dam_safety)}>
                <img key="04awLSrS1YFr" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="1fMvx97oGwQr" size="small" checked={switches[DWR_DAM_SAFETY]} onClick={(value) => onChange(value, DWR_DAM_SAFETY)} />
            </p>
          </Panel>
          <Panel header="" key="7" extra={genExtra06()}>
            <p>
              <img key="WpFu0RhJVihu" src="/Icons/Filters/ic_service.png" width="18px" alt="" />
                  Service Areas
                  <Popover key="9nWX89HndWQ2" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.service_area)}>
                <img key="lL7uQ4mutzmr" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="QT9tAqnJcIoi" checked={switches[SERVICE_AREA_LAYERS.name]} size="small" onClick={(value) => onChange(value, SERVICE_AREA_LAYERS)} />
            </p>

            <p>
              <img key="R3W4Zw5KGCCe" src="/Icons/Filters/ic_counties.png" width="18px" alt="" />
                  Counties
                  <Popover key="ExW5wIwLm5Eu" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.counties)}>
                <img key="u2BUKzCj0ioa" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="drsr15VF21Kw" checked={switches[COUNTIES_LAYERS.name]} size="small" onClick={(value) => onChange(value, COUNTIES_LAYERS)} />
            </p>

            <p>
              <img key="HEH1KWvCY6es" src="/Icons/Filters/ic_municipalities.png" width="18px" alt="" />
                  Municipalities
                  <Popover key="3qb2XNa8CSzD" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.municipalities)}>
                <img key="VUSVTmSi1jkJ" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="FfTlk7blvBlS" checked={switches[MUNICIPALITIES.name]} size="small" onClick={(value) => onChange(value, MUNICIPALITIES)} />
            </p>

            <p>
              <img key="YLajmXwHzNlS" src="/Icons/Filters/ic_SEMSWA.png" width="18px" alt="" />
                  SEMSWA Service Area
                  <Popover key="7DB6utP8WqtG" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.semswa_service_area)}>
                <img key="vV0rglHC5qtr" className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch key="Nq6NBrnI2wPx" size="small" checked={switches[SEMSWA_SERVICE_AREA]} onClick={(value) => onChange(value, SEMSWA_SERVICE_AREA)} />
            </p>

            <p style={{ display: 'none' }}>
              MHFD Boundary <Switch key="pm3MbuaWPYN3" size="small" defaultChecked />
            </p>
          </Panel>
        </Collapse>
      </Checkbox.Group>
    </div>

    <div className="btn-footer-02">
      <Button className="btn-borde" onClick={() => {
        removePopup();
        setVisibleDropdown(false);
      }}>Close</Button>

    </div>
  </div>
}
