export type MapProps = {
    leftWidth: number
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
    mhfddollarsallocated: [], // string,
    lgmanager: string,
    streamname: string,
    creator: string,
    totalcost: [], // string,
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
    estimatedcost: [],
    jurisdiction: string,
    county: string,
    mhfdmanager: string,
    servicearea: string
}

export type CapitalTypes = {
    selectedItems: Array<ComponentType>, 
    isPolygon: boolean, 
    setSelectedItems: Function, 
    polygonRef: React.RefObject<HTMLDivElement>
}

export type StudyTypes = {
    selectedItems : Array<ComponentType>, 
    setSelectedItems: Function, 
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
    tiles: Array<string>,
    source?: string
}

export type LayerStylesType = {
    type: string,
    layout: {},
    'source-layer'?: string,
    paint: {
        [key : string]: string | number
    },
    filter?: any,
    source_name?: any
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
    tabActive: string,
    tabPosition: string, 
    setTabPosition: Function, 
    setTabActive: Function
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

export type Detail = {
    key: string,
    value: string,
    display: string
}

export type LabelFilter = {
    name: string,
    display: string,
    detail: Detail[]
}



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
