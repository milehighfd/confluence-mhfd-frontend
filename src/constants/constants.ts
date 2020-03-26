export const COMPLETE_SCREEN = 24;
export const MEDIUM_SCREEN = 12;
export const EMPTY_SCREEN = 0;


/* Map Constants */

export const MAPBOX_TOKEN = 'pk.eyJ1IjoibWlsZWhpZ2hmZCIsImEiOiJjazRqZjg1YWQwZTN2M2RudmhuNXZtdWFyIn0.oU_jVFAr808WPbcVOFnzbg';
export const HERE_TOKEN = 'aRgPPlNDstxfi9lnBVXAkAN5fUu5jC1D3fuZoDeyUFw';

export const MAP_DROPDOWN_ITEMS = [
    {
        type: 'Light Road',
        style: 'mapbox://styles/milehighfd/ck4k0tjln58h41cl4ixb8jsez'
    }, {
        type: 'Dark Road',
        style: 'mapbox://styles/mapbox/dark-v10' 
        // style: 'mapbox://styles/milehighfd/ck4jfj4yy5abd1cqw90v1dlft' 
    }, {
        type: 'Satellite',
        style: 'mapbox://styles/milehighfd/ck4jfl22r5ada1cqwix8gpjwp'
    }, {
        type: 'Terrain',
        style: 'mapbox://styles/milehighfd/ck4jflu4000ry1cmnh7fdp2oi'
    }
];

export const LATITUDE_INDEX = 0;
export const LONGITUDE_INDEX = 1;

export const PROBLEMS_TRIGGER = 'problems';
export const PROJECTS_TRIGGER = 'projects';
export const COMPONENTS_TRIGGER = 'components';

/* End of Map Constants */

export const NEW_PROJECT_FORM_COST = {
  subtotal: 0,
  additional: {
    per: 0.2,
    cost: 0,
    additionalCostDescription: ''
  },
  overhead: {
    per: 0.2,
    cost: 0,
    overheadCostDescription: ''
  },
  total: 0
}

export const buttonsNewProject = [
    {
      title: 'capital',
      route: 'new-project-form',
      icon1: '/Icons/icon-37.svg',
      icon2: '/Icons/icon-38.svg',
      redirectRoute: '/project-capital'
    }, {
      title: 'maintenance',
      route: 'new-project-form',
      icon1: '/Icons/icon-39.svg',
      icon2: '/Icons/icon-40.svg',
      buttonExtra: [
        {
          title: 'debris management',
          route: 'new-project-form',
          icon1: '/Icons/icon-47.svg',
          icon2: '/Icons/icon-48.svg',
          redirectRoute: '/project-maintenance/debrisManagement'
        }, {
          title: 'vegetation management',
          route: 'new-project-form',
          icon1: '/Icons/icon-49.svg',
          icon2: '/Icons/icon-50.svg',
          redirectRoute: '/project-maintenance/vegetationManagement'
        }, {
          title: 'sediment removal',
          route: 'new-project-form',
          icon1: '/Icons/icon-51.svg',
          icon2: '/Icons/icon-52.svg',
          redirectRoute: '/project-maintenance/sedimentRemoval'
        }, {
          title: 'minor repairs',
          route: 'new-project-form',
          icon1: '/Icons/icon-53.svg',
          icon2: '/Icons/icon-54.svg',
          redirectRoute: '/project-maintenance/minorRepairs'
        }, {
          title: 'restoration',
          route: 'new-project-form',
          icon1: '/Icons/icon-55.svg',
          icon2: '/Icons/icon-56.svg',
          redirectRoute: '/project-maintenance/restoration'
        }
      ]
    }, {
      title: 'study',
      route: 'new-project-form',
      icon1: '/Icons/icon-41.svg',
      icon2: '/Icons/icon-42.svg',
      buttonExtra: [
        {
          title: 'master plan only',
          route: 'new-project-form',
          icon1: '/Icons/icon-57.svg',
          icon2: '/Icons/icon-68.svg',
          redirectRoute: '/project-study/masterPlan'
        }, {
          title: 'fhad only',
          route: 'new-project-form',
          icon1: '/Icons/icon-58.svg',
          icon2: '/Icons/icon-59.svg',
          redirectRoute: '/project-study/fhad'
        }
      ]
    }, {
      title: 'acquisition',
      route: 'new-project-form',
      icon1: '/Icons/icon-43.svg',
      icon2: '/Icons/icon-44.svg',
      redirectRoute: '/project-acquisition'
    }, {
      title: 'special',
      route: 'new-project-form',
      icon1: '/Icons/icon-45.svg',
      icon2: '/Icons/icon-46.svg',
      redirectRoute: '/project-special'
    }
  ];

