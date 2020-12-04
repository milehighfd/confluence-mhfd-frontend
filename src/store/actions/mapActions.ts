//mapactions
import * as types from '../types/mapTypes';

import * as detailedTypes from '../types/detailedTypes';
import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";
import * as constants from '../../constants/constants';
import { TotalType, ProjectTypes, OptionProblems, OptionProjects, OptionComponents } from '../../Classes/MapTypes';
import { ComponentType } from 'react';
import store from '..';
import { dispatch } from 'd3';

export const getReverseGeocode = (lat : number, lng : number, accessToken : string) => {
    /* Intentionally Commented By The Other API Proposal and Backup*/
    return (dispatch : Function) => {
        const url = "https://revgeocode.search.hereapi.com/v1/revgeocode?at=" + lng + "%2C" + lat + "&apiKey=" + accessToken;
        // const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + lat + "," + lng + ".json?types=place&access_token=" + accessToken;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const feature = data.items[0];
                dispatch({ type: types.SET_REVERSE_GEOCODE, county: feature?feature.address.county:'' });
            })
            // .then(data => dispatch({ type: types.SET_REVERSE_GEOCODE, county: data.features[0].text }))
            .catch(err =>  dispatch({ type: types.GEOCODE_REQUEST_ERROR, err }));
    }
}

export const savePolygonCoordinates = (polygon : Array<[]>) => {
    return (dispatch : Function) => {
        dispatch({ type: types.SAVE_POLYGON_COORDS, polygon });
    }
}

export const saveMarkerCoordinates = (marker : Array<[]>) => {
    return (dispatch : Function) => {
        dispatch({ type: types.SAVE_MARKER_COORDS, marker });
    }
}

export const saveNewCapitalForm = (data : ProjectTypes, components: Array<ComponentType>, total: TotalType, files: Array<[]>) => {
    return (dispatch : Function) => {
        if(components.length) {
            const newProject : ProjectTypes = {
                ...data,
                finalCost: total ? total.total : 0, 
                additionalCost: total ? total.additional?.additionalCost : 0, 
                additionalCostDescription: total ? total.additional?.additionalCostDescription : '', 
                overheadCost: total ? total.overhead?.overheadCost : 0, 
                overheadCostDescription: total ? total.overhead?.overheadCostDescription : '',
                components: JSON.stringify(components)
            };

            dispatch(createNewProjectForm(newProject, files));
        } else {
            dispatch({ type: types.SET_ERROR_MESSAGE, error: constants.NO_COMPONENTS_ERROR });
        }
    }
}

export const saveNewStudyForm = (data: ProjectTypes) => {
    return (dispatch : Function, getState : Function) => {
        const state = getState();
        const county = state.map.newProject.jurisdiction;
        const coordinates = state.map.newProject.coordinates;

        if(coordinates.length) {
            const dataForm : FormData = new FormData();
            for (const key in data) {
                dataForm.append(key, '' + data[key]); 
            }
            
            dataForm.append('jurisdiction', county);
            dataForm.append('coordinates', JSON.stringify(coordinates));
            datasets.postDataMultipart(SERVER.CREATE_PROJECT, dataForm, datasets.getToken()).then(res => {
                if (res?._id) {
                    dispatch(setRouteRedirect(true));
                }
            });
        } else {
            dispatch({ type: types.SET_ERROR_MESSAGE, error: constants.NO_POLYGON_ERROR });
        }

    }
}

export const createNewProjectForm = (data: ProjectTypes, files: Array<any>) => {
    return (dispatch : Function, getState : Function) => {
        const state = getState();
        const county = state.map.newProject.jurisdiction;
        const coordinates = state.map.newProject.coordinates;

        if (coordinates.length) {
            const dataForm : FormData = new FormData();
            for (const key in data) {
                dataForm.append(key, '' + data[key]); 
            }
            dataForm.append('county', county);
            dataForm.append('coordinates', JSON.stringify(coordinates));
            if(files) {
                for (const file of files) {
                    dataForm.append('file', file.originFileObj);
                }
            }

            datasets.postDataMultipart(SERVER.CREATE_PROJECT, dataForm, datasets.getToken()).then(project => {
                if (project?._id) {
                    dispatch(setRouteRedirect(true));
                }
            });
        } else {
            dispatch({ type: types.SET_ERROR_MESSAGE, error: constants.NO_POLYGON_ERROR });
        }
    }
}

export const clearErrorMessage = () => {
    return (dispatch : Function) => {
        dispatch({ type: types.SET_ERROR_MESSAGE, error: '' });
    }
}

