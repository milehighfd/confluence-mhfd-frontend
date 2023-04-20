import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Collapse, Input, Layout, Popover, Row, Select, Space, Table, Tabs, Tag } from 'antd';
import { ColumnsType } from "antd/lib/table";
import { ArrowDownOutlined, ConsoleSqlOutlined, MoreOutlined } from "@ant-design/icons";
import { dataTable, dataTable00, dataTable01, dataTable02 } from "../constants/constants";
import DetailModal from "routes/detail-page/components/DetailModal";
import { AllHeaderTable, AllValueTable, CIPHeaderTable, CIPValueTable, DIPHeaderTable, DIPValueTable, PlanningHeaderTable, PlanningValueTable, PropertyAcquisitionHeaderTable, PropertyAcquisitionValueTable, RDHeaderTable, RDValueTable, RestorationHeaderTable, RestorationValueTable } from "../constants/tableHeader";
import Search from "./Search";
import SearchDropdown from "./SearchDropdown";
import { getGroupList } from "./ListUtils";
import TableBody from "./TableGroups";
import TableGroups from "./TableGroups";
const TablePortafolio = (
  { divRef,
    //setHoverTable, 
    //hoverTable, 
    tabKey,
    setSortValue,
    searchRef,
    setOpenTable,
    openTable,
    //hoverTable,
    //setHoverTable,
    phaseRef,
    scheduleRef,
    rawData,
    setCompleteData,
    setNewData,
    index,
    groupsBy,
    setCurrentGroup,
    setSearchWord,
    fullData,
    email,
    searchWord,
    setCollapsePhase,
    optionSelect,
    collapsePhase,
    currentGroup,
    favorites,
    tabKeyId,
  }
    : {
      divRef: React.MutableRefObject<any>,
      //setHoverTable: React.Dispatch<React.SetStateAction<number | undefined>>,
      //hoverTable: any,
      tabKey: any,
      setSortValue: Function | any,
      searchRef: React.MutableRefObject<any>,
      scheduleRef: React.MutableRefObject<HTMLDivElement | null>,
      setOpenTable: React.Dispatch<React.SetStateAction<boolean[]>>,
      openTable: any[],
      //hoverTable: any,
      //setHoverTable:React.Dispatch<React.SetStateAction<number | undefined>>,
      phaseRef: React.MutableRefObject<HTMLDivElement | null>,
      rawData: any,
      setCompleteData: Function,
      setNewData: Function,
      index: number,
      groupsBy: any[],
      setCurrentGroup: Function,
      setSearchWord: Function,
      fullData: any,
      email: string,
      searchWord: string,
      setCollapsePhase: Function,
      optionSelect: any,
      collapsePhase: any,
      currentGroup: any,
      favorites: any,
      tabKeyId: any,
    }) => {

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailGroup, setDetailGroup] = useState<any>(null);
  const headerRef = useRef<null | HTMLDivElement>(null);
  const { Panel } = Collapse;
  const tableRef = useRef<any[]>([]);
  const ValueTabsHeader = () => {
    let header = AllHeaderTable;
    switch (tabKey) {
      case "All": {
        header = AllHeaderTable;
        break;
      }
      case "DIP": {
        header = DIPHeaderTable;
        break;
      }
      case "R&D": {
        header = RDHeaderTable;
        break;
      }
      case "Restoration": {
        header = RestorationHeaderTable;
        break;
      }
      case "CIP": {
        header = CIPHeaderTable;
        break;
      }
      case "Planning": {
        header = PlanningHeaderTable;
        break;
      }
      case "Acquisition": {
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
    switch (tabKey) {
      case "All": {
        return AllValueTable;
      }
      case "DIP": {
        return DIPValueTable;
      }
      case "R&D": {
        return RDValueTable;
      }
      case "Restoration": {
        return RestorationValueTable;
      }
      case "CIP": {
        return CIPValueTable;
      }
      case "Acquisition": {
        return PropertyAcquisitionValueTable;
      }
      case "Planning": {
        return PlanningValueTable;
      }
      default: {
        return AllValueTable;
      }
    }
  }

  const sortedData = rawData.filter((elem: any) => elem.id.includes('Title'));
  //console.log("SORTED DATA")
  //console.log(sortedData)
  const completeData = sortedData.map((elem: any) => {
    const filtered = rawData.filter((elemRaw: any) => !elemRaw.id.includes('Title') && elemRaw.headerLabel === elem.headerLabel);
    return {
      ...elem,
      values: filtered.filter((v: any, index: any) => {
        return filtered.findIndex((v2: any) => v.project_id === v2.project_id) === index;
      })
    }
  });
  //console.log("COMPLETE DATA")
  //console.log(dataTable00)
  const scrollDiv = useCallback((e: any) => {
    let dr: any = divRef.current;
    if (searchRef.current) {
      searchRef.current.scrollTo(0, e.target.scrollTop);
    }
  }, [divRef.current, searchRef.current])

  useEffect(() => {
    getGroupList(currentGroup).then((valuesGroups) => {
      setDetailGroup(valuesGroups.groups)
    })
  }, [currentGroup])
  return (
    <div>
      <Row>
        <Col xs={{ span: 10 }} lg={{ span: 5 }}>         
          <SearchDropdown rawData={rawData}
            groupsBy={groupsBy}
            setCurrentGroup={setCurrentGroup}
            setSearchWord={setSearchWord}
            searchWord={searchWord}
            fullData={rawData}></SearchDropdown>
        </Col>
        <Col xs={{ span: 34 }} lg={{ span: 19 }}>
          <div className="table-body">
            {/* {detailOpen && <DetailModal visible={detailOpen} setVisible={setDetailOpen}/>} */}
            <div className="table-table-body" style={{ width: 'min-content' }}>
              <div
                ref={headerRef}
                className="scroll-scroll-table"
                onScrollCapture={(e: any) => {
                  let dr: any = headerRef.current;
                  if (headerRef.current) {
                    if (tableRef.current) {
                      tableRef.current.forEach((elem: any, index:number) => {
                        tableRef.current[index].scrollTo(dr.scrollLeft, dr.scrollTop);
                      })
                    }
                  }
                }}
              >
                <Table
                  columns={ValueTabsHeader()}
                  dataSource={dataTable00}
                  className="table-portafolio header-table"
                  style={{ marginBottom: '20px' }}
                  onChange={(pagination, filters, sorters: any) => {
                    setSortValue({
                      columnKey: sorters.columnKey,
                      order: sorters.order,
                    });
                  }}
                // onHeaderRow={(record, rowIndex) => {
                //   return {
                //     onMouseEnter: event => { setHoverTable(-1); }, // mouse enter row
                //   };
                // }}
                />
              </div>
              {/* <div
                className="table-body-body"
                id={`listView_${index}`}
                ref={el => (divRef.current[index] = el)}
                onScrollCapture={(e: any) => {
                  let dr: any = divRef.current[index];
                  if (searchRef.current[index] && tableRef.current) {
                    searchRef.current[index].scrollTo(dr.scrollLeft, dr.scrollTop);
                    tableRef.current.scrollTo(dr.scrollLeft, 0);
                  }
                }}
              >
                <div className="scroll-table">
                  <div
                    className="line-table"
                    onMouseEnter={e => {
                      //setHoverTable(-1)
                    }}
                  ></div>
                  {completeData.map((elem: any, index: number) => {
                    //console.log("ELEM")
                    //console.log(elem)
                    return (
                      <Table
                        key={elem.id}
                        columns={ValueTabsValue()}
                        dataSource={elem.values}
                        pagination={{ pageSize: 1000 }}
                        className={
                          openTable[index]
                            ? index === 0
                              ? 'table-portafolio table-first'
                              : 'table-portafolio'
                            : index === 0
                              ? 'table-portafolio table-close table-first table-clouse-first'
                              : 'table-portafolio table-close'
                        }
                      // onRow={(record, rowIndex) => {
                      //   return {
                      //     onMouseEnter: event => { setHoverTable(elem.values[rowIndex ? rowIndex : 0].project_id); }, // mouse enter row
                      //   };
                      // }}
                      // onHeaderRow={(record, rowIndex) => {
                      //   return {
                      //     onMouseEnter: event => { setHoverTable(-1); }, // mouse enter row
                      //   };
                      // }}
                      // rowClassName={(record: any, rowIndex: number) => {
                      //   if (hoverTable === (elem.values[rowIndex ? rowIndex : 0].project_id)) {
                      //     return 'active-table-row'
                      //   }
                      //   return ''
                      // }}
                      />
                    );
                  })}
                </div>
              </div> */}

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
        </Col>
      </Row>
      {
        <div className="phase-groups">
          <div
            className="search"
            ref={el => searchRef.current[index] = el}
          >{
              detailGroup?.map((elem: any, index: number) => {
                const id = 'collapse' + index;
                return (
                  <div id={elem.id} key={elem.id}>
                    <TableGroups
                      data={elem}
                      setCollapsePhase={setCollapsePhase}
                      collapsePhase={collapsePhase}
                      openTable={openTable}
                      setOpenTable={setOpenTable}
                      index={index}
                      currentGroup={currentGroup}
                      tabKey={tabKey}
                      favorites={favorites}
                      email={email}
                      divRef={divRef}
                      searchRef={searchRef}
                      tableRef={tableRef}
                      tabKeyId={tabKeyId}
                      headerRef={headerRef}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>        
      }
    </div>
  );
};

export default TablePortafolio;