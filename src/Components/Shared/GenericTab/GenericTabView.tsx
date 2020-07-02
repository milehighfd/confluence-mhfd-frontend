import React, { useState } from "react";
import { Row, Col, Collapse, Tag, Spin } from "antd";
import InfiniteScroll from 'react-infinite-scroll-component';

import CardInformationView from "../CardInformation/CardInformationView";
import AccordionRowView from "./AccordionRow/AccordionRowView";
import AccordionDisplayView from "./AccordionDisplay/AccordionDisplayView";
import { numberWithCommas } from '../../../utils/utils';
import { FILTER_PROBLEMS_TRIGGER } from "../../../constants/constants";

const { Panel } = Collapse;

export default ({ getDetailedPageProblem, getDetailedPageProject, filterNames, totalElements, type, listDescription,
    cardInformation, accordionRow, removeFilter, detailed, loaderDetailedPage, setHighlighted, getComponentsByProblemId,
    filterComponentOptions, setFilterComponentOptions, getGalleryProjects, getGalleryProblems, filterProblemOptions,
    filterProjectOptions, setFilterProblemOptions, setFilterProjectOptions, componentsOfProblems }: any) => {
    let totalElement = cardInformation.length;
    const size = 6;
    let sw = false;
    if (totalElement) {
        sw = true;
    }
    const deleteFilter = (tag: string, value: string) => {
        const auxFilterComponents = { ...filterComponentOptions };
        const valueTag = filterComponentOptions[tag].split(',') as Array<string>;
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
        auxFilterComponents[tag] = newValue;
        setFilterComponentOptions(auxFilterComponents);
        getGalleryProjects();
        getGalleryProblems();
    }
    const deleteTagProblem = (tag: string, value: string) => {
        const auxFilterProblems = { ...filterProblemOptions };
        const valueTag = filterProblemOptions[tag].split(',') as Array<string>;
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
        auxFilterProblems[tag] = newValue;
        setFilterProblemOptions(auxFilterProblems);
        getGalleryProblems();
    }
    const deleteTagProject = (tag: string, value: string) => {
        const auxFilterProjects = { ...filterProjectOptions };
        const valueTag = filterProjectOptions[tag].split(',') as Array<string>;
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
        auxFilterProjects[tag] = newValue;
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
            values: filterComponentOptions[key].split(',')
        }
        tagComponents.push(tag);
    }

    const tagProblems = [] as any;
    for (const key in filterProblemOptions) {
        const tag = {
            key,
            values: filterProblemOptions[key].split(',')
        }
        if (key !== 'keyword' && key !== 'column' && key !== 'order') {
            tagProblems.push(tag);
        }
    }

    const tagProjects = [] as any;
    for (const key in filterProjectOptions) {
        const tag = {
            key,
            values: filterProjectOptions[key].split(',')
        }
        if (key !== 'keyword' && key !== 'column' && key !== 'order') {
            tagProjects.push(tag);
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
    return <>
        <div className="hastag" style={{ minHeight: 34 }}>
            <h6> Showing {totalElements} {type}:</h6>
            <div style={{ marginBottom: totalElements ? 0 : 5 }}>
                {type === FILTER_PROBLEMS_TRIGGER ? tagProblems.map((tag: { key: string, values: Array<string> }, index: number) => {
                    return <>
                        {tag.values.map((element: string) => {
                            let value = '';
                            if (tag.key === 'cost') {
                                value = element === '1' ? '1M - 10M' : ((element === '5')? '5M - 10M': ((element === '10') ? '10M - 15M' : '20 - 25M'));
                            } else {
                                if (tag.key === 'solutionstatus') {
                                    value = element === '10' ? '10% - 25%' : element === '25'? '25% - 50%': element === '50' ? '50% - 75%' : '75% - 100%';
                                } else {
                                    value = element;
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
                            if (tag.key === 'totalcost') {
                                value = element === '0' ? '0 - 5M' : ((element === '5')? '5M- 1M': ((element === '10') ? '1M - 15M' : (element === '15') ? '15M - 20M' :'20M - 25M'));
                            } else {
                                if (tag.key === 'mhfddollarsallocated') {
                                    value = element === '1' ? '1M - 5M' : ((element === '5')? '5M - 10M': ((element === '10') ? '10M - 15M' : (element === '15') ? '15M - 20M' :'20M - 25M'));
                                } else {
                                    value = element;
                                }
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
                                value = element === '0' ? '0 - 2M' : ((element === '2') ? '2M - 4M' : ((element === '4') ? '4M - 6M' : (element === '6') ? '6M - 8M' : '8M - 10M'));
                            } else {
                                value = element;
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
                    height={window.innerHeight - 260}
                    endMessage={''}>
                    {sw ? state.items.map((i, index: number) => {
                        return cardInformation[index] && <CardInformationView key={index} data={cardInformation[index]} type={type}
                            getDetailedPageProblem={getDetailedPageProblem}
                            getDetailedPageProject={getDetailedPageProject}
                            detailed={detailed}
                            loaderDetailedPage={loaderDetailedPage}
                            setHighlighted={setHighlighted}
                            getComponentsByProblemId={getComponentsByProblemId}
                            componentsOfProblems={componentsOfProblems}
                        />
                    }) : ''}
                </InfiniteScroll>
            </Row>
        }
    </>
}
