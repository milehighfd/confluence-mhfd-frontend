import * as React from "react";
import { useState } from "react";
import { Tabs, Row, Col, Collapse, Tag } from "antd";
import CardInformationView from "../CardInformation/CardInformationView";
import AccordionRowView from "./AccordionRow/AccordionRowView";
import AccordionDisplayView from "./AccordionDisplay/AccordionDisplayView";

const { TabPane } = Tabs;
const { Panel } = Collapse;

export default ({ filterNames, setFilterNames, totalElements, type, listDescription, cardInformation, accordionRow, removeFilter }: any) => {

    const deleteFilter = (index: number) => {
        const newFilters = [...filterNames];
        newFilters.splice(index, 1);
        setFilterNames(newFilters);
        removeFilter(index);
    }

    return <>
        <div className="hastag">
            <h6> Showing {totalElements} {type}:</h6>
            <div>
                {filterNames.map((data: String, index: number) => {
                    return <Tag key={index} closable onClose={() => deleteFilter(index)}>
                        {data}
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
                    {cardInformation.map((information: any, index: number) => (
                        <Panel header="" key={index} extra={AccordionDisplayView(information)} >
                            {accordionRow.map((data: any) => {
                                return <AccordionRowView data={data} />
                            })}
                        </Panel>
                    ))}

                </Collapse> 
            </>
            :
            <Row className="card-map" gutter={[16, 16]}>
                {cardInformation.map((data: any, index: number) => {
                    return <CardInformationView key={index} data={data} type={type} />
                })}
            </Row>
        }
    </>
}