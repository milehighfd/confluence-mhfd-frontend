import React from 'react';
import ReactDOM from 'react-dom';
import {
  MeasurePopup
} from '../../../Components/Map/MapPopups';
import {
  MENU_OPTIONS,
  ADMIN,
  STAFF,
  GOVERNMENT_ADMIN,
  GOVERNMENT_STAFF
} from '../../../constants/constants';
import { CommentPopupDiv } from './CommentPopup';
import { MenuPopup } from './MenuPopup';

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
  const firstItemOfMenu = menuOptions[0];
  const popupNode = document.createElement('div');
  console.log('eventFunctions', eventFunctions, menuOptions);
  ReactDOM.render(
    <>
      {firstItemOfMenu === MENU_OPTIONS.MEASURES ? (
        <MeasurePopup
          id={0}
          item={popups[0]}
          isComponent={
            !notComponentOptions.includes(firstItemOfMenu) &&
            (userInformation.designation === ADMIN ||
              userInformation.designation === STAFF ||
              userInformation.designation === GOVERNMENT_ADMIN ||
              userInformation.designation === GOVERNMENT_STAFF)
          }
          eventFunctions={eventFunctions}
        ></MeasurePopup>
      ) : (
        <MenuPopup
          title={title}
          menuOptions={menuOptions}
          popups={popups}
          ids={ids}
          eventFunctions={eventFunctions}
          userInformation={userInformation}
          maptype={maptype}
        />
      )}
    </>,
    popupNode,
  );
  return popupNode;
};