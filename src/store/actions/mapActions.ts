import * as types from 'store/types/mapTypes';
import * as projectTypes from '../types/ProjectTypes';
import * as detailedTypes from 'store/types/detailedTypes';
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import * as constants from 'constants/constants';
import { OptionProblems, OptionProjects, OptionComponents } from 'Classes/MapTypes';
import { optionsProjects } from 'routes/portfolio-view/components/ListUtils';
import store from '..';

const getAndDispatchAbortableCtrl = (dispatch: Function, key: string): AbortController => {
  const controller = new AbortController();
  dispatch({
    type: types.ABORTABLE_REQUEST,
    payload: {
      abortableController: controller,
      abortableKey: key,
    },
  });
  return controller;
};

const isAbortError = (error: any) => {
  return error instanceof DOMException && error.message === 'The user aborted a request.';
};

export const handleAbortError = (error: any) => {
  if (!isAbortError(error)) {
    console.log(`Error`, error);
  }
};

export const getMapTables = (trigger: string, name?: string) => {
  return (dispatch: Function, getState: Function) => {
    const state = getState();
    const layers = { ...state.map.layers };
    if (!layers[trigger] && !trigger.includes('milehighfd')) {
      const requestData = { table: trigger };
      datasets.postData(SERVER.MAP_TABLES, requestData, datasets.getToken()).then(tiles => {
        if (tiles.length > 0) {
          if (name) dispatch({ type: types.GET_MAP_WITH_SUBLAYERS, data: { trigger, tiles, name } });
          else dispatch({ type: types.GET_MAP_LAYERS, data: { trigger, tiles } });
        }
      });
    }
  };
};

export const getMapWithSublayers = (trigger: any, tiles: any, name: any) => ({
  type: types.GET_MAP_WITH_SUBLAYERS,
  data: { trigger, tiles, name },
});

export const getMapLayers = (trigger: any, tiles: any) => ({
  type: types.GET_MAP_LAYERS,
  data: { trigger, tiles },
});

export const updateSelectedLayers = (selectedLayer: any) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SELECTED_LAYERS, selectedLayer });
  };
};
export const resetMap = () => {
  return (dispatch: Function) => {
    dispatch({ type: types.RESET_MAP });
  };
};

const options = (options: OptionProblems, filterComponent: OptionComponents, coordinates: string) => {
  const applyFilter = store.getState().map.applyFilter;
  let servicearea = '';
  if (options.servicearea) {
    servicearea = options.servicearea;
  } else {
    if (filterComponent.servicearea) {
      servicearea = filterComponent.servicearea;
    }
  }
  return applyFilter
    ? {
        isproblem: true,
        cost: options.cost,
        priority: options.priority,
        solutionstatus: options.solutionstatus,
        county: options.county,
        jurisdiction: options.jurisdiction,
        mhfdmanager: options.mhfdmanager,
        problemtype: options.problemtype,
        source: options.source,
        components: options.components,
        componenttype: filterComponent.component_type,
        componentstatus: filterComponent.status,
        watershed: options.mhfdmanager,
        jurisdictionComp: filterComponent.jurisdiction,
        countyComp: filterComponent.county,
        yearofstudy: filterComponent.yearofstudy,
        estimatedcostComp: filterComponent.estimatedcost,
        name: options.keyword,
        servicearea: servicearea,
        serviceareaComp: filterComponent.servicearea,
        sortby: options.column,
        sorttype: options.order,
        bounds: coordinates,
      }
    : {
        isproblem: true,
        cost: options.cost,
        priority: options.priority,
        solutionstatus: options.solutionstatus,
        county: options.county,
        jurisdiction: options.jurisdiction,
        mhfdmanager: options.mhfdmanager,
        problemtype: options.problemtype,
        source: options.source,
        components: options.components,
        componenttype: filterComponent.component_type,
        componentstatus: filterComponent.status,
        watershed: options.mhfdmanager,
        jurisdictionComp: filterComponent.jurisdiction,
        countyComp: filterComponent.county,
        yearofstudy: filterComponent.yearofstudy,
        estimatedcostComp: filterComponent.estimatedcost,
        name: options.keyword,
        servicearea: servicearea,
        serviceareaComp: filterComponent.servicearea,
        sortby: options.column,
        sorttype: options.order,
      };
};

