export type MapProps = {
    leftWidth: number,
    problems: Array<ProblemTypes>,
    projects: Array<ProjectTypes>,
    components: Array<ComponentType>,
    setSelectedItems?: Function,
    selectedItems?: Array<ComponentType>,
    setIsPolygon?: Function,
    getReverseGeocode?: Function,
    savePolygonCoordinates?: Function
}

export type MapViewProps = {
    problems: Array<ProblemTypes>,
    projects: Array<ProjectTypes>,
    components: Array<ComponentType>,
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