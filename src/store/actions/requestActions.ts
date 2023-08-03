import { SERVER } from 'Config/Server.config';
import * as types from 'store/types/requestTypes';
import * as projectTypes from 'store/types/ProjectTypes';
import { DragAndDropCards } from 'store/types/requestTypes';
import * as datasets from 'Config/datasets';
import { buildGeojsonForLabelsProjectsInBoards, getColumnSumAndTotals, getColumnTitle, mergeSumByGroupMaps, mergeTotalByGroupMaps, splitProjectsIdsByStatuses } from 'Components/Work/Request/RequestViewUtil';
import { BOARD_FOR_POSITIONS, GET_FILTER } from 'Config/endpoints/board';
import { WORK_PLAN_TAB } from 'constants/constants';

export const setShowModalProject = (payload: boolean) => ({
  type: types.REQUEST_SHOW_MODAL_PROJECT,
  payload
});

export const setCompleteProjectData = (payload: any) => ({
  type: types.REQUEST_COMPLETE_PROJECT_DATA,
  payload
});

export const setLocality = (payload: any) => ({
  type: types.REQUEST_SET_LOCALITY,
  payload
});

export const setYear = (payload: any) => ({
  type: types.REQUEST_SET_YEAR,
  payload
});

export const setTabKey = (payload: any) => ({
  type: types.REQUEST_SET_TAB_KEY,
  payload
});

export const setYearList = (payload: any) => ({
  type: types.REQUEST_SET_YEAR_LIST,
  payload
});

export const setShowCreateProject = (payload: any) => ({
  type: types.REQUEST_SET_SHOW_CREATE_PROJECT,
  payload
});

export const setProblemId = (payload: any) => ({
  type: types.REQUEST_SET_PROBLEM_ID,
  payload
});

export const setShowAnalytics = (payload: any) => ({
  type: types.REQUEST_SET_SHOW_ANALYTICS,
  payload
});

export const setSumByCounty = (payload: any) => ({
  type: types.REQUEST_SET_SUM_BY_COUNTY,
  payload
});

export const setSumTotal = (payload: any) => ({
  type: types.REQUEST_SET_SUM_TOTAL,
  payload
});

export const setTotalCountyBudget = (payload: any) => ({
  type: types.REQUEST_SET_TOTAL_COUNTY_BUDGET,
  payload
});

export const setNamespaceId = (payload: any) => ({
  type: types.REQUEST_SET_NAMESPACE_ID,
  payload
});

export const setShowBoardStatus = (payload: any) => ({
  type: types.REQUEST_SET_SHOW_BOARD_STATUS,
  payload
});

export const setBoardStatus = (payload: any) => ({
  type: types.REQUEST_SET_BOARD_STATUS,
  payload
});

export const setBoardSubstatus = (payload: any) => ({
  type: types.REQUEST_SET_BOARD_SUBSTATUS,
  payload
});

export const setBoardComment = (payload: any) => ({
  type: types.REQUEST_SET_BOARD_COMMENT,
  payload
});

export const setAlertStatus = (payload: any) => ({
  type: types.REQUEST_SET_ALERT_STATUS,
  payload
});

export const setShowAlert = (payload: any) => ({
  type: types.REQUEST_SET_SHOW_ALERT,
  payload
});

export const setShowFilters = (payload: any) => ({
  type: types.REQUEST_SET_SHOW_FILTERS,
  payload
});

export const setJurisdictionFilterList = (payload: any) => ({
  type: types.REQUEST_SET_JURISDICTION_FILTER_LIST,
  payload
});

export const setCsaFilterList = (payload: any) => ({
  type: types.REQUEST_SET_CSA_FILTER_LIST,
  payload
});

export const setPrioritySelected = (payload: any) => ({
  type: types.REQUEST_SET_PRIORITY_SELECTED,
  payload
});

export const setJurisdictionSelected = (payload: any) => ({
  type: types.REQUEST_SET_JURISDICTION_SELECTED,
  payload
});

export const setCountiesSelected = (payload: any) => ({
  type: types.REQUEST_SET_COUNTIES_SELECTED,
  payload
});

export const setServiceAreasSelected = (payload: any) => ({
  type: types.REQUEST_SET_SERVICEAREAS_SELECTED,
  payload
});

export const setProjectStatusesSelected = (payload: any) => ({
  type: types.REQUEST_SET_PROJECT_STATUSES_SELECTED,
  payload
});

export const setIsLocatedInSouthPlateRiverSelected = (payload: any) => ({
  type: types.REQUEST_SET_IS_SOUTH_PLATTE_RIVER_SELECTED,
  payload
});

