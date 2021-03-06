import React, { useState, useEffect } from "react";
import { Icon, Row, Col, Dropdown, Button, Tabs, Input, Menu, Popover, Checkbox, AutoComplete } from 'antd';

import GenericTabView from "../Shared/GenericTab/GenericTabView";
import mapFormContainer from "../../hoc/mapFormContainer";
import FiltersProjectView from "../FiltersProject/FiltersProjectView";

import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, FILTER_TYPES, SORTED_PROBLEMS, SORTED_PROJECTS, PROBLEMS_TRIGGER, PROJECTS_TRIGGER, COMPONENTS_TRIGGER } from '../../constants/constants';
import { FilterTypes, FilterNamesTypes, MapViewTypes } from "../../Classes/MapTypes";
import { useParams, useLocation } from "react-router-dom";
import store from "../../store";
import DetailedModal from "../Shared/Modals/DetailedModal";
import { useMapDispatch, useMapState } from "../../hook/mapHook";
import { capitalLetter, elementCost, getStatus } from '../../utils/utils';
import { useSelector } from "react-redux";
import RheoStatService from '../FiltersProject/NewProblemsFilter/RheoStatService';

const tabs = [FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER];
let contents: any = [];
contents.push((<div className="popoveer-00"><b>Problems:</b> Problems represent areas where values such as public health, safety, and environmental quality are at risk due to potential flooding, erosion, or other identified threats within MHFD’s purview.</div>));
contents.push((<div className="popoveer-00"><b>Projects:</b> Projects are active efforts (i.e. planned and budgeted or funded and underway) to solve the problems identified in the Problems dataset or brought to MHFD by local governments.</div>));

let contentsFilter: any = [];

const content00 = (<div className="popoveer-00"><b>Solution Cost:</b> is the total estimated cost to solve a problem</div>);
const content01 = (<div className="popoveer-00"><b>Priority:</b> is the severity of a problem relative to other problems of the same type.</div>);
const content02 = (<div className="popoveer-00"><b>Element Type:</b> describes the type of improvements needed to solve a Problem.</div>);
const content03 = (<div className="popoveer-00"><b>Status:</b> is the percentage (by cost) of elements required to solve a problem that have been completed.</div>);
const content04 = (<div className="popoveer-00"><b>Source</b> is the document or process through which a Problem was identified.</div>);
const content05 = (<div className="popoveer-00"><b>Total Cost:</b> is the Estimated Cost (for Projects in progress) or Final Cost (for completed Projects).</div>);
const content06 = (<div className="popoveer-00"><b>Project Status:</b> is the current status of the Project. Some statuses are only applicable to certain project types.</div>);
const content07 = (<div className="popoveer-00"><b>Start Year:</b> is the year a Project was initiated. For Projects that have not been initiated, use the "Work Plan Year" filter.</div>);
// const content08 = (<div className="popoveer-00"><b>Completed Year:</b> represents the year a Project was finished (monitoring may still be occurring).</div>);
const content09 = (<div className="popoveer-00"><b>MHFD Dollars Allocated:</b> is the amount of funding that MHFD has budgeted or encumbered for a particular Project. For Capital projects and Master Plans, this is the number that must at least be matched by a local government.</div>);
const content10 = (<div className="popoveer-00"><b>Work Plan Year:</b> is the year that a proposed Project is on the approved MHFD Work Plan.</div>);
const content11 = (<div className="popoveer-00"><b>Problem Type:</b> is the type of Problem that a Project is intended to help solve.</div>);
const content12 = (<div className="popoveer-00"><b>Local Government Manager:</b> is the staff person at a local government responsible for planning or implementation of a Project.</div>);
const content13 = (<div className="popoveer-00"><b>Creator:</b> is the Confluence user who first created a Project in the Confluence database.</div>);
const content14 = (<div className="popoveer-00"><b>Component Type:</b> is a description of the type of Improvement or Data Point that has been identified at a particular location. (The term "Component" refers to a "Component of the Solution to a Problem," in the context of Capital Projects, or to a "Component of a Problem," in the context of Maintenance Projects.)</div>);
const content15 = (<div className="popoveer-00"><b>Component Status:</b> is the status of implementing an improvement. (The term "Component" refers to a "Component of the Solution to a Problem," in the context of Capital Projects, or to a "Component of a Problem," in the context of Maintenance Projects.)</div>);
const content16 = (<div className="popoveer-00"><b>Year of Study:</b> refers to the year of the Study in which the Component was first identified or proposed.</div>);
const content17 = (<div className="popoveer-00"><b>Estimated Cost:</b> is the Estimated Cost of implementing or addressing a Component as part of a Capital or Maintenance project.</div>);
// const content18 = (<div className="popoveer-00"><b>Stream Name:</b> is the name of the Major Drainageway or Watershed where the Component is located.</div>);

