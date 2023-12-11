import React from "react";
import { Table } from "antd";

const TableUpcomingProjects = () => {
  const dataSource = [
    {
      key: '1',
      project: 'Irondale Gulch at Highway 2',
      mhfdpm: 'Teresa Patterson',
      description: '-',
      cost: '-',
      consultant: '-',
      q3: '-',
      contractor: '-',
      staff: '-',
    },
    {
      key: '2',
      project: 'Shaw Heights Tributary ‐ Lowell to Little Dry Creek',
      mhfdpm: 'Dan Hill',
      description: 'Assessment of tributary for best location of flood control improvements in heavily urbanized tribut',
      cost: '$10,500,000',
      consultant: '-',
      q3: 'Q3 or Q4',
      contractor: '2024',
      staff: '-',
    },
  ];
  
  const columns = [
    {
      title: 'Project',
      dataIndex: 'project',
      key: 'project',
      sorter: (a:any, b:any) => a.age - b.age,
    },
    {
      title: 'MHFD PM',
      dataIndex: 'mhfdpm',
      key: 'mhfdpm',
      sorter: (a:any, b:any) => a.age - b.age,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a:any, b:any) => a.age - b.age,
    },
    {
      title: 'Construction Estimated Cost',
      dataIndex: 'cost',
      key: 'cost',
      sorter: (a:any, b:any) => a.age - b.age,
    },
    {
      title: 'Consultant Selected',
      dataIndex: 'consultant',
      key: 'consultant',
      sorter: (a:any, b:any) => a.age - b.age,
    },
    {
      title: ' Consultant Selection Q3',
      dataIndex: 'q3',
      key: 'q3',
      sorter: (a:any, b:any) => a.age - b.age,
    },
    {
      title: 'Contractor Selection Q3',
      dataIndex: 'contractor',
      key: 'contractor',
      sorter: (a:any, b:any) => a.age - b.age,
    },
    {
      title: 'Anticipated Construction Staff',
      dataIndex: 'staff',
      key: 'staff',
      sorter: (a:any, b:any) => a.age - b.age,
    },
  ];
  return (
    <Table dataSource={dataSource} columns={columns} />
  );
}

export default TableUpcomingProjects;