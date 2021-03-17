import * as turf from '@turf/turf';
import ReactDOMServer from 'react-dom/server';


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

// export const loadMenuPopupWithData = (menuOptions: any[], popups: any[]) => ReactDOMServer.renderToStaticMarkup(

//   <>
//       <div className="map-pop-02">
//         <div className="headmap">LAYERS</div>
//         <div className="layer-popup">
          
//                 <div>
//                   <Button id={'menu-marker'} key={'menu-0'} className={"btn-transparent " + "menu-marker"}><img src="/Icons/icon-75.svg" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
//                 </div>
//           </div>
//       </div>}
//   </>
// );