export const setCsaSelected = (payload: any) => ({
  type: types.REQUEST_SET_CSA_SELECTED,
  payload
});

export const setLocalityType = (payload: any) => ({
  type: types.REQUEST_SET_LOCALITY_TYPE,
  payload
});

export const setVisibleCreateProject = (payload: any) => ({
  type: types.REQUEST_SET_VISIBLE_CREATE_PROJECT,
  payload
});

export const setLeftWidth = (payload: any) => ({
  type: types.REQUEST_SET_LEFT_WIDTH,
  payload
});

export const setLocalities = (payload: any) => ({
  type: types.REQUEST_SET_LOCALITIES,
  payload
});

export const setColumns = (payload: any) => ({
  type: types.REQUEST_SET_COLUMNS,
  payload
});

export const setReqManager = (payload: any) => ({
  type: types.REQUEST_SET_REQ_MANAGER,
  payload
});

export const setDiff = (payload: any) => ({
  type: types.REQUEST_SET_DIFF,
  payload
});

export const loadOneColumn = (board_id: any, position: any) => {
  return (dispatch: any, getState: Function) => {
    const { request: { tabKey, year, filterMap, countiesSelected, jurisdictionSelected, serviceAreasSelected, prioritySelected, projectStatusesSelected, isLocatedInSouthPlateRiverSelected, }, router: { location } } = getState();
    const jurisdictionFilterList: any[] = filterMap['project_local_governments'];
    const countiesFilterList: any[] = filterMap['project_counties'];
    const serviceAreasFilterList: any[] = filterMap['project_service_areas'];
    const projectStatusesFilterList: any[] = filterMap['project_statuses'];
    const priorityFilterList = [
      { label: '1', value: 0 },
      { label: '2', value: 1 },
      { label: '3', value: 2 },
      { label: 'Over 3', value: 3 },
      { label: 'Work Plan', value: 4 }
    ];
    const isLocatedInSouthPlateRiverFilter = [
      { label: 'Yes', value: 1 }
    ];
    const filters = {
      project_counties: countiesFilterList.filter((_: any, index: number) => {
        return countiesSelected[index];
      }).map((r: any) => r.state_county_id),
      project_local_governments: jurisdictionFilterList.filter((_: any, index: number) => {
        return jurisdictionSelected[index];
      }).map((r: any) => r.code_local_government_id),
      project_service_areas: serviceAreasFilterList.filter((_: any, index: number) => {
        return serviceAreasSelected[index];
      }).map((r: any) => r.code_service_area_id),
      project_priorities: priorityFilterList.filter((_: any, index: number) => {
        return prioritySelected[index];
      }).map((r: any) => r.value),
      project_statuses: projectStatusesFilterList?.filter((_: any, index: number) => {
        return projectStatusesSelected[index];
      })?.map((r: any) => r?.code_status_type_id),
      isSouthPlatteRiver: isLocatedInSouthPlateRiverFilter?.filter((_: any, index: number) => {
        return isLocatedInSouthPlateRiverSelected[index];
      })?.map((r: any) => r?.value),
    };
    
    dispatch({
      type: types.REQUEST_START_LOADING_COLUMNS_2
    });
    datasets.postData(BOARD_FOR_POSITIONS, { board_id, position, filters })
    .then((projects) => {
      let sumByGroupMap = {}, groupTotal = {};
      if (position !== 0) {
        [sumByGroupMap, groupTotal] = getColumnSumAndTotals(projects, position);
      }
      dispatch({
        type: types.REQUEST_SET_COLUMNS_2,
        payload: {
          title: getColumnTitle(position, tabKey, year),
          position,
          projects,
          sumByGroupMap,
          groupTotal
        }
      });
      dispatch(recalculateTotals())
    });
  }
}

