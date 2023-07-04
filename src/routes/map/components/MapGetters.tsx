import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import {
  ComponentPopup,
  MainPopup,
  MeasurePopup,
  StreamPopupFull,
  MainPopupCreateMap,
  ComponentPopupCreate,
} from '../../../Components/Map/MapPopups';
import {
  MENU_OPTIONS,
  ADMIN,
  ICON_POPUPS,
  NEW_PROJECT_TYPES,
  STAFF,
  GOVERNMENT_ADMIN,
  GOVERNMENT_STAFF,
  MAPTYPES,
} from '../../../constants/constants';
import { CommentPopupDiv } from './CommentPopup';

const notComponentOptions: any[] = [
  MENU_OPTIONS.NCRS_SOILS,
  MENU_OPTIONS.DWR_DAM_SAFETY,
  MENU_OPTIONS.STREAM_MANAGEMENT_CORRIDORS,
  MENU_OPTIONS.BCZ_PREBLES_MEADOW_JUMPING_MOUSE,
  MENU_OPTIONS.BCZ_UTE_LADIES_TRESSES_ORCHID,
  MENU_OPTIONS.RESEARCH_MONITORING,
  MENU_OPTIONS.CLIMB_TO_SAFETY,
  MENU_OPTIONS.SEMSWA_SERVICE_AREA,
  MENU_OPTIONS.DEBRIS_MANAGEMENT_LINEAR,
  MENU_OPTIONS.DEBRIS_MANAGEMENT_AREA,
  MENU_OPTIONS.VEGETATION_MANAGEMENT_WEED_CONTROL,
  MENU_OPTIONS.VEGETATION_MANAGEMENT_NATURAL_AREA,
  MENU_OPTIONS.WATERSHED,
  MENU_OPTIONS.SERVICE_AREA,
  MENU_OPTIONS.MEP_STORM_OUTFALL,
  MENU_OPTIONS.MEP_CHANNEL,
  MENU_OPTIONS.MEP_DETENTION_BASIN,
  MENU_OPTIONS.MEP_TEMPORARY_LOCATION,
  MENU_OPTIONS.MEP_TEMPORARY_LOCATION,
  MENU_OPTIONS.CLIMB_TO_SAFETY_SIGNS,
  MENU_OPTIONS.MEASURES,
];
export const getBeautifulTitle = (title: any) => {
  return (
    <div>
      <span>
        <b>{title.title}</b>
      </span>
      <br />
      <span>{title.subtitle}</span>
    </div>
  );
};

export const commentPopup = (handleComments: any, handleDeleteNote?: any, note?: any) => {
  const handleClick = (e: any) => {
    let colorCurrent = document.getElementById('colorable');
    let currentText = document.getElementById('textarea');
    if (colorCurrent) {
      colorCurrent.style.color = e.color;
    }
    handleComments(currentText?.textContent, note);
  };
  const handleDelete = () => {
    handleDeleteNote(note);
  };
  const popupNode = document.createElement('div');
  ReactDOM.render(
    <CommentPopupDiv
      note={note}
      handleClick={handleClick}
      handleDelete={handleDelete}
      handleComments={handleComments}
    />,
    popupNode,
  );
  return popupNode;
};