export const setFilterCoordinates = (coordinates: string, tab: string) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SET_FILTER_COORDINATES, coordinates });
    if (tab === constants.PROBLEMS_TRIGGER) {
      dispatch(getGalleryProblems());
    } else {
      dispatch(getGalleryProjects('bounds'));
    }
  };
};
export const replaceFilterCoordinates = (coordinates: string) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SET_FILTER_COORDINATES, coordinates });
  };
};
export const setFilterProblemOptions = (filters: OptionProblems) => {
  const keyword = store.getState().map.filterProblems.keyword;
  const auxFilter = {
    problemname: filters.keyword,
    solutioncost: filters.cost,
    problempriority: filters.priority,
    solutionstatus: [] as string[],
    county: filters.county,
    jurisdiction: filters.jurisdiction,
    mhfdmanager: filters.mhfdmanager,
    problemtype: filters.problemtype,
    source: filters.source,
    components: [] as any,
    servicearea: filters.servicearea,
    keyword,
  };
  const solutionstatus = filters.solutionstatus.split(',');
  const auxSolutionStatus = [];
  for (let index = 0; index < solutionstatus.length && filters.solutionstatus.length; index++) {
    const element = solutionstatus[index];
    auxSolutionStatus.push(
      element === '0' ? '0,25' : element === '25' ? '25,50' : element === '50' ? '50,75' : '75,100',
    );
  }
  auxFilter.solutionstatus = auxSolutionStatus;
  return (dispatch: Function) => {
    dispatch({ type: types.SET_FILTER_PROBLEM_OPTIONS, filters });
    const params = '?tables=' + filters.components;
    if (filters.components) {
      datasets.getData(SERVER.GET_FILTER_COMPONENTS_FOR_PROBLEMS + params, datasets.getToken()).then(tables => {
        if (tables?.length >= 0) {
          auxFilter.components = tables;
          dispatch({ type: types.SET_FILTER_PROBLEMS, filters: auxFilter });
        }
      });
    } else {
      dispatch({ type: types.SET_FILTER_PROBLEMS, filters: auxFilter });
    }
  };
};

export const setFilterProjectOptions = (filters: OptionProjects) => {
  const keyword = store.getState().map.filterProjects.keyword;
  const auxFilter = {
    projectname: filters.keyword,
    projecttype: filters.projecttype,
    status: filters.status,
    startyear: filters.startyear ? '' + filters.startyear : '0',
    completedyear: filters.completedyear ? '' + filters.completedyear : '9999',
    mhfddollarsallocated: filters.mhfddollarsallocated,
    lgmanager: filters.lgmanager,
    streamname: filters.streamname,
    creator: filters.creator,
    estimatedcost: filters.totalcost,
    finalcost: filters.totalcost,
    workplanyr: filters.workplanyear,
    mhfdmanager: filters.mhfdmanager,
    jurisdiction: filters.jurisdiction,
    // replace County is missing
    county: filters.county,
    problemtypeProjects: [] as any,
    consultant: filters.consultant,
    contractor: filters.contractor,
    servicearea: filters.servicearea,
    sortby: filters.column,
    sorttype: filters.order,
    keyword,
  };
  return (dispatch: Function) => {
    dispatch({ type: types.SET_FILTER_PROJECT_OPTIONS, filters });
    dispatch({ type: projectTypes.RESET_NEXT_PAGE });
    dispatch({ type: projectTypes.RESET_INFINITE_SCROLL_ITEM });
    dispatch({ type: projectTypes.RESET_INFINITE_SCROLL_ITEM_HAS_MORE_ITEMS });
    const params = '?problemtype=' + filters.problemtype;
    if (filters.problemtype) {
      datasets.getData(SERVER.GET_FILTER_PROBLEMTYPE_FOR_PROJECTS + params, datasets.getToken()).then(tables => {
        if (tables?.length >= 0) {
          auxFilter.problemtypeProjects = tables;
          dispatch({ type: types.SET_FILTER_PROJECTS, filters: auxFilter });
        }
      });
    } else {
      dispatch({ type: types.SET_FILTER_PROJECTS, filters: auxFilter });
    }
  };
};

