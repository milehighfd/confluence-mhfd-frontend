import * as types from '../types/mapTypes';
import { PROJECTS_MAP_STYLES, PROBLEMS_TRIGGER, STREAMS_FILTERS, MHFD_BOUNDARY_FILTERS, XSTREAMS } from '../../constants/constants';

const initState = {
    error: '',
    selectedOnMap: {id: -1, tab: ''},
    redirect: false,
    newProject: {
        jurisdiction: '',
        coordinates: [],
    },
    componentCounter: 0,
    problems: [
        {
            problemId: 'MJBPJCMTHH',
            problemName: 'Piney Creek Channel Restoration',
            problemPriority: 0.8,
            jurisdiction: 'Westminster',
            solutionCost: 400500,
            coordinates: [
                [-105.06420012782819, 39.81026323699689],
                [-105.05016547189382, 39.801761786974225],
                [-105.01563740444797, 39.801962845665514],
                [-105.00209398965409, 39.812460308375904],
                [-105.01509394926418, 39.826239809470394],
                [-105.03848620156825, 39.83144526752935],
                [-105.05653931104531, 39.82425471026178],
                [-105.06420012782819, 39.81026323699689]
            ]
        },
        {
            problemId: '8YHX5F3F58',
            problemName: 'West Tollgate Creek GSB Drops',
            problemPriority: 0.8,
            jurisdiction: 'Westminster',
            solutionCost: 400500,
            coordinates: [
                [-104.94271733364056, 39.80902390918499],
                [-104.93309484040513, 39.821736685950924],
                [-104.91038575636954, 39.8335604136673],
                [-104.8853672739572, 39.83060467251207],
                [-104.8853672739572, 39.81434582280457],
                [-104.90384246096927, 39.80015313755828],
                [-104.92732134446368, 39.80015313755828],
                [-104.94271733364056, 39.80902390918499]
            ]
        },
        {
            problemId: 'QHGBOM2HY2',
            problemName: 'Murphy Creek Bank Stabilization',
            problemPriority: 0.8,
            jurisdiction: 'Westminster',
            solutionCost: 400500,
            coordinates: [
                [-104.85994340215153, 39.77514841494917],
                [-104.83872293246881, 39.77721479372536],
                [-104.81408934978604, 39.76745236895647],
                [-104.80716115465655, 39.75147450575187],
                [-104.82101754491552, 39.74111650339108],
                [-104.84873032543346, 39.74466799390473],
                [-104.85758301921013, 39.7576885597112],
                [-104.85994340215153, 39.77514841494917]
            ]
        },
        {
            problemId: 'Z7AKZ06D9U',
            problemName: 'New Orleans Creek Regional Detention',
            problemPriority: 0.8,
            jurisdiction: 'Westminster',
            solutionCost: 400500,
            coordinates: [
                [-105.00144312624077, 39.76261082027116],
                [-105.02360295987883, 39.7613643976824],
                [-105.03873650480247, 39.75263880786656],
                [-105.02954828109867, 39.737262460068905],
                [-105.00666528009111, 39.729368215189425],
                [-104.98413774065709, 39.732381245118376],
                [-104.9874026014447, 39.75070767312556],
                [-105.00144312624077, 39.76261082027116]
            ]
        }
    ],
    projects: [],
    projectsByType: {
        capital: [],
        maintenance: [],
        study: [],
        propertyAcquisition: [],
        special: [],
    },
    components: [],
    layers: {} as any,
    longitude: 0,
    latitude: 0,
    selectedLayers: [PROJECTS_MAP_STYLES, PROBLEMS_TRIGGER, MHFD_BOUNDARY_FILTERS, XSTREAMS],
    galleryProblems: [],
    galleryProjects: [],
    filterProblemOptions: {
        keyword: '',
        column: 'problemname',
        order: 'asc',
        cost: [],
        priority: '',
        solutionstatus: '',
        county: '',
        jurisdiction: '',
        mhfdmanager: '',
        problemtype: '',
        source: '',
        components: '',
        servicearea: ''
    },
    filterProjectOptions: {
        keyword: '',
        column: 'projectname',
        order: 'asc',
        projecttype: 'Maintenance,Capital',
        status: 'Initiated,Preliminary Design,Construction,Final Design,Hydrology,Floodplain,Alternatives,Conceptual',
        startyear: '',
        completedyear: '',
        mhfddollarsallocated: [],
        lgmanager: '',
        streamname: '',
        creator: '',
        totalcost: [],
        workplanyear: '',
        problemtype: '',
        mhfdmanager: '',
        jurisdiction: '',
        county: '',
        consultant: '',
        constractor: '',
        servicearea: ''
    },
    filterComponentOptions: {
        component_type: '',
        status: '',
        yearofstudy: '',
        estimatedcost: [],
        jurisdiction: '',
        county: '',
        mhfdmanager: '',
        servicearea: ''
    },
    filterProblems: {
        problemname: '',
        solutioncost: [],
        problempriority: '',
        solutionstatus: [],
        county: '',
        jurisdiction: '',
        mhfdmanager: '',
        problemtype: '',
        source: '',
        components: '',
        keyword: {}
    },
    filterProjects: {
        projectname: '',
        projecttype: 'Maintenance,Capital',
        status: 'Initiated,Preliminary Design,Construction,Final Design,Hydrology,Floodplain,Alternatives,Conceptual',
        startyear: '0',
        completedyear: '9999',
        mhfddollarsallocated: [],
        lgmanager: '',
        streamname: '',
        creator: '',
        estimatedcost: [],
        finalcost: [],
        workplanyr: '', // workplanyr1, workplanyr2, workplanyr3, workplanyr4, workplanyr5
        problemtypeProjects: '', // not exist in tables
        mhfdmanager: '',
        jurisdiction: '',
        county: '',
        keyword: {}
    },
    filterComponents: {
        component_type: '',
        status: '',
        year_of_study: '',
        estimated_cost: [],
        jurisdiction: '',
        county: '',
        mhfdmanager: '',
        servicearea: ''
    },
    filterCoordinates: '-105.3236683149282,39.274174328991904,-104.48895750946532,40.26156304805423',
    paramFilters : {
        problems: {},
        projects: {},
        components: {}
    },
    componentsByProblemId: [],
    spinFilters: false,
    spinCardProblems: false,
    spinCardProjects: false,
    highlighted: {
        type: '',
        value: ''
    },
    componentDetailIds: {},
    loaderTableCompoents: false,
    mapSearch: [],
    applyFilter: true,
    zoomProblemOrProject: [],
    toggleModalFilter: false,
    tabCards: "projects",
    filterTabNumber: "projects_filter",
    boundsMap: ''
}

