import React, { useEffect, useState } from "react";
import { Checkbox, Row, Col, Button, Collapse, Popover, Switch } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import {
  FLOODPLAINS_FEMA_FILTERS,
  FLOODPLAINS_NON_FEMA_FILTERS,
  WATERSHED_FILTERS,
  STREAMS_FILTERS,
  SERVICE_AREA_FILTERS,
  MUNICIPALITIES_FILTERS,
  COUNTIES_FILTERS,
  MHFD_BOUNDARY_FILTERS,
  PROBLEMS_TRIGGER,
  PROJECTS_TRIGGER,
  COMPONENT_LAYERS,
  MEP_PROJECTS,
  ROUTINE_MAINTENANCE,
  PROJECTS_MAP_STYLES,
  SERVICE_AREA_LAYERS,
  MUNICIPALITIES,
  COUNTIES_LAYERS,
  STUDIES,
  FLOODPLAINS,
  FEMA_FLOOD_HAZARD,
  XSTREAMS,
  popUps,
  NRCS_SOILS,
  DWR_DAM_SAFETY,
  STREAM_MANAGEMENT_CORRIDORS,
  BCZ_PREBLE_MEADOW_JUMPING,
  BCZ_UTE_LADIES_TRESSES_ORCHID,
  RESEARCH_MONITORING,
  CLIMB_TO_SAFETY,
  SEMSWA_SERVICE_AREA
} from '../../../constants/constants';


const { Panel } = Collapse;

export const genExtra07 = () => (
  <div className="filter-coll-header">
     <div>{/*<img src="/Icons/icon-80.svg" alt="" />*/} OTHER LAYERS</div>
    <Switch size="small"/>
  </div>

);
const content = (<div className="popoveer-00"><i>Components are specific elements of a problem (i.e. master planned improvements or stream assessment data points) that are the building blocks for projects to solve those problems.</i></div>);

const contentPopOver = (text: string) => {
  return <div className="popoveer-00"><i>{text}</i></div>
}

