const initState = {
  projects: {
    workspace: [
      {
        id: 'kyei281238',
        requestName: 'West Tollgate Creek GSB Drops',
        totalCost: '$410,000',
        county: 'Aurora',
        status: 'Draft'
      },
      {
        id: 'asd123c3t1',
        requestName: 'Westminster Creek GSB Drops',
        totalCost: '$410,000',
        county: 'Aurora',
        status: 'Draft'
      },
      {
        id: 'xx2131ff12',
        requestName: 'Denver River Fix',
        totalCost: '$410,000',
        county: 'Aurora',
        status: 'Draft'
      }
    ], 
    '2020': [
      {
        id: 'x12321e213',
        requestName: 'Potato Town',
        totalCost: '$410,000',
        county: 'Aurora',
        status: 'Draft'
      },
      {
        id: 'xasd2fg234',
        requestName: 'Mac n Cheese',
        totalCost: '$120,000',
        county: 'Denver',
        status: 'Draft'
      }
    ], 
    '2021': [],
    '2022': [],
    '2023': []
  }
};

const panelReducer = (state = initState, action : any) => {
  switch(action.type) {
      default: 
          return state;
  }
}

export default panelReducer;