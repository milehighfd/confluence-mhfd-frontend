import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import * as datasets from 'Config/datasets';
import { SERVER } from "Config/Server.config";

const TableUpcomingProjects = ({tipe}:{tipe:string}) => {
  const tooltipContent = (title:any, content:any) => {
    return (
      <div>
        <p className="title-tooltip">{title}</p>
        <p className="content-tooltip">{content}</p>
      </div>
    )
  }
  const [dataSource, setDataSource] = useState<any>([]);

  useEffect(() => {
    datasets.postData(SERVER.GET_LIST_PMTOOLS(''), {}).then(data => {
      const parsedData = data.map((d: any, index: any) => {
        const mhfdLead = d.project_staffs.find((staff: any) => staff.code_project_staff_role_type_id === 1);
        const estimatedCost = d.project_costs.find((cost: any) => cost.code_project_cost_type_id === 1);
        return {
        key: d.projectid,
        project: d.project_name,
        lead: mhfdLead ? mhfdLead.business_associate_contact.contact_name : '-',
        description: d.description,
        cost: estimatedCost ? estimatedCost.cost : '-',
        consultant: d.consultant,
        selection: d.selection,
        contractor: d.contractor,
        staff: '-'}
      });
      setDataSource(parsedData);
    });
  }, []);
  
  const columns = [
    {
      title: 'Project',
      dataIndex: 'project',
      key: 'project',
      width:'17%',
      sorter: (a:any, b:any) => {
        if (a.project < b.project)
          return -1;
        if ( a.project > b.project)
          return 1;
        return 0;
      },
    },
    {
      title: 'MHFD Lead',
      dataIndex: 'lead',
      key: 'lead',
      sorter: (a:any, b:any) => {
        if (a.lead < b.lead)
          return -1;
        if ( a.lead > b.lead)
          return 1;
        return 0;
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '25%',
      render: (text:any, record:any) => <Tooltip placement="top" title={tooltipContent(record.project, text)} overlayClassName="upcoming-tooltip-table"><p>{text}</p></Tooltip>,
      sorter: (a:any, b:any) => {
        if (a.description < b.description)
          return -1;
        if ( a.description > b.description)
          return 1;
        return 0;
      },
    },
    {
      title: <p style={{textAlign:'center'}}>Project<br/>Estimated<br/>Cost</p>,
      dataIndex: 'cost',
      key: 'cost',
      sorter: (a:any, b:any) => a.cost - b.cost,
    },
    {
      title: <p style={{textAlign:'center'}}>Consultant<br/>Selected</p>,
      dataIndex: 'consultant',
      key: 'consultant',
      sorter: (a:any, b:any) => a.age - b.age,
    },
    {
      title: <p style={{textAlign:'center'}}>Consultant<br/>Selection</p>,
      dataIndex: 'selection',
      key: 'selection',
      sorter: (a:any, b:any) => a.age - b.age,
    },
    {
      title: <p style={{textAlign:'center'}}>Contractor<br/>Selection</p>,
      dataIndex: 'contractor',
      key: 'contractor',
      sorter: (a:any, b:any) => a.age - b.age,
    },
    {
      title: <p style={{textAlign:'center'}}>Anticipated<br/>Construction<br/>Start</p>,
      dataIndex: 'staff',
      key: 'staff',
      sorter: (a:any, b:any) => a.age - b.age,
    },
  ];
  const columnsNew = [
    {
      title: 'Project',
      dataIndex: 'project',
      key: 'project',
      width:'25%',
      sorter: (a:any, b:any) => a.age - b.age,
    },
    {
      title: 'MHFD Lead',
      dataIndex: 'lead',
      key: 'lead',
      sorter: (a:any, b:any) => a.age - b.age,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '35%',
      render: (text:any, record:any) => <Tooltip placement="top" title={tooltipContent(record.project, text)} overlayClassName="upcoming-tooltip-table"><p>{text}</p></Tooltip>,
      sorter: (a:any, b:any) => a.age - b.age,
    },
    {
      title: <p style={{textAlign:'center'}}>Project<br/>Estimated<br/>Cost</p>,
      dataIndex: 'cost',
      key: 'cost',
      sorter: (a:any, b:any) => a.age - b.age,
    },
    {
      title: <p style={{textAlign:'center'}}>Contractor<br/>Selection</p>,
      dataIndex: 'contractor',
      key: 'contractor',
      sorter: (a:any, b:any) => a.age - b.age,
    },
  ];
  return (
    <Table
      scroll={{ y: 240 }}
      className='upcoming-table'
      dataSource={dataSource}
      columns={tipe === 'DIP' || tipe === 'R&D' || tipe === 'Acquisition' ? columnsNew:columns}
      pagination={false}
    />
  );
}

export default TableUpcomingProjects;