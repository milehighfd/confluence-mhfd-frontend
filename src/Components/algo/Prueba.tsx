import React, {useState} from "react";
import {MapService} from '../../utils/MapService';
const stateValue = {
  visible: false
}
export default () => {
  const html = document.getElementById('map');
  if (html) {
    const map = new MapService('map');
  }
  return  <div className="map"> <div id="map"  style={{ width: '100%', height: '100%' }}>
            <div>coso</div>
         </div></div>

};
