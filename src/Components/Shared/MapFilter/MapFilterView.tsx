import React, { useState } from "react";
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
export const genExtra = () => (
  <div className="filter-coll-header">
    <div>{/*<img src="/Icons/icon-79.svg" alt="" />*/} MHFD DATA </div>
     <Switch size="small" />
  </div>
);
export const genExtra01 = () => (
  <div className="filter-coll-header">
    <div>{/* <img src="/Icons/icon-77.svg" alt="" />*/} HYDROLOGIC </div>
    <Switch size="small"/>
  </div>
);
export const genExtra02 = () => (
  <div className="filter-coll-header">
     <div>{/*<img src="/Icons/icon-79.svg" alt="" />*/} HYDRAULIC</div>
    <Switch size="small"/>
  </div>

);
export const genExtra03 = () => (
  <div className="filter-coll-header">
    <div>{/* <img src="/Icons/icon-79.svg" alt="" />*/} GEOMORPHOLOGY</div>
    <Switch size="small"/>
  </div>
);
export const genExtra04 = () => (
  <div className="filter-coll-header">
     <div>{/*<img src="/Icons/icon-79.svg" alt="" />*/} ENVIRONMENTAL</div>
    <Switch size="small"/>
  </div>
);
export const genExtra05 = () => (
  <div className="filter-coll-header">
    <div>{/* <img src="/Icons/icon-79.svg" alt="" />*/} HUMAN CONNECTION</div>
    <Switch size="small"/>
  </div>
);
export const genExtra06 = () => (
  <div className="filter-coll-header">
    <div>{/* <img src="/Icons/icon-78.svg" alt="" />*/} BOUNDARIES</div>
    <Switch size="small"/>
  </div>
);
export const genExtra07 = () => (
  <div className="filter-coll-header">
     <div>{/*<img src="/Icons/icon-80.svg" alt="" />*/} OTHER LAYERS</div>
    <Switch size="small"/>
  </div>

);
const content = (<div className="popoveer-00"><i>Components are specific elements of a problem (i.e. master planned improvements or stream assessment data points) that are the building blocks for projects to solve those problems.</i></div>);

const contenido = (text: string) => {
  return <div className="popoveer-00"><i>{text}</i></div>
}

