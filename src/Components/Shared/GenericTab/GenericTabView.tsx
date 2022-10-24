import React, { useState, useEffect } from "react";
import { Row, Tag } from "antd";
import InfiniteScroll from 'react-infinite-scroll-component';

import CardInformationView from "../CardInformation/CardInformationView";
import { elementCost } from '../../../utils/utils';
import { FILTER_PROBLEMS_TRIGGER } from "../../../constants/constants";
import store from "../../../store";
import { useMapDispatch, useMapState } from "../../../hook/mapHook";
import { useDetailedState } from "../../../hook/detailedHook";

const GenericTabView = ({
    totalElements,
    type,
    cardInformation,
}: any) => {
    const {
      getGalleryProblems, 
      getGalleryProjects,
      setFilterProblemOptions,
      setFilterProjectOptions, 
      setFilterComponentOptions,
      setZoomProjectOrProblem,
    } = useMapDispatch();
    const {
      detailed,
    } = useDetailedState();
    const {
        filterProblemOptions,
        filterProjectOptions,
        filterComponentOptions,
        selectedOnMap,
      } = useMapState();
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
    const tagProjects = [] as any;

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
        <div className="scroll-cards" style={{ height: 'auto', overflowY: 'hidden' }}>
            <div className="hastag" style={{ minHeight: 34 }}>
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
        <Row className="card-map" gutter={[16, 16]} >
            <InfiniteScroll
                dataLength={state.items.length}
                next={fetchMoreData}
                hasMore={state.hasMore}
                height={window.innerHeight - 245}
                className="scroll-infinite-mobile"
                endMessage={''}
                loader={undefined}>
                {sw ? state.items.map((i, index: number) => {
                    return cardInformation[index] && <CardInformationView
                        key={index}
                        data={cardInformation[index]}
                        detailed={detailed} 
                        type={type}
                        selectedOnMap={selectedOnMap}
                        setZoomProjectOrProblem={setZoomProjectOrProblem}
                    />
                }) : ''}
            </InfiniteScroll>
        </Row>
    </div>

    </>
};

export default GenericTabView;
