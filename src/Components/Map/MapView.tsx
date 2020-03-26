import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import {  Row, Col, Dropdown, Button, Tabs, Input } from 'antd';

import SortMenuView from "../SortMenu/SortMenuView";
import GenericTabView from "../Shared/GenericTab/GenericTabView";
import mapFormContainer from "../../hoc/mapFormContainer";
import { useFormik } from "formik";
import { string, number } from "yup";
import { filterProjects } from "../../store/actions/mapActions";
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import FiltersProjectView from "../FiltersProject/FiltersProjectView";

import { FILTER_TYPES } from '../../constants/constants';

const ButtonGroup = Button.Group;
const { TabPane } = Tabs;
const { Search } = Input;

const cardInformationProblems: Array<any> = [
  {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: "$400,500",
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: "$400,500",
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: "$400,500",
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: "$400,500",
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: "$400,500",
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: "$400,500",
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }
];

const cardInformationProjects: Array<any> = [
  {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: "$400,500",
    field4: 5, field5: "Components", priority: "Maintenance", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: "$400,500",
    field4: 5, field5: "Components", priority: "Study", percentage: "80%"
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

const MapView = ({ filters, secProjects, getProjectWithFilters } : { filters: any, secProjects: any, getProjectWithFilters : Function}) => {

  const [listDescription, setListDescription] = useState(false);
  const [toggleFilters, setToggleFilters] = useState(false);
  const [filterNames, setFilterNames] = useState<Array<string>>([]);
  const [tabPosition, setTabPosition] = useState('0');

  useEffect(() => {
    getProjectWithFilters();
  }, []);

  useEffect(() => {
    if(filters) setCurrentFilters(filters);
  }, [filters]);

  const handleOnSearch = (data : string) => {
    const requestData = { requestName: '' };
    requestData.requestName = data;
    getProjectWithFilters(data);
  }

  const handleOnSubmit = (filtersData : any) => {
    getProjectWithFilters(filtersData);
  }

  const handleToggle = () => {
    // Force coded cause' components tab doesn't exists on MapView
    if(tabPosition === "2") setTabPosition("0");
    setToggleFilters(!toggleFilters);
  }

  const setCurrentFilters = (filtersData : any) => {
    const values : Array<string> = [];
    for (const key in filtersData) {
      if(Array.isArray(filtersData[key])) {
        filtersData[key].map((value : string) => values.push(value));
      } else {
        values.push(filtersData[key]);
      }
    }
    const filterTypes : any = FILTER_TYPES;
    const getFilterNames = values.map((value : string) => filterTypes[value]);
    setFilterNames(getFilterNames);
  }

  return <>
    <div className="count">
      {/*<Collapse accordion>
        <Panel header="" key="1">*/}
      <Row className="head-m">
        <Col span={12}>
          <Dropdown overlay={SortMenuView}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Westminter, CO <img src="/Icons/icon-12.svg" alt="" />
            </a>
          </Dropdown>
        </Col>
        <Col style={{ textAlign: 'right' }} span={12}>
          <ButtonGroup>
            <Button className="btn-mm" onClick={() => {
              setListDescription(true);
            }}>
              <img className="img-h" src="/Icons/icon-30.svg" alt="" />
              <img className="img-a" src="/Icons/icon-32.svg" alt="" />
            </Button>
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
              onSearch={handleOnSearch}
              style={{ width: 200 }}
            />
          </Col>
          <Col style={{ textAlign: 'right' }} span={8}>
            <Dropdown overlay={SortMenuView}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Sort by Cost <img src="Icons/icon-14.svg" alt="" />
              </a>
            </Dropdown>
            <Button onClick={handleToggle}>
              <img src="Icons/icon-29.svg" alt="" /> Filters ({filterNames.length})
            </Button>
          </Col>
        </Row>
      </div>

      {!toggleFilters ? 
        <Tabs activeKey={tabPosition} onChange={(key) => setTabPosition(key)} className="tabs-map">
          <TabPane tab="Problems" key="0">
            <GenericTabView 
                  filterNames={filterNames}
                  setFilterNames={setFilterNames}
                  listDescription={listDescription} 
                  type="Problems" 
                  totalElements={cardInformationProblems.length} 
                  cardInformation={cardInformationProblems} 
                  accordionRow={accordionRow} />
          </TabPane>

          <TabPane tab="Projects" key="1">
            <GenericTabView 
                  filterNames={filterNames}
                  setFilterNames={setFilterNames}
                  listDescription={listDescription} 
                  type="Projects" 
                  totalElements={secProjects?secProjects.length:0}
                  cardInformation={secProjects?secProjects:[]} 
                  accordionRow={accordionRow} 
                  listFilters={filters} />
          </TabPane>
        </Tabs> 
          :
        <FiltersProjectView 
            tabPosition={tabPosition}
            setTabPosition={setTabPosition}
            filterNames={filterNames} 
            setToggleFilters={setToggleFilters}
            handleOnSubmit={handleOnSubmit}
            setFilterNames={setFilterNames} />
      }
    </div>
  </>
}

const layers = {
  polygons: true,
  components: true
}

export default mapFormContainer(MapView, layers);
