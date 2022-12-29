import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Dropdown, Button, Tabs, Input, Menu, Popover, Checkbox, MenuProps } from 'antd';
import { useLocation } from "react-router-dom";

import GenericTabView from "../../../Components/Shared/GenericTab/GenericTabView";
import FiltersProjectView from "../../../Components/FiltersProject/FiltersProjectView";

import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, SORTED_PROBLEMS, SORTED_PROJECTS, PROBLEMS_TRIGGER, PROJECTS_TRIGGER, COMPONENTS_TRIGGER, SELECT_ALL_FILTERS } from '../../../constants/constants';
import DetailedModal from "../../../Components/Shared/Modals/DetailedModal";
import { useMapDispatch, useMapState } from "../../../hook/mapHook";
import { capitalLetter, elementCost, getStatus } from '../../../utils/utils';
import RheoStatService from '../../../Components/FiltersProject/NewProblemsFilter/RheoStatService';
import { useProfileDispatch, useProfileState } from "../../../hook/profileHook";
import { useDetailedState } from "../../../hook/detailedHook";
import MapAutoComplete from "./MapAutoComplete";

const tabs = [FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER];
let contents: any = [];
contents.push((<div className="popoveer-00"><b>Problems:</b> Problems represent areas where values such as public health, safety, and environmental quality are at risk due to potential flooding, erosion, or other identified threats within MHFD’s purview.</div>));
contents.push((<div className="popoveer-00"><b>Projects:</b> Projects are active efforts (i.e. planned and budgeted or funded and underway) to solve the problems identified in the Problems dataset or brought to MHFD by local governments.</div>));

