import React, { useEffect, useState } from "react";
import { Col, Row, Select } from 'antd';
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import { WINDOW_WIDTH } from "constants/constants";

const BoardYear = () => {
  const [openDropYear, setOpenDropYear] = useState(false);
  const [year, setYear] = useState('2023');

  useEffect(() => {
    datasets.getData(SERVER.GET_CONFIGURATIONS('BOARD_YEAR'))
      .then((response: any) => {
        console.log(response.value);
        setYear(response.value);
      }).catch((error: any) => {
        console.error(error);
      });
  }, []);
  const changeConfigurationYear = (value: string) => {
    setYear(value);
    datasets.putData(SERVER.GET_CONFIGURATIONS('BOARD_YEAR'), { value })
      .then((response: any) => {
        console.log(response);
      }).catch((error: any) => {
        console.error(error);
      });
  };

  return <>
    <div>
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
          value={year}
          listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
          suffixIcon={openDropYear? < UpOutlined/> :< DownOutlined  />}
          onClick={()=>(setOpenDropYear(!openDropYear))}
          onChange={(e) => changeConfigurationYear(e)}
        >
          <Option key={'2022'} value={'2022'}>2022</Option>
          <Option key={'2023'} value={'2023'}>2023</Option>
          <Option key={'2024'} value={'2024'}>2024</Option>
          <Option key={'2025'} value={'2025'}>2025</Option>
        </Select>
      </div>
    </div>
  </>
};

export default BoardYear;