import * as React from "react";
import { useState } from "react";
import { Tabs, Row, Col, Collapse, Tag } from "antd";
import CardInformationView from "../CardInformation/CardInformationView";
import AccordionRowView from "../AccordionRow/AccordionRowView";
import AccordionDisplayView from "../AccordionDisplay/AccordionDisplayView";

const { TabPane } = Tabs;
const { Panel } = Collapse;

export default (props: any) => {
    const [tags, setTags] = useState([
        "$600K - $1.2M",
        "Active",
        "Stream Restoration",
        "Maintenance",
        "Westminster",
        "Components"
    ]);

    const deleteTag = (index: Number) => {
        const newTags = tags.filter((element: String, indexE: Number) => indexE !== index);
        setTags(newTags);
    }
    return <>
        <div className="hastag">
            <h6> Showing {props.totalElements} {props.type}:</h6>
            <div>
                {tags.map((data: String, index: Number) => {
                    return <Tag closable onClose={() => deleteTag(index)}>
                        {data}
                    </Tag>
                })}
            </div>
        </div>
        <Row className="card-map" gutter={[16, 16]}>
            {props.cardInformation.map((data: any) => {
                return <CardInformationView data={data} type={props.type} />
            })}
        </Row>
        {/*LIST*/}
        <Row className="list-h">
            <Col span={9}>Problem & Component Name</Col>
            <Col span={5}>Jurisdiction</Col>
            <Col span={4}>Solution Cost</Col>
            <Col span={6}> Solution Status</Col>
        </Row>
        <Collapse accordion>
            <Panel header="" key="1" extra={AccordionDisplayView()}>
                {props.accordionRow.map((data: any) => {
                    return <AccordionRowView data={data} />
                })}
            </Panel>
        </Collapse>
    </>
}