const { TabPane } = Tabs;
const { Search } = Input;
let counterZoomArea = 0 ;

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
    setApplyFilter
  } = useMapDispatch();
  const { saveUserInformation } = useProfileDispatch();
  const {
    galleryProblems,
    galleryProjects,
    galleryProjectsV2,
    filterProblemOptions,
    filterProjectOptions,
    filterComponentOptions,
    applyFilter,
    spinFilters: spinFilter,
    spinMapLoaded
  } = useMapState();
  const {
    detailed,
    displayModal
  } = useDetailedState();

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
    getMapTables
  } = useMapDispatch();
  const {getGroupOrganization} = useProfileDispatch();
  const { userInformation, groupOrganization } = useProfileState();
  const { zoomarea } = userInformation;
  const {
    tabCards,
    labelsFiltersProjects,
    labelsFiltersProblems,
    labelsFiltersComponents,
    spinCardProblems,
    spinCardProjects,
    boundsMap,
    toggleModalFilter,
    filterTabNumber,
    tutorialStatus
  } = useMapState();

  const [countFilterProblems, setCountFilterProblems] = useState(0);
  const [countFilterComponents, setCountFilterComponents] = useState(0);
  const [countFilterProjects, setCountFilterProjects] = useState(0);

  useEffect(() => {
    setSpinMapLoaded(true);
    getGroupOrganization();
    SELECT_ALL_FILTERS.forEach((layer) => {
      if (typeof layer === 'object') {
        layer.tiles.forEach((subKey: string) => {
          getMapTables(subKey, layer.name);
        });
      } else {
          getMapTables(layer);
      }
    });
    return () => {
      const user = userInformation;
      user.isSelect = false;
      saveUserInformation(user);
      counterZoomArea = 0;
    }
  }, []);
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
    setFilterProblemOptions(options);
    getGalleryProblems();
    if (toggleModalFilter) {
      getParamFilterProblems(withCoords ? withCoords : boundsMap, options)
    }
  }

  const resetFilterProjects = (withDefaults: boolean, withCoords?: any) => {
    const options = { ...filterProjectOptions };
    if (withDefaults) {
      options.projecttype = 'Maintenance,Capital';
      options.status = 'Active';
    } else {
      options.projecttype = '';
      options.status = '';
    }
    options.mhfddollarsallocated = [];
    options.workplanyear = '';
    options.startyear = '';
    options.completedyear = '';
    options.problemtype = '';
    options.mhfdmanager = '';
    options.jurisdiction = '';
    options.totalcost = []
    options.streamname = '';
    options.county = '';
    options.lgmanager = '';
    options.creator = '';
    options.problemtype = '';
    options.consultant = '';
    options.contractor = '';
    options.servicearea = '';
    setFilterProjectOptions(options);
    getGalleryProjects();
    if (toggleModalFilter) {
      getParamFilterProjects(withCoords ? withCoords : boundsMap, options)
    }
  }

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
  }

  const deleteTagProblems = (tag: string, value: string) => {
    const auxFilterProblems = { ...filterProblemOptions };
    const valueTag = tag === 'cost' ? filterProblemOptions[tag] : filterProblemOptions[tag].split(',');
    const auxValueTag = [] as Array<string>;
    for (let index = 0; index < valueTag.length; index++) {
      const element = valueTag[index];
      if (element !== value) {
        auxValueTag.push(element);
      }
    }
    let newValue = '';
    for (let index = 0; index < auxValueTag.length; index++) {
      const element = auxValueTag[index];
      if (element !== '') {
        newValue = newValue ? (newValue + ',' + element) : element;
      }
    }
    auxFilterProblems[tag] = tag === 'cost' ? auxValueTag : newValue;
    setFilterProblemOptions(auxFilterProblems);
    getGalleryProblems();
    getParamFilterProblems(boundsMap, auxFilterProblems)
  }

  const deleteTagProjects = (tag: string, value: string) => {
    const auxFilterProjects = { ...filterProjectOptions };
    const valueTag = (tag === 'mhfddollarsallocated' || tag === 'totalcost') ? filterProjectOptions[tag] : filterProjectOptions[tag].split(',');
    const auxValueTag = [] as Array<string>;
    for (let index = 0; index < valueTag.length; index++) {
      const element = valueTag[index];
      if (element !== value) {
        auxValueTag.push(element);
      }
    }
    let newValue = '';
    for (let index = 0; index < auxValueTag.length; index++) {
      const element = auxValueTag[index];
      if (element !== '') {
        newValue = newValue ? (newValue + ',' + element) : element;
      }
    }
    auxFilterProjects[tag] = (tag === 'mhfddollarsallocated' || tag === 'totalcost') ? auxValueTag : newValue;
    setFilterProjectOptions(auxFilterProjects);
    getGalleryProjects();
    getParamFilterProjects(boundsMap, auxFilterProjects)

  }

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
  }
  const generateLabelsFilterComponents = () => {
    const filterComponents = { ...filterComponentOptions } as any;
    const labelsProblems = [...labelsFiltersComponents];
    for (const key in filterComponents) {
      const tag = key === 'estimatedcost' ? filterComponents[key] : filterComponents[key].split(',');
        if (key !== 'keyword' && key !== 'column' && key !== 'order') {
        const elements = [];
        const position = labelsProblems.findIndex((x: any) => x.name === key);
        for (let index = 0; index < tag.length; index++) {
          const element = tag[index];
          if (element) {
            if (key === 'estimatedcost') {
              const cost = element.split(',')
              elements.push({
                tag: key,
                value: element,
                display: elementCost(cost[0], cost[1])
              });
            } else if (key === 'component_type') {
              elements.push({
                tag: key,
                value: element,
                display: capitalLetter(element)
              });
            } else {
              elements.push({
                tag: key,
                value: element,
                display: element
              });
            }
          }
        }
        labelsProblems[position]['detail'] = elements as any;
      }
    }
    return <div className='tag-filters'>
    <div className='tag-body'>
      {labelsProblems.filter((x: any) => x.detail.length > 0).map((element: any) => {
        return (
          showFilterLabelsComponents(element)
        )
      })}
    </div>
    <div className="btn-footer-02">
      {labelsProblems.filter(x => x.detail.length > 0).length > 0 ? <Button className="btn-borde"
        onClick={() => resetFilterComponents()}>Clear</Button> : <p style={{textAlign: 'right'}}>No filters are applied</p>}
    </div>
  </div>;
  }
  const showFilterLabelsComponents = (element: any) => {
    if (element.detail[0].length === 0) {
      return (
        <>
        </>)
    } else {
      return (
        <>
          <div className="head">{element.display} &nbsp;<img src="/Icons/icon-19.svg" width="13px" alt="" /></div>
          {element.detail.map((filter: any) => {
            return (
              <p key={filter.tag}>
                {filter.display}
                <Button
                  className="btn-transparent"
                  onClick={() => deleteTagComponents(filter.tag, filter.value)}>
                  <img src="/Icons/icon-84.svg" width="15px" alt="" />
                </Button>
              </p>
            );
          })}
        </>
      );
    }
  }
  const deleteTagComponents = (tag: string, value: string) => {
    const auxFilterComponents: any = { ...filterComponentOptions };
    const valueTag = (tag === 'estimatedcost') ? filterComponentOptions[tag] : auxFilterComponents[tag].split(',');
    const auxValueTag = [] as Array<string>;
    for (let index = 0; index < valueTag.length; index++) {
      const element = valueTag[index];
      if (element !== value) {
        auxValueTag.push(element);
      }
    }
    let newValue = '';
    for (let index = 0; index < auxValueTag.length; index++) {
      const element = auxValueTag[index];
      if (element !== '') {
        newValue = newValue ? (newValue + ',' + element) : element;
      }
    }
    auxFilterComponents[tag] = (tag === 'estimatedcost') ? auxValueTag : newValue;
    setFilterComponentOptions(auxFilterComponents);
    getGalleryProjects();
    getParamFilterComponents(boundsMap, auxFilterComponents)
  }
  const generateLabelsFilterProblems = () => {
    const filterProblems = { ...filterProblemOptions } as any;
    const labelsProblems = [...labelsFiltersProblems];
    for (const key in filterProblemOptions) {
      const tag = key === 'cost' ? filterProblems[key] : filterProblems[key].split(',');
      if (key !== 'keyword' && key !== 'column' && key !== 'order') {
        const elements = [];
        const position = labelsProblems.findIndex((x: any) => x.name === key);
        for (let index = 0; index < tag.length; index++) {
          const element = tag[index];
          if (element) {
            if (key === 'cost') {
              const cost = element.split(',')
              elements.push({
                tag: key,
                value: element,
                display: elementCost(cost[0], cost[1])
              });
            } else {
              if (key === 'solutionstatus') {
                elements.push({
                  tag: key,
                  value: element,
                  display: getStatus(element)
                });
              } else {
                elements.push({
                  tag: key,
                  value: element,
                  display: element
                });
              }
            }

          }
        }
        labelsProblems[position]['detail'] = elements as any;
      }
    }
    return (
      <div className='tag-filters'>
        <div className='tag-body'>
          {labelsProblems.filter((x: any) => x.detail.length > 0).map((element: any) => {
            return (
              showFilterLabelsProblems(element)
            )
          })}
        </div>
        <div className="btn-footer-02">
          {labelsProblems.filter(x => x.detail.length > 0).length > 0 ? <Button className="btn-borde"
            onClick={() => resetFilterProblems()}>Clear</Button> : <p style={{textAlign: 'right'}}>No filters are applied</p>}
        </div>
      </div>
    )
  }
  const generateLabelsFilterProjects = () => {
    const filterProjects = { ...filterProjectOptions } as any;
    for (const key in filterProjectOptions) {
      const position = labelsFiltersProjects.findIndex((x: any) => x.name === key);
      if (position >= 0) {
        const tag = (key === 'mhfddollarsallocated' || key === 'totalcost') ? filterProjects[key] : filterProjects[key].split(',');
        const elements = [];
        for (let index = 0; index < tag.length; index++) {
          if (key === 'mhfddollarsallocated' || key === 'totalcost') {
            const cost = tag[index].split(',');
            elements.push({
              tag: key,
              display: elementCost(cost[0], cost[1]),
              value: tag[index]
            });
          } else {
            if (tag[index].length > 0) {
              elements.push({
                tag: key,
                value: tag[index],
                display: tag[index]
              });
            }
          }
        }
        if (elements.length > 0) {
          labelsFiltersProjects[position]['detail'] = elements as any;
        }
      }
    }
    let mappedLabelsFiltersProjects = labelsFiltersProjects.map((lfp: any) => {
      let d = lfp.detail.filter((dt: any) => dt !== '');
      let mlfp = { ...lfp, detail: d };
      return mlfp;
    })
    return (
      <div className='tag-filters'>
        <div className='tag-body'>
          {
            mappedLabelsFiltersProjects
              .filter((x: any) => x.detail.length > 0)
              .map((element: any, index: number) => {
                return (
                  showFilterLabels(element, index)
                )
              })
          }
        </div>
        <div className="btn-footer-02">
          {mappedLabelsFiltersProjects.filter((x: any) => x.detail.length > 0).length > 0 ? <Button className="btn-borde"
            onClick={() => resetFilterProjects(false)}>Clear</Button> : <p style={{textAlign: 'right'}}>No filters are applied</p>}
        </div>
      </div>
    );
  }

  const showFilterLabels = (element: any, index: number) => {
    if (element.detail[0].length === 0) {
      return null;
    } else {
      return (
        <Fragment key={`${element.name}_${index}`}>
          <div className="head">{element.display} &nbsp;<img src="/Icons/icon-19.svg" width="13px" alt="" /></div>
          {
            element.detail.map((filter: any, filterIndex: number) => {
              return (
                <p key={`${filter.name}_${filterIndex}`}>
                  {filter.display}
                  <Button
                    className="btn-transparent"
                    onClick={() => deleteTagProjects(filter.tag, filter.value)}>
                    <img src="/Icons/icon-84.svg" width="15px" alt="" />
                  </Button>
                </p>
              );
            })
          }
        </Fragment>
      );
    }
  }

  const showFilterLabelsProblems = (element: any) => {
    return (
      <>
        <div className="head">{element.display} <img src="/Icons/icon-19.svg" width="13px" alt="" /></div>
        {element.detail.map((filter: any) => {
          return <p>{filter.display} <Button className="btn-transparent"
            onClick={() => deleteTagProblems(filter.tag, filter.value)}> <img src="/Icons/icon-84.svg" width="15px" alt="" /></Button></p>
        })}
      </>
    );
  }

  useEffect(() => {
    let countTagProblems = 0;
    let countTagProjets = 0;
    let countTagComponents = 0;
    const filterComponents = { ...filterComponentOptions } as any;
    const filterProblems = { ...filterProblemOptions} as any;
    for (const key in filterProblemOptions) {
      const tag = key === 'cost' ? filterProblems[key] : filterProblems[key].split(',');
      if (key !== 'keyword' && key !== 'column' && key !== 'order') {
        for (let index = 0; index < tag.length; index++) {
          const element = tag[index];
          if (element) {
            countTagProblems++;
          }
        }
      }
    }
    for (const key in filterComponentOptions) {
      const tag = key === 'estimatedcost' ? filterComponents[key] : filterComponents[key].split(',');
      for (let index = 0; index < tag.length; index++) {
        const element = tag[index];
        if (element) {
          countTagComponents += 1;
        }
      }
    }
    const filterProjects = { ...filterProjectOptions } as any;
    for (const key in filterProjectOptions) {
      const tag = (key === 'mhfddollarsallocated' || key === 'totalcost') ? filterProjects[key] : filterProjects[key].split(',');
      if (key !== 'keyword' && key !== 'column' && key !== 'order') {
        for (let index = 0; index < tag.length; index++) {
          const element = tag[index];
          if (element) {
            countTagProjets += 1;
          }
        }
      }
      const position = labelsFiltersProjects.findIndex((x: any) => x.name === key);
      if (position >= 0) {
        const tag = (key === 'mhfddollarsallocated' || key === 'totalcost') ? filterProjects[key] : filterProjects[key].split(',');
        const elements = [];
        for (let index = 0; index < tag.length; index++) {
          elements.push(tag[index]);
        }
        if (elements.length > 0) {
          labelsFiltersProjects[position]['detail'] = elements as any;
        }
      }
    }

    setCountFilterComponents(countTagComponents);
    setCountFilterProblems(countTagProblems);
    setCountFilterProjects(countTagProjets);

  }, [filterComponentOptions, filterProblemOptions, filterProjectOptions])
  const [tabActive, setTabActive] = useState('1');
  const [keywordProblem, setKeywordProblem] = useState(filterProblemOptions.keyword ? filterProblemOptions.keyword : '');
  const [keywordProject, setKeywordProject] = useState(filterProjectOptions.keyword ? filterProjectOptions.keyword : '');
  const [visible, setVisible] = useState(useLocation().search ? true : false);
  const location = useLocation().search;
  const [data, setData] = useState({
    problemid: '',
    projectid: '',
    id: '',
    objectid: '',
    value: '',
    type: ''
  });
  const gray = 'rgba(17, 9, 60, 0.5)';
  const green = '#28C499';
  const purple = '#11093c';
  const [backgroundStyle, setBackgroundStyle] = useState<string>(gray);
  const [textStyle, setTextStyle] = useState<string>(purple);

  useEffect(() => {
    if(counterZoomArea >= 2) {
      setNameZoomArea(zoomarea);
    }
    counterZoomArea++;
  }, [zoomarea, groupOrganization])

  useEffect(() => {
    if (location.includes('problemid=')) {
      const id = location.replace('?problemid=', '');
      existDetailedPageProblem(id);
      const auxData = { ...data };
      auxData.problemid = id;
      setData(auxData);
    }
    if (location.includes('projectid=')) {
      const params = location.split('&');
      if(params.length === 2) {
        const type = params[0].replace('?type=', '');
        const projectid = params[1].replace('projectid=', '');
        const url = 'projectid=' + projectid;
        existDetailedPageProject(url);
        const auxData = {...data};
        auxData.type = type;
        auxData.projectid = projectid;
        setData(auxData);
      }
    }
    setNameZoomArea(zoomarea); 
  }, []);

  const handleToggle = () => {
    if (tabPosition === '2') {
      setTabPosition('0');
      setTabActive('0');
    }
    setToggleFilters(!toggleFilters);
    setToggleModalFilter(!toggleFilters);

    if (!toggleFilters) {
      switch(tabPosition) {
        case '0':
          getParamFilterProblems(boundsMap, filterProblemOptions)
          break;
        case '1':
          getParamFilterProjects(boundsMap, filterProjectOptions)
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
  }

  const changeCenter = (name: string, coordinates: any, isSelect?: any) => {
    console.log('change Center', name, coordinates, isSelect);
    const user = userInformation;
    user.polygon = coordinates;
    user.isSelect = isSelect;
    saveUserInformation(user);
    setNameZoomArea(name);
    console.log('changing center');
    const zoomareaSelected = groupOrganization.filter((x: any) => x.name === name).map((element: any) => {
      return {
        aoi: element.name,
        filter: element.table,
        coordinates: element.coordinates.coordinates
      }
    });
    console.log(zoomareaSelected);
    if (zoomareaSelected.length > 0) {
      switch (zoomareaSelected[0].filter) {
        case 'County':
        case 'CODE_STATE_COUNTY':
          console.log('enter here ');
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
  }

  const onSelect = (value: any, isSelect?:any) => {
    setAutocomplete(value);
    console.log('enter here');
    const zoomareaSelected = groupOrganization.filter((x: any) => x.name === value).map((element: any) => {
      return {
        aoi: element.name,
        filter: element.table,
        coordinates: element.coordinates.coordinates
      }
    });
    // TODO addis parse el bbox to coordinates jurisdiction
    if(zoomareaSelected[0]){
      setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
      changeCenter(value, zoomareaSelected[0].coordinates, isSelect == 'noselect' ? undefined : "isSelect");
    }
    setBBOXComponents({ bbox: [], centroids: [] })
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
  }

  const genExtra = () => (
    <Row justify="space-around" align="middle" style={{ cursor: 'pointer' }}>
      <Col>
        <div className={(spinFilter || spinCardProblems || spinCardProjects ||spinMapLoaded ) ? "apply-filter" : 'apply-filter-no-effect'} style={{ borderColor:'transparent', fontSize: '12px', marginTop: '-6px', color: 'rgba(17, 9, 60, 0.5)' }}>
          Apply map view to filters
          <Checkbox style={{ paddingLeft: 6 }} checked={applyFilter} onChange={() => {
            setApplyFilter(!applyFilter)
            getGalleryProblems();
            getGalleryProjects();
          }}></Checkbox>
          <div className="progress">
            <div className="progress-value"></div>
          </div>
        </div>
      </Col>
    </Row>
  );

  const menuSort = (listSort: Array<{ name: string, title: string }>) => {
    const itemMenu: MenuProps['items'] = [];
    listSort.forEach((element: { name: string, title: string }, index: number) => {
      itemMenu.push({
        key: `${index}|${element.title}`,
        label: <span className="menu-item-text" style={{ height: '10px', border:'transparent' }}>{element.title}</span>,
        onClick: (() => {
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
        })
      });
    });
    return <Menu className="js-mm-00" items={itemMenu}>
    </Menu>;
  };

  const onResetClick = () => {
    RheoStatService.reset();
    if (tabActive === '0') {
      setKeywordProblem('');
      setProblemKeyword('');
      getGalleryProblems();
    } else {
      setKeywordProject('');
      setProjectKeyword('');
      getGalleryProjects();
    }
    if (toggleModalFilter) {
      switch(filterTabNumber) {
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
      switch(tabCards) {
        case PROBLEMS_TRIGGER:
            resetFilterProblems();
            break;
        case PROJECTS_TRIGGER:
            resetFilterProjects(true);
            break;
      }
    }
  }

  const getCounter = (index: any, currentTab: any, total: number) => {
    if (+currentTab === +index) {
      return ` (${total})`;
    }
    return '';
  }
  useEffect(() => {
    if (tutorialStatus && toggleFilters) {
      handleToggle();
    }
  }, [tutorialStatus]);

  let filterCounter = 0;
  switch(tabActive) {
    case '0':
      filterCounter = countFilterProblems;
      break;
    case '1':
      filterCounter = countFilterProjects;
      break;
    case '2':
      filterCounter = countFilterComponents;
      break;
  }
  let filterLabel = `Filters `;
  return <>
  <div className="fr-area">Explore Confluence</div>
    <div className="mhfd-mobile">
      <h6>About the Platform</h6>
      <p>Confluence is your one-stop Mile High Flood District data portal.
      MHFD has developed Confluence from the ground up to meet the unique data needs of a
      regional flood control and stream management district.</p>
    </div>
    <div className="count" style={{ paddingBottom: '0px', marginTop: '1px' }}>
      {displayModal && visible && <DetailedModal
        detailed={detailed}
        type={data.problemid ? FILTER_PROBLEMS_TRIGGER : FILTER_PROJECTS_TRIGGER}
        data={data}
        visible={visible}
        setVisible={setVisible}
      />}
      {
        groupOrganization &&
        <MapAutoComplete
          onAutoCompleteSelected={onSelect}
        />
      }
      <div className="head-filter mobile-display">
        <Row justify="space-around" align="middle">
          <Col span={11} style={{textAlign:'initial'}}>
            <Search
              id="search-input"
              allowClear
              placeholder="Search"
              value={tabActive === '0' ? keywordProblem : keywordProject}
              onChange={(e) => {
                if (tabActive === '0') {
                  setKeywordProblem(e.target.value);
                } else {
                  setKeywordProject(e.target.value);
                }
              }}
              onSearch={(e) => {
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
              <Button className="btn-red" onClick={onResetClick}><u>Reset</u></Button>
              <Popover placement="bottomRight" overlayClassName="tag-filters" content={getFiltersPopoverContent()}>
                <Button onClick={handleToggle} style={{ marginLeft:'13px', paddingRight:'0px', borderRadius: '4px', backgroundColor:'transparent', borderColor:'transparent'}} className="btn-filter">
                  <img style={{ background: backgroundStyle }} className="img-filter" alt="" />
                  <span style={{ color: textStyle, marginLeft:'-3px', fontFamily:'Ubuntu'}}> {filterLabel} ({filterCounter})</span>
                </Button>
              </Popover>
              <div className="sort-content">
                <span className="button" style={{ transitionTimingFunction: 'ease-in' }} onClick={sortClick}>
                  {filterProjectOptions.order === 'asc' ? <img className="img-filter00" alt="" style={{ WebkitMask: "url('/Icons/icon-83.svg') no-repeat center" }} /> : <img className="img-filter00" alt="" style={{ WebkitMask: "url('/Icons/icon-86.svg') no-repeat center" }} />}

                </span>
                <Dropdown trigger={['hover']}
                  overlay={tabActive === '0' ?
                    menuSort(SORTED_PROBLEMS) :
                    menuSort(SORTED_PROJECTS)}
                  getPopupContainer={() => document.getElementById("sort-map") as HTMLElement}>
                  <Button onClick={sortClick} style={{ marginLeft:'8px', borderRadius: '4px',  backgroundColor:'transparent', borderColor:'transparent'}} className="btn-filter">
                    <img  className="img-sortBy" alt="" />
                    <span style={{ color: textStyle, marginLeft:'-3px', fontFamily:'Ubuntu'}}> Sort By</span>
                  </Button>
                </Dropdown>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {!toggleFilters ?
        <div style={{ marginRight: '-9px' }}>
          <Tabs onTabClick={(e: string) => {
          if (e === '0') {
            setTabActive('0');
            setTabCards(PROBLEMS_TRIGGER);
            getGalleryProblems();
          } else {
            setTabActive('1');
            setTabCards(PROJECTS_TRIGGER);
            getGalleryProjects();
          }
        }} activeKey={tabPosition} onChange={(key) => setTabPosition(key)} className="tabs-map over-00" tabBarExtraContent={genExtra()}>
          {tabs.map((value: string, index: number) => {
            let totalElements = 0;
            let cardInformation: Array<Object> = [];
            if (value === FILTER_PROBLEMS_TRIGGER) {
              cardInformation = galleryProblems.map((problem: any) => {
                console.log('problem', problem);
                return {
                  cartodb_id: problem.cartodb_id,
                  image: `gallery/${problem.problemtype}.png`,
                  requestName: problem.problemname,
                  jurisdiction: problem.jurisdiction,
                  estimatedCost: problem.estimatedcost,
                  componentCost: problem.component_cost ? problem.component_cost: 0,
                  field4: 'X',
                  field5: 'Components',
                  priority: problem.problempriority,
                  percentage: problem.solutionstatus ? problem.solutionstatus : 0,
                  problemid: problem.problemid,
                  type: problem.type,
                  value: problem.cartodb_id,
                  totalComponents: problem.totalComponents,
                  coordinates: problem.coordinates[0]
                }
              });
              totalElements = cardInformation.length;
            } else {
              cardInformation = galleryProjectsV2.map((project: any) => {
                const projectType = project?.project_status?.code_phase_type?.code_project_type?.project_type_name;
                const x = {
                  cartodb_id: project.project_id,
                  project_id: project.project_id,
                  // TODO: MISSING IMAGES
                  // FEMA Grant Management
                  // Letter of Map Change
                  // FHAD to PMR (PMR)
                  // Development Improvement Project (DIP)
                  // General Maintenance
                  // Permitting
                  // Maintenance Eligibiity Project (MEP)
                  // Research and Development (RD)
                  image: (
                    projectType === 'Capital (CIP)' ? '/projectImages/capital.png' :
                      projectType === 'Planning Study (Study)' ? '/projectImages/study.png' :
                        projectType === 'Special' ? '/projectImages/special.png' :
                          projectType === 'Vegetation Management' ? '/projectImages/vegetation-management.png' :
                            projectType === 'Sediment Removal' ? '/projectImages/sediment-removal.png' :
                              projectType === 'Maintenance Restoration' ? '/projectImages/restoration.png' :
                                projectType === 'Minor Repairs' ? '/projectImages/minor-repairs.png' :
                                  projectType === 'Routine Trash and Debris' ?'/projectImages/debris-management.png': '/projectImages/watershed-change.png'
                  ),
                  requestName: project.project_name,
                  sponsor: project.sponsor,
                  estimatedCost: project.estimatedcost ?  project.estimatedcost: project.finalcost,
                  componentCost: project.component_cost ? project.component_cost: 0,
                  status: project?.project_status?.code_phase_type?.code_status_type?.status_name,
                  projecttype: projectType,
                  objectid: project.objectid,
                  type: project.type,
                  value: project.cartodb_id,
                  id: project.projectId,
                  totalComponents: project.totalComponents,
                  // coordinates: project.coordinates[0]
                }
                return x;
              });
              totalElements = cardInformation.length;
            }
            return (
              <TabPane
                tab={
                  <span>
                    <Popover content={contents[index]} placement="rightBottom" style={{width: '100%'}}>
                      {value + getCounter(index, tabActive, totalElements)}
                    </Popover>
                  </span>
                }
                key={index} //TODO: change key but making sure problem's tab works key={`TabPane_${index}`}
              >
                <GenericTabView
                  key={`GenericTabView_${index}`}
                  type={value}
                  totalElements={totalElements}
                  cardInformation={cardInformation}
                />
              </TabPane>
            );
          })}
        </Tabs>
        </div>
        :
        <FiltersProjectView
          tabActive={tabActive}
          tabPosition={tabPosition}
          setTabPosition={setTabPosition}
          setTabActive={setTabActive}
        />
      }
    </div>
  </>
}

export default MapView;
