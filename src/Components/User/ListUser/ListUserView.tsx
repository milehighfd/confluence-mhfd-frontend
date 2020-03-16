import React from "react";
import { Row, Col } from "antd";

export default (props: {user: {date: String, name: String, city: String, change: String}, key: number}) => {
    return <><Row key={props.key} className="activity-b" >
        <Col span={5}>{props.user.date}</Col>
        <Col span={5}>{props.user.name}</Col>
        <Col span={5}>{props.user.city}</Col>
        <Col span={5}><a href="">{props.user.change}</a></Col>
    </Row> </>
}