import React, { useState, useEffect, CSSProperties } from "react";
import { Row, Col, Dropdown, Button, Tabs, Input, Menu, Popover, Checkbox, AutoComplete } from 'antd';

import GenericTabView from "../Shared/GenericTab/GenericTabView";
import mapFormContainer from "../../hoc/mapFormContainer";
import FiltersProjectView from "../FiltersProject/FiltersProjectView";

import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, FILTER_TYPES, SORTED_LIST, ORGANIZATION_COORDINATES, SORTED_PROBLEMS, SORTED_PROJECTS, PROBLEMS_TRIGGER, PROJECTS_TRIGGER } from '../../constants/constants';
import { FilterTypes, FilterNamesTypes, MapViewTypes, ProjectTypes } from "../../Classes/MapTypes";
import { useParams, useLocation } from "react-router-dom";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import store from "../../store";
import DetailedModal from "../Shared/Modals/DetailedModal";
import { genExtra } from "../../utils/detailedUtils";
import { useMapDispatch, useMapState } from "../../hook/mapHook";

const tabs = [FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER];
let contents: any = [];
contents.push((<div className="popoveer-00"><b>Problems:</b> Problems represent areas where values such as public health, safety, and environmental quality are at risk due to potential flooding, erosion, or other identified threats within MHFD’s purview.</div>));
contents.push((<div className="popoveer-00"><b>Projects:</b> Projects are active efforts (i.e. planned and budgeted or funded and underway) to solve the problems identified in the Problems dataset or brought to MHFD by local governments.</div>));

/* line to remove useEffect dependencies warning */
/* eslint-disable react-hooks/exhaustive-deps */

const ButtonGroup = Button.Group;
const { TabPane } = Tabs;
const { Search } = Input;
const content = (<div className="popoveer-00">Filter by Area</div>);

const contentTag = (
  <div className="tag-filters">
    <div className="tag-body">
    <div className="head">PROJECT TYPE <img src="/Icons/icon-19.svg" width="13px" alt="" /></div>
    <p>Maintenance <Button className="btn-transparent"> <img src="/Icons/icon-84.svg" width="15px" alt="" /></Button></p>
    <p>Capital <Button className="btn-transparent"><img src="/Icons/icon-84.svg" width="15px" alt="" /></Button> </p>

    <div className="head">PROJECT STATUS <img src="/Icons/icon-19.svg" width="13px" alt="" /></div>
    <p>Initiated <Button className="btn-transparent"> <img src="/Icons/icon-84.svg" width="15px" alt="" /></Button></p>
    <p>Preliminary Design <Button className="btn-transparent"> <img src="/Icons/icon-84.svg" width="15px" alt="" /></Button></p>
    <p>Construction <Button className="btn-transparent"> <img src="/Icons/icon-84.svg" width="15px" alt="" /></Button></p>
    <p>Final Design <Button className="btn-transparent"> <img src="/Icons/icon-84.svg" width="15px" alt="" /></Button></p>

    <div className="head">PROBLEM TYPE <img src="/Icons/icon-19.svg" width="13px" alt="" /></div>
    <p>Hydrology <Button className="btn-transparent"> <img src="/Icons/icon-84.svg" width="15px" alt="" /></Button></p>
    <p>Floodpain <Button className="btn-transparent"> <img src="/Icons/icon-84.svg" width="15px" alt="" /></Button></p>
    <p>Alternatives <Button className="btn-transparent"> <img src="/Icons/icon-84.svg" width="15px" alt="" /></Button></p>

    <div className="head">MHFD DOLLARS ALLOCATED <img src="/Icons/icon-19.svg" width="13px" alt="" /></div>
    <p>$250K - $500K <Button className="btn-transparent"> <img src="/Icons/icon-84.svg" width="15px" alt="" /></Button></p>
    </div>
    <div className="btn-footer-02"><Button className="btn-borde">Clear</Button></div>
  </div>
);

