import React, { useState, useEffect } from "react";
import { Row, Col, Dropdown, Button, Tabs, Input, Menu } from 'antd';

import GenericTabView from "../Shared/GenericTab/GenericTabView";
import mapFormContainer from "../../hoc/mapFormContainer";
import FiltersProjectView from "../FiltersProject/FiltersProjectView";

import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, FILTER_TYPES, SORTED_LIST, ORGANIZATION_COORDINATES, SORTED_PROBLEMS, SORTED_PROJECTS } from '../../constants/constants';
import { FilterTypes, FilterNamesTypes, MapViewTypes, ProjectTypes } from "../../Classes/MapTypes";
import { useParams } from "react-router-dom";
// import DetailedModal from "../Shared/Modals/DetailedModal";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import store from "../../store";

const tabs = [FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER];

/* line to remove useEffect dependencies warning */
/* eslint-disable react-hooks/exhaustive-deps */

const ButtonGroup = Button.Group;
const { TabPane } = Tabs;
const { Search } = Input;

const cardInformationProblems: Array<any> = [
  {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }
];

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
                  setFilterProjectOptions } : MapViewTypes) => {

  const [sortBy, setSortBy] = useState({ fieldSort: SORTED_LIST[0], sortType: true });
  const [modalProject, setModalProject] = useState<ProjectTypes>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [filterNames, setFilterNames] = useState<Array<any>>([]);
  const [tabPosition, setTabPosition] = useState('0');
  const [toggleFilters, setToggleFilters] = useState(false);
  const [listDescription, setListDescription] = useState(false);
  const [sortableProjects, setSortableProjects] = useState(projects);
  const [area, setArea] = useState(store.getState().profile.userInformation.organization)
  const [ tabActive, setTabActive] = useState('0');
  const { projectId } = useParams();

  // const [ filterProblemOptions, setOptionFilterProblems] = useState({
  //   keyword: '',
  //   column: 'problemname',
  //   order: 'asc'
  // });
  // const [ filterProjectOptions, setOptionFilterProjects] = useState({
  //   keyword: '',
  //   column: 'streamname',
  //   order: 'asc'
  // });
  // const options = (options: {keyword: string, column: string, order: string}) => {
  //   return ((options.keyword ? ('name=' + options.keyword + '&') : '') + 'sortby=' + options.column + '&sorttype=' + options.order)
  // }
  useEffect(() =>{
      getGalleryProblems();
      getGalleryProjects();
  }, [getGalleryProblems, getGalleryProjects]);
  useEffect(() => {
    /* Validate projectId in backend to show it! */
    if (projectId === '5eb2cee46fc3881503d67288' && projects[0]) {
      setModalProject(projects[0]);
      setModalVisible(true);
    }
  }, [projectId, projects]);

  useEffect(() => {
    if (filters) {
      setCurrentFilters(filters);
    }
  }, [filters]);

  useEffect(() => {
    setSortableProjects(projects);
  }, [projects]);

  const handleOnSubmit = (filtersData : FilterTypes) => {
    getProjectWithFilters(filtersData);
  }

  const handleReset = () => {
    getProjectWithFilters([]);
  }

  const handleToggle = () => {
    // Force coded cause' components tab doesn't exists on MapView
    if(tabPosition === "2") setTabPosition("0");
    setToggleFilters(!toggleFilters);
  }

  const setCurrentFilters = (filtersData : FilterTypes) => {
    const values : Array<{ key: string, value: string }> = [];
    for (const key in filtersData) {
      if(Array.isArray(filtersData[key])) {
        (filtersData[key] as Array<string>).forEach((value : string) => {
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
    const filterTypes : { [key : string]: string | number } = FILTER_TYPES;
    const getFilterNames = values.map((value : FilterNamesTypes) => {
      const filterData = filterTypes[value.value] || userFiltered[value.value] || value.value;
      return { key: value.key, type: value.value, value: filterData }
    });
    setFilterNames(getFilterNames);
  }
  const changeCenter = (name: string, coordinates: Array<Array<number>>) => {
    const user = store.getState().profile.userInformation;
    user.polygon = coordinates;
    saveUserInformation(user);
    setArea(name);
  }
  const menu = () => {
    return <Menu className="js-mm-00 sign-menu-organization">
      <Menu.ItemGroup key="g1">
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
      </Menu.ItemGroup>
    </Menu>
  };

  const menuSort = (listSort: Array<{name: string, title: string}>) => {
    return <Menu className="js-mm-00">
      {listSort.map((item : {name: string, title: string}) => (
        <Menu.Item key={item.name}
          onClick={() => {
            if(tabActive === '0') {
              const auxOptions = {...filterProblemOptions};
              auxOptions.column = item.name;
              setFilterProblemOptions(auxOptions);
              getGalleryProblems();
            } else {
              const auxOptions = {...filterProjectOptions};
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
    <div className="count">
      {/* { modalVisible &&
        <DetailedModal
          visible={modalVisible}
          setVisible={setModalVisible}
          data={modalProject} />
      } */}
      <Row className="head-m">
        <Col span={20} id="westminter">
          <Dropdown trigger={['click']} overlay={menu} getPopupContainer={() => document.getElementById("westminter" ) as HTMLElement}>
            <span className="ant-dropdown-link span-header">
              {area} <img src="/Icons/icon-12.svg" alt="" />
            </span>
          </Dropdown>
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
              value={tabActive === '0'? filterProblemOptions.keyword: filterProjectOptions.keyword}
              onChange={(e)=> {
                if(tabActive === '0') {
                  const auxOptions = {...filterProblemOptions};
                  auxOptions.keyword = e.target.value;
                  setFilterProblemOptions(auxOptions);
                } else {
                  const auxOptions = {...filterProjectOptions};
                  auxOptions.keyword = e.target.value;
                  setFilterProjectOptions(auxOptions);
                }
              }}
              onSearch={(e) => {
                if(tabActive === '0') {
                  getGalleryProblems();
                } else {
                  getGalleryProjects();
                }
              }}
              style={{ width: 200 }}
            />
          </Col>
          <Col style={{ textAlign: 'right' }} span={12} id="sort-map">
            <div className="sort-content">
              <Dropdown trigger={['click']}
                overlay={tabActive === '0'?
                  menuSort(SORTED_PROBLEMS):
                  menuSort(SORTED_PROJECTS)}
                getPopupContainer={() => document.getElementById("sort-map" ) as HTMLElement}>
                <span className="ant-dropdown-link" style={{cursor: 'pointer'}}>
                  Sort by {tabActive === '0'? SORTED_PROBLEMS.filter(element => element.name === filterProblemOptions.column)[0]?.title :
                     SORTED_PROJECTS.filter(element => element.name === filterProjectOptions.column)[0]?.title}
                </span>
              </Dropdown>
              <span className="sort-buttons" onClick={() => {
                if(tabActive === '0') {
                  const auxOptions = {...filterProblemOptions};
                  auxOptions.order = filterProblemOptions.order === 'asc' ? 'desc' : 'asc';
                  setFilterProblemOptions(auxOptions);
                  getGalleryProblems();
                } else {
                  const auxOptions = {...filterProjectOptions};
                  auxOptions.order = filterProjectOptions.order === 'asc' ? 'desc' : 'asc';
                  setFilterProjectOptions(auxOptions);
                  getGalleryProjects();
                }
              }}>
                <CaretUpOutlined
                  className="arrow-up"
                  style={{opacity: tabActive === '0'? (filterProblemOptions.order === 'asc' ? '100%':'30%') :
                  (filterProjectOptions.order === 'asc' ? '100%':'30%')}}
                />
                <CaretDownOutlined
                  className="arrow-down"
                  style={{opacity: tabActive === '0'? (filterProblemOptions.order === 'desc' ? '100%':'30%') :
                  (filterProjectOptions.order === 'desc' ? '100%':'30%')}}
                />
              </span>
            </div>

            <Button onClick={handleToggle}>
              <img src="/Icons/icon-73.svg" alt="" /> Filters ({filterNames.length}) {tabActive}
            </Button>
          </Col>
        </Row>
      </div>

      {!toggleFilters ?
        <Tabs onTabClick={(e: string) => {
          if( e === '0') {
            setTabActive('0');
          } else {
            setTabActive('1');
          }
        }} activeKey={tabPosition} onChange={(key) => setTabPosition(key)} className="tabs-map over-00">
          {tabs.map((value : string, index : number) => {
            let totalElements = 0;
            let cardInformation : Array<Object> = [];
            if(value === FILTER_PROBLEMS_TRIGGER) {
              cardInformation = galleryProblems.map(problem => {
                return {
                  image: `gallery/${problem.problemtype}.jpg`,
                  requestName: problem.problemname,
                  jurisdiction: problem.jurisdiction,
                  estimatedCost: problem.solutioncost,
                  field4: 'X',
                  field5: 'Components',
                  priority: problem.problempriority,
                  percentage: problem.solutionstatus,
                  problemid: problem.problemid
                }
              });
              totalElements = cardInformation.length;
            } else {
              cardInformation = galleryProjects.map(project => {
                return {
                  image: project.attachments ? project.attachments : (
                    project.projecttype === 'Capital' ? '/projectImages/capital.png' :
                    project.projecttype === 'Study' ? '/projectImages/study.png' :
                    project.projecttype === 'Maintenance' ?
                      (project.projectsubtype === 'Vegetation Mangement' ? '/projectImages/maintenance_vegetationmanagement.png' :
                      project.projectsubtype === 'Sediment Removal' ? '/projectImages/maintenance_sedimentremoval.png' :
                      project.projectsubtype === 'Restoration' ? '/projectImages/maintenance_restoration.png' :
                      project.projectsubtype === 'Minor Repairs' ? '/projectImages/maintenance_minorrepairs.png' :
                      '/projectImages/maintenance_debrismanagement.png'): '/Icons/eje.png'
                  ),
                  requestName:  project.projectname? project.projectname : project.requestedname,
                  sponsor: project.sponsor,
                  estimatedCost: project.finalcost ? project.finalcost : project.estimatedcost,
                  status: project.status,
                  projecttype: project.projecttype,
                  objectid: project.objectid
                }
              });
              totalElements = cardInformation.length;
            }

            return (
              <TabPane tab={value} key={'' + index}>
                <GenericTabView
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
                      removeFilter={removeFilter} />
              </TabPane>
            );
          })}
        </Tabs>
          :
        <FiltersProjectView
            tabPosition={tabPosition}
            setTabPosition={setTabPosition}
            filterNames={filterNames}
            setToggleFilters={setToggleFilters}
            handleOnSubmit={handleOnSubmit}
            handleReset={handleReset}
            setFilterNames={setFilterNames}
            projectsLength={sortableProjects.length}
            problemsLength={cardInformationProblems.length}
            getDropdownFilters={getDropdownFilters}
            dropdowns={dropdowns}
            userFiltered={userFiltered}
            getUserFilters={getUserFilters} />
      }
    </div>
  </>
}

const layers = {
  polygons: true,
  components: true
}

export default mapFormContainer(MapView, layers);