export const setProblemKeyword = (keyword: string) => {
  const filterOptions = store.getState().map.filterProblemOptions;
  const auxFilter = { ...filterOptions };
  const filterProblems = store.getState().map.filterProblems;
  const auxFilterProblems = { ...filterProblems };
  auxFilter.keyword = keyword;
  return (dispatch: Function) => {
    dispatch({ type: types.SET_FILTER_PROBLEM_OPTIONS, filters: auxFilter });
    const params = '?field=' + keyword;
    if (keyword) {
      datasets.getData(SERVER.SEARCH_KEYWORD_PROBLEMS + params, datasets.getToken()).then(tables => {
        if (tables?.problem_boundary?.length >= 0) {
          auxFilterProblems.keyword = tables;
          auxFilterProblems.problemname = keyword;
          dispatch({ type: types.SET_FILTER_PROBLEMS, filters: auxFilterProblems });
        }
      });
    } else {
      auxFilterProblems.keyword = {};
      auxFilterProblems.problemname = keyword;
      dispatch({ type: types.SET_FILTER_PROBLEMS, filters: auxFilterProblems });
    }
  };
};

export const setProjectKeyword = (keyword: string) => {
  const filterOptions = store.getState().map.filterProjectOptions;
  const auxFilter = { ...filterOptions };
  auxFilter.keyword = keyword;
  auxFilter.name = keyword;
  return (dispatch: Function) => {
    dispatch({ type: types.SET_FILTER_PROJECT_OPTIONS, filters: auxFilter });
  };
};
export const resetFilterProjectOptionsEmpty = () => {
  return (dispatch: Function) => {
    dispatch({ type: types.RESET_FILTER_PROJECT_OPTIONS_EMPTY });
  };
};
export const resetFiltercomponentOptions = () => {
  return (dispatch: Function) => {
    dispatch({ type: types.RESET_FILTER_PROJECT_OPTIONS });
  };
};
export const setFilterComponentOptions = (filters: OptionComponents) => {
  const auxFilter = {
    component_type: filters.component_type,
    status: filters.status,
    year_of_study: filters.yearofstudy,
    estimated_cost: filters.estimatedcost,
    jurisdiction: filters.jurisdiction,
    county: filters.county,
    mhfdmanager: filters.mhfdmanager,
    servicearea: filters.servicearea,
  };
  return (dispatch: Function) => {
    dispatch({ type: types.SET_FILTER_COMPONENT_OPTIONS, filters });
    dispatch({ type: types.SET_FILTER_COMPONENTS, filters: auxFilter });
    if (!auxFilter.component_type) {
      auxFilter.component_type =
        'grade_control_structure,pipe_appurtenances,special_item_point,' +
        'special_item_linear,special_item_area,channel_improvements_linear,' +
        'channel_improvements_area,storm_drain,' +
        'detention_facilities,land_acquisition,landscaping_area,stream_improvement_measure_copy'; // TODO save on a constant the useful components
    }
  };
};

export const getGalleryProblems = () => {
  return (dispatch: Function, getState: Function) => {
    const {
      map: {
        filterCoordinates: coordinates,
        filterProblemOptions: filterOptions,
        filterComponentOptions: filterComponent,
      },
    } = getState();
    dispatch({ type: types.SET_SPIN_CARD_PROBLEMS, spin: true });
    const controller = getAndDispatchAbortableCtrl(dispatch, 'getGalleryProblems');
    datasets
      .postData(
        SERVER.GALLERY_PROJECTS,
        options(filterOptions, filterComponent, coordinates),
        datasets.getToken(),
        controller.signal,
      )
      .then(galleryProblems => {
        if (galleryProblems?.length >= 0) {
          dispatch({ type: types.GALLERY_PROBLEMS, galleryProblems });
        }
        dispatch({ type: types.SET_SPIN_CARD_PROBLEMS, spin: false });
      })
      .catch(err => {
        if (!isAbortError) {
          console.log('getGalleryProblems', err);
        }
      });
  };
};