export const setRouteRedirect = (status : boolean) => {
    return (dispatch : Function) => {
        dispatch({ type: types.SET_REDIRECT, status });
    }
}

export const clearCoordinates = () => {
    return (dispatch : Function) => {
        dispatch({ type: types.CLEAR_COORDINATES });
    }
}

export const getMapTables = (trigger : string, name? : string) => {
    return (dispatch: Function, getState: Function) => {
        const state = getState();
        const layers = { ...state.map.layers };
        
        if(!layers[trigger]) {
            const requestData = { table: trigger };
            datasets.postData(SERVER.MAP_TABLES, requestData, datasets.getToken()).then(tiles => {
                if (name) dispatch({ type: types.GET_MAP_WITH_SUBLAYERS, data: { trigger, tiles, name } });
                else dispatch({ type: types.GET_MAP_LAYERS, data: { trigger, tiles } });
            });
        }
    }
}

export const getPolygonStreams = (coordinates : Array<Array<number>>) => {
    return (dispatch : Function) => {
        /* https://postgis.net/docs/ST_GeomFromGeoJSON.html */
        /* in this particular case uncomment the turf call in Map.tsx (line 232) */

        /* https://postgis.net/docs/ST_GeomFromText.html */
        let postGisQuery = "'POLYGON((";
        coordinates.forEach((points : Array<number>) => {
            points.forEach((point : number) => postGisQuery += (point + ','));
        });
        postGisQuery = postGisQuery.slice(0, -1) + "))'";

        // console.log(coordinates);  --> for getting POSTGIS GEOJSON format
        // console.log(postGisQuery); --> for getting the POSTGIS normal format
    }
}

export const updateSelectedLayers = (selectedLayer: any) => {
    return (dispatch : Function) => {
        dispatch({ type: types.SELECTED_LAYERS, selectedLayer });
    }
}
export const resetMap = () => {
    return (dispatch : Function) => {
        dispatch({ type: types.RESET_MAP});
    }
}

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
    return applyFilter ? {
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
        sortby: options.column,
        sorttype: options.order,
        bounds: coordinates
    }: {
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
        sortby: options.column,
        sorttype: options.order
    }
}
const optionsProjects = (options: OptionProjects, filterComponent: OptionComponents, coordinates: string) => {
    const applyFilter = store.getState().map.applyFilter;
    let servicearea = '';
    if (options.servicearea) {
        servicearea = options.servicearea;
    } else {
        if (filterComponent.servicearea) {
            servicearea = filterComponent.servicearea;
        }
    }
    return applyFilter? {
        name: options.keyword,
        projecttype: options.projecttype,
        status: options.status,
        startyear: options.startyear,
        completedyear: options.completedyear,
        mhfddollarsallocated: options.mhfddollarsallocated,
        lgmanager: options.lgmanager,
        streamname: options.streamname,
        creator: options.creator,
        totalcost: options.totalcost,
        workplanyear: options.workplanyear,
        problemtype: options.problemtype,
        mhfdmanager: options.mhfdmanager,
        jurisdiction: options.jurisdiction,
        county: options.county,
        estimatedcostComp: filterComponent.estimatedcost,
        componenttype: filterComponent.component_type,
        componentstatus: filterComponent.status,
        watershed: options.mhfdmanager,
        jurisdictionComp: filterComponent.jurisdiction,
        countyComp: filterComponent.county,
        yearofstudy: filterComponent.yearofstudy,
        sortby: options.column,
        sorttype: options.order,
        bounds: coordinates,
        consultant: options.consultant,
        contractor: options.contractor,
        servicearea: servicearea //options.servicearea
    } : {
        name: options.keyword,
        projecttype: options.projecttype,
        status: options.status,
        startyear: options.startyear,
        completedyear: options.completedyear,
        mhfddollarsallocated: options.mhfddollarsallocated,
        lgmanager: options.lgmanager,
        streamname: options.streamname,
        creator: options.creator,
        totalcost: options.totalcost,
        workplanyear: options.workplanyear,
        problemtype: options.problemtype,
        mhfdmanager: options.mhfdmanager,
        jurisdiction: options.jurisdiction,
        county: options.county,
        estimatedcostComp: filterComponent.estimatedcost,
        componenttype: filterComponent.component_type,
        componentstatus: filterComponent.status,
        watershed: options.mhfdmanager,
        jurisdictionComp: filterComponent.jurisdiction,
        countyComp: filterComponent.county,
        yearofstudy: filterComponent.yearofstudy,
        consultant: options.consultant,
        contractor: options.contractor,
        servicearea: servicearea, // filterComponent.servicearea,
        sortby: options.column,
        sorttype: options.order
    }
}

