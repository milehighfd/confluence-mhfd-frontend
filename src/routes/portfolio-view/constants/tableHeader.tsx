import React from "react";
import { ArrowDownOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";

interface DataType {
  key: string;
  phase: string;
  serviceArea: string;
  county: string;
  cost: string;
  contact: string;
  view:string;
  options: string;
}
interface DataTypeAll {
  key: string;
  onbase: string;
  type: string;
  status: string;
  phase: string;
  mhfd: string;
  serviceArea:string;
  stream: string;
}
interface DataTypeDIP {
  key: string;
  onbase: string;
  status: string;
  phase: string;
  mhfd: string;
  lg_lead:string;
  cost:string;
  developer:string;
  consultant:string;
  civil_contractor:string;
  landscape_contractor:string;
  construction_start_date:string;
  serviceArea:string;
  county:string;
  local_government:string;
  stream: string;
}
interface DataTypeRD {
  key: string;
  onbase: string;
  status: string;
  phase: string;
  mhfd: string;
  cost:string;
  consultant:string;
}
interface DataTypeRestoration {
  key: string;
  onbase: string;
  status: string;
  phase: string;
  mhfd: string;
  lg_lead:string;
  project_sponsor:string;
  cost:string;
  consultant:string;
  civil_contractor:string;
  landscape_contractor:string;
  construction_start_date:string;
  serviceArea:string;
  county:string;
  stream: string;
}
interface DataTypeCIP {
  key: string;
  onbase: string;
  status: string;
  phase: string;
  mhfd: string;
  lg_lead:string;
  project_sponsor:string;
  cost:string;
  consultant:string;
  civil_contractor:string;
  landscape_contractor:string;
  construction_start_date:string;
  serviceArea:string;
  county:string;
  stream: string;
}
interface DataTypePlanning {
  key: string;
  onbase: string;
  status: string;
  phase: string;
  mhfd: string;
  project_sponsor:string;
  total_funding: string;
  serviceArea:string;
  stream: string;
}
interface DataTypePropertyAcquisition {
  key: string;
  onbase: string;
  status: string;
  phase: string;
  mhfd: string;
  mhfd_support:string;
  project_sponsor:string;
  cost: string;
  serviceArea:string;
  county:string;
  stream: string;
}
const typeStatus = (status:string) => {
  let text ='';
  switch(status) {
    case "Not Started" :{
      text = 'span-not-started';
      break;}
    case "Completed" :{
      text = 'span-completed';
      break;}
    case "Active" :{
      text = 'span-active';
      break;}
    case "Delayed" :{
      text = 'span-delayed';
      break;}
    default: {
      text = 'span-not-started';
      break; }
  }
  return text;
}

// export const AllHeaderTable:ColumnsType<DataType> = [
//   {
//     title: <>Phase &nbsp;<ArrowDownOutlined /></>,
//     dataIndex: 'phase',
//     key: 'name',
//     width: "11.5%",
//     ellipsis: true,
//   },
//   {
//     title: <>MHFD Lead/PM &nbsp;<ArrowDownOutlined /></>,
//     dataIndex: 'mhfd',
//     key: 'mhfd',
//     width: "14%",
//     ellipsis: true,
//   },
//   {
//     title: <>Status &nbsp;<ArrowDownOutlined /></>,
//     dataIndex: 'status',
//     key: 'status',
//     width: "11.5%",
//     ellipsis: true,
//   },
//   {
//     title: <>Service Area &nbsp;<ArrowDownOutlined /></>,
//     dataIndex: 'serviceArea',
//     key: 'age',
//     width: "13%",
//     ellipsis: true,
//   },
//   {
//     title: <>County &nbsp;<ArrowDownOutlined /></>,
//     dataIndex: 'county',
//     key: 'address',
//     width: "11.5%",
//     ellipsis: true,
//   },
//   {
//     title: <>Estimate Cost &nbsp;<ArrowDownOutlined /></>,
//     key: 'cost',
//     dataIndex: 'cost',
//     render: text => {return text === '0' ? <span className="tag">No Cost</span> : <span style={{color:'#251863'}}>${text}</span>;},
//     width: "14.5%",
//     ellipsis: true,
//   },
//   {
//     title: <>Stream &nbsp;<ArrowDownOutlined /></>,
//     dataIndex: 'stream',
//     key: 'stream',
//     width: "11.5%",
//     ellipsis: true,
//   },
//   {
//     title: <>Contract &nbsp;<ArrowDownOutlined /></>,
//     key: 'contact',
//     dataIndex: 'contact',
//     width: "11.5%",
//     ellipsis: true,
//   }
// ];

// export const AllValueTable:ColumnsType<DataType> = [
//   {
//     title: '',
//     dataIndex: 'phase',
//     key: 'name',
//     width: "11.5%",
//     ellipsis: true,
//   },
//   {
//     title: '',
//     dataIndex: 'mhfd',
//     key: 'mhfd',
//     width: "14%",
//     ellipsis: true,
//   },
//   {
//     title: '',
//     dataIndex: 'status',
//     key: 'status',
//     width: "11.5%",
//     render: status => 
//     <div style={{}}>
//       <span className={typeStatus(status)}>{status}</span>
//     </div>,
//     ellipsis: true,
//   },
//   {
//     title: '',
//     dataIndex: 'serviceArea',
//     key: 'age',
//     width: "13%",
//     ellipsis: true,
//   },
//   {
//     title: '',
//     dataIndex: 'county',
//     key: 'address',
//     width: "11.5%",
//     ellipsis: true,
//   },
//   {
//     title: '',
//     key: 'cost',
//     dataIndex: 'cost',
//     render: text => {return text === '0' ? <span className="tag">No Cost</span> : <span style={{color:'#11093C', fontWeight:'500'}}>${text}</span>;},
//     width: "14.5%",
//     ellipsis: true,
//   },
//   {
//     title: '',
//     dataIndex: 'stream',
//     key: 'stream',
//     width: "11.5%",
//     ellipsis: true,
//   },
//   {
//     title: '',
//     key: 'contact',
//     dataIndex: 'contact',
//     width: "11.5%",
//     ellipsis: true,
//   }
// ];
export const AllHeaderTable:ColumnsType<DataType | DataTypeAll | any> = [
  {
    title: <>OnBase &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'onbase',
    key: 'onbase',
    width:"14.28571428571429",
    ellipsis: true,
  },
  {
    title: <>Project Type &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'type',
    key: 'type',
    width:"14.28571428571429",
    ellipsis: true,
  },
  {
    title: <>Status &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'status',
    key: 'status',
    width:"14.28571428571429",
    ellipsis: true,
  },
  {
    title: <>Phase &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'phase',
    key: 'phase',
    width:"14.28571428571429",
    ellipsis: true,
  },
  {
    title: <>MHFD Lead &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'mhfd',
    key: 'mhfd',
    width:"14.28571428571429",
    ellipsis: true,
  },
  {
    title: <>Service Area &nbsp;<ArrowDownOutlined /></>,
    key: 'serviceArea',
    dataIndex: 'serviceArea',
    width:"14.28571428571429",
    ellipsis: true,
  },
  {
    title: <>Stream &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'stream',
    key: 'stream',
    width:"14.28571428571429",
    ellipsis: true,
  }
];
export const AllValueTable:ColumnsType<DataTypeAll | any> = [
  {
    title: '',
    dataIndex: 'onbase',
    key: 'onbase',
    width:"14.28571428571429",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'type',
    key: 'type',
    width:"14.28571428571429",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'status',
    key: 'status',
    width:"14.28571428571429",
    render: status => 
    <div style={{}}>
      <span className={typeStatus(status)}>{status}</span>
    </div>,
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'phase',
    key: 'phase',
    width:"14.28571428571429",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'mhfd',
    key: 'mhfd',
    width:"14.28571428571429",
    ellipsis: true,
  },
  {
    title: '',
    key: 'serviceArea',
    dataIndex: 'serviceArea',
    width:"14.28571428571429",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'stream',
    key: 'stream',
    width:"14.28571428571429",
    ellipsis: true,
  }
];
export const DIPHeaderTable:ColumnsType<DataTypeDIP | DataType | DataTypeAll | any> = [
  {
    title: <>OnBase &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'onbase',
    key: 'onbase',
    width:"6.666666666666667",
    ellipsis: true,
  },
  {
    title: <>Status &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'status',
    key: 'status',
    width:"6.666666666666667",
    ellipsis: true,
  },
  {
    title: <>Phase &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'phase',
    key: 'phase',
    width:"6.666666666666667",
    ellipsis: true,
  },
  {
    title: <>MHFD Lead &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'mhfd',
    key: 'mhfd',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: <>LG Lead &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'lg_lead',
    key: 'lg_lead',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: <>Estimated Cost &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'cost',
    key: 'cost',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: <>Developer &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'developer',
    key: 'developer',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: <>Consultant &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'consultant',
    key: 'consultant',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: <>Civil Contractor &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'civil_contractor',
    key: 'civil_contractor',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: <>Landscape Contractor &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'landscape_contractor',
    key: 'landscape_contractor',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: <>Construction Start &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'construction_start_date',
    key: 'construction_start_date',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: <>Service Area &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'serviceArea',
    key: 'serviceArea',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: <>County &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'county',
    key: 'county',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: <>Local Government &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'local_government',
    key: 'local_government',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: <>Stream &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'stream',
    key: 'stream',
    width:"6.666666666666667",
    ellipsis: true,
  },
];
export const DIPValueTable:ColumnsType<DataTypeDIP | any> = [
  {
    title: '',
    dataIndex: 'onbase',
    key: 'onbase',
    width:"6.666666666666667",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'status',
    key: 'status',
    width:"6.666666666666667",
    render: status => 
    <div style={{}}>
      <span className={typeStatus(status)}>{status}</span>
    </div>,
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'phase',
    key: 'phase',
    width:"6.666666666666667",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'mhfd',
    key: 'mhfd',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'lg_lead',
    key: 'lg_lead',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'cost',
    render: text => {return text === '0' ? <span className="tag">No Cost</span> : <span style={{color:'#11093C', fontWeight:'500'}}>${text}</span>;},
    key: 'cost',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'developer',
    key: 'developer',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'consultant',
    key: 'consultant',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'civil_contractor',
    key: 'civil_contractor',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'landscape_contractor',
    key: 'landscape_contractor',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'construction_start_date',
    key: 'construction_start_date',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'serviceArea',
    key: 'serviceArea',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'county',
    key: 'county',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'local_government',
    key: 'local_government',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'stream',
    key: 'stream',
    width:"6.666666666666667",
    ellipsis: true,
  },
];

export const RDHeaderTable:ColumnsType<DataTypeRD | any> = [
  {
    title: <>OnBase &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'onbase',
    key: 'onbase',
    width:"16.66666666666667",
    ellipsis: true,
  },
  {
    title: <>Status &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'status',
    key: 'status',
    width:"16.66666666666667",
    ellipsis: true,
  },
  {
    title: <>Phase &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'phase',
    key: 'phase',
    width:"16.66666666666667",
    ellipsis: true,
  },
  {
    title: <>MHFD Lead &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'mhfd',
    key: 'mhfd',
    width:"16.66666666666667",
    ellipsis: true,
  },
  {
    title: <>Estimated Cost &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'cost',
    key: 'cost',
    width:"16.66666666666667",
    ellipsis: true,
  },
  {
    title: <>Consultant &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'consultant',
    key: 'consultant',
    width:"16.66666666666667",
    ellipsis: true,
  },
];
export const RDValueTable:ColumnsType<DataTypeRD | any> = [
  {
    title: '',
    dataIndex: 'onbase',
    key: 'onbase',
    width:"16.66666666666667",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'status',
    key: 'status',
    width:"16.66666666666667",
    render: status => 
    <div style={{}}>
      <span className={typeStatus(status)}>{status}</span>
    </div>,
    ellipsis: true,
  },
  {
    title:  '',
    dataIndex: 'phase',
    key: 'phase',
    width:"16.66666666666667",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'mhfd',
    key: 'mhfd',
    width:"16.66666666666667",
    ellipsis: true,
  },
  {
    title:  '',
    dataIndex: 'cost',
    key: 'cost',
    render: text => {return text === '0' ? <span className="tag">No Cost</span> : <span style={{color:'#11093C', fontWeight:'500'}}>${text}</span>;},
    width:"16.66666666666667",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'consultant',
    key: 'consultant',
    width:"16.66666666666667",
    ellipsis: true,
  },
];
export const RestorationHeaderTable:ColumnsType<DataTypeRestoration | any> = [
  {
    title: <>OnBase &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'onbase',
    key: 'onbase',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: <>Status &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'status',
    key: 'status',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: <>Phase &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'phase',
    key: 'phase',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: <>MHFD Lead &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'mhfd',
    key: 'mhfd',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: <>LG Lead &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'lg_lead',
    key: 'lg_lead',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: <>Project Sponsor &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'project_sponsor',
    key: 'project_sponsor',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: <>Estimated Cost &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'cost',
    key: 'cost',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: <>Consultant &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'consultant',
    key: 'consultant',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: <>Civil Contractor &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'civil_contractor',
    key: 'civil_contractor',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: <>Landscape Contractor &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'landscape_contractor',
    key: 'landscape_contractor',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: <>Construction Start &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'construction_start_date',
    key: 'construction_start_date',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: <>Service Area &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'serviceArea',
    key: 'serviceArea',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: <>County &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'county',
    key: 'county',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: <>Stream &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'stream',
    key: 'stream',
    width:"7.142857142857143",
    ellipsis: true,
  },
];
export const RestorationValueTable:ColumnsType<DataTypeRestoration | any> = [
  {
    title: '',
    dataIndex: 'onbase',
    key: 'onbase',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'status',
    key: 'status',
    render: status => 
    <div style={{}}>
      <span className={typeStatus(status)}>{status}</span>
    </div>,
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'phase',
    key: 'phase',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'mhfd',
    key: 'mhfd',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'lg_lead',
    key: 'lg_lead',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'project_sponsor',
    key: 'project_sponsor',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'cost',
    key: 'cost',
    render: text => {return text === '0' ? <span className="tag">No Cost</span> : <span style={{color:'#11093C', fontWeight:'500'}}>${text}</span>;},
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'consultant',
    key: 'consultant',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'civil_contractor',
    key: 'civil_contractor',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'landscape_contractor',
    key: 'landscape_contractor',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'construction_start_date',
    key: 'construction_start_date',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'serviceArea',
    key: 'serviceArea',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'county',
    key: 'county',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'stream',
    key: 'stream',
    width:"7.142857142857143",
    ellipsis: true,
  },
];
export const CIPHeaderTable:ColumnsType<DataTypeCIP | any> = [
  {
    title: <>OnBase &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'onbase',
    key: 'onbase',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: <>Status &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'status',
    key: 'status',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: <>Phase &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'phase',
    key: 'phase',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: <>MHFD Lead &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'mhfd',
    key: 'mhfd',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: <>LG Lead &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'lg_lead',
    key: 'lg_lead',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: <>Project Sponsor &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'project_sponsor',
    key: 'project_sponsor',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: <>Estimated Cost &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'cost',
    key: 'cost',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: <>Consultant &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'consultant',
    key: 'consultant',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: <>Civil Contractor &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'civil_contractor',
    key: 'civil_contractor',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: <>Landscape Contractor &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'landscape_contractor',
    key: 'landscape_contractor',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: <>Construction Start Date &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'construction_start_date',
    key: 'construction_start_date',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: <>Service Area &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'serviceArea',
    key: 'serviceArea',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: <>County &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'county',
    key: 'county',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: <>Stream &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'stream',
    key: 'stream',
    width:"7.142857142857143",
    ellipsis: true,
  },
];
export const CIPValueTable:ColumnsType<DataTypeCIP | any> = [
  {
    title: '',
    dataIndex: 'onbase',
    key: 'onbase',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'status',
    key: 'status',
    render: status => 
    <div style={{}}>
      <span className={typeStatus(status)}>{status}</span>
    </div>,
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'phase',
    key: 'phase',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'mhfd',
    key: 'mhfd',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'lg_lead',
    key: 'lg_lead',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'project_sponsor',
    key: 'project_sponsor',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'cost',
    key: 'cost',
    render: text => {return text === '0' ? <span className="tag">No Cost</span> : <span style={{color:'#11093C', fontWeight:'500'}}>${text}</span>;},
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'consultant',
    key: 'consultant',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'civil_contractor',
    key: 'civil_contractor',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'landscape_contractor',
    key: 'landscape_contractor',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'construction_start_date',
    key: 'construction_start_date',
    width:"6.666666666666667",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'serviceArea',
    key: 'serviceArea',
    width:"7.142857142857143",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'county',
    key: 'county',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'stream',
    key: 'stream',
    width:"7.142857142857143",
    ellipsis: true,
  },
];
export const PlanningHeaderTable:ColumnsType<DataTypePlanning | any> = [
  {
    title: <>OnBase &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'onbase',
    key: 'onbase',
    width:"11.11111111111111%",
    ellipsis: true,
  },
  {
    title: <>Status &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'status',
    key: 'status',
    width:"11.11111111111111%",
    ellipsis: true,
  },
  {
    title: <>Phase &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'phase',
    key: 'phase',
    width:"11.11111111111111%",
    ellipsis: true,
  },
  {
    title: <>MHFD Lead &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'mhfd',
    key: 'mhfd',
    width:"11.11111111111111%",
    ellipsis: true,
  },
  {
    title: <>Project Sponsor &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'project_sponsor',
    key: 'project_sponsor',
    width:"11.11111111111111%",
    ellipsis: true,
  },
  {
    title: <>Total Funding &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'total_funding',
    key: 'total_funding',
    width:"11.11111111111111%",
    ellipsis: true,
  },
  
  {
    title: <>Consultant &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'consultant',
    key: 'consultant',
    width:"11.11111111111111%",
    ellipsis: true,
  },
  {
    title: <>Service Area &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'serviceArea',
    key: 'serviceArea',
    width:"11.11111111111111%",
    ellipsis: true,
  },
  {
    title: <>Stream &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'stream',
    key: 'stream',
    width:"11.11111111111111%",
    ellipsis: true,
  },
];
export const PlanningValueTable:ColumnsType<DataTypePlanning | any> = [
  {
    title: '',
    dataIndex: 'onbase',
    key: 'onbase',
    width:"11.11111111111111%",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'status',
    key: 'status',
    render: status => 
    <div style={{}}>
      <span className={typeStatus(status)}>{status}</span>
    </div>,
    width:"11.11111111111111%",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'phase',
    key: 'phase',
    width:"11.11111111111111%",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'mhfd',
    key: 'mhfd',
    width:"11.11111111111111%",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'project_sponsor',
    key: 'project_sponsor',
    width:"11.11111111111111%",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'total_funding',
    key: 'total_funding',
    render: text => {return text === '0' ? <span className="tag">No Cost</span> : <span style={{color:'#11093C', fontWeight:'500'}}>${text}</span>;},
    width:"11.11111111111111%",
    ellipsis: true,
  },
  
  {
    title: '',
    dataIndex: 'consultant',
    key: 'consultant',
    width:"11.11111111111111%",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'serviceArea',
    key: 'serviceArea',
    width:"11.11111111111111%",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'stream',
    key: 'stream',
    width:"11.11111111111111%",
    ellipsis: true,
  },
];

export const PropertyAcquisitionHeaderTable:ColumnsType<DataTypePropertyAcquisition | any> = [
  {
    title: <>OnBase &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'onbase',
    key: 'onbase',
    width:"10%",
    ellipsis: true,
  },
  {
    title: <>Status &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'status',
    key: 'status',
    width:"10%",
    ellipsis: true,
  },
  {
    title: <>Phase &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'phase',
    key: 'phase',
    width:"10%",
    ellipsis: true,
  },
  {
    title: <>MHFD Lead &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'mhfd',
    key: 'mhfd',
    width:"10%",
    ellipsis: true,
  },
  {
    title: <>MHFD Support &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'mhfd_support',
    key: 'mhfd_support',
    width:"10%",
    ellipsis: true,
  },
  {
    title: <>Project Sponsor &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'project_sponsor',
    key: 'project_sponsor',
    width:"10%",
    ellipsis: true,
  },
  {
    title: <>Estimated Cost &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'cost',
    key: 'cost',
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: <>Service Area &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'serviceArea',
    key: 'serviceArea',
    width:"10%",
    ellipsis: true,
  },
  {
    title: <>County &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'county',
    key: 'county',
    width:"10%",
    ellipsis: true,
  },
  {
    title: <>Stream &nbsp;<ArrowDownOutlined /></>,
    dataIndex: 'stream',
    key: 'stream',
    width:"10%",
    ellipsis: true,
  },
];

export const PropertyAcquisitionValueTable:ColumnsType<DataTypePropertyAcquisition | any> = [
  {
    title: '',
    dataIndex: 'onbase',
    key: 'onbase',
    width:"10%",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'status',
    key: 'status',
    render: status => 
    <div style={{}}>
      <span className={typeStatus(status)}>{status}</span>
    </div>,
    width:"10%",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'phase',
    key: 'phase',
    width:"10%",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'mhfd',
    key: 'mhfd',
    width:"10%",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'mhfd_support',
    key: 'mhfd_support',
    width:"10%",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'project_sponsor',
    key: 'project_sponsor',
    width:"10%",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'cost',
    key: 'cost',
    render: text => {return text === '0' ? <span className="tag">No Cost</span> : <span style={{color:'#11093C', fontWeight:'500'}}>${text}</span>;},
    width:"7.142857142857143",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'serviceArea',
    key: 'serviceArea',
    width:"10%",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'county',
    key: 'county',
    width:"10%",
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: 'stream',
    key: 'stream',
    width:"10%",
    ellipsis: true,
  },
];