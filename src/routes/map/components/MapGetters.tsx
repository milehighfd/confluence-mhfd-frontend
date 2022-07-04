import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Button } from 'antd';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { ComponentPopup, MainPopup, MeasurePopup, StreamPopupFull } from '../../../Components/Map/MapPopups';
import { MENU_OPTIONS, ADMIN, ICON_POPUPS, NEW_PROJECT_TYPES, STAFF, GOVERNMENT_ADMIN, GOVERNMENT_STAFF } from '../../../constants/constants';

const notComponentOptions: any[] = [MENU_OPTIONS.NCRS_SOILS, MENU_OPTIONS.DWR_DAM_SAFETY, MENU_OPTIONS.STREAM_MANAGEMENT_CORRIDORS,
MENU_OPTIONS.BCZ_PREBLES_MEADOW_JUMPING_MOUSE, MENU_OPTIONS.BCZ_UTE_LADIES_TRESSES_ORCHID, MENU_OPTIONS.RESEARCH_MONITORING, MENU_OPTIONS.CLIMB_TO_SAFETY, MENU_OPTIONS.SEMSWA_SERVICE_AREA,
MENU_OPTIONS.DEBRIS_MANAGEMENT_LINEAR, MENU_OPTIONS.DEBRIS_MANAGEMENT_AREA, MENU_OPTIONS.VEGETATION_MANAGEMENT_WEED_CONTROL,
MENU_OPTIONS.VEGETATION_MANAGEMENT_NATURAL_AREA, MENU_OPTIONS.WATERSHED, MENU_OPTIONS.SERVICE_AREA, MENU_OPTIONS.MEP_STORM_OUTFALL,
MENU_OPTIONS.MEP_CHANNEL, MENU_OPTIONS.MEP_DETENTION_BASIN, MENU_OPTIONS.MEP_TEMPORARY_LOCATION, MENU_OPTIONS.MEP_TEMPORARY_LOCATION, MENU_OPTIONS.CLIMB_TO_SAFETY_SIGNS, MENU_OPTIONS.MEASURES
];

export const getBeautifulTitle = (title: any) => {
  return (
    <div>
      <span>
        <b>
          {title.title}
        </b>
      </span>
      <br />
      <span>
        {title.subtitle}
      </span>
    </div>
  );
};

export const commentPopup = (note?:any ) => ReactDOMServer.renderToStaticMarkup(
  <>
      <div className="popup-comment">
      <div className="headmap">
        <Button id="color-list" className="testheader">
          <span id="color-text">{ note?.color ? (note.color.label):'Map Note' }</span>
          <div className='dr'>
            <div className="legend-selected">
              <i id="colorable" className="mdi mdi-circle-medium" style={{color: note?.color ? note.color.color:'#ffe121'}}></i> 
            </div>
            <div id="icon-downlined" className="light">
              <DownOutlined />
            </div>
          </div>
        </Button>
      </div>
      <div className="bodymap">
          <TextArea style={{resize:'none'}} id="textarea" rows={5} placeholder={"These are my notes…"} defaultValue={note? note.content:''} />
          <div style={{display:'flex'}} className="footer">
              <Button id="delete-comment" style={{color:'red', marginRight:'5px'}} value={note?note._id:''} className="light b-red">Delete</Button>
              { note? (<Button id="edit-comment" className='light b-green'>Save</Button>): (<Button id="save-comment" className='light b-green'>Save</Button>) }
          </div>

      </div>
      </div>
  </>);

export const loadMenuPopupWithData = (menuOptions: any[], popups: any[], userInformation: any, test: any, title?: any) => ReactDOMServer.renderToStaticMarkup(
  <>
    {
      menuOptions.length === -1 ?
        <> {(menuOptions[0] !== 'Project' && menuOptions[0] !== 'Problem') ?
          (menuOptions[0] == 'Stream' ?
            loadStreamPopup(0, popups[0]) :
            (
              menuOptions[0] == MENU_OPTIONS.MEASURES ?
                loadMeasurePopup(0, popups[0], !notComponentOptions.includes(menuOptions[0]), userInformation)
                : loadComponentPopup(0, popups[0], !notComponentOptions.includes(menuOptions[0]), userInformation)
            )
          )
          :
          menuOptions[0] === 'Project' ? loadMainPopup(0, popups[0], test, userInformation, true) : loadMainPopup(0, popups[0], test, userInformation)}
        </>
        :
        <div className="map-pop-02">
          <div className="headmap">{title ? (title.subtitle ? getBeautifulTitle(title) : title.title) : 'LAYERS'}</div>
          <div className="layer-popup">
            {
              menuOptions.map((menu: any, index: number) => {
                return (
                  <div>
                    {loadIconsPopup(menu, popups[index], index)}
                    {(menu !== 'Project' && menu !== 'Problem') ?
                      (
                        menu == 'Stream' ?
                          loadStreamPopup(index, popups[index]) :
                          (
                            menu == MENU_OPTIONS.MEASURES ?
                              loadMeasurePopup(index, popups[index], !notComponentOptions.includes(menuOptions[index]), userInformation) :
                              loadComponentPopup(index, popups[index], !notComponentOptions.includes(menuOptions[index]), userInformation)
                          )
                      )
                      :
                      menu === 'Project' ? loadMainPopup(index, popups[index], test, userInformation, true) : loadMainPopup(index, popups[index], test, userInformation)}
                  </div>
                )
              })
            }
          </div>
        </div>}
  </>
);
const loadMainPopup = (id: number, item: any, test: Function, userInformation: any, sw?: boolean) => (
  <>
    <MainPopup id={id} item={item} test={test} sw={sw || !(userInformation.designation === ADMIN || userInformation.designation === STAFF || userInformation.designation === GOVERNMENT_ADMIN || userInformation.designation === GOVERNMENT_STAFF)}></MainPopup>
  </>
);