export const setFilterCoordinates = (coordinates: string, tab: string) => {
    return (dispatch: Function) => {
        dispatch({type: types.SET_FILTER_COORDINATES, coordinates});
        if (tab === constants.PROBLEMS_TRIGGER) {
            dispatch(getGalleryProblems());
        } else {
            dispatch(getGalleryProjects());
        }
    }
}
export const replaceFilterCoordinates = (coordinates: string) => {
    return (dispatch: Function) => {
        dispatch({type: types.SET_FILTER_COORDINATES, coordinates});
    }
}
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
        keyword
    }
    const solutionstatus = filters.solutionstatus.split(',');
    const auxSolutionStatus = []
    for (let index = 0; index < solutionstatus.length && filters.solutionstatus.length; index++) {
        const element = solutionstatus[index];
        auxSolutionStatus.push(element === '10' ? '10,25' : element === '25'? '25,50': element === '50' ? '50,75' : '75,100');
    }
    auxFilter.solutionstatus = auxSolutionStatus;
    return (dispatch: Function) => {
        dispatch({type: types.SET_FILTER_PROBLEM_OPTIONS, filters});
        const params = '?tables=' + filters.components;
        if(filters.components) {
           datasets.getData(SERVER.GET_FILTER_COMPONENTS_FOR_PROBLEMS + params, datasets.getToken()).then(tables => {
                if (tables?.length >= 0) {
                    auxFilter.components = tables;
                    dispatch({type: types.SET_FILTER_PROBLEMS, filters: auxFilter})
                }
            }); 
        } else {
            dispatch({type: types.SET_FILTER_PROBLEMS, filters: auxFilter})
        }
    }
}

export const setFilterProjectOptions = (filters: OptionProjects) => {
    const keyword = store.getState().map.filterProjects.keyword;
    const auxFilter = {
        projectname: filters.keyword,
        projecttype: filters.projecttype,
        status: filters.status,
        startyear: filters.startyear ? (''+ filters.startyear) : '0',
        completedyear: filters.completedyear ? (''+ filters.completedyear) : '9999',
        mhfddollarsallocated: filters.mhfddollarsallocated,
        lgmanager: filters.lgmanager,
        streamname: filters.streamname,
        creator: filters.creator,
        estimatedcost: filters.totalcost,
        finalcost: filters.totalcost,
        workplanyr: filters.workplanyear, // workplanyr1, workplanyr2, workplanyr3, workplanyr4, workplanyr5
        // problemtype: filters.problemtype as any, // not exist in tables
        mhfdmanager: filters.mhfdmanager,
        jurisdiction: filters.jurisdiction,
        county: filters.county,
        problemtypeProjects: [] as any,
        consultant: filters.consultant,
        contractor: filters.contractor,
        servicearea: filters.servicearea,
        keyword
    }
    return (dispatch: Function) => {
        dispatch({type: types.SET_FILTER_PROJECT_OPTIONS, filters});
        const params = '?problemtype=' + filters.problemtype;
        if(filters.problemtype) {
           datasets.getData(SERVER.GET_FILTER_PROBLEMTYPE_FOR_PROJECTS + params, datasets.getToken()).then(tables => {
                if (tables?.length >= 0) {
                    auxFilter.problemtypeProjects = tables;
                    dispatch({type: types.SET_FILTER_PROJECTS, filters: auxFilter});
                }
            }); 
        } else {
            dispatch({type: types.SET_FILTER_PROJECTS, filters: auxFilter});
        }
        
        
    }
}

export const setProblemKeyword = (keyword: string) => {
    const filterOptions = store.getState().map.filterProblemOptions;
    const auxFilter = {...filterOptions};
    const filterProblems = store.getState().map.filterProblems;
    const auxFilterProblems = {...filterProblems};
    auxFilter.keyword = keyword;
    return (dispatch: Function) => {
        dispatch({type: types.SET_FILTER_PROBLEM_OPTIONS, filters: auxFilter});
        const params = '?field=' + keyword;
        if(keyword) {
            datasets.getData(SERVER.SEARCH_KEYWORD_PROBLEMS + params, datasets.getToken()).then(tables => {
                if (tables?.problems.length >= 0) {
                    auxFilterProblems.keyword = tables;
                    auxFilterProblems.problemname = keyword;
                    dispatch({type: types.SET_FILTER_PROBLEMS, filters: auxFilterProblems});
                }
            }); 
        } else {
            auxFilterProblems.keyword = {};
            auxFilterProblems.problemname = keyword;
            dispatch({type: types.SET_FILTER_PROBLEMS, filters: auxFilterProblems});
        }
        
        
    }
}