export const loadMenuPopupWithData = (
  menuOptions: any[],
  popups: any[],
  userInformation: any,
  eventFunctions?: any,
  ep?: any,
  title?: any,
  maptype?: any,
  ids?: any,
) => {
  const popupNode = document.createElement('div');
  console.log('eventFunctions', eventFunctions);
  ReactDOM.render(
    <>
      {menuOptions[0] === MENU_OPTIONS.MEASURES ? (
        <>
          {' '}
          {menuOptions[0] !== 'Project' && !menuOptions[0].includes('Problem')
            ? menuOptions[0] == 'Stream'
              ? loadStreamPopup(0, popups[0])
              : menuOptions[0] == MENU_OPTIONS.MEASURES
              ? loadMeasurePopup(
                  0,
                  popups[0],
                  !notComponentOptions.includes(menuOptions[0]),
                  userInformation,
                  eventFunctions,
                )
              : loadComponentPopup(
                  0,
                  popups[0],
                  !notComponentOptions.includes(menuOptions[0]),
                  userInformation,
                  maptype,
                  eventFunctions,
                )
            : maptype === MAPTYPES.CREATEPROJECTMAP
            ? loadMainPopupCreateMap(0, popups[0], test, undefined, userInformation)
            : menuOptions[0] === 'Project'
            ? loadMainPopup(0, popups[0], test, userInformation, true)
            : loadMainPopup(0, popups[0], test, userInformation)}
        </>
      ) : (
        <div className="map-pop-02">
          <div className="headmap">{title ? (title.subtitle ? getBeautifulTitle(title) : title.title) : 'LAYERS'}</div>
          <div className="layer-popup">
            {menuOptions.map((menu: any, index: number) => {
              return (
                <div>
                  {loadIconsPopup(menu, popups, index, eventFunctions['showPopup'], ids)}
                  {menu !== 'Project' && !menu.includes('Problem')
                    ? menu == 'Stream'
                      ? loadStreamPopup(index, popups[index])
                      : menu == MENU_OPTIONS.MEASURES
                      ? loadMeasurePopup(
                          index,
                          popups[index],
                          !notComponentOptions.includes(menuOptions[index]),
                          userInformation,
                          eventFunctions,
                        )
                      : maptype === MAPTYPES.CREATEPROJECTMAP
                      ? loadComponentPopupCreate(
                          index,
                          popups[index],
                          !notComponentOptions.includes(menuOptions[index]),
                          eventFunctions,
                        )
                      : loadComponentPopup(
                          index,
                          popups[index],
                          !notComponentOptions.includes(menuOptions[index]),
                          userInformation,
                          maptype,
                          eventFunctions,
                        ) // TODO: CHECK FOR FUNCTIONS
                    : maptype === MAPTYPES.CREATEPROJECTMAP
                    ? loadMainPopupCreateMap(index, popups[index], eventFunctions, undefined, userInformation)
                    : menu === 'Project'
                    ? loadMainPopup(
                        index,
                        popups[index],
                        eventFunctions,
                        userInformation,
                        true,
                        popups[index].isEditPopup,
                        maptype,
                      )
                    : loadMainPopup(
                        index,
                        popups[index],
                        eventFunctions,
                        userInformation,
                        true,
                        popups[index].isEditPopup,
                        maptype,
                      )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>,
    popupNode,
  );
  return popupNode;
};

const loadMainPopup = (
  id: number,
  item: any,
  eventFunctions: (e: any) => void,
  userInformation: any,
  sw?: boolean,
  ep?: boolean,
  mapType?: any,
) => (
  <>
    <MainPopup
      id={id}
      item={item}
      eventFunctions={eventFunctions}
      sw={
        sw ||
        !(
          userInformation.designation === ADMIN ||
          userInformation.designation === STAFF ||
          userInformation.designation === GOVERNMENT_ADMIN ||
          userInformation.designation === GOVERNMENT_STAFF
        )
      }
      ep={ep ? ep : false}
      mapType={mapType}
    ></MainPopup>
  </>
);
const loadMainPopupCreateMap = (id: number, item: any, eventFunctions: any, sw?: boolean, user?: any) => (
  <>
    <MainPopupCreateMap
      id={id}
      item={item}
      eventFunctions={eventFunctions}
      sw={sw || !(user.designation === ADMIN || user.designation === STAFF)}
      ep={false}
    ></MainPopupCreateMap>
  </>
);
const loadComponentPopupCreate = (index: number, item: any, isComponent: boolean, eventFunctions: any) => {
  return (
    <>
      <ComponentPopupCreate
        id={index}
        item={item}
        isComponent={isComponent}
        isWR={false}
        eventFunctions={eventFunctions}
      ></ComponentPopupCreate>
    </>
  );
};
const loadStreamPopup = (index: number, item: any) => (
  <>
    <StreamPopupFull id={index} item={item}></StreamPopupFull>
  </>
);
const loadComponentPopup = (
  index: number,
  item: any,
  isComponent: boolean,
  userInformation: any,
  maptype: any,
  eventFunctions: any,
) => (
  <>
    <ComponentPopup
      id={index}
      item={item}
      isComponent={
        isComponent &&
        (userInformation.designation === ADMIN ||
          userInformation.designation === STAFF ||
          userInformation.designation === GOVERNMENT_ADMIN ||
          userInformation.designation === GOVERNMENT_STAFF)
      }
      maptype={maptype}
      eventFunctions={eventFunctions}
    ></ComponentPopup>
  </>
);
const loadMeasurePopup = (
  index: number,
  item: any,
  isComponent: boolean,
  userInformation: any,
  eventFunctions: any,
) => (
  <>
    <MeasurePopup
      id={index}
      item={item}
      isComponent={
        isComponent &&
        (userInformation.designation === ADMIN ||
          userInformation.designation === STAFF ||
          userInformation.designation === GOVERNMENT_ADMIN ||
          userInformation.designation === GOVERNMENT_STAFF)
      }
      eventFunctions={eventFunctions}
    ></MeasurePopup>
  </>
);
export const loadIconsPopup = (menu: any, popups: any, index: any, showPopup: any, ids: any) => {
  console.log(menu, 'menu', popups, 'popups', index, 'index', ids);
  const popup = popups[index];
  let icon;
  ICON_POPUPS.forEach(element => {
    if (element[0] === menu) {
      icon = (
        <Button
          id={'menu-' + index}
          onClick={() => showPopup(index, popups.length, ids[index])}
          className="btn-transparent"
        >
          <img style={{ width: '18px', borderRadius: '2px' }} src={element[1]} alt="" />
          <span className="text-popup-00"> {menu}</span> <RightOutlined />
        </Button>
      );
    }
  });
  if (icon !== undefined) {
    return icon;
  }
  let iconLocation = '';
  switch (true) {
    case menu.includes('roblem'):
      iconLocation = '/Icons/ic_problems.png';
      break;
    case menu.includes('roject') &&
      popup.projecctype !== undefined &&
      popup.mapType === 'WORKREQUEST' &&
        (popup.status === 'Active' ||
          popup.status === 'Approved' ||
          popup.status === 'Requested' ||
          popup.status === 'Submitted'):
      iconLocation = `/Icons/icon-projects-${popup.status.toLowerCase()}.png`;
      break;
    case menu.includes('roject') &&
      popup.projecctype !== undefined &&
      (popup.projecctype === NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Debris_Management ||
        popup.projecctype === NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Vegetation_Management ||
        popup.projecctype === NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Sediment_Removal ||
        popup.projecctype === NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Minor_Repairs ||
        popup.projecctype === NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Restoration ||
        popup.projecctype.includes(NEW_PROJECT_TYPES.Maintenance) ||
        popup.projecctype.includes('Capital') ||
        popup.projecctype === 'Fee in Lieu'):
      iconLocation = '/Icons/icon_restoration.png';
      break;
    case menu === 'Project' && popup.projecctype !== undefined && popup.name.includes('FHAD'):
      iconLocation = '/Icons/ic_Project_FHAD@2x.png';
      break;
    case menu === 'Project' && popup.projecctype !== undefined && popup.projecctype.includes('Study'):
      iconLocation = '/Icons/ic_Project_MasterPlan@2x.png';
      break;
    case menu === 'Project' && popup.projecctype !== undefined && popup.projecctype.includes('CIP'):
      iconLocation = '/Icons/icon_capital.png';
      break;
    case menu === 'NCRS Soils' && popup.hydgrpdcd !== undefined && popup.hydgrpdcd === 'A':
      iconLocation = '/Icons/ic_NRCS_GroupA@2x.png';
      break;
    case menu === 'NCRS Soils' && popup.hydgrpdcd !== undefined && popup.hydgrpdcd === 'B':
      iconLocation = '/Icons/ic_NRCS_GroupB@2x.png';
      break;
    case menu === 'NCRS Soils' && popup.hydgrpdcd !== undefined && popup.hydgrpdcd === 'C':
      iconLocation = '/Icons/ic_NRCS_GroupC@2x.png';
      break;
    case menu === 'NCRS Soils' && popup.hydgrpdcd !== undefined && popup.hydgrpdcd === 'D':
      iconLocation = '/Icons/ic_NRCS_GroupD@2x.png';
      break;
    case menu === 'FEMA Flood Hazard' &&
      popup.fld_zone !== undefined &&
      popup.fld_zone === 'AE' && popup.zone_subty === '-':
      iconLocation = '/Icons/ic_FEMA_ZoneAE@2x.png';
      break;
    case menu === 'FEMA Flood Hazard' &&
      popup.fld_zone !== undefined &&
      popup.fld_zone === 'AE' && popup.zone_subty === 'FLOODWAY':
      iconLocation = '/Icons/ic_FEMA_Floodway@2x.png';
      break;
    case menu === 'FEMA Flood Hazard' && popup.fld_zone !== undefined && popup.fld_zone === 'X':
      iconLocation = '/Icons/ic_FEMA_ZoneX@2x.png';
      break;
    case menu === 'FEMA Flood Hazard' && popup.fld_zone !== undefined && popup.fld_zone === 'AO':
      iconLocation = '/Icons/ic_FEMA_ZoneAO@2x.png';
      break;
    case menu === 'Active Stream Corridor' && popup.scale !== undefined && popup.scale === 'Stream Corridor':
      iconLocation = '/Icons/ic_SMC_StreamCorridor@2x.png';
      break;
    case menu === 'Fluvial Hazard Buffer' && popup.scale !== undefined && popup.scale === 'Stream Corridor':
      iconLocation = '/Icons/ic-pattern2.png';
      break;
    case menu === 'Active Stream Corridor' && popup.scale !== undefined && popup.scale === 'Watershed':
      iconLocation = '/Icons/ic_SMC_Watershed@2x.png';
      break;
    case menu === 'Fluvial Hazard Buffer' && popup.scale !== undefined && popup.scale === 'Watershed':
      iconLocation = '/Icons/ic-pattern3.png';
      break;
    case menu === 'LOMCs' && popup.status !== undefined && popup.status === 'Active':
      iconLocation = '/Icons/lomcs_active.png';
      break;
    case menu === 'LOMCs' && popup.status !== undefined && popup.status === 'Suspended':
      iconLocation = '/Icons/lomcs_suspended.png';
      break;
    case menu === 'LOMCs' && popup.status !== undefined && popup.status === 'Violation':
      iconLocation = '/Icons/lomcs_violation.png';
      break;
    case menu === 'LOMCs' && popup.status !== undefined && popup.status === 'Completed':
      iconLocation = '/Icons/lomcs_completed.png';
      break;
    case menu === 'Effective Reaches' && popup.studyname !== 'unknown':
      iconLocation = '/Icons/icon-effective-reaches-studyunkown.png';
      break;
    case menu === 'Effective Reaches' && popup.studyname === 'unknown':
      iconLocation = '/Icons/icon-effective-reaches-study.png';
      break;
    case menu === MENU_OPTIONS.MEP_DETENTION_BASIN:
      iconLocation = '/Icons/icon-mep-detention-basin.png';
      break;
    case menu === MENU_OPTIONS.MEP_STORM_OUTFALL:
      iconLocation = '/Icons/icon-mep-storm-outfall.png';
      break;
    case menu === MENU_OPTIONS.MEP_CHANNEL:
      iconLocation = '/Icons/icon-mep-channel.png';
      break;
    case menu === 'Stream Improvement Measure' && popup.type === 'Stream Improvement - Continuous Improvement':
      iconLocation = '/Icons/ic-stream-continuous.png';
      break;
    case menu === 'Stream Improvement Measure' && popup.type === 'Stream Improvement - Bank Stabilization':
      iconLocation = '/Icons/ic-stream-bank.png';
      break;
    case menu.includes('Stream Improvement Measure'):
      iconLocation = '/Icons/icon_streamimprovmentmeasure.png';
    default:
      iconLocation = '/Icons/icon-75.svg';
      break;
  }
  if (menu) {
    return (
      <Button
        id={'menu-' + index}
        onClick={() => showPopup(index, popups.length, ids[index])}
        className="btn-transparent"
      >
        <img style={{ width: '18px', borderRadius: '2px' }} src={iconLocation} alt="" />
        <span className="text-popup-00"> {menu}</span> <RightOutlined />
      </Button>
    );
  }
};
