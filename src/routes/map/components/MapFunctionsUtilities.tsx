import * as mapboxgl from 'mapbox-gl';

export const flytoBoundsCoor = (
  getCurrent : any, 
  userInformation : any,
  globalMapId : any,
  coorBounds : any,
  map : any,
  groupOrganization : any,
  setCoordinatesJurisdiction : any
  ) => {
  let historicBounds = getCurrent();
  if(historicBounds && historicBounds.bbox && userInformation.isSelect != 'isSelect') {
    globalMapId = historicBounds.id;
    map.fitBounds([[historicBounds.bbox[0],historicBounds.bbox[1]],[historicBounds.bbox[2],historicBounds.bbox[3]]]);
  } else if (coorBounds[0] && coorBounds[1]) {
    map.fitBounds(coorBounds);
    if(userInformation.isSelect != 'isSelect') {
      setTimeout(()=>{
       const zoomareaSelected = groupOrganization.filter((x: any) => x.aoi === userInformation.zoomarea).map((element: any) => {
         return {
           aoi: element.aoi,
           filter: element.filter,
           coordinates: element.coordinates
         }
       });
       if(zoomareaSelected[0]){
         let type = zoomareaSelected[0].filter; 
         let zone = zoomareaSelected[0].aoi;
         zone = zone.replace('County ', '').replace('Service Area', '');
         setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
       }
      },5000);
    }
  }
}

export const getTitleOfStreamImprovements = (properties: any) => {
  let title = '';
  if (properties.component_part_category) {
    title = properties.component_part_category ;
  } 
  if ( properties.component_part_subcategory) {
    title += (properties.component_part_category ? ' - ' : '') + properties.component_part_subcategory;
  }
  return title;
}

export const getTitleOfProblemsPart = (feature: any) => {
  let title = '';
  if (feature.source.includes('hazard_polygon')) {
    title = 'Flood Hazard Polygon' ;
  } 
  if ( feature.source.includes('hazard_line')) {
    title = 'Flood Hazard Line' ;
  }
  if ( feature.source.includes('hazard_point')) {
    title = 'Flood Hazard Point' ;
  }
  if ( feature.source.includes('function_line')) {
    title = 'Stream Function Line' ;
  }
  if ( feature.source.includes('function_polygon')) {
    title = 'Stream Function Polygon' ;
  }
  if ( feature.source.includes('function_point')) {
    title = 'Stream Function Point' ;
  }
  if ( feature.source.includes('development_polygon')) {
    title = 'Watershed Change Polygon' ;
  }
  if ( feature.source.includes('development_line')) {
    title = 'Watershed Change Line' ;
  }

  return title;
}