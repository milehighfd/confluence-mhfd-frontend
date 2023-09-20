import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'antd';
import { useDetailedState } from 'hook/detailedHook';
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
      sorter: (a: any, b: any) => a.type.localeCompare(b.type),
    },
    {
      title: <>Name</>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
  ];
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="detail-problems-component-header">
          <h3 className="detail-problems-component-title-header" id="vendors">
            VENDORS
          </h3>
          <div className="detail-problems-component-header-right"></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="detail-problems-component-table">
          <Table dataSource={data} columns={columns} pagination={false} rowKey={record => record.key} />
        </Col>
      </Row>
    </>
  );
};

export default Vendors;
