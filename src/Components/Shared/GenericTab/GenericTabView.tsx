import React, { useState } from "react";
import { Row, Col, Collapse, Tag } from "antd";
import InfiniteScroll from 'react-infinite-scroll-component';

import CardInformationView from "../CardInformation/CardInformationView";
import AccordionRowView from "./AccordionRow/AccordionRowView";
import AccordionDisplayView from "./AccordionDisplay/AccordionDisplayView";
import { numberWithCommas } from '../../../utils/utils';

const { Panel } = Collapse;

export default ({ getDetailedPageProblem, getDetailedPageProject, filterNames, totalElements, type, listDescription, cardInformation, accordionRow, removeFilter, detailed, loaderDetailedPage }: any) => {
    let totalElement = cardInformation.length;
    const size = 6;
    let sw = false;
    if(totalElement) {
        sw = true;
    }
    const deleteFilter = (index: number) => {
        const item = filterNames[index];
        removeFilter(item);
    }
    const [state, setState] = useState({
        items: Array.from({ length: size }),
        hasMore: true
    });
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
                {filterNames.map((data: any, index: number) => {
                    return <Tag key={index} closable onClose={() => deleteFilter(index)}>
                        {data.value}
                    </Tag>
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
                    loader={<h4>Loading...</h4>}
                    height={window.innerHeight - 260}
                    endMessage={''}>
                    {sw ? state.items.map((i, index: number) => {
                        return <CardInformationView key={index} data={cardInformation[index]} type={type} 
                                getDetailedPageProblem={getDetailedPageProblem}
                                getDetailedPageProject={getDetailedPageProject}
                                detailed={detailed}
                                loaderDetailedPage={loaderDetailedPage}/>
                    }) : ''}
                </InfiniteScroll>

            </Row>
        }
    </>
}
