import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { Row, Col, Dropdown, Button, Tabs, Input, Menu, Popover, MenuProps, List } from 'antd';
import { useLocation } from 'react-router-dom';
import { getGroupListWithAbortController } from 'routes/portfolio-view/components/ListUtils';
import GenericTabView from 'Components/Shared/GenericTab/GenericTabView';
import {
  FILTER_PROBLEMS_TRIGGER,
  FILTER_PROJECTS_TRIGGER,
  SORTED_PROBLEMS,
  SORTED_PROJECTS,
  PROBLEMS_TRIGGER,
  PROJECTS_TRIGGER,
  COMPONENTS_TRIGGER,
  SELECT_ALL_FILTERS
} from 'constants/constants';
import { useMapDispatch, useMapState } from 'hook/mapHook';
import { capitalLetter, elementCost, getStatus } from 'utils/utils';
import { useProfileDispatch, useProfileState } from 'hook/profileHook';
import { useDetailedState } from 'hook/detailedHook';
import { getCurrentProjectStatus, getMainSponsor } from 'utils/parsers';
import { useProjectDispatch } from 'hook/projectHook';
import { SERVER } from 'Config/Server.config';
import ApplyMapViewFilter from './ApplyMapViewFilter';
import { useFilterContext } from 'utils/filterContext';
import ListViewMap from './ListViewMap';
import MapAutoComplete from 'routes/map/components/MapAutoComplete';
import FiltersProjectView from 'Components/FiltersProject/FiltersProjectView';

const STATUS = 'status',
  JURISDICTION = 'jurisdiction',
  COUNTY = 'county',
  SERVICE_AREA = 'servicearea',
  CONSULTANT = 'consultant',
  CONTRACTOR = 'contractor',
  STREAMS = 'streams',
  PROJECTTYPE = 'projecttype',
  MHFD_LEAD = 'staff',
  LG_LEAD = 'lg_lead',
  FAVORITES = 'Favorites',
  TEAMS = 'teams';

const tabs = [FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER];
let contents: any = [];
contents.push(
  <div className="popoveer-00">
    <b>Problems:</b> Problems represent areas where values such as public health, safety, and environmental quality are
    at risk due to potential flooding, erosion, or other identified threats within MHFD’s purview.
  </div>,
);
contents.push(
  <div className="popoveer-00">
    <b>Projects:</b> Projects are active efforts (i.e. planned and budgeted or funded and underway) to solve the
    problems identified in the Problems dataset or brought to MHFD by local governments.
  </div>,
);

