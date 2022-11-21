import React from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { DATA_SOLUTIONS } from "../constants";
import { ArrowDownOutlined } from "@ant-design/icons";

const ComponentSolucions = () => {
  const columns = [
    {
      title: <>Component <ArrowDownOutlined className="ico-arrow"/></>,
      dataIndex: 'component',
      key: 'component',
      render: (component:any) => (
        <p className={"table-" + component[1]}>{component[0]}</p>
      ),
    },
    {
      title: <>Cost <ArrowDownOutlined className="ico-arrow"/></>,
      dataIndex: 'cost',
      key: 'cost',
      render: (cost:any) => (
        <p className={"table-" + cost[1]}>{cost[0]}</p>
      ),
    },
    {
      title: <>Status <ArrowDownOutlined className="ico-arrow"/></>,
      dataIndex: 'status',
      key: 'status',
      render: (status:any) => (
        <span className={'span-' + status}>
          {status}
        </span> 
      ),
    },
    {
      title: <>Solution Type <ArrowDownOutlined className="ico-arrow"/></>,
      dataIndex: 'type',
      key: 'type',
    },
  ];
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <h3 style={{marginBottom:'15px', marginTop:'20px'}} id="component-solutions">COMPONENT & SOLUTIONS</h3>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 16 }} style={{alignSelf: 'center'}}>
          <div className="line-01"></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-detail-modal">
          <Table dataSource={DATA_SOLUTIONS} columns={columns} />
        </Col>
      </Row>
    </>
  )
}

export default ComponentSolucions;