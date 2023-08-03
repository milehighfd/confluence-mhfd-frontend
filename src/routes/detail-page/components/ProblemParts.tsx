import React from "react";
import {Col, Row, Table } from "antd";


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
      sorter: (a:any, b:any) => a.problem_type.localeCompare(b.problem_type),
    },
    {
      title: <>Problem Part Category</>,
      dataIndex: 'problem_part_category',
      key: 'problem_part_category',
      sorter: (a:any, b:any) => a.problem_part_category.localeCompare(b.problem_part_category),
    },
    {
      title: <>Problem Part Subcategory</>,
      dataIndex: 'problem_part_subcategory',
      key: 'problem_part_subcategory',
      sorter: (a:any, b:any) => a.problem_part_subcategory.localeCompare(b.problem_part_subcategory),
    },
  ];
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className='detail-problems-component-header'>
          <h3 className="detail-problems-component-title-header">PROBLEM PARTS</h3>
          <div className="detail-problems-component-header-right" ></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="detail-problems-component-table">
          <Table dataSource={problemParts ?  problemPartsData : {}} columns={columns} pagination={false}/>
        </Col>
      </Row>
    </>
  )
}

export default ProblemParts;