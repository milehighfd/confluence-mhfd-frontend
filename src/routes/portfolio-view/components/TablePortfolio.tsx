import React, { useEffect, useRef, useState } from 'react';
import { Col, Row, Table } from 'antd';
import { dataTable00 } from 'routes/portfolio-view/constants/constants';
import {
  AllHeaderTable,
  CIPHeaderTable,
  DIPHeaderTable,
  PlanningHeaderTable,
  PropertyAcquisitionHeaderTable,
  RDHeaderTable,
  RestorationHeaderTable
} from 'routes/portfolio-view/constants/tableHeader';
import { getGroupList } from 'routes/portfolio-view/components/ListUtils';
import SearchDropdown from 'routes/portfolio-view/components/SearchDropdown';
import TableGroups from 'routes/portfolio-view/components/TableGroups';

const TablePortafolio = (
  { divRef,
    tabKey,
    setSortValue,
    searchRef,
    setOpenTable,
    openTable,
    rawData,
    index,
    groupsBy,
    setCurrentGroup,
    setSearchWord,    
    email,
    searchWord,
    setCollapsePhase,
    collapsePhase,
    currentGroup,
    tabKeyId,
    filterPagination,
    updateFavorites,
    setUpdateFavorites,
    sortValue,
  }
    : {
      divRef: React.MutableRefObject<any>,
      tabKey: any,
      setSortValue: Function | any,
      searchRef: React.MutableRefObject<any>,
      setOpenTable: React.Dispatch<React.SetStateAction<boolean[]>>,
      openTable: any[],      
      rawData: any,      
      index: number,
      groupsBy: any[],
      setCurrentGroup: Function,
      setSearchWord: Function,
      email: string,
      searchWord: string,
      setCollapsePhase: Function,
      collapsePhase: any,
      currentGroup: any,
      tabKeyId: any,
      filterPagination: any,
      updateFavorites: any,
      setUpdateFavorites: Function,
      sortValue: any,
    }) => {

  const [detailGroup, setDetailGroup] = useState<any>(null);
  const headerRef = useRef<null | HTMLDivElement>(null);
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const tableHeaderRef = useRef<null | HTMLDivElement>(null);
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
 
  useEffect(() => {
    getGroupList(currentGroup).then((valuesGroups) => {
      setDetailGroup(valuesGroups.groups)
    })
  }, [currentGroup])
  let drr =tableHeaderRef.current;
  let widthMax = drr? drr.offsetWidth : 0;
  let myDiv = drr?.querySelector('.ant-table-thead');
  let myDivWidth = myDiv? myDiv.clientWidth :0;

  return (
    <div>
      <div className="scroll-custom" style={{width:`${widthMax - 5}px`}}  ref={scrollRef}
        onScrollCapture={(e: any) => {
          let dr: any = scrollRef.current;
          if (scrollRef.current) {
            if (tableRef.current) {
              tableRef.current.forEach((elem: any, index:number) => {
                tableRef.current[index].scrollTo(dr.scrollLeft, headerRef.current?.scrollTop);
              })
            }
            if (headerRef.current) {
              headerRef.current.scrollTo(dr.scrollLeft, headerRef.current?.scrollTop);
            }
          }
        }}
      >
        <div className="scroll-bar" style={{ width: `${myDivWidth - 5}px`}}></div>
      </div>  
      <Row>
        <Col xs={{ span: 10 }} lg={{ span: 5 }}>         
          <SearchDropdown rawData={rawData}
            groupsBy={groupsBy}
            setCurrentGroup={setCurrentGroup}
            setSearchWord={setSearchWord}
            searchWord={searchWord}
            fullData={rawData}
            setOpenTable={setOpenTable}></SearchDropdown>
        </Col>
        <Col xs={{ span: 34 }} lg={{ span: 19 }}>
          <div className="table-body">
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
                    if (scrollRef.current) {
                        scrollRef.current.scrollTo(dr.scrollLeft, 0);
                    }
                  }
                }}
              >
                <Table
                  columns={ValueTabsHeader()}
                  dataSource={dataTable00}
                  className="table-portafolio header-table"
                  style={{ marginBottom: '20px' }}
                  ref={tableHeaderRef}
                  onChange={(pagination, filters, sorters: any) => {
                    setSortValue({
                      columnKey: sorters.columnKey,
                      order: sorters.order,
                    });
                  }}
                />
              </div>
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
                      email={email}
                      divRef={divRef}
                      searchRef={searchRef}
                      scrollRef={scrollRef}
                      tableHeaderRef={tableHeaderRef}
                      tableRef={tableRef}
                      tabKeyId={tabKeyId}
                      headerRef={headerRef}
                      filterPagination={filterPagination}
                      updateFavorites={updateFavorites}
                      setUpdateFavorites={setUpdateFavorites}
                      dataId={currentGroup === 'streams' && elem.value!==''? elem.value : elem.id}
                      sortValue={sortValue}
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
