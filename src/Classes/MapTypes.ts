export type MapProps = {
    leftWidth: number,
    layers: MapLayersType,
    problems: Array<ProblemTypes>,
    projects: Array<ProjectTypes>,
    components: Array<ComponentType>,
    layerFilters: LayerFilterTypes,
    setSelectedItems: Function,
    selectedItems: Array<ComponentType>,
    setIsPolygon: Function,
    getReverseGeocode: Function,
    savePolygonCoordinates: Function,
    saveMarkerCoordinates: Function,
    getMapTables: Function,
    markerRef: React.RefObject<HTMLDivElement>,
    polygonRef: React.RefObject<HTMLDivElement>,
    getPolygonStreams: Function
}

export type MapHOCProps = {
    problems: Array<ProblemTypes>,
    projects: Array<ProjectTypes>,
    components: Array<ComponentType>,
    filters: FilterTypes,
    panel: Array<ProjectTypes>,
    dropdowns: DropdownFilterTypes,
    userFiltered: { [_id: string]: string },
    layerFilters: LayerFilterTypes,
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
    getMapTables: Function,
    getDropdownFilters: Function,
    getUserFilters: Function,
    getPolygonStreams: Function,
    moveDraftCard: Function
}

export type MapViewTypes = { 
    filters: FilterTypes, 
    projects: Array<ProjectTypes>, 
    getProjectWithFilters : Function, 
    removeFilter: Function, 
    getDropdownFilters: Function, 
    dropdowns: DropdownFilterTypes,
    userFiltered: { [_id: string]: string },
    getUserFilters: Function
}

export type CapitalTypes = {
    selectedItems: Array<ComponentType>, 
    isPolygon: boolean, 
    setSelectedItems: Function, 
    saveNewCapitalForm: Function, 
    polygonRef: React.RefObject<HTMLDivElement>
}

export type StudyTypes = {
    selectedItems : Array<ComponentType>, 
    setSelectedItems: Function, 
    saveNewStudyForm: Function, 
    polygonRef: React.RefObject<HTMLDivElement>, 
    isPolygon: boolean
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
    [key: string]: string | Array<string> | number
}

export type ComponentType = {
    componentId: string,
    componentName: string,
    jurisdiction: string,
    howCost: number,
    status: string,
    mitigationType: string,
    studyName: string,
    coordinates: Array<number>
}

export type ComponentCopyType = {
    key: string,
    componentId: string,
    componentName: string,
    jurisdiction: string,
    howCost: string,
    status: string,
    mitigationType: string,
    studyName: string,
    coordinates: Array<number>
}

export type MapLayersType = {
    marker?: boolean,
    polygons?: boolean
    components?:boolean,
    acquisition?:boolean,
    study?: boolean
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

export type LayerFilterTypes = {
    [key : string]: Array<string>
}

export type FilterTypes = {
    [key : string]: Array<string> | string
}

export type FiltersProjectTypes = {
    tabPosition: string, 
    setTabPosition: Function, 
    filterNames : Array<FilterNamesTypes>, 
    setFilterNames : Function, 
    setToggleFilters: Function, 
    handleOnSubmit: Function, 
    handleReset: Function, 
    projectsLength: number, 
    problemsLength: number, 
    getDropdownFilters: Function, 
    dropdowns: DropdownFilterTypes,
    userFiltered: { [_id: string]: string },
    getUserFilters: Function
};

export type FilterNamesTypes = {
    key: string,
    type?: string,
    value: string
};

export type FilterProjectTypes = { 
    dropdowns: DropdownFilterTypes, 
    getSelectValue: Function,
    selectedFilters: SelectedFilterTypes, 
    handleRadioGroup: Function, 
    handleCheckbox: Function,
    handleSelect: Function,
};

export type DropdownFilterTypes = {
    [key : string] : Array<DropdownDefaultTypes>
};

export type DropdownDefaultTypes = {
    _id: Array<{
        [key : string]: string
    }>
};

export type SelectedFilterTypes = {
    [key : string] : string | Array<string>
};