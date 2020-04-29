import React from "react";
import { Row, Col } from "antd";
import moment from 'moment';

export default ({user}: {user: {date: Date, name: String, city: String, change: String}}) => {
    return <><Row className="activity-b" >
        <Col span={5}>{moment(user.date).format('MM/DD/YYYY hh:mm A')}</Col>
        <Col span={5}>{user.name}</Col>
        <Col span={5}>{user.city}</Col>
        <Col span={5}><a href="#">{user.change}</a></Col>
    </Row> </>
}