export const setProjectKeyword = (keyword: string) => {
    const filterOptions = store.getState().map.filterProjectOptions;
    const auxFilter = {...filterOptions};
    const filterProjects = store.getState().map.filterProjects;
    const auxFilterProjects = {...filterProjects};
    auxFilter.keyword = keyword;
    return (dispatch: Function) => {
        dispatch({type: types.SET_FILTER_PROJECT_OPTIONS, filters: auxFilter});
        const params = '?field=' + keyword;
        if(keyword) {
            datasets.getData(SERVER.SEARCH_KEYWORD_PROJECTS + params, datasets.getToken()).then(tables => {
                if (tables?.projects_line_1?.length >= 0 || tables?.projects_polygon_?.length >= 0) {
                    auxFilterProjects.keyword = tables;
                    auxFilterProjects.projectname = keyword;
                    dispatch({type: types.SET_FILTER_PROJECTS, filters: auxFilterProjects});
                }
            });
        } else {
            auxFilterProjects.keyword = {};
            auxFilterProjects.projectname = keyword;
            dispatch({type: types.SET_FILTER_PROJECTS, filters: auxFilterProjects});
        }
    }
}

export const setFilterComponentOptions = (filters: OptionComponents) => {
    const auxFilter = {
        component_type: filters.component_type,
        status: filters.status,
        year_of_study: filters.yearofstudy,
        estimated_cost: filters.estimatedcost,
        jurisdiction: filters.jurisdiction,
        county: filters.county,
        mhfdmanager: filters.mhfdmanager,
        servicearea: filters.servicearea
    }
    // const estimatedcost = filters.estimatedcost.split(',');
    // const auxCost = [];
    // for (let index = 0; index < estimatedcost.length && filters.estimatedcost.length; index++) {
    //     const element = estimatedcost[index];
    //     auxCost.push(element === '0' ? '0,2000000' : ((element === '2')? '2000000,4000000': ((element === '4') ? '4000000,6000000' : (element === '6') ? '6000000,8000000' :'8000000,10000000')));
    // }
    // auxFilter.estimated_cost = auxCost;
    return (dispatch: Function) => {
        dispatch({type: types.SET_FILTER_COMPONENT_OPTIONS, filters});
        dispatch({type: types.SET_FILTER_COMPONENTS, filters: auxFilter});
        if(!auxFilter.component_type) {
            auxFilter.component_type = "grade_control_structure,pipe_appurtenances,special_item_point," +
                                        "special_item_linear,special_item_area,channel_improvements_linear,"+
                                        "channel_improvements_area,removal_line,removal_area,storm_drain,"+
                                        "detention_facilities,maintenance_trails,land_acquisition,landscaping_area"
        }
        datasets.postData(SERVER.FILTER_BY_COMPONENTS, auxFilter, datasets.getToken()).then(filtersComponents => {
            if(filtersComponents?.problems || filtersComponents?.projects_line_1 || filtersComponents?.projects_polygon_) {
              dispatch({type: types.FILTER_BY_COMPONENTS, filtersComponents});  
            } else {
                dispatch({type: types.FILTER_BY_COMPONENTS, filtersComponents: {}});
            }
            
        })
    }
}

export const getGalleryProblems = () => {
    const coordinates = store.getState().map.filterCoordinates;
    const filterOptions = store.getState().map.filterProblemOptions;
    const filterComponent = store.getState().map.filterComponentOptions;
    return (dispatch: Function) => {
        dispatch({type: types.SET_SPIN_CARD_PROBLEMS, spin: true });
        datasets.postData(SERVER.GALLERY_PROJECTS, options(filterOptions, filterComponent, coordinates), datasets.getToken()).then(galleryProblems => {
            if (galleryProblems?.length >= 0) {
                dispatch({type: types.GALLERY_PROBLEMS, galleryProblems});
            }
            dispatch({type: types.SET_SPIN_CARD_PROBLEMS, spin: false });
        });
    }
}