export const CITIES = [
    "Arvada",
    "Aurora",
    "Boulder",
    "Bow Mar",
    "Brighton",
    "Broomfield",
    "Castle Pines",
    "Centennial",
    "Cherry Hills Village",
    "Columbine Valley",
    "Commerce City",
    "Denver",
    "Edgewater",
    "Englewood",
    "Erie",
    "Federal Heights",
    "Foxfield",
    "Glendale",
    "Golden",
    "Greenwood Village",
    "Lafayette",
    "Lakeside",
    "Lakewood",
    "Littleton",
    "Lochbuie",
    "Lone Tree",
    "Louisville",
    "Morrison",
    "Mountain View",
    "Northglenn",
    "Parker",
    "Sheridan",
    "Superior",
    "Thornton",
    "Westminster",
    "Wheat Ridge"
]

export const ORGANIZATION = [
  "Adams County",
  "Arapahoe County",
  "Boulder County",
  "Douglas County",
  "Jefferson County",
  "Arvada",
  "Aurora",
  "Boulder",
  "Bow Mar",
  "Brighton",
  "Broomfield",
  "Castle Pines",
  "Centennial",
  "Cherry Hills Village",
  "Columbine Valley",
  "Commerce City",
  "Denver",
  "Edgewater",
  "Englewood",
  "Erie",
  "Federal Heights",
  "Foxfield",
  "Glendale",
  "Golden",
  "Greenwood Village",
  "Lafayette",
  "Lakeside",
  "Lakewood",
  "Littleton",
  "Lochbuie",
  "Lone Tree",
  "Louisville",
  "Morrison",
  "Mountain View",
  "Northglenn",
  "Parker",
  "Sheridan",
  "Superior",
  "Thornton",
  "Westminster",
  "Wheat Ridge",
  "SEMSWA"
];

export const JURISDICTION = [
  "Unincorporated Adams County",
  "Unincorporated Arapahoe County",
  "Unincorporated Boulder County",
  "Unincorporated Douglas County",
  "Unincorporated Jefferson County",
  "Arvada",
  "Aurora",
  "Boulder, City",
  "Bow Mar",
  "Brighton",
  "Broomfield, City and County",
  "Castle Pines",
  "Centennial",
  "Cherry Hills Village",
  "Columbine Valley",
  "Commerce City",
  "Denver, City and County",
  "Edgewater",
  "Englewood",
  "Erie",
  "Federal Heights",
  "Foxfield",
  "Glendale",
  "Golden",
  "Greenwood Village",
  "Lafayette",
  "Lakeside",
  "Lakewood",
  "Littleton",
  "Lochbuie",
  "Lone Tree",
  "Louisville",
  "Morrison",
  "Mountain View",
  "Northglenn",
  "Parker",
  "Sheridan",
  "Superior",
  "Thornton",
  "Westminster",
  "Wheat Ridge",
  "SEMSWA"
];