export const getGalleryProjects = (origin?: any, page?: any) => {
  return (dispatch: Function, getState: Function) => {
    const {
      map: {
        filterCoordinates: coordinates,
        filterProjectOptions: filterOptions,
        filterComponentOptions: filterComponent,
        applyFilter,
      },
    } = getState();
    dispatch({
      type: types.SET_SPIN_CARD_PROJECTS,
      spin: true,
    });
    const controller = getAndDispatchAbortableCtrl(dispatch, 'getGalleryProjects');
    datasets
      .postData(
        `${SERVER.GALLERY_PROJECTS_V2}?limit=20&page=1`,
        optionsProjects(filterOptions, filterComponent, coordinates, applyFilter),
        datasets.getToken(),
        controller.signal,
      )
      .then(galleryProjects => {
        dispatch({ type: types.GALLERY_PROJECTS_V2, galleryProjects });
        dispatch({ type: types.SET_SPIN_CARD_PROJECTS, spin: false });
      })
      .catch(err => {
        if (!isAbortError(err)) {
          console.log('getGalleryProjects', err);
        }
      });
    dispatch({ type: projectTypes.RESET_NEXT_PAGE });
    dispatch({ type: projectTypes.RESET_INFINITE_SCROLL_ITEM });
    dispatch({ type: projectTypes.RESET_INFINITE_SCROLL_ITEM_HAS_MORE_ITEMS });
    if (origin !== 'bounds') {
      dispatch(getProjectsFilteredIds());
    }
  };
};

export const getExtraGalleryProjects = (page: any = 0) => {
  return (dispatch: Function, getState: Function) => {
    const {
      map: {
        filterCoordinates: coordinates,
        filterProjectOptions: filterOptions,
        filterComponentOptions: filterComponent,
      },
    } = getState();
    const applyFilter = store.getState().map.applyFilter;
    const currentPorjects = store.getState().map.galleryProjectsV2;
    datasets
      .postData(
        `${SERVER.GALLERY_PROJECTS_V2}?limit=20&page=${page}`,
        optionsProjects(filterOptions, filterComponent, coordinates, applyFilter),
        datasets.getToken(),
      )
      .then(galleryProject => {
        const galleryProjects = {
          count: currentPorjects.count,
          projects: [currentPorjects.projects, galleryProject.projects].flat(),
        };
        dispatch({ type: types.GALLERY_PROJECTS_V2, galleryProjects });
      });
  };
};
export const getProjectsFilteredIds = () => {
  return (dispatch: Function, getState: Function) => {
    const {
      map: {
        filterCoordinates: coordinates,
        filterProjectOptions: filterOptions,
        filterComponentOptions: filterComponent,
      },
    } = getState();
    const controller = getAndDispatchAbortableCtrl(dispatch, 'getProjectsFilteredIds');
    datasets
      .postData(
        SERVER.GALLERY_FILTERED_PROJECTS_ID,
        optionsProjects(filterOptions, filterComponent, coordinates, false),
        datasets.getToken(),
        controller.signal,
      )
      .then(projectsids => {
        dispatch({ type: types.GALLERY_PROJECTS_IDS_V2, projectsids });
      })
      .catch(err => {
        if (!isAbortError(err)) {
          console.log('getProjectsFilteredIds', err);
        }
      });
  };
};

export const setSpinMapLoaded = (spin: boolean) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SET_SPIN_MAP_LOADED, spin: spin });
  };
};

export const setSelectedPopup = (currentPopup: number) => {
  return (dispatch: Function) => {
    dispatch({ type: types.CHANGE_CURRENT_POPUP, currentPopup: currentPopup });
  };
};

export const getDetailedPageProject = (id: number) => {
  return (dispatch: Function) => {
    dispatch({ type: detailedTypes.REPLACE_VALUE_SPIN });
    datasets.getData(SERVER.V2_DETAILED_PAGE(id), datasets.getToken()).then(detailed => {
      dispatch({ type: detailedTypes.REPLACE_DETAILED_PAGE, detailed });
    });
    /*
            datasets.getData(SERVER.DETAILED_PAGE_PROJECT + '?projectid=' + id, datasets.getToken()).then(detailed => {
                dispatch({ type: detailedTypes.REPLACE_DETAILED_PAGE, detailed });
            });
        */
  };
};
export const getDetailedPageProblem = (id: string) => {
  return (dispatch: Function) => {
    dispatch({ type: detailedTypes.REPLACE_VALUE_SPIN });
    datasets.getData(SERVER.PROBLEM_BY_ID + '/' + id, datasets.getToken()).then(detailed => {
      dispatch({ type: detailedTypes.REPLACE_DETAILED_PAGE, detailed });
    });
  };
};
export const resetDetailed = () => {
  return (dispatch: Function) => {
    dispatch({ type: detailedTypes.RESET_DETAILED });
  };
};

