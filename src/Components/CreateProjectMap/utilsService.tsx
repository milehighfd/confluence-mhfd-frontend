import * as turf from '@turf/turf';


export const getFeaturesIntersected = (features: any, userPolygon: any) => {
  let featuresIntersected: Array<any> = [];
  let i = 0 ; 
  features.forEach(( feature:any ) => {
    const geometryA = feature.geometry;
    const geometryB = userPolygon.geometry;
    let featureIntersect = undefined;
        try { 
          console.log(geometryA.type);
          if(geometryA.type.includes('Line')) {
            featureIntersect = turf.lineIntersect(geometryA, geometryB);
          } else {
            featureIntersect = turf.intersect(geometryA, geometryB);
          }
         
         ++i;
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

