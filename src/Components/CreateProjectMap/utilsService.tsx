import * as turf from '@turf/turf';


export const getFeaturesIntersected = (features: any, userPolygon: any) => {
  let featuresIntersected: Array<any> = [];
  features.forEach(( feature:any ) => {
    const geometryA = feature.geometry;
    const geometryB = userPolygon;
    let featureIntersect = undefined;
        try { 
         featureIntersect = turf.intersect(geometryA, geometryB);
        } catch (e) {
          console.error("intersection error", e, geometryA, geometryB)
        }

        if(featureIntersect) {
          featuresIntersected = [...featuresIntersected, feature];
        }
  });
  return featuresIntersected;
}

export const getHull = (featuresIntersected: any) => {
  let featuresCollection = {
    'type': 'FeatureCollection',
    'features': featuresIntersected
  };
  var hull = turf.convex(featuresCollection);
  return hull ;
}