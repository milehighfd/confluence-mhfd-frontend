import React, { useState, useEffect } from "react";
import { MapService } from '../../utils/MapService';

const SampleMap = () => {
  let html = document.getElementById('map2');
  let map: any;
  useEffect(() => {
    const waiting = () => {
      html = document.getElementById('map2');
      if (!html) {
        setTimeout(waiting, 50);
      } else {
        if(!map) {
          map = new MapService('map2');
         // map.isStyleLoaded(addLayer);
        }
      }
    };
    waiting();
  }, []);
  return <>
    <div id="map2"  style={{ height: '100%', width: '100%' }}></div>
  </>
};

export default SampleMap;