export default ({ selectCheckboxes, setVisibleDropdown, selectedLayers, setSelectedCheckBox, removePopup, isExtendedView }:
  { selectCheckboxes: Function, setVisibleDropdown: Function, selectedLayers: any, setSelectedCheckBox: Function, removePopup: Function, isExtendedView: boolean }) => {
  // const [checkBoxes, setCheckboxes] = useState(selectedLayers);

  const onChange = (value: boolean, item: any) => {
    //console.log('mi grupo de switch', value, item, selectedLayers)

    let switchSelected: any[] = [...selectedLayers];
    //console.log('mi array', switchSelected)
    if (value) {
      switchSelected.push(item);
    } else {
      switchSelected = switchSelected.filter((element) => {
        return element !== item;
      })
    }
    console.log('mi array 2', switchSelected, selectedLayers)
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
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.problem)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" defaultChecked={true} onChange={(value) => onChange(value, PROBLEMS_TRIGGER)} />
            </p>{/*<Checkbox defaultChecked={true} value={PROBLEMS_TRIGGER}></Checkbox> */}

            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  Components
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.component)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" onChange={(value) => onChange(value, COMPONENT_LAYERS)} />
            </p> {/*<Checkbox value={COMPONENT_LAYERS}></Checkbox>*/}

            <p>
              <img src="/Icons/icon-75.svg" alt="" />
                  Projects
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.project)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" defaultChecked={true} onClick={(value) => onChange(value, PROJECTS_MAP_STYLES)} />
            </p>{/*<Checkbox disabled={!isExtendedView} defaultChecked={true} value={PROJECTS_MAP_STYLES}></Checkbox> */}

            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  MEP Projects
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.mep_projects)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" onChange={(value) => onChange(value, MEP_PROJECTS)} />
            </p> {/* <Checkbox value={MEP_PROJECTS}></Checkbox>*/}

            <p>
              <img src="/Icons/icon-75.svg" alt="" />
                  Routine Maintenance
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.routine_maintenance)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" onChange={(value) => onChange(value, ROUTINE_MAINTENANCE)} />
            </p> {/* <Checkbox value={ROUTINE_MAINTENANCE}></Checkbox>*/}
          </Panel>
          <Panel header="" key="2" extra={genExtra01()}>
            <p>
              <img src="/Icons/icon-75.svg" alt="" />
                  Watersheds
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.watershed)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" onChange={(value) => onChange(value, WATERSHED_FILTERS)} />
            </p> {/*<Checkbox value={WATERSHED_FILTERS}></Checkbox>*/}

            <p>
              <img src="/Icons/icon-75.svg" alt="" />
                  NRCS Soils
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.nrcs_soils)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" />
            </p> {/*<Checkbox value={WATERSHED_FILTERS}></Checkbox>*/}

            <p style={{ display: 'none' }}>
              <img src="/Icons/icon-77.svg" alt="" />
                  Streams
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.stream_mang_corridors)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" onChange={(value) => onChange(value, STREAMS_FILTERS)} />
            </p> {/*<Checkbox value={STREAMS_FILTERS}></Checkbox>*/}
          </Panel>

          <Panel header="" key="3" extra={genExtra02()}>
            <p>
              <img src="/Icons/icon-75.svg" alt="" />
                  Floodplains
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.floodplains)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover> <Switch size="small" onChange={(value) => onChange(value, FLOODPLAINS)} />
            </p> {/* <Checkbox value={FLOODPLAINS}></Checkbox>} */}

            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  FEMA Flood Hazard Zones
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.fema_flood_hazard_zones)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" onChange={(value) => onChange(value, FEMA_FLOOD_HAZARD)} />
            </p>  {/*<Checkbox value={FEMA_FLOOD_HAZARD}></Checkbox>*/}

            <p>
              <img src="/Icons/icon-75.svg" alt="" />
                  DWR Dam Safety
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.dam_safety)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" />
            </p>
          </Panel>
          <Panel header="" key="4" extra={genExtra03()}>

            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  Stream Mang. Corridors
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.stream_mang_corridors)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" />
            </p>
          </Panel>

          <Panel header="" key="5" extra={genExtra04()}>
            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  BCZ - Preble’s Meadow Jumping Mouse
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.bcz_prebels_meadow)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" />
            </p>

            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  BCZ - Ute Ladies Tresses Orchid
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.bcz_ute_ladies)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" />
            </p>

            <p>
              <img src="/Icons/icon-75.svg" alt="" />
                  Research/Monitoring
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.research_monitoring)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" />
            </p>
          </Panel>

          <Panel header="" key="6" extra={genExtra05()}>
            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  Climb to Safety
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.climb_to_safety)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" />
            </p>
          </Panel>
          <Panel header="" key="7" extra={genExtra06()}>
            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  Service Areas
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.service_area)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" onChange={(value) => onChange(value, SERVICE_AREA_LAYERS)} />
            </p> {/*<Checkbox value={SERVICE_AREA_LAYERS}></Checkbox>*/}

            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  Counties
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.counties)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" onChange={(value) => onChange(value, COUNTIES_LAYERS)} />
            </p> {/*<Checkbox value={COUNTIES_LAYERS}></Checkbox>*/}

            <p>
              <img src="/Icons/icon-75.svg" alt="" />
                  Municipalities
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.municipalities)}>
                <img src="/Icons/icon-19.svg" alt="" style={{ marginLeft: '5px' }} />
              </Popover>
              <Switch size="small" onChange={(value) => onChange(value, MUNICIPALITIES)} />
            </p> {/*<Checkbox value={MUNICIPALITIES}></Checkbox>*/}

            <p>
              <img src="/Icons/icon-76.svg" alt="" />
                  SEMSWA Service Area
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.semswa_service_area)}>
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
                  <Popover placement="right" overlayClassName="popover-filter-map" content={contenido(popUps.species)}>
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