export const existDetailedPageProject = (url: string) => {
  return (dispatch: Function) => {
    dispatch({ type: detailedTypes.DISPLAY_MODAL, spin: false });
    datasets.getData(SERVER.DETAILED_PAGE_PROJECT + '?' + url, datasets.getToken()).then(detailed => {
      if (detailed?.cartodb_id) {
        dispatch({ type: detailedTypes.DISPLAY_MODAL, spin: true });
      }
    });
  };
};
export const existDetailedPageProblem = (url: string) => {
  return (dispatch: Function) => {
    dispatch({ type: detailedTypes.DISPLAY_MODAL, spin: false });
    datasets.getData(SERVER.PROBLEM_BY_ID + '/' + url, datasets.getToken()).then(detailed => {
      if (detailed?.cartodb_id) {
        dispatch({ type: detailedTypes.DISPLAY_MODAL, spin: true });
      }
    });
  };
};
export const getParamsFilter = (bounds: string) => {
  return (dispatch: Function) => {
    dispatch(setSpinFilter(true));
    datasets.getData(SERVER.PARAM_FILTERS + '?bounds=' + bounds).then(params => {
      if (params.components && params.problems && params.projects) {
        dispatch({ type: types.GET_PARAM_FILTERS, params });
      }
      dispatch(setSpinFilter(false));
    });
  };
};

export const getParamFilterProjects = (bounds: string, data?: any) => {
  return (dispatch: Function) => {
    const controller = getAndDispatchAbortableCtrl(dispatch, 'getParamFilterProjects');
    datasets
      .postData(`${SERVER.PARAM_FILTER_PROJECTS}?bounds=${bounds}`, data || {}, datasets.getToken(), controller.signal)
      .then((params: any) => {
        if (params) {
          const projectsCounters = params['data'];
          dispatch({ type: types.GET_PARAM_FILTER_PROJECTS, params: projectsCounters });
        }
      })
      .catch(err => {
        if (!isAbortError(err)) {
          console.log('getParamFilterProjects', err);
        }
      });
    dispatch(getGalleryProjects('paramfilter'));
  };
};

export const getParamFilterProjectsNoBounds = (data?: any) => {
  return (dispatch: Function) => {
    const controller = getAndDispatchAbortableCtrl(dispatch, 'getParamFilterProjectsNoBounds');
    datasets
      .postData(SERVER.PARAM_FILTER_PROJECTS, data || {}, datasets.getToken(), controller.signal)
      .then((params: any) => {
        if (params) {
          const projectsCounters = params['data'];
          dispatch({ type: types.GET_PARAM_FILTER_PROJECTS, params: projectsCounters });
        }
      })
      .catch(err => {
        if (!isAbortError(err)) {
          console.log('getParamFilterProjectsNoBounds', err);
        }
      });
  };
};

export const getProblemCounter = (bounds: string, options: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.COUNTER_PROBLEMS + '?bounds=' + bounds, options).then(params => {
      if (params) {
        dispatch({ type: types.SET_COUNTER_TAB, key: 'problems', total: params.total });
      }
    });
  };
};
export const getProjectCounter = (bounds: string, options: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.COUNTER_PROJECTS + '?bounds=' + bounds, options).then(params => {
      if (params) {
        dispatch({ type: types.SET_COUNTER_TAB, key: 'projects', total: params.total });
      }
    });
  };
};
export const getComponentsCounter = (bounds: string, options: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.COUNTER_COMPONENTS + '?bounds=' + bounds, options).then(params => {
      if (params) {
        dispatch({ type: types.SET_COUNTER_TAB, key: 'components', total: params.total });
      }
    });
  };
};
export const getParamFilterProblems = (bounds: string, data?: any) => {
  if (data) {
    data.county = data.county.replace('County', '').trim();
    data.servicearea = data.servicearea.replace('Service Area', '').trim();
  }
  return (dispatch: Function) => {
    const controller = getAndDispatchAbortableCtrl(dispatch, 'getParamFilterProblems');
    datasets
      .postData(`${SERVER.PARAM_FILTER_PROBLEMS}?bounds=${bounds}`, data || {}, datasets.getToken(), controller.signal)
      .then(params => {
        if (params) {
          dispatch({ type: types.GET_PARAM_FILTER_PROBLEMS, params });
        }
      })
      .catch(e => {
        if (!isAbortError(e)) {
          console.log('getParamFilterProblems', e);
        }
      });
  };
};

