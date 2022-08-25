import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';

const factorKMToMiles = 0.621371;
const factorKMtoFeet =  3280.8;
const factorm2toacre = 0.00024710538146717;

export const measureFunction = (
  e: any,
  map: any,
  coordX: any,
  coordY: any,
  geojsonMeasures: any,
  setIsDrawingMeasure: any,
  linestringMeasure: any,
  finishMeasure: any,
  setDistanceValue: any,
  setAreaValue: any,
  setDistanceValueMi: any
) => {
  const features = map.queryRenderedFeatures(e.point, {
    layers: ['measure-points']
    });
    if ((e.point.x === coordX || e.point.y === coordY)) {
      return;
    }
    coordX = e.point.x;
    coordY = e.point.y;
    if (geojsonMeasures.features.length > 1) geojsonMeasures.features.pop();
    setIsDrawingMeasure(true);
    if (features.length > 0 && linestringMeasure.geometry.coordinates.length > 2) {
      const id = features[0].properties.id;
      geojsonMeasures.features = geojsonMeasures.features.filter(
        (point :any) => point.properties.id !== id
      );
      finishMeasure();
    } else {
      const point:any = {
        'type': 'Feature',
        'geometry': {
        'type': 'Point',
        'coordinates': [e.lngLat.lng, e.lngLat.lat]
        },
        'properties': {
        'id': String(new Date().getTime())
        }
      };
      geojsonMeasures.features.push(point);
    }
     
    if (geojsonMeasures.features.length > 1) {
      linestringMeasure.geometry.coordinates = geojsonMeasures.features.map(
        (point: any) => point.geometry.coordinates
      );
      geojsonMeasures.features.push(linestringMeasure);
      const newLS = turf.lineString(linestringMeasure.geometry.coordinates);
      const distance = turf.length(newLS);
      setDistanceValue((distance * factorKMtoFeet).toLocaleString(undefined, {maximumFractionDigits: 2}));
      setDistanceValueMi((distance * factorKMToMiles).toLocaleString(undefined, {maximumFractionDigits: 2}));
      if(linestringMeasure.geometry.coordinates.length > 2) {
        var polygon = turf.lineToPolygon(JSON.parse(JSON.stringify(newLS)));
        const area = turf.area(polygon);
        setAreaValue((area * factorm2toacre).toLocaleString(undefined, {maximumFractionDigits: 2}));
      } 
    } else if(geojsonMeasures.features.length == 1){
      setAreaValue('0');
      setDistanceValue('0');
      setDistanceValueMi('0');
    }
     
    if(map.getSource('geojsonMeasure')) {
      map.getSource('geojsonMeasure').setData(geojsonMeasures);
    }
}