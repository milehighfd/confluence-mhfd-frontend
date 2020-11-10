//MAPTYPES
import { Detailed } from "../store/types/detailedTypes";

type LayersType = string | ObjectLayerType;
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
    getPolygonStreams: Function,
    selectedLayers: Array<LayersType>,
    polygon?: Array<Array<number>>,
    updateSelectedLayers: Function,
    setFilterCoordinates: Function,
    highlighted: any,
    filterProblemOptions: OptionProblems,
    filterProjectOptions: OptionProjects,
    getGalleryProblems: Function,
    getGalleryProjects: Function,
    filterProblems: any,
    filterProjects: any,
    filterComponents: any,
    setSpinValue: Function,
    componentDetailIds: any,
    isExtendedView: boolean,
    setSelectedOnMap: Function,
    getParamsFilter: Function,
    mapSearchQuery: Function,
    mapSearch: any,
    componentCounter: number,
    getComponentCounter: Function
    getDetailedPageProblem: Function,
    getDetailedPageProject: Function,
    getComponentsByProblemId: Function,
    loaderDetailedPage: boolean,
    componentsOfProblems: any,
    loaderTableCompoents: boolean,
    displayModal: boolean,
    detailed: Detailed,
    existDetailedPageProject: Function,
    existDetailedPageProblem: Function,
    zoom: any,
    applyFilter: boolean
}

export type MapHOCProps = {
    problems: Array<ProblemTypes>,
    projects: Array<ProjectTypes>,
    projectsByType: ProjectsByTypes,
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
    latitude: number,
    longitude: number,
    error: string,
    clearErrorMessage: Function,
    getProjectWithFilters: Function,
    removeFilter: Function,
    getMapTables: Function,
    getDropdownFilters: Function,
    getUserFilters: Function,
    getPolygonStreams: Function,
    saveDraftCard: Function,
    getUserProjects: Function,
    sortProjects: Function,
    updateSelectedLayers: Function,
    getGalleryProblems: Function,
    getGalleryProjects: Function,
    galleryProblems: Array<any>,
    getValuesByGroupColumn: Function,
    polygon: Array<Array<number>>,
    saveUserInformation: Function,
    galleryProjects: Array<any>,
    selectedLayers: Array<LayersType>,
    getDetailedPageProblem: Function,
    getDetailedPageProject: Function,
    detailed: Detailed,
    loaderDetailedPage: boolean,
    setFilterCoordinates: Function,
    filterProblemOptions: OptionProblems,
    filterProjectOptions: OptionProjects,
    filterCoordinates: string,
    setFilterProblemOptions: Function,
    setFilterProjectOptions: Function,
    paramFilters: any,
    getComponentsByProblemId: Function,
    highlighted: any,
    setHighlighted: Function,
    spinFilter: boolean,
    spinCardProblems: boolean,
    spinCardProjects: boolean,
    filterComponentOptions: OptionComponents,
    setFilterComponentOptions: Function,
    filterProblems: any,
    filterProjects: any,
    filterComponents: any,
    componentsOfProblems: any,
    setProblemKeyword: Function,
    setProjectKeyword: Function,
    existDetailedPageProject: Function,
    existDetailedPageProblem: Function,
    displayModal: boolean,
    componentDetailIds: any,
    loaderTableCompoents: boolean,
    selectedOnMap: any,
    setSelectedOnMap: Function,
    getParamsFilter: Function,
    mapSearchQuery: Function,
    mapSearch: any,
    groupOrganization: [],
    applyFilter: boolean,
    setApplyFilter: Function
    componentCounter: number,
    getComponentCounter: Function,
    setZoomProjectOrProblem: Function,
    zoom: any
}

