import React, { useState, useEffect } from "react";
import ReactDOMServer from 'react-dom/server';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../../utils/MapService';
import { RightOutlined } from '@ant-design/icons';
import { MainPopupCreateMap, ComponentPopupCreate, StreamPopupFull } from './../Map/MapPopups';
import { numberWithCommas } from '../../utils/utils';
import * as turf from '@turf/turf';
import { getData, getToken, postData } from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import DetailedModal from '../Shared/Modals/DetailedModal';
import EventService from '../../services/EventService';
import {
  PROBLEMS_TRIGGER,
  PROJECTS_MAP_STYLES,
  COMPONENT_LAYERS,
  ROUTINE_MAINTENANCE,
  MHFD_BOUNDARY_FILTERS,
  SELECT_ALL_FILTERS,
  MENU_OPTIONS,
  PROJECTS_DRAFT_MAP_STYLES,
  ROUTINE_NATURAL_AREAS,
  STREAMS_FILTERS,
  ROUTINE_WEED_CONTROL, ROUTINE_DEBRIS_AREA,
  ROUTINE_DEBRIS_LINEAR, FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER,
  PROJECTS_LINE, PROJECTS_POLYGONS, MEP_PROJECTS_TEMP_LOCATIONS, MEP_PROJECTS_DETENTION_BASINS,
  MEP_PROJECTS_CHANNELS, MEP_PROJECTS_STORM_OUTFALLS, LANDSCAPING_AREA,
  LAND_ACQUISITION, DETENTION_FACILITIES, STORM_DRAIN, CHANNEL_IMPROVEMENTS_AREA,
  CHANNEL_IMPROVEMENTS_LINEAR, SPECIAL_ITEM_AREA, SPECIAL_ITEM_LINEAR, SPECIAL_ITEM_POINT, MHFD_STREAMS_FILTERS,
  PIPE_APPURTENANCES, GRADE_CONTROL_STRUCTURE, NRCS_SOILS, DWR_DAM_SAFETY, STREAM_MANAGEMENT_CORRIDORS, BCZ_PREBLE_MEADOW_JUMPING, BCZ_UTE_LADIES_TRESSES_ORCHID, RESEARCH_MONITORING, CLIMB_TO_SAFETY, SEMSWA_SERVICE_AREA, ADMIN, STAFF,
  NEARMAP_TOKEN,
  STREAMS_POINT,
  PROJECTS_DRAFT
} from "../../constants/constants";
import { ObjectLayerType, LayerStylesType } from '../../Classes/MapTypes';
import store from '../../store';
import { Dropdown, Button } from 'antd';
import { tileStyles } from '../../constants/mapStyles';
import { useMapState, useMapDispatch } from '../../hook/mapHook';
import { useProjectState, useProjectDispatch } from '../../hook/projectHook';
import { useProfileState } from '../../hook/profileHook';
import MapFilterView from '../Shared/MapFilter/MapFilterView';
import { Input, AutoComplete } from 'antd';
import LoadingViewOverall from "../Loading-overall/LoadingViewOverall";

let map: any;

