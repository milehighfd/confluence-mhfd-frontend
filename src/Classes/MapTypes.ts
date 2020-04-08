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
    polygonRef: React.RefObject<HTMLDivElement>
}

export type MapHOCProps = {
    problems: Array<ProblemTypes>,
    projects: Array<ProjectTypes>,
    components: Array<ComponentType>,
    filters: FilterTypes,
    dropdowns: DropdownFilterTypes,
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
    getDropdownFilters: Function
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
    [key: string]: string | Array<string>
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

export type LayerHOCTypes = {
    marker?: boolean,
    polygons?: boolean,
    components?: boolean,
    acquisition?: boolean
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
    dropdowns: DropdownFilterTypes
};

export type FilterNamesTypes = {
    key: string,
    type: string,
    value: string
};

export type FilterProjectTypes = { 
    dropdowns: DropdownFilterTypes, 
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
        _id: string,
        name?: string
    }>
};

export type SelectedFilterTypes = {
    [key : string] : Array<string>
};