import React, { useEffect, useState } from 'react';
import { Col, Row, Select, notification } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import { WINDOW_WIDTH } from "constants/constants";
import { useRequestDispatch } from 'hook/requestHook';
import { useNotifications } from 'Components/Shared/Notifications/NotificationsProvider';


const BoardYear = () => {
  const [api, contextHolder] = notification.useNotification();
  const [openDropYear, setOpenDropYear] = useState(false);
  const [yearEdit, setYearEdit] = useState('2024');
  const { openNotification } = useNotifications();
  const {
    setYear,
  } = useRequestDispatch();

  useEffect(() => {
    datasets.getData(SERVER.GET_CONFIGURATIONS('BOARD_YEAR'))
      .then((response: any) => {
        setYearEdit(response.value);
      }).catch((error: any) => {
        console.error(error);
      });
  }, []);

  const changeConfigurationYear = (value: string) => {
    setYearEdit(value);
    datasets.putData(SERVER.GET_CONFIGURATIONS('BOARD_YEAR'), { value })
      .then((response: any) => {
        setYear(value);
        openNotification('Success! The board year has been updated.', "success");
        console.log(response);
      }).catch((error: any) => {
        console.error(error);
      });
  };

  return (
    <div>
      {contextHolder}
      <Row>
        <Col xs={{ span: 9}} lg={{ span: 5 }}>
          <div className="list-view-head" style={{paddingTop:'10px', paddingLeft:'15px'}} >
            <h2 style={{color:'rgb(29, 22, 70)'}}className="title">Board Year</h2>
          </div>
        </Col>
      </Row>
      <div className="table-user-management" style={{paddingLeft:'15px'}}>
        <span style={{color: 'rgb(17, 9, 60)', paddingRight: '10px'}}>Most recent board year:</span>
        <Select
          placeholder="2022"
          value={yearEdit}
          listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
          suffixIcon={openDropYear? <UpOutlined /> :< DownOutlined />}
          onClick={()=>(setOpenDropYear(!openDropYear))}
          onChange={(e) => {changeConfigurationYear(e)}}
        >
          <Select.Option key={'2022'} value={'2022'}>2022</Select.Option>
          <Select.Option key={'2023'} value={'2023'}>2023</Select.Option>
          <Select.Option key={'2024'} value={'2024'}>2024</Select.Option>
          <Select.Option key={'2025'} value={'2025'}>2025</Select.Option>
        </Select>
      </div>
    </div>
  );
};

export default BoardYear;
