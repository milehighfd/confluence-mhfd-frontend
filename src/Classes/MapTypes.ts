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
    saveMarkerCoordinates: Function
}

export type MapHOCProps = {
    problems: Array<ProblemTypes>,
    projects: Array<ProjectTypes>,
    components: Array<ComponentType>,
    saveNewProjectForm: Function,
    saveNewProjectWithCoords: Function,
    getReverseGeocode: Function,
    savePolygonCoordinates: Function,
    saveMarkerCoordinates: Function,
    redirect: boolean,
    setRouteRedirect: Function
}

export type NewProjectFormProps = {
    problems: Array<ProblemTypes>,
    projects: Array<ProjectTypes>,
    components: Array<ComponentType>,
    getReverseGeocode: Function,
    savePolygonCoordinates: Function,
    saveNewProjectForm: Function
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