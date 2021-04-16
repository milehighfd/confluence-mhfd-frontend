import { boardProject, columnProject } from "./RequestTypes";
import CardStatService from './CardService';
let fields = ['project_id', 'req1', 'req2', 'req3', 'req4', 'req5', 'positon0', 'positon1', 'positon2', 'positon3', 'positon4', 'positon5'];

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
      }
    } else  {
      areEqual = false;
    }
  })
  return areEqual;
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
  return `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
  if (destinyColumnHasProject || tabKey === 'Maintenance') {
    return;
  } else {
    let newObj = {
      ...project,
      [`position${columnIdx}`]: newCardPos === -1 ? columns[columnIdx].projects.length : newCardPos,
      [`req${columnIdx}`]: project[`req${fromColumnIdx}`],
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
