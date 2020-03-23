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