export type MapViewTypes = { 
    filters: FilterTypes, 
    projects: Array<ProjectTypes>, 
    getProjectWithFilters : Function, 
    removeFilter: Function, 
    getDropdownFilters: Function, 
    dropdowns: DropdownFilterTypes,
    userFiltered: { [_id: string]: string },
    getUserFilters: Function,
    sortProjects: Function,
    getGalleryProblems: Function,
    getGalleryProjects: Function,
    galleryProblems: Array<any>,
    getValuesByGroupColumn: Function,
    saveUserInformation: Function,
    galleryProjects: Array<any>,
    getDetailedPageProblem: Function,
    getDetailedPageProject: Function,
    detailed: Detailed,
    loaderDetailedPage: boolean,
    filterProblemOptions: OptionProblems,
    filterProjectOptions: OptionProjects,
    filterCoordinates: string,
    setFilterProblemOptions: Function,
    setFilterProjectOptions: Function,
    paramFilters: any,
    setHighlighted: Function,
    filterComponentOptions: OptionComponents,
    setFilterComponentOptions: Function,
    getComponentsByProblemId: Function,
    componentsOfProblems: Function,
    setProblemKeyword: Function,
    setProjectKeyword: Function,
    existDetailedPageProject: Function,
    existDetailedPageProblem: Function,
    displayModal: boolean,
    loaderTableCompoents: boolean,
    selectedOnMap: any,
    setSelectedOnMap: Function,
    groupOrganization: [],
    applyFilter: boolean,
    setApplyFilter: Function
    componentCounter: number,
    getComponentCounter: Function,
    setZoomProjectOrProblem: Function,
    selectedLayers: Array<LayersType>,
    updateSelectedLayers: Function,
}
export type OptionProblems = {
    keyword: string,
    column: string,
    order: string,
    cost: string,
    priority: string,
    solutionstatus: string,
    county: string,
    jurisdiction: string,
    mhfdmanager: string,
    problemtype: string,
    source: string,
    components: string,
    servicearea: string
}

export type OptionProjects = {
    keyword: string,
    column: string,
    order: string,
    projecttype: string,
    status: string,
    startyear: string,
    completedyear: string,
    mhfddollarsallocated: string,
    lgmanager: string,
    streamname: string,
    creator: string,
    totalcost: string,
    workplanyear: string,
    problemtype: string,
    mhfdmanager: string,
    jurisdiction: string,
    county: string,
    consultant: string,
    contractor: string,
    servicearea: string
}
export type OptionComponents = {
    component_type: string,
    status: string,
    yearofstudy: string,
    estimatedcost: string,
    jurisdiction: string,
    county: string,
    mhfdmanager: string,
    servicearea: string
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

export type ProjectsByTypes = {
    capital: Array<ProjectTypes>,
    maintenance: Array<ProjectTypes>,
    study: Array<ProjectTypes>,
    propertyAcquisition: Array<ProjectTypes>,
    special: Array<ProjectTypes>
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

export type DetailedMapProps = {
    [key : string] : string,
}

export type SubDetailedProps = {
    components: Array<string>
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

export type ObjectLayerType = {
    name: string,
    tiles: Array<string>
}

export type LayerStylesType = {
    type: string,
    layout: {},
    'source-layer'?: string,
    paint: {
        [key : string]: string | number
    }
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

export type MapStyleTypes = {
    [key : string]: string | Object
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
    getValuesByGroupColumn: Function,
    dropdowns: DropdownFilterTypes,
    userFiltered: { [_id: string]: string },
    getUserFilters: Function,
    paramFilters: any,
    filterProblemOptions: OptionProblems,
    setFilterProblemOptions: Function,
    getGalleryProblems: Function,
    filterProjectOptions: OptionProjects,
    setFilterProjectOptions: Function,
    getGalleryProjects: Function,
    filterComponentOptions: OptionComponents,
    setFilterComponentOptions: Function,
    setTabActive: Function,
    componentsTotal: number,
    selectedLayers: Array<LayersType>,
    updateSelectedLayers: Function,
    applyFilter: boolean,
    setApplyFilter: Function
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





/* Panel Types */

export type PanelTypes = {
    [key : string]: Array<ProjectTypes>
}

export type PanelProjectTypes = {
    [key : string] : PanelTypes 
};

export type ProjectTabTypes = {
    name: string,
    drafts: Array<string>
}

export type PanelTriggerTypes = {
    newPanelProjects: PanelTypes,
    panelTrigger: string
}

export type DraftPanelTypes = { 
    headers : any, 
    panelState : any, 
    setPanelState : Function, 
    handleSaveDraftCard : Function, 
    workPlanGraphs?: React.ReactNode,
    workPlanWrapper?: boolean
}

/* End of Panel Types */