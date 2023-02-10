import React from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { useDetailedState } from "hook/detailedHook";

const ProblemsProjects = () => {
  const {detailed} = useDetailedState();
  const problemPartsData = detailed?.problems && detailed?.problems?.length > 0 ? detailed?.problems?.map((data:any, index: any)=> {
    return {
      key: index,
      name: data.problemname? data.problemname: 'N/A',
      problempriority: data.problempriority? data.problempriority: 'N/A',
    }
  }) : {};
  const columns = [
    {
      title: <>Name</>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a:any, b:any) => a.agreement.length - b.agreement.length,
    },
    {
      title: <>Priority</>,
      dataIndex: 'problempriority',
      key: 'problempriority',
      sorter: (a:any, b:any) => a.agreement.length - b.agreement.length,
    },
  ];
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{display:'flex', alignItems:'center'}}>
          <h3 style={{marginBottom:'15px', marginTop:'20px', marginRight:'35px'}} id="component-solutions">PROBLEM</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px', width:'68%'}}></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-detail-modal">
          <Table dataSource={detailed?.problems && detailed?.problems?.length > 0  ?  problemPartsData : []} columns={columns} pagination={false}/>
        </Col>
      </Row>
    </>
  )
}

export default ProblemsProjects;