import React, { useState } from 'react'
import { Row, Col } from 'antd';
import { Redirect } from 'react-router-dom';

export default ({ requestName, handleChange } : { requestName: string, handleChange: any }) => {
    const [redirect, setRedirect] = useState(false);

    /* !Important Review: Forced Redirect to New Project Types cause history.goBack() wasn't working properly. */
    if(redirect) return <Redirect to='/new-project-types' />

    return (
        <Row className="head-m">
            <Col className="directions01" span={24}>
            <span style={{cursor: 'pointer'}} onClick={() => setRedirect(true)}>Back</span>
            <span><img className="directions-img" src="/Icons/icon-12.svg" alt="" /></span>
            <input 
                id="requestName"
                onChange={handleChange}
                value={requestName}
                spellCheck={false}
                className="directions-page input-span" />
            </Col>
        </Row>
    )
}