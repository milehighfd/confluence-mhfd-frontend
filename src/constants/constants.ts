export const COMPLETE_SCREEN = 24;
export const MEDIUM_SCREEN = 12;
export const EMPTY_SCREEN = 0;

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

export const NEW_PROJECT_FORM_COST = {
  subtotal: 0,
  additional: {
    per: 0.2,
    cost: 0,
    description: ''
  },
  overhead: {
    per: 0.2,
    cost: 0,
    description: ''
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
          redirectRoute: '/project-debris'
        }, {
          title: 'vegetation management',
          route: 'new-project-form',
          icon1: '/Icons/icon-49.svg',
          icon2: '/Icons/icon-50.svg',
          redirectRoute: '/new-project-form'
        }, {
          title: 'sediment removal',
          route: 'new-project-form',
          icon1: '/Icons/icon-51.svg',
          icon2: '/Icons/icon-52.svg',
          redirectRoute: '/new-project-form'
        }, {
          title: 'minor repairs',
          route: 'new-project-form',
          icon1: '/Icons/icon-53.svg',
          icon2: '/Icons/icon-54.svg',
          redirectRoute: '/new-project-form'
        }, {
          title: 'restoration',
          route: 'new-project-form',
          icon1: '/Icons/icon-55.svg',
          icon2: '/Icons/icon-56.svg',
          redirectRoute: '/new-project-form'
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
          redirectRoute: '/new-project-form'
        }, {
          title: 'fhad only',
          route: 'new-project-form',
          icon1: '/Icons/icon-58.svg',
          icon2: '/Icons/icon-59.svg',
          redirectRoute: '/new-project-form'
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
      redirectRoute: '/new-project-form'
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