let isPopup = true;
let firstTime = true;
let firstTimeApplyMapLayers = true;
let componentsList: any[] = [];
let marker = new mapboxgl.Marker({ color: "#ffbf00", scale: 0.7 });
let currentDraw = 'polygon';
let firstCallDraw = false;
type LayersType = string | ObjectLayerType;
const { Option } = AutoComplete;
const CreateProjectMap = (type: any) => {
  let html = document.getElementById('map3');
  let popup = new mapboxgl.Popup({ closeButton: true, });

  const [isExtendedView] = useState(false);
  const user = store.getState().profile.userInformation;
  const { layers, mapSearch, filterProjects, filterProblems, componentDetailIds, filterComponents, currentPopup, galleryProjects, detailed, loaderDetailedPage, componentsByProblemId, componentCounter, loaderTableCompoents, bboxComponents } = useMapState();

  const { mapSearchQuery, setSelectedPopup, getComponentCounter, setSelectedOnMap, existDetailedPageProblem, existDetailedPageProject, getDetailedPageProblem, getDetailedPageProject, getComponentsByProblemId, getComponentsByProjid, getBBOXComponents } = useMapDispatch();
  const { saveSpecialLocation, saveAcquisitionLocation, getStreamIntersectionPolygon, getStreamsIntersectedPolygon, changeAddLocationState, getListComponentsIntersected, getServiceAreaPoint,
    getServiceAreaStreams, getStreamsList, setUserPolygon, changeDrawState, changeDrawStateCapital, getListComponentsByComponentsAndPolygon, getStreamsByComponentsList, setStreamsIds, setStreamIntersected, updateSelectedLayers, getJurisdictionPolygon, getServiceAreaPolygonofStreams, setZoomGeom, setComponentIntersected, setComponentGeom, getAllComponentsByProblemId } = useProjectDispatch();
  const { streamIntersected, isDraw, isDrawCapital, streamsIntersectedIds, isAddLocation, listComponents, selectedLayers, highlightedComponent, editLocation, componentGeom, zoomGeom, highlightedProblem, listStreams, boardProjectsCreate, highlightedStream, highlightedStreams } = useProjectState();
  const { groupOrganization } = useProfileState();
  const [idsBoardProjects, setIdsBoardProjects] = useState(boardProjectsCreate);
  const [layerFilters, setLayerFilters] = useState(layers);
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const [visible, setVisible] = useState(false);
  const [localAOI, setLocalAOI] = useState(type.locality);
  const [coordinatesJurisdiction, setCoordinatesJurisdiction] = useState([]);
  const [loading, setLoading] = useState(false);
  const hovereableLayers = [PROBLEMS_TRIGGER, PROJECTS_LINE, PROJECTS_POLYGONS, MEP_PROJECTS_TEMP_LOCATIONS,
    MEP_PROJECTS_DETENTION_BASINS, MEP_PROJECTS_CHANNELS, MEP_PROJECTS_STORM_OUTFALLS, ROUTINE_NATURAL_AREAS,
    ROUTINE_WEED_CONTROL, ROUTINE_DEBRIS_AREA, ROUTINE_DEBRIS_LINEAR,
    LANDSCAPING_AREA, LAND_ACQUISITION, DETENTION_FACILITIES, STORM_DRAIN, CHANNEL_IMPROVEMENTS_AREA,
    CHANNEL_IMPROVEMENTS_LINEAR, SPECIAL_ITEM_AREA, SPECIAL_ITEM_LINEAR, SPECIAL_ITEM_POINT,
    PIPE_APPURTENANCES, GRADE_CONTROL_STRUCTURE, COMPONENT_LAYERS.tiles, MHFD_STREAMS_FILTERS, STREAMS_FILTERS];
  const notComponentOptions: any[] = [MENU_OPTIONS.NCRS_SOILS, MENU_OPTIONS.DWR_DAM_SAFETY, MENU_OPTIONS.STREAM_MANAGEMENT_CORRIDORS,
  MENU_OPTIONS.BCZ_PREBLES_MEADOW_JUMPING_MOUSE, MENU_OPTIONS.BCZ_UTE_LADIES_TRESSES_ORCHID, MENU_OPTIONS.RESEARCH_MONITORING, MENU_OPTIONS.CLIMB_TO_SAFETY, MENU_OPTIONS.SEMSWA_SERVICE_AREA,
  MENU_OPTIONS.DEBRIS_MANAGEMENT_LINEAR, MENU_OPTIONS.DEBRIS_MANAGEMENT_AREA, MENU_OPTIONS.VEGETATION_MANAGEMENT_WEED_CONTROL,
  MENU_OPTIONS.VEGETATION_MANAGEMENT_NATURAL_AREA, MENU_OPTIONS.WATERSHED, MENU_OPTIONS.SERVICE_AREA, MENU_OPTIONS.MEP_STORM_OUTFALL,
  MENU_OPTIONS.MEP_CHANNEL, MENU_OPTIONS.MEP_DETENTION_BASIN, MENU_OPTIONS.MEP_TEMPORARY_LOCATION, MENU_OPTIONS.MEP_TEMPORARY_LOCATION, MENU_OPTIONS.CLIMB_TO_SAFETY_SIGNS
  ];
  const [mobilePopups, setMobilePopups] = useState<any>([]);
  const [activeMobilePopups, setActiveMobilePopups] = useState<any>([]);
  const empty: any[] = [];
  const [allLayers, setAllLayers] = useState(empty);
  const [counterPopup, setCounterPopup] = useState({ componentes: 0 });
  const [componentsHover, setComponentsHover] = useState([]);
  const [markerGeocoder, setMarkerGeocoder] = useState<any>(undefined);
  const [zoomEndCounter, setZoomEndCounter] = useState(0);
  const [dragEndCounter, setDragEndCounter] = useState(0);
  const [data, setData] = useState({
    problemid: '',
    id: '',
    objectid: '',
    value: '',
    type: '',
    cartoid: ''
  });
  useEffect(() => {
    const waiting = () => {
      html = document.getElementById('map3');
      if (!html) {
        setTimeout(waiting, 50);
      } else {
        if (!map) {
          map = new MapService('map3');
          setLayersSelectedOnInit();
          map.loadImages();
          let _ = 0;
          map.zoomEnd(() => {
            setZoomEndCounter(_++);
          });
          let __ = 1;
          map.dragEnd(() => {
            setDragEndCounter(__++);
          })
        }
      }
    };
    map = undefined;
    setZoomGeom(undefined);
    waiting();
    EventService.setRef('click', eventClick);
    EventService.setRef('move', eventMove);
    EventService.setRef('addmarker', addMarker);
    EventService.setRef('oncreatedraw', onCreateDraw);
    changeAddLocationState(false);
    componentsList = [];
    getData(`${SERVER.URL_BASE}/locality/`, getToken())
      .then(
        (r: any) => {
          if (r.localities.length > 0) {
            setLocalAOI(r.localities[0].name);
          }
        },
        (e) => {
          console.log('e', e);
        }
      )
    return () => {
      setStreamIntersected([]);
      setStreamsIds([]);
      setComponentIntersected([]);
      setComponentGeom(undefined);
      updateSelectedLayers([PROJECTS_MAP_STYLES, PROBLEMS_TRIGGER, MHFD_BOUNDARY_FILTERS]);
      marker.remove();
    }
  }, []);
  useEffect(() => {
    if (map && map.map) {
      const bounds = map.getBoundingBox();
      if (markerGeocoder) {
        let lnglat = markerGeocoder.getLngLat();
        let swInside = true;
        let neInside = true;
        if ((lnglat.lat < bounds._sw.lat || lnglat.lng < bounds._sw.lng)) {
          swInside = false;
        }
        if ((lnglat.lat > bounds._ne.lat || lnglat.lng > bounds._ne.lng)) {
          neInside = false;
        }
        if (!(swInside && neInside)) {
          markerGeocoder.remove();
          setMarkerGeocoder(undefined);
        }
      }
    }


  }, [zoomEndCounter, dragEndCounter]);
  useEffect(() => {
    if (editLocation && editLocation[0]) {
      setTimeout(() => {
        map.isStyleLoaded(() => { AddMarkerEdit({ lat: editLocation[0][1], lng: editLocation[0][0] + 0.00003 }); })
      }, 1300);
    }
  }, [editLocation]);
  useEffect(() => {
    setLoading(false);
  }, [listStreams]);
  useEffect(() => {
    if (zoomGeom && zoomGeom.geom) {
      let cg = zoomGeom.geom ? JSON.parse(zoomGeom.geom) : undefined;
      map.map.once('render', () => {
        if (cg.type === 'MultiLineString') {
          let poly = turf.multiLineString(cg.coordinates);
          let bboxBounds = turf.bbox(poly);
          if (map.map) {
            map.map.fitBounds(bboxBounds, { padding: 80, maxZoom: 16 });
          }
        } else if (cg.type === 'Point') {
          let poly = turf.point(cg.coordinates);
          let bboxBounds = turf.bbox(poly);
          if (map.map) {
            map.map.fitBounds(bboxBounds, { padding: 80, maxZoom: 16 });
          }
        } else if (cg.type === 'MultiPolygon') {
          let poly = turf.multiPolygon(cg.coordinates);
          let bboxBounds = turf.bbox(poly);
          if (map.map) {
            map.map.fitBounds(bboxBounds, { padding: 80, maxZoom: 16 });
          }
        } else {
          console.log("DIFF", cg);
        }
      });

    }
  }, [zoomGeom])
  useEffect(() => {
    if (map) {
      if (highlightedComponent.table) {
        showHighlighted(highlightedComponent.table, highlightedComponent.cartodb_id);
      } else {
        hideHighlighted();
      }
    }
  }, [highlightedComponent]);
  const removeLayers = (key: string) => {

    const styles = { ...tileStyles as any };
    styles[key].forEach((style: LayerStylesType, index: number) => {

      if (map.map.getLayer(key + '_' + index)) {
        map.map.removeLayer(key + '_' + index);

      }
    });
  }
  const removeLayersSource = (key: string) => {
    if (map.getSource(key)) {

      map.map.removeSource(key);
    }
  }

  useEffect(() => {
    let time = firstTime ? 2600 : 1300;
    if (idsBoardProjects.length > 0 && idsBoardProjects[0] != '-8888') {
      setTimeout(() => {
        let filterProjectsDraft = { ...filterProjects };
        filterProjectsDraft.projecttype = '';
        filterProjectsDraft.status = 'Draft';
        wait(() => {
          setTimeout(() => {
            map.isStyleLoaded(() => {
              removeLayers(PROJECTS_DRAFT);
              removeLayersSource(PROJECTS_DRAFT);
              let requestData = { table: PROJECTS_DRAFT_MAP_STYLES.tiles[0] };
              postData(SERVER.MAP_TABLES, requestData, getToken()).then(tiles => {
                addLayersSource(PROJECTS_DRAFT, tiles);
                showLayers(PROJECTS_DRAFT);
                map.isStyleLoaded(() => {
                  setTimeout(() => {
                    applyFiltersIDs(PROJECTS_DRAFT, filterProjectsDraft);
                  }, 700);
                });
                firstTime = false;
              });

            });
          }, time);

        });
      }, 1200);
    } else {
      if (map.map) {
        removeLayers(PROJECTS_DRAFT);
        removeLayersSource(PROJECTS_DRAFT);
      }

    }
  }, [idsBoardProjects]);
  useEffect(() => {
    let mask;
    setTimeout(() => {
      map.isStyleLoaded(() => {
        if (coordinatesJurisdiction.length > 0) {
          mask = turf.multiPolygon(coordinatesJurisdiction);
          let misbounds = -105.44866830999993 + ',' + 39.13673489846491 + ',' + -104.36395751000016 + ',' + 40.39677734100488;
          var arrayBounds = misbounds.split(',');
          let poly = polyMask(mask, arrayBounds);
          map.isStyleLoaded(() => {
            map.addSourceOpacity(poly);
          })
        }
      });
    }, 1200);

  }, [coordinatesJurisdiction]);
  useEffect(() => {
    const equals = (a: any, b: any) =>
      a.length === b.length &&
      a.every((v: any, i: any) => v === b[i]);
    if (boardProjectsCreate.cartoids && boardProjectsCreate.cartoids[0] != '-8888') {
      if (!equals(boardProjectsCreate.cartoids, idsBoardProjects)) {
        setIdsBoardProjects(boardProjectsCreate.ids);
      }
    }
  }, [boardProjectsCreate]);
  useEffect(() => {
    if (map) {
      if (highlightedProblem.problemid) {
        showHighlightedProblem(highlightedProblem.problemid);
        updateSelectedLayers([...selectedLayers, PROBLEMS_TRIGGER]);;
      } else {
        hideHighlighted();
      }
    }
  }, [highlightedProblem]);
  useEffect(() => {
    console.log(highlightedStream);
    if (map) {
      if (highlightedStream.streamId) {
        showHighlightedStream(highlightedStream.streamId);
      } else {
        hideHighlighted();
      }
    }
  }, [highlightedStream]);
  useEffect(() => {
    if (highlightedStreams.ids) {
      let codes = highlightedStreams.ids.map((hs: any) => hs.mhfd_code);
      if (map) {
        if (codes.length > 0) {
          showHighlightedStreams(codes);
        } else {
          hideHighlighted();
        }
      }
    } else {
      if (map) { hideHighlighted() };
    }

  }, [highlightedStreams]);
  const polyMask = (mask: any, bounds: any) => {
    if (mask !== undefined && bounds.length > 0) {
      var bboxPoly = turf.bboxPolygon(bounds);
      return turf.difference(bboxPoly, mask);
    }
  }
  const setBounds = (value: any) => {
    const zoomareaSelected = groupOrganization.filter((x: any) => value.includes(x.aoi)).map((element: any) => {
      return {
        aoi: element.aoi,
        filter: element.filter,
        coordinates: element.coordinates
      }
    });
    if (zoomareaSelected[0]) {
      setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
      setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
      let poly = turf.multiPolygon(zoomareaSelected[0].coordinates, { name: 'zoomarea' });
      let bboxBounds = turf.bbox(poly);
      if (map.map) {
        map.map.fitBounds(bboxBounds, { padding: 10, maxZoom: 13 });
      }
    }
  }
  const wait = (cb: any) => {
    if (!map.map) {
      setTimeout(wait, 50);
    } else {
      cb();
    }
  };
  useEffect(() => {
    if (type.projectid != -1 && type.projectid) {
      getData(`${SERVER.URL_BASE}/board/bbox/${type.projectid}`)
        .then(
          (r: any) => {
            if (r.bbox) {
              let BBoxPolygon = JSON.parse(r.bbox);
              let bboxBounds = turf.bbox(BBoxPolygon);
              if (map.map) {
                setTimeout(() => {
                  map.isStyleLoaded(() => map.map.fitBounds(bboxBounds, { padding: 90, maxZoom: 16 }));
                }, 3000);
              }
            }
          },
          (e: any) => {
            console.error('Error getting bbox projectid', e);
          }
        )
    }
  }, [type.projectid]);
  useEffect(() => {
    setTimeout(() => {
      let value = localAOI;
      if (type.locality) {
        value = type.locality;
      }
      if (groupOrganization.length > 0) {
        wait(() => setBounds(value));
      }
    }, 500);
  }, [groupOrganization, type.locality, localAOI]);
  useEffect(() => {
    if (listComponents && listComponents.result && listComponents.result.length > 0) {
      let componentsHovers: any = {};
      for (let i of listComponents.result) {
        componentsHovers[i.table] = componentsHovers[i.table] ? [...componentsHovers[i.table], i.cartodb_id] : [i.cartodb_id];
      }
      setComponentsHover(componentsHovers);
      setTimeout(() => {
        setLoading(false);
      }, 1500);

      componentsList = listComponents.result;
    } else {
      setStreamIntersected({ geom: null });
      setStreamsIds([]);
    }
  }, [listComponents]);

  useEffect(() => {
    if (data.problemid || data.cartoid) {
      setVisible(true);
    }
  }, [data]);
  useEffect(() => {
    if (isAddLocation) {
      isPopup = false;
      let eventToMove = EventService.getRef('move');
      map.map.on('mousemove', eventToMove);

      let eventToAddMarker = EventService.getRef('addmarker');
      map.map.on('click', eventToAddMarker);
    } else {
      let eventToMove = EventService.getRef('move');
      map.map.off('mousemove', eventToMove);
      let eventToAddMarker = EventService.getRef('addmarker');
      map.map.off('click', eventToAddMarker);
      isPopup = true;
      map.removePopUpOffset();
      marker.remove();
      marker = new mapboxgl.Marker({ color: "#ffbf00", scale: 0.7 });
    }
  }, [isAddLocation]);
  const showHoverComponents = () => {
    if (listComponents && listComponents.result && listComponents.result.length > 0) {
      Object.keys(componentsHover).forEach((key: any) => {
        showHighlightedArray(key, componentsHover[key]);
      });
    }
  };
  const [isAlreadyDraw, setIsAlreadyDraw] = useState(false);
  useEffect(() => {
    if (isDraw || isDrawCapital) {
      currentDraw = isDraw ? 'polygon' : (isDrawCapital ? 'capitalpolygon' : 'polygon');
      if (isDrawCapital) {
        showHoverComponents();
      } else {
        hideHighlighted();
      }
      if (isAlreadyDraw) {
        map.removeDrawController();
      }
      setIsAlreadyDraw(true);
      if (type.type != 'ACQUISITION' && type.type != 'SPECIAL') {
        isPopup = false;
        map.addDrawControllerTopLeft();
        let drawEvent = EventService.getRef('oncreatedraw');
        map.deleteDraw(drawEvent);
        setTimeout(() => {
          map.createDraw(drawEvent);
          setTimeout(() => {
            let elements = document.getElementsByClassName('mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon');
            let element: HTMLElement = elements[0] as HTMLElement;
            if (element) {
              element.click();
            }
          }, 500);
        }, 200);
      }
    } else {
      isPopup = true;
      map.removeDrawController();
      setIsAlreadyDraw(false);
      currentDraw = 'none';
    }
  }, [isDraw, isDrawCapital]);

  const getTurfGeom = (geom: any) => {
    if (geom.type.includes('MultiPolygon')) {
      return turf.multiPolygon(geom.coordinates);
    } else if (geom.type.includes('Polygon')) {
      return turf.polygon(geom.coordinates);
    } else if (geom.type.includes('MultiLineString')) {
      return turf.multiLineString(geom.coordinates);
    } else if (geom.type.includes('LineString')) {
      return turf.lineString(geom.coordinates);
    } else if (geom.type.includes('MultiPoint')) {
      return turf.multiPoint(geom.coordinates);
    } else if (geom.type.includes('Point')) {
      return turf.point(geom.coordinates);
    } else {
      console.log("CG diff", geom.type);
    }
  }
  useEffect(() => {
    let geom: any = undefined;
    let thisStreamIntersected = streamIntersected;
    let drawStream = true;
    if (thisStreamIntersected && thisStreamIntersected.geom) {
      geom = JSON.parse(thisStreamIntersected.geom);
      let cg = componentGeom ? JSON.parse(componentGeom.geom) : undefined;
      if (geom.coordinates.length == 0 && cg) {
        geom = cg;
        thisStreamIntersected.geom = componentGeom.geom;
        drawStream = false;
      } else if (geom.coordinates.length == 0) {
        return;
      }
      if (type.type == 'CAPITAL' || type.type == 'MAINTENANCE') {
        getServiceAreaPolygonofStreams(thisStreamIntersected.geom);
        setLoading(false);
      }

      if (type.problemId && geom.coordinates.length > 0) {
        let poly = getTurfGeom(geom);
        if (map.map && poly) {

          let bboxBounds = turf.bbox(poly);
          map.isStyleLoaded(() => {
            map.map.fitBounds(bboxBounds, { padding: 80 });
          });

        }
      } else if (type.problemId && cg) {
        let poly = getTurfGeom(cg);
        if (map.map && poly) {
          let bboxBounds = turf.bbox(poly);
          map.isStyleLoaded(() => {
            map.map.fitBounds(bboxBounds, { padding: 80 });
          });
        }
      }
      if (geom && drawStream) {
        map.isStyleLoaded(() => {
          map.removeLayer('streamIntersected');
          map.removeSource('streamIntersected');
          if (!map.map.getSource('streamIntersected')) {
            map.map.addSource('streamIntersected', {
              'type': 'geojson',
              'data': { type: 'Feature', geometry: geom, properties: [] }
            });
          }
          if (!map.getLayer('streamIntersected')) {
            map.map.addLayer({
              'id': 'streamIntersected',
              'type': 'line',
              'source': 'streamIntersected',
              'layout': {},
              'paint': {
                'line-color': 'hsl(40, 100%, 50%)',
                'line-width': 6,
              }
            });
            setTimeout(() => {
              map.map.moveLayer('streamIntersected');
            }, 4500);
            let poly = getTurfGeom(geom);
            if (map.map && poly) {
              let bboxBounds = turf.bbox(poly);
              map.isStyleLoaded(() => {
                map.map.fitBounds(bboxBounds, { padding: 80 });
              });

            }
          }
        });
      }
    } else if (thisStreamIntersected && componentGeom && thisStreamIntersected.geom == null && componentGeom.geom) {
      let cg = componentGeom ? JSON.parse(componentGeom.geom) : undefined;
      let poly = getTurfGeom(cg);
      if (map.map && poly) {

        let bboxBounds = turf.bbox(poly);
        map.isStyleLoaded(() => {
          map.map.fitBounds(bboxBounds, { padding: 80 });
        });
      }
    } else {
      if (map && map.map.isStyleLoaded()) {
        map.removeLayer('streamIntersected');
        map.removeSource('streamIntersected');
      }
    }
  }, [streamIntersected]);
  useEffect(() => {
    if (streamsIntersectedIds.length > 0) {
      let streamsCodes: any = streamsIntersectedIds.map((str: any) => str.mhfd_code);
      map.isStyleLoaded(() => {
        let filter = ['in', ['get', 'unique_mhfd_code'], ['literal', [...streamsCodes]]];

        map.removeLayer('streams-intersects');
        if (!map.getLayer('streams-intersects')) {
          let timer = map.getSource('mhfd_stream_reaches') ? 50 : 2300;
          if (!map.getSource('mhfd_stream_reaches')) {
            addLayersSource('mhfd_stream_reaches', layerFilters['mhfd_stream_reaches']);
          }
          setTimeout(() => {
            map.map.addLayer({
              'id': 'streams-intersects',
              'type': 'line',
              'source': 'mhfd_stream_reaches',
              'source-layer': 'pluto15v1',
              "layout": { "line-cap": "round", "line-join": "round" },
              "paint": {
                "line-color": "hsl(40, 100%, 50%)",
                "line-width": 7,
              },
              'filter': filter

            });
          }, timer);
        }
      });
    } else {
      map.removeLayer('streams-intersects');
    }
  }, [streamsIntersectedIds]);
  useEffect(() => {
    if (map) {
      map.create();
      setLayerFilters(layers);
      map.map.on('style.load', () => {
        let eventToClick = EventService.getRef('click');
        map.map.on('click', eventToClick);
        applyNearMapLayer();
      });
    }
  }, [map])
  const [compareSL, setCompareSL] = useState('');
  useEffect(() => {
    if (map) {
      let time = firstTimeApplyMapLayers ? 400 : 200;
      setTimeout(() => {
        if (JSON.stringify(selectedLayers) != compareSL) {
          if (map) {
            if (selectedLayers.length == 0) {
            } else {
              map.isStyleLoaded(applyMapLayers);
              firstTimeApplyMapLayers = false;
              setCompareSL(JSON.stringify(selectedLayers));
            }
          }
        }
      }, time);
    }
    EventService.setRef('oncreatedraw', onCreateDraw);
    EventService.setRef('addmarker', addMarker);
  }, [selectedLayers]);

  const setLayersSelectedOnInit = () => {
    let ppArray: any = [];
    if (!type.isEdit) {
      if (type.type != "STUDY") {
        ppArray = [PROJECTS_MAP_STYLES];
      } else {
        ppArray = [PROBLEMS_TRIGGER];
      }
    }
    let thisSL = [...ppArray, MHFD_BOUNDARY_FILTERS, STREAMS_FILTERS];
    if (type.type == 'CAPITAL' || type.type == 'ACQUISITION') {
      thisSL = [...ppArray, MHFD_BOUNDARY_FILTERS, COMPONENT_LAYERS, STREAMS_FILTERS];
    } else if (type.type == 'STUDY') {
      thisSL = [MHFD_BOUNDARY_FILTERS, STREAMS_FILTERS];
    } else if (type.type == 'MAINTENANCE') {
      thisSL = [...ppArray, MHFD_BOUNDARY_FILTERS, ROUTINE_MAINTENANCE, STREAMS_FILTERS]
    }
    updateSelectedLayers(thisSL);
  }
  const removeProjectLayer = () => {
    let filterLayers = selectedLayers.filter((Layer: any) => {
      if (Layer.name) {
        return !(Layer.name == 'projects')
      } else {
        return true;
      }
    });
    const deleteLayers = selectedLayers.filter((layer: any) => !filterLayers.includes(layer as string));
    deleteLayers.forEach((layer: LayersType) => {
      removeTilesHandler(layer);
    });
    updateSelectedLayers(filterLayers);
  }
  const onCreateDraw = (event: any) => {
    if (firstCallDraw) {
      return;
    }
    firstCallDraw = true;
    removeProjectLayer();
    setLoading(true);
    const userPolygon = event.features[0];
    if (type.type === 'CAPITAL') {
      if (currentDraw == 'polygon') {
        getListComponentsByComponentsAndPolygon(componentsList, userPolygon.geometry);
      } else {
        hideHighlighted();
        getStreamIntersectionPolygon(userPolygon.geometry);
      }

    } else if (type.type === 'MAINTENANCE') {
      getStreamIntersectionPolygon(userPolygon.geometry);
    } else if (type.type === 'STUDY') {
      type.setGeom(userPolygon.geometry);
      getStreamsIntersectedPolygon(userPolygon.geometry);
      getStreamsList(userPolygon.geometry);
      getServiceAreaStreams(userPolygon.geometry);
    }

    getJurisdictionPolygon(userPolygon.geometry);
    setUserPolygon(userPolygon.geometry);
    setTimeout(() => {
      changeDrawState(false);
      changeDrawStateCapital(false);
    }, 2000);
    setTimeout(() => {
      let elements = document.getElementsByClassName('mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash');
      let element: HTMLElement = elements[0] as HTMLElement;
      if (element) {
        element.click();
      }
      firstCallDraw = false;
    }, 2500);
  }
  const applyNearMapLayer = () => {
    if (!map.getSource('raster-tiles')) {
      map.map.addSource('raster-tiles', {
        'type': 'raster',
        'tileSize': 128,
        'tiles': [
          `https://api.nearmap.com/tiles/v3/Vert/{z}/{x}/{y}.png?apikey=${NEARMAP_TOKEN}`
        ]
      });
      map.map.addLayer(
        {
          'id': 'simple-tiles',
          'type': 'raster',
          'source': 'raster-tiles',
          'minzoom': 2,
          'maxzoom': 24,
          'paint': {
            'raster-fade-duration': 300,
            'raster-opacity': [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              0,
              13,
              0,
              14,
              0.66,
              15,
              0.77,
              22,
              1
            ]
          }
        },
        'aerialway'
      );
    }
  }
  const applyMapLayers = async () => {
    await SELECT_ALL_FILTERS.forEach((layer) => {
      if (typeof layer === 'object') {
        if (layer.tiles) {
          layer.tiles.forEach((subKey: string) => {
            const tiles = layerFilters[layer.name] as any;
            if (tiles) {
              addLayersSource(subKey, tiles[subKey]);
            }
          });
        }
      } else {
        addLayersSource(layer, layerFilters[layer]);
      }
    });
    const deleteLayers = SELECT_ALL_FILTERS.filter((layer: any) => !selectedLayers.includes(layer as string));
    await deleteLayers.forEach((layer: LayersType) => {
      removeTilesHandler(layer);
    });
    await selectedLayers.forEach((layer: LayersType) => {
      if (layer === 'area_based_mask' || layer === 'border') {
        map.addLayerMask(layer);
        return;
      }
      if (typeof layer === 'object') {
        layer.tiles.forEach((subKey: string) => {
          showLayers(subKey);
        });
      } else {
        showLayers(layer);
      }
    });
    applyFilters('problems', filterProblems);
    let filterProjectsNew = filterProjects;
    if (type.type === 'SPECIAL') {
      filterProjectsNew.projecttype = "Special";
    } else if (type.type === 'STUDY') {
      filterProjectsNew.projecttype = "Study";
    } else {
      filterProjectsNew.projecttype = "Maintenance,Capital";
    }
    applyFilters('mhfd_projects', filterProjectsNew);
    setTimeout(() => {
      map.map.moveLayer('munis-centroids-shea-plusother');
    }, 500);

  }
  const showLayers = (key: string) => {
    const styles = { ...tileStyles as any };
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (map.map.getLayer(key + '_' + index)) {
        if (key === PROJECTS_DRAFT) {
          let allFilters: any = ['in', ['get', 'projectid'], ['literal', []]];
          if (idsBoardProjects && idsBoardProjects.length > 0) {
            let boardids = idsBoardProjects;
            allFilters = ['all', ['in', ['get', 'projectid'], ['literal', [...boardids]]]];
          }
          map.map.setFilter(key + '_' + index, allFilters);
          map.map.setLayoutProperty(key + '_' + index, 'visibility', 'visible');
        } else {
          map.map.setLayoutProperty(key + '_' + index, 'visibility', 'visible');
        }
      }
    });
    if (key === STREAMS_FILTERS && styles[STREAMS_POINT]) {
      styles[STREAMS_POINT].forEach((style: LayerStylesType, index: number) => {
        if (map && map.map.getLayer(STREAMS_POINT + '_' + index)) {
          map.map.setLayoutProperty(STREAMS_POINT + '_' + index, 'visibility', 'visible');
        }
      });
    }
  };
  const applyFiltersIDs = (key: string, toFilter: any) => {
    const styles = { ...tileStyles as any };
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (!map.getLayer(key + '_' + index)) {
        return;
      }
      const allFilters: any[] = ['all'];
      for (const filterField in toFilter) {
        const filters = toFilter[filterField];
        if (filterField === 'keyword') {
          if (filters[key]) {
            allFilters.push(['in', ['get', 'cartodb_id'], ['literal', [...filters[key]]]]);
          }
        }
        if (filters && filters.length) {
          const options: any[] = ['any'];
          if (filterField === 'keyword') {
            continue;
          }
          if (filterField === 'component_type') {
            continue;
          }
          if (filterField === 'year_of_study') {
            for (const years of filters.split(',')) {
              const lowerArray: any[] = ['>=', ['get', filterField], +years];
              const upperArray: any[] = ['<=', ['get', filterField], +years + 9];
              options.push(['all', lowerArray, upperArray]);
            }
            allFilters.push(options);
            continue;
          }
          if (filterField === 'components') {
            allFilters.push(['in', ['get', 'problemid'], ['literal', [...filters]]]);
            continue;
          }
          if (filterField === 'problemtypeProjects') {
            allFilters.push(['in', ['get', 'projectid'], ['literal', [...filters]]]);
            continue;
          }
          if (filterField === 'problemname' || filterField === 'projectname') {
            continue;
          }
          if (filterField === 'estimatedcost') {
            for (const range of filters) {
              const [lower, upper] = range.split(',');
              const lowerArray: any[] = ['>=', ['to-number', ['get', filterField]], +lower];
              const upperArray: any[] = ['<=', ['to-number', ['get', filterField]], +upper];
              const allFilter = ['all', lowerArray, upperArray];
              options.push(allFilter);
            }
            for (const range of toFilter['finalcost']) {
              const [lower, upper] = range.split(',');
              const lowerArray: any[] = ['>=', ['to-number', ['get', 'finalcost']], +lower];
              const upperArray: any[] = ['<=', ['to-number', ['get', 'finalcost']], +upper];
              const allFilter = ['all', lowerArray, upperArray];
              options.push(allFilter);
            }
            allFilters.push(options);
            continue;
          }
          if (filterField === 'finalcost') {
            continue;
          }
          if (filterField === 'startyear') {
            const lowerArray: any[] = ['>=', ['get', filterField], +filters];
            const upperArray: any[] = ['<=', ['get', 'completedyear'], +toFilter['completedyear']];
            if (+toFilter['completedyear'] !== 9999) {
              allFilters.push(['all', lowerArray, upperArray]);
            } else {
              if (+filters) {
                allFilters.push(lowerArray);
              }
            }
            continue;
          }
          if (filterField === 'servicearea') {
            allFilters.push(['==', ['get', filterField], filters]);
            continue;
          }
          if (filterField === 'completedyear') {
            continue;
          }
          if (typeof filters === 'object') {
            for (const range of filters) {
              const [lower, upper] = range.split(',');
              const lowerArray: any[] = ['>=', ['to-number', ['get', filterField]], +lower];
              const upperArray: any[] = ['<=', ['to-number', ['get', filterField]], +upper];
              const allFilter = ['all', lowerArray, upperArray];
              options.push(allFilter);
            }
          } else {
            for (const filter of filters.split(',')) {
              if (isNaN(+filter)) {
                options.push(['==', ['get', filterField], filter]);
              } else {
                const equalFilter: any[] = ['==', ['to-number', ['get', filterField]], +filter];
                options.push(equalFilter);
              }
            }
          }
          allFilters.push(options);
        }
      }
      if (idsBoardProjects && idsBoardProjects.length > 0 && key === PROJECTS_DRAFT && idsBoardProjects[0] != '-8888') {
        let boardids = [...idsBoardProjects];
        boardids = boardids.filter((x: any) => x != type.projectid);
        allFilters.push(['in', ['get', 'projectid'], ['literal', [...boardids]]]);
      }
      if (map.getLayer(key + '_' + index)) {

        map.setFilter(key + '_' + index, allFilters);
      }
    });
  };
  const applyFilters = (key: string, toFilter: any) => {
    const styles = { ...tileStyles as any };
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (!map.getLayer(key + '_' + index)) {
        return;
      }
      const allFilters: any[] = ['all'];
      for (const filterField in toFilter) {
        const filters = toFilter[filterField];
        if (filterField === 'keyword') {
          if (filters[key]) {
            allFilters.push(['in', ['get', 'cartodb_id'], ['literal', [...filters[key]]]]);
          }
        }
        if (filters && filters.length) {
          const options: any[] = ['any'];
          if (filterField === 'keyword') {
            continue;
          }
          if (filterField === 'component_type') {
            continue;
          }
          if (filterField === 'year_of_study') {
            for (const years of filters.split(',')) {
              const lowerArray: any[] = ['>=', ['get', filterField], +years];
              const upperArray: any[] = ['<=', ['get', filterField], +years + 9];
              options.push(['all', lowerArray, upperArray]);
            }
            allFilters.push(options);
            continue;
          }
          if (filterField === 'components') {
            allFilters.push(['in', ['get', 'problemid'], ['literal', [...filters]]]);
            continue;
          }
          if (filterField === 'problemtypeProjects') {
            allFilters.push(['in', ['get', 'projectid'], ['literal', [...filters]]]);
            continue;
          }
          if (filterField === 'problemname' || filterField === 'projectname') {
            continue;
          }
          if (filterField === 'estimatedcost') {
            for (const range of filters) {
              const [lower, upper] = range.split(',');
              const lowerArray: any[] = ['>=', ['to-number', ['get', filterField]], +lower];
              const upperArray: any[] = ['<=', ['to-number', ['get', filterField]], +upper];
              const allFilter = ['all', lowerArray, upperArray];
              options.push(allFilter);
            }
            for (const range of toFilter['finalcost']) {
              const [lower, upper] = range.split(',');
              const lowerArray: any[] = ['>=', ['to-number', ['get', 'finalcost']], +lower];
              const upperArray: any[] = ['<=', ['to-number', ['get', 'finalcost']], +upper];
              const allFilter = ['all', lowerArray, upperArray];
              options.push(allFilter);
            }
            allFilters.push(options);
            continue;
          }
          if (filterField === 'finalcost') {
            continue;
          }
          if (filterField === 'startyear') {
            const lowerArray: any[] = ['>=', ['get', filterField], +filters];
            const upperArray: any[] = ['<=', ['get', 'completedyear'], +toFilter['completedyear']];
            if (+toFilter['completedyear'] !== 9999) {
              allFilters.push(['all', lowerArray, upperArray]);
            } else {
              if (+filters) {
                allFilters.push(lowerArray);
              }
            }
            continue;
          }
          if (filterField === 'servicearea') {
            allFilters.push(['==', ['get', filterField], filters]);
            continue;
          }
          if (filterField === 'completedyear') {
            continue;
          }
          if (typeof filters === 'object') {
            for (const range of filters) {
              const [lower, upper] = range.split(',');
              const lowerArray: any[] = ['>=', ['to-number', ['get', filterField]], +lower];
              const upperArray: any[] = ['<=', ['to-number', ['get', filterField]], +upper];
              const allFilter = ['all', lowerArray, upperArray];
              options.push(allFilter);
            }
          } else {
            for (const filter of filters.split(',')) {
              if (isNaN(+filter)) {
                options.push(['==', ['get', filterField], filter]);
              } else {
                const equalFilter: any[] = ['==', ['to-number', ['get', filterField]], +filter];
                options.push(equalFilter);
              }
            }
          }
          allFilters.push(options);
        }
      }
      if (componentDetailIds && componentDetailIds[key]) {
        allFilters.push(['in', ['get', 'cartodb_id'], ['literal', [...componentDetailIds[key]]]]);
      }

      if (map.getLayer(key + '_' + index)) {
        map.setFilter(key + '_' + index, allFilters);
      }
    });
  };
  const selectCheckboxes = (selectedItems: Array<LayersType>) => {
    const deleteLayers = selectedLayers.filter((layer: any) => !selectedItems.includes(layer as string));
    deleteLayers.forEach((layer: LayersType) => {
      if (layer === 'border' || layer === 'area_based_mask') {
        map.removeLayerMask(layer);
      } else {
        removeTilesHandler(layer);
      }
    });
    updateSelectedLayers(selectedItems);
  }
  const hideLayers = (key: string) => {

    if (map) {
      const styles = { ...tileStyles as any };
      styles[key].forEach((style: LayerStylesType, index: number) => {
        if (map.map.getLayer(key + '_' + index)) {
          map.map.setLayoutProperty(key + '_' + index, 'visibility', 'none');
        }
      });
      if (key === STREAMS_FILTERS && styles[STREAMS_POINT]) {
        styles[STREAMS_POINT].forEach((style: LayerStylesType, index: number) => {
          if (map.map.getLayer(STREAMS_POINT + '_' + index)) {
            map.map.setLayoutProperty(STREAMS_POINT + '_' + index, 'visibility', 'none');
          }
        })
      }
    }
  };
  const removeTilesHandler = (selectedLayer: LayersType) => {
    if (typeof selectedLayer === 'object') {
      selectedLayer.tiles.forEach((subKey: string) => {
        hideLayers(subKey);
      });
    } else {
      hideLayers(selectedLayer);
    }
  }
  const addLayersSource = (key: string, tiles: Array<string>) => {
    if (!map.getSource(key) && tiles && !tiles.hasOwnProperty('error')) {
      map.map.addSource(key, {
        type: 'vector',
        tiles: tiles
      });
      addTilesLayers(key);
    }
  }

  const addTilesLayers = (key: string) => {
    const styles = { ...tileStyles as any };
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (key.includes(PROJECTS_DRAFT)) {
        map.map.addLayer({
          id: key + '_' + index,
          source: key,
          filter: ['in', ['get', 'projectid'], ['literal', []]],
          ...style
        });
      } else {
        if (style.source_name) {
          map.map.addLayer({
            id: key + '_' + index,
            source: style.source_name,
            ...style
          });
        } else {
          map.map.addLayer({
            id: key + '_' + index,
            source: key,
            ...style
          });
        }
      }
      if (!key.includes('streams') && !key.includes(STREAMS_POINT)) {
        map.map.setLayoutProperty(key + '_' + index, 'visibility', 'none');
      }

      if (!hovereableLayers.includes(key)) {
        return;
      }
      if (style.type === 'line' || style.type === 'fill' || style.type === 'heatmap') {
        let filter = ['in', 'cartodb_id'];
        if (key == 'problems') {
          filter = ['in', 'problemid'];
        } else if (key == 'mhfd_stream_reaches') {
          filter = ['in', 'mhfd_code'];
        }
        map.map.addLayer({
          id: key + '_highlight_' + index,
          source: key,
          type: 'line',
          'source-layer': 'pluto15v1',
          layout: {
            visibility: 'visible'
          },
          paint: {
            'line-color': '#fff',
            'line-width': 7,
          },
          filter: filter
        });
      }
      if ((style.type === 'circle' || style.type === 'symbol') && key != 'streams') {
        map.map.addLayer({
          id: key + '_highlight_' + index,
          type: 'circle',
          'source-layer': 'pluto15v1',
          source: key,
          layout: {
            visibility: 'visible'
          },
          paint: {
            'circle-color': '#FFF',
            'circle-radius': 7,
            'circle-opacity': 1
          },
          filter: ['in', 'cartodb_id']
        });
      }
    });
    addMapListeners(key);
  }
  const addMapListeners = async (key: string) => {
    const styles = { ...tileStyles as any };
    const availableLayers: any[] = [];
    if (styles[key]) {
      styles[key].forEach((style: LayerStylesType, index: number) => {
        if (!map.map.getLayer(key + '_' + index)) {
          return;
        }
        availableLayers.push(key + '_' + index);
        if (style.type != 'symbol') {
          map.map.on('mousemove', key + '_' + index, (e: any) => {
            if (hovereableLayers.includes(key) && currentDraw != 'capitalpolygon') {
              showHighlighted(key, e.features[0].properties.cartodb_id);
            }
            if (key.includes('projects') || key === 'problems') {
              map.map.getCanvas().style.cursor = 'pointer';
              setSelectedOnMap(e.features[0].properties.cartodb_id, key);
            } else {
              setSelectedOnMap(-1, '');
            }
          });
          map.map.on('mouseleave', key + '_' + index, (e: any) => {
            if (hovereableLayers.includes(key) && currentDraw != 'capitalpolygon') {
              hideOneHighlighted(key);
            }
            map.map.getCanvas().style.cursor = '';
            setSelectedOnMap(-1, '');
          });
        }
      });
      setAllLayers(allLayers => [...allLayers, ...availableLayers]);

      map.map.on('mouseenter', key, () => {
        map.map.getCanvas().style.cursor = 'pointer';
      });
      map.map.on('mouseleave', key, () => {
        map.map.getCanvas().style.cursor = '';
      })
    }
  }
  const test = (item: any) => {
    setVisible(true);
    setData(item);
    if (item.problemid) {
      existDetailedPageProblem(item.problemid);
    } else {
      const url = 'projectid' + (item.projectid || item.id) + '&type=' + item.type;
      existDetailedPageProject(url);
    }
  }
  const showHighlightedStream = (mhfd_code: any) => {
    const styles = { ...tileStyles as any }
    styles['mhfd_stream_reaches'].forEach((style: LayerStylesType, index: number) => {
      if (map.getLayer('mhfd_stream_reaches' + '_' + index)) {
        let filter = ['in', ['get', 'unique_mhfd_code'], ['literal', [mhfd_code]]];
        map.map.moveLayer('mhfd_stream_reaches' + '_highlight_' + index);
        map.setFilter('mhfd_stream_reaches' + '_highlight_' + index, filter);
      }
    });
  }
  const showHighlightedStreams = (mhfd_codes: any) => {
    const styles = { ...tileStyles as any }
    styles['mhfd_stream_reaches'].forEach((style: LayerStylesType, index: number) => {
      if (map.getLayer('mhfd_stream_reaches' + '_' + index)) {
        let filter = ['in', ['get', 'unique_mhfd_code'], ['literal', [...mhfd_codes]]];
        map.map.moveLayer('mhfd_stream_reaches' + '_highlight_' + index);
        map.setFilter('mhfd_stream_reaches' + '_highlight_' + index, filter);
      }
    });
  }
  const showHighlightedProblem = (problemid: string) => {
    const styles = { ...tileStyles as any }
    styles['problems'].forEach((style: LayerStylesType, index: number) => {

      if (map.getLayer('problems' + '_' + index)) {
        map.setFilter('problems' + '_highlight_' + index, ['in', 'problemid', parseInt(problemid)])

      }
    });
  }
  const showHighlighted = (key: string, cartodb_id: string) => {
    const styles = { ...tileStyles as any }
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
        map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id', cartodb_id])
      }
    });
  };
  const showHighlightedArray = (key: string, cartodb_ids: any) => {
    const styles = { ...tileStyles as any }
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
        let filter = ['in', ['get', 'cartodb_id'], ['literal', [...cartodb_ids]]];
        map.setFilter(key + '_highlight_' + index, filter);
      }
    });
  };
  const hideOneHighlighted = (key: string) => {
    const styles = { ...tileStyles as any }
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
        map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id'])
      }
    });
  };
  const hideHighlighted = () => {
    const styles = { ...tileStyles as any };
    for (const key in styles) {
      styles[key].forEach((style: LayerStylesType, index: number) => {
        if (map.getLayer(key + '_highlight_' + index)) {
          map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id'])
        }
      });
    }
  };
  const showPopup = (index: any, size: number, id: any, event: any) => {
    hideHighlighted();
    showHighlighted(id.layer, id.id);
    for (let i = 0; i < size; i++) {
      const div = document.getElementById('popup-' + i);
      if (div != null) {
        div.classList.remove('map-pop-03');
      }
    }
    const div = document.getElementById('popup-' + index);
    if (div != null) {
      div.classList.add('map-pop-03');
    }
    return;
  }
  const seeDetails = (details: any, event: any) => {
    if (details.problemid) {
      setData({
        id: '',
        objectid: '',
        cartoid: '',
        type: '',
        value: '',
        problemid: details.problemid
      });
    } else {
      setData({
        id: details.id !== '-' ? details.id : undefined,
        objectid: details.objectid,
        cartoid: details.valueid,
        type: details.type,
        value: details.valueid,
        problemid: ''
      });
    }
  }
  const addPopupMarker = (point: any, html: any) => {
    popup.remove();
    map.addPopUpOffset(point, html);
    let menuElement = document.getElementById('menu-marker');
    if (menuElement != null) {
      menuElement.addEventListener('click', () => {
        map.removePopUpOffset();
        marker.remove();
        marker = new mapboxgl.Marker({ color: "#ffbf00", scale: 0.7 });
        changeAddLocationState(false);
      });
    }
    let closeElement = document.getElementById('closepopupmarker');
    if (closeElement != null) {
      closeElement.addEventListener('click', () => {
        map.removePopUpOffset();
      });
    }
  }
  const AddMarkerEdit = (e: any) => {
    const html = loadPopupMarker();
    if (html) {
      popup.remove();
      marker.setLngLat([e.lng, e.lat]).addTo(map.map);
      let point = { lng: e.lng, lat: e.lat };
      marker.getElement().addEventListener('click', () => {
        addPopupMarker(point, html);
      });
      let sendLine = { geom: { type: 'MultiLineString', coordinates: [[[e.lng - 0.00003, e.lat], [e.lng + 0.00003, e.lat]]] } };
      if (type.type === 'SPECIAL') {
        saveSpecialLocation(sendLine);
      } else if (type.type === 'ACQUISITION') {
        saveAcquisitionLocation(sendLine);
      }
      isPopup = true;
    }
  }
  const addMarker = (e: any) => {
    removeProjectLayer();
    const html = loadPopupMarker();
    e.originalEvent.stopPropagation();
    if (html) {
      map.removePopUpOffset();
      popup.remove();
      marker.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map.map);
      let point = e.lngLat;
      marker.getElement().addEventListener('click', () => {
        addPopupMarker(point, html);
      });
      let sendLine = { geom: { type: 'MultiLineString', coordinates: [[[e.lngLat.lng - 0.00003, e.lngLat.lat], [e.lngLat.lng + 0.00003, e.lngLat.lat]]] } };
      if (type.type === 'SPECIAL') {
        saveSpecialLocation(sendLine);
      } else if (type.type === 'ACQUISITION') {
        saveAcquisitionLocation(sendLine);
      }
      getServiceAreaPoint(sendLine);
      let eventToMove = EventService.getRef('move');
      map.map.off('mousemove', eventToMove);
      let eventToAddMarker = EventService.getRef('addmarker');
      map.map.off('click', eventToAddMarker);
      isPopup = true;
    }
  }
  const eventMove = (e: any) => {
    marker.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map.map);
  }
  const getDateMep = (mep_eligibilitystatus: any, props: any) => {
    if (!mep_eligibilitystatus) return undefined;
    let finalDate = new Date(0);
    if (mep_eligibilitystatus == 'Design Approval') {
      finalDate = new Date(props.mep_date_designapproval);
    } else if (mep_eligibilitystatus == 'Construction Approval') {
      finalDate = new Date(props.mep_date_constructionapproval);
    } else if (mep_eligibilitystatus == 'Final Acceptance') {
      finalDate = new Date(props.mep_date_finalacceptance);
    } else if (mep_eligibilitystatus == 'Ineligible') {
      console.log(props.mep_date_ineligible);
      finalDate = new Date(props.mep_date_ineligible);
    }
    let stringDate = ((finalDate.getMonth() > 8) ? (finalDate.getMonth() + 1) : ('0' + (finalDate.getMonth() + 1))) + '/' + ((finalDate.getDate() > 9) ? finalDate.getDate() + 1 : ('0' + (finalDate.getDate() + 1))) + '/' + finalDate.getFullYear();
    if (stringDate.includes('NaN')) {
      return '-'
    } else {
      return stringDate;
    }
  }
  const parseDateZ = (dateParser: any) => {
    let finalDate = new Date(dateParser);
    let stringDate = ((finalDate.getMonth() > 8) ? (finalDate.getMonth() + 1) : ('0' + (finalDate.getMonth() + 1))) + '/' + ((finalDate.getDate() > 9) ? finalDate.getDate() + 1 : ('0' + (finalDate.getDate() + 1))) + '/' + finalDate.getFullYear();
    if (stringDate.includes('NaN')) {
      return '-'
    } else {
      return stringDate;
    }
  }
  const epochTransform = (dateParser: any) => {
    let finalDate = new Date(0);
    finalDate.setUTCMilliseconds(dateParser);
    let stringDate = ((finalDate.getMonth() > 8) ? (finalDate.getMonth() + 1) : ('0' + (finalDate.getMonth() + 1))) + '/' + ((finalDate.getDate() > 9) ? finalDate.getDate() + 1 : ('0' + (finalDate.getDate() + 1))) + '/' + finalDate.getFullYear();
    if (stringDate.includes('NaN')) {
      return '-'
    } else {
      return stringDate;
    }
  }
  useEffect(() => {
    let buttonElement = document.getElementById('popup');
    if (buttonElement != null) {
      if (typeof (counterPopup.componentes) !== 'undefined') {
        buttonElement.innerHTML = counterPopup.componentes + '';
      } else {
        buttonElement.innerHTML = counterPopup + '';
      }
    }
  }, [counterPopup]);
  const eventClick = (e: any) => {
    popup.remove();
    if (!isPopup) {
      return;
    }
    hideHighlighted();
    const popups: any = [];
    const mobile: any = [];
    const menuOptions: any = [];
    const ids: any = [];
    const mobileIds: any = [];
    const bbox = [e.point.x, e.point.y,
    e.point.x, e.point.y];
    setMobilePopups([]);
    setActiveMobilePopups([]);
    setSelectedPopup(-1);

    let layersToClick = [...allLayers];
    if (map.map.getLayer('streams-intersects')) {
      layersToClick = [...layersToClick, 'streams-intersects'];
    }
    let features = map.map.queryRenderedFeatures(bbox, { layers: layersToClick });
    const search = (id: number, source: string) => {
      let index = 0;
      for (const feature of features) {
        if (feature.properties.cartodb_id === id && source === feature.source) {
          return index;
        }
        index++;
      }
      return -1;
    }
    popup.remove();
    setTimeout(() => {
      const popupsClassess = document.getElementsByClassName('mapboxgl-popup');
      if (popupsClassess.length) {
        for (let i = 0; i < popupsClassess.length; ++i) {
          popupsClassess[i].remove();
        }
      }
      popup.remove();
      features = features.filter((element: any, index: number) => {
        return search(element.properties.cartodb_id, element.source) === index;
      });
      features.sort((a: any, b: any) => {
        if (a.source.includes('project')) {
          return -1;
        }
        if (b.source.includes('project')) {
          return 1;
        }
        if (a.source.includes('problem')) {
          return -1;
        }
        if (b.source.includes('problem')) {
          return 1;
        }
        return a.source.split('_').join(' ').localeCompare(b.source.split('_').join(' '));
      });
      for (const feature of features) {
        if (feature.layer.id.includes('_line') && feature.layer.type === 'symbol') {
          continue;
        }
        let itemValue;
        if (feature.source === 'projects_polygon_' || feature.source === 'mhfd_projects' || feature.source === PROJECTS_DRAFT) {
          getComponentsByProjid(feature.properties.projectid, setCounterPopup);
          const filtered = galleryProjects.filter((item: any) =>
            item.cartodb_id === feature.properties.cartodb_id
          );
          const item = {
            type: 'project',
            title: MENU_OPTIONS.PROJECT,
            name: feature.properties.projectname ? feature.properties.projectname : feature.properties.requestedname ? feature.properties.requestedname : '-',
            organization: feature.properties.sponsor ? feature.properties.sponsor : 'No sponsor',
            value: feature.properties.finalcost ? feature.properties.finalcost : feature.properties.estimatedcost ? feature.properties.estimatedcost : '-1',
            projecctype: feature.properties.projectsubtype ? feature.properties.projectsubtype : feature.properties.projecttype ? feature.properties.projecttype : '-',
            status: feature.properties.status ? feature.properties.status : '-',
            objectid: feature.properties.objectid,
            valueid: feature.properties.cartodb_id,
            component_count: feature.properties.component_count ?? 0,
            id: feature.properties.projectid,
            streamname: feature.properties.streamname,
            popupId: 'popup',
            image: filtered.length && filtered[0].attachments ? filtered[0].attachments : (
              feature.properties.projecttype === 'Capital' ? '/projectImages/capital.jpg' :
                feature.properties.projecttype === 'Study' ? '/projectImages/study.jpg' :
                  feature.properties.projecttype === 'Maintenance' ?
                    (feature.properties.projectsubtype === 'Vegetation Mangement' ? '/projectImages/vegetation_management.jpg' :
                      feature.properties.projectsubtype === 'Sediment Removal' ? '/projectImages/sediment_removal.jpg' :
                        feature.properties.projectsubtype === 'Restoration' ? '/projectImages/restoration.jpg' :
                          feature.properties.projectsubtype === 'Minor Repairs' ? '/projectImages/minor_repairs.jpg' :
                            '/projectImages/debris_management.jpg') : '/Icons/eje.png')
          };
          mobile.push({
            type: 'project',
            name: item.name,
            value: item.value,
            projecttype: item.projecctype,
            image: item.image,
            id: item.id,
            objectid: item.objectid,
            valueid: item.valueid,
            streamname: item.streamname
          });
          itemValue = { ...item };
          menuOptions.push(MENU_OPTIONS.PROJECT);
          popups.push(itemValue);
          mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === MENU_OPTIONS.PROBLEMS) {
          const item = {
            type: MENU_OPTIONS.PROBLEMS,
            streamname: feature.properties.streamname,
            title: feature.properties.problemtype ? (feature.properties.problemtype + ' Problem') : '-',
            name: feature.properties.problemname ? feature.properties.problemname : '-',
            organization: feature.properties.jurisdiction ? feature.properties.jurisdiction : '-',
            value: feature.properties.estimatedcost ? feature.properties.estimatedcost : (feature.properties.componentcost ?? '0'),
            component_count: feature.properties.component_count ?? 0,
            status: feature.properties.solutionstatus ? (feature.properties.solutionstatus + '%') : '-',
            priority: feature.properties.problempriority ? feature.properties.problempriority + ' Priority' : '-',
            problemid: feature.properties.problemid,
            popupId: 'popup',
            image: `gallery/${feature.properties.problemtype}.jpg`,
          };
          itemValue = { ...item };
          mobile.push({
            type: MENU_OPTIONS.PROBLEMS,
            title: item.title,
            value: item.value,
            name: item.name,
            image: item.image,
            problemid: item.problemid,
            streamname: item.streamname
          });
          menuOptions.push('Problem');
          popups.push(itemValue);
          mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === 'mep_projects_temp_locations') {
          const item = {
            layer: MENU_OPTIONS.MEP_TEMPORARY_LOCATION,
            feature: feature.properties.proj_name ? feature.properties.proj_name : '-',
            projectno: feature.properties.proj_no ? feature.properties.proj_no : '-',
            mepstatus: feature.properties.mep_status ? feature.properties.mep_status : '-',
            mepstatusdate: feature.properties.status_date ? feature.properties.status_date : '-',
            notes: feature.properties.mhfd_notes ? feature.properties.mhfd_notes : '-',
            servicearea: feature.properties.servicearea ? feature.properties.servicearea : '-'
          }
          menuOptions.push(MENU_OPTIONS.MEP_TEMPORARY_LOCATION);
          popups.push(item);
          mobile.push({
            layer: item.layer,
            proj_name: item.feature,
            mep_status: item.mepstatus
          });
          mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === 'mep_projects_temp_locations') {
          const item = {
            layer: MENU_OPTIONS.MEP_TEMPORARY_LOCATION,
            feature: feature.properties.proj_name ? feature.properties.proj_name : '-',
            projectno: feature.properties.proj_no ? feature.properties.proj_no : '-',
            mepstatus: feature.properties.mep_status ? feature.properties.mep_status : '-',
            mepstatusdate: feature.properties.status_date ? feature.properties.status_date : '-',
            notes: feature.properties.mhfd_notes ? feature.properties.mhfd_notes : '-',
            servicearea: feature.properties.servicearea ? feature.properties.servicearea : '-'
          }
          menuOptions.push(MENU_OPTIONS.MEP_TEMPORARY_LOCATION);
          popups.push(item);
          mobile.push({
            layer: item.layer,
            proj_name: item.feature,
            mep_status: item.mepstatus
          });
          mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === 'mep_detentionbasins') {
          const item = {
            layer: MENU_OPTIONS.MEP_DETENTION_BASIN,
            feature: feature.properties.projectname ? feature.properties.projectname : '-',
            projectno: feature.properties.projectno ? feature.properties.projectno : '-',
            mep_eligibilitystatus: feature.properties.mep_eligibilitystatus ? feature.properties.mep_eligibilitystatus : '-',
            mep_summarynotes: feature.properties.mep_summarynotes ? feature.properties.mep_summarynotes : '-',
            pondname: feature.properties.pondname ? feature.properties.pondname : '-',
            mhfd_servicearea: feature.properties.mhfd_servicearea ? feature.properties.mhfd_servicearea : '-',
            mepstatusdate: getDateMep(feature.properties.mep_eligibilitystatus, feature.properties)
          }
          menuOptions.push(MENU_OPTIONS.MEP_DETENTION_BASIN);
          popups.push(item);
          mobile.push({
            layer: item.layer,
            proj_name: item.feature,
            mep_status: item.mep_eligibilitystatus
          });
          mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === 'mep_channels') {
          const item = {
            layer: MENU_OPTIONS.MEP_CHANNEL,
            feature: feature.properties.projectname ? feature.properties.projectname : '-',
            projectno: feature.properties.projectno ? feature.properties.projectno : '-',
            mep_eligibilitystatus: feature.properties.mep_eligibilitystatus ? feature.properties.mep_eligibilitystatus : '-',
            mep_summarynotes: feature.properties.mep_summarynotes ? feature.properties.mep_summarynotes : '-',
            pondname: feature.properties.pondname ? feature.properties.pondname : '-',
            mhfd_servicearea: feature.properties.mhfd_servicearea ? feature.properties.mhfd_servicearea : '-',
            mepstatusdate: getDateMep(feature.properties.mep_eligibilitystatus, feature.properties)
          }
          menuOptions.push(MENU_OPTIONS.MEP_CHANNEL);
          popups.push(item);
          mobile.push({
            layer: item.layer,
            proj_name: item.feature,
            mep_status: item.mep_eligibilitystatus
          });
          mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === 'mep_outfalls') {
          const item = {
            layer: MENU_OPTIONS.MEP_STORM_OUTFALL,
            feature: feature.properties.projectname ? feature.properties.projectname : '-',
            projectno: feature.properties.projectno ? feature.properties.projectno : '-',
            mep_eligibilitystatus: feature.properties.mep_eligibilitystatus ? feature.properties.mep_eligibilitystatus : '-',
            mep_summarynotes: feature.properties.mep_summarynotes ? feature.properties.mep_summarynotes : '-',
            pondname: feature.properties.pondname ? feature.properties.pondname : '-',
            mhfd_servicearea: feature.properties.mhfd_servicearea ? feature.properties.mhfd_servicearea : '-',
            mepstatusdate: getDateMep(feature.properties.mep_eligibilitystatus, feature.properties)
          }
          menuOptions.push(MENU_OPTIONS.MEP_STORM_OUTFALL);
          popups.push(item);
          mobile.push({
            layer: item.layer,
            proj_name: item.feature,
            mep_status: item.mep_eligibilitystatus
          });
          mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === 'watershed_service_areas') {
          const item = {
            layer: MENU_OPTIONS.SERVICE_AREA,
            feature: feature.properties.servicearea ? feature.properties.servicearea : '-',
            watershedmanager: feature.properties.watershedmanager ? feature.properties.watershedmanager : '-',
            constructionmanagers: feature.properties.constructionmanagers ? feature.properties.constructionmanagers : '-',
            email: feature.properties.email ? feature.properties.email : '-'
          }
          mobile.push({
            layer: item.layer,
            watershedmanager: item.watershedmanager,
            constructionmanagers: item.constructionmanagers,
            email: item.email
          })
          menuOptions.push(MENU_OPTIONS.SERVICE_AREA);
          popups.push(item);
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === 'catchments' || feature.source === 'basin') {
          const item = {
            layer: MENU_OPTIONS.WATERSHED,
            feature: feature.properties.str_name ? feature.properties.str_name : 'No name'
          }
          menuOptions.push(MENU_OPTIONS.WATERSHED);
          popups.push(item);
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === ROUTINE_NATURAL_AREAS) {
          const item = {
            layer: MENU_OPTIONS.VEGETATION_MANAGEMENT_NATURAL_AREA,
            feature: feature.properties.work_item_name ? feature.properties.work_item_name : '-',
            contract: feature.properties.contract ? feature.properties.contract : '-',
            contractor: feature.properties.contractor ? feature.properties.contractor : '-',
            local_gov: feature.properties.local_gov ? feature.properties.local_gov : '-',
            acreage: feature.properties.acreage ? numberWithCommas(Math.round(feature.properties.acreage * 100) / 100) : '-',
            project_subtype: feature.properties.project_subtype ? feature.properties.project_subtype : '-',
            frequency: 'NA'
          }
          menuOptions.push(MENU_OPTIONS.VEGETATION_MANAGEMENT_NATURAL_AREA);
          popups.push(item);
          mobile.push({
            layer: MENU_OPTIONS.ROUTINE_MAINTENANCE,
            project_subtype: item.project_subtype,
            frequency: item.frequency
          });
          mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === ROUTINE_WEED_CONTROL) {
          const item = {
            layer: MENU_OPTIONS.VEGETATION_MANAGEMENT_WEED_CONTROL,
            feature: feature.properties.work_item_name ? feature.properties.work_item_name : '-',
            contract: feature.properties.contract ? feature.properties.contract : '-',
            contractor: feature.properties.contractor ? feature.properties.contractor : '-',
            local_gov: feature.properties.local_gov ? feature.properties.local_gov : '-',
            mow_frequency: feature.properties.mow_frequency ? feature.properties.mow_frequency : '-',
            acreage: feature.properties.acreage ? numberWithCommas(Math.round(feature.properties.acreage * 100) / 100) : '-',
            project_subtype: feature.properties.project_subtype ? feature.properties.project_subtype : '-',
          }
          menuOptions.push(MENU_OPTIONS.VEGETATION_MANAGEMENT_WEED_CONTROL);
          popups.push(item);
          mobile.push({
            layer: MENU_OPTIONS.ROUTINE_MAINTENANCE,
            project_subtype: item.project_subtype,
            frequency: item.mow_frequency
          });
          mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === ROUTINE_DEBRIS_AREA) {
          const item = {
            layer: MENU_OPTIONS.DEBRIS_MANAGEMENT_AREA,
            feature: feature.properties.work_item_name ? feature.properties.work_item_name : '-',
            contract: feature.properties.contract ? feature.properties.contract : '-',
            contractor: feature.properties.contractor ? feature.properties.contractor : '-',
            local_gov: feature.properties.local_gov ? feature.properties.local_gov : '-',
            debris_frequency: feature.properties.debris_frequency ? feature.properties.debris_frequency : '-',
            acreage: feature.properties.acreage ? numberWithCommas(Math.round(feature.properties.acreage * 100) / 100) : '-',
            project_subtype: feature.properties.project_subtype ? feature.properties.project_subtype : '-'
          }
          menuOptions.push(MENU_OPTIONS.DEBRIS_MANAGEMENT_AREA);
          popups.push(item);
          mobile.push({
            layer: MENU_OPTIONS.ROUTINE_MAINTENANCE,
            project_subtype: item.project_subtype,
            frequency: item.debris_frequency
          });
          mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === ROUTINE_DEBRIS_LINEAR) {
          const item = {
            layer: MENU_OPTIONS.DEBRIS_MANAGEMENT_LINEAR,
            feature: feature.properties.work_item_name ? feature.properties.work_item_name : '-',
            contract: feature.properties.contract ? feature.properties.contract : '-',
            contractor: feature.properties.contractor ? feature.properties.contractor : '-',
            local_gov: feature.properties.local_gov ? feature.properties.local_gov : '-',
            debris_frequency: feature.properties.debris_frequency ? feature.properties.debris_frequency : '-',
            length: feature.properties.length ? Math.round(feature.properties.length) : '-',
            project_subtype: feature.properties.project_subtype ? feature.properties.project_subtype : '-'
          }
          menuOptions.push(MENU_OPTIONS.DEBRIS_MANAGEMENT_LINEAR);
          popups.push(item);
          mobile.push({
            layer: MENU_OPTIONS.ROUTINE_MAINTENANCE,
            project_subtype: item.project_subtype,
            frequency: item.debris_frequency
          });
          mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === NRCS_SOILS) {
          const item = {
            layer: MENU_OPTIONS.NCRS_SOILS,
            hydgrpdcd: feature.properties.hydgrpdcd,
            muname: feature.properties.muname,
            aws0150wta: feature.properties.aws0150wta,
            drclassdcd: feature.properties.drclassdcd,
            nrcsweb: 'NA'
          }
          menuOptions.push(MENU_OPTIONS.NCRS_SOILS);
          popups.push(item);
          mobile.push({
            layer: item.layer,
            hydgrpdcd: item.hydgrpdcd,
            muname: item.muname
          });
          mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === DWR_DAM_SAFETY) {
          const item = {
            layer: MENU_OPTIONS.DWR_DAM_SAFETY,
            dam_name: feature.properties.dam_name,
            hazard_class: feature.properties.hazard_class,
            year_completed: feature.properties.year_completed,
            dam_height: feature.properties.dam_height,
            more_information: feature.properties.more_information
          }
          mobile.push({
            layer: item.layer,
            dam_name: item.dam_name,
            hazard_class: item.hazard_class
          })
          menuOptions.push(MENU_OPTIONS.DWR_DAM_SAFETY);
          popups.push(item);
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === STREAM_MANAGEMENT_CORRIDORS) {
          const item = {
            layer: MENU_OPTIONS.STREAM_MANAGEMENT_CORRIDORS,
            scale: 'District',
            date_created: '01/07/2019'
          }
          menuOptions.push(MENU_OPTIONS.STREAM_MANAGEMENT_CORRIDORS);
          popups.push(item);
          mobile.push({
            layer: item.layer,
            scale: item.scale,
            date_created: item.date_created
          });
          mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === BCZ_PREBLE_MEADOW_JUMPING) {
          const item = {
            layer: MENU_OPTIONS.BCZ_PREBLES_MEADOW_JUMPING_MOUSE,
            expirationdate: epochTransform(feature.properties.expiration_date),
            bcz_specname: feature.properties.species_name,
            bcz_expdate: feature.properties.bcz_expdate,
            website: 'https://www.fws.gov/mountain-prairie/es/preblesMeadowJumpingMouse.php',
            letter: 'https://www.fws.gov/mountain-prairie/es/Library/2020-TA-0030_PMJM_Denver_Block_Clearance_extension_accessible_signed.pdf',
            map: `https://www.fws.gov/mountain-prairie/es/species/mammals/preble/9-2016_USFWS_Preble's_map_Denver_Metro_Area.pdf`
          }
          menuOptions.push(MENU_OPTIONS.BCZ_PREBLES_MEADOW_JUMPING_MOUSE);
          popups.push(item);
          mobile.push({
            layer: MENU_OPTIONS.BLOCK_CLEARANCE_ZONE,
            bcz_specname: item.bcz_specname,
            bcz_expdate: item.bcz_expdate
          });
          mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === BCZ_UTE_LADIES_TRESSES_ORCHID) {
          const item = {
            layer: MENU_OPTIONS.BCZ_UTE_LADIES_TRESSES_ORCHID,
            bcz_specname: feature.properties.species_name,
            bcz_expdate: feature.properties.bcz_expdate,
            expirationdate: parseDateZ(feature.properties.expiration_date),
            website: 'https://www.fws.gov/mountain-prairie/es/uteLadiestress.php',
            letter: 'https://www.fws.gov/mountain-prairie/es/Library/2020-TA-0031_ULTO_Denver_Block_Clearance_extension_accessible_signed.pdf',
            map: 'https://www.fws.gov/mountain-prairie/es/species/plants/uteladiestress/BlockClearanceMap2008.pdf'
          }
          mobile.push({
            layer: MENU_OPTIONS.BLOCK_CLEARANCE_ZONE,
            bcz_specname: item.bcz_specname,
            bcz_expdate: item.bcz_expdate
          });
          mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          menuOptions.push(MENU_OPTIONS.BCZ_UTE_LADIES_TRESSES_ORCHID);
          popups.push(item);
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === RESEARCH_MONITORING) {
          const item = {
            layer: MENU_OPTIONS.RESEARCH_MONITORING,
            sitename: feature.properties.sitename,
            sitetype: feature.properties.sitetype,
            bmptype: feature.properties.bmptype,
          }
          mobile.push({
            layer: item.layer,
            sitename: item.sitename,
            sitetype: item.sitetype
          })
          mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          menuOptions.push(MENU_OPTIONS.RESEARCH_MONITORING);
          popups.push(item);
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === CLIMB_TO_SAFETY) {
          const item = {
            layer: MENU_OPTIONS.CLIMB_TO_SAFETY_SIGNS,
          }
          mobile.push(item);
          menuOptions.push(MENU_OPTIONS.CLIMB_TO_SAFETY_SIGNS);
          popups.push(item);
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === SEMSWA_SERVICE_AREA) {
          const item = {
            layer: MENU_OPTIONS.SEMSWA_SERVICE_AREA,
          }
          menuOptions.push(MENU_OPTIONS.SEMSWA_SERVICE_AREA);
          popups.push(item);
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        if (feature.source === 'streams') {

          const item = {
            type: 'streams-reaches',
            layer: 'Streams',
            title: feature.properties.str_name ? feature.properties.str_name : 'Unnamed Stream',
            streamname: feature.properties.str_name,
            mhfd_code: feature.properties.mhfd_code,
            catch_sum: feature.properties.catch_sum,
            str_ft: feature.properties.str_ft,
            slope: feature.properties.slope
          };
          menuOptions.push('Stream');
          mobile.push({ ...item });
          mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          popups.push(item);
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
        for (const component of COMPONENT_LAYERS.tiles) {
          if (feature.source === component) {
            let isAdded = componentsList.find((i: any) => i.cartodb_id === feature.properties.cartodb_id);
            let status = 'Add';
            if (isAdded) {
              status = 'Remove';
            }
            const item = {
              layer: MENU_OPTIONS.COMPONENTS,
              type: feature.properties.type ? feature.properties.type : '-',
              subtype: feature.properties.subtype ? feature.properties.subtype : '-',
              status: feature.properties.status ? feature.properties.status : '-',
              estimatedcost: feature.properties.original_cost ? feature.properties.original_cost : '-',
              studyname: feature.properties.mdp_osp_study_name ? feature.properties.mdp_osp_study_name : '-',
              studyyear: feature.properties.year_of_study ? feature.properties.year_of_study : '-',
              jurisdiction: feature.properties.jurisdiction ? feature.properties.jurisdiction : '-',
              original_cost: feature.properties.original_cost ? feature.properties.original_cost : '-',
              table: feature.source ? feature.source : '-',
              cartodb_id: feature.properties.cartodb_id ? feature.properties.cartodb_id : '-',
              problem: 'Dataset in development',
              added: status,
              objectid: feature.properties.objectid ? feature.properties.objectid : '',
              projectid: feature.properties.projectid ? feature.properties.projectid : undefined,
              streamname: feature.properties.drainageway,
            };
            const name = feature.source.split('_').map((word: string) => word[0].toUpperCase() + word.slice(1)).join(' ');
            menuOptions.push(name);
            mobile.push({
              layer: item.layer,
              type: item.type,
              subtype: item.subtype,
              studyyear: item.studyyear,
              streamname: item.streamname
            })
            mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
            popups.push(item);
            ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          }
        }
      }
      if (popups.length) {
        const html = loadMenuPopupWithData(menuOptions, popups);
        setMobilePopups(mobile);
        setActiveMobilePopups(mobileIds);
        setSelectedPopup(0);
        if (html) {

          popup.remove();
          popup = new mapboxgl.Popup({ closeButton: true, });
          popup.setLngLat(e.lngLat)
            .setHTML(html)
            .addTo(map.map);
          for (const index in popups) {

            let arrayElements = document.getElementsByClassName('menu-' + index);
            let menuElement = document.getElementById('menu-' + index);
            if (menuElement != null) {
              menuElement.addEventListener('click', (showPopup.bind(index, index, popups.length, ids[index])));
            }
            let buttonElement = document.getElementById('buttonPopup-' + index);
            if (buttonElement != null) {
              buttonElement.addEventListener('click', seeDetails.bind(popups[index], popups[index]));
            }
            let componentElement = document.getElementById('component-' + index);
            if (componentElement) {
              componentElement.addEventListener('click', addRemoveComponent.bind(popups[index], popups[index]));
            }
            let getcomponentElement = document.getElementById('buttonComponents-' + index);
            if (getcomponentElement) {
              getcomponentElement.addEventListener('click', getComponentsFromProjProb.bind(popups[index], popups[index]));
            }
          }
        }
      }
    }, 300);
  }

  const getComponentsFromProjProb = (item: any, event: any) => {
    let id = item.type == 'project' ? item.id : item.problemid;
    getData(SERVER.GET_COMPONENTS_BY_PROBLEMID + '?problemid=' + id, getToken()).then(componentsFromMap => {
      if (componentsFromMap.result.length > 0 && componentsList.length > 0) {
        getListComponentsByComponentsAndPolygon([...componentsList, ...componentsFromMap.result], null);
      } else if (componentsList.length == 0 && componentsFromMap.result.length > 0) {
        getListComponentsByComponentsAndPolygon([...componentsFromMap.result], null);
      } else if (componentsList.length > 0 && componentsFromMap.result.length == 0) {
        getListComponentsByComponentsAndPolygon([...componentsList], null);
      }
    });
    removePopup();
  }
  const addRemoveComponent = (item: any, event: any) => {
    let newComponents: any = [];
    if (item.added === 'Add') {
      newComponents = [...componentsList, {
        cartodb_id: item.cartodb_id ? item.cartodb_id : '',
        jurisdiction: item.jurisdiction ? item.jurisdiction : '',
        original_cost: item.original_cost ? item.original_cost : '',
        problemid: null,
        status: item.status ? item.status : '',
        table: item.table ? item.table : '',
        type: item.type ? item.type : '',
        objectid: item.objectid ? item.objectid : ''
      }];
    } else {
      newComponents = componentsList.filter((comp: any) => (!(comp.cartodb_id == item.cartodb_id && comp.table == item.table)));
    }
    getListComponentsByComponentsAndPolygon(newComponents, null);
    removePopup();
  }
  useEffect(() => {
    if (allLayers.length < 100) {
      return;
    }
    EventService.setRef('click', eventClick);
    let eventToClick = EventService.getRef('click');
    map.map.on('click', eventToClick);
    return () => {
      map.map.off(eventToClick);
    }
  }, [allLayers]);
  const loadMenuPopupWithData = (menuOptions: any[], popups: any[]) => ReactDOMServer.renderToStaticMarkup(

    <>
      {menuOptions.length === 1 ?
        (<> {(menuOptions[0] !== 'Project' && menuOptions[0] !== 'Problem')
          ? (menuOptions[0] == 'Stream' ? loadStreamPopup(0, popups[0]) : loadComponentPopup(0, popups[0], !notComponentOptions.includes(menuOptions[0]))) :
          loadMainPopup(0, popups[0], test)}
        </>)
        :
        <div className="map-pop-02">
          <div className="headmap">LAYERS</div>
          <div className="layer-popup">
            {
              menuOptions.map((menu: any, index: number) => {
                return (
                  <div>
                    <Button id={'menu-' + index} key={'menu-' + index} className={"btn-transparent " + "menu-" + index}><img src="/Icons/icon-75.svg" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined />
                    </Button>
                    {(menu !== 'Project' && menu !== 'Problem') ?
                      (menu == 'Stream' ? loadStreamPopup(index, popups[index]) : loadComponentPopup(index, popups[index], !notComponentOptions.includes(menuOptions[index])))
                      :
                      menu === 'Project' ?
                        loadMainPopup(index, popups[index], test, true)
                        :
                        loadMainPopup(index, popups[index], test)}
                  </div>
                )
              })
            }
          </div>
        </div>}
    </>
  );
  const loadPopupMarker = () => ReactDOMServer.renderToStaticMarkup(
    <>
      <div className="map-pop-02">

        <div className="headmap">PROPOSED PROJECT <div id="closepopupmarker" style={{ 'float': 'right', 'paddingRight': '4px', 'height': '16px', 'cursor': 'pointer' }}>&#x2716;</div></div>
        <div className="layer-popup" style={{ padding: '21px 13px 0px 10px' }}>

          <div>
            <div style={{ padding: '10px', marginTop: '-15px', color: '#28C499', display: 'flex' }}>
              <Button style={{ color: '#28C499', width: '100%' }} id='menu-marker' className="btn-borde">Remove Marker</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  const loadMainPopup = (id: number, item: any, test: Function, sw?: boolean) => (
    <>
      <MainPopupCreateMap id={id} item={item} test={test} sw={sw || !(user.designation === ADMIN || user.designation === STAFF)} ep={false}></MainPopupCreateMap>
    </>
  );

  const loadComponentPopup = (index: number, item: any, isComponent: boolean) => (
    <>
      <ComponentPopupCreate id={index} item={item} isComponent={isComponent} isWR={false}></ComponentPopupCreate>
    </>
  );
  const loadStreamPopup = (index: number, item: any) => (
    <>
      <StreamPopupFull id={index} item={item} ></StreamPopupFull>
    </>
  );
  const renderOption = (item: any) => {
    return {
      key: `${item.text}|${item.place_name}`,
      value: `${item.center[0]},${item.center[1]}?${item.text} ${item.place_name}`,
      label: <div className="global-search-item">
        <h6>{item.text}</h6>
        <p>{item.place_name}</p>
      </div>
    }
  }
  const [keyword, setKeyword] = useState('');

  const handleSearch = (value: string) => {
    setKeyword(value)
    mapSearchQuery(value);
  };

  const onSelect = (value: any) => {
    console.log('onSelect:::', value);
    const keyword = value.split('?');
    const coord = keyword[0].split(',');
    console.log('my coord is ', coord);
    map.map.flyTo({ center: coord, zoom: 14.5 });
    const placeName = keyword[1];
    setKeyword(placeName);
    const newmarker = new mapboxgl.Marker({ color: "#F4C754", scale: 0.7 });
    newmarker.setLngLat(coord);
    newmarker.addTo(map.map);
    setMarkerGeocoder(newmarker);
    setKeyword('');
  };
  const removePopup = () => {
    popup.remove();
  }
  return <>

    <div className="map">
      <div id="map3" style={{ height: '100%', width: '100%' }}></div>
      {visible && <DetailedModal
        detailed={detailed}
        type={data.problemid ? FILTER_PROBLEMS_TRIGGER : FILTER_PROJECTS_TRIGGER}
        data={data}
        visible={visible}
        setVisible={setVisible}
      />}
      <div className="m-head">
        <Dropdown overlayClassName="dropdown-map-layers"
          visible={visibleDropdown}
          onVisibleChange={(flag: boolean) => {
            setVisibleDropdown(flag);

          }}
          overlay={MapFilterView({ selectCheckboxes, setVisibleDropdown, selectedLayers, removePopup, isWR: true })}
          trigger={['click']}>
          <Button>
            <span className="btn-02"></span>
          </Button>
        </Dropdown>
        <AutoComplete
          dropdownMatchSelectWidth={true}
          style={{ width: 200, backgroundColor: '#fafafa', borderRadius: '5px', height: '36px' }}
          options={mapSearch.map(renderOption)}
          onSelect={onSelect}
          onSearch={handleSearch}
          value={keyword}
        >
          <Input.Search size="large" placeholder="Stream or Location" className="style-input"/>
        </AutoComplete>
      </div>
    </div>
    {loading && <LoadingViewOverall></LoadingViewOverall>}
  </>
};

export default CreateProjectMap;
