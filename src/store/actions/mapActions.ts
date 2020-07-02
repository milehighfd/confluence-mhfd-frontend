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

export const saveLayersCheck = (selectedLayer: any) => {
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
    return ((options.keyword ? ('name=' + options.keyword + '&') : '') + (options.cost ? ('cost=' + options.cost + '&') : '') +
        (options.priority ? ('priority=' + options.priority + '&') : '') + (options.solutionstatus ? ('solutionstatus=' + options.solutionstatus + '&') : '') +
        (options.county ? ('county=' + options.county + '&') : '') + (options.jurisdiction ? ('jurisdiction=' + options.jurisdiction + '&') : '') +
        (options.mhfdmanager ? ('mhfdmanager=' + options.mhfdmanager + '&') : '') + (options.problemtype ? ('problemtype=' + options.problemtype + '&') : '') +
        (options.source ? ('source=' + options.source + '&') : '') + (options.components ? ('components=' + options.components + '&') : '') + 
        (filterComponent.component_type ? ('componenttype=' + filterComponent.component_type + '&') : '') + (filterComponent.status ? ('componentstatus=' + filterComponent.status + '&') : '') + 
        (filterComponent.mhfdmanager ? ('watershed=' + options.mhfdmanager + '&') : '') + (filterComponent.jurisdiction ? ('jurisdictionComp=' + filterComponent.jurisdiction + '&') : '') + 
        (filterComponent.county ? ('countyComp=' + filterComponent.county + '&') : '') + (filterComponent.yearofstudy ? ('yearofstudy=' + filterComponent.yearofstudy + '&') : '') +
        (filterComponent.estimatedcost ? ('estimatedcostComp=' + filterComponent.estimatedcost + '&') : '') +
        'sortby=' + options.column + '&sorttype=' + options.order + '&bounds=' + coordinates);
}
const optionsProjects = (options: OptionProjects, filterComponent: OptionComponents, coordinates: string) => {
    return ((options.keyword ? ('name=' + options.keyword + '&') : '') + (options.projecttype ? ('projecttype=' + options.projecttype + '&') : '') +
        (options.status ? ('status=' + options.status + '&') : '') + (options.startyear ? ('startyear=' + options.startyear + '&') : '') +
        (options.completedyear ? ('completedyear=' + options.completedyear + '&') : '') + (options.mhfddollarsallocated ? ('mhfddollarsallocated=' + options.mhfddollarsallocated + '&') : '') +
        (options.lgmanager ? ('lgmanager=' + options.lgmanager + '&') : '') + (options.streamname ? ('streamname=' + options.streamname + '&') : '') + 
        (options.creator ? ('creator=' + options.creator + '&') : '') + (options.totalcost ? ('totalcost=' + options.totalcost + '&') : '') +
        (options.workplanyear ? ('workplanyear=' + options.workplanyear + '&') : '') + (options.problemtype ? ('problemtype=' + options.problemtype + '&') : '') + 
        (options.mhfdmanager ? ('mhfdmanager=' + options.mhfdmanager + '&') : '') + (options.jurisdiction ? ('jurisdiction=' + options.jurisdiction + '&') : '') +
        (options.county ? ('county=' + options.county + '&') : '') + (filterComponent.estimatedcost ? ('estimatedcostComp=' + filterComponent.estimatedcost + '&') : '') +
        (filterComponent.component_type ? ('componenttype=' + filterComponent.component_type + '&') : '') + (filterComponent.status ? ('componentstatus=' + filterComponent.status + '&') : '') + 
        (filterComponent.mhfdmanager ? ('watershed=' + options.mhfdmanager + '&') : '') + (filterComponent.jurisdiction ? ('jurisdictionComp=' + filterComponent.jurisdiction + '&') : '') + 
        (filterComponent.county ? ('countyComp=' + filterComponent.county + '&') : '') + (filterComponent.yearofstudy ? ('yearofstudy=' + filterComponent.yearofstudy + '&') : '') +
        'sortby=' + options.column + '&sorttype=' + options.order + '&bounds=' + coordinates);
}

export const setFilterCoordinates = (coordinates: string) => {
    return (dispatch: Function) => {
        dispatch({type: types.SET_FILTER_COORDINATES, coordinates});
        dispatch(getGalleryProblems());
        dispatch(getGalleryProjects());
    }
}

export const setFilterProblemOptions = (filters: OptionProblems) => {
    const auxFilter = {
        problemname: filters.keyword,
        solutioncost: [] as string[],
        problempriority: filters.priority,
        solutionstatus: [] as string[],
        county: filters.county,
        jurisdiction: filters.jurisdiction,
        mhfdmanager: filters.mhfdmanager,
        problemtype: filters.problemtype,
        source: filters.source,
        components: filters.components
    }
    const solutioncost = filters.cost.split(',');
    console.log('size:::', filters.cost.length);
    
    const auxSolutionCost = [];
    for (let index = 0; index < solutioncost.length && filters.cost.length; index++) {
        const element = solutioncost[index];
        auxSolutionCost.push(element === '1' ? '1000000,10000000' : ((element === '5')? '5000000,10000000': ((element === '10') ? '10000000,15000000' : '20000000,25000000')));
    }
    auxFilter.solutioncost = auxSolutionCost;
    const solutionstatus = filters.solutionstatus.split(',');
    const auxSolutionStatus = []
    for (let index = 0; index < solutionstatus.length && filters.solutionstatus.length; index++) {
        const element = solutionstatus[index];
        auxSolutionStatus.push(element === '10' ? '10,25' : element === '25'? '25,50': element === '50' ? '50,75' : '75,100');
    }
    auxFilter.solutionstatus = auxSolutionStatus;
    return (dispatch: Function) => {
        dispatch({type: types.SET_FILTER_PROBLEM_OPTIONS, filters});
        dispatch({type: types.SET_FILTER_PROBLEMS, filters: auxFilter})
        
    }
}

