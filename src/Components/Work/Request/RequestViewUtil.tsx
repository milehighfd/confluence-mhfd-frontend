import { boardType } from 'Components/Work/Request/RequestTypes';
import { NEW_PROJECT_TYPES } from 'constants/constants';
import { STATUS_NAMES } from 'constants/constants';
import ConfigurationService from 'services/ConfigurationService';

export const defaultColumns: any[] = [
  {
    title: 'Workspace',
    hasCreateOption: true,
    projects: [],
  },
  {
    title: '2023',
    projects: [],
  },
  {
    title: '2024',
    projects: [],
  },
  {
    title: '2025',
    projects: [],
  },
  {
    title: '2026',
    projects: [],
  },
  {
    title: '2027',
    projects: [],
  }
]

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

export const getAllowedBasedOnLocality = (locality: string, year?: number) => {
  let all = [NEW_PROJECT_TYPES.Capital, NEW_PROJECT_TYPES.Acquisition, NEW_PROJECT_TYPES.Maintenance, NEW_PROJECT_TYPES.Special, NEW_PROJECT_TYPES.Study]; 
  if (locality && (locality.startsWith('Unincorporated') && locality.endsWith('County'))) {
    return all;
  } else if (locality && locality.endsWith('County')) {
      if (year && year < 2022) {
        return [NEW_PROJECT_TYPES.Capital, NEW_PROJECT_TYPES.Maintenance];
      } else {
        return [NEW_PROJECT_TYPES.Capital, NEW_PROJECT_TYPES.Maintenance, NEW_PROJECT_TYPES.Acquisition, NEW_PROJECT_TYPES.Special];
      }
  } else if (locality && locality.endsWith('Service Area')) {
    if (year && year < 2022) {
      return [NEW_PROJECT_TYPES.Study, NEW_PROJECT_TYPES.Acquisition, NEW_PROJECT_TYPES.Special];
    } else {
      return [NEW_PROJECT_TYPES.Study];
    }
  } else {
    return all;
  }
}

export const MaintenanceTypes = ['Routine Trash and Debris', 'Vegetation Management', 'Sediment Removal', 'Minor Repairs', 'Restoration'];

export const getColumnTitle =  (position: number, tabKey: string, year: string | number) => {
  return position === 0 ? 'Workspace' : (tabKey === 'Maintenance' ? MaintenanceTypes[position - 1] === 'Routine Trash and Debris' ?  'Trash and Debris' : MaintenanceTypes[position - 1] : Number(year) + position - 1);
}

export const priceFormatter = (value: any) => {
  if (value < 0) {
    return `-$${Math.floor(value * -1)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return `$${Math.floor(value)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const priceParser = (value: any) => {
  value = value.replace(/\$\s?|(,*)/g, '');
  if (value === '0') {
    return value;
  }
  while (value.length > 0 && value[0] === '0') {
    value = value.substr(1);
  }
  return value
}

export const getCsvFileName = (year: any, locality: string, type: string) => {
  let date =  new Date();
  let y = date.getFullYear() % 100;
  let m = date.getMonth()+1;
  let d = date.getDate();
  let pad = (v: number) => {
    return v < 10 ? `0${v}`: v;
  }
  let dateLabel = `${pad(m)}${pad(d)}${y}`;
  let localityLabel = locality.split(' ').join('');
  let typeLabel = type === 'WORK_REQUEST' ? 'WorkRequest' : 'WorkPlan';
  return `${year}_${localityLabel}_${typeLabel}_${dateLabel}.csv`;
}

export const getCsv = (
  type: boardType,
  localities: any[],
  columns: any[],
  locality: string,
  year: any,
  tabKey: string,
  sumTotal: any,
  sumByCounty: any,
  reqManager: any,
  diff: any
) => {
  let localityLabel = '';
    if (type === "WORK_REQUEST") {
      localityLabel = 'Jurisdiction';
    } else {
      let _locality = localities.find((loc: any) => {
        return loc.name === locality;
      });
      if (_locality) {
        localityLabel = _locality.type === 'COUNTY' ? 'County' : 'Service Area';
      }
    }
    const date = new Date();
    const csvData = [['Exported on ' + date], [`${localityLabel}:`, locality ], ['Year:', year], ['Project Type:' , tabKey], []];
    const row: any = [], row2: any = [], dataByYear: any = {}, years: any = [];
    let maxSize = 0;
    for (let i = 1; i < columns.length; i++) {
      row.push(columns[i]['title']);
      years.push(columns[i]['title']);
      row.push('');
      row.push('');
      row.push('');
      row2.push('Project Name');
      row2.push('Sponsor');
      row2.push('Status');
      row2.push('Cost');
      dataByYear[i] = [];
      let project: any = null;
      maxSize = Math.max(maxSize, columns[i].projects.length);
      for (project of columns[i].projects) {
        if (!project.projectData) {
          continue;
        }
        const statusArray = project?.projectData?.currentId;
        const sponsor = project?.projectData?.project_partners.find((sponsor:any) => sponsor.code_partner_type_id === 11);
        dataByYear[i].push([
          project?.projectData?.project_name,
          sponsor ? sponsor.business_associate.business_name : null,
          statusArray && statusArray.length > 0 ? statusArray[0].status_name : null,
          formatter.format(project['req' + i])
        ]);
      }
    }
    csvData.push(row);
    csvData.push(row2);
    for (let i = 0; i < maxSize; i++) {
      let aux: any = [];
      for (let j = 1; j < columns.length; j++) {
        if (dataByYear[j].length > i) {
          aux = aux.concat(dataByYear[j][i]);
        } else {
          aux = aux.concat('', '', '', '');
        }
      }
      csvData.push(aux);
    }
    let sum: any = ['Sum:'];
    let first = false;
    for (let i = 0; i < years.length; i++) {
      if (!first) {
        sum = sum.concat(['', '', formatter.format(sumTotal['req' + (i + 1)])]);
      } else {
        sum = sum.concat(['', '', '', formatter.format(sumTotal['req' + (i + 1)])]);
      }
      first = true;
    }
    csvData.push(sum);
    csvData.push([]);
    csvData.push([]);
    const yearRow = ['Year'];
    for (const currentYear of years) {
      yearRow.push(currentYear);
    }
    csvData.push(yearRow);
    const totalCost = ['Total Cost'];
    for (let i = 0; i < years.length; i++) {
      totalCost.push(formatter.format(sumTotal['req' + (i + 1)]));
    }
    csvData.push(totalCost);
    let county: any;
    const suffix = type === 'WORK_PLAN' ? (tabKey === 'Study' ? 'Service Area' : 'County') : '';
    if ( tabKey!=='Maintenance'){
      for (county of sumByCounty) {
        const auxArray = [`${county.locality} ${suffix}`];
        for (let i = 0; i < years.length; i++) {
          auxArray.push(formatter.format(county['req' + (i + 1)]));
        }
        csvData.push(auxArray);
      }
      const targetCost: any = ['Target Cost'];
      for (const target of reqManager) {
        if (target == null) {
          targetCost.push(formatter.format(0));
        } else {
          targetCost.push(formatter.format(target));
        }
      }
      csvData.push(targetCost);
      const differental: any = ['Contingency'];
      for (const value of diff) {
        differental.push(formatter.format(value));
      }
      csvData.push(differental);
    }
    return csvData;
}

export const buildGeojsonForLabelsProjectsInBoards = (projects: any) => {
  const geojsonData = {
    "type": "FeatureCollection",
    "features": []
  };
  const projectsRData = projects.map((p:any) => {
    const currentPS = p.projectData?.project_statuses?.filter((ps: any, index: number) => {
      if (p.projectData?.current_project_status_id) {
        return ps?.project_status_id == p.projectData?.current_project_status_id
      } else {
        return index === 0;
      }
    });
    const centroid = p?.projectData?.centroid;
    return {
      project_id: p.projectData?.project_id,
      current_project_status: currentPS ? currentPS[0]?.code_phase_type?.code_status_type?.code_status_type_id : null,
      project_name: p?.projectData?.project_name,
      centroid: centroid? centroid[0]?.centroid : null
    };
  });
  geojsonData.features = projectsRData.map((p:any) => {
    return {
      "type": "Feature",
      "properties": {
        "project_name": p.project_name,
        "project_status": p.current_project_status,
        "project_id": p.project_id
      },
      "geometry": p.centroid ? JSON.parse(p.centroid) : ''

    };
  });
  return geojsonData;
}

const groupBy = (arr: any, keyGetter: any) => {
  const out: any = {};
  for (let item of arr) {
    const key = keyGetter(item);
    if (!out[key]) {
      out[key] = [];
    }
    out[key].push(item);
  }
  return out;
};

export const splitProjectsIdsByStatuses = (projects: any) => {
  const projectsRelevantData = projects.map((p: any) => {
    return {
      code_project_type_id: p.projectData?.code_project_type?.code_project_type_id,
      project_id: p.projectData?.project_id,
      current_project_status_id: p.code_status_type_id,
      current_status_name: STATUS_NAMES[p.code_status_type_id ?? 1],
    }
  });
  const groupedByStatusId = groupBy(projectsRelevantData, (item:any) => {
    return item.current_project_status_id;
  });
  let newGroups: any = {};
  for( let key in groupedByStatusId) {
    let uniqueIds: any = [];
    let uniqueValues: any = [];
    groupedByStatusId[key].forEach((element: any) => {
        if (!uniqueIds.includes(element.project_id)) {
          uniqueIds.push(element.project_id);
          uniqueValues.push(element);
        }
    });
    groupedByStatusId[key] = uniqueValues;
  }
  for(let key in groupedByStatusId) {
    const groupedByProjectType = groupBy(groupedByStatusId[key], (item: any) => {
      return item.code_project_type_id;
    });
    newGroups[key] = groupedByProjectType
  }
  for(let key in newGroups){
    for(let subkey in newGroups[key]){
      newGroups[key][subkey] = newGroups[key][subkey].map((value:any) => value.project_id);
    }
  }
  // first key is STATUS  
  // second key is PROJECT TYPE
  return newGroups;
}

export const getColumnSumAndTotals = (columnProjects: any, position: number) => {
  const requestColumnName = `req${position}`;
  const countColumnName = `cnt${position}`;
  const sumByGroupMap: any = {};
  const groupTotal: any = { [requestColumnName]: 0 };
  const groupingArray = [
    ['project_counties', 'county_name'],
    ['project_service_areas', 'service_area_name'],
    ['project_partners_for_total', 'business_name'],
  ];

  columnProjects.forEach((columnProject: any) => {
    groupTotal[requestColumnName] = groupTotal[requestColumnName] + (columnProject[requestColumnName] || 0);
    groupingArray.forEach(([groupProperty, groupPropertyKeyName]) => {
      if (!sumByGroupMap[groupProperty]) sumByGroupMap[groupProperty] = {};

      if (!columnProject?.projectData) return;
      const { [groupProperty]: groupPropertyValue } = columnProject?.projectData;
      const elementNumberInGroup = groupPropertyValue.length;
      if (elementNumberInGroup === 0) return;

      groupPropertyValue.forEach((propertyValueElement: any) => {
        const { [groupPropertyKeyName]: name } = propertyValueElement;
        if (!sumByGroupMap[groupProperty][name]) {
          sumByGroupMap[groupProperty][name] = {
            [requestColumnName]: 0,
            [countColumnName]: 0,
          };
        }
        sumByGroupMap[groupProperty][name] = {
          ...sumByGroupMap[groupProperty][name],
          [requestColumnName]: sumByGroupMap[groupProperty][name][requestColumnName] + ((columnProject[requestColumnName] || 0) / elementNumberInGroup),
          [countColumnName]: sumByGroupMap[groupProperty][name][countColumnName] + 1,
        };
      });
    });
  });
  return [sumByGroupMap, groupTotal];
};

export const mergeSumByGroupMaps = (sums: any[]) => {
  return sums.reduce((acc: any, sumByGroupMap: any) => {
    Object.keys(sumByGroupMap).forEach((groupProperty: any) => {
      Object.keys(sumByGroupMap[groupProperty]).forEach((groupPropertyKey: any) => {
        if (!acc[groupProperty]) acc[groupProperty] = {};
        if (!acc[groupProperty][groupPropertyKey]) acc[groupProperty][groupPropertyKey] = { locality: groupPropertyKey };
        acc[groupProperty][groupPropertyKey] = {
          ...acc[groupProperty][groupPropertyKey],
          ...sumByGroupMap[groupProperty][groupPropertyKey],
        };
      });
    });
    return acc;
  }, {});
};

export const mergeTotalByGroupMaps = (totals: any[]) => {
  return totals.reduce((acc: any, total: any) => {
    acc = {
      ...acc,
      ...total
    }
    return acc;
  }, {});
};

export const getYearList = async (increaseYears: number = 0) => {
  let config;
  try {
    config = await ConfigurationService.getConfiguration('BOARD_YEAR');
  } catch (e) {
    console.log(e);
  }
  const configuredYear = +config.value;
  const minYear = 2022;
  const maxYear = configuredYear + increaseYears;
  const yearList = [];
  const yearListWithIncrease = [];
  for (let year = minYear; year <= maxYear ; year++) {
    if (year <= configuredYear) {
      yearList.push(year);
    }
    yearListWithIncrease.push(year);
  }
  return [configuredYear, yearListWithIncrease, yearList];
};
