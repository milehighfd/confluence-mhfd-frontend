import React, { useEffect, useState } from "react";
import { Checkbox, Row, Col, Button, Collapse, Popover, Switch } from 'antd';
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
  popUps
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

export default ({ selectCheckboxes, setVisibleDropdown, selectedLayers, setSelectedCheckBox, removePopup, isExtendedView }:
  { selectCheckboxes: Function, setVisibleDropdown: Function, selectedLayers: any, setSelectedCheckBox: Function, removePopup: Function, isExtendedView: boolean }) => {
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
    [MUNICIPALITIES.name]: false
  });
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
    console.log(switches);
    const newGroups: any = {};
    if (switches[PROBLEMS_TRIGGER] && switches[PROJECTS_MAP_STYLES.name] && switches[COMPONENT_LAYERS.name] 
      && switches[MEP_PROJECTS.name] && switches[ROUTINE_MAINTENANCE.name]) {
        newGroups['MHFDData'] = true;
      } else {
        newGroups['MHFDData'] = false;
      }
    console.log(switches[WATERSHED_FILTERS]);
    if (switches[WATERSHED_FILTERS]) {
      newGroups['hydrologic'] = true;
      console.log('===> ', {...groups, 'hydrologic': true});
    } else {
      console.log('Z=== ', {...groups, 'hydrologic': true});
      newGroups['hydrologic'] = false;
    }
    if (switches[FLOODPLAINS.name] && switches[FEMA_FLOOD_HAZARD]) {
      newGroups['hydraulic'] = true;
    } else {
      newGroups['hydraulic'] = false;
    }
    if (switches[SERVICE_AREA_LAYERS.name] && switches[COUNTIES_LAYERS.name] && switches[MUNICIPALITIES.name] ) {
      newGroups['boundaries'] = true;
    } else { 
      newGroups['boundaries'] = false;
    }
    setGroups({...groups, ...newGroups});
  }, [switches]);
  useEffect(() => {
    console.log(groups);
  }, [groups]);
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
  
  const genExtra = () => {
    return (<div className="filter-coll-header">
      <div><img src="/Icons/icon-79.svg" alt="" /> MHFD DATA </div>
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
    
         <div>{/*<img src="/Icons/icon-77.svg" alt="" />*/} HYDROLOGIC </div>
        <Switch checked={groups['hydrologic']} size="small" onClick={(value, event) => {
         event.stopPropagation();
         changeGroup(value, [WATERSHED_FILTERS
         ], 'hydrologic')}
       }/> 
      </div>
  )};
  const genExtra02 = () => {
    return (
    <div className="filter-coll-header">
       <div>{/*<img src="/Icons/icon-79.svg" alt="" />*/} HYDRAULIC</div>
      <Switch checked={groups['hydraulic']} size="small" onClick={(value, event) => {
         event.stopPropagation();
         changeGroup(value, [FLOODPLAINS,
          FEMA_FLOOD_HAZARD
         ], 'hydraulic')}
       }/> 
    </div>
    ) 
  };
  
  const genExtra03 = () => {
    return(
      <div className="filter-coll-header">
        <div>{/*<img src="/Icons/icon-79.svg" alt="" />*/} GEOMORPHOLOGY</div>
        <Switch size="small" onClick={(value, event) => {
          event.stopPropagation();
        }}/> 
      </div>
    )
  };


 const genExtra04 = () => {
   return (
    <div className="filter-coll-header">
       <div>{/*<img src="/Icons/icon-79.svg" alt="" />*/} ENVIRONMENTAL</div>
      <Switch size="small" onClick={(value, event) => {
          event.stopPropagation();
        }}/> 
    </div>
    )
  };
  const genExtra05 = () => (
    <div className="filter-coll-header">
      <div>{/* <img src="/Icons/icon-79.svg" alt="" />*/} HUMAN CONNECTION</div>
      <Switch size="small" onClick={(value, event) => {
          event.stopPropagation();
        }}/>
    </div>
  );



 const genExtra06 = () => {
    return (<div className="filter-coll-header">
      <div>{/*<img src="/Icons/icon-78.svg" alt="" />*/} BOUNDARIES</div>
      <Switch checked={groups['boundaries']} size="small" onClick={(value, event) => {
         event.stopPropagation();
         changeGroup(value, [SERVICE_AREA_LAYERS,
          COUNTIES_LAYERS,
          MUNICIPALITIES
         ], 'boundaries')}
       }/>
    </div>
  )};
  const onChange = (value: boolean, item: any) => {
    //console.log('mi grupo de switch', value, item, selectedLayers)
    console.log(item, value);
    if (item.hasOwnProperty('name')) {
      setSwitches({...switches, [item['name']]: value});
    } else {
      console.log(item, value);
      console.log('new values ', {...switches, [item]: value});
      setSwitches({...switches, [item]: value});
    }
    let switchSelected: any[] = [...selectedLayers];
    //console.log('mi array', switchSelected)
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

  return <div className="ant-dropdown-menu" style={{ background: '#fff', width: '325px', left: '-12px', margin: '0px 20px', paddingTop: '0px' }}>
    <div className="filter-map">
      <Checkbox.Group value={selectedLayers} onChange={(items) => {
        console.log('deloschek', items, selectedLayers)
        setSelectedCheckBox(items);
        // setCheckboxes(items);
        selectCheckboxes(items);
        removePopup();
      }}>
        <Collapse defaultActiveKey={['1', '2', '3', '4', '5', '6', '7', '8']}>
          <Panel header="" key="1" extra={genExtra()}>
            <p>
              <img src="/Icons/icon-75.svg" alt="" />
                  Problems
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.problem)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch checked={switches[PROBLEMS_TRIGGER]} size="small" onClick={(value) => onChange(value, PROBLEMS_TRIGGER)} />
            </p>{/*<Checkbox defaultChecked={true} value={PROBLEMS_TRIGGER}></Checkbox> */}

            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  Components
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.component)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch checked={switches[COMPONENT_LAYERS.name]} size="small" onClick={(value) => onChange(value, COMPONENT_LAYERS)} />
            </p> {/*<Checkbox value={COMPONENT_LAYERS}></Checkbox>*/}

            <p>
              <img src="/Icons/icon-75.svg" alt="" />
                  Projects
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.project)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch checked={switches[PROJECTS_MAP_STYLES.name]} size="small"  onClick={(value) => onChange(value, PROJECTS_MAP_STYLES)} />
            </p>{/*<Checkbox disabled={!isExtendedView} defaultChecked={true} value={PROJECTS_MAP_STYLES}></Checkbox> */}

            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  MEP Projects
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.mep_projects)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch checked={switches[MEP_PROJECTS.name]} size="small" onClick={(value) => onChange(value, MEP_PROJECTS)} />
            </p> {/* <Checkbox value={MEP_PROJECTS}></Checkbox>*/}

            <p>
              <img src="/Icons/icon-75.svg" alt="" />
                  Routine Maintenance
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.routine_maintenance)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch checked={switches[ROUTINE_MAINTENANCE.name]} size="small" onClick={(value) => onChange(value, ROUTINE_MAINTENANCE)} />
            </p> {/* <Checkbox value={ROUTINE_MAINTENANCE}></Checkbox>*/}
          </Panel>
          <Panel header="" key="2" extra={genExtra01()}>
            <p>
              <img src="/Icons/icon-75.svg" alt="" />
                  Watersheds
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.watershed)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch checked={switches[WATERSHED_FILTERS]} size="small" onClick={(value) => onChange(value, WATERSHED_FILTERS)} />
            </p> {/*<Checkbox value={WATERSHED_FILTERS}></Checkbox>*/}

            <p>
              <img src="/Icons/icon-75.svg" alt="" />
                  NRCS Soils
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.nrcs_soils)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" />
            </p> {/*<Checkbox value={WATERSHED_FILTERS}></Checkbox>*/}

            <p style={{ display: 'none' }}>
              <img src="/Icons/icon-77.svg" alt="" />
                  Streams
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.stream_mang_corridors)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" onClick={(value) => onChange(value, STREAMS_FILTERS)} />
            </p> {/*<Checkbox value={STREAMS_FILTERS}></Checkbox>*/}
          </Panel>

          <Panel header="" key="3" extra={genExtra02()}>
            <p>
              <img src="/Icons/icon-75.svg" alt="" />
                  Floodplains
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.floodplains)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover> <Switch checked={switches[FLOODPLAINS.name]}  size="small" onClick={(value) => onChange(value, FLOODPLAINS)} />
            </p> {/* <Checkbox value={FLOODPLAINS}></Checkbox>} */}

            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  FEMA Flood Hazard Zones
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.fema_flood_hazard_zones)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch checked={switches[FEMA_FLOOD_HAZARD]} size="small" onClick={(value) => onChange(value, FEMA_FLOOD_HAZARD)} />
            </p>  {/*<Checkbox value={FEMA_FLOOD_HAZARD}></Checkbox>*/}

            <p>
              <img src="/Icons/icon-75.svg" alt="" />
                  DWR Dam Safety
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.dam_safety)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" />
            </p>
          </Panel>
          <Panel header="" key="4" extra={genExtra03()}>

            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  Stream Mang. Corridors
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.stream_mang_corridors)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" />
            </p>
          </Panel>

          <Panel header="" key="5" extra={genExtra04()}>
            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  BCZ - Preble’s Meadow Jumping Mouse
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.bcz_prebels_meadow)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" />
            </p>

            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  BCZ - Ute Ladies Tresses Orchid
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.bcz_ute_ladies)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" />
            </p>

            <p>
              <img src="/Icons/icon-75.svg" alt="" />
                  Research/Monitoring
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.research_monitoring)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" />
            </p>
          </Panel>

          <Panel header="" key="6" extra={genExtra05()}>
            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  Climb to Safety
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.climb_to_safety)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" />
            </p>
          </Panel>
          <Panel header="" key="7" extra={genExtra06()}>
            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  Service Areas
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.service_area)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch checked={switches[SERVICE_AREA_LAYERS.name]} size="small" onClick={(value) => onChange(value, SERVICE_AREA_LAYERS)} />
            </p> {/*<Checkbox value={SERVICE_AREA_LAYERS}></Checkbox>*/}

            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  Counties
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.counties)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch checked={switches[COUNTIES_LAYERS.name]} size="small" onClick={(value) => onChange(value, COUNTIES_LAYERS)} />
            </p> {/*<Checkbox value={COUNTIES_LAYERS}></Checkbox>*/}

            <p>
              <img src="/Icons/icon-75.svg" alt="" />
                  Municipalities
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.municipalities)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch checked={switches[MUNICIPALITIES.name]} size="small" onClick={(value) => onChange(value, MUNICIPALITIES)} />
            </p> {/*<Checkbox value={MUNICIPALITIES}></Checkbox>*/}

            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  SEMSWA Service Area
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contentPopOver(popUps.semswa_service_area)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" />
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
        if (isExtendedView) {
          setSelectedCheckBox([MHFD_BOUNDARY_FILTERS, XSTREAMS]);
          // setCheckboxes([]);
          selectCheckboxes([MHFD_BOUNDARY_FILTERS, XSTREAMS]);
        } else {
          setSelectedCheckBox([PROBLEMS_TRIGGER, PROJECTS_MAP_STYLES, MHFD_BOUNDARY_FILTERS, XSTREAMS]);
          // setCheckboxes([PROBLEMS_TRIGGER, PROJECTS_MAP_STYLES]);
          selectCheckboxes([PROBLEMS_TRIGGER, PROJECTS_MAP_STYLES, MHFD_BOUNDARY_FILTERS, XSTREAMS]);
        }
        removePopup();
        setVisibleDropdown(false);
      }}>Close</Button>

    </div>
  </div>
}