const content = (<div className="popoveer-00"><b>Watershed Service Area</b> is the MHFD Watershed Service Area where the project is located.</div>);
const content1 = (<div className="popoveer-00"><b>County</b> is the county where the project is located.</div>);
const content2 = (<div className="popoveer-00"><b>Local Government</b> is the local government where the project is located.</div>);
const content3 = (<div className="popoveer-00"><b>MHFD Lead</b> is the MHFD PM who is responsible for the service area where the project is located.</div>);
const content4 = (<div className="popoveer-00"><b>Project Type</b> is the MHFD program of which the project is a part.</div>);
const content05 = (<div className="popoveer-00"><b>Estimated Cost </b> is the estimated total cost of the project based on the cost of the underlying components.</div>);
const content06 = (<div className="popoveer-00"><b>Project Status</b> is the current status of the Project. Some statuses are only applicable to certain project types.</div>);
const content07 = (<div className="popoveer-00"><b>Year Initiated</b> is the year a Project was initiated (i.e. provided MHFD funding). For Projects that have not been initiated, use the "Work Plan Year" filter.</div>);
const content08 = (<div className="popoveer-00"><b>Year Completed</b> is the year a project was closed out by MHFD.</div>);
const content09 = (<div className="popoveer-00"><b>MHFD Dollars Allocated</b> is the amount of funding that MHFD has budgeted or encumbered for a particular Project. For Capital projects and Master Plans, this is the number that must at least be matched by a local government.</div>);
const content10 = (<div className="popoveer-00"><b>Work Plan Year</b> is the year that a proposed Project is on the approved MHFD Work Plan.</div>);
const content11 = (<div className="popoveer-00"><b>Consultant</b> is the primary civil engineering design consultant on the project.</div>);
const content12 = (<div className="popoveer-00"><b>Local Government Manager</b> is the local government's project manager assigned to the project.</div>);
const content13 = (<div className="popoveer-00"><b>Contractor</b> is the primary civil engineering construction contractor on the project.</div>);
const content14 = (<div className="popoveer-00"><b>Stream Name</b> is the name or ID of the stream where the project is located.</div>);
const content15 = (<div className="popoveer-00"><b>Favorites</b> Description comming soon.</div>);
const content16 = (<div className="popoveer-00"><b>Teams</b> Descriptioncomming soon.</div>);

const { TabPane } = Tabs;
const { Search } = Input;
let counterZoomArea = 0;

const MapView = () => {
  const {
    getGalleryProblems,
    getGalleryProjects,
    setFilterProblemOptions,
    setFilterProjectOptions,
    setFilterComponentOptions,
    setProblemKeyword,
    setProjectKeyword,
    existDetailedPageProject,
    existDetailedPageProblem,
  } = useMapDispatch();
  const { saveUserInformation } = useProfileDispatch();
  const {
    galleryProblems,
    galleryProjectsV2,
    filterProblemOptions,
    filterProjectOptions,
    filterComponentOptions,
    tabCards,
    labelsFiltersProjects,
    labelsFiltersProblems,
    labelsFiltersComponents,
    boundsMap,
    toggleModalFilter,
    filterTabNumber,
    tutorialStatus,
  } = useMapState();

  const {
    setStaffValues
  } = useFilterContext();

  const { detailed, displayModal } = useDetailedState();
  const [tabPosition, setTabPosition] = useState('1');
  const [toggleFilters, setToggleFilters] = useState(false);
  const {
    setToggleModalFilter,
    getParamFilterProblems,
    getParamFilterProjects,
    getParamFilterComponents,
    setTabCards,
    setOpacityLayer,
    setCoordinatesJurisdiction,
    setNameZoomArea,
    setSpinMapLoaded,
    setAutocomplete,
    setBBOXComponents,
    getMapTables,
  } = useMapDispatch();
  const { getGroupOrganization } = useProfileDispatch();
  const { resetNextPageOfCards, resetInfiniteScrollItems, resetInfiniteScrollHasMoreItems } = useProjectDispatch();
  const { userInformation, groupOrganization } = useProfileState();
  const { zoomarea } = userInformation;
  const [countFilterProblems, setCountFilterProblems] = useState(0);
  const [countFilterComponents, setCountFilterComponents] = useState(0);
  const [countFilterProjects, setCountFilterProjects] = useState(0);
  const [tabActive, setTabActive] = useState('1');
  const [keywordProblem, setKeywordProblem] = useState(
    filterProblemOptions.keyword ? filterProblemOptions.keyword : '',
  );
  const [keywordProject, setKeywordProject] = useState(
    filterProjectOptions.keyword ? filterProjectOptions.keyword : '',
  );
  const location = useLocation().search;
  const [data, setData] = useState({
    problemid: '',
    projectid: '',
    id: '',
    objectid: '',
    value: '',
    type: '',
  });
  const maintenanceIds = [7, 8, 9, 10, 11, 12];
  const gray = 'rgba(17, 9, 60, 0.5)';
  const green = '#28C499';
  const purple = '#11093c';
  const [backgroundStyle, setBackgroundStyle] = useState<string>(gray);
  const [textStyle, setTextStyle] = useState<string>(purple);
  const [selectView, setSelectView] = useState<string>('card');
  const [groupsLabels, setGroupsLabels] = useState<any>({
    projecttype: [],
    totalcost: [],
    status: [],
    year: [],
    mhfddollarsallocated: [],
    workplanyear: [],
    problemtype: [],
    consultant: [],
    contractor: [],
    jurisdiction: [],
    county: [],
    lgmanager: [],
    streamname: [],
    creator: [],
    mhfdmanager: [],
    servicearea: [],
  });
  useEffect(() => {
    getParamFilterProjects(boundsMap, filterProjectOptions);
  }, [filterProjectOptions?.keyword]);
  useEffect(() => {
    getParamFilterProblems(boundsMap, filterProblemOptions);
  }, [filterProblemOptions]);
  useEffect(() => {
    setSpinMapLoaded(true);
    getGroupOrganization();
    SELECT_ALL_FILTERS.forEach(layer => {
      if (typeof layer === 'object') {
        layer.tiles.forEach((subKey: string) => {
          getMapTables(subKey, layer.name);
        });
      } else {
        getMapTables(layer);
      }
    });
    if (location.includes('problemid=')) {
      const id = location.replace('?problemid=', '');
      existDetailedPageProblem(id);
      const auxData = { ...data };
      auxData.problemid = id;
      setData(auxData);
    }
    if (location.includes('projectid=')) {
      const params = location.split('&');
      if (params.length === 2) {
        const type = params[0].replace('?type=', '');
        const projectid = params[1].replace('projectid=', '');
        const url = 'projectid=' + projectid;
        existDetailedPageProject(url);
        const auxData = { ...data };
        auxData.type = type;
        auxData.projectid = projectid;
        setData(auxData);
      }
    }
    setNameZoomArea(zoomarea);
    const controllers = getFilterLabels();
    return () => {
      const user = userInformation;
      user.isSelect = false;
      saveUserInformation(user);
      counterZoomArea = 0;
      controllers.forEach((controller: any) => {
        controller.abort();
      });
    };
  }, []);
  const toCamelCase = (str:string):string => {
    return str.toLowerCase().replace(/[-_](.)/g, (_, c) => c.toUpperCase());
  }
  const resetFilterProblems = (withCoords?: any) => {
    const options = { ...filterProblemOptions };
    options.components = '';
    options.solutionstatus = '';
    options.county = '';
    options.cost = '';
    options.priority = '';
    options.jurisdiction = '';
    options.mhfdmanager = '';
    options.problemtype = '';
    options.source = '';
    options.servicearea = '';
    options.favorites = '';
    setFilterProblemOptions(options);
    getGalleryProblems();
    if (toggleModalFilter) {
      getParamFilterProblems(withCoords ? withCoords : boundsMap, options);
    }
  };

  const resetFilterProjects = (withDefaults: boolean, withCoords?: any) => {
    const options = { ...filterProjectOptions };
    if (withDefaults) {
      options.projecttype = [5, 7];
      options.status = [5];
    } else {
      options.projecttype = [];
      options.status = [];
    }
    options.column = 'projectname';
    options.order = 'asc';
    options.mhfddollarsallocated = [];
    options.workplanyear = '';
    options.startyear = '';
    options.completedyear = '';
    options.problemtype = '';
    options.mhfdmanager = '';
    options.jurisdiction = '';
    options.totalcost = [];
    options.streamname = '';
    options.name = '';
    options.keyword = '';
    options.county = '';
    options.lgmanager = '';
    options.creator = '';
    options.problemtype = '';
    options.consultant = '';
    options.contractor = '';
    options.servicearea = '';
    options.favorites = '';
    options.teams = '';
    setFilterProjectOptions(options);
    if (toggleModalFilter) {
      getParamFilterProjects(withCoords ? withCoords : boundsMap, options)
    } else{
      getGalleryProjects();
    }
    resetNextPageOfCards();
    resetInfiniteScrollItems();
    resetInfiniteScrollHasMoreItems();
  };

  const resetFilterComponents = (withCoords?: any) => {
    const options: any = { ...filterComponentOptions };
    options.component_type = '';
    options.status = '';
    options.yearofstudy = '';
    options.estimatedcost = [];
    options.jurisdiction = '';
    options.county = '';
    options.mhfdmanager = '';
    options.servicearea = '';
    setFilterComponentOptions(options);
    getGalleryProjects();
    getGalleryProblems();
    if (toggleModalFilter) {
      getParamFilterComponents(withCoords ? withCoords : boundsMap, options);
    }
  };

  const deleteTagProblems = (tag: string, value: string) => {
    
    const auxFilterProblems = { ...filterProblemOptions };
    const valueTag = (tag === 'cost' || tag === 'mhfdmanager') ? filterProblemOptions[tag] : filterProblemOptions[tag].split(',');
    const auxValueTag = [] as Array<string>;
    let newValue = '';
    if (tag === 'favorites') {
      auxFilterProblems.favorites = '';
    }else if (tag !== 'cost') {
      if (tag === 'mhfdmanager') {
        for (let index = 0; index < valueTag?.length; index++) {
          const element = valueTag[index];
          if (element !== value) {
            auxValueTag.push(element);
          }
        }
      } else {
        for (let index = 0; index < valueTag.length; index++) {
          const element = valueTag[index];
          if (element !== value) {
            auxValueTag.push(element);
          }
        }
        for (let index = 0; index < auxValueTag.length; index++) {
          const element = auxValueTag[index];
          if (element !== '') {
            newValue = newValue ? newValue + ',' + element : element;
          }
        }
      }
    }
    if (tag !== 'favorites') {
      auxFilterProblems[tag] = (tag === 'cost') ? [] : ( tag === 'mhfdmanager' ? auxValueTag: newValue);
    }
    setFilterProblemOptions(auxFilterProblems);
    getGalleryProblems();
    getParamFilterProblems(boundsMap, auxFilterProblems);
  };

  const deleteTagProjects = useCallback(
    (tag: string, value: any) => {
      const auxFilterProjects = { ...filterProjectOptions };
      let valueTag = filterProjectOptions[tag];
      const auxValueTag = [] as Array<string>;
      if (tag === 'favorites' || tag === 'teams') {
        auxFilterProjects[tag] = '';
      }else if (tag !== 'totalcost') {
        let hasToDeleteMaintenance = [];
        if ( Array.isArray(value)) {
          hasToDeleteMaintenance = value?.filter((x: any) => maintenanceIds.includes(x));
        }
        if (tag === 'projecttype' && hasToDeleteMaintenance.length > 0 ) {
          // delete maintenance from value tag.
          // hasMaintenance = valueTag.filter((x: any) => maintenanceIds.includes(x));
          valueTag =  valueTag.filter((x: any) => !maintenanceIds.includes(x));
        }
        for (let index = 0; index < valueTag?.length; index++) {
          const element = valueTag[index];
          if (element !== value) {
            auxValueTag.push(element);
          }
        }
      }
      if (tag !== 'favorites' && tag !== 'teams') {
        auxFilterProjects[tag] = auxValueTag;
      }
      setFilterProjectOptions(auxFilterProjects);
      getParamFilterProjects(boundsMap, auxFilterProjects)
      resetNextPageOfCards();
      resetInfiniteScrollItems();
      resetInfiniteScrollHasMoreItems();
  }, [filterProjectOptions]);

  const getFiltersPopoverContent = () => {
    let body = null;
    switch (tabActive) {
      case '0':
        body = generateLabelsFilterProblems();
        break;
      case '1':
        body = generateLabelsFilterProjects();
        break;
      case '2':
        body = generateLabelsFilterComponents();
        break;
    }
    return body;
  };
  const generateLabelsFilterComponents = () => {
    const filterComponents = { ...filterComponentOptions } as any;
    const labelsProblems = [...labelsFiltersComponents];
    for (const key in filterComponents) {
        const tag =
          key === 'estimatedcost'
            ? filterComponents[key]
            : filterComponents[key].split(',');
        if (key !== 'keyword' && key !== 'column' && key !== 'order') {
          const elements = [];
          const position = labelsProblems.findIndex((x: any) => x.name === key);
          for (let index = 0; index < tag.length; index++) {
            const element = tag[index];
            if (element) {
              if (key === 'estimatedcost' || key === 'yearofstudy') {
                elements.push({
                  tag: key,
                  value: element,
                  display: elementCost(tag[0], tag[1]),
                });
                break;
              } else if (key === 'component_type') {
                elements.push({
                  tag: key,
                  value: element,
                  display: capitalLetter(element),
                });
              } else {
                elements.push({
                  tag: key,
                  value: element,
                  display: element,
                });
              }
            }
          }
          labelsProblems[position]['detail'] = elements as any;
        }
      }
    return (
      <div className="tag-filters">
        <div className="tag-body">
          {labelsProblems
            .filter((x: any) => x.detail.length > 0)
            .map((element: any) => {
              return showFilterLabelsComponents(element);
            })}
        </div>
        <div className="btn-footer-02">
          {labelsProblems.filter(x => x.detail.length > 0).length > 0 ? (
            <Button className="btn-borde" onClick={() => resetFilterComponents()}>
              Clear All
            </Button>
          ) : (
            <p style={{ textAlign: 'right' }}>No filters are applied</p>
          )}
        </div>
      </div>
    );
  };
  const showFilterLabelsComponents = (element: any) => {
    if (element.detail[0].length === 0) {
      return <></>;
    } else {
      return (
        <>
          <div className="head">
            {element.display} &nbsp;
            <img src="/Icons/icon-19.svg" width="13px" alt="" />
          </div>
          {element.detail.map((filter: any) => {
            return (
              <p key={filter.tag}>
                {filter.display}
                <Button className="btn-transparent" onClick={() => deleteTagComponents(filter.tag, filter.value)}>
                  <img src="/Icons/icon-84.svg" width="15px" alt="" />
                </Button>
              </p>
            );
          })}
        </>
      );
    }
  };
  const deleteTagComponents = (tag: string, value: string) => {
    const auxFilterComponents: any = { ...filterComponentOptions };
    const valueTag = tag === 'estimatedcost' ? filterComponentOptions[tag] : auxFilterComponents[tag].split(',');
    const auxValueTag = [] as Array<string>;
    if ( tag !== 'estimatedcost' && tag !== 'yearofstudy') {
      for (let index = 0; index < valueTag.length; index++) {
        const element = valueTag[index];
        if (element !== value) {
          auxValueTag.push(element);
        }
      }
    }
    let newValue = '';
    for (let index = 0; index < auxValueTag.length; index++) {
      const element = auxValueTag[index];
      if (element !== '') {
        newValue = newValue ? newValue + ',' + element : element;
      }
    }
    auxFilterComponents[tag] = tag === 'estimatedcost' ? auxValueTag : newValue;
    setFilterComponentOptions(auxFilterComponents);
    getGalleryProjects();
    getParamFilterComponents(boundsMap, auxFilterComponents);
  };
  const generateLabelsFilterProblems = () => {
    const filterProblems = { ...filterProblemOptions } as any;
    const labelsProblems = [...labelsFiltersProblems];
    for (const key in filterProblemOptions) {
      const tag = (key === 'cost' || key === 'mhfdmanager' || key === 'favorites') ? filterProblems[key] : filterProblems[key].split(',');
      if (key !== 'keyword' && key !== 'column' && key !== 'order') {
        const elements = [];
        const position = labelsProblems.findIndex((x: any) => x.name === key);
        if(tag!== undefined && tag !== ''){
          if(key === 'favorites'){
            elements.push({
              tag: key,
              value: tag,
              display: FAVORITES,
            });
          } else if (key === 'cost' && tag.length > 0) {
            elements.push({
              tag: key,
              value: `$${tag[0]} - $${tag[1]}`,
              display: `$${tag[0]} - $${tag[1]}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            })
          } else {
            for (let index = 0; index < tag.length; index++) {
              const element = tag[index];
              if (element) {
                if (key === 'solutionstatus') {
                  elements.push({
                    tag: key,
                    value: element,
                    display: getStatus(element),
                  });
                } else if (key == 'mhfdmanager') {
                  elements.push({
                    tag: key,
                    value: element,
                    display: getLabel(key, tag[index]),
                  });
                } else {
                  elements.push({
                    tag: key,
                    value: element,
                    display: element,
                  });
                }
              }
            }
          }
        }
        if (!labelsProblems[position]) {
          labelsProblems[position] = {};
        }
        labelsProblems[position]['detail'] = elements as any;
      }
    }
    return (
      <div className="tag-filters">
        <div className="tag-body">
          {labelsProblems
            .filter((x: any) => x.detail.length > 0)
            .map((element: any) => {
              return showFilterLabelsProblems(element);
            })}
        </div>
        <div className="btn-footer-02">
          {labelsProblems.filter(x => x.detail.length > 0).length > 0 ? (
            <Button className="btn-borde" onClick={() => resetFilterProblems()}>
              Clear All
            </Button>
          ) : (
            <p style={{ textAlign: 'right' }}>No filters are applied</p>
          )}
        </div>
      </div>
    );
  };
  const getLabel = useCallback(
    (key: any, value: any) => {
      const valueGroup = groupsLabels[key]?.filter((g: any) => g.id === value);
      return valueGroup[0]?.value;
    },
    [groupsLabels],
  );
  const generateLabelsFilterProjects = useCallback(() => {
    const filterProjects = { ...filterProjectOptions } as any;
    for (const key in filterProjectOptions) {
      const position = labelsFiltersProjects.findIndex((x: any) => x.name === key);
      if (position >= 0) {
        const tag = filterProjects[key];
        const elements = [];
        if(tag!== undefined && tag !== ''){
          if(key === 'favorites' || key === 'teams'){
            elements.push({
              tag: key,
              value: tag,
              display: key === 'favorites' ?FAVORITES : TEAMS,
            });
          }
        let isMaintenance = false;
          for (let index = 0; index < tag.length; index++) {
            if (key === 'mhfddollarsallocated') {
              const cost = tag[index].split(',');
              elements.push({
                tag: key,
                display: elementCost(cost[0], cost[1]),
                value: tag[index],
              });
            } else if (key === 'totalcost') {
              elements.push({
                tag: key,
                display: elementCost(tag[0], tag[1]),
                value: tag[index],
              });
              break;
            } else {
              if (tag[index] && !maintenanceIds.includes(tag[index])) {
                elements.push({
                  tag: key,
                  value: tag[index],
                  display: getLabel(key, tag[index]),
                });
              } else {
                isMaintenance = true;
              }
            }
          }
          if( isMaintenance ) {
            elements.push({
              tag: key,
              value: maintenanceIds,
              display: 'Maintenance',
            });
          }
        }
        labelsFiltersProjects[position]['detail'] = elements as any;
      }
    }
    let mappedLabelsFiltersProjects = labelsFiltersProjects
      .map((lfp: any) => {
        let d = lfp.detail.filter((dt: any) => dt !== '');
        let mlfp = { ...lfp, detail: d };
        return mlfp;
      })
      .filter((x: any) => x.detail.length > 0);
    return (
      <div className="tag-filters">
        <div className="tag-body">
          {mappedLabelsFiltersProjects.map((element: any, index: number) => {
            return showFilterLabels(element, index);
          })}
        </div>
        <div className="btn-footer-02">
          {mappedLabelsFiltersProjects.length > 0 ? (
            <Button className="btn-borde" onClick={() => resetFilterProjects(false)}>
              Clear All
            </Button>
          ) : (
            <p style={{ textAlign: 'right' }}>No filters are applied</p>
          )}
        </div>
      </div>
    );
  }, [groupsLabels, filterProjectOptions]);

  const showFilterLabels = (element: any, index: number) => {        
    if (element.detail[0].length === 0) {
      return null;
    } else {
      return (
        <Fragment key={`${element.name}_${index}`}>
          <div className="head">
            {toCamelCase(element.display) === 'total cost' ? 'Estimated Cost'
              :(toCamelCase(element.display) === 'jurisdiction'? 'Local Government'
                :(toCamelCase(element.display) === 'mhfd watershed manager'? 'MHFD Lead'
                  :toCamelCase(element.display)
                )
              )
            } &nbsp;
            <Popover
              content={toCamelCase(element.display) === 'project type' ? content4
                : toCamelCase(element.display) === 'watershed service area' ? content
                : toCamelCase(element.display) === 'county' ? content1
                : toCamelCase(element.display) === 'jurisdiction' ? content2
                : toCamelCase(element.display) === 'mhfd watershed manager' ? content3
                : toCamelCase(element.display) === 'total cost' ? content05
                : toCamelCase(element.display) === 'project status' ? content06
                : toCamelCase(element.display) === 'year initiated' ? content07
                : toCamelCase(element.display) === 'year completed' ? content08
                : toCamelCase(element.display) === 'mhfd dollars allocated' ? content09
                : toCamelCase(element.display) === 'work plan year' ? content10
                : toCamelCase(element.display) === 'consultant' ? content11
                : toCamelCase(element.display) === 'local lovernment manager' ? content12
                : toCamelCase(element.display) === 'contractor' ? content13
                : toCamelCase(element.display) === 'stream name' ? content14
                : toCamelCase(element.display) === 'favorites' ? content15
                : toCamelCase(element.display) === 'teams' ? content16
                : content4
            }
            >
              <img src="/Icons/icon-19.svg" width="13px" alt="" />
            </Popover>
          </div>
          {element.detail.map((filter: any, filterIndex: number) => {
            return (
              <p key={`${filter.name}_${filterIndex}`}>
                {filter.display}
                <Button className="btn-transparent" onClick={() => deleteTagProjects(filter.tag, filter.value)}>
                  <img src="/Icons/icon-84.svg" width="15px" alt="" />
                </Button>
              </p>
            );
          })}
        </Fragment>
      );
    }
  };

  const showFilterLabelsProblems = (element: any) => {
    return (
      <>
        <div className="head">
          {element.display} <img src="/Icons/icon-19.svg" width="13px" alt="" />
        </div>
        {element.detail.map((filter: any) => {
          return (
            <p>
              {filter.display}{' '}
              <Button className="btn-transparent" onClick={() => deleteTagProblems(filter.tag, filter.value)}>
                {' '}
                <img src="/Icons/icon-84.svg" width="15px" alt="" />
              </Button>
            </p>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    let countTagProblems = 0;
    let countTagProjets = 0;
    let countTagComponents = 0;
    const filterComponents = { ...filterComponentOptions } as any;
    const filterProblems = { ...filterProblemOptions } as any;
    for (const key in filterProblemOptions) {
      const tag = (key === 'cost' || key === 'mhfdmanager' || key === 'favorites') ? filterProblems[key] : filterProblems[key].split(',');
      if (key !== 'keyword' && key !== 'column' && key !== 'order') {
        if (key === 'favorites') {
          if (tag) {
            countTagProblems++;
          }
        } else if (key === 'cost') {
          if (tag?.length > 0) {
            countTagProblems++;  
          }
        } else {
          for (let index = 0; index < tag.length; index++) {
            const element = tag[index];
            if (element) {
              countTagProblems++;
            }
          }  
        }
        
      }
    }
    for (const key in filterComponentOptions) {
      const tag = key === 'estimatedcost' ? filterComponents[key] : filterComponents[key].split(',');
      if (key !== 'estimatedcost' && key !== 'yearofstudy') {
        for (let index = 0; index < tag.length; index++) {
          const element = tag[index];
          if (element) {
            countTagComponents += 1;
          }
        }
      } else if ((key === 'estimatedcost')  && tag.length) {
        countTagComponents += 1;
      } else if ( key === 'yearofstudy' && tag.length > 1) {
        countTagComponents += 1;
      }
       
    }
    const filterProjects = { ...filterProjectOptions } as any;
    for (const key in filterProjectOptions) {
      let tag = filterProjects[key];
      if (tag !== undefined) {	
        let hasMaintenance = [];
        if (key === 'projecttype') {
          if (Array.isArray(tag)) {
            hasMaintenance = tag.filter((x: any) => maintenanceIds.includes(x));
          }
          if (hasMaintenance.length > 0) {
            // if has maintenance remove from tag projecttype to count them normally
            tag =  tag.filter((x: any) => !maintenanceIds.includes(x));
          }
        }
        if (key !== 'keyword' && key !== 'column' && key !== 'order' && key !== 'name' && key !== 'totalcost' && key !== 'favorites' && key !== 'teams') {
          for (let index = 0; index < tag.length; index++) {
            const element = tag[index];
            if (element) {
              countTagProjets += 1;
            }
          }
        } else if (key === 'totalcost' && tag.length) {
          countTagProjets += 1;
        } else if (key === 'favorites' && tag) {
          countTagProjets += 1;
        }  else if (key === 'teams' && tag) {
          countTagProjets += 1;
        }
        if (hasMaintenance.length > 0) {
          countTagProjets += 1;
        }
        const position = labelsFiltersProjects.findIndex((x: any) => x.name === key);
        if (position >= 0) {
          const tag = filterProjects[key];
          const elements = [];
          for (let index = 0; index < tag.length; index++) {
            elements.push(tag[index]);
          }
          if (elements.length > 0) {
            labelsFiltersProjects[position]['detail'] = elements as any;
          }
        }
      }
    }

    setCountFilterComponents(countTagComponents);
    setCountFilterProblems(countTagProblems);
    setCountFilterProjects(countTagProjets);
  }, [filterComponentOptions, filterProblemOptions, filterProjectOptions]);

  const getFilterLabels = () => {
    const requestListWithAbortController = [
      getGroupListWithAbortController(SERVICE_AREA),
      getGroupListWithAbortController(COUNTY),
      getGroupListWithAbortController(JURISDICTION),
      getGroupListWithAbortController(CONSULTANT),
      getGroupListWithAbortController(CONTRACTOR),
      getGroupListWithAbortController(STATUS),
      getGroupListWithAbortController(STREAMS),
      getGroupListWithAbortController(PROJECTTYPE),
      getGroupListWithAbortController(MHFD_LEAD),
      getGroupListWithAbortController(LG_LEAD)
    ];
    const promises = requestListWithAbortController.map(r => r[1]);
    const controllers = requestListWithAbortController.map(r => r[0]);
    Promise.all(promises).then(values => {
      setGroupsLabels({
        ...groupsLabels,
        servicearea: values[0]?.groups,
        county: values[1]?.groups,
        jurisdiction: values[2]?.groups,
        consultant: values[3]?.groups,
        contractor: values[4]?.groups,
        status: values[5]?.groups,
        streamname: values[6]?.groups,
        projecttype: values[7]?.groups,
        mhfdmanager: values[8]?.groups,
        lgmanager: values[9]?.groups
      });
      setStaffValues(values[8]?.groups);
    });
    return controllers;
  };

  useEffect(() => {
    if (counterZoomArea >= 2) {
      setNameZoomArea(zoomarea);
    }
    counterZoomArea++;
  }, [zoomarea, groupOrganization]);

  const handleToggle = () => {
    if (tabPosition === '2') {
      setTabPosition('0');
      setTabActive('0');
    }
    setToggleFilters(!toggleFilters);
    setToggleModalFilter(!toggleFilters);

    if (!toggleFilters) {
      switch (tabPosition) {
        case '0':
          getParamFilterProblems(boundsMap, filterProblemOptions);
          break;
        case '1':
          getParamFilterProjects(boundsMap, filterProjectOptions);
          break;
        case '2':
          getParamFilterComponents(boundsMap, filterComponentOptions);
          break;
      }
    } else {
      if (tabActive === '0') {
        getGalleryProblems();
      } else {
        getGalleryProjects();
      }
    }
    if (backgroundStyle === gray) {
      setBackgroundStyle(green);
      setTextStyle(green);
    } else {
      setBackgroundStyle(gray);
      setTextStyle(purple);
    }
  };

  const changeCenter = (name: string, coordinates: any, isSelect?: any) => {
    const user = userInformation;
    user.polygon = coordinates;
    user.isSelect = isSelect;
    saveUserInformation(user);
    setNameZoomArea(name);
    const zoomareaSelected = groupOrganization
      .filter((x: any) => x.name === name)
      .map((element: any) => {
        return {
          aoi: element.name,
          filter: element.table,
          coordinates: element.coordinates.coordinates,
        };
      });
    if (zoomareaSelected.length > 0) {
      switch (zoomareaSelected[0].filter) {
        case 'County':
        case 'CODE_STATE_COUNTY':
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
          break;
        case 'Jurisdiction':
        case 'CODE_LOCAL_GOVERNMENT':
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
          break;
        case 'Service Area':
        case 'CODE_SERVICE_AREA':
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
          break;
        default:
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
      }
    }
  };

  const onSelect = (value: any, isSelect?: any) => {
    setAutocomplete(value);
    const zoomareaSelected = groupOrganization
      .filter((x: any) => x.name === value)
      .map((element: any) => {
        return {
          aoi: element.name,
          filter: element.table,
          coordinates: element.coordinates.coordinates,
        };
      });
    // TODO addis parse el bbox to coordinates jurisdiction
    if (zoomareaSelected[0]) {
      // setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
      changeCenter(value, zoomareaSelected[0].coordinates, isSelect == 'noselect' ? undefined : 'isSelect');
    }
    setBBOXComponents({ bbox: [], centroids: [] });
  };

  const sortClick = () => {
    if (tabActive === '0') {
      const auxOptions = { ...filterProblemOptions };
      auxOptions.order = filterProblemOptions.order === 'asc' ? 'desc' : 'asc';
      setFilterProblemOptions(auxOptions);
      getGalleryProblems();
    } else {
      const auxOptions = { ...filterProjectOptions };
      auxOptions.order = filterProjectOptions.order === 'asc' ? 'desc' : 'asc';
      setFilterProjectOptions(auxOptions);
      getGalleryProjects();
    }
    resetNextPageOfCards();
    resetInfiniteScrollItems();
    resetInfiniteScrollHasMoreItems();
  };

  const genExtra = () => (
    <ApplyMapViewFilter
      onCheck={() => {
        getGalleryProblems();
        getGalleryProjects();
        resetNextPageOfCards();
        resetInfiniteScrollItems();
        resetInfiniteScrollHasMoreItems();
      }}
    />
  );

  const isActiveDrop = (element: any) =>{
    let valueActive = ""
    if(tabActive === '0'){
      if(filterProblemOptions.column === element.name){
        valueActive = "item-active-dropdown-color"
      }else{
        valueActive = "no-active"
      }
    }else{
      if(filterProjectOptions.column === element.name){
        valueActive = "item-active-dropdown-color"
      }else{
        valueActive = "no-active"
      }
    }
    return valueActive
  }

  const menuSort = (listSort: Array<{ name: string; title: string }>) => {
    const itemMenu: MenuProps['items'] = [];
    listSort.forEach((element: { name: string; title: string }, index: number) => {
      itemMenu.push({
        className: `${isActiveDrop(element)}`,
        key: `${index}|${element.title}`,
        label: (
          <span className="menu-item-text" style={{ height: '10px', border: 'transparent' }}>
            {element.title}
          </span>
        ),
        onClick: () => {
          if (tabActive === '0') {
            const auxOptions = { ...filterProblemOptions };
            auxOptions.column = element.name;
            setFilterProblemOptions(auxOptions);
            getGalleryProblems();
          } else {
            const auxOptions = { ...filterProjectOptions };
            auxOptions.column = element.name;
            setFilterProjectOptions(auxOptions);
            
            getGalleryProjects();
          }
          resetNextPageOfCards();
          resetInfiniteScrollItems();
          resetInfiniteScrollHasMoreItems();
        },
      });
    });
    return <Menu className="js-mm-00" items={itemMenu}></Menu>;
  };

  const onResetClick = () => {
    if (toggleModalFilter) {
      switch (filterTabNumber) {
        case PROBLEMS_TRIGGER:
          resetFilterProblems();
          break;
        case PROJECTS_TRIGGER:
          resetFilterProjects(true);
          break;
        case COMPONENTS_TRIGGER:
          resetFilterComponents();
          break;
      }
    } else {

      if (tabActive === '0') {
        setKeywordProblem('');
        setProblemKeyword('');
        getGalleryProblems();
      } else {
        setKeywordProject('');
        setProjectKeyword('');
        getGalleryProjects();
      }
      switch(tabCards) {
        case PROBLEMS_TRIGGER:
          resetFilterProblems();
          break;
        case PROJECTS_TRIGGER:
          resetFilterProjects(true);
          break;
      }
    }
    resetNextPageOfCards();
    resetInfiniteScrollItems();
    resetInfiniteScrollHasMoreItems();
  };

  const getCounter = (index: any, currentTab: any, total: number) => {
    if (+currentTab === +index) {
      return ` (${total})`;
    }
    return '';
  };
  useEffect(() => {
    if (tutorialStatus && toggleFilters) {
      handleToggle();
    }
  }, [tutorialStatus]);

  // let filterCounter = 0;
  const [filterCounter, setFilterCounter ] = useState(0);
  useEffect(() => {
    switch (tabActive) {
      case '0':
        setFilterCounter(countFilterProblems);
        break;
      case '1':
        setFilterCounter(countFilterProjects);
        break;
      case '2':
        setFilterCounter(countFilterComponents);
        break;
    }
  }, [tabActive, countFilterProblems, countFilterProjects, countFilterComponents]);
  let filterLabel = `Filters `;
  return (
    <>
      <div className="fr-area">Explore Confluence</div>
      <div className="mhfd-mobile">
        <h6>About the Platform</h6>
        <p>
          Confluence is your one-stop Mile High Flood District data portal. MHFD has developed Confluence from the
          ground up to meet the unique data needs of a regional flood control and stream management district.
        </p>
      </div>
      <div className="count">
        {groupOrganization && <MapAutoComplete onAutoCompleteSelected={onSelect} setSelectView={setSelectView} selectView={selectView}/>}
        <div className="head-filter mobile-display">
          <Row justify="space-around" align="middle">
            <Col span={11} style={{ textAlign: 'initial' }}>
              <Search
                // disabled={true}
                id="search-input"
                allowClear
                placeholder="Search"
                value={tabActive === '0' ? keywordProblem : keywordProject}
                onChange={e => {
                  if (tabActive === '0') {
                    setKeywordProblem(e.target.value);
                  } else {
                    setKeywordProject(e.target.value);
                  }
                }}
                onSearch={e => {
                  if (tabActive === '0') {
                    if (e === '') {
                      setProblemKeyword(e);
                    } else {
                      setProblemKeyword(keywordProblem);
                    }
                    getGalleryProblems();
                  } else {
                    if (e === '') {
                      setProjectKeyword(e);
                    } else {
                      setProjectKeyword(keywordProject);
                    }
                    getGalleryProjects();
                  }
                }}
              />
            </Col>
            <Col style={{ textAlign: 'right' }} span={13} id="sort-map">
              <div className="sort-map-desktop">
                <Button className="btn-red" onClick={onResetClick}>
                  <u>Reset</u>
                </Button>
                <Popover placement="bottomRight" overlayClassName="tag-filters" content={getFiltersPopoverContent()} className="arrow-popover-delete">
                  <Button
                    onClick={handleToggle}
                    style={{
                      marginLeft: '13px',
                      paddingRight: '0px',
                      borderRadius: '4px',
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                    }}
                    className="btn-filter"
                  >
                    <img style={{ background: backgroundStyle }} className="img-filter" alt="" />
                    <span style={{ color: textStyle, marginLeft: '-3px', fontFamily: 'Ubuntu' }}>
                      {' '}
                      {filterLabel} ({filterCounter})
                    </span>
                  </Button>
                </Popover>
                {selectView==='card'?
                <div className="sort-content">
                  <span className="button" style={{ transitionTimingFunction: 'ease-in' }} onClick={sortClick}>
                    {filterProjectOptions.order === 'asc' ? (
                      <img
                        className="img-filter00"
                        alt=""
                        style={{ WebkitMask: "url('/Icons/icon-83.svg') no-repeat center" }}
                      />
                    ) : (
                      <img
                        className="img-filter00"
                        alt=""
                        style={{ WebkitMask: "url('/Icons/icon-86.svg') no-repeat center" }}
                      />
                    )}
                  </span>
                  <Dropdown
                    trigger={['hover']}
                    overlay={tabActive === '0' ? menuSort(SORTED_PROBLEMS) : menuSort(SORTED_PROJECTS)}
                    getPopupContainer={() => document.getElementById('sort-map') as HTMLElement}
                  >
                    <Button
                      onClick={sortClick}
                      style={{
                        marginLeft: '8px',
                        borderRadius: '4px',
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                      }}
                      className="btn-filter"
                    >
                      <img className="img-sortBy" alt="" style={tabActive === '0'? (filterProblemOptions.order === 'asc' ? {transform: 'rotate(-180deg)'}:{}):(filterProjectOptions.order === 'asc' ? {transform: 'rotate(-180deg)'}:{})}/>
                      <span style={{ color: purple, marginLeft: '-3px', fontFamily: 'Ubuntu' }}> Sort By</span>
                    </Button>
                  </Dropdown>
                </div>:<></>}
              </div>
            </Col>
          </Row>
        </div>
        {!toggleFilters ? (
          <div style={{ marginRight: '-9px' }}>
            <Tabs
              destroyInactiveTabPane={true}
              onTabClick={(e: string) => {
                if (e === '0') {
                  setTabActive('0');
                  setTabCards(PROBLEMS_TRIGGER);
                  getGalleryProblems();
                } else {
                  setTabActive('1');
                  setTabCards(PROJECTS_TRIGGER);
                  getGalleryProjects();
                }
              }}
              activeKey={tabPosition}
              onChange={key => setTabPosition(key)}
              className="tabs-map over-00"
              tabBarExtraContent={genExtra()}
            >
              {tabs.map((value: string, index: number) => {
                let totalElements = 0;
                let cardInformation: Array<Object> = [];
                if (value === FILTER_PROBLEMS_TRIGGER) {
                  cardInformation = galleryProblems.map((problem: any) => {
                    return {
                      cartodb_id: problem.cartodb_id,
                      image: `gallery/${problem.problemtype}.png`,
                      requestName: problem.problemname,
                      jurisdiction: problem.jurisdiction,
                      estimatedCost: problem.estimatedcost,
                      componentCost: problem.component_cost ? problem.component_cost : 0,
                      field4: 'X',
                      field5: 'Components',
                      problemtype: problem.problemtype,
                      priority: problem.problempriority,
                      percentage: problem.solutionstatus ? problem.solutionstatus : 0,
                      problemid: problem.problemid,
                      type: problem.type,
                      value: problem.cartodb_id,
                      totalComponents: problem.totalComponents,
                      coordinates: problem.coordinates[0],
                      count: problem.count,
                    };
                  });
                  totalElements = cardInformation.length;
                } else {
                  cardInformation = galleryProjectsV2?.projects?.map((project: any) => {
                    const projectType = project?.code_project_type?.project_type_name;
                    const x = {
                      cartodb_id: project.project_id,
                      project_id: project.project_id,
                      image:
                      project?.project_attachments?.length > 0 ? `${SERVER.BASE_URL_IMAGES}/${project?.project_attachments[0]?.attachment_url}`:
                          projectType === 'CIP'
                          ? '/projectImages/capital.png'
                          : projectType === 'Study'
                          ? '/projectImages/study.png'
                          : projectType === 'Special'
                          ? '/projectImages/special.png'
                          : projectType === 'Vegetation Management'
                          ? '/projectImages/vegetation-management.png'
                          : projectType === 'Sediment Removal'
                          ? '/projectImages/sediment-removal.png'
                          : projectType === 'Restoration'
                          ? '/projectImages/restoration.png'
                          : projectType === 'General Maintenance'
                          ? '/projectImages/minor-repairs.png'
                          : projectType === 'Acquisition'
                          ? '/projectImages/acquisition.png'
                          : projectType === 'Routine Trash and Debris'
                          ? '/projectImages/debris-management.png'
                          : '/projectImages/watershed-change.png',
                      requestName: project.project_name,
                      sponsor: getMainSponsor(project.project_partners),
                      project_costs: project.project_costs,
                      estimatedCost: project.estimatedcost ? project.estimatedcost : project.finalcost,
                      componentCost: project.component_cost ? project.component_cost : 0,
                      status: getCurrentProjectStatus(project)?.code_phase_type?.code_status_type?.status_name,
                      projecttype: projectType,
                      objectid: project.objectid,
                      type: project.type,
                      value: project.cartodb_id,
                      id: project.projectId,
                      phase: project?.currentId[0]?.code_phase_type?.phase_name,
                      stream: project?.project_streams,
                      totalComponents: parseInt(
                        project.GRADE_CONTROL_STRUCTURE +
                        project.PIPE_APPURTENANCES +
                        project.SPECIAL_ITEM_POINT +
                        project.SPECIAL_ITEM_LINEAR +
                        project.SPECIAL_ITEM_AREA +
                        project.CHANNEL_IMPROVEMENTS_LINEAR +
                        project.CHANNEL_IMPROVEMENTS_AREA +
                        project.REMOVAL_LINE +
                        project.REMOVAL_AREA +
                        project.STORM_DRAIN +
                        project.DETENTION_FACILITIES +
                        project.MAINTENANCE_TRAILS +
                        project.LAND_ACQUISITION +
                        project.LANDSCAPING_AREA ),
                    };
                    return x;
                  });
                  totalElements = galleryProjectsV2?.count ?? 0;
                }
                return (
                  <TabPane
                    tab={
                      <span>
                        <Popover content={contents[index]} placement="rightBottom" style={{ width: '100%' }}>
                          {value === 'Components'
                            ? 'Actions' + getCounter(index, tabActive, totalElements)
                            : value + getCounter(index, tabActive, totalElements)}
                        </Popover>
                      </span>
                    }
                    key={index}
                  >
                    {selectView === 'list' ?
                      <ListViewMap
                        type={value}
                        totalElements={totalElements}
                        cardInformation={cardInformation}
                      /> :
                      <GenericTabView
                        type={value}
                        totalElements={totalElements}
                        cardInformation={cardInformation}
                      />
                    }
                  </TabPane>
                );
              })}
            </Tabs>
          </div>
        ) : (
          <FiltersProjectView
            tabActive={tabActive}
            tabPosition={tabPosition}
            setTabPosition={setTabPosition}
            setTabActive={setTabActive}
          />
        )}
      </div>
    </>
  );
}

export default MapView;
