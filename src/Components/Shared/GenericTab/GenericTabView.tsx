import React, { useState } from "react";
import { Row, Col, Collapse, Tag, Spin } from "antd";
import InfiniteScroll from 'react-infinite-scroll-component';

import CardInformationView from "../CardInformation/CardInformationView";
import AccordionRowView from "./AccordionRow/AccordionRowView";
import AccordionDisplayView from "./AccordionDisplay/AccordionDisplayView";
import { numberWithCommas } from '../../../utils/utils';

const { Panel } = Collapse;

export default ({ getDetailedPageProblem, getDetailedPageProject, filterNames, totalElements, type, listDescription,
        cardInformation, accordionRow, removeFilter, detailed, loaderDetailedPage, setHighlighted, getComponentsByProblemId, filterComponentOptions,
        setFilterComponentOptions, getGalleryProjects, getGalleryProblems}: any) => {
            console.log('tags::::',filterComponentOptions, setFilterComponentOptions);
            
    let totalElement = cardInformation.length;
    const valores = ['dsadsa','drw342','432432']
    const size = 6;
    let sw = false;
    if(totalElement) {
        sw = true;
    }
    const deleteFilter = (tag: string, value: string) => {
        const auxFilterComponents = {...filterComponentOptions};
        const valueTag = filterComponentOptions[tag].split(',') as Array<string>;
        const auxValueTag = [] as Array<string>;
        for (let index = 0; index < valueTag.length; index++) {
            const element = valueTag[index];
            if(element !== value) {
                auxValueTag.push(element);
            }
        }
        let newValue = '';
        for (let index = 0; index < auxValueTag.length; index++) {
            const element = auxValueTag[index];
            if(element !== '') {
                newValue = newValue ? (newValue + ',' + element): element;
            }
        }
        auxFilterComponents[tag] = newValue;
        setFilterComponentOptions(auxFilterComponents);
        getGalleryProjects();
        getGalleryProblems();
    }
    const [state, setState] = useState({
        items: Array.from({ length: size}),
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
        <div className="hastag" style={{minHeight: 34}}>
            <h6> Showing {totalElements} {type}:</h6>
            <div style={{marginBottom: totalElements?0:5}}>
                {/* {valores.map((value: any, index: number) => {
                    return <Tag key={index} closable onClose={() => deleteFilter(index)}>
                        {value}
                    </Tag>
                })} */}
                {tagComponents.map((tag: {key: string, values: Array<string>}, index: number) => {
                    return <>
                        {tag.values.map((element: string) => {
                            let value = '';
                            if(tag.key === 'estimatedcost') {
                                value = element === '0' ? '0 - 2M' : ((element === '2')? '2M - 4M': ((element === '4') ? '4M - 6M' : (element === '6') ? '6M - 8M' :'8M - 10M'));
                            } else {
                                value = element;
                            }
                            return element && <Tag key={index + element + tag.key} closable onClose={() => deleteFilter(tag.key, element )}>
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
                            <Panel header="" key={index} extra={AccordionDisplayView({information, numberWithCommas})}>
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
                                />
                    }) : ''}
                </InfiniteScroll>
            </Row>
        }
    </>
}
