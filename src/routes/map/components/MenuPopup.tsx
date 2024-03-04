import React from "react";
import { MenuList } from "./MenuList";
import MenuItem from "./MenuItem";

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
  return (
    <div className="map-pop-02">
      <div className="headmap">{title ? (title.subtitle ? getBeautifulTitle(title) : title.title) : 'LAYERS'}</div>
      <div className="layer-popup">
        {menuOptions.map((menu: any, index: number) => {
          if (menu) {
            return (
              <div key={index}>
                <MenuList
                  menu={menu}
                  popups={popups}
                  index={index}
                  showPopup={eventFunctions['showPopup']}
                  ids={ids}
                />
                <MenuItem
                  menu={menu}
                  maptype={maptype}
                  item={menuOptions[index]}
                  index={index}
                  itemData={popups[index]}
                  eventFunctions={eventFunctions}
                  userInformation={userInformation}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
