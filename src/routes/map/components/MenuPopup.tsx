import React from "react";
import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import {
  ICON_POPUPS,
  NEW_PROJECT_TYPES,
  MENU_OPTIONS,
  notComponentOptions,
  ADMIN,
  STAFF,
  GOVERNMENT_ADMIN,
  GOVERNMENT_STAFF,
  MAPTYPES
} from "constants/constants";
import {
  ComponentPopup,
  MainPopup,
  MeasurePopup,
  MainPopupCreateMap,
  ComponentPopupCreate,
  StreamPopupFull
} from '../../../Components/Map/MapPopups';

export const MenuPopup = ({title, menuOptions, popups, ids, eventFunctions, userInformation, maptype}:any) => {
  const getBeautifulTitle = (title: any) => {
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
  const menuListWithIcons = (menu: any, popups: any, index: any, showPopup: any, ids: any) => {
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
      case menu.includes('Stream Improvement Measure') && popup.type === 'Stream Improvement - Continuous Improvement':
        iconLocation = '/Icons/ic-stream-continuous.png';
        break;
      case menu.includes('Stream Improvement Measure') && popup.type === 'Stream Improvement - Bank Stabilization':
        iconLocation = '/Icons/ic-stream-bank.png';
        break;
      case menu.includes('Stream Improvement Measure'):
        iconLocation = '/Icons/icon_streamimprovmentmeasure.png';
      default:
        iconLocation = '/Icons/icon-75.svg';
        break;
    }
    console.log('This is the icon supossed', menu, iconLocation);
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
  return (
    <div className="map-pop-02">
      <div className="headmap">{title ? (title.subtitle ? getBeautifulTitle(title) : title.title) : 'LAYERS'}</div>
      <div className="layer-popup">
        {menuOptions.map((menu: any, index: number) => {
          return (
            <div key={index}>
              {menuListWithIcons(menu, popups, index, eventFunctions['showPopup'], ids)}
              {menu !== 'Project' && !menu.includes('Problem')
                ? menu == 'Stream'
                  ? <StreamPopupFull id={index} item={popups[index]}></StreamPopupFull>
                  : menu == MENU_OPTIONS.MEASURES
                  ? <MeasurePopup
                      id={index}
                      item={popups[index]}
                      isComponent={
                        !notComponentOptions.includes(menuOptions[index]) &&
                        (userInformation.designation === ADMIN ||
                          userInformation.designation === STAFF ||
                          userInformation.designation === GOVERNMENT_ADMIN ||
                          userInformation.designation === GOVERNMENT_STAFF)
                      }
                      eventFunctions={eventFunctions}
                    />
                  : maptype === MAPTYPES.CREATEPROJECTMAP
                  ? <ComponentPopupCreate
                      id={index}
                      item={popups[index]}
                      isComponent={!notComponentOptions.includes(menuOptions[index])}
                      isWR={false}
                      eventFunctions={eventFunctions}
                    />
                  : <ComponentPopup
                      id={index}
                      item={popups[index]}
                      isComponent={
                        !notComponentOptions.includes(menuOptions[index]) &&
                        (userInformation.designation === ADMIN ||
                          userInformation.designation === STAFF ||
                          userInformation.designation === GOVERNMENT_ADMIN ||
                          userInformation.designation === GOVERNMENT_STAFF)
                      }
                      maptype={maptype}
                      eventFunctions={eventFunctions}
                    />
                : maptype === MAPTYPES.CREATEPROJECTMAP
                ? <MainPopupCreateMap
                    id={index}
                    item={popups[index]}
                    eventFunctions={eventFunctions}
                    sw={undefined || !(userInformation.designation === ADMIN || userInformation.designation === STAFF)}
                    ep={false}
                  />
                : menu === 'Project'
                ? <MainPopup
                    id={index}
                    item={popups[index]}
                    eventFunctions={eventFunctions}
                    sw={
                      true ||
                      !(
                        userInformation.designation === ADMIN ||
                        userInformation.designation === STAFF ||
                        userInformation.designation === GOVERNMENT_ADMIN ||
                        userInformation.designation === GOVERNMENT_STAFF
                      )
                    }
                    ep={popups[index].isEditPopup ? popups[index].isEditPopup : false}
                    mapType={maptype}
                  />
                : <MainPopup
                    id={index}
                    item={popups[index]}
                    eventFunctions={eventFunctions}
                    sw={
                      true ||
                      !(
                        userInformation.designation === ADMIN ||
                        userInformation.designation === STAFF ||
                        userInformation.designation === GOVERNMENT_ADMIN ||
                        userInformation.designation === GOVERNMENT_STAFF
                      )
                    }
                    ep={popups[index].isEditPopup ? popups[index].isEditPopup : false}
                    mapType={maptype}
                  />
                }
            </div>
          );
        })}
      </div>
    </div>
  );
};