const accordionRow: Array<any> = [
  {
    color: "green", image: "/Icons/icon-19.svg", field1: "Component 1", field2: "Westminter", field3: "$200,000", field4: "Project XYZ"
  }, {
    color: "gray", image: "/Icons/icon-19.svg", field1: "Component 2", field2: "Westminter", field3: "$200,000", field4: "Project XYZ"
  }, {
    color: "green", image: "/Icons/icon-19.svg", field1: "Component 3", field2: "Westminter", field3: "$200,000", field4: "Project XYZ"
  }
];

const MapView = ({ filters, projects, getProjectWithFilters, removeFilter, getDropdownFilters,
  dropdowns, userFiltered, getUserFilters, sortProjects, getGalleryProblems,
  getGalleryProjects, galleryProblems, galleryProjects, saveUserInformation,
  getDetailedPageProblem, getDetailedPageProject, detailed, loaderDetailedPage, filterProblemOptions,
  filterProjectOptions, filterCoordinates, setFilterProblemOptions,
  setFilterProjectOptions, getValuesByGroupColumn, paramFilters, setHighlighted, filterComponentOptions,
  setFilterComponentOptions, getComponentsByProblemId, componentsOfProblems, setProblemKeyword,
  setProjectKeyword, existDetailedPageProject, existDetailedPageProblem, displayModal, loaderTableCompoents, selectedOnMap,
  groupOrganization, applyFilter, getParamsFilter, spinFilter,
  setApplyFilter, componentCounter, getComponentCounter, setZoomProjectOrProblem, selectedLayers, updateSelectedLayers }: MapViewTypes) => {
  const [filterNames, setFilterNames] = useState<Array<any>>([]);
  const [tabPosition, setTabPosition] = useState('1');
  const [toggleFilters, setToggleFilters] = useState(false);
  const { setToggleModalFilter, getParamFilterProjects, getParamFilterComponents,
    getParamFilterProblems, setTabCards } = useMapDispatch();
  const { tabCards } = useMapState();

  const [countFilterProblems, setCountFilterProblems] = useState(0);
  const [countFilterComponents, setCountFilterComponents] = useState(0);
  const [countFilterProjects, setCountFilterProjects] = useState(0);

  useEffect(() => {
    let countTagProblems = 0;
    let countTagProjets = 0;
    let countTagComponents = 0;
    const filterComponents = { ...filterComponentOptions } as any;
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
    }
    const filterProblems = { ...filterProblemOptions } as any;
    for (const key in filterProblemOptions) {
      const tag = key === 'cost' ? filterProblems[key] : filterProblems[key].split(',');
      if (key !== 'keyword' && key !== 'column' && key !== 'order') {
        for (let index = 0; index < tag.length; index++) {
          const element = tag[index];
          if (element) {
            countTagProblems += 1;
          }
        }
      }
    }
    setCountFilterComponents(countTagComponents);
    setCountFilterProblems(countTagProblems);
    setCountFilterProjects(countTagProjets);

  }, [filterComponentOptions, filterProblemOptions, filterProjectOptions])
  // const [listDescription, setListDescription] = useState(false);
  const listDescription = false;
  const [designation, SetDesignation] = useState(store.getState().profile.userInformation.designation);
  const [area, setArea] = useState(store.getState().profile.userInformation.zoomarea)
  const [tabActive, setTabActive] = useState('1');
  const { projectId } = useParams();
  const [keywordProblem, setKeywordProblem] = useState(filterProblemOptions.keyword ? filterProblemOptions.keyword : '');
  const [keywordProject, setKeywordProject] = useState(filterProjectOptions.keyword ? filterProjectOptions.keyword : '');
  const [visible, setVisible] = useState(useLocation().search ? true : false);
  const [counterComponents, setCounterComponents] = useState(0);
  const location = useLocation().search;
  const [data, setData] = useState({
    problemid: '',
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
  if (designation === 'guest') {
    setApplyFilter(false);
  }

  useEffect(() => {
    if (location.includes('problemid=')) {
      const id = location.replace('?problemid=', '');
      existDetailedPageProblem(id);
      const auxData = { ...data };
      auxData.problemid = id;
      setData(auxData);
    }
    if (location.includes('?objectid=') && location.includes('&cartoid=') && location.includes('&type=') && location.includes('&id=')) {
      const params = location.split('&');
      if (params.length === 4) {
        const objectid = params[0].replace('?objectid=', '');
        const cartoid = params[1].replace('cartoid=', '');
        const type = params[2].replace('type=', '');
        const id = params[3].replace('id=', '');
        const url = 'objectid=' + objectid + '&cartoid=' + cartoid + '&type=' + type;
        existDetailedPageProject(url);
        const auxData = { ...data };
        auxData.objectid = objectid;
        auxData.value = cartoid;
        auxData.type = type;
        auxData.id = id;
        setData(auxData);
      }
    }
  }, []);

  useEffect(() => {
    if (filters) {
      setCurrentFilters(filters);
    }
  }, [filters]);

  useEffect(() => {
    let counter = galleryProblems.reduce((prev: any, next: any) => prev + next.totalComponents, 0);
    counter += galleryProjects.reduce((prev: any, next: any) => prev + next.totalComponents, 0);
    setCounterComponents(counter);
  })

  const handleOnSubmit = (filtersData: FilterTypes) => {
    getProjectWithFilters(filtersData);
  }

  const handleReset = () => {
    getProjectWithFilters([]);
  }

  const handleToggle = () => {
    // Force coded cause' components tab doesn't exists on MapView

    if (tabPosition === '2') {
      setTabPosition('0');
      setTabActive('0');
    }
    setToggleFilters(!toggleFilters);
    setToggleModalFilter(!toggleFilters);

    if (!toggleFilters) {
      getParamFilterProjects(filterCoordinates);
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
  const enterToggle = () => {
    setBackgroundStyle(green);
    setTextStyle(green);
  }
  const exitToggle = () => {
    if (!toggleFilters) {
      setBackgroundStyle(gray);
      setTextStyle(purple);
    } else {
      setBackgroundStyle(green);
      setTextStyle(green);
    }
  }
  const setCurrentFilters = (filtersData: FilterTypes) => {
    const values: Array<{ key: string, value: string }> = [];
    for (const key in filtersData) {
      if (Array.isArray(filtersData[key])) {
        (filtersData[key] as Array<string>).forEach((value: string) => {
          values.push({
            key: key,
            value: value
          });
        });
      } else {
        values.push({
          key: key,
          value: filtersData[key] as string
        });
      }
    }
    const filterTypes: { [key: string]: string | number } = FILTER_TYPES;
    const getFilterNames = values.map((value: FilterNamesTypes) => {
      const filterData = filterTypes[value.value] || userFiltered[value.value] || value.value;
      return { key: value.key, type: value.value, value: filterData }
    });
    setFilterNames(getFilterNames);
  }
  const clearSearch = () => {
    if (tabActive === '0') {
      setProblemKeyword('');
      setKeywordProblem('');
      getGalleryProblems();
    } else {
      setProjectKeyword('');
      setKeywordProject('');
      getGalleryProjects();
    }
  }
  const changeCenter = (name: string, coordinates: Array<Array<number>>) => {
    const user = store.getState().profile.userInformation;
    user.polygon = coordinates;
    saveUserInformation(user);
    setArea(name);
    const zoomareaSelected = groupOrganization.filter((x: any) => x.aoi === name).map((element: any) => {
      return {
        aoi: element.aoi,
        filter: element.filter
      }
    });

    if (zoomareaSelected.length > 0) {
      const optionsProblem = {...filterProblemOptions};
      const optionsProject = {...filterProjectOptions};

      switch(zoomareaSelected[0].filter) {
        case 'County':
          optionsProblem['county'] = name;
          optionsProject['county'] = name;
          optionsProblem['jurisdiction'] = '';
          optionsProject['jurisdiction'] = '';
          optionsProblem['servicearea'] = '';
          optionsProject['servicearea'] = '';
          break;
        case 'Jurisdiction':
          optionsProblem['jurisdiction'] = name;
          optionsProject['jurisdiction'] = name;
          optionsProblem['county'] = '';
          optionsProject['county'] = '';
          optionsProblem['servicearea'] = '';
          optionsProject['servicearea'] = '';
          break;
        case 'Service Area':
          optionsProblem['servicearea'] = name;
          optionsProject['servicearea'] = name;
          optionsProblem['county'] = '';
          optionsProject['county'] = '';
          optionsProblem['jurisdiction'] = '';
          optionsProject['jurisdiction'] = '';
          break;
        default:
          optionsProblem['servicearea'] = '';
          optionsProject['servicearea'] = '';
          optionsProblem['county'] = '';
          optionsProject['county'] = '';
          optionsProblem['jurisdiction'] = '';
          optionsProject['jurisdiction'] = '';
      }
      setFilterProblemOptions(optionsProblem);
      setFilterProjectOptions(optionsProject);
    }
  }

  const menu = () => {
    return <Menu className="js-mm-00 sign-menu-organization2x">
      {groupOrganization.map((item: { aoi: string, coordinates: Array<Array<Array<number>>> }) => (
        <Menu.Item onClick={() => changeCenter(item.aoi, item.coordinates[0])} key={item.aoi + "g1"}><span>{item.aoi}</span></Menu.Item>
      ))}
      {/* <Menu.ItemGroup key="g1">
        <label className="label-sg">{'Regional Agency'}</label>
        {ORGANIZATION_COORDINATES.REGIONAL_AGENCY.map((item: {name: string, coordinates: Array<Array<number>>}, index: number) => (
          <Menu.Item onClick={()=>changeCenter(item.name, item.coordinates)} key={index + "g1"}><span>{item.name}</span></Menu.Item>))}
      </Menu.ItemGroup>
      <Menu.ItemGroup key="g2">
        <label className="label-sg">{'City'}</label>
        {ORGANIZATION_COORDINATES.CITY.map((item: {name: string, coordinates: Array<Array<number>>}, index: number) => (
          <Menu.Item onClick={()=>changeCenter(item.name + ', CO', item.coordinates)} key={index + "g2"}><span>{item.name}</span></Menu.Item>))}
      </Menu.ItemGroup>
      <Menu.ItemGroup key="g3">
        <label className="label-sg">{'City and County'}</label>
        {ORGANIZATION_COORDINATES.CITY_AND_COUNTY.map((item: {name: string, coordinates: Array<Array<number>>}, index: number) => (
          <Menu.Item onClick={()=>changeCenter(item.name + ', CO', item.coordinates)} key={index + "g3"}><span>{item.name}</span></Menu.Item>))}
      </Menu.ItemGroup>
      <Menu.ItemGroup key="g4">
        <label className="label-sg">{'Unincorporated County'}</label>
        {ORGANIZATION_COORDINATES.UNINCORPORATED_COUNTY.map((item: {name: string, coordinates: Array<Array<number>>}, index: number) => (
          <Menu.Item onClick={()=>changeCenter(item.name + ', CO', item.coordinates)} key={index + "g4"}><span>{item.name}</span></Menu.Item>))}
      </Menu.ItemGroup> */}
    </Menu>
  };

  const genExtra = () => (
    <Row type="flex" justify="space-around" align="middle" style={{ cursor: 'pointer' }}>
      <Col style={{fontSize: '12px'}}>
        <div className="apply-filter">
          Apply map view to filters
          <Checkbox style={{ paddingLeft: 6 }} checked={applyFilter} onChange={() => {
            setApplyFilter(!applyFilter)
            getGalleryProblems();
            getGalleryProjects();
          }}></Checkbox>
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
  return <>
    <div className="count" style={{paddingBottom: '0px'}}>
      {displayModal && visible && <DetailedModal
        detailed={detailed}
        getDetailedPageProblem={getDetailedPageProblem}
        getDetailedPageProject={getDetailedPageProject}
        loaderDetailedPage={loaderDetailedPage}
        getComponentsByProblemId={getComponentsByProblemId}
        type={data.problemid ? FILTER_PROBLEMS_TRIGGER : FILTER_PROJECTS_TRIGGER}
        data={data}
        visible={visible}
        setVisible={setVisible}
        componentsOfProblems={componentsOfProblems}
        loaderTableCompoents={loaderTableCompoents}
        componentCounter={componentCounter}
        getComponentCounter={getComponentCounter}
      />}
      <Row className="head-m">
        <Col span={20} id="westminter">
          <Dropdown trigger={['click']} overlay={menu} getPopupContainer={() => document.getElementById("westminter") as HTMLElement}>
            <span className="ant-dropdown-link span-header">
              {area ? (area.endsWith(', CO') ? area.replace(', CO', '') : area) : 'Mile High Flood District'}
              <Popover content={content}>
                <img src="/Icons/icon-12.svg" alt="" style={{ marginLeft: '8px' }} />
              </Popover>
            </span>
          </Dropdown>
          {/*<div className="auto-complete-map">
            <AutoComplete
             placeholder="Boulder"
           />
           <Popover content={content}>
             <img src="/Icons/icon-12.svg" alt="" style={{ marginLeft: '5px' }} />
           </Popover>
          </div>*/}
        </Col>
        <Col style={{ textAlign: 'right' }} span={4}>
          <ButtonGroup>
            {/* <Button className="btn-mm" onClick={() => {
              setListDescription(true);
            }}>
              <img className="img-h" src="/Icons/icon-30.svg" alt="" />
              <img className="img-a" src="/Icons/icon-32.svg" alt="" />
            </Button> */}
            {/* <Button onClick={() => {
              setListDescription(false);
            }}>
              <img className="img-h" src="/Icons/icon-31.svg" alt="" />
              <img className="img-a" src="/Icons/icon-33.svg" alt="" />
            </Button> */}
          </ButtonGroup>
        </Col>
      </Row>

      <div className="head-filter">
        <Row type="flex" justify="space-around" align="middle">
          <Col span={12}>
            <Search
              placeholder="Search..."
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
              style={{ width: 200 }}
            />
            {/*<Button onClick={e => {
              clearSearch();
            }} style={{ width: '80px' }} className="btn-borde">Clear</Button>*/}
          </Col>
          <Col style={{ textAlign: 'right' }} span={12} id="sort-map">
          <Popover placement="bottomRight" overlayClassName="tag-filters" content={contentTag}>
            <Button onClick={handleToggle} >
              <img style={{ background: backgroundStyle }} className="img-filter" alt="" /><span style={{ color: textStyle }} > Filters ({tabActive === '0' ? (countFilterComponents + countFilterProblems) :
                tabActive === '1' ? (countFilterComponents + countFilterProjects) : (countFilterComponents)})</span>
            </Button>
          </Popover>
            <div className="sort-content">
              <Dropdown trigger={['click']}
                overlay={tabActive === '0' ?
                  menuSort(SORTED_PROBLEMS) :
                  menuSort(SORTED_PROJECTS)}
                getPopupContainer={() => document.getElementById("sort-map") as HTMLElement}>
                <span className="ant-dropdown-link" style={{ cursor: 'pointer' }}>
                  {/*<img className="img-filter00" alt="" />*/} Sort by {tabActive === '0' ? SORTED_PROBLEMS.filter(element => element.name === filterProblemOptions.column)[0]?.title :
                    SORTED_PROJECTS.filter(element => element.name === filterProjectOptions.column)[0]?.title}
                </span>
              </Dropdown>
              <span className="sort-buttons" onClick={() => {
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
              }}>
                <CaretUpOutlined
                  className="arrow-up"
                  style={{
                    opacity: tabActive === '0' ? (filterProblemOptions.order === 'asc' ? '100%' : '30%') :
                      (filterProjectOptions.order === 'asc' ? '100%' : '30%')
                  }}
                />
                <CaretDownOutlined
                  className="arrow-down"
                  style={{
                    opacity: tabActive === '0' ? (filterProblemOptions.order === 'desc' ? '100%' : '30%') :
                      (filterProjectOptions.order === 'desc' ? '100%' : '30%')
                  }}
                />
              </span>
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
              cardInformation = galleryProblems.map(problem => {
                return {
                  cartodb_id: problem.cartodb_id,
                  image: `gallery/${problem.problemtype}.jpg`,
                  requestName: problem.problemname,
                  jurisdiction: problem.jurisdiction,
                  estimatedCost: problem.solutioncost,
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
              cardInformation = galleryProjects.map(project => {
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
                                  '/projectImages/debris_management.png') : '/Icons/eje.png'
                  ),
                  requestName: project.projectname ? project.projectname : project.requestedname,
                  sponsor: project.sponsor,
                  estimatedCost: project.finalcost ? project.finalcost : project.estimatedcost,
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
              <TabPane tab={<span><Popover content={contents[index]} placement="rightBottom">{value} </Popover> </span>} key={'' + index}>
                <GenericTabView key={value + index}
                  detailed={detailed}
                  loaderDetailedPage={loaderDetailedPage}
                  getDetailedPageProblem={getDetailedPageProblem}
                  getDetailedPageProject={getDetailedPageProject}
                  filterNames={filterNames}
                  listDescription={listDescription}
                  type={value}
                  totalElements={totalElements}
                  cardInformation={cardInformation}
                  accordionRow={accordionRow}
                  listFilters={filters}
                  removeFilter={removeFilter}
                  setHighlighted={setHighlighted}
                  getComponentsByProblemId={getComponentsByProblemId}
                  filterComponentOptions={filterComponentOptions}
                  setFilterComponentOptions={setFilterComponentOptions}
                  getGalleryProjects={getGalleryProjects}
                  getGalleryProblems={getGalleryProblems}
                  filterProblemOptions={filterProblemOptions}
                  filterProjectOptions={filterProjectOptions}
                  setFilterProblemOptions={setFilterProblemOptions}
                  setFilterProjectOptions={setFilterProjectOptions}
                  componentsOfProblems={componentsOfProblems}
                  loaderTableCompoents={loaderTableCompoents}
                  selectedOnMap={selectedOnMap}
                  componentCounter={componentCounter}
                  getComponentCounter={getComponentCounter}
                  setZoomProjectOrProblem={setZoomProjectOrProblem}
                />
              </TabPane>
            );
          })}
        </Tabs>
        :
        <FiltersProjectView
          tabPosition={tabPosition}
          setTabPosition={setTabPosition}
          componentsTotal={counterComponents}
          filterNames={filterNames}
          setToggleFilters={setToggleFilters}
          handleOnSubmit={handleOnSubmit}
          handleReset={handleReset}
          setFilterNames={setFilterNames}
          projectsLength={galleryProjects.length}
          problemsLength={galleryProblems.length}
          getDropdownFilters={getDropdownFilters}
          dropdowns={dropdowns}
          userFiltered={userFiltered}
          getUserFilters={getUserFilters}
          getValuesByGroupColumn={getValuesByGroupColumn}
          filterProblemOptions={filterProblemOptions}
          setFilterProblemOptions={setFilterProblemOptions}
          paramFilters={paramFilters}
          getGalleryProblems={getGalleryProblems}
          filterProjectOptions={filterProjectOptions}
          setFilterProjectOptions={setFilterProjectOptions}
          getGalleryProjects={getGalleryProjects}
          setFilterComponentOptions={setFilterComponentOptions}
          filterComponentOptions={filterComponentOptions}
          setTabActive={setTabActive}
          selectedLayers={selectedLayers}
          updateSelectedLayers={updateSelectedLayers}
          applyFilter={applyFilter}
          setApplyFilter={setApplyFilter}
          spinFilter={spinFilter}
        />
      }
    </div>
  </>
}

const layers = {
  polygons: true,
  components: true
}

export default mapFormContainer(MapView, layers);
