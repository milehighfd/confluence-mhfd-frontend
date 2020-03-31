export type MapProps = {
    leftWidth: number,
    layers: MapLayersType,
    problems: Array<ProblemTypes>,
    projects: Array<ProjectTypes>,
    components: Array<ComponentType>,
    setSelectedItems: Function,
    selectedItems: Array<ComponentType>,
    setIsPolygon: Function,
    getReverseGeocode: Function,
    savePolygonCoordinates: Function,
    saveMarkerCoordinates: Function,
    getMapTables: Function
}

export type MapHOCProps = {
    problems: Array<ProblemTypes>,
    projects: Array<ProjectTypes>,
    components: Array<ComponentType>,
    filters: any,
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