const loadStreamPopup = (index: number, item: any) => (
  <>
    <StreamPopupFull id={index} item={item} ></StreamPopupFull>
  </>
);
const loadComponentPopup = (index: number, item: any, isComponent: boolean, userInformation: any) => (
  <>
    <ComponentPopup id={index} item={item} isComponent={isComponent && (userInformation.designation === ADMIN || userInformation.designation === STAFF || userInformation.designation === GOVERNMENT_ADMIN || userInformation.designation === GOVERNMENT_STAFF)} ></ComponentPopup>
  </>
);
const loadMeasurePopup = (index: number, item: any, isComponent: boolean, userInformation: any) => (
  <>
    <MeasurePopup id={index} item={item} isComponent={isComponent && (userInformation.designation === ADMIN || userInformation.designation === STAFF || userInformation.designation === GOVERNMENT_ADMIN || userInformation.designation === GOVERNMENT_STAFF)} ></MeasurePopup>
  </>
);
const loadIconsPopup = (menu: any, popups: any, index: any) => {
  let icon
  ICON_POPUPS.forEach((element) => {
    if (element[0] === menu) {
      icon = <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src={element[1]} alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    }
  })
  if (menu === "Project" && popups.projecctype !== undefined && (popups.projecctype === NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Debris_Management || popups.projecctype === NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Vegetation_Management || popups.projecctype === NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Sediment_Removal || popups.projecctype === NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Minor_Repairs || popups.projecctype === NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Restoration || popups.projecctype === NEW_PROJECT_TYPES.Maintenance || popups.projecctype === "Capital" || popups.projecctype === "Fee in Lieu")) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/ic_projects@2x.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "Project" && popups.projecctype !== undefined && (popups.projecctype === 'Master Plan')) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/ic_Project_MasterPlan@2x.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "Project" && popups.projecctype !== undefined && (popups.projecctype === 'FHAD')) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/ic_Project_FHAD@2x.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "NCRS Soils" && popups.hydgrpdcd !== undefined && (popups.hydgrpdcd === 'A')) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/ic_NRCS_GroupA@2x.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "NCRS Soils" && popups.hydgrpdcd !== undefined && (popups.hydgrpdcd === 'B')) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/ic_NRCS_GroupB@2x.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "NCRS Soils" && popups.hydgrpdcd !== undefined && (popups.hydgrpdcd === 'C')) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/ic_NRCS_GroupC@2x.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "NCRS Soils" && popups.hydgrpdcd !== undefined && (popups.hydgrpdcd === 'D')) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/ic_NRCS_GroupD@2x.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "FEMA Flood Hazard" && popups.fld_zone !== undefined && (popups.fld_zone === 'AE' && popups.zone_subty === '-')) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/ic_FEMA_ZoneAE@2x.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "FEMA Flood Hazard" && popups.fld_zone !== undefined && (popups.fld_zone === 'AE' && popups.zone_subty === 'FLOODWAY')) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/ic_FEMA_Floodway@2x.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "FEMA Flood Hazard" && popups.fld_zone !== undefined && (popups.fld_zone === 'X')) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/ic_FEMA_ZoneX@2x.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "FEMA Flood Hazard" && popups.fld_zone !== undefined && (popups.fld_zone === 'AO')) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/ic_FEMA_ZoneAO@2x.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "Active Stream Corridor" && popups.scale !== undefined && (popups.scale === 'Stream Corridor')) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/ic_SMC_StreamCorridor@2x.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "Fluvial Hazard Buffer" && popups.scale !== undefined && (popups.scale === 'Stream Corridor')) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/ic-pattern2.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "Active Stream Corridor" && popups.scale !== undefined && (popups.scale === 'Watershed')) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/ic_SMC_Watershed@2x.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "Fluvial Hazard Buffer" && popups.scale !== undefined && (popups.scale === 'Watershed')) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/ic-pattern3.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "Active LOMCs" && popups.status !== undefined && (popups.status === 'Active')) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/lomcs_active.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "Active LOMCs" && popups.status !== undefined && (popups.status === 'Suspended')) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/lomcs_suspended.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "Active LOMCs" && popups.status !== undefined && (popups.status === 'Violation')) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/lomcs_violation.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "Active LOMCs" && popups.status !== undefined && (popups.status === 'Completed')) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/lomcs_completed.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "Effective Reaches" && popups.studyname !== 'unknown') {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/icon-effective-reaches-studyunkown.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === "Effective Reaches" && popups.studyname === 'unknown') {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/icon-effective-reaches-study.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    )
  }
  if (menu === MENU_OPTIONS.MEP_DETENTION_BASIN) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/icon-mep-detention-basin.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    );
  }
  if (menu === MENU_OPTIONS.MEP_STORM_OUTFALL) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/icon-mep-storm-outfall.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    );
  }
  if (menu === MENU_OPTIONS.MEP_CHANNEL) {
    return (
      <Button id={'menu-' + index} className="btn-transparent"><img style={{ width: '18px', borderRadius: '2px' }} src="/Icons/icon-mep-channel.png" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
    );
  }
  if (icon !== undefined) {
    return icon
  }
  return (
    <Button id={'menu-' + index} className="btn-transparent"><img src="/Icons/icon-75.svg" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
  )
};
