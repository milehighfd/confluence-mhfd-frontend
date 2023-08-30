import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Select, notification } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import { WINDOW_WIDTH } from "constants/constants";
import { useRequestDispatch } from 'hook/requestHook';
import { useNotifications } from 'Components/Shared/Notifications/NotificationsProvider';


const BoardYear = () => {
  const [api, contextHolder] = notification.useNotification();
  const [openDropYear, setOpenDropYear] = useState(false);
  const [yearEdit, setYearEdit] = useState('');
  const { openNotification } = useNotifications();
  const {
    setYear,
    setYearList,
  } = useRequestDispatch();
  const [alert, setAlert] = useState({
    show: false,
    type: 'success',
    message: '',
  });

  useEffect(() => {
    datasets.getData(SERVER.GET_CONFIGURATIONS('BOARD_YEAR'))
      .then((response: any) => {
        setYear(response.value);
        setYearEdit(response.value);
      }).catch((error: any) => {
        console.error(error);
      });
  }, []);

  const changeConfigurationYear = (value: string) => {
    setYearEdit(value);
  };

  const onSave = () => {
    datasets.putData(SERVER.GET_CONFIGURATIONS('BOARD_YEAR'), { value: yearEdit })
      .then(() => {
        openNotification(`Success! The board year has been updated to ${yearEdit}.`, "success");
        setYear(yearEdit);
        const yearList = [];
        for (let i = 0; i < 5; i++) {
          yearList.push(+yearEdit - i);
        }
        setYearList(yearList);
      }).catch(() => {
        setAlert({ ...alert, show: true, type: 'error', message: `Error saving year ${yearEdit}.` });
      })
      .finally(() => {
        setTimeout(() => {
          setAlert({ ...alert, message: '', show: false });
        }, 3000);
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
          value={yearEdit}
          listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
          suffixIcon={openDropYear? <UpOutlined /> :< DownOutlined />}
          onClick={()=>(setOpenDropYear(!openDropYear))}
          onChange={(e) => {changeConfigurationYear(e)}}
        >
          <Select.Option key={'no'} disabled value={''}>Select a year</Select.Option>
          <Select.Option key={'2022'} value={'2022'}>2022</Select.Option>
          <Select.Option key={'2023'} value={'2023'}>2023</Select.Option>
          <Select.Option key={'2024'} value={'2024'}>2024</Select.Option>
          <Select.Option key={'2025'} value={'2025'}>2025</Select.Option>
        </Select>
        <br/>
        {alert.show && (
          <span style={{ color: alert.type === 'success' ? '#28C499' : 'red' }}>&nbsp;&nbsp;{alert.message}</span>
        )}
        <br/>
        <Button className="btn-purple" style={{marginTop: 20}} onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default BoardYear;