const mapReducer = (state = initState, action : any) => {
    switch(action.type) {
        case types.SET_REVERSE_GEOCODE: 
            return {
                ...state,
                newProject: {
                    ...state.newProject,
                    jurisdiction: action.county
                }
            }
        case types.GEOCODE_REQUEST_ERROR:
            return {
                ...state,
                error: action.err
            }
        case types.SAVE_POLYGON_COORDS:
            return {
                ...state,
                newProject: {
                    ...state.newProject,
                    coordinates: action.polygon
                }
            }
        case types.SAVE_MARKER_COORDS:
            return {
                ...state,
                newProject: {
                    ...state.newProject,
                    coordinates: action.marker
                }
            }
        case types.CREATE_NEW_PROJECT: 
            return {
                ...state,
                problems: action.problems
            }
        case types.SET_REDIRECT: 
            return {
                ...state,
                redirect: action.status
            }
        case types.SET_ERROR_MESSAGE:
            return {
                ...state,
                error: action.error
            }
        case types.CLEAR_COORDINATES:
            return {
                ...state,
                newProject: {
                    ...state.newProject,
                    coordinates: []
                }
            }
        case types.FILTER_PROJECTS:
            return {
                ...state,
                projects: action.projects
            }
        case types.GET_PROJECTS_BY_TYPES:
            return {
                ...state,
                projectsByType: action.filteredProjects
            }
        case types.GET_MAP_LAYERS: 
            return {
                ...state,
                layers: {
                    ...state.layers,
                    [action.data.trigger]: action.data.tiles
                }
            }
        case types.GET_MAP_WITH_SUBLAYERS: {
            return {
                ...state,
                layers: {
                    ...state.layers,
                    [action.data.name] : {
                        ...state.layers[action.data.name],
                        [action.data.trigger]: action.data.tiles
                    }
                }
            }
        }
        case types.GET_INITIAL_MAP_VIEW: {
            return {
                ...state,
                longitude: action.map.longitude,
                latitude: action.map.latitude
            }
        }
        case types.SELECTED_LAYERS: {
            return {
                ...state,
                selectedLayers: action.selectedLayer
            }
        }
        case types.RESET_MAP: {
            const layers = state.layers;
            const paramFilters = state.paramFilters;
            return {
                ...initState,
                layers,
                paramFilters
            }
        }
        case types.GALLERY_PROBLEMS: {
            return {
                ...state,
                galleryProblems: action.galleryProblems
            }
        }
        case types.GALLERY_PROJECTS: {
            return {
                ...state, 
                galleryProjects: action.galleryProjects
            }
        }
        case types.SET_FILTER_PROBLEM_OPTIONS: {
            return {
                ...state,
                filterProblemOptions: action.filters
            }
        }
        case types.SET_FILTER_PROJECT_OPTIONS: {
            return {
                ...state,
                filterProjectOptions: action.filters
            }
        }
        case types.SET_FILTER_COORDINATES: {
            return {
                ...state, 
                filterCoordinates: action.coordinates
            }
        }
        case types.GET_PARAM_FILTERS: {
            return {
                ...state, 
                paramFilters: action.params
            }
        }
        case types.GET_COMPONENTS_BY_PROBLEMID: {
            return {
                ...state,
                componentsByProblemId: action.params
            }
        }
        case types.GET_HIGHLIGHTED: {
            return {
                ...state,
                highlighted: action.data
            }
        }
        case types.SET_SPIN_FILTER: {
            return {
                ...state,
                spinFilters: action.spin
            }
        }
        case types.SET_SPIN_CARD_PROBLEMS: {
            return {
                ...state,
                spinCardProblems: action.spin
            }
        }
        case types.SET_SPIN_CARD_PROJECTS: {
            return {
                ...state,
                spinCardProjects: action.spin
            }
        }
        case types.SET_FILTER_COMPONENT_OPTIONS: {
            return {
                ...state,
                filterComponentOptions: action.filters
            }
        }
        case types.SET_FILTER_PROBLEMS: {
            return {
                ...state,
                filterProblems: action.filters
            }
        }
        case types.SET_FILTER_PROJECTS: {
            return {
                ...state,
                filterProjects: action.filters
            }
        }
        case types.SET_FILTER_COMPONENTS: {
            return {
                ...state,
                filterComponents: action.filters
            }
        }
        case types.FILTER_BY_COMPONENTS: {
            return {
                ...state,
                componentDetailIds: action.filtersComponents
            }
        }
        case types.LOADER_TABLE_COMPONENTS: {
            return {
                ...state,
                loaderTableCompoents: action.spin
            }
        }
        case types.SET_SELECTED_ON_MAP: {
            return {
                ...state,
                selectedOnMap: {id: action.id, tab: action.tab}
            }
        }
        case types.MAP_SEARCH_QUERY: {
            return {
                ...state,
                mapSearch: action.search
            }
        }
        case types.SET_APPLY_FILTERS: {
            return {
                ...state,
                applyFilter: action.applyFilter
            }
        }
        case types.GET_COMPONENTS_COUNTER: {
            return {
                ...state,
                componentCounter: action.components.componentes
            }
        }
        case types.ZOOM_PROJECT_OR_PROBLEMS: {
            return {
                ...state,
                zoomProblemOrProject: action.zoom
            }
        }
        case types.SET_TOOGLE_MODAL: {
            return {
                ...state,
                toggleModalFilter: action.toggle
            }
        }
        case types.SET_BOUNDS_MAP: {
            return {
                ...state,
                boundsMap: action.bounds
            }
        }
        case types.SET_FILTER_TAB_NUMBER: {
            return {
                ...state,
                filterTabNumber: action.tab
            }
        }
        case types.SET_TAB_CARDS: {
            return {
                ...state,
                tabCards: action.tab
            }
        }
        case types.GET_PARAM_FILTER_PROJECTS: {
            return {
                ...state,
                paramFilters: {
                    ...state.paramFilters,
                    projects: action.params
                }
            }
        }
        case types.GET_PARAM_FILTER_PROBLEMS: {
            return {
                ...state,
                paramFilters: {
                    ...state.paramFilters,
                    problems: action.params
                }
            }
        }
        case types.GET_PARAM_FILTER_COMPONENTS: {
            return {
                ...state,
                paramFilters: {
                    ...state.paramFilters,
                    components: action.params
                }
            }
        }
        default: 
            return state;
    }
}

export default mapReducer;