export const CONSULTANT_CONTRACTOR = [
  "AECOM",
  "Anderson Consulting Engineers",
  "Applegate Group",
  "Atkins",
  "Bohannan-Huston",
  "Bowman Consulting Group",
  "Burns & McDonnell",
  "Calibre Engineering",
  "CDM Smith",
  "Jacobs",
  "Civil Design Group",
  "Collins Engineers",
  "CRB Engineering",
  "CVL Consultants",
  "David Evans and Associates",
  "Dewberry",
  "Drexel, Barrell & Company",
  "EMK Consultants",
  "Enginuity Engineering Solutions",
  "Entitlement and Engineering Solutions",
  "Flow Technologies",
  "Geosyntec Consultants",
  "Golder Associates",
  "HDR Engineering",
  "Huitt-Zollars",
  "ICON Engineering",
  "J. F. Sato and Associates",
  "Jehn Engineering",
  "Kennedy/Jenks Consultants",
  "Kiowa Engineering Corporation",
  "Landmark Engineering",
  "Leonard Rice Engineers",
  "Loewen Engineering",
  "Matrix Design Group",
  "Merrick & Company",
  "Muller Engineering Company",
  "Olsson Associates",
  "Otak",
  "R2R Engineers",
  "RESPEC",
  "RJH Consultants",
  "S. A. Miro",
  "Stantec Consulting",
  "Tetra Tech",
  "TST Inc. of Denver",
  "Wilson & Company",
  "Wood",
  "Wright Water Engineers, Inc.",
  "53 Corporation",
  "American West Construction",
  "BT Construction",
  "CEI",
  "ECI",
  "Edge Contracting",
  "Frontier Environmental",
  "Kelley Trucking",
  "L&M Enterprises",
  "Left Hand Excavating",
  "Naranjo Civil ",
  "Nelson Pipeline",
  "North State Environmental",
  "Territory Unlimited",
  "Tezak",
  "Western States",
  "ArborForce",
  "Ark Ecological",
  "Arrowhead Landscaping",
  "Concrete Works of CO",
  "CTM",
  "Habitat Management",
  "Kemp & Hoffman",
  "LB Ecological",
  "Redline Pipeline",
  "TerraCare",
  "Valles Construction"
];

export const ROLES = [
  { title: 'MHFD Staff', style: '80px', value: 'staff', options: ORGANIZATION},
  { title: 'Consultant / Contractor', style: '115px', value: 'consultant', options: CONSULTANT_CONTRACTOR},
  { title: 'Local Government', style: '117px', value: 'government_staff', options: JURISDICTION},
  { title: 'Other', style: '80px', value: 'other', options: []}
]

export const FOOTER_PROJECT_CAPITAL = [
  {
    dataIndex: 'Component',
    key: 'Component',
    ellipsis: true,
  },
  {
    dataIndex: 'Jurisdiction',
    key: 'Jurisdiction',
    ellipsis: true,
  },
  {
    dataIndex: 'Cost',
    key: 'Cost',
    ellipsis: true,
  },

  {
    dataIndex: 'StudyName',
    key: 'StudyName',
    ellipsis: true,
  },
];

export const GOAL = [
  {
    name: "Reduce flood risk to Structures", 
    id: "reduceFloodRiskStructures"
  }, {
    name: "Stream bank or bed stabilization",
    id: "streamBankBedStabilization"
  }, {
    name: "Create shared-use paths and recreation",
    id: "createSharedUsePathsRecreation"
  }, {
    name: "Vegetation Enhancements",
    id: "vegetationEnhancements"
  }, {
    name: "Include permanent water quality BMP",
    id: "includePermanentWaterQualityBMP"
  }
];

export const GOAL_STUDY = [
  {
    name: "Reduce flood risk to Structures", 
    id: "reduceFloodRiskStructures"
  }, {
    name: "Stabilization",
    id: "stabilization"
  }, {
    name: "Elminate roadway overtopping",
    id: "eliminateRoadwayOvertopping"
  }, {
    name: "Increased Conveyance",
    id: "increasedConveyance"
  }, {
    name: "Peak flow reduction",
    id: "peakFlowReduction"
  }, {
    name: "Water Quality",
    id: "waterQuality"
  }, {
    name: "Guide Development",
    id: "guideDevelopment"
  }
];

export const REQUEST_FUNDING_YEAR = [
  {
    name: (new Date()).getFullYear(), 
    id: (new Date()).getFullYear()
  }, {
    name: (new Date()).getFullYear() + 1,
    id: (new Date()).getFullYear() + 1
  }, {
    name: (new Date()).getFullYear() + 2,
    id: (new Date()).getFullYear() + 2
  }, {
    name: (new Date()).getFullYear() + 3,
    id: (new Date()).getFullYear() + 3
  }
]
export const REQUEST_START_YEAR = [
  {
    name: (new Date()).getFullYear(), 
    id: (new Date()).getFullYear()
  }, {
    name: (new Date()).getFullYear() + 1,
    id: (new Date()).getFullYear() + 1
  }, {
    name: (new Date()).getFullYear() + 2,
    id: (new Date()).getFullYear() + 2
  }, {
    name: (new Date()).getFullYear() + 3,
    id: (new Date()).getFullYear() + 3
  }
];
export const MAINTENANCE_ELIGIBILITY = [
  {
    name: "Capital Project", 
    id: "capitalProject"
  }, {
    name: "MEP",
    id: "MEP"
  }, {
    name: "Grandfathered",
    id: "grandfathered"
  }, {
    name: "Not Eligible",
    id: "notEligible"
  }, {
    name: "I don't know",
    id: "iDontKnow"
  }
];

