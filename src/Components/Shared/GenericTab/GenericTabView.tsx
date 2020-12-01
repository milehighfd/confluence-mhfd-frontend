import React, { useState, useEffect } from "react";
import { Row, Col, Collapse, Tag } from "antd";
import InfiniteScroll from 'react-infinite-scroll-component';

import CardInformationView from "../CardInformation/CardInformationView";
import AccordionRowView from "./AccordionRow/AccordionRowView";
import AccordionDisplayView from "./AccordionDisplay/AccordionDisplayView";
import { numberWithCommas, elementCost } from '../../../utils/utils';
import { FILTER_PROBLEMS_TRIGGER } from "../../../constants/constants";
import store from "../../../store";

const { Panel } = Collapse;

export default ({ getDetailedPageProblem, getDetailedPageProject, filterNames, totalElements, type, setType, listDescription,
    cardInformation, accordionRow, removeFilter, detailed, loaderDetailedPage, setHighlighted, getComponentsByProblemId,
    filterComponentOptions, setFilterComponentOptions, getGalleryProjects, getGalleryProblems, filterProblemOptions,
    filterProjectOptions, setFilterProblemOptions, setFilterProjectOptions, componentsOfProblems, loaderTableCompoents, selectedOnMap, componentCounter,
    getComponentCounter, setZoomProjectOrProblem }: any) => {
    let totalElement = cardInformation.length;
    const size = 6;
    let sw = false;
    if (totalElement) {
        sw = true;
    }
    const params = store.getState().map.paramFilters;

    const deleteFilter = (tag: string, value: string) => {
        const auxFilterComponents = { ...filterComponentOptions };
        const valueTag = tag === 'estimatedcost' ? filterComponentOptions[tag] : filterComponentOptions[tag].split(',');
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
        auxFilterComponents[tag] = tag === 'estimatedcost' ? auxValueTag : newValue;
        setFilterComponentOptions(auxFilterComponents);
        getGalleryProjects();
        getGalleryProblems();
    }
    const deleteTagProblem = (tag: string, value: string) => {
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
    }
    const deleteTagProject = (tag: string, value: string) => {
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
    }
    const [state, setState] = useState({
        items: Array.from({ length: size }),
        hasMore: true
    });
    const tagComponents = [] as any;
    for (const key in filterComponentOptions) {
        const tag = {
            key,
            values: key === 'estimatedcost' ? filterComponentOptions[key] : filterComponentOptions[key].split(',')
        }
        tagComponents.push(tag);
    }

    useEffect(() => {
        const auxState = { ...state };
        auxState.hasMore = true;
        setState(auxState);
    }, [totalElement])
    const tagProblems = [] as any;
    for (const key in filterProblemOptions) {
        const tag = {
            key,
            values: key === 'cost' ? filterProblemOptions[key] : filterProblemOptions[key].split(',')
        }
        if (key !== 'keyword' && key !== 'column' && key !== 'order') {
            //tagProblems.push(tag);
        }
    }

    const tagProjects = [] as any;
    for (const key in filterProjectOptions) {
        const tag = {
            key,
            values: (key === 'mhfddollarsallocated' || key === 'totalcost') ? filterProjectOptions[key] : filterProjectOptions[key].split(',')
        }
        if (key !== 'keyword' && key !== 'column' && key !== 'order') {
            //tagProjects.push(tag);
        }
    }

    const fetchMoreData = () => {
        if (state.items.length >= totalElement - size) {
            const auxState = { ...state };
            if (state.items.length !== totalElements) {
                auxState.items = state.items.concat(Array.from({ length: totalElement - state.items.length }));
            }
            auxState.hasMore = false;
            setState(auxState);
            return;
        }
        setTimeout(() => {
            const auxState = { ...state };
            auxState.items = state.items.concat(Array.from({ length: size }));
            setState(auxState);
        }, 500);
    };
    /* console.log('TAG PROBLEMS', tagProblems);
    console.log('TAG PROJECTS', tagProjects); */

    return <>
        <div className="scroll-cards" style={{ height: 'auto', overflowY: 'hidden' }}>
            <div className="hastag" style={{ minHeight: 34 }}>
                {/* <h6> Showing {totalElements} {type}:</h6> */}
                <div style={{ marginBottom: totalElements ? 0 : 5 }}>
                {type === FILTER_PROBLEMS_TRIGGER ? tagProblems.map((tag: { key: string, values: Array<string> }, index: number) => {
                    return <>
                        {tag.values.map((element: string) => {
                            let value = '';
                            if (tag.key === 'cost') {
                                const tagValues = element.split(',');
                                value = elementCost(+tagValues[0], +tagValues[1]);
                            } else {
                                if (tag.key === 'solutionstatus') {
                                    value = element === '10' ? '10% - 25%' : element === '25'? '25% - 50%': element === '50' ? '50% - 75%' : '75% - 100%';
                                } else {
                                    if (tag.key === 'components') {
                                        value = (params.problems?.components?.filter((elementComponent: any) => elementComponent.key === element)[0] as any) ?
                                                params.problems?.components?.filter((elementComponent: any) => elementComponent.key === element)[0].value as any : ''
                                    } else {
                                        value = element;
                                    }
                                }
                            }
                            return element && <Tag key={index + element + tag.key} closable onClose={() => deleteTagProblem(tag.key, element)}>
                                {value}
                            </Tag>
                        })}
                    </>
                }) : tagProjects.map((tag: { key: string, values: Array<string> }, index: number) => {
                    return <>
                        {tag.values.map((element: string) => {
                            let value = '';
                            if (tag.key === 'totalcost' || tag.key === 'mhfddollarsallocated') {
                                const tagValues = element.split(',');
                                value = elementCost(+tagValues[0], +tagValues[1]);
                            } else {
                                value = element;
                            }
                            return element && <Tag key={index + element + tag.key} closable onClose={() => deleteTagProject(tag.key, element)}>
                                {value}
                            </Tag>
                        })}
                    </>
                })}
                {tagComponents.map((tag: { key: string, values: Array<string> }, index: number) => {
                    return <>
                        {tag.values.map((element: string) => {
                            let value = '';
                            if (tag.key === 'estimatedcost') {
                                const tagValues = element.split(',');
                                value = elementCost(+tagValues[0], +tagValues[1]);
                            } else {
                                if (tag.key === 'component_type') {
                                    value = (params.components?.component_type?.filter((elementComponent: any) => elementComponent.key === element)[0] as any) ?
                                            params.components?.component_type?.filter((elementComponent: any) => elementComponent.key === element)[0].value as any : ''
                                } else {
                                    value = element;
                                }
                            }
                            return element && <Tag key={index + element + tag.key} closable onClose={() => deleteFilter(tag.key, element)}>
                                {value}
                            </Tag>
                        })}
                    </>
                })}
            </div>
        </div>
        {listDescription ?
            <>
                <Row className="list-h">
                    <Col span={9}>Problem & Component Name</Col>
                    <Col span={5}>Jurisdiction</Col>
                    <Col span={4}>Solution Cost</Col>
                    <Col span={6}> Solution Status</Col>
                </Row>
                <Collapse accordion>
                    {cardInformation.map((information: any, index: number) => {
                        const components = information.components ? (information.components.length ? information.components : []) : [];
                        return (
                            <Panel header="" key={index} extra={AccordionDisplayView({ information, numberWithCommas })}>
                                {components.map((data: any) => {
                                    return <AccordionRowView key={data.componentName} data={data} numberWithCommas={numberWithCommas} />
                                })}
                            </Panel>
                        );
                    })}

                </Collapse>
            </>
            :
            <Row className="card-map" gutter={[16, 16]}>
                <InfiniteScroll
                    dataLength={state.items.length}
                    next={fetchMoreData}
                    hasMore={state.hasMore}
                    loader={cardInformation.length ? <h4>Loading...</h4> : ''}
                    height={window.innerHeight - 245}
                    endMessage={''}>
                    {sw ? state.items.map((i, index: number) => {
                        return cardInformation[index] && <CardInformationView key={index} data={cardInformation[index]}
                            getDetailedPageProblem={getDetailedPageProblem}
                            getDetailedPageProject={getDetailedPageProject}
                            detailed={detailed} type={type}
                            loaderDetailedPage={loaderDetailedPage}
                            setHighlighted={setHighlighted}
                            getComponentsByProblemId={getComponentsByProblemId}
                            componentsOfProblems={componentsOfProblems}
                            loaderTableCompoents={loaderTableCompoents}
                            selectedOnMap={selectedOnMap}
                            componentCounter={componentCounter}
                            getComponentCounter={getComponentCounter}
                            setZoomProjectOrProblem={setZoomProjectOrProblem}
                        />
                    }) : ''}
                </InfiniteScroll>
            </Row>
        }
    </div>

    </>
}
