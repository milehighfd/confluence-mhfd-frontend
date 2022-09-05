import React, { useState } from 'react';
import { Button } from 'antd';
import { useMapDispatch, useMapState } from '../../../hook/mapHook';
import { useProfileDispatch, useProfileState } from '../../../hook/profileHook';
import { GlobalMapHook } from '../../../utils/globalMapHook';

const coordinatesMHFD = [
  [-105.3236581, 39.4057815],
  [-105.3236581, 40.1315705],
  [-104.4889475, 40.1315705],
  [-104.4889475, 39.4057815],
  [-105.3236581, 39.4057815]
];
let globalMapId: string | null = null;

const SideMenuTools = ({ map, setCommentVisible, mapService }: any) => {
  const {
    setFilterProblemOptions,
    setFilterProjectOptions,
    setCoordinatesJurisdiction,
    setNameZoomArea,
    setAutocomplete,
    setBBOXComponents,
    setOpacityLayer
  } = useMapDispatch();
  const {
    getNext,
    getPercentage,
    getPrevious,
    hasNext,
    hasPrevious
  } = GlobalMapHook();
  const { saveUserInformation } = useProfileDispatch();
  const { userInformation, groupOrganization } = useProfileState();
  const {
    opacityLayer,
    filterProblemOptions,
    filterProjectOptions,
  } = useMapState();
  const [displayPrevNext, setDisplayPrevNext] = useState(false);
  const changeCenter = (name: string, coordinates: any, isSelect?: any) => {
    const user = userInformation;
    user.polygon = coordinates;
    user.isSelect = isSelect;
    saveUserInformation(user);
    setNameZoomArea(name);
    const zoomareaSelected = groupOrganization.filter((x: any) => x.aoi === name).map((element: any) => {
      return {
        aoi: element.aoi,
        filter: element.filter,
        coordinates: element.coordinates
      }
    });
    if (zoomareaSelected.length > 0) {
      switch (zoomareaSelected[0].filter) {
        case 'County':
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
          break;
        case 'Jurisdiction':
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
          break;
        case 'Service Area':
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
          break;
        default:
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
      }
    }
  }
  const onSelect = (value: any, isSelect?:any) => {
    setAutocomplete(value);
    const zoomareaSelected = groupOrganization.filter((x: any) => x.aoi === value).map((element: any) => {
      return {
        aoi: element.aoi,
        filter: element.filter,
        coordinates: element.coordinates
      }
    });
    if(zoomareaSelected[0]){
      let zone = zoomareaSelected[0].aoi;
      zone = zone.replace('County ', '').replace('Service Area', '');
      setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
      changeCenter(value, zoomareaSelected[0].coordinates, isSelect === 'noselect'? undefined:"isSelect");
    }
    setBBOXComponents({ bbox: [], centroids: [] })
  };
  const showMHFD = () => {
    setAutocomplete('');
    saveUserInformation({...userInformation, polygon: coordinatesMHFD});
    if (!opacityLayer) {
        mapService.hideOpacity();
    }
    setOpacityLayer(false);
    setCoordinatesJurisdiction([]);
    const optionsProblem = { ...filterProblemOptions };
    const optionsProject = { ...filterProjectOptions };
    optionsProblem['servicearea'] = '';
    optionsProject['servicearea'] = '';
    optionsProblem['county'] = '';
    optionsProject['county'] = '';
    optionsProblem['jurisdiction'] = '';
    optionsProject['jurisdiction'] = '';
    setFilterProblemOptions(optionsProblem);
    setFilterProjectOptions(optionsProject);
    const startMHFD = {
      center: [-104.90630279999999, 39.768676],
      zoom: 9,
      pitch: 0,
      bearing: 0
      };
    map.flyTo({
      ...startMHFD,
      duration: 3000, 
      essential: true
    })
    setNameZoomArea('Mile High Flood District');
    onSelect('Mile High Flood District');
    setBBOXComponents({ bbox: [], centroids: [] })
}

  return (
    <div className="m-zoom">
      <Button className="btn-green"><img src="/Icons/icon-87.svg" width="15px"
        onClick={() => {
          function success(position: any) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(latitude, longitude);
            map.flyTo({
              center: [longitude, latitude],
              zoom: 14
            });

            map.addSource('point', {
              'type': 'geojson',
              'data': {
                'type': 'FeatureCollection',
                'features': [
                  {
                    'type': 'Feature',
                    'geometry': {
                      'type': 'Point',
                      'coordinates': [longitude, latitude]
                    }
                  }
                ]
              }
            });
            map.addLayer({
              'id': 'points',
              'type': 'symbol',
              'source': 'point',
              'layout': {
                'icon-image': 'adjust-24px'
              }
            });
          }
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, () => { });
          }
        }}
      /></Button>
      <Button className="btn-none" onClick={() => {
        setCommentVisible((commentVisible: any) => !commentVisible);
      }} style={{ borderRadius: '4px' }} ><img className="img-icon-01" /></Button>

      <Button className='btn-showmhfd' style={{ borderRadius: '4px' }} onClick={() => showMHFD()} ><img className="img-icon" /></Button>
      <Button className='btn-history' onClick={() => setDisplayPrevNext(!displayPrevNext)}><img className='img-icon-04'></img></Button>
      {displayPrevNext && <div className='mapstatebuttons'  >
        <div className="mapstateprevnext"
          style={!hasPrevious() ? { backgroundColor: '#f1f1f1' } : {}}
          onClick={() => {
            console.log('previous ', hasPrevious());
            if (hasPrevious()) {
              const prev = getPrevious();
              globalMapId = prev.id;
              console.log('click prev ', prev);
              map.fitBounds([[prev.bbox[0], prev.bbox[1]], [prev.bbox[2], prev.bbox[3]]]);
            }
          }}>
          <div className="title">Prev</div>
          <div className="progress left">
            <div className="progress-value light" style={{ width: `${100.0 - getPercentage()}%` }} ></div>
          </div>
        </div>
        <div className="mapstateprevnext"
          style={!hasNext() ? { backgroundColor: '#f1f1f1' } : {}}
          onClick={() => {
            if (hasNext()) {
              const nxt = getNext();
              globalMapId = nxt.id;
              console.log('click next, ', nxt);
              map.fitBounds([[nxt.bbox[0], nxt.bbox[1]], [nxt.bbox[2], nxt.bbox[3]]]);
            }
          }}
        >
          <div className="title">Next</div>
          <div className="progress right">
            <div className="progress-value light" style={{ width: `${getPercentage()}%` }} ></div>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default SideMenuTools;