export const loadColumns = (board_id: any) => {
  return (dispatch: any, getState: Function) => {
    const { map: { tabActiveNavbar }, request: { tabKey, year, filterMap, countiesSelected, jurisdictionSelected, serviceAreasSelected, prioritySelected, projectStatusesSelected, isLocatedInSouthPlateRiverSelected }, router: { location } } = getState();
    const jurisdictionFilterList: any[] = filterMap['project_local_governments'];
    const countiesFilterList: any[] = filterMap['project_counties'];
    const serviceAreasFilterList: any[] = filterMap['project_service_areas'];
    const projectStatusesFilterList: any[] = filterMap['project_statuses'];
    const priorityFilterList = [
      { label: '1', value: 0 },
      { label: '2', value: 1 },
      { label: '3', value: 2 },
      { label: 'Over 3', value: 3 },
      { label: 'Work Plan', value: 4 }
    ];
    const isLocatedInSouthPlateRiverFilter = [
      { label: 'Yes', value: 1 }
    ];
    const filters = {
      project_counties: countiesSelected.every((r: any) => r) ? undefined : countiesFilterList?.filter((_: any, index: number) => {
        return countiesSelected[index];
      }).map((r: any) => r.state_county_id),
      project_local_governments: jurisdictionSelected.every((r: any) => r) ? undefined : jurisdictionFilterList?.filter((_: any, index: number) => {
        return jurisdictionSelected[index];
      }).map((r: any) => r.code_local_government_id),
      project_service_areas: serviceAreasSelected.every((r: any) => r) ? undefined :  serviceAreasFilterList?.filter((_: any, index: number) => {
        return serviceAreasSelected[index];
      }).map((r: any) => r.code_service_area_id),
      project_priorities: prioritySelected.every((r: any) => r) ? undefined : priorityFilterList?.filter((_: any, index: number) => {
        return prioritySelected[index];
      }).map((r: any) => r.value),
      project_statuses: projectStatusesSelected.every((r: any) => r) ? undefined : projectStatusesFilterList?.filter((_: any, index: number) => {
        return projectStatusesSelected[index];
      })?.map((r: any) => r?.code_status_type_id),
      isSouthPlatteRiver: isLocatedInSouthPlateRiverSelected.every((r: any) => r) ? undefined : isLocatedInSouthPlateRiverFilter?.filter((_: any, index: number) => {
        return isLocatedInSouthPlateRiverSelected[index];
      })?.map((r: any) => r?.value),
    };


    dispatch({
      type: types.REQUEST_START_LOADING_COLUMNS_2
    });
    const promises = [];
    for (let position = 0; position <= 5; position++) {
      const promise = datasets.postData(
        BOARD_FOR_POSITIONS,
        { board_id, position, filters, year, tabActiveNavbar }
      ).then((projects) => {
        let sumByGroupMap = {}, groupTotal = {};
        if (position !== 0) {
          [sumByGroupMap, groupTotal] = getColumnSumAndTotals(projects, position);
        }
        dispatch({
        type: types.REQUEST_SET_COLUMNS_2,
          payload: {
            title: getColumnTitle(position, tabKey, year),
            position,
            projects,
            sumByGroupMap,
            groupTotal
          }
        });
        return [sumByGroupMap, groupTotal, projects];
      });
      promises.push(promise);
    }
    Promise.all(promises).then((dataArray) => {
      console.log('Data array ', dataArray);
      const sums: any[] = [];
      const totals: any[] = [];      
      dataArray.forEach(([sumByGroupMap, groupTotal]: any[], columnId: number) => {
        if (columnId === 0) return;
        sums.push(sumByGroupMap);
        totals.push(groupTotal);
      });

      const sumByGroupMapTotal = mergeSumByGroupMaps(sums);
      const totalByGroupMap = mergeTotalByGroupMaps(totals);
      const allProjects = dataArray.map(r => r[2]).flat();      
      dispatch(groupProjects(allProjects));        
      const mainKey = tabActiveNavbar === WORK_PLAN_TAB ? (tabKey === 'Study' ? 'project_service_areas' : 'project_counties') : 'project_counties' ;     
      // dispatch({
      //   type: types.REQUEST_SET_SUM_BY_COUNTY,
      //   payload: Object.keys(sumByGroupMapTotal['project_counties'] || {}).map(
      //     (key: any) => sumByGroupMapTotal['project_counties'][key]
      //   )
      // });
      function dispatchSumByGroup(type: string, key: string) {
        dispatch({
          type,
          payload: Object.keys(sumByGroupMapTotal[key] || {}).map((k: any) => sumByGroupMapTotal[key][k])
        });
      }      
      dispatchSumByGroup(types.REQUEST_SET_SUM_BY_COUNTY, 'project_counties');
      dispatchSumByGroup(types.REQUEST_SET_SUM_BY_SA, 'project_service_areas');
      dispatchSumByGroup(types.REQUEST_SET_SUM_BY_LG, 'project_local_governments');
      dispatch({
        type: types.REQUEST_SET_SUM_TOTAL,
        payload: totalByGroupMap
      });

      dispatch({
        type: types.REQUEST_STOP_LOADING_COLUMNS_2
      });

    });
  }
}
const groupProjects = (allProjects: any) => {
  return (dispatch: any) => {
    const groupedIdsByStatusId: any = splitProjectsIdsByStatuses(allProjects);
    const geojson: any = buildGeojsonForLabelsProjectsInBoards(allProjects);
    let ids = Array.from(
      new Set(
        allProjects.map((project: any) => project.project_id)
      )
    );
    dispatch({
      type: projectTypes.SET_BOARD_PROJECTS,
      boardProjects: {
        ids,
        groupedIds: groupedIdsByStatusId,
        geojsonData: geojson
      }
    });
  }
}

