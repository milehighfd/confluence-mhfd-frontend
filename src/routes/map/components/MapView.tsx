import React, { useState, useEffect } from "react";
import { Row, Col, Dropdown, Button, Tabs, Input, Menu, Popover, Checkbox, AutoComplete } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import GenericTabView from "../../../Components/Shared/GenericTab/GenericTabView";
import FiltersProjectView from "../../../Components/FiltersProject/FiltersProjectView";

import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, SORTED_PROBLEMS, SORTED_PROJECTS, PROBLEMS_TRIGGER, PROJECTS_TRIGGER, COMPONENTS_TRIGGER, SELECT_ALL_FILTERS } from '../../../constants/constants';
import { FilterTypes } from "../../../Classes/MapTypes";
import { useLocation } from "react-router-dom";
import DetailedModal from "../../../Components/Shared/Modals/DetailedModal";
import { useMapDispatch, useMapState } from "../../../hook/mapHook";
import { capitalLetter, elementCost, getStatus } from '../../../utils/utils';
import { useSelector } from "react-redux";
import RheoStatService from '../../../Components/FiltersProject/NewProblemsFilter/RheoStatService';
import { useProfileDispatch, useProfileState } from "../../../hook/profileHook";
import { useDetailedState } from "../../../hook/detailedHook";

const tabs = [FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER];
let contents: any = [];
contents.push((<div className="popoveer-00"><b>Problems:</b> Problems represent areas where values such as public health, safety, and environmental quality are at risk due to potential flooding, erosion, or other identified threats within MHFD’s purview.</div>));
contents.push((<div className="popoveer-00"><b>Projects:</b> Projects are active efforts (i.e. planned and budgeted or funded and underway) to solve the problems identified in the Problems dataset or brought to MHFD by local governments.</div>));