export const getGalleryProjects = () => {
    const coordinates = store.getState().map.filterCoordinates;
    const filterOptions = store.getState().map.filterProjectOptions;
    const filterComponent = store.getState().map.filterComponentOptions;
    return (dispatch: Function) => {
        dispatch({type: types.SET_SPIN_CARD_PROJECTS, spin: true });
        datasets.postData(SERVER.GALLERY_PROJECTS, optionsProjects(filterOptions, filterComponent, coordinates), datasets.getToken()).then(galleryProjects => {
            if (galleryProjects?.length >= 0) {
               dispatch({type: types.GALLERY_PROJECTS, galleryProjects}); 
            }
            dispatch({type: types.SET_SPIN_CARD_PROJECTS, spin: false });
        });
    }
}

export const setSpinMapLoaded = (spin: boolean) => {
    return (dispatch: Function) => {
        dispatch({type: types.SET_SPIN_MAP_LOADED, spin: spin});
    }
}

export const getDetailedPageProject = (id: number, cartoid: number, type: string) => {
    return (dispatch: Function) => {
        dispatch({type: detailedTypes.REPLACE_VALUE_SPIN})
        datasets.getData(SERVER.PROJECT_BY_ID  + 's?cartoid=' + cartoid + '&objectid=' + id + '&type=' + type, datasets.getToken()).then(detailed => {
            dispatch({type: detailedTypes.REPLACE_DETAILED_PAGE, detailed});
        });
    }
}
export const getDetailedPageProblem = (id: string) => {
    return (dispatch: Function) => {
        dispatch({type: detailedTypes.REPLACE_VALUE_SPIN})
        datasets.getData(SERVER.PROBLEM_BY_ID + '/' + id, datasets.getToken()).then(detailed => {
            dispatch({type: detailedTypes.REPLACE_DETAILED_PAGE, detailed});
        });
    }
}