export const setBoard = (payload: any) => ({
  type: types.REQUEST_SET_BOARD,
  payload
});

export const setLocalityFilter = (payload: any) => ({
  type: types.REQUEST_SET_LOCALITY_FILTER,
  payload
});

export const setDataAutocomplete = (payload: any) => ({
  type: types.REQUEST_SET_DATA_AUTOCOMPLETE,
  payload
});

export const setIsOnSelected = (payload: any) => ({
  type: types.REQUEST_SET_IS_ON_SELECTED,
  payload
});

export const setColumns2Manual = (payload: any) => ({
  type: types.REQUEST_SET_COLUMNS_2_MANUAL,
  payload
});

export const updateTargetCost = (board_id: any, targetCosts: any) => {
  return (dispatch: any) => {
    datasets.putData(
      SERVER.BOARD_UPDATE_TARGET_COST(board_id),
      targetCosts
    );
  }
}

const moveProjectsManualReducer = (columns2: any[], action: any) => {
  return columns2.map((column: any, columnId: number) => {
    if (action.payload.originColumnPosition === columnId) {
      const projectArray = [...column.projects];
      const removedProject = projectArray.splice(action.payload.sourcePosition, 1)[0];
      projectArray.splice(action.payload.targetPosition, 0, removedProject);
      return {
        ...column,
        projects: projectArray
      }
    }
    return column;
  });
};

export const moveProjectsManual = (payload: DragAndDropCards) => {
  return (dispatch: any, getState: Function) => {
    const { request: { columns2, namespaceId } } = getState();
    const { originColumnPosition, targetPosition } = payload;
    const updatedColumns = moveProjectsManualReducer(columns2, { payload });
    const projectsUpdated = updatedColumns[originColumnPosition].projects;
    const before = targetPosition === 0 ? null : projectsUpdated[targetPosition - 1][`rank${originColumnPosition}`];
    const after = targetPosition === projectsUpdated.length - 1 ? null : projectsUpdated[targetPosition + 1][`rank${originColumnPosition}`];
    dispatch({
      type: types.REQUEST_MOVE_PROJECTS_MANUAL,
      payload: updatedColumns
    });
    datasets.putData(
      SERVER.BOARD_UPDATE_RANK(projectsUpdated[targetPosition].board_project_id),
      {
        before,
        after,
        columnNumber: originColumnPosition,
        beforeIndex: targetPosition - 1,
        afterIndex: targetPosition === projectsUpdated.length - 1 ? -1 : targetPosition + 1,
      },
      datasets.getToken()
    ).then(() => {
        dispatch(loadOneColumn(namespaceId, originColumnPosition));
    })
    .catch((err: any) => {
        console.log('err', err)
    })
  }
};

const handleMoveFromColumnToColumnReducer = (columns2: any[], action: any): any[] => {
  const sourceProject = columns2[action.payload.originColumnPosition].projects[action.payload.sourcePosition];

  const targetColumnProjects: any[] = columns2[action.payload.targetColumnPosition].projects;
  const targetColumnSameProjectIndex = targetColumnProjects.reduce((index: any, project: any, currentIndex: number) => {
    if (index === -1 && project.project_id === sourceProject.project_id) {
      index = currentIndex;
    }
    return index;
  }, -1);

  let newRequestValue = sourceProject[`req${action.payload.originColumnPosition}`];
  if (targetColumnSameProjectIndex !== -1) {
    const currentRequest = targetColumnProjects[targetColumnSameProjectIndex][`req${action.payload.targetColumnPosition}`];
    newRequestValue = currentRequest + newRequestValue;
  }
  const requestFields = {
    [`req${action.payload.targetColumnPosition}`]: newRequestValue,
    [`req${action.payload.originColumnPosition}`]: null
  };
  const newProject = {
    ...sourceProject,
    ...requestFields
  };

  const columns = columns2.map((column: any, columnId: number) => {
    if (action.payload.originColumnPosition === columnId) {
      return {
        ...column,
        projects: column.projects.filter((_: any, positionId: number) => {
          return positionId !== action.payload.sourcePosition;
        })
      }
    } else if (action.payload.targetColumnPosition === columnId) {
      if (targetColumnSameProjectIndex === -1) {  
        return {
          ...column,
          projects: [
            ...column.projects.slice(0, action.payload.targetPosition),
            newProject,
            ...column.projects.slice(action.payload.targetPosition)
          ]
        }
      } else {
        return {
          ...column,
          projects: column.projects.map((project: any, positionId: number) => {
            if (positionId === targetColumnSameProjectIndex) {
              return newProject;
            }
            return project;
          })
        }
      }
    }
    return column;
  });
  return [columns, requestFields, targetColumnSameProjectIndex];
};