const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = AutoComplete;
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
    filterProblemOptions,
    filterProjectOptions,
    filterComponentOptions,
    applyFilter,
    spinFilters: spinFilter
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
  const {
    designation,
    zoomarea
  } = userInformation;
  const {
    tabCards,
    nameZoomArea,
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

  const [valueA, setvalueA] = useState('');
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  useEffect(() => {
    setvalueA(nameZoomArea);
  }, [nameZoomArea]);
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
            return <p>{filter.display} <Button className="btn-transparent"
              onClick={() => deleteTagComponents(filter.tag, filter.value)}> <img src="/Icons/icon-84.svg" width="15px" alt="" /></Button></p>
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
          {mappedLabelsFiltersProjects.filter((x: any) => x.detail.length > 0).map((element: any) => {
            return (
              showFilterLabels(element)
            )
          })}
        </div>
        <div className="btn-footer-02">
          {mappedLabelsFiltersProjects.filter((x: any) => x.detail.length > 0).length > 0 ? <Button className="btn-borde"
            onClick={() => resetFilterProjects(false)}>Clear</Button> : <p style={{textAlign: 'right'}}>No filters are applied</p>}
        </div>
      </div>
    );
  }

  const showFilterLabels = (element: any) => {
    if (element.detail[0].length === 0) {
      return (
        <>
        </>)
    } else {
      return (
        <>
          <div className="head">{element.display} &nbsp;<img src="/Icons/icon-19.svg" width="13px" alt="" /></div>
          {element.detail.map((filter: any) => {
            return <p key={filter.value}>{filter.display} <Button className="btn-transparent"
              onClick={() => deleteTagProjects(filter.tag, filter.value)}> <img src="/Icons/icon-84.svg" width="15px" alt="" /></Button></p>
          })}
        </>
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
        const elements = [];
        for (let index = 0; index < tag.length; index++) {
          const element = tag[index];
          if (element) {
            countTagProblems++;
          }
        }
      }
    }
    for (const key in filterComponentOptions) {
      let c = 0;
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
      let c = 0;
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
        const url = 'type=' + type + '&projectid=' + projectid;
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
    const user = userInformation;
    user.polygon = coordinates;
    user.isSelect = isSelect;
    saveUserInformation(user);
    setNameZoomArea(name);
    const zoomareaSelected = groupOrganization.filter((x: any) => x.aoi === name).map((element: any) => {
      return {
        aoi: element.aoi,
        filter: element.filter,
        coordinates: element.coordinates
      }
    });
    if (zoomareaSelected.length > 0) {
      switch (zoomareaSelected[0].filter) {
        case 'County':
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
          break;
        case 'Jurisdiction':
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
          break;
        case 'Service Area':
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
          break;
        default:
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
      }
    }
  }
  const [dataAutocomplete, setDataAutocomplete] = useState(groupOrganization.filter(function (item: any) {
    if (item.aoi === undefined) {
      return false;
    }
    return true;
  }).map((item: { aoi: string }) => { return <Option className="list-line" key={item.aoi}>{item.aoi}</Option> }));

  useEffect(()=>{
    setDataAutocomplete(groupOrganization.filter(function (item: any) {
      if (item.aoi === undefined) {
        return false;
      }
      return true;
    }).map((item: { aoi: string }) => { return <Option className="list-line" key={item.aoi}>{item.aoi}</Option> }));
  },[groupOrganization]);
  const setValueInFilters = (value: any, type: any, filterOptions: any, withSuffix: boolean = false) => {
    const options = { ...filterOptions };
    options.jurisdiction = '';
    options.county = '';
    options.servicearea = '';
    if (!withSuffix) {
      if (value.includes('County')) {
        let index = value.indexOf('County');
        if (index !== -1) {
          value = value.substr(0, index - 1);
        }
      }
      if (value.includes('Service Area')) {
        let index = value.indexOf('Service Area');
        if (index !== -1) {
          value = value.substr(0, index - 1);
        }
      }
    }
    if(type == "Service Area") {
      options.servicearea = value;
    } else if(type) {
      options[type.toLowerCase()] = value;
    }
    return options;
  }
  const onSelect = (value: any, isSelect?:any) => {
    console.log('Selected:', value, isSelect);
    setAutocomplete(value);
    setvalueA(value);
    const zoomareaSelected = groupOrganization.filter((x: any) => x.aoi === value).map((element: any) => {
      return {
        aoi: element.aoi,
        filter: element.filter,
        coordinates: element.coordinates
      }
    });
    if(zoomareaSelected[0]){
      let zone = zoomareaSelected[0].aoi;
      zone = zone.replace('County ', '').replace('Service Area', '');
      setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
      changeCenter(value, zoomareaSelected[0].coordinates, isSelect == 'noselect'? undefined:"isSelect");
    }
    setBBOXComponents({ bbox: [], centroids: [] })
  };

  const { spinMapLoaded } = useSelector((state: any) => ({
    spinMapLoaded: state.map.spinMapLoaded,
    autcomplete: state.map.autocomplete
    }));

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
    <Row justify="space-around" align="middle" style={{ cursor: 'pointer', marginTop: '-3px' }}>
      <Col>
        <div className={(spinFilter || spinCardProblems || spinCardProjects ||spinMapLoaded ) ? "apply-filter" : 'apply-filter-no-effect'} style={{ borderColor:'transparent' }}>
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
    return <Menu className="js-mm-00">
      {listSort.map((item: { name: string, title: string }) => (
        <Menu.Item key={item.name}
          onClick={() => {
            if (tabActive === '0') {
              const auxOptions = { ...filterProblemOptions };
              auxOptions.column = item.name;
              setFilterProblemOptions(auxOptions);
              getGalleryProblems();
            } else {
              const auxOptions = { ...filterProjectOptions };
              auxOptions.column = item.name;
              setFilterProjectOptions(auxOptions);
              getGalleryProjects();
            }
          }}>
          <span className="menu-item-text">{item.title}</span>
        </Menu.Item>
      ))}
    </Menu>
  }
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
    <div className="count" style={{ paddingBottom: '0px' }}>
      {displayModal && visible && <DetailedModal
        detailed={detailed}
        type={data.problemid ? FILTER_PROBLEMS_TRIGGER : FILTER_PROJECTS_TRIGGER}
        data={data}
        visible={visible}
        setVisible={setVisible}
      />}
      <Row className="head-m mobile-display">
        <Col span={24} id="westminter">
          <div className="auto-complete-map">
            <AutoComplete
              style={{ width: '200' }}
              onDropdownVisibleChange={setDropdownIsOpen}
              dataSource={dataAutocomplete}
              placeholder={nameZoomArea ? (nameZoomArea.endsWith(', CO') ? nameZoomArea.replace(', CO', '') : nameZoomArea) : 'Mile High Flood District'}
              filterOption={(inputValue, option: any) => {
                if (dataAutocomplete.map((r: any) => r.key).includes(inputValue)) {
                  return true;
                }
                return option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
              }}
              onSelect={onSelect}
              value={valueA}
              onSearch={(input2: any) => {
                setvalueA(input2)
              }}
              >

              <Input id={'miclase'} style={{border: 'none', boxShadow: 'none', borderBottom: '1px solid rgba(37, 24, 99, 0.3)',marginRight: '-18px' }} suffix={dropdownIsOpen ? <UpOutlined style={{marginRight: '-18px'}}/> : <DownOutlined style={{marginRight: '-18px'}}/>} />
            </AutoComplete>
          </div>
        </Col>
      </Row>

      <div className="head-filter mobile-display">
        <Row justify="space-around" align="middle">
          <Col span={11}>
            <Search
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
                  setProblemKeyword(keywordProblem);
                  getGalleryProblems();
                } else {
                  setProjectKeyword(keywordProject);
                  getGalleryProjects();
                }
              }}
            />
          </Col>
          <Col style={{ textAlign: 'right' }} span={13} id="sort-map">
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
          </Col>
        </Row>
      </div>

      {!toggleFilters ?
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
                return {
                  cartodb_id: problem.cartodb_id,
                  image: `gallery/${problem.problemtype}.jpg`,
                  requestName: problem.problemname,
                  jurisdiction: problem.jurisdiction,
                  estimatedCost: problem.estimatedcost,
                  componentCost: problem.component_cost ? problem.component_cost: 0,
                  field4: 'X',
                  field5: 'Components',
                  priority: problem.problempriority,
                  percentage: problem.solutionstatus,
                  problemid: problem.problemid,
                  type: problem.type,
                  value: problem.cartodb_id,
                  totalComponents: problem.totalComponents,
                  coordinates: problem.coordinates[0]
                }
              });
              totalElements = cardInformation.length;
            } else {
              cardInformation = galleryProjects.map((project: any) => {
                return {
                  cartodb_id: project.cartodb_id,
                  image: project.attachments ? project.attachments : (
                    project.projecttype === 'Capital' ? '/projectImages/capital.jpg' :
                      project.projecttype === 'Study' ? '/projectImages/study.jpg' :
                        project.projecttype === 'Maintenance' ?
                          (project.projectsubtype === 'Vegetation Mangement' ? '/projectImages/vegetation_management.jpg' :
                            project.projectsubtype === 'Sediment Removal' ? '/projectImages/sediment_removal.jpg' :
                              project.projectsubtype === 'Restoration' ? '/projectImages/restoration.jpg' :
                                project.projectsubtype === 'Minor Repairs' ? '/projectImages/minor_repairs.jpg' :
                                  '/projectImages/debris_management.jpg') : '/Icons/eje.png'
                  ),
                  requestName: project.projectname ? project.projectname : project.requestedname,
                  sponsor: project.sponsor,
                  estimatedCost: project.estimatedcost ?  project.estimatedcost: project.finalcost,
                  componentCost: project.component_cost ? project.component_cost: 0,
                  status: project.status,
                  projecttype: project.projecttype,
                  objectid: project.objectid,
                  type: project.type,
                  value: project.cartodb_id,
                  id: project.projectid,
                  totalComponents: project.totalComponents,
                  coordinates: project.coordinates[0]
                }
              });
              totalElements = cardInformation.length;
            }
            return (
              <TabPane tab={<span><Popover content={contents[index]} placement="rightBottom">{value + getCounter(index, tabActive, totalElements)} </Popover> </span>} key={'' + index}>
                <GenericTabView
                  key={value + index}
                  type={value}
                  totalElements={totalElements}
                  cardInformation={cardInformation}
                />
              </TabPane>
            );
          })}
        </Tabs>
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
