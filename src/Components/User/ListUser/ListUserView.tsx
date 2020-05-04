import React from "react";
import { Row, Col } from "antd";
import moment from 'moment';

export default ({user}: {user: {firstName: string, lastName: String, registerDate: String, _id: String, city: string, change: string}}) => {
    return <><Row className="activity-b" >
        <Col span={5}>{moment(new Date('' + user.registerDate)).format('MM/DD/YYYY hh:mm A')}</Col>
        <Col span={5}>{user.firstName + ' ' + user.lastName}</Col>
        <Col span={5}>{user.city ? user.city : ''}</Col>
        <Col span={5}><span className="user-Login"> {user.change ? user.change : ''} </span></Col>
    </Row> </>
}