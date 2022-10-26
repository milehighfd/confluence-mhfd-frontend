import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Input, Layout, Popover, Row, Select, Space, Table, Tabs, Tag } from 'antd';
import { ColumnsType } from "antd/lib/table";
import { ArrowDownOutlined, MoreOutlined } from "@ant-design/icons";
import { dataTable, dataTable00, dataTable01, dataTable02 } from "../constants/constants";
const TablePortafolio = (
  {divRef, searchRef, openTable, setHoverTable}
  :{
    divRef:React.MutableRefObject<HTMLDivElement | null>,
    searchRef:React.MutableRefObject<HTMLDivElement | null>,
    openTable: boolean[],
    setHoverTable:React.Dispatch<React.SetStateAction<number[]>>,
  }) => {
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
  const columnsHeader: ColumnsType<DataType> = [
    {
      title: <>Phase <ArrowDownOutlined style={{opacity:'0.45'}}/></>,
      dataIndex: 'phase',
      key: 'name',
      width: "11%",
      ellipsis: true,
    },
    {
      title: <>MHFD Staff Lead <ArrowDownOutlined style={{opacity:'0.45'}}/></>,
      dataIndex: 'mhfd',
      key: 'mhfd',
      width: "15%",
      ellipsis: true,
    },
    {
      title: <>Status <ArrowDownOutlined style={{opacity:'0.45'}}/></>,
      dataIndex: 'status',
      key: 'status',
      width: "11%",
      ellipsis: true,
    },
    {
      title: <>Service Area <ArrowDownOutlined style={{opacity:'0.45'}}/></>,
      dataIndex: 'serviceArea',
      key: 'age',
      width: "13%",
      ellipsis: true,
    },
    {
      title: <>County <ArrowDownOutlined style={{opacity:'0.45'}}/></>,
      dataIndex: 'county',
      key: 'address',
      width: "10%",
      ellipsis: true,
    },
    {
      title: <>Estimate Cost <ArrowDownOutlined style={{opacity:'0.45'}}/></>,
      key: 'cost',
      dataIndex: 'cost',
      render: text => {return text === '0' ? <span className="tag">No Cost</span> : <span style={{color:'#11093C'}}>${text}</span>;},
      width: "13%",
      ellipsis: true,
    },
    {
      title: <>Stream <ArrowDownOutlined style={{opacity:'0.45'}}/></>,
      dataIndex: 'stream',
      key: 'stream',
      width: "11%",
      ellipsis: true,
    },
    {
      title: <>Contract <ArrowDownOutlined style={{opacity:'0.45'}}/></>,
      key: 'contact',
      dataIndex: 'contact',
      width: "10%",
      ellipsis: true,
    },
    {
      title: 'View',
      key: 'view',
      render: (_, record) => (
        <Button className="btn-transparent transparent-btn" style={{color:'transparent'}}>view</Button>
      ),
      width: "8%",
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: '',
      dataIndex: 'phase',
      key: 'name',
      width: "11%",
      ellipsis: true,
    },
    {
      title: '',
      dataIndex: 'mhfd',
      key: 'mhfd',
      width: "15%",
      ellipsis: true,
    },
    {
      title: '',
      dataIndex: 'status',
      key: 'status',
      width: "11%",
      render: status => 
      <div style={{textAlign:'center'}}>
        <span className={typeStatus(status)}>{status}</span>
      </div>,
      ellipsis: true,
    },
    {
      title: '',
      dataIndex: 'serviceArea',
      key: 'age',
      width: "13%",
      ellipsis: true,
    },
    {
      title: '',
      dataIndex: 'county',
      key: 'address',
      width: "10%",
      ellipsis: true,
    },
    {
      title: '',
      key: 'cost',
      dataIndex: 'cost',
      render: text => {return text === '0' ? <span className="tag">No Cost</span> : <span style={{color:'#11093C', fontWeight:'500'}}>${text}</span>;},
      width: "13%",
      ellipsis: true,
    },
    {
      title: '',
      dataIndex: 'stream',
      key: 'stream',
      width: "11%",
      ellipsis: true,
    },
    {
      title: '',
      key: 'contact',
      dataIndex: 'contact',
      width: "10%",
      ellipsis: true,
    },
    {
      title: '',
      key: 'view',
      render: (_, record) => (
        <Button className="btn-purple">View</Button>
      ),
      width: "8%",
    },
  ];
  return <div className="table-body">
    <Table columns={columnsHeader} dataSource={dataTable00} className="table-portafolio header-table" style={{marginBottom:'10px'}}/>
    <div
      className="table-body-body"
      ref={divRef}
      onScroll={(e:any) => {
        let dr: any = divRef.current;
        if(searchRef.current){
          searchRef.current.scrollTo(0, dr.scrollTop);
        }
      }}
    >
      <Table
        columns={columns}
        dataSource={dataTable}
        className={openTable[0] ? "table-portafolio": "table-portafolio table-close"}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {}, // click row
            onDoubleClick: event => {}, // double click row
            onContextMenu: event => {}, // right button click row
            onMouseEnter: event => {setHoverTable([1,0,rowIndex? rowIndex:0]);}, // mouse enter row
            onMouseLeave: event => {}, // mouse leave row
          };
        }}
      />
      <Table
        columns={columns}
        dataSource={dataTable01}
        className={openTable[1] ? "table-portafolio": "table-portafolio table-close"}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {}, // click row
            onDoubleClick: event => {}, // double click row
            onContextMenu: event => {}, // right button click row
            onMouseEnter: event => {setHoverTable([1,1,rowIndex? rowIndex:0]);}, // mouse enter row
            onMouseLeave: event => {}, // mouse leave row
          };
        }}
      />
      <Table
        columns={columns}
        dataSource={dataTable02}
        className={openTable[2] ? "table-portafolio": "table-portafolio table-close"}
        style={{marginBottom:'25px'}}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {}, // click row
            onDoubleClick: event => {}, // double click row
            onContextMenu: event => {}, // right button click row
            onMouseEnter: event => {setHoverTable([1,2,rowIndex? rowIndex:0]);}, // mouse enter row
            onMouseLeave: event => {}, // mouse leave row
          };
        }}
      />
    </div>
    
  </div>
};

export default TablePortafolio;