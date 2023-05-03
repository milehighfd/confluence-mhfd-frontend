import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "antd";
import { useDetailedState } from "hook/detailedHook";
import { getVendors } from '../../../utils/parsers';

const Vendors = () => {
  const { detailed } = useDetailedState();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setData(getVendors(detailed?.project_partners || []));
  }, [detailed]);
  
  const columns = [
    {
      title: <>Type</>,
      dataIndex: 'type',
      key: 'type',
      sorter: (a:any, b:any) => a.type.localeCompare(b.type),
    },
    {
      title: <>Name</>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a:any, b:any) => a.name.localeCompare(b.name),
    },
  ];
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{display:'flex', alignItems:'center'}} className='subtitle-detail'>
          <h3 style={{paddingBottom:'15px', paddingTop:'20px', marginRight:'35px'}} id="vendors">VENDORS</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px', width:'88%'}}></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-detail-modal">
          {/* <Table dataSource={detailed?.contractors.length &&  detailed?.consultants.length ?  problemPartsData : {}} columns={columns} pagination={false}/> */}

          <Table dataSource={data} columns={columns} pagination={false}  rowKey={(record) => record.key} />
        </Col>
      </Row>
    </>
  )
}

export default Vendors;