export const RECURRENCE = [
  {
    name: "One Time", 
    id: "oneTime"
  }, {
    name: "Annually",
    id: "annually"
  }, {
    name: "Multiple/yr",
    id: "multiple"
  }
];

export const FRECUENCY = [
  {
    name: "Cycle per year", 
    id: "cyclePerYear"
  }
];

export const PROJECT_STUDY_MASTER= {
  projectType: 'study',
  projectSubtype: '',
  requestName: '',
  sponsor: '',
  coSponsor: '',
  requestedStartyear: '',
  goal: ''
}
export const PROJECT_STUDY_FHAD= {
  projectType: 'study',
  projectSubtype: '',
  requestName: '',
  sponsor: '',
  coSponsor: '',
  requestedStartyear: ''
}

export const PROJECT_MAINTENANCE_DEBRIS= {
  projectType: "maintenance",
  projectSubtype: '',
  requestName: '',
  description: '',
  mhfdDollarRequest: 0,
  publicAccess: false,
  frecuency: '',
  maintenanceEligility: ''
}

export const PROJECT_MAINTENANCE_VEGETATION= {
  projectType: "maintenance",
  projectSubtype: '',
  requestName: '',
  description: '',
  mhfdDollarRequest: 0,
  publicAccess: false,
  frecuency: '',
  maintenanceEligility: '',
  recurrence: ''
}

export const PROJECT_MAINTENANCE_SEDIMENT= {
  projectType: "maintenance",
  projectSubtype: '',
  requestName: '',
  description: '',
  mhfdDollarRequest: 0,
  publicAccess: false,
  frecuency: '',
  maintenanceEligility: '',
  recurrence: ''
}

export const PROJECT_MAINTENANCE_MINOR_REPAIR= {
  projectType: "maintenance",
  projectSubtype: '',
  requestName: '',
  description: '',
  mhfdDollarRequest: 0,
  publicAccess: false,
  maintenanceEligility: ''
}

export const PROJECT_MAINTENANCE_RESTORATION= {
  projectType: "maintenance",
  projectSubtype: '',
  requestName: '',
  description: '',
  mhfdDollarRequest: 0,
  publicAccess: false,
  maintenanceEligility: ''
}

export const USER = {
  activated: false,
  organization: "",
  firstName: "",
  lastName: "",
  name: "",
  designation: "",
  _id: "",
  email: "",
  city: "",
  county: "",
  serviceArea: ""
}

/* Unselected Items on Maps Errors */
export const NO_COMPONENTS_ERROR = 'Must select at least one map component.';
export const NO_POLYGON_ERROR = 'Must draw a polygon on the map to continue.';
export const NO_MARKER_ERROR = 'Must put the marker on the map to continue.';
/* End of Unselected Items on Maps Errors */

/* Filter Constants */
export const FILTER_PROBLEMS_TRIGGER = 'Problems';
export const FILTER_PROJECTS_TRIGGER = 'Projects';
export const FILTER_COMPONENTS_TRIGGER = 'Components';
/* End of Filter Constants */

/*  // Mapbox Custom Styles
    mapbox://styles/mapbox/streets-v11
    mapbox://styles/mapbox/outdoors-v11
    mapbox://styles/mapbox/light-v10
    mapbox://styles/mapbox/dark-v10
    mapbox://styles/mapbox/satellite-v9
    mapbox://styles/mapbox/satellite-streets-v11
    mapbox://styles/mapbox/navigation-preview-day-v4
    mapbox://styles/mapbox/navigation-preview-night-v4
    mapbox://styles/mapbox/navigation-guidance-day-v4
    mapbox://styles/mapbox/navigation-guidance-night-v4
*/