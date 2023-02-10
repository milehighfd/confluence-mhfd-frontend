import React from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { useDetailedState } from "hook/detailedHook";

const Vendors = () => {
  const {detailed} = useDetailedState();
  const problemPartsData = detailed?.contractors?.length > 0 ? detailed?.contractors?.map((data:any, index: any)=> {
    return {
      key: index,
      type: data.business_associate? data.business_associate: 'N/A',
      name: data.business_associate? data.business_associate: 'N/A',
    }
  }) : {};
  const columns = [
    {
      title: <>Typs</>,
      dataIndex: 'type',
      key: 'type',
      sorter: (a:any, b:any) => a.agreement.length - b.agreement.length,
    },
    {
      title: <>Name</>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a:any, b:any) => a.agreement.length - b.agreement.length,
    },
  ];
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{display:'flex', alignItems:'center'}}>
          <h3 style={{marginBottom:'15px', marginTop:'20px', marginRight:'35px'}} id="component-solutions">VENDORS</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px', width:'68%'}}></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-detail-modal">
          <Table dataSource={detailed?.contractors.length > 0  ?  problemPartsData : {}} columns={columns} pagination={false}/>
        </Col>
      </Row>
    </>
  )
}

export default Vendors;