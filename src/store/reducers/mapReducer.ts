import * as types from '../types/mapTypes';

const initState = {
    error: '',
    redirect: false,
    newProject: {
        jurisdiction: '',
        coordinates: [],
    },
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
    components: [
        {
            componentId: '0905389549',
            componentName: 'Grey River',
            jurisdiction: 'Westminster',
            howCost: 1570000,
            status: 'Active',
            mitigationType: 'Remove sediment and restore channel to natural condition while improving conveyance.',
            studyName: 'Pedestrian Trail Restoration',
            coordinates: [-105.05122872371193, 39.80646143706309]
        },
        {
            componentId: '2768996948',
            componentName: 'Bulls Town',
            jurisdiction: 'Longway',
            howCost: 1570000,
            status: 'Active',
            mitigationType: 'Remove sediment and restore channel to natural condition while improving conveyance.',
            studyName: 'Pedestrian Trail Restoration',
            coordinates: [-105.01923195503527, 39.82544787234704]
        },
        {
            componentId: '7633852592',
            componentName: 'Juarez Raven',
            jurisdiction: 'Juarez',
            howCost: 1570000,
            status: 'Active',
            mitigationType: 'Remove sediment and restore channel to natural condition while improving conveyance.',
            studyName: 'Pedestrian Trail Restoration',
            coordinates: [-105.01428824828696, 39.80793834790717]
        },
        {
            componentId: '6359756738',
            componentName: 'New Town',
            jurisdiction: 'Westminster',
            howCost: 1570000,
            status: 'Active',
            mitigationType: 'Remove sediment and restore channel to natural condition while improving conveyance.',
            studyName: 'Pedestrian Trail Restoration',
            coordinates: [-105.01047599435583, 39.8038520952569]
        },
        {
            componentId: '4307207870',
            componentName: 'La Vela',
            jurisdiction: 'Riverdale',
            howCost: 1570000,
            status: 'Active',
            mitigationType: 'Remove sediment and restore channel to natural condition while improving conveyance.',
            studyName: 'Pedestrian Trail Restoration',
            coordinates: [-105.0076262517371, 39.800932966936955]
        },
        {
            componentId: '7760439066',
            componentName: 'Washington Problem',
            jurisdiction: 'Westminster',
            howCost: 1570000,
            status: 'Active',
            mitigationType: 'Remove sediment and restore channel to natural condition while improving conveyance.',
            studyName: 'Pedestrian Trail Restoration',
            coordinates: [-105.01131479817568, 39.800875134035095]
        },
        {
            componentId: '7307580223',
            componentName: 'Aurora River',
            jurisdiction: 'Westminster',
            howCost: 1570000,
            status: 'Active',
            mitigationType: 'Remove sediment and restore channel to natural condition while improving conveyance.',
            studyName: 'Pedestrian Trail Restoration',
            coordinates: [-104.99181142130422, 39.85783623146801]
        },
        {
            componentId: '5052707408',
            componentName: 'New Fork Creek',
            jurisdiction: 'Westminster',
            howCost: 1570000,
            status: 'Active',
            mitigationType: 'Remove sediment and restore channel to natural condition while improving conveyance.',
            studyName: 'Whitewater Section',
            coordinates: [-104.98016051889145, 39.85096161845925]
        },
        {
            componentId: '5341072622',
            componentName: 'Poplar Branch',
            jurisdiction: 'Boulder',
            howCost: 1570000,
            status: 'Active',
            mitigationType: 'Remove sediment and restore channel to natural condition while improving conveyance.',
            studyName: 'Channel Restoration',
            coordinates: [-104.96092795632697, 39.87449627602601]
        },
        {
            componentId: '1082247547',
            componentName: 'Animas River',
            jurisdiction: 'Longmont',
            howCost: 1570000,
            status: 'Active',
            mitigationType: 'Remove sediment and restore channel to natural condition while improving conveyance.',
            studyName: 'Combination Bridge',
            coordinates: [-104.99997101031218, 39.84543449508365]
        }
    ],
    layers: {} as any
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
        default: 
            return state;
    }
}

export default mapReducer;