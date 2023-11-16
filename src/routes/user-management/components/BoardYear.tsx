import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Select, Table, notification } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import { WINDOW_WIDTH, WORK_PLAN, WORK_REQUEST } from "constants/constants";
import SelectYearsRow from './SelectYearsRow';


const BoardYear = () => {
  const [api, contextHolder] = notification.useNotification();
  const [yearData, setYearData] = useState<any>([]);
  const typesOfYear = {
    MAX: 'MAX',
    DEFAULT: 'DEFAULT',
  }
  
  useEffect(() => {
    datasets.getData(SERVER.GET_ALL_CONFIGURATIONS, datasets.getToken()).then(data => {
      setYearData(data);
    });
  }, []);

  return (
    <div>
      <div style={{position: 'absolute', top: '95px', right: '23px'}} className='img-dowload'>
        <img src='/Icons/ic-dowload.svg' alt='dowload'/>
      </div>
      {contextHolder}
      <Row>
        <Col xs={{ span: 24}} lg={{ span: 24 }} className='col-table-board' style={{paddingLeft: '2px', paddingRight:'2px'}}>
          <div className="list-view-head" style={{paddingTop:'10px', }} >
            <h2 style={{color:'rgb(29, 22, 70)'}}className="title">Board Access</h2>
          </div>
          <div style={{ }} >
            <p className='board-table-year-p' style={{color: '#11093C', opacity:0.6}}>These settings limit which boards are available and set as the default , according to user type. </p>
          </div>
          <br />
          <div className='row-board-year'>
            <Row>
              <Col xs={{ span: 8}} lg={{ span: 8 }}></Col>
              <Col xs={{ span: 4}} lg={{ span: 4 }} className='title-board-year'>MHFD Staff & Admin</Col>
              <Col xs={{ span: 4}} lg={{ span: 4 }} className='title-board-year'>Local Government</Col>
              <Col xs={{ span: 4}} lg={{ span: 4 }} className='title-board-year'>Consultants & Contractors</Col>
              <Col xs={{ span: 4}} lg={{ span: 4 }} className='title-board-year'>Other</Col>
            </Row>    
            <Row className='sub-title-board-year'>
              <Col>
                Board Availability (up to most recent year)
              </Col>
            </Row>
            <SelectYearsRow
              data={yearData}
              type={WORK_REQUEST}
              yearType = {typesOfYear.MAX}
            />
            <SelectYearsRow
              data={yearData}
              type={WORK_PLAN}
              yearType = {typesOfYear.MAX}
            />
            <Row className='sub-title-board-year'>
              <Col>
                Default Settings
              </Col>
            </Row>
            <SelectYearsRow
              data={yearData}
              type={WORK_REQUEST}
              yearType = {typesOfYear.DEFAULT}
            />
            <SelectYearsRow
              data={yearData}
              type={WORK_PLAN}
              yearType = {typesOfYear.DEFAULT}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BoardYear;
