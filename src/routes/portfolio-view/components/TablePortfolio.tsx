import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Input, Layout, Popover, Row, Select, Space, Table, Tabs, Tag } from 'antd';
import { ColumnsType } from "antd/lib/table";
import { ArrowDownOutlined, MoreOutlined } from "@ant-design/icons";
import { dataTable, dataTable00, dataTable01, dataTable02 } from "../constants/constants";
import DetailModal from "routes/detail-page/components/DetailModal";
import { AllHeaderTable, AllValueTable, CIPHeaderTable, CIPValueTable, DIPHeaderTable, DIPValueTable, PlanningHeaderTable, PlanningValueTable, PropertyAcquisitionHeaderTable, PropertyAcquisitionValueTable, RDHeaderTable, RDValueTable, RestorationHeaderTable, RestorationValueTable } from "../constants/tableHeader";
const TablePortafolio = (
  {divRef, searchRef, openTable, setHoverTable,hoverTable, rawData, tabKey}
  :{
    divRef:React.MutableRefObject<HTMLDivElement | null>,
    searchRef:React.MutableRefObject<HTMLDivElement | null>,
    openTable: boolean[],
    setHoverTable:React.Dispatch<React.SetStateAction<number[]>>,
    hoverTable:number[],
    rawData: any,
    tabKey:any,
  }) => {

  const [detailOpen, setDetailOpen] = useState(false);
  
  const ValueTabsHeader = () => {
    let header = AllHeaderTable;
    switch(tabKey){
      case "All" :{
        header = AllHeaderTable;
        break;
      }
      case "DIP" :{
        header = DIPHeaderTable;
        break;
      }
      case "R&D" :{
        header = RDHeaderTable;
        break;
      }
      case "Restoration" :{
        header = RestorationHeaderTable;
        break;
      }
      case "CIP" :{
        header = CIPHeaderTable;
        break;
      }
      case "Planning" :{
        header = PlanningHeaderTable;
        break;
      }
      case "Property Acquisition" :{
        header = PropertyAcquisitionHeaderTable;
        break;
      }
      default: {
        header = AllHeaderTable;
        break;
      }
    }
    return header;
  }
  
  const ValueTabsValue = () => {
    switch(tabKey){
      case "All" :{
        if(searchRef.current){
          searchRef.current.scrollTo(0, 0);
        }
        if(divRef.current){
          divRef.current.scrollTo(0, 0);
        }
        return AllValueTable;
      }
      case "DIP" :{
        if(searchRef.current){
          searchRef.current.scrollTo(0, 0);
        }
        if(divRef.current){
          divRef.current.scrollTo(0, 0);
        }
        return DIPValueTable;
      }
      case "R&D" :{
        if(searchRef.current){
          searchRef.current.scrollTo(0, 0);
        }
        if(divRef.current){
          divRef.current.scrollTo(0, 0);
        }
        return RDValueTable;
      }
      case "Restoration" :{
        if(searchRef.current){
          searchRef.current.scrollTo(0, 0);
        }
        if(divRef.current){
          divRef.current.scrollTo(0, 0);
        }
        return RestorationValueTable;
      }
      case "CIP" :{
        if(searchRef.current){
          searchRef.current.scrollTo(0, 0);
        }
        if(divRef.current){
          divRef.current.scrollTo(0, 0);
        }
        return CIPValueTable;
      }
      case "Property Acquisition" :{
        if(searchRef.current){
          searchRef.current.scrollTo(0, 0);
        }
        if(divRef.current){
          divRef.current.scrollTo(0, 0);
        }
        return PropertyAcquisitionValueTable;
      }
      case "Planning" :{
        if(searchRef.current){
          searchRef.current.scrollTo(0, 0);
        }
        if(divRef.current){
          divRef.current.scrollTo(0, 0);
        }
        return PlanningValueTable;
      }
      default: {
        return AllValueTable;
      }
    }
  }

  const sortedData = rawData.filter((elem: any) => elem.id.includes('Title'));
  const completeData = sortedData.map((elem: any) => {
    return {
      ...elem,
      values: rawData.filter((elemRaw: any) => !elemRaw.id.includes('Title') && elemRaw.headerLabel === elem.headerLabel)
    }
  });
  const scrollDiv = useCallback((e:any) =>{
    let dr: any = divRef.current;
    if(searchRef.current){
      console.log(dr.scrollTop, 'Dotttyyyyy', e.target.scrollTop)
      searchRef.current.scrollTo(0, e.target.scrollTop);
    }
  },[divRef.current, searchRef.current])
  useEffect (()=>{
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', searchRef.current)
  }, [searchRef.current])
  return <div className="table-body">
    {detailOpen && <DetailModal visible={detailOpen} setVisible={setDetailOpen}/>}
    <div  style={tabKey==='DIP' || tabKey==='Restoration' || tabKey === 'CIP'?{width:'270%', overflowX:'scroll'}:(tabKey ==='Planning' || tabKey === 'Property Acquisition'?{width:'140%', overflowX:'scroll'}:{width:'100%'})}>
      <Table columns={ ValueTabsHeader()} dataSource={dataTable00} className="table-portafolio header-table" style={{marginBottom:'19px'}}/>
    <div
      className="table-body-body"
      ref={divRef}
      onScrollCapture={scrollDiv}
    >
    <div className="line-table" onMouseEnter={()=>{setHoverTable([0,0,0]);}}></div>
    {
      completeData.map((elem: any, index: number) => {
        return(
          <Table
            columns={ValueTabsValue()}
            dataSource={elem.values}
            pagination={{ pageSize: 1000 }}
            className={openTable[index] ? (index === 0 ? "table-portafolio table-first": 'table-portafolio'): (index === 0 ?"table-portafolio table-close table-first table-clouse-first":"table-portafolio table-close")}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {}, // click row
                onDoubleClick: event => {}, // double click row
                onContextMenu: event => {}, // right button click row
                onMouseEnter: event => {setHoverTable([1,index,rowIndex? rowIndex:0]);}, // mouse enter row
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
              if((hoverTable[2]+1)+'' === record.key && hoverTable[0] && hoverTable[1] === index){
                return 'active-table-row'
              }
              return ''
            }}
          />
        )
        
      })
    }
    </div>
    
      {/* <Table
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
      /> */}
    </div>
    
  </div>
};

export default TablePortafolio;