export const getParamFilterComponents = (bounds: string, data?: any) => {
  return (dispatch: Function) => {
    const controller = getAndDispatchAbortableCtrl(dispatch, 'PARAM_FILTER_COMPONENTS');
    datasets
      .postData(
        SERVER.PARAM_FILTER_COMPONENTS + '?bounds=' + bounds,
        data || {},
        datasets.getToken(),
        controller.signal,
      )
      .then(params => {
        if (params) {
          dispatch({ type: types.GET_PARAM_FILTER_COMPONENTS, params });
        }
      })
      .catch(err => {
        if (!isAbortError(err)) {
          console.log('getParamFilterComponents', err);
        }
      });
  };
};

export const getParamFilterComponentsDefaultBounds = (data?: any) => {
  return (dispatch: Function) => {
    const controller = getAndDispatchAbortableCtrl(dispatch, 'PARAM_FILTER_COMPONENTS_NOBOUNDS');
    datasets
      .postData(SERVER.PARAM_FILTER_COMPONENTS_DB_NOBOUNDS, data || {}, datasets.getToken(), controller.signal)
      .then(params => {
        if (params) {
          dispatch({ type: types.GET_PARAM_FILTER_COMPONENTS_NOBOUNDS, params });
        }
      })
      .catch(err => {
        if (!isAbortError(err)) {
          console.log('getParamFilterComponents', err);
        }
      });
  };
};

export const getComponentsByProblemId = (data: any) => {
  return (dispatch: Function) => {
    dispatch({ type: types.LOADER_TABLE_COMPONENTS, spin: true });
    if (data.id) {
      datasets.postData(SERVER.COMPONENTS_BY_ENTITYID, data, datasets.getToken()).then(data => {
        let params = data.map((value: any) => {
          return {
            ...value,
            estimated_cost: value.estimated_cost,
            percen: value.percen,
            original_cost: value.original_cost,
          };
        });
        dispatch({ type: types.GET_COMPONENTS_BY_PROBLEMID, params });
        dispatch({ type: types.LOADER_TABLE_COMPONENTS, spin: false });
      });
    } else {
      dispatch({ type: types.GET_COMPONENTS_BY_PROBLEMID, params: [] });
      dispatch({ type: types.LOADER_TABLE_COMPONENTS, spin: false });
    }
  };
};
export const setLabelFilterProblems = (filters: any) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SET_LABELS_FILTER_PROBLEMS, filters });
  };
};
export const setLabelFilterProjects = (filters: any) => {
  return async (dispatch: Function) => {
    dispatch({ type: types.SET_LABELS_FILTER_PROJECTS, filters });
  };
};
export const setSpinFilter = (spin: boolean) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SET_SPIN_FILTER, spin });
  };
};
export const setNameZoomArea = (name: string) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SET_NAME_ZOOMAREA, name });
  };
};
export const setToggleModalFilter = (toggle: boolean) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SET_TOOGLE_MODAL, toggle });
  };
};
export const setOpacityLayer = (value: boolean) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SET_OPACITY_LAYER, value });
  };
};
export const setCoordinatesJurisdiction = (coordinates: any) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SET_COORDINATES_JURISDICTION, coordinates });
  };
};
export const setFilterTabNumber = (tab: string) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SET_FILTER_TAB_NUMBER, tab });
  };
};
export const setTabCards = (tab: string) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SET_TAB_CARDS, tab });
  };
};

export const setBoundMap = (bounds: string) => {
  return (dispatch: Function) => {
    dispatch({ type: projectTypes.RESET_NEXT_PAGE });
    dispatch({ type: projectTypes.RESET_INFINITE_SCROLL_ITEM });
    dispatch({ type: projectTypes.RESET_INFINITE_SCROLL_ITEM_HAS_MORE_ITEMS });
    dispatch({ type: types.SET_BOUNDS_MAP, bounds });
  };
};
export const setHighlighted = (data: any) => {
  return (dispatch: Function) => {
    dispatch({ type: types.GET_HIGHLIGHTED, data });
  };
};

export const setSelectedOnMap = (id: number, tab: string) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SET_SELECTED_ON_MAP, id, tab });
  };
};

