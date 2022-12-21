import { boardProject, boardType, columnProject } from 'Components/Work/Request/RequestTypes';
import CardStatService from 'Components/Work/Request/CardService';
import { NEW_PROJECT_TYPES, list } from 'constants/constants';

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

const checkPriority = (value: number | null, option: string) => {
  if (value == null) return true;
  if (option.includes('Work Plan')) {
    return value < 0;
  }
  if (option.includes('Over')) {
    return value >= 3;
  }
  return value === +option - 1;
}
export const hasPriority = (value: any, options: string[], columnIdx: number) => {
  //console.log('has priority', value, options, columnIdx);
  return options.some((option: string) => checkPriority(value[`originPosition${columnIdx}`], option));
}

export const filterByJurisdictionAndCsaSelected = (jurisdictionSelected: string[], csaSelected: string[], jurisdictionFilterList: string[], csaFilterList: string[], p: any) => {
  if (jurisdictionSelected.length === jurisdictionFilterList.length && csaSelected.length === csaFilterList.length) { // if all filters are the same show every project
    return true;
  }
  
  let found = false;
  if (p.projectData.county) {
    p.projectData.county.split(',').forEach((county: string) => {
      if (csaSelected.includes(county)) {
        found = true;
      }
    })
  }
  if (p.projectData.jurisdiction) {
    p.projectData.jurisdiction.split(',').forEach((jurisdiction: string) => {
      if (jurisdictionSelected.includes(jurisdiction)) {
        found = true;
      }
    })
  }
  return found ;
  
}

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
  if (locality.startsWith('Unincorporated') && locality.endsWith('County')) {
    return all;
  } else if (locality.endsWith('County')) {
      if (year && year < 2022) {
        return [NEW_PROJECT_TYPES.Capital, NEW_PROJECT_TYPES.Maintenance];
      } else {
        return [NEW_PROJECT_TYPES.Capital, NEW_PROJECT_TYPES.Maintenance, NEW_PROJECT_TYPES.Acquisition, NEW_PROJECT_TYPES.Special];
      }
  } else if (locality.endsWith('Service Area')) {
    if (year && year < 2022) {
      return [NEW_PROJECT_TYPES.Study, NEW_PROJECT_TYPES.Acquisition, NEW_PROJECT_TYPES.Special];
    } else {
      return [NEW_PROJECT_TYPES.Study];
    }
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

export const onDropFunction = (projectid: any, columns: any[], tabKey: string, state: boolean, sourceColumn: number, sourcePosition: number, destColumn:any, destPosition:any, saveData: Function) => { 
  let id = projectid;
  let project: any;
  let destinyColumnHasProject = false;
  // To check if the destiny Column has the same project
  columns[destColumn].projects.forEach((p: any) => {
    if (p.project_id == id) {
      destinyColumnHasProject = true;
    }
  })
  // To get the current project dragged
  columns[sourceColumn].projects.forEach((p: any) => {
    if (p.project_id == id) {
      project = p;
    }
  })
  console.log('bef columns', columns);
  // if dropped on the same column 
  if (sourceColumn === destColumn) {
    const currentColumn = [...columns[destColumn].projects];
    const result = Array.from([...currentColumn]);
    const [removed] = result.splice(sourcePosition, 1);
    result.splice(destPosition, 0, removed);
    columns[destColumn].projects = [...result];
    return columns;
  }
  if (tabKey === 'Maintenance') {
    var destinyColumnMaintenance = MaintenanceTypes.indexOf(project.projectData.projectsubtype) + 1;
    if (!(destColumn === 0 || destColumn === destinyColumnMaintenance)) {
      return;
    }
  }
  if (destinyColumnHasProject) {
    const newSumAmountData = {
      projectId: id,
      years: [null, null],
      amounts: []
    };
    const newAmounts: any = [];
    columns[destColumn].projects.forEach((p: any) => {
      if (p.project_id == id) {
        const numArray = [1,2,3,4,5];
        numArray.forEach((num: any) => {
          newAmounts.push(p[`req${num}`]);
        });
        newAmounts[destColumn-1] = newAmounts[destColumn-1] + newAmounts[sourceColumn-1];
        newAmounts[sourceColumn-1] = 0;
        newSumAmountData.amounts = newAmounts;
      }
    });
    saveData(newSumAmountData);
    return;
  } else {
    let newObj = {
      ...project,
      [`position${destColumn}`]: destPosition === -1 ? columns[destColumn].projects.length : destPosition,
      [`req${destColumn}`]: destColumn === 0 ? null : project[`req${sourceColumn}`],
      [`req${sourceColumn}`]: null,
      [`position${sourceColumn}`]: null,
    };
  }
}
export const onDropFn = (txt: any, columns: any[], columnIdx: number, tabKey: string, state:boolean, destColumn:any, destPosition:any, saveData: Function) => {
  let dragAction=[state, destColumn, destPosition]
  let { id, fromColumnIdx } = txt;
  let project: any;
  let destinyColumnHasProject = false;
  columns[columnIdx].projects.forEach((p: any) => {
    if (p.project_id == id) {
      destinyColumnHasProject = true;
    }
  })
  columns[fromColumnIdx].projects.forEach((p: any) => {
    if (p.project_id == id) {
      project = p;
    }
  })
  let newCardPos =  columns[Math.trunc(Number(dragAction[1]))].projects.length <= Math.trunc(Number(dragAction[2])) ? -1 : Math.trunc(Number(dragAction[2]));
  console.log('condition',fromColumnIdx, columnIdx)
  if (fromColumnIdx === columnIdx) {
    let beforePos = -1;
    columns[columnIdx].projects.forEach((p: any, posBef: number) => {
      if (p.project_id == id) {
        beforePos = posBef;
      }
    });
    
    let projects: any[] = [];
    if (newCardPos === -1) {
      console.log('columns[columnIdx].projects', columns[columnIdx].projects);
      projects = [].concat(columns[columnIdx].projects);
      projects.splice(beforePos, 1);
      projects.push(project);
    } else {
      if (beforePos === newCardPos) {
        return;
      } else {
        columns[columnIdx].projects.forEach((p: any, pos: number) => {
          if (pos === newCardPos) {
            console.log('projecsts to isert', project);
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
    const newSumAmountData = {
      projectId: id,
      years: [null, null],
      amounts: []
    };
    const newAmounts: any = [];
    columns[columnIdx].projects.forEach((p: any) => {
      if (p.project_id == id) {
        const numArray = [1,2,3,4,5];
        numArray.forEach((num: any) => {
          newAmounts.push(p[`req${num}`]);
        });
        newAmounts[columnIdx-1] = newAmounts[columnIdx-1] + newAmounts[fromColumnIdx-1];
        newAmounts[fromColumnIdx-1] = 0;
        newSumAmountData.amounts = newAmounts;
      }
    });
    saveData(newSumAmountData);
    return;
  } else {
    let newObj = {
      ...project,
      [`position${columnIdx}`]: newCardPos === -1 ? columns[columnIdx].projects.length : newCardPos,
      [`req${columnIdx}`]: columnIdx === 0 ? null : project[`req${fromColumnIdx}`],
      [`req${fromColumnIdx}`]: null,
      [`position${fromColumnIdx}`]: null,
    };
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
      if(temporalColumns[columnIdx].projects.length === 0){
        temporalColumns[columnIdx].projects.push(newObj);
      }else{
        let hasInserted = false;
        for (var i = 0 ; i < temporalColumns[columnIdx].projects.length ; i++) {
          let p = temporalColumns[columnIdx].projects[i];
          if (newCardPos === i) {
            hasInserted = true;
            arr.push(newObj);
          }
          arr.push(p)
        } 
        if (!hasInserted){
          arr.push(newObj);
        }
      temporalColumns[columnIdx].projects = arr;
    }
    }
    return temporalColumns;
  }
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

const getSuffix = (name: string) => {
  const element = list.filter((el: any) => {
    return el.aoi.includes(name);
  });
  if (element.length) {
    return element[0].filter;
  }
  return '';
}
const localityName = (name: string) => {
  return name.includes('County') || name.includes('county') || name.includes('Service Area') 
    ? name : name + ` ${getSuffix(name)}`;
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
    
    if ( tabKey!=='Maintenance'){
      for (county of sumByCounty) {
        const auxArray = [localityName(county.locality)];
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
  let localityMap: any = Object.create({});
  allProjects = allProjects.filter(projects => {
    return (projects.position1 !== null || projects.position2 !== null || projects.position3 !== null || projects.position4 !== null || projects.position5 !== null);
  });
  allProjects.forEach((p: any) => {
    let arr = (p.projectData[property] || '').split(',');
    for (let j = 0 ; j < arr.length ; j++) {
      let locality = arr[j];

      if (!localityMap[locality]) {
        localityMap[locality] = {
          req1: 0, req2: 0, req3: 0, req4: 0, req5: 0,
          cnt1: 0, cnt2: 0, cnt3: 0, cnt4: 0, cnt5: 0,
          projects: [],
        };
      }
      localityMap[locality].projects.push(p);
      for(var i = 1; i <= 5 ; i++) {
        if (p[`position${i}`] != null) {
          localityMap[locality][`req${i}`] += (p[`req${i}`] / arr.length);
          localityMap[locality][`cnt${i}`]++;
        }
      }
    }
  });
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