/* line to remove useEffect dependencies warning */
/* eslint-disable react-hooks/exhaustive-deps */

const mhfdCoords = '-105.23496707999973,39.5294420336657,-104.47458099999955,39.99857524427594'

const ButtonGroup = Button.Group;
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = AutoComplete;
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
  const { setToggleModalFilter, getParamFilterProblems, getParamFilterProjects, getParamFilterComponents,
    setTabCards, setOpacityLayer, //setLabelFilterProjects, //setLabelFilterProblems
    setCoordinatesJurisdiction, setNameZoomArea, setSpinMapLoaded, setAutocomplete, setBBOXComponents } = useMapDispatch();
  const { tabCards, nameZoomArea, labelsFiltersProjects, labelsFiltersProblems, labelsFiltersComponents, spinCardProblems, spinCardProjects, boundsMap, toggleModalFilter, filterTabNumber, tutorialStatus } = useMapState();

  const [countFilterProblems, setCountFilterProblems] = useState(0);
  const [countFilterComponents, setCountFilterComponents] = useState(0);
  const [countFilterProjects, setCountFilterProjects] = useState(0);

  const [valueA, setvalueA] = useState('');

  useEffect(() => {
    setvalueA(nameZoomArea);
  }, [nameZoomArea]);
  /* const logued = localStorage.getItem('mfx-token')
    const logued2 = store.getState().profile.userInformation.designation
    console.log('logued', logued, logued2)
    var sw = 0
    if(!logued && sw == 0){
      const redirectGuest = () => {
        console.log('redirect app');
        datasets.getData(SERVER.GUEST).then(async res => {
          if (res?.token) {
            localStorage.setItem('mfx-token', res.token);
            await datasets.getData(SERVER.ME, datasets.getToken()).then(async result => {
              console.log('resultadox', result)
              replaceAppUser(result);
              saveUserInformation(result)
            });
            //setRedirect(true);
          } else {
            //const auxMessage = {...message};
            //auxMessage.message = 'Could not connect, check your email and password';
            // auxMessage.color = 'red';
            //setMessage(auxMessage);
          }
        })
      }
      sw = 1
      redirectGuest();
    } */

  useEffect(() => {
    setSpinMapLoaded(true);
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
      options.status = 'Initiated,Preliminary Design,Construction,Final Design,Hydrology,Floodplain,Alternatives,Conceptual';
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
          {/* {element.popover ? <div className="head">{element.display} <Popover content={content + element.popover}><img src="/Icons/icon-19.svg" width="13px" alt="" /></Popover></div> : */}
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
    //console.log('', paramProblems);
    const filterProblems = { ...filterProblemOptions } as any;
    //console.log('FILTER PROBLEMS', labelsFiltersProblems);
    //let countTagProblems = 0;
    const labelsProblems = [...labelsFiltersProblems];
    for (const key in filterProblemOptions) {
      const tag = key === 'cost' ? filterProblems[key] : filterProblems[key].split(',');
      if (key !== 'keyword' && key !== 'column' && key !== 'order') {
        const elements = [];
        const position = labelsProblems.findIndex((x: any) => x.name === key);
        for (let index = 0; index < tag.length; index++) {
          const element = tag[index];
          if (element) {
            //countTagProblems += 1;
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
    //setLabelFilterProblems(labelsProblems)
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
    let labelsProjects = [] as any;
    labelsProjects = [...labelsFiltersProjects];
    //console.log('LABEL',labelsProjects);
    for (const key in filterProjectOptions) {
      let c = 0;
      const tag = (key === 'mhfddollarsallocated' || key === 'totalcost') ? filterProjects[key] : filterProjects[key].split(',');
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
          {/* {element.popover ? <div className="head">{element.display} <Popover content={content + element.popover}><img src="/Icons/icon-19.svg" width="13px" alt="" /></Popover></div> : */}
          <div className="head">{element.display} &nbsp;<img src="/Icons/icon-19.svg" width="13px" alt="" /></div>
          {element.detail.map((filter: any) => {
            return <p>{filter.display} <Button className="btn-transparent"
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
        //const position = labelsProblems.findIndex((x: any) => x.name === key);
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
  // const [listDescription, setListDescription] = useState(false);
  const listDescription = false;
  const [designation, SetDesignation] = useState(store.getState().profile.userInformation.designation);
  // const [area, setArea] = useState(store.getState().profile.userInformation.zoomarea)
  const [tabActive, setTabActive] = useState('1');
  const { projectId } = useParams();
  const [keywordProblem, setKeywordProblem] = useState(filterProblemOptions.keyword ? filterProblemOptions.keyword : '');
  const [keywordProject, setKeywordProject] = useState(filterProjectOptions.keyword ? filterProjectOptions.keyword : '');
  const [visible, setVisible] = useState(useLocation().search ? true : false);
  const [counterComponents, setCounterComponents] = useState(0);
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

  if (nameZoomArea.length === 0) {
    setNameZoomArea(store.getState().profile.userInformation.zoomarea);
  }

  const deleteTagProblem = (tag: string, value: string) => { }

  useEffect(() => {
    setNameZoomArea(store.getState().profile.userInformation.zoomarea);
  }, [store.getState().profile.userInformation.zoomarea])

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
    setNameZoomArea(store.getState().profile.userInformation.zoomarea); // add for the dropdown
  }, []);

  useEffect(() => {
    if (filters) {
      setCurrentFilters(filters);
    }
    if (designation === 'guest') {
      setApplyFilter(false);
    }
  }, [filters]);

  useEffect(() => {
    let counter = galleryProblems.reduce((prev: any, next: any) => prev + next.totalComponents, 0);
    counter += galleryProjects.reduce((prev: any, next: any) => prev + next.totalComponents, 0);
    setCounterComponents(counter);
  })

 /* const handleOnSubmit = (filtersData: FilterTypes) => {
    getProjectWithFilters(filtersData);
  }

  const handleReset = () => {
    getProjectWithFilters([]);
  } */

  const handleToggle = () => {
    // Force coded cause' components tab doesn't exists on MapView

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
  //TODO remove unused code once filters are defined
  const changeCenter = (name: string, coordinates: any, shouldLoadFilters = true) => {
    const user = store.getState().profile.userInformation;
    user.polygon = coordinates;
    saveUserInformation(user);
    //setArea(name);
    setNameZoomArea(name);
    const zoomareaSelected = groupOrganization.filter((x: any) => x.aoi === name).map((element: any) => {
      return {
        aoi: element.aoi,
        filter: element.filter,
        coordinates: element.coordinates
      }
    });
    // let boundsToMap = boundsMap;
    if (zoomareaSelected.length > 0) {
    //   let cords = zoomareaSelected[0].coordinates[0][0];
    //   let minLng = cords[0][0], minLat = cords[0][1];
    //   let maxLng = cords[0][0], maxLat = cords[0][1];
    //   cords.forEach((c: any) => {
    //     let [lng, lat] = c;
    //     minLng = Math.min(minLng, lng); minLat = Math.min(minLat, lat);
    //     maxLng = Math.max(maxLng, lng); maxLat = Math.max(maxLat, lat);
    //   })
    //   boundsToMap = [minLng, minLat, maxLng, maxLat].join(',');
      const optionsProblem = { ...filterProblemOptions };
      const optionsProject = { ...filterProjectOptions };
      const optionsComponent = { ...filterComponentOptions };
      //console.log('coordinates', zoomareaSelected[0].coordinates);
      switch (zoomareaSelected[0].filter) {
        case 'County':
          // optionsProblem['county'] = name;
          // optionsProject['county'] = name;
          // optionsComponent['county'] = name;
          // optionsProblem['jurisdiction'] = '';
          // optionsProject['jurisdiction'] = '';
          // optionsComponent['jurisdiction'] = '';
          // optionsProblem['servicearea'] = '';
          // optionsProject['servicearea'] = '';
          // optionsComponent['servicearea'] = '';
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
          break;
        case 'Jurisdiction':
          // optionsProblem['jurisdiction'] = name;
          // optionsProject['jurisdiction'] = name;
          // optionsComponent['jurisdiction'] = name;
          // optionsProblem['county'] = '';
          // optionsProject['county'] = '';
          // optionsComponent['county'] = '';
          // optionsProblem['servicearea'] = '';
          // optionsProject['servicearea'] = '';
          // optionsComponent['servicearea'] = '';
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
          break;
        case 'Service Area':
          // optionsProblem['servicearea'] = name;
          // optionsProject['servicearea'] = name;
          // optionsComponent['servicearea'] = name;
          // optionsProblem['county'] = '';
          // optionsProject['county'] = '';
          // optionsComponent['county'] = '';
          // optionsProblem['jurisdiction'] = '';
          // optionsProject['jurisdiction'] = '';
          // optionsComponent['jurisdiction'] = '';
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
          break;
        default:
          // optionsProblem['servicearea'] = '';
          // optionsProject['servicearea'] = '';
          // optionsComponent['servicearea'] = '';
          // optionsProblem['county'] = '';
          // optionsProject['county'] = '';
          // optionsComponent['county'] = '';
          // optionsProblem['jurisdiction'] = '';
          // optionsProject['jurisdiction'] = '';
          // optionsComponent['jurisdiction'] = '';
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
      }
     // setFilterProblemOptions(optionsProblem);
     // setFilterProjectOptions(optionsProject);
     // setFilterComponentOptions(optionsComponent);
      // if (name === 'Mile High Flood District') {
      //   boundsToMap = mhfdCoords;
      // }
      // if (shouldLoadFilters) {
      //   getParamFilterProblems(boundsToMap, optionsProblem);
      //   getParamFilterProjects(boundsToMap, optionsProject);
      //   getParamFilterComponents(boundsToMap, optionsComponent);
      // }
    }
  }

  const dataAutocomplete = groupOrganization.filter(function (item: any) {
    if (item.aoi === undefined) {
      return false;
    }
    return true;
  }).map((item: { aoi: string }) => { return <Option className="list-line" key={item.aoi}>{item.aoi}</Option> });

  const onSelect = (value: any) => {
    console.log('Selected:', value);
    setAutocomplete(value);
    setvalueA(value);
    const zoomareaSelected = groupOrganization.filter((x: any) => x.aoi === value).map((element: any) => {
      return {
        aoi: element.aoi,
        filter: element.filter,
        coordinates: element.coordinates
      }
    });
    changeCenter(value, zoomareaSelected[0].coordinates)
    setBBOXComponents({ bbox: [], centroids: [] })
  };

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
  const { autcomplete, spinMapLoaded } = useSelector((state: any) => ({
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
    <Row type="flex" justify="space-around" align="middle" style={{ cursor: 'pointer' }}>
      <Col>
        <div className={(spinFilter || spinCardProblems || spinCardProjects ||spinMapLoaded ) ? "apply-filter" : 'apply-filter-no-effect'}>
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
    // let value = 'Mile High Flood District';
    // setvalueA(value);
    // setAutocomplete(value);
    // const zoomareaSelected = groupOrganization.filter((x: any) => x.aoi === value).map((element: any) => {
    //   return {
    //     aoi: element.aoi,
    //     filter: element.filter,
    //     coordinates: element.coordinates
    //   }
    // });
    // changeCenter(value, zoomareaSelected[0].coordinates, false)
    // let boundsToMap = mhfdCoords;
    if (toggleModalFilter) {
      switch(filterTabNumber) {
        case PROBLEMS_TRIGGER:
            resetFilterProblems();//boundsToMap
            break;
        case PROJECTS_TRIGGER:
            resetFilterProjects(true);//boundsToMap
            break;
        case COMPONENTS_TRIGGER:
            resetFilterComponents();//boundsToMap
            break;
      }
    } else {
      switch(tabCards) {
        case PROBLEMS_TRIGGER:
            resetFilterProblems();//boundsToMap
            break;
        case PROJECTS_TRIGGER:
            resetFilterProjects(true);//boundsToMap
            break;
      }
    }
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
  let filterLabel = `Filters (${filterCounter})`;

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
      <Row className="head-m mobile-display">
        <Col span={20} id="westminter">
          { /*<Dropdown trigger={['click']} overlay={menu} getPopupContainer={() => document.getElementById("westminter") as HTMLElement}>
            <span className="ant-dropdown-link span-header">
              {nameZoomArea ? (nameZoomArea.endsWith(', CO') ? nameZoomArea.replace(', CO', '') : nameZoomArea) : 'Mile High Flood District'}
              <Popover content={content}>
                <img src="/Icons/icon-12.svg" alt="" style={{ marginLeft: '8px' }} />
              </Popover>
            </span>
      </Dropdown> */}
          <div className="auto-complete-map">
            <AutoComplete
              style={{ width: '200' }}
              dataSource={dataAutocomplete}
              placeholder={nameZoomArea ? (nameZoomArea.endsWith(', CO') ? nameZoomArea.replace(', CO', '') : nameZoomArea) : 'Mile High Flood District'}
              filterOption={(inputValue, option: any) => {
                if (dataAutocomplete.map(r => r.key).includes(inputValue)) {
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

              <Input id={'miclase'} suffix={<Icon type="down" className="certain-category-icon" />} />
            </AutoComplete>
            {/* </Popover> */}
          </div>
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
            {/* <Button className="btn-mm" onClick={() Arvada=> {
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

      <div className="head-filter mobile-display">
        <Row type="flex" justify="space-around" align="middle">
          <Col span={11}>
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
          <Col style={{ textAlign: 'right' }} span={13} id="sort-map">
            <Button className="btn-red" onClick={onResetClick}><u>Reset</u></Button>
            <Popover placement="bottomRight" overlayClassName="tag-filters" content={getFiltersPopoverContent()}>
              <Button onClick={handleToggle} >
                <img style={{ background: backgroundStyle }} className="img-filter" alt="" />
                <span style={{ color: textStyle }}> {filterLabel} </span>
              </Button>
            </Popover>
            <div className="sort-content">
              <span className="sort-buttons" style={{ transitionTimingFunction: 'ease-in' }} onClick={sortClick}>
                {filterProjectOptions.order === 'asc' ? <img className="img-filter00" alt="" style={{ WebkitMask: "url('/Icons/icon-83.svg') no-repeat center" }} /> : <img className="img-filter00" alt="" style={{ WebkitMask: "url('/Icons/icon-86.svg') no-repeat center" }} />}

              </span>
              <Dropdown trigger={['hover']}
                overlay={tabActive === '0' ?
                  menuSort(SORTED_PROBLEMS) :
                  menuSort(SORTED_PROJECTS)}
                getPopupContainer={() => document.getElementById("sort-map") as HTMLElement}>
                <span className="ant-dropdown-link" style={{ cursor: 'pointer' }} onClick={sortClick}>
                  {/*<img className="img-filter00" alt="" /> Sort by {tabActive === '0' ? SORTED_PROBLEMS.filter(element => element.name === filterProblemOptions.column)[0]?.title :*/}
                  Sort by {tabActive === '0' ? SORTED_PROBLEMS.filter(element => element.name === filterProblemOptions.column)[0]?.title :
                    SORTED_PROJECTS.filter(element => element.name === filterProjectOptions.column)[0]?.title}
                </span>
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
          tabActive={tabActive}
          tabPosition={tabPosition}
          setTabPosition={setTabPosition}
          componentsTotal={counterComponents}
          filterNames={filterNames}
          setToggleFilters={setToggleFilters}
          /* handleOnSubmit={handleOnSubmit}
          handleReset={handleReset} */
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
