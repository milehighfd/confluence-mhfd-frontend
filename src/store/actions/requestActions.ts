import * as types from 'store/types/requestTypes';
import * as projectTypes from 'store/types/ProjectTypes';
import { DragAndDropCards } from 'store/types/requestTypes';
import * as datasets from 'Config/datasets';
import { buildGeojsonForLabelsProjectsInBoards, getColumnSumAndTotals, getColumnTitle, mergeSumByGroupMaps, mergeTotalByGroupMaps, splitProjectsIdsByStatuses } from 'Components/Work/Request/RequestViewUtil';
import { BOARD_FOR_POSITIONS, GET_FILTER, SEND_PROJECT_TO_WORK_PLAN } from 'Config/endpoints/board';
import { BOARD_UPDATE_RANK, BOARD_UPDATE_TARGET_COST } from 'Config/endpoints/board-project';
import { SOUTH_PLATTE_RIVER, WORK_PLAN } from 'constants/constants';
import { sendProjectToBoardYear } from './ProjectActions';

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

export const setVisibleCreateOrImport = (payload: any) => ({
  type: types.REQUEST_SET_VISIBLE_CREATE_OR_IMPORT,
  payload
});

export const setIsCreatedFromBoard = (payload: any) => ({
  type: types.REQUEST_SET_IS_CREATED_FROM_BOARD,
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

export const loadOneColumn = (position: any) => {
  return (dispatch: any, getState: Function) => {
    const {
      request: {
        tabKey,
        year,
        filterRequest,
        namespaceId,
        localityFilter
      }
    } = getState();
    const filters = {
      county:filterRequest?.filter((item: any, index: number) => item.selected && 
      item.type === 'project_counties').map((r: any) => r.id),
      jurisdiction: filterRequest?.filter((item: any, index: number) => item.selected && 
      item.type === 'project_local_governments').map((r: any) => r.id),
      servicearea: filterRequest?.filter((item: any, index: number) => item.selected && 
      item.type === 'project_service_areas').map((r: any) => r.id),
      project_priorities: filterRequest?.filter((item: any, index: number) => item.selected && 
      item.type === 'project_priorities').map((r: any) => r.id),
      status_board: filterRequest?.filter((item: any, index: number) => item.selected &&
      item.type === 'status').map((r: any) => r.id),
      sponsor_board: filterRequest?.filter((item: any, index: number) => item.selected &&
      item.type === 'project_partners').map((r: any) => r.id),
      name: filterRequest?.find((item: any, index: number) => item.type === 'search_name')?.name || '',
      isSouthPlate: false,
      isMHFD: localityFilter === ('Mile High Flood District' || 'MHFD District Work Plan'),
      isWorkPlan: namespaceId.type === WORK_PLAN,
    };
    const isSouthPlate = filterRequest?.filter((item: any, index: number) => item.selected && item.type === 'project_service_areas')
      .find((r: any) => r.name === SOUTH_PLATTE_RIVER) !== undefined;
    if (isSouthPlate && namespaceId.type === WORK_PLAN) {
      filters.isSouthPlate = true;
      filters.servicearea = [];
    }
    dispatch({
      type: types.REQUEST_START_LOADING_COLUMNS_2
    });
    datasets.postData(BOARD_FOR_POSITIONS, { boardId: namespaceId, position, filters }, datasets.getToken())
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

export const loadColumns = () => {
  return (dispatch: any, getState: Function) => {
    const {
      request: {
        namespaceId,
        tabKey,
        year,
        filterRequest,
        localityFilter
      }
    } = getState();
    const filters = {
      county:filterRequest?.filter((item: any, index: number) => item.selected && 
      item.type === 'project_counties').map((r: any) => r.id),
      jurisdiction: filterRequest?.filter((item: any, index: number) => item.selected && 
      item.type === 'project_local_governments').map((r: any) => r.id),
      servicearea: filterRequest?.filter((item: any, index: number) => item.selected && 
      item.type === 'project_service_areas').map((r: any) => r.id),
      project_priorities: filterRequest?.filter((item: any, index: number) => item.selected && 
      item.type === 'project_priorities').map((r: any) => r.id),
      status_board: filterRequest?.filter((item: any, index: number) => item.selected &&
      item.type === 'status').map((r: any) => r.id),
      sponsor_board: filterRequest?.filter((item: any, index: number) => item.selected &&
      item.type === 'project_partners').map((r: any) => r.id),
      name: filterRequest?.find((item: any, index: number) => item.type === 'search_name')?.name || '',
      isSouthPlate: false,
      isMHFD: localityFilter === ('Mile High Flood District' || 'MHFD District Work Plan'),
      isWorkPlan: namespaceId.type === WORK_PLAN,
    };
    dispatch({
      type: types.REQUEST_START_LOADING_COLUMNS_2
    });
    const isSouthPlate = filterRequest?.filter((item: any, index: number) => item.selected && item.type === 'project_service_areas')
      .find((r: any) => r.name === SOUTH_PLATTE_RIVER) !== undefined;
    if (isSouthPlate  && namespaceId.type === WORK_PLAN) {
      filters.isSouthPlate = true;
      filters.servicearea = [];
    }
    const promises = [];
    for (let position = 0; position <= 5; position++) {
      const promise = datasets.postData(
        BOARD_FOR_POSITIONS,
        { boardId: namespaceId, position, filters }
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
      function dispatchSumByGroup(type: string, key: string) {
        dispatch({
          type,
          payload: Object.keys(sumByGroupMapTotal[key] || {}).map((k: any) => sumByGroupMapTotal[key][k])
        });
      }      
      dispatchSumByGroup(types.REQUEST_SET_SUM_BY_COUNTY, 'project_counties');
      dispatchSumByGroup(types.REQUEST_SET_SUM_BY_SA, 'project_service_areas');
      dispatchSumByGroup(types.REQUEST_SET_SUM_BY_LG, 'project_partners_for_total');
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

export const updateTargetCost = (targetCosts: any) => {
  return (_: any, getState: Function) => {
    const {
      request: {
        namespaceId
      }
    } = getState();
    datasets.putData(
      BOARD_UPDATE_TARGET_COST,
      {
        ...targetCosts,
        boardId: namespaceId,
      },
      datasets.getToken()
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
    const { request: { columns2 } } = getState();
    const { originColumnPosition, targetPosition, isWorkPlan } = payload;
    const updatedColumns = moveProjectsManualReducer(columns2, { payload });
    const projectsUpdated = updatedColumns[originColumnPosition].projects;
    const before = targetPosition === 0 ? null : projectsUpdated[targetPosition - 1][`rank${originColumnPosition}`];
    const after = targetPosition === projectsUpdated.length - 1 ? null : projectsUpdated[targetPosition + 1][`rank${originColumnPosition}`];
    dispatch({
      type: types.REQUEST_MOVE_PROJECTS_MANUAL,
      payload: updatedColumns
    });
    datasets.putData(
      BOARD_UPDATE_RANK(projectsUpdated[targetPosition].board_project_id),
      {
        before,
        after,
        columnNumber: originColumnPosition,
        beforeIndex: targetPosition - 1,
        afterIndex: targetPosition === projectsUpdated.length - 1 ? -1 : targetPosition + 1,
        isWorkPlan
      },
      datasets.getToken()
    ).then(() => {
        dispatch(loadOneColumn(originColumnPosition));
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

  const requestFields = {};
  const newProject = {
    ...sourceProject,
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
    const { request: { columns2 } } = getState();
    const { originColumnPosition, targetColumnPosition, targetPosition, isWorkPlan } = payload;
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
      BOARD_UPDATE_RANK(projectsUpdated[projectPosition].board_project_id),
      {
        before: !before ? null : before,
        after: !after ? null : after,
        columnNumber: targetColumnPosition,
        beforeIndex: projectPosition - 1,
        afterIndex: projectPosition === projectsUpdated.length - 1 ? -1 : projectPosition + 1,
        targetPosition: projectPosition,
        otherFields: { ...requestFields, [`rank${originColumnPosition}`]: null },
        isWorkPlan
      },
      datasets.getToken()
    ).then((res: any) => {
      dispatch(loadOneColumn(originColumnPosition));
      dispatch(loadOneColumn(targetColumnPosition));
    })
    .catch((err: any) => {
        console.log('err', err)
    })
  }
};

export const recalculateTotals = () => {
  return (dispatch: any, getState: Function) => {
    const { request: { columns2 } } = getState();
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
      payload: Object.keys(sumByGroupMapTotal['project_partners_for_total'] || {}).map(
        (key: any) => sumByGroupMapTotal['project_partners_for_total'][key]
      )
    });
    dispatch({
      type: types.REQUEST_SET_SUM_TOTAL,
      payload: totalByGroupMap
    });
  }
};
interface TransformedDataItem {
  id: number;
  name: string;
  selected: boolean;
  type: string;
}
export const loadFilters = () => {
  return (dispatch: any, getState: Function) => {
    const {
      request: {
        namespaceId,
        filterRequest
      }
    } = getState();
    dispatch(setFilterLoading(true))
    const lastFilterValues = filterRequest;
    datasets.postData(GET_FILTER, { boardId: namespaceId }, datasets.getToken()).then((res: any) => {
      let priorityFilterList =  [
        { name: '1', id: 0, selected: false, type: 'project_priorities' },
        { name: '2', id: 1, selected: false, type: 'project_priorities' },
        { name: '3', id: 2, selected: false, type: 'project_priorities' },
        { name: 'Over 3', id: 3, selected: false, type: 'project_priorities' },
        { name: 'Work Plan', id: 4, selected: false, type: 'project_priorities' }
      ];
      const transformedData: TransformedDataItem[] = [];
      for (const key in res) {
        if (Object.prototype.hasOwnProperty.call(res, key)) {
          const element = res[key];
          element.forEach((item: { [key: string]: number | string }) => {
            const id: number = item[Object.keys(item)[0]] as number;
            const name: string = item[Object.keys(item)[1]] as string;
            const selected: boolean = false;
            const type: string = key;
            transformedData.push({ id, name, selected, type });
          });
        }
      }
      const allData = [...priorityFilterList, ...transformedData];
      lastFilterValues.forEach((filterItem:any) => {
        const index = allData.findIndex(dataItem =>
          filterItem.id === dataItem.id && filterItem.name === dataItem.name && filterItem.type === dataItem.type
        );
        if (index !== -1) {
          allData[index].selected = filterItem.selected;
        } else if (filterItem.selected) {
          allData.push(filterItem);
        }
      });
      const searchNameItem = lastFilterValues?.find((item: any) => item.type === 'search_name');
      const index = allData.findIndex(item => item.type === 'search_name');
      if (searchNameItem && index !== -1) {
        allData[index].name = searchNameItem.name;
      } else if (searchNameItem) {
        allData.push({ ...searchNameItem, id: 1, selected: false });
      } else {
        allData.push({ ...searchNameItem, name: '', id: 1, selected: false });
      }
      dispatch({
        type: types.REQUEST_SET_FILTER_REQUEST,
        payload: allData
      });
      dispatch({
        type: types.REQUEST_SET_FILTER_MAP,
        payload: res
      });
      dispatch(setFilterLoading(false))
    })
    .catch((err: any) => {
        console.log('err', err)
    })
  }
}

export const emptyBoard = () => ({
  type: types.REQUEST_EMPTY_BOARD
})

export const toggleFilter = (type: any, id: any) => {
  return (dispatch: any, getState: Function) => {
    const { request: { filterRequest } } = getState();
    const newFilterRequest = filterRequest.map((item: any) => {
      if (item.id === id && item.type === type) {
        return {
          ...item,
          selected: !item.selected
        }
      }
      return item;
    });
    dispatch({
      type: types.REQUEST_SET_FILTER_REQUEST,
      payload: newFilterRequest
    })
  }
};

export const setFilterRequest = (payload: any) => {
  return (dispatch: any) => {
    dispatch({
      type: types.REQUEST_SET_FILTER_REQUEST,
      payload
    })
  }
};

export const setListView = (payload: any) => {
  return (dispatch: any) => {
    dispatch({
      type: types.SET_IS_LIST_VIEW,
      payload
    })
  }
};

export const setFilterYear = (payload: any) => {
  return (dispatch: any) => {
    dispatch({
      type: types.SET_FILTER_YEAR,
      payload
    })
  }
};

export const setDisableFilterComponent = (disable: any, localityType: any) => {
  if (localityType === 'county') {
    return (dispatch: any) => {
      dispatch({
        type: types.REQUEST_SET_DISABLE_FILTER_COUNTY,
        payload: disable
      })
    }
  }else{
    return (dispatch: any) => {
      dispatch({
        type: types.REQUEST_SET_DISABLE_FILTER_SERVICE_AREA,
        payload: disable
      })
    }
  }  
}

export const setConfiguredYear = (payload: any) => ({
  type: types.REQUEST_SET_CONFIGURED_YEAR,
  payload
});

export const startLoadingColumns = () => ({
  type: types.REQUEST_START_LOADING_COLUMNS_2
});

export const stopLoadingColumns = () => ({
  type: types.REQUEST_STOP_LOADING_COLUMNS_2
});

export const sendProjectToWorkPlan = (project_type: string, year: number, board_project_id: number) => {
  return async (dispatch: any) => { 
    try {
      datasets.postData(
        SEND_PROJECT_TO_WORK_PLAN,
        {
          project_type,
          year,
          board_project_id,
        },
        datasets.getToken()
      ).then((res) => {
        if (res.MhfdBoard.status === 'Approved') {
          dispatch(sendProjectToBoardYear(
            res?.newBoardProject?.project_id,
            res?.MhfdBoard?.year,
            [],
            res?.newBoardProject?.origin,
            res?.MhfdBoard?.projecttype,
            [],
            ''
          ));
        }
        dispatch({
          type: types.REQUEST_SET_SENT_TO_WP,
          payload: true
        });
        dispatch(loadColumns());
      }).catch((error) => {
        console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setSentToWP = (payload: boolean) => ({
  type: types.REQUEST_SET_SENT_TO_WP,
  payload
});

export const setFilterLoading = (payload: boolean) => ({
  type: types.REQUEST_SET_FILTER_LOADING,
  payload
});

export const setIsImported = (payload: boolean) => ({
  type: types.REQUEST_SET_IS_IMPORTED,
  payload
});

export const setImportedProjectData = (payload: any) => ({
  type: types.REQUEST_SET_IMPORTED_PROJECT_TYPE,
  payload
});