export const mapSearchQuery = (query: string) => {
  return (dispatch: Function) => {
    if (!query) {
      dispatch({ type: types.MAP_SEARCH_QUERY, search: [] });
      return;
    }
    datasets.getData(SERVER.MAP_SEARCH + '/' + query, datasets.getToken()).then(search => {
      search = search.sort((a:any, b:any) => b.relevance - a.relevance);
      dispatch({ type: types.MAP_SEARCH_QUERY, search });
    });
  };
};

export const setApplyFilter = (applyFilter: boolean) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SET_APPLY_FILTERS, applyFilter });
  };
};
export const getComponentsByProjid = (projectid: number, setCounter: Function) => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GET_COMPONENTS_BY_PROJECT(projectid), datasets.getToken()).then(components => {
      setCounter(components.length);
    });
  };
};
export const getComponentCounter = (id: number, type: string, setCountComponents: Function) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.COMPONENT_COUNTER, { value: id, column: type }, datasets.getToken()).then(components => {
      const auxComponent = { ...components };
      setCountComponents(auxComponent);
    });
  };
};

export const setZoomProjectOrProblem = (zoom: any) => {
  return (dispatch: Function) => {
    dispatch({ type: types.ZOOM_PROJECT_OR_PROBLEMS, zoom });
  };
};

export const setAutocomplete = (autocomplete: string) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SET_AUTOCOMPLETE, autocomplete });
  };
};

export const setBBOXComponents = (bboxComponents: any) => {
  return (dispatch: Function) => {
    dispatch({ type: types.BBOX_COMPONENTS, bboxComponents });
  };
};

export const getBBOXComponents = (table: string, id: number) => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.BBOX_COMPONENTS + '?table=' + table + '&id=' + id).then(bboxComponents => {
      if (bboxComponents) {
        dispatch({ type: types.BBOX_COMPONENTS, bboxComponents });
      }
    });
  };
};

export const addFavorite = (email: string, id: number, isProblem: boolean) => {
  return (dispatch: Function) => {
    const suffix = isProblem ? '&isProblem=1' : '';
    datasets.getData(SERVER.ADD_FAVORITE + '?id=' + id + suffix, datasets.getToken()).then(favorite => {
      favorite.id = +favorite.id;
      dispatch({ type: types.ADD_FAVORITE, favorite });
    });
  };
};

export const deleteFavorite = (email: string, id: number, table: string) => {
  return (dispatch: Function) => {
    datasets
      .deleteDataWithBody(SERVER.DELETE_FAVORITE, { email: email, id: id, table: table }, datasets.getToken())
      .then(favorite => {
        dispatch({ type: types.DELETE_FAVORITE, favorite: { id: id, table: table } });
      });
  };
};

export const favoriteList = (isProblem: boolean) => {
  return (dispatch: Function) => {
    const suffix = isProblem ? '?isProblem=1' : '';
    const controller = getAndDispatchAbortableCtrl(dispatch, 'favoriteList');
    datasets
      .getData(SERVER.FAVORITES + suffix, datasets.getToken(), controller.signal)
      .then(favorites => {
        dispatch({ type: types.FAVORITE_LIST, favorites });
      })
      .catch(err => {
        if (!isAbortError(err)) {
          console.log('favoriteList', err);
        }
      });
  };
};

export const favoriteCards = (email: string, isproblem: boolean, extraOptions?: any) => {
  return (dispatch: Function) => {
    dispatch({ type: types.FAVORITE_LOADER, favoritesLoader: 1 });
    let sendData: any = { email: email, isproblem: isproblem };
    if (extraOptions) {
      sendData = {
        ...sendData,
        ...{ name: extraOptions.keyword, sortby: extraOptions.column, sorttype: extraOptions.order },
      };
    }
    datasets.postData(SERVER.FAVORITE_CARDS, sendData, datasets.getToken()).then(favoriteCards => {
      if (isproblem) {
        dispatch({ type: types.FAVORITE_CARDS_PROBLEMS, favoriteProblemCards: favoriteCards });
        dispatch({ type: types.FAVORITE_LOADER, favoritesLoader: -1 });
      } else {
        dispatch({ type: types.FAVORITE_CARDS_PROJECTS, favoriteProjectCards: favoriteCards });
        dispatch({ type: types.FAVORITE_LOADER, favoritesLoader: -1 });
      }
    });
  };
};

export const changeTutorialStatus = (tutorialStatus: boolean) => {
  return (dispatch: Function) => {
    dispatch({ type: types.TUTORIAL_STATUS, tutorialStatus });
  };
};