export const setFilterProjectOptions = (filters: OptionProjects) => {
    const auxFilter = {
        projectname: filters.keyword,
        projecttype: filters.projecttype,
        status: filters.status,
        startyear: filters.startyear,
        completedyear: filters.completedyear,
        mhfddollarsallocated: [] as string[],
        lgmanager: filters.lgmanager,
        streamname: filters.streamname,
        creator: filters.creator,
        estimatedcost: [] as string[],
        finalcost: [] as string[],
        workplanyr: filters.workplanyear, // workplanyr1, workplanyr2, workplanyr3, workplanyr4, workplanyr5
        problemtype: filters.problemtype, // not exist in tables
        mhfdmanager: filters.mhfdmanager,
        jurisdiction: filters.jurisdiction,
        county: filters.county
    }
    const totalcost = filters.totalcost.split(',');
    const auxCost = [];
    for (let index = 0; index < totalcost.length && filters.totalcost.length; index++) {
        const element = totalcost[index];
        auxCost.push(element === '0' ? '0,5000000' : ((element === '5')? '5000000,10000000': ((element === '10') ? '10000000,15000000' : (element === '15') ? '15000000,20000000' :'20000000,25000000')));
    }
    auxFilter.estimatedcost = auxCost;
    auxFilter.finalcost = auxCost;
    const mhfddollarsallocated = filters.mhfddollarsallocated.split(',');
    const auxmhfddollarsallocated = [];
    for (let index = 0; index < mhfddollarsallocated.length && filters.mhfddollarsallocated.length; index++) {
        const element = mhfddollarsallocated[index];
        auxmhfddollarsallocated.push(element === '1' ? '1000000,5000000' : ((element === '5')? '5000000,10000000': ((element === '10') ? '10000000,15000000' : (element === '15') ? '15000000,20000000' :'20000000,25000000')));
    }
    auxFilter.mhfddollarsallocated = auxmhfddollarsallocated;
    return (dispatch: Function) => {
        dispatch({type: types.SET_FILTER_PROJECT_OPTIONS, filters});
        dispatch({type: types.SET_FILTER_PROJECTS, filters: auxFilter});
    }
}

export const setFilterComponentOptions = (filters: OptionComponents) => {
    const auxFilter = {
        component_type: filters.component_type,
        status: filters.status,
        yearofstudy: filters.yearofstudy,
        estimatedcost: [] as string[],
        jurisdiction: filters.jurisdiction,
        county: filters.county,
        mhfdmanger: filters.mhfdmanager
    }
    const estimatedcost = filters.estimatedcost.split(',');
    const auxCost = [];
    for (let index = 0; index < estimatedcost.length && filters.estimatedcost.length; index++) {
        const element = estimatedcost[index];
        auxCost.push(element === '0' ? '0,2000000' : ((element === '2')? '2000000,4000000': ((element === '4') ? '4000000,6000000' : (element === '6') ? '6000000,8000000' :'8000000,10000000')));
    }
    auxFilter.estimatedcost = auxCost;
    return (dispatch: Function) => {
        dispatch({type: types.SET_FILTER_COMPONENT_OPTIONS, filters});
        dispatch({type: types.SET_FILTER_COMPONENTS, filters: auxFilter});
    }
}

export const getGalleryProblems = () => {
    const coordinates = store.getState().map.filterCoordinates;
    const filterOptions = store.getState().map.filterProblemOptions;
    const filterComponent = store.getState().map.filterComponentOptions;
    return (dispatch: Function) => {
        dispatch({type: types.SET_SPIN_CARD_PROBLEMS, spin: true });
        datasets.getData(SERVER.GALLERY_PROBLEMS + '&' + options(filterOptions, filterComponent, coordinates), datasets.getToken()).then(galleryProblems => {
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
        datasets.getData(SERVER.GALLERY_PROJECTS + optionsProjects(filterOptions, filterComponent, coordinates), datasets.getToken()).then(galleryProjects => {
            if (galleryProjects?.length >= 0) {
               dispatch({type: types.GALLERY_PROJECTS, galleryProjects}); 
            }
            dispatch({type: types.SET_SPIN_CARD_PROJECTS, spin: false });
        });
    }
}

export const getDetailedPageProject = (id: number) => {
    return (dispatch: Function) => {
        dispatch({type: detailedTypes.REPLACE_VALUE_SPIN})
        datasets.getData(SERVER.PROJECT_BY_ID  + '/' + id, datasets.getToken()).then(detailed => {
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
export const getParamsFilter = () => {
    return (dispatch: Function) => {
        dispatch(setSpinFilter(true));
        datasets.getData(SERVER.PARAM_FILTERS).then(params => {
            dispatch(setSpinFilter(false));
            dispatch({type: types.GET_PARAM_FILTERS, params});
        })
    }
}
export const getComponentsByProblemId = (data: any) => {
    return (dispatch: Function) => {
        datasets.postData(SERVER.COMPONENTS_BY_PROBLEMID, data).then(params => {
            dispatch({type: types.GET_COMPONENTS_BY_PROBLEMID, params});
        })
    }
}

export const setSpinFilter = (spin: boolean) => {
    return (dispatch: Function) => {
        dispatch({type: types.SET_SPIN_FILTER, spin })
    }
}

export const setHighlighted = (data: any) => {
    return (dispatch: Function) => {
        dispatch({type: types.GET_HIGHLIGHTED, data});
    };
}