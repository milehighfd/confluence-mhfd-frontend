import React from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { useDetailedState } from "hook/detailedHook";

const ProblemParts = ({problemParts}:{problemParts:any}) => {
  const problemPartsData = problemParts ? problemParts.map((data:any)=> {
    return {
      key: data.globalid,
      problem_part_category: data.problem_part_category,
      problem_part_subcategory: data.problem_part_subcategory,
      problem_type: data.problem_type,
    }
  }) : {};
  const columns = [
    {
      title: <>Problem type</>,
      dataIndex: 'problem_type',
      key: 'problem_type',
      sorter: (a:any, b:any) => a.agreement.length - b.agreement.length,
    },
    {
      title: <>Problem Part Category</>,
      dataIndex: 'problem_part_category',
      key: 'problem_part_category',
      sorter: (a:any, b:any) => a.agreement.length - b.agreement.length,
    },
    {
      title: <>Problem Part Subcategory</>,
      dataIndex: 'problem_part_subcategory',
      key: 'problem_part_subcategory',
      sorter: (a:any, b:any) => a.agreement.length - b.agreement.length,
    },
  ];
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{display:'flex', alignItems:'center'}}>
          <h3 style={{marginBottom:'15px', marginTop:'20px', marginRight:'35px'}} id="component-solutions">PROBLEM PARTS</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px', width:'78%'}}></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-detail-modal">
          <Table dataSource={problemParts ?  problemPartsData : {}} columns={columns} pagination={false}/>
        </Col>
      </Row>
    </>
  )
}

export default ProblemParts;