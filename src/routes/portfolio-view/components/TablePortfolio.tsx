import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Input, Layout, Popover, Row, Select, Space, Table, Tabs, Tag } from 'antd';
import { ColumnsType } from "antd/lib/table";
import { ArrowDownOutlined, MoreOutlined } from "@ant-design/icons";
import { dataTable, dataTable00, dataTable01, dataTable02 } from "../constants/constants";
import DetailModal from "routes/detail-page/components/DetailModal";
const TablePortafolio = (
  {divRef, searchRef, openTable, setHoverTable,hoverTable}
  :{
    divRef:React.MutableRefObject<HTMLDivElement | null>,
    searchRef:React.MutableRefObject<HTMLDivElement | null>,
    openTable: boolean[],
    setHoverTable:React.Dispatch<React.SetStateAction<number[]>>,
    hoverTable:number[],
  }) => {
  
  const [detailOpen, setDetailOpen] = useState(false);
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
      title: <>Phase &nbsp;<ArrowDownOutlined /></>,
      dataIndex: 'phase',
      key: 'name',
      width: "11.5%",
      ellipsis: true,
    },
    {
      title: <>MHFD Lead/PM &nbsp;<ArrowDownOutlined /></>,
      dataIndex: 'mhfd',
      key: 'mhfd',
      width: "14%",
      ellipsis: true,
    },
    {
      title: <>Status &nbsp;<ArrowDownOutlined /></>,
      dataIndex: 'status',
      key: 'status',
      width: "11.5%",
      ellipsis: true,
    },
    {
      title: <>Service Area &nbsp;<ArrowDownOutlined /></>,
      dataIndex: 'serviceArea',
      key: 'age',
      width: "13%",
      ellipsis: true,
    },
    {
      title: <>County &nbsp;<ArrowDownOutlined /></>,
      dataIndex: 'county',
      key: 'address',
      width: "11.5%",
      ellipsis: true,
    },
    {
      title: <>Estimate Cost &nbsp;<ArrowDownOutlined /></>,
      key: 'cost',
      dataIndex: 'cost',
      render: text => {return text === '0' ? <span className="tag">No Cost</span> : <span style={{color:'#11093C'}}>${text}</span>;},
      width: "14.5%",
      ellipsis: true,
    },
    {
      title: <>Stream &nbsp;<ArrowDownOutlined /></>,
      dataIndex: 'stream',
      key: 'stream',
      width: "11.5%",
      ellipsis: true,
    },
    {
      title: <>Contract &nbsp;<ArrowDownOutlined /></>,
      key: 'contact',
      dataIndex: 'contact',
      width: "11.5%",
      ellipsis: true,
    }
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: '',
      dataIndex: 'phase',
      key: 'name',
      width: "11.5%",
      ellipsis: true,
    },
    {
      title: '',
      dataIndex: 'mhfd',
      key: 'mhfd',
      width: "14%",
      ellipsis: true,
    },
    {
      title: '',
      dataIndex: 'status',
      key: 'status',
      width: "11.5%",
      render: status => 
      <div style={{}}>
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
      width: "11.5%",
      ellipsis: true,
    },
    {
      title: '',
      key: 'cost',
      dataIndex: 'cost',
      render: text => {return text === '0' ? <span className="tag">No Cost</span> : <span style={{color:'#11093C', fontWeight:'500'}}>${text}</span>;},
      width: "14.5%",
      ellipsis: true,
    },
    {
      title: '',
      dataIndex: 'stream',
      key: 'stream',
      width: "11.5%",
      ellipsis: true,
    },
    {
      title: '',
      key: 'contact',
      dataIndex: 'contact',
      width: "11.5%",
      ellipsis: true,
    }
  ];
  return <div className="table-body">
    {detailOpen && <DetailModal visible={detailOpen} setVisible={setDetailOpen}/>}
    <Table columns={columnsHeader} dataSource={dataTable00} className="table-portafolio header-table" style={{marginBottom:'19px'}}/>
    <div
      className="table-body-body"
      ref={divRef}
      onScrollCapture={(e:any) => {
        let dr: any = divRef.current;
        if(searchRef.current){
          searchRef.current.scrollTo(0, dr.scrollTop);
        }
      }}
    >
      <div className="line-table" onMouseEnter={()=>{setHoverTable([0,0,0]);}}>

      </div>
      <Table
        columns={columns}
        dataSource={dataTable}
        className={openTable[0] ? "table-portafolio table-first": "table-portafolio table-close table-first table-clouse-first"}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {}, // click row
            onDoubleClick: event => {}, // double click row
            onContextMenu: event => {}, // right button click row
            onMouseEnter: event => {setHoverTable([1,0,rowIndex? rowIndex:0]);}, // mouse enter row
            onMouseLeave: event => {}, // mouse leave row
          };
        }}
        onHeaderRow={(record, rowIndex) => {
          return {
            onClick: event => {}, // click row
            onDoubleClick: event => {}, // double click row
            onContextMenu: event => {}, // right button click row
            onMouseEnter: event => {setHoverTable([0,1,rowIndex? rowIndex:0]);}, // mouse enter row
            onMouseLeave: event => {}, // mouse leave row
          };
        }}
        rowClassName={(record:any) => {
          if((hoverTable[2]+1)+'' === record.key && hoverTable[0] && hoverTable[1] === 0){
            return 'active-table-row'
          }
          return ''
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
        onHeaderRow={(record, rowIndex) => {
          return {
            onClick: event => {}, // click row
            onDoubleClick: event => {}, // double click row
            onContextMenu: event => {}, // right button click row
            onMouseEnter: event => {setHoverTable([0,1,rowIndex? rowIndex:0]);}, // mouse enter row
            onMouseLeave: event => {}, // mouse leave row
          };
        }}
        rowClassName={(record:any) => {
          if((hoverTable[2]+1)+'' === record.key && hoverTable[0] && hoverTable[1] === 1){
            return 'active-table-row'
          }
          return ''
        }}
      />
      <Table
        columns={columns}
        dataSource={dataTable02}
        className={openTable[2] ? "table-portafolio": "table-portafolio table-close"}
        style={{marginBottom:'24px'}}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {}, // click row
            onDoubleClick: event => {}, // double click row
            onContextMenu: event => {}, // right button click row
            onMouseEnter: event => {setHoverTable([1,2,rowIndex? rowIndex:0]);}, // mouse enter row
            onMouseLeave: event => {}, // mouse leave row
          };
        }}
        onHeaderRow={(record, rowIndex) => {
          return {
            onClick: event => {}, // click row
            onDoubleClick: event => {}, // double click row
            onContextMenu: event => {}, // right button click row
            onMouseEnter: event => {setHoverTable([0,2,rowIndex? rowIndex:0]);}, // mouse enter row
            onMouseLeave: event => {}, // mouse leave row
          };
        }}
        rowClassName={(record:any) => {
          if((hoverTable[2]+1)+'' === record.key && hoverTable[0] && hoverTable[1] === 2){
            return 'active-table-row'
          }
          return ''
        }}
      />
    </div>
    
  </div>
};

export default TablePortafolio;