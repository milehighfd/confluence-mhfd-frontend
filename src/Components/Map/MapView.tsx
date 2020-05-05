import React, { useState, useEffect } from "react";
import { Row, Col, Dropdown, Button, Tabs, Input } from 'antd';

import DropdownMenu from "../Shared/DropdownMenu/DropdownMenu";
import GenericTabView from "../Shared/GenericTab/GenericTabView";
import mapFormContainer from "../../hoc/mapFormContainer";
import FiltersProjectView from "../FiltersProject/FiltersProjectView";

import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, FILTER_TYPES, SORTED_LIST } from '../../constants/constants';
import { FilterTypes, FilterNamesTypes, MapViewTypes } from "../../Classes/MapTypes";
import { secondWordOfCamelCase } from "../../utils/utils";

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
                  dropdowns, userFiltered, getUserFilters, sortProjects } : MapViewTypes) => {

  const [sortBy, setSortBy] = useState({ fieldSort: SORTED_LIST[0], sortType: true });
  const [listDescription, setListDescription] = useState(false);
  const [toggleFilters, setToggleFilters] = useState(false);
  const [filterNames, setFilterNames] = useState<Array<any>>([]);
  const [tabPosition, setTabPosition] = useState('0');
  const [sortableProjects, setSortableProjects] = useState(projects);
  const [orderProjects, setOrderProjects] = useState(false);

  useEffect(() => {
    if (filters) {
      setCurrentFilters(filters);
    }
  }, [filters]);

  useEffect(() => {
    setSortableProjects(projects);
  }, [projects]);

  const handleOnSearch = (data : string) => {
    const requestData = { requestName: '' };
    requestData.requestName = data;
    getProjectWithFilters(requestData);
  }

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

  const toggleProjectsOrder = () => {
    const cloneProjects = [...sortableProjects];
    setOrderProjects(!orderProjects);
    setSortableProjects(cloneProjects.reverse());
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

  return <>
    <div className="count">
      {/*<Collapse accordion>
        <Panel header="" key="1">*/}
      <Row className="head-m">
        <Col span={12} id="westminter">
          <Dropdown trigger={['click']} overlay={DropdownMenu(SORTED_LIST, setSortBy)} getPopupContainer={() => document.getElementById("westminter" ) as HTMLElement}>
            <span className="ant-dropdown-link span-header">
              Westminter, CO <img src="/Icons/icon-12.svg" alt="" />
            </span>
          </Dropdown>
        </Col>
        <Col style={{ textAlign: 'right' }} span={12}>
          <ButtonGroup>
            {/* <Button className="btn-mm" onClick={() => {
              setListDescription(true);
            }}>
              <img className="img-h" src="/Icons/icon-30.svg" alt="" />
              <img className="img-a" src="/Icons/icon-32.svg" alt="" />
            </Button> */}
            <Button onClick={() => {
              setListDescription(false);
            }}>
              <img className="img-h" src="/Icons/icon-31.svg" alt="" />
              <img className="img-a" src="/Icons/icon-33.svg" alt="" />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      <div className="head-filter">
        <Row type="flex" justify="space-around" align="middle">
          <Col span={16}>
            <Search
              placeholder="Search..."
              onChange={(e) => handleOnSearch(e.target.value)}
              // onSearch={handleOnSearch}
              style={{ width: 200 }}
            />
          </Col>
          <Col style={{ textAlign: 'right' }} span={8} id="sort-map">
            <div className="sort-content">
              <Dropdown trigger={['click']} overlay={DropdownMenu(SORTED_LIST, setSortBy)} getPopupContainer={() => document.getElementById("sort-map" ) as HTMLElement}>
                <span className="ant-dropdown-link" style={{cursor: 'pointer'}}>
                  Sort by {secondWordOfCamelCase(sortBy.fieldSort)}
                </span>
              </Dropdown>
              <span className="sort-buttons" onClick={() => toggleProjectsOrder()}>
                {orderProjects ? 
                  <img src="/Icons/icon-70.svg" alt="" />
                    :
                  <img src="/Icons/icon-69.svg" alt="" />
                }
              </span>
            </div>

            <Button onClick={handleToggle}>
              <img src="/Icons/icon-29.svg" alt="" /> Filters ({filterNames.length})
            </Button>
          </Col>
        </Row>
      </div>

      {!toggleFilters ?
        <Tabs activeKey={tabPosition} onChange={(key) => setTabPosition(key)} className="tabs-map">
          {tabs.map((value : string, index : number) => {
            let totalElements = 0;
            let cardInformation : Array<Object> = [];

            if(value === FILTER_PROBLEMS_TRIGGER) {
              totalElements = cardInformationProblems.length;
              cardInformation = cardInformationProblems;
            } else if (sortableProjects) {
              totalElements = sortableProjects.length;
              cardInformation = sortableProjects;
            }

            return (
              <TabPane tab={value} key={'' + index}>
                <GenericTabView
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