export const handleMoveFromColumnToColumn = (payload: DragAndDropCards) => {
  return (dispatch: any, getState: Function) => {
    const { request: { columns2, namespaceId } } = getState();
    const { originColumnPosition, targetColumnPosition, targetPosition } = payload;
    const [
      updatedColumns,
      requestFields,
      targetColumnSameProjectIndex
    ] = handleMoveFromColumnToColumnReducer(columns2, { payload });
    const projectsUpdated = updatedColumns[targetColumnPosition].projects;
    const projectPosition = targetColumnSameProjectIndex === -1 ? targetPosition : targetColumnSameProjectIndex;
    const before = projectPosition === 0 ? null : projectsUpdated[projectPosition - 1][`rank${targetColumnPosition}`];
    const after = projectPosition >= projectsUpdated.length - 1 ? null : projectsUpdated[projectPosition + 1][`rank${targetColumnPosition}`];
    dispatch({
      type: types.REQUEST_HANDLE_MOVE_FROM_COLUMN_TO_COLUMN_MANUAL,
      payload: updatedColumns
    });
    datasets.putData(
      SERVER.BOARD_UPDATE_RANK(projectsUpdated[projectPosition].board_project_id),
      {
        before: !before ? null : before,
        after: !after ? null : after,
        columnNumber: targetColumnPosition,
        beforeIndex: projectPosition - 1,
        afterIndex: projectPosition === projectsUpdated.length - 1 ? -1 : projectPosition + 1,
        targetPosition: projectPosition,
        otherFields: { ...requestFields, [`rank${originColumnPosition}`]: null }
      },
      datasets.getToken()
    ).then((res: any) => {
      dispatch(loadOneColumn(namespaceId, originColumnPosition));
      dispatch(loadOneColumn(namespaceId, targetColumnPosition));
    })
    .catch((err: any) => {
        console.log('err', err)
    })
  }
};

export const recalculateTotals = () => {
  return (dispatch: any, getState: Function) => {
    const { request: { columns2, tabKey } } = getState();
    const sums: any[] = [];
    const totals: any[] = [];
    const allProjects: any = [];
    columns2.forEach((column: any, columnId: number) => {
      allProjects.push(...column.projects);
      if (columnId === 0) return;
      sums.push(column.sumByGroupMap);
      totals.push(column.groupTotal);
    });
    dispatch(groupProjects(allProjects));
    const sumByGroupMapTotal = mergeSumByGroupMaps(sums);
    const totalByGroupMap = mergeTotalByGroupMaps(totals);
    const mainKey = window.location.pathname.includes('work-plan') ? (tabKey === 'Study' ? 'project_service_areas' : 'project_counties') : 'project_local_governments' ;
    console.log('window.location.pathname', window.location.pathname);
    dispatch({
      type: types.REQUEST_SET_SUM_BY_COUNTY,
      payload: Object.keys(sumByGroupMapTotal['project_counties'] || {}).map(
        (key: any) => sumByGroupMapTotal['project_counties'][key]
      )
    });
    dispatch({
      type: types.REQUEST_SET_SUM_BY_SA,
      payload: Object.keys(sumByGroupMapTotal['project_service_areas'] || {}).map(
        (key: any) => sumByGroupMapTotal['project_service_areas'][key]
      )
    });
    dispatch({
      type: types.REQUEST_SET_SUM_BY_LG,
      payload: Object.keys(sumByGroupMapTotal['project_local_governments'] || {}).map(
        (key: any) => sumByGroupMapTotal['project_local_governments'][key]
      )
    });
    dispatch({
      type: types.REQUEST_SET_SUM_TOTAL,
      payload: totalByGroupMap
    });
  }
};

export const loadFilters = (board_id: any) => {
  return (dispatch: any) => {
    datasets.getData(
      GET_FILTER(board_id),
    ).then((res: any) => {
      dispatch({
        type: types.REQUEST_SET_FILTER_MAP,
        payload: res
      });
    })
    .catch((err: any) => {
        console.log('err', err)
    })
  }
}
