import React from "react";
import {
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
  MainPopupCreateMap,
  ComponentPopupCreate,
  StreamPopupFull
} from '../../../Components/Map/MapPopups';

const MenuItem = ({menu, maptype,item, index, itemData, eventFunctions, userInformation}: any) => {
  let ItemComponent: any;
  let props: any;
  if (menu !== 'Project' && !menu.includes('Problem')) {
    if (menu == 'Stream') {
      ItemComponent = StreamPopupFull;
      props = {
        id:index,
        item:itemData
      };
    } else if (maptype === MAPTYPES.CREATEPROJECTMAP) { 
      ItemComponent = ComponentPopupCreate;
      props = {
        id:index,
        item:itemData,
        isComponent:!notComponentOptions.includes(item),
        isWR:false,
        eventFunctions:eventFunctions
      }
    } else {
      ItemComponent = ComponentPopup;
      props = {
        id: index,
        item: itemData,
        isComponent:
          !notComponentOptions.includes(item) &&
          (userInformation.designation === ADMIN ||
            userInformation.designation === STAFF ||
            userInformation.designation === GOVERNMENT_ADMIN ||
            userInformation.designation === GOVERNMENT_STAFF),
        maptype: maptype,
        eventFunctions: eventFunctions
      }
    }
  } else {
    if (maptype === MAPTYPES.CREATEPROJECTMAP) {
      ItemComponent = MainPopupCreateMap;
      props = {
        id: index,
        item: itemData,
        eventFunctions: eventFunctions,
        sw: undefined || !(userInformation.designation === ADMIN || userInformation.designation === STAFF),
        ep: false
      };
    } else {
      ItemComponent = MainPopup;
      props = {
        id: index,
        item: itemData,
        eventFunctions: eventFunctions,
        sw:
          true ||
          !(
            userInformation.designation === ADMIN ||
            userInformation.designation === STAFF ||
            userInformation.designation === GOVERNMENT_ADMIN ||
            userInformation.designation === GOVERNMENT_STAFF
          ),
        ep: itemData.isEditPopup ? itemData.isEditPopup : false,
        mapType: maptype
      }
    }
  }
  return (<ItemComponent {...props}/>)
}

export default MenuItem;