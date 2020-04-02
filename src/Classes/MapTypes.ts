import { 
    PROBLEMS_TRIGGER,
    PROJECTS_TRIGGER,
    COMPONENTS_TRIGGER,
    FLOODPLAINS_FEMA_FILTERS,
    FLOODPLAINS_NON_FEMA_FILTERS,
    WATERSHED_FILTERS,
    STREAMS_FILTERS,
    SERVICE_AREA_FILTERS,
    MUNICIPALITIES_FILTERS,
    COUNTIES_FILTERS,
    MHFD_BOUNDARY_FILTERS,
    MEP_PROJECTS,
    ROUTINE_MAINTENANCE
 } from "../constants/constants";



export type MapProps = {
    leftWidth: number,
    layers: MapLayersType,
    problems: Array<ProblemTypes>,
    projects: Array<ProjectTypes>,
    components: Array<ComponentType>,
    layerFilters: any,
    setSelectedItems: Function,
    selectedItems: Array<ComponentType>,
    setIsPolygon: Function,
    getReverseGeocode: Function,
    savePolygonCoordinates: Function,
    saveMarkerCoordinates: Function,
    getMapTables: Function,
    markerRef: any,
    polygonRef: any
}

export type MapHOCProps = {
    problems: Array<ProblemTypes>,
    projects: Array<ProjectTypes>,
    components: Array<ComponentType>,
    filters: any,
    layerFilters: any,
    saveNewCapitalForm: Function,
    saveNewStudyForm: Function,
    createNewProjectForm: Function,
    getReverseGeocode: Function,
    savePolygonCoordinates: Function,
    saveMarkerCoordinates: Function,
    redirect: boolean,
    setRouteRedirect: Function,
    error: string,
    clearErrorMessage: Function,
    getProjectWithFilters: Function,
    removeFilter: Function,
    getMapTables: Function
}

export type NewProjectFormProps = {
    problems: Array<ProblemTypes>,
    projects: Array<ProjectTypes>,
    components: Array<ComponentType>,
    getReverseGeocode: Function,
    savePolygonCoordinates: Function,
    saveNewCapitalForm: Function
}

export type ProblemTypes = {
    problemId: string
    problemName: string,
    problemPriority: number,
    jurisdiction: string,
    solutionCost: number,
    coordinates: Array<[]>
}

export type ProjectTypes = {
    projectId: string,
    projectName: string,
    projectSubtype: string,
    status: string,
    finalCost: number,
    jurisdiction: string,
    coordinates: Array<[]>
}

export type ComponentType = {
    componentId: string,
    componentName: string,
    jurisdiction: string,
    howCost: number,
    status: string,
    mitigationType: string,
    studyName: string,
    coordinates: Array<[]>
}

export type MapLayersType = {
    marker?: boolean,
    polygons?: boolean
    components?:boolean,
    acquisition?:boolean
}

export type TotalType = {
    subtotal: number,
    additional: {
        additionalCost: number,
        additionalCostDescription: string
    },
    overhead: {
        overheadCost: number,
        overheadCostDescription: string
    }
    total: number
}

export type LayerFiltersType = {
    [PROBLEMS_TRIGGER]?: Array<string>,
    [PROJECTS_TRIGGER]?: Array<string>,
    [COMPONENTS_TRIGGER]?: Array<string>,
    [FLOODPLAINS_FEMA_FILTERS]?: Array<string>,
    [FLOODPLAINS_NON_FEMA_FILTERS]?: Array<string>,
    [WATERSHED_FILTERS]?: Array<string>,
    [STREAMS_FILTERS]?: Array<string>,
    [SERVICE_AREA_FILTERS]?: Array<string>,
    [MUNICIPALITIES_FILTERS]?: Array<string>,
    [COUNTIES_FILTERS]?: Array<string>,
    [MHFD_BOUNDARY_FILTERS]?: Array<string>,
    [MEP_PROJECTS]?: Array<string>,
    [ROUTINE_MAINTENANCE]?: Array<string>
}