import { boardProject, columnProject } from "./RequestTypes";
import CardStatService from './CardService';
import { NEW_PROJECT_TYPES } from "../../../constants/constants";
let fields = ['project_id', 'req1', 'req2', 'req3', 'req4', 'req5', 'positon0', 'positon1', 'positon2', 'positon3', 'positon4', 'positon5'];
let fields2 = ['description', 'projectname', 'jurisdiction','county','servicearea','sponsor','cosponsor','components', 'estimatedcost','the_geom','streams','overheadcostdescription','additionalcostdescription'];
export const compareColumns = (_colsLhs: any, _colsRhs: any) => {
  let colsLhs: columnProject[] = _colsLhs;
  let colsRhs: columnProject[] = _colsRhs;
  let areEqual = true;
  colsLhs.forEach((_: columnProject, colIdx: number) => {
    if (!areEqual) return;
    let colLhs = colsLhs[colIdx];
    let colRhs = colsRhs[colIdx];
    if (colLhs.title !== colRhs.title && colLhs.hasCreateOption !== colRhs.hasCreateOption) {
      areEqual = false;
    }
    if (!areEqual) return;
    if (colLhs.projects.length === colRhs.projects.length) {
      for (var i = 0 ; i < colLhs.projects.length ; i++) {
        let lp: any = colLhs.projects[i];
        let rp: any = colRhs.projects[i];
        fields.forEach((f) => {
          if (lp[f] != rp[f]) {
            areEqual = false;
          }
        })
        fields2.forEach((f) => {
          if(f == 'streams') {
            if (JSON.stringify(lp.projectData[f]) != JSON.stringify(rp.projectData[f])) {
              areEqual = false;
            }
          } else {
            if (lp.projectData[f] != rp.projectData[f]) {
              areEqual = false;
            }
          }
          
        })
      }
    } else  {
      areEqual = false;
    }
  })
  return areEqual;
}

export const filterByJurisdictionAndCsaSelected = (jurisdictionSelected: string[], csaSelected: string[], jurisdictionFilterList: string[], csaFilterList: string[], p: any) => {
  if (jurisdictionSelected.length === jurisdictionFilterList.length && 
    csaSelected.length === csaFilterList.length) {
    return true;
  }
  if (!jurisdictionSelected.includes(p.projectData.sponsor)) {
    return false;
  } else {
    let found = false;
    if (p.projectData.county) {
      p.projectData.county.split(',').forEach((county: string) => {
        if (csaSelected.includes(county)) {
          found = true;
        }
      })
    }
    if (p.projectData.servicearea) {
      p.projectData.servicearea.split(',').forEach((servicearea: string) => {
        if (csaSelected.includes(servicearea)) {
          found = true;
        }
      })
    }
    return found;
  }
}

export const defaultColumns: any[] = [
  {
    title: 'Workspace',
    hasCreateOption: true,
    projects: [],
  },
  {
    title: '',
    projects: [],
  },
  {
    title: '',
    projects: [],
  },
  {
    title: '',
    projects: [],
  },
  {
    title: '',
    projects: [],
  },
  {
    title: '',
    projects: [],
  }
]

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

export const getAllowedBasedOnLocality = (locality: string) => {
  let all = [NEW_PROJECT_TYPES.Capital, NEW_PROJECT_TYPES.Acquisition, NEW_PROJECT_TYPES.Maintenance, NEW_PROJECT_TYPES.Special, NEW_PROJECT_TYPES.Study]; 
  if (locality.startsWith('Unincorporated') && locality.endsWith('County')) {
    return all;
  } else if (locality.endsWith('County')) {
    return [NEW_PROJECT_TYPES.Capital, NEW_PROJECT_TYPES.Maintenance]
  } else if (locality.endsWith('Service Area')) {
    return [NEW_PROJECT_TYPES.Acquisition, NEW_PROJECT_TYPES.Special, NEW_PROJECT_TYPES.Study];
  } else {
    return all;
  }
}

export const MaintenanceTypes = ['Debris Management', 'Vegetation Management', 'Sediment Removal', 'Minor Repairs', 'Restoration'];

export const generateColumns = (boardProjects: boardProject[], year: number, tabKey: string) => {
  let columns: any[] = defaultColumns.map((dc: any, index: number) => {
    let title = dc.title;
    if (index > 0) {
      if (tabKey === 'Maintenance') {
        title = MaintenanceTypes[index - 1];
      } else {
        title = +year + index - 1;
      }
    }
    return {
      ...dc,
      title,
      projects: []
    }
  });
  let temporalColumns: any = [[], [], [], [], [], []]

  boardProjects.forEach((boardProject: boardProject | any) => {
    let isInAnyColumn = false;
    for(var i = 1 ; i <= 5; i++) {
      if (boardProject[`position${i}`] != null) {
        isInAnyColumn = true;
        temporalColumns[i].push(boardProject);
      }
    }
    if (!isInAnyColumn) {
      temporalColumns[0].push(boardProject);
    }
  });

  temporalColumns = temporalColumns.map((tc: boardProject[], idx: number) => {
    let arr = tc.sort((a: any, b: any) => {
      return a[`position${idx}`] - b[`position${idx}`]
    })
    return arr;
  })

  columns = columns.map((c, i) => {
    return {
      ...c,
      projects: temporalColumns[i]
    };
  })

  return columns;
}

