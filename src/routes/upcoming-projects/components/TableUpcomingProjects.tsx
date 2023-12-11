import React from "react";
import { Table, Tooltip } from "antd";

const TableUpcomingProjects = () => {
  const tooltipContent = (title:any, content:any) => {
    return (
      <div>
        <p className="title-tooltip">{title}</p>
        <p className="content-tooltip">{content}</p>
      </div>
    )
  }
  const dataSource = [
    {
      key: '1',
      project: 'Irondale Gulch at Highway 2',
      lead: 'Teresa Patterson',
      description: '-',
      cost: '-',
      consultant: 'Yes',
      selection: '-',
      contractor: '-',
      staff: '-',
    },
    {
      key: '2',
      project: 'Shaw Heights Tributary ‐ Lowell to Little Dry Creek',
      lead: 'Dan Hill',
      description: 'Assessment of tributary for best location of flood control improvements in heavily urbanized tribut',
      cost: '$10,500,000',
      consultant: 'No',
      selection: 'Jan 1, 2024',
      contractor: 'May 5, 2024',
      staff: '-',
    },
    {
      key: '3',
      project: 'Grange Hall Creek Tributary South ‐ Grant to Washington',
      lead: 'Andy Stewart',
      description: 'Flood control improvements to replace a failing/undersized culvert at Washington St, enlarge detention upstream of Washington St. and remove downstream townhomes from the fl...',
      cost: '-',
      consultant: 'Yes',
      selection: '-',
      contractor: '-',
      staff: 'Jan 1, 2025',
    },
    {
      key: '4',
      project: 'Fairfax Park Detention and Outfall',
      lead: 'Jen Winters',
      description: 'Flood control improvements to improve capacity, outfall, and operation of the Fairfax Park Detention facility. Improvements are intended to alleviate flooding issues in the s...',
      cost: '$200,000',
      consultant: 'No',
      selection: 'Jan 1, 2024',
      contractor: 'May 5, 2024',
      staff: 'Jan 1, 2025',
    },
    {
      key: '5',
      project: 'Ragweed Drain ‐ O`Brian Canal Crossing',
      lead: 'Andy Stewart',
      description: 'Flood control improvements per the ongoing MDP recommendations. Design and Construction of box culverts underneath the O`Brian Canal along Ragweed Drain.',
      cost: '$879,300',
      consultant: 'Yes',
      selection: '-',
      contractor: '-',
      staff: 'Jan 1, 2025',
    },
    {
      key: '6',
      project: 'Happy Canyon ‐ Jordan Rd to Broncos Pwky',
      lead: 'Laura Hinds',
      description: 'Stream evaluation to look at sediment transport through Happy Canyon. Identify potential sediment removal locations and fix existing downstream drop structures.',
      cost: '$10,0000',
      consultant: 'No',
      selection: 'Jan 1, 2024',
      contractor: '-',
      staff: 'Jan 1, 2025',
    },
    {
      key: '7',
      project: 'Willow Creek County Line to Quebec',
      lead: 'Jon Villines',
      description: 'Stream and floodplain stabilization and possible conveyance/detention improvements resulting from Master Plan and Stream Assessment',
      cost: '$5,234,000',
      consultant: 'No',
      selection: 'Jan 1, 2024',
      contractor: 'May 5, 2024',
      staff: 'Jan 1, 2025',
    },
    {
      key: '8',
      project: 'Willow Creek County Line to Quebec',
      lead: 'Jon Villines',
      description: 'Stream and floodplain stabilization and possible conveyance/detention improvements resulting from Master Plan and Stream Assessment',
      cost: '$360,000',
      consultant: 'Yes',
      selection: '-',
      contractor: 'May 5, 2024',
      staff: 'Jan 1, 2025',
    },
  ];
  
  const columns = [
    {
      title: 'Project',
      dataIndex: 'project',
      key: 'project',
      width:'17%',
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
      width: '25%',
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
      title: <p style={{textAlign:'center'}}>Anticipated<br/>Construction<br/>Staff</p>,
      dataIndex: 'staff',
      key: 'staff',
      sorter: (a:any, b:any) => a.age - b.age,
    },
  ];
  return (
    <Table
      scroll={{ y: 240 }}
      className='upcoming-table'
      dataSource={dataSource}
      columns={columns}
      pagination={false}
    />
  );
}

export default TableUpcomingProjects;