export default ({ selectCheckboxes, setVisibleDropdown, selectedLayers, setSelectedCheckBox, removePopup, isExtendedView,  }:
  { selectCheckboxes: Function, setVisibleDropdown: Function, selectedLayers: any, setSelectedCheckBox: Function, removePopup: Function, isExtendedView: boolean}) => {
  // const [checkBoxes, setCheckboxes] = useState(selectedLayers);
  const [switches, setSwitches] = useState({
    [PROBLEMS_TRIGGER]: true,
    [PROJECTS_MAP_STYLES.name]: true,
    [COMPONENT_LAYERS.name]: false,
    [MEP_PROJECTS.name]: false,
    [ROUTINE_MAINTENANCE.name]: false,
    [WATERSHED_FILTERS]: false,
    [FLOODPLAINS.name]: false,
    [FEMA_FLOOD_HAZARD]: false,
    [SERVICE_AREA_LAYERS.name]: false,
    [COUNTIES_LAYERS.name]: false,
    [MUNICIPALITIES.name]: false,
    [NRCS_SOILS]: false,
    [DWR_DAM_SAFETY]: false,
    [STREAM_MANAGEMENT_CORRIDORS]: false,
    [BCZ_PREBLE_MEADOW_JUMPING]: false,
    [BCZ_UTE_LADIES_TRESSES_ORCHID]: false,
    [RESEARCH_MONITORING]: false,
    [CLIMB_TO_SAFETY]: false,
    [SEMSWA_SERVICE_AREA]: false
  });
  /**
 export const NRCS_SOILS = 'usda_nrcs_soils';
export const DWR_DAM_SAFETY = 'dwr_dam_safety';
export const STREAM_MANAGEMENT_CORRIDORS = 'stream_management_corridors';
export const BCZ_PREBLE_MEADOW_JUMPING =
'bcz_prebles_meadow_jumping_mouse';
export const BCZ_UTE_LADIES_TRESSES_ORCHID =
'bcz_ute_ladies_tresses_orchid';
export const RESEARCH_MONITORING =
'stormwater_research_sites';
export const CLIMB_TO_SAFETY = 'climb_to_safety_signs';
export const SEMSWA_SERVICE_AREA =
'semswa_service_area';
 */
  const [groups, setGroups] = useState({
    MHFDData: false,
    hydrologic: false,
    hydraulic: false,
    geomorphology: false,
    environmental: false,
    humanConnection: false,
    boundaries: false
  });
  useEffect(() => {
    const newGroups: any = {};
    if (switches[PROBLEMS_TRIGGER] && switches[PROJECTS_MAP_STYLES.name] && switches[COMPONENT_LAYERS.name]
      && switches[MEP_PROJECTS.name] && switches[ROUTINE_MAINTENANCE.name]) {
        newGroups['MHFDData'] = true;
      } else {
        newGroups['MHFDData'] = false;
      }
    if ( switches[WATERSHED_FILTERS] && switches[NRCS_SOILS]) {
      newGroups['hydrologic'] = true;
    } else {
      newGroups['hydrologic'] = false;
    }
    if (switches[FLOODPLAINS.name] && switches[FEMA_FLOOD_HAZARD] && switches[DWR_DAM_SAFETY]) {
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
    if(switches[BCZ_PREBLE_MEADOW_JUMPING] && switches[BCZ_UTE_LADIES_TRESSES_ORCHID] && switches[RESEARCH_MONITORING]){
      newGroups['environmental'] = true;
    } else {
      newGroups['environmental'] = false;
    }
    if(switches[CLIMB_TO_SAFETY]){
      newGroups['humanConnection'] = true;
    } else {
      newGroups['humanConnection'] = false;
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

    // setSwitches((switches: any) => {
    //   return {...switches, ...newSwitches};
    // });
      setSwitches(newSwitches);
    
  }, [selectedLayers]);
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
    setSelectedCheckBox(switchSelected);
    selectCheckboxes(switchSelected);
    removePopup();
  }
  const emptyStyle: React.CSSProperties = {};
  const weightStyle: React.CSSProperties = {'fontWeight': 500};
  const genExtra = () => {
    return (<div className="filter-coll-header">
      <div style={(switches[PROBLEMS_TRIGGER] || switches[PROJECTS_MAP_STYLES.name] ||
        switches[MEP_PROJECTS.name] || switches[ROUTINE_MAINTENANCE.name] || switches[COMPONENT_LAYERS.name])
        ? weightStyle : emptyStyle }>{/*<img src="/Icons/icon-79.svg" alt="" />*/} MHFD DATA </div>
       <Switch checked={groups['MHFDData']} size="small" onClick={(value, event) => {
         event.stopPropagation();
         changeGroup(value, [PROBLEMS_TRIGGER,
        PROJECTS_MAP_STYLES,
        MEP_PROJECTS,
        ROUTINE_MAINTENANCE,
        COMPONENT_LAYERS], 'MHFDData'
      )} }/>
    </div>)
  };
  const genExtra01 = () => {
    return (
      <div className="filter-coll-header">

         <div style={(switches[WATERSHED_FILTERS] || switches[NRCS_SOILS]) ? weightStyle : emptyStyle }>{/*<img src="/Icons/icon-77.svg" alt="" />*/} HYDROLOGIC </div>
        <Switch checked={groups['hydrologic']} size="small" onClick={(value, event) => {
         event.stopPropagation();
         changeGroup(value, [WATERSHED_FILTERS, NRCS_SOILS
         ], 'hydrologic')}
       }/>
      </div>
  )};
  const genExtra02 = () => {
    return (
    <div className="filter-coll-header">
       <div style={(switches[FLOODPLAINS.name] || switches[FEMA_FLOOD_HAZARD] || switches[DWR_DAM_SAFETY]) ? weightStyle : emptyStyle}>{/*<img src="/Icons/icon-79.svg" alt="" />*/} HYDRAULIC</div>
      <Switch checked={groups['hydraulic']} size="small" onClick={(value, event) => {
         event.stopPropagation();
         changeGroup(value, [FLOODPLAINS,
          FEMA_FLOOD_HAZARD, DWR_DAM_SAFETY
         ], 'hydraulic')}
       }/>
    </div>
    )
  };

  const genExtra03 = () => {
    return(
      <div className="filter-coll-header">
        <div style={(switches[STREAM_MANAGEMENT_CORRIDORS]) ? weightStyle : emptyStyle}>{/*<img src="/Icons/icon-79.svg" alt="" />*/} GEOMORPHOLOGY</div>
        <Switch checked={groups['geomorphology']} size="small" onClick={(value, event) => {
          event.stopPropagation();
          changeGroup(value, [STREAM_MANAGEMENT_CORRIDORS], 'geomorphology')
        }}/>
      </div>
    )
  };


 const genExtra04 = () => {
   return (
    <div className="filter-coll-header">
       <div style={(switches[BCZ_PREBLE_MEADOW_JUMPING] || switches[BCZ_UTE_LADIES_TRESSES_ORCHID] ||
        switches[RESEARCH_MONITORING]) ? weightStyle : emptyStyle}>{/*<img src="/Icons/icon-79.svg" alt="" />*/} ENVIRONMENTAL</div>
      <Switch checked={groups['environmental']} size="small" onClick={(value, event) => {
          event.stopPropagation();
          changeGroup(value, [BCZ_PREBLE_MEADOW_JUMPING, BCZ_UTE_LADIES_TRESSES_ORCHID, RESEARCH_MONITORING], 'environmental')
        }}/>
    </div>
    )
  };
  const genExtra05 = () => (
    <div className="filter-coll-header">
      <div style={switches[CLIMB_TO_SAFETY] ? weightStyle : emptyStyle}>{/* <img src="/Icons/icon-79.svg" alt="" />*/} HUMAN CONNECTION</div>
      <Switch checked={groups['humanConnection']} size="small" onClick={(value, event) => {
          event.stopPropagation();
          changeGroup(value, [CLIMB_TO_SAFETY], 'humanConnection')
        }}/>
    </div>
  );



 const genExtra06 = () => {
    return (<div className="filter-coll-header">
      <div style={(switches[SERVICE_AREA_LAYERS.name] || switches[COUNTIES_LAYERS.name] ||
        switches[MUNICIPALITIES.name] || switches[SEMSWA_SERVICE_AREA]) ? weightStyle : emptyStyle}>
          {/*<img src="/Icons/icon-78.svg" alt="" />*/} BOUNDARIES</div>
      <Switch checked={groups['boundaries']} size="small" onClick={(value, event) => {
         event.stopPropagation();
         changeGroup(value, [SERVICE_AREA_LAYERS,
          COUNTIES_LAYERS,
          MUNICIPALITIES,
          SEMSWA_SERVICE_AREA
         ], 'boundaries')}
       }/>
    </div>
  )};
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
    setSelectedCheckBox(switchSelected);
    // setCheckboxes(switchSelected);
    selectCheckboxes(switchSelected);

    removePopup();
  }

  return <div className="ant-dropdown-menu map-filter-s">
    <div className="filter-map">
      <div className="title-filter-map">
        <h6>Layers</h6>
        <Button className="btn-transparent" onClick={() => {
          {/*if (isExtendedView) {
            setSelectedCheckBox([MHFD_BOUNDARY_FILTERS, XSTREAMS]);
            // setCheckboxes([]);
            selectCheckboxes([MHFD_BOUNDARY_FILTERS, XSTREAMS]);
          } else {
            setSelectedCheckBox([PROBLEMS_TRIGGER, PROJECTS_MAP_STYLES, MHFD_BOUNDARY_FILTERS, XSTREAMS]);
            // setCheckboxes([PROBLEMS_TRIGGER, PROJECTS_MAP_STYLES]);
            selectCheckboxes([PROBLEMS_TRIGGER, PROJECTS_MAP_STYLES, MHFD_BOUNDARY_FILTERS, XSTREAMS]);
          }*/}
          removePopup();
          setVisibleDropdown(false);
        }}><CloseOutlined /></Button>
      </div>
      <Checkbox.Group value={selectedLayers} onChange={(items) => {
        setSelectedCheckBox(items);
        // setCheckboxes(items);
        selectCheckboxes(items);
        removePopup();
      }}>
        <Collapse defaultActiveKey={['1', '2', '3', '4', '5', '6', '7', '8']}>
          <Panel header="" key="1" extra={genExtra()}>
            <p>
              <img src="/Icons/Filters/ic_problems.png" width="18px" alt="" />
                  Problems
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.problem)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch checked={switches[PROBLEMS_TRIGGER]} size="small" onClick={(value) => onChange(value, PROBLEMS_TRIGGER)} />
            </p>{/*<Checkbox defaultChecked={true} value={PROBLEMS_TRIGGER}></Checkbox> */}

            <p>
              <img src="/Icons/Filters/ic_components.png" width="18px" alt="" />
                  Components
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.component)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch checked={switches[COMPONENT_LAYERS.name]} size="small" onClick={(value) => onChange(value, COMPONENT_LAYERS)} />
            </p> {/*<Checkbox value={COMPONENT_LAYERS}></Checkbox>*/}

            <p>
              <img src="/Icons/Filters/ic_projects.png" width="18px" alt="" />
                  Projects
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.project)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch checked={switches[PROJECTS_MAP_STYLES.name]} size="small"  onClick={(value) => onChange(value, PROJECTS_MAP_STYLES)} />
            </p>{/*<Checkbox disabled={!isExtendedView} defaultChecked={true} value={PROJECTS_MAP_STYLES}></Checkbox> */}

            <p>
              <img src="/Icons/Filters/ic_MEP.png" width="18px" alt="" />
                  MEP Projects
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.mep_projects)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch checked={switches[MEP_PROJECTS.name]} size="small" onClick={(value) => onChange(value, MEP_PROJECTS)} />
            </p> {/* <Checkbox value={MEP_PROJECTS}></Checkbox>*/}

            <p>
              <img src="/Icons/Filters/ic_routine.png" width="18px" alt="" />
                  Routine Maintenance
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.routine_maintenance)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch checked={switches[ROUTINE_MAINTENANCE.name]} size="small" onClick={(value) => onChange(value, ROUTINE_MAINTENANCE)} />
            </p> {/* <Checkbox value={ROUTINE_MAINTENANCE}></Checkbox>*/}
          </Panel>
          <Panel header="" key="2" extra={genExtra01()}>
            <p>
              <img src="/Icons/Filters/ic_watersheds.png" width="18px" alt="" />
                  Watersheds
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.watershed)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch checked={switches[WATERSHED_FILTERS]} size="small" onClick={(value) => onChange(value, WATERSHED_FILTERS)} />
            </p> {/*<Checkbox value={WATERSHED_FILTERS}></Checkbox>*/}

            <p>
              <img src="/Icons/Filters/ic_NRCS.png" width="18px" alt="" />
                  NRCS Soils
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.nrcs_soils)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch size="small" checked={switches[NRCS_SOILS]} onClick={(value) => onChange(value, NRCS_SOILS)} />
            </p> {/*<Checkbox value={WATERSHED_FILTERS}></Checkbox>*/}

            <p style={{ display: 'none' }}>
              <img src="/Icons/Filters/ic_stream.png" width="18px" alt="" />
                  Streams
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.stream_mang_corridors)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch size="small" onClick={(value) => onChange(value, STREAMS_FILTERS)} />
            </p> {/*<Checkbox value={STREAMS_FILTERS}></Checkbox>*/}
          </Panel>

          <Panel header="" key="3" extra={genExtra02()}>
            <p>
              <img src="/Icons/Filters/ic_flood.png" width="18px" alt="" />
                  Floodplains
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.floodplains)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover> <Switch checked={switches[FLOODPLAINS.name]}  size="small" onClick={(value) => onChange(value, FLOODPLAINS)} />
            </p> {/* <Checkbox value={FLOODPLAINS}></Checkbox>} */}

            <p>
              <img src="/Icons/Filters/ic_FEMA.png" width="18px" alt="" />
                  FEMA Flood Hazard Zones
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.fema_flood_hazard_zones)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch checked={switches[FEMA_FLOOD_HAZARD]} size="small" onClick={(value) => onChange(value, FEMA_FLOOD_HAZARD)} />
            </p>  {/*<Checkbox value={FEMA_FLOOD_HAZARD}></Checkbox>*/}

            <p>
              <img src="/Icons/Filters/ic_DWR.png" width="18px" alt="" />
                  DWR Dam Safety
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.dam_safety)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch size="small" checked={switches[DWR_DAM_SAFETY]} onClick={(value) => onChange(value, DWR_DAM_SAFETY)} />
            </p>
          </Panel>
          <Panel header="" key="4" extra={genExtra03()}>

            <p>
              <img src="/Icons/Filters/ic_stream.png" width="18px" alt="" />
                  Stream Management Corridors
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.stream_mang_corridors)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch size="small" checked={switches[STREAM_MANAGEMENT_CORRIDORS]} onClick={(value) => onChange(value, STREAM_MANAGEMENT_CORRIDORS)} />
            </p>
          </Panel>

          <Panel header="" key="5" extra={genExtra04()}>
            <p>
              <img src="/Icons/Filters/ic_mouse.png" width="18px" alt="" />
                  BCZ - Preble’s Meadow
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.bcz_prebels_meadow)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch size="small" checked={switches[BCZ_PREBLE_MEADOW_JUMPING]} onClick={(value) => onChange(value, BCZ_PREBLE_MEADOW_JUMPING)} />
            </p>

            <p>
              <img src="/Icons/Filters/ic_BCZ-ute.png" width="18px" alt="" />
                  BCZ - Ute Ladies Tresses Orchid
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.bcz_ute_ladies)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch size="small" checked={switches[BCZ_UTE_LADIES_TRESSES_ORCHID]} onClick={(value) => onChange(value, BCZ_UTE_LADIES_TRESSES_ORCHID)}/>
            </p>

            <p>
              <img src="/Icons/Filters/ic_research.png" width="18px" alt=""  />
                  Research/Monitoring
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.research_monitoring)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch size="small" checked={switches[RESEARCH_MONITORING]} onClick={(value) => onChange(value, RESEARCH_MONITORING)} />
            </p>
          </Panel>

          <Panel header="" key="6" extra={genExtra05()}>
            <p>
              <img src="/Icons/Filters/ic_climb.png" width="18px" alt="" />
                  Climb to Safety Signs
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.climb_to_safety)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch size="small" checked={switches[CLIMB_TO_SAFETY]} onClick={(value) => onChange(value, CLIMB_TO_SAFETY)} />
            </p>
          </Panel>
          <Panel header="" key="7" extra={genExtra06()}>
            <p>
              <img src="/Icons/Filters/ic_service.png" width="18px" alt="" />
                  Service Areas
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.service_area)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch checked={switches[SERVICE_AREA_LAYERS.name]} size="small" onClick={(value) => onChange(value, SERVICE_AREA_LAYERS)} />
            </p> {/*<Checkbox value={SERVICE_AREA_LAYERS}></Checkbox>*/}

            <p>
              <img src="/Icons/Filters/ic_counties.png" width="18px" alt="" />
                  Counties
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.counties)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch checked={switches[COUNTIES_LAYERS.name]} size="small" onClick={(value) => onChange(value, COUNTIES_LAYERS)} />
            </p> {/*<Checkbox value={COUNTIES_LAYERS}></Checkbox>*/}

            <p>
              <img src="/Icons/Filters/ic_municipalities.png" width="18px" alt="" />
                  Municipalities
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.municipalities)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch checked={switches[MUNICIPALITIES.name]} size="small" onClick={(value) => onChange(value, MUNICIPALITIES)} />
            </p> {/*<Checkbox value={MUNICIPALITIES}></Checkbox>*/}

            <p>
              <img src="/Icons/Filters/ic_SEMSWA.png" width="18px" alt="" />
                  SEMSWA Service Area
                  <Popover arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.semswa_service_area)}>
                <img className="info-pop" src="/Icons/icon-19.svg" alt="" width="12px" style={{ marginLeft: '3px' }} />
              </Popover>
              <Switch size="small" checked={switches[SEMSWA_SERVICE_AREA]} onClick={(value) => onChange(value, SEMSWA_SERVICE_AREA)} />
            </p> {/*<Checkbox value={COUNTIES_LAYERS}></Checkbox>*/}

            <p style={{ display: 'none' }}>
              MHFD Boundary <Switch size="small" defaultChecked />
            </p>{/*<Checkbox value={MHFD_BOUNDARY_FILTERS}></Checkbox>*/}
          </Panel>

          {/* <Panel header="" key="8" extra={genExtra07()}>
            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  Species
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.species)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" />
            </p>

    </Panel> */}
        </Collapse>
      </Checkbox.Group>
    </div>

    <div className="btn-footer-02">
      <Button className="btn-borde" onClick={() => {
        {/*if (isExtendedView) {
          setSelectedCheckBox([MHFD_BOUNDARY_FILTERS, XSTREAMS]);
          // setCheckboxes([]);
          selectCheckboxes([MHFD_BOUNDARY_FILTERS, XSTREAMS]);
        } else {
          setSelectedCheckBox([PROBLEMS_TRIGGER, PROJECTS_MAP_STYLES, MHFD_BOUNDARY_FILTERS, XSTREAMS]);
          // setCheckboxes([PROBLEMS_TRIGGER, PROJECTS_MAP_STYLES]);
          selectCheckboxes([PROBLEMS_TRIGGER, PROJECTS_MAP_STYLES, MHFD_BOUNDARY_FILTERS, XSTREAMS]);
        }*/}
        removePopup();
        setVisibleDropdown(false);
      }}>Close</Button>

    </div>
  </div>
}