export const priceFormatter = (value: any) => {
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

export const onDropFn = (txt: string, columns: any[], columnIdx: number, tabKey: string) => {
  let parsedObject = JSON.parse(txt);
  let { id, fromColumnIdx } = parsedObject;

  let project: any;
  columns[fromColumnIdx].projects.forEach((p: any) => {
    if (p.project_id == id) {
      project = p;
    }
  })

  let destinyColumnHasProject = false;
  columns[columnIdx].projects.forEach((p: any) => {
    if (p.project_id == id) {
      destinyColumnHasProject = true;
    }
  })
  let newCardPos = CardStatService.getPosition();
  if (fromColumnIdx === columnIdx) {
    let beforePos = -1;
    columns[columnIdx].projects.forEach((p: any, posBef: number) => {
      if (p.project_id == id) {
        beforePos = posBef;
      }
    })
    let projects: any[] = [];
    if (newCardPos === -1) {
      projects = [].concat(columns[columnIdx].projects);
      projects.splice(beforePos, 1);
      projects.push(project);
    } else {
      if (beforePos === newCardPos) {
        return;
      } else {
        columns[columnIdx].projects.forEach((p: any, pos: number) => {
          if (pos === newCardPos) {
            projects.push(project);
          }
          projects.push(p);
        })
        if (newCardPos === columns[columnIdx].projects.length) {
          projects.push(project);
        }
        projects.splice(newCardPos > beforePos ? beforePos : beforePos + 1, 1);
      }
    }
    let temporalColumns: any = columns.map((c, colIdx: number) => {
      return {
        ...c,
        projects: colIdx === fromColumnIdx ? projects: c.projects
      }
    });
    return temporalColumns;
  }
  if (tabKey === 'Maintenance') {
    var destinyColumn = MaintenanceTypes.indexOf(project.projectData.projectsubtype) + 1;
    if (!(columnIdx === 0 || columnIdx === destinyColumn)) {
      return;
    }
  }
  if (destinyColumnHasProject) {
    return;
  } else {
    let newObj = {
      ...project,
      [`position${columnIdx}`]: newCardPos === -1 ? columns[columnIdx].projects.length : newCardPos,
      [`req${columnIdx}`]: columnIdx === 0 ? null : project[`req${fromColumnIdx}`],
      [`req${fromColumnIdx}`]: null,
      [`position${fromColumnIdx}`]: null,
    }

    let temporalColumns: any = columns.map((c, colIdx: number) => {
      return {
        ...c,
        projects: c.projects
        .filter((p: any) => {
          if (colIdx == fromColumnIdx && p.project_id == id) {
            return false;
          }
          return true;
        })
        .map((p: any) => {
          if (p.project_id == id) {
            return newObj;
          }
          return p;
        })
      }
    })
    
    if (newCardPos === -1) {
      temporalColumns[columnIdx].projects.push(newObj);
    } else {
      let arr = [];
      for (var i = 0 ; i < temporalColumns[columnIdx].projects.length ; i++) {
        let p = temporalColumns[columnIdx].projects[i];
        if (newCardPos === i) {
          arr.push(newObj);
        }
        arr.push(p)
      }
      temporalColumns[columnIdx].projects = arr;
    }
    return temporalColumns;
  }
}

export const csvFileName = (year: any, locality: string, type: string) => {
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
  columns: any[],
  locality: string,
  year: any,
  tabKey: string,
  sumTotal: any,
  sumByCounty: any,
  reqManager: any,
  diff: any,
  localityLabel: string
) => {
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
      row2.push('Jurisdiction');
      row2.push('Status');
      row2.push('Cost');
      dataByYear[i] = [];
      let project: any = null;
      maxSize = Math.max(maxSize, columns[i].projects.length);
      for (project of columns[i].projects) {
        if (!project.projectData) {
          continue;
        }
        dataByYear[i].push([project.projectData.projectname,
          project.projectData.jurisdiction,
          project.projectData.status,
          formatter.format(project['req' + i])]);
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
    for (county of sumByCounty) {
      const auxArray = [county.county];
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
    const differental: any = ['Differential'];
    for (const value of diff) {
      differental.push(formatter.format(value));
    }
    csvData.push(differental);
    return csvData;
}

export const getTotalsByProperty = (columns: any[], property: string) => {
  let allProjects = columns.reduce((acc: any[], cv: any) => {
    return [...acc, ...cv.projects]
  }, [])
  let ht: any = {};
  allProjects = allProjects.filter((p: any) => {
    if (!ht[p.project_id]) {
      ht[p.project_id] = p;
      return true;
    }
    return false;
  })

  let localityMap: any = {}
  allProjects.forEach((p: any) => {
    let arr = (p.projectData[property] || '').split(',');
    for (let j = 0 ; j < arr.length ; j++) {
      let locality = arr[j];

      if (!localityMap[locality]) {
        localityMap[locality] = {
          req1: 0, req2: 0, req3: 0, req4: 0, req5: 0,
          cnt1: 0, cnt2: 0, cnt3: 0, cnt4: 0, cnt5: 0,
          projects: [],
        }
      }
      localityMap[locality].projects.push(p);
      for(var i = 1; i <= 5 ; i++) {
        localityMap[locality][`req${i}`] += (p[`req${i}`] / arr.length);
        if (p[`position${i}`] != null) {
          localityMap[locality][`cnt${i}`]++;
        }
      }
    }
  })
  let rows: any = [];
  let totals: any = { req1: 0, req2: 0, req3: 0, req4: 0, req5: 0 };
  Object.keys(localityMap).forEach((locality: string) => {
    let obj: any = {
      locality
    }
    for(var i = 1; i <= 5 ; i++) {
      let amount = localityMap[locality][`req${i}`];
      obj[`req${i}`]= amount;
      obj[`cnt${i}`]= localityMap[locality][`cnt${i}`];
      totals[`req${i}`] += amount;
    }
    rows.push(obj);
  });
  rows.sort((a: any, b: any) => a.locality.localeCompare(b.locality))
  return [rows, totals];
}

export const compareArrays = (a: string[], b: string[]) => {
  return JSON.stringify(a) == JSON.stringify(b);
}