export const existDetailedPageProject = (url: string) => {
    return (dispatch: Function) => {
        dispatch({type: detailedTypes.DISPLAY_MODAL, spin: false});
        datasets.getData(SERVER.PROJECT_BY_ID  + 's?' + url, datasets.getToken()).then(detailed => {
            if(detailed?.cartodb_id) {
                dispatch({type: detailedTypes.DISPLAY_MODAL, spin: true});
            }
        });
    }
}
export const existDetailedPageProblem = (url: string) => {
    return (dispatch: Function) => {
        dispatch({type: detailedTypes.DISPLAY_MODAL, spin: false});
        datasets.getData(SERVER.PROBLEM_BY_ID + '/' + url, datasets.getToken()).then(detailed => {
            if(detailed?.cartodb_id) {
                dispatch({type: detailedTypes.DISPLAY_MODAL, spin: true});
            }
        });
    }
}
export const getZoomAreaFilter = () => {
    return (dispatch: Function) => {
        datasets.getData(SERVER.GET_ZOOMAREA_FILTER).then(data => {
            dispatch({type: types.GET_ZOOMAREA_FILTER, data});
        })
    }
}
export const getValuesByGroupColumn = (table: string, column: string) => {
    return (dispatch: Function) => {
        const params = {
            table: table,
            column: column
        }
        datasets.postData(SERVER.GROUP_COLUMNS, params).then(data => {
            dispatch({type: types.GET_VALUES_BY_GROUP_COLUMN, data});
        } )
    }
}
export const getParamsFilter = (bounds: string) => { 
    return (dispatch: Function) => {
        dispatch(setSpinFilter(true));
        datasets.getData(SERVER.PARAM_FILTERS + '?bounds=' + bounds).then(params => {
            if(params.components && params.problems && params.projects) {
               dispatch({type: types.GET_PARAM_FILTERS, params}); 
            }
            dispatch(setSpinFilter(false));
        })
    }
}
export const getParamFilterProjects = (bounds: string) => {
    return (dispatch: Function) => {
        dispatch(setSpinFilter(true));
        datasets.getData(SERVER.PARAM_FILTER_PROJECTS + '?bounds=' + bounds).then(params => {
            if (params) {
                dispatch({type: types.GET_PARAM_FILTER_PROJECTS, params});
            }
            dispatch(setSpinFilter(false));
        })
    }
}
export const getParamFilterProblems = (bounds: string) => {
    return (dispatch: Function) => {
        dispatch(setSpinFilter(true));
        datasets.getData(SERVER.PARAM_FILTER_PROBLEMS + '?bounds=' + bounds).then(params => {
            if (params) {
                dispatch({type: types.GET_PARAM_FILTER_PROBLEMS, params});
            }
            dispatch(setSpinFilter(false));
        })
    }
}
export const getParamFilterComponents = (bounds: string) => {
    return (dispatch: Function) => {
        dispatch(setSpinFilter(true));
        datasets.getData(SERVER.PARAM_FILTER_COMPONENTS + '?bounds=' + bounds).then(params => {
            if (params) {
                dispatch({type: types.GET_PARAM_FILTER_COMPONENTS, params});
            }
            dispatch(setSpinFilter(false));
        })
    }
}
export const getComponentsByProblemId = (data: any) => {
    return (dispatch: Function) => {
        dispatch({type: types.LOADER_TABLE_COMPONENTS, spin: true})
        if(data.id) {
          datasets.postData(SERVER.COMPONENTS_BY_ENTITYID, data, datasets.getToken()).then(params => {
            dispatch({type: types.GET_COMPONENTS_BY_PROBLEMID, params});
            dispatch({type: types.LOADER_TABLE_COMPONENTS, spin: false});
          })  
        } else {
            dispatch({type: types.GET_COMPONENTS_BY_PROBLEMID, params: []});
            dispatch({type: types.LOADER_TABLE_COMPONENTS, spin: false});
        }
        
    }
}
export const setLabelFilterProblems = (filters: any) => {
    return (dispatch: Function) => {
        dispatch({type: types.SET_LABELS_FILTER_PROBLEMS, filters});
    }
}
export const setLabelFilterProjects = (filters: any) => {
    return async (dispatch: Function) => {
        dispatch({type: types.SET_LABELS_FILTER_PROJECTS, filters});
    }
}
export const setSpinFilter = (spin: boolean) => {
    return (dispatch: Function) => {
        dispatch({type: types.SET_SPIN_FILTER, spin })
    }
}
export const setNameZoomArea = (name: string) => {
    return (dispatch: Function) => {
        dispatch({type: types.SET_NAME_ZOOMAREA, name});
    }
}
export const setToggleModalFilter = (toggle: boolean) => {
    return (dispatch: Function) => {
        dispatch({type: types.SET_TOOGLE_MODAL, toggle })
    }
} 
export const setOpacityLayer = (value: boolean) => {
    return (dispatch: Function) => {
        dispatch({type: types.SET_OPACITY_LAYER, value})
    }
}
export const setCoordinatesJurisdiction = (coordinates: any) => {
    return (dispatch: Function) => {
        dispatch({type: types.SET_COORDINATES_JURISDICTION, coordinates})
    }
}
export const setFilterTabNumber = (tab: string) => {
    return (dispatch: Function) => {
        dispatch({type: types.SET_FILTER_TAB_NUMBER, tab})
    }
}
export const setTabCards = (tab: string) => {
    return (dispatch: Function) => {
        dispatch({type: types.SET_TAB_CARDS, tab});
    }
}
export const setBoundMap = (bounds: string) => {
    return (dispatch: Function) => {
        dispatch({type: types.SET_BOUNDS_MAP, bounds});
    }
}
export const setHighlighted = (data: any) => {
    return (dispatch: Function) => {
        dispatch({type: types.GET_HIGHLIGHTED, data});
    };
}

export const setSelectedOnMap = (id: number, tab: string) => {
    return (dispatch: Function) => {
        dispatch({type: types.SET_SELECTED_ON_MAP, id, tab });
    };
}

export const mapSearchQuery = (query: string) => {
    return (dispatch: Function) => {
        if (!query) {
            dispatch({type: types.MAP_SEARCH_QUERY, search: []});
            return;
        }
        datasets.getData(SERVER.MAP_SEARCH + '/' + query, datasets.getToken()).then(search => {
            dispatch({type: types.MAP_SEARCH_QUERY, search});
        })
    }
}

export const setApplyFilter = (applyFilter: boolean) => {
    return (dispatch: Function) => {
        dispatch({type: types.SET_APPLY_FILTERS, applyFilter });
    }
}
export const getComponentCounter = (id: number, type: string, setCountComponents: Function) => {
    return (dispatch: Function) => {
        datasets.postData(SERVER.COMPONENT_COUNTER, {value: id, column: type}, datasets.getToken()).then(components => {
            const auxComponent = {...components}
            setCountComponents(auxComponent);
            // dispatch({type: types.GET_COMPONENTS_COUNTER, components});
        })
    }
}

export const setZoomProjectOrProblem = (zoom: any) => {
    return (dispatch: Function) => {
        dispatch({type: types.ZOOM_PROJECT_OR_PROBLEMS, zoom});
    }
}