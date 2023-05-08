import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import { Col, Row, Table } from 'antd';
import { FILTER_PROJECTS_TRIGGER, LIMIT_PAGINATION } from 'constants/constants';
import React, { useEffect, useState } from 'react';
import DetailModal from 'routes/detail-page/components/DetailModal';
import { getCounties, getCurrentProjectStatus, getServiceAreas, getSponsors, getStreams, getTotalEstimatedCost } from 'utils/parsers';
import { AllValueTable, CIPValueTable, DIPValueTable, PlanningValueTable, PropertyAcquisitionValueTable, RDValueTable, RestorationValueTable } from "../constants/tableHeader";

const TableBody = ({
  currentGroup,
  dataId,
  tabKey,
  next,
  prev,
  setNext,
  setPrev,
  email,
  openTable,
  index,
  scrollHeaderScrollRef,
  tableRef,
  tabKeyId,
  headerRef,
  filterPagination,
  updateFavorites,
  setUpdateFavorites,
  sortValue,
  counter,
  page,
  setPage,
}: {
  currentGroup: any,
  dataId: any,
  tabKey: any,
  next: boolean,
  prev: boolean,
  setNext: Function,
  setPrev: Function,
  email: string,
  openTable: any,
  index: number,
  scrollHeaderScrollRef:any,
  tableRef: any,
  tabKeyId: any,
  headerRef: any,
  filterPagination: any,
  updateFavorites: boolean,
  setUpdateFavorites: Function,
  sortValue: any,
  counter:  never[],
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
}) => {
  const [dataParsed, setDataParsed] = useState<any>([]);
  // const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [updateFavorite, setUpdateFavorite] = useState(false);
  const [dataBody, setDataBody] = useState([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState();
  const [rowActive, setRowActive] = useState(-20)
  const [resultCounter, setResultCounter] = useState<any>(0);
  const [updateData, setUpdateData] = useState(false);
  let limitPage = Number(counter) % 20 > 0 ?  Math.floor(Number(counter) / 20 + 1) : Number(counter) / 20;
  useEffect(() => {
    if (next && page < limitPage) {
      setPage(page + 1)
      setNext(false)
      setPrev(false)
    }
    if (prev && page > 1) {
      setPage(page - 1)
      setPrev(false)
      setNext(false)
    }
  }, [next, prev])

  useEffect(() => {
    const controller = new AbortController();
    datasets.getData(
      SERVER.FAVORITES,
      datasets.getToken(),
      controller.signal
    ).then(result => {
      setFavorites(result);
    });
    return () => {
      controller.abort();
    };
  }, [updateFavorite]);

  useEffect(() => {
    setDataParsed(dataBody.map((x: any, index: number) => {
      return {
        key: `${currentGroup}${index}`,
        id: `${currentGroup}${index}`,
        project_id: x.project_id,
        rowLabel: x.project_name,
        on_base: x?.onbase_project_number,
        project_type: x?.code_project_type?.project_type_name,
        status: getCurrentProjectStatus(x)?.code_phase_type?.code_status_type?.status_name || '',
        project_status: x?.project_statuses?.filter((ps: any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4 && ps?.code_phase_type?.phase_ordinal_position !== -1),
        phase: getCurrentProjectStatus(x)?.code_phase_type?.phase_name,
        phaseId: getCurrentProjectStatus(x)?.code_phase_type_id,
        county: getCounties(x?.project_counties || []),
        project_sponsor: getSponsors(x.project_partners),
        mhfd: x?.project_staffs.reduce((accumulator: string, pl: any) => {
          const sa = pl?.business_associate_contact?.user?.name || '';
          const sa1 = pl?.code_project_staff_role_type?.project_staff_role_type_name || '';
          let value = accumulator;
          if (sa && sa1 === 'MHFD Lead') {
            if (value) {
              value += ',';
            }
            value += sa;
          }
          return value;
        }, ''),
        lg_lead: x?.project_staffs.reduce((accumulator: string, pl: any) => {
          const sa = pl?.business_associate_contact?.user?.name || '';
          const sa1 = pl?.code_project_staff_role_type?.project_staff_role_type_name || '';
          let value = accumulator;
          if (sa && sa1 === 'Local Government Lead') {
            if (value) {
              value += ',';
            }
            value += sa;
          }
          return value;
        }, ''),
        service_area: getServiceAreas(x?.project_service_areas || []),
        stream: getStreams(x?.project_streams || []).join(' , '),
        estimated_cost: getTotalEstimatedCost(x?.project_costs),
        consultant: x?.project_partners.reduce((accumulator: string, pl: any) => {
          const sa = pl?.business_associate?.business_name || '';
          const sa1 = pl?.code_partner_type_id || '';
          let value = accumulator;
          if (sa && sa1 === 3) {
            if (value) {
              value += ',';
            }
            value += sa;
          }
          return value;
        }, ''), //'elem?.consultants[0]?.consultant[0]?.business_name',
        civil_contractor: x?.project_partners.reduce((accumulator: string, pl: any) => {
          const sa = pl?.business_associate?.business_name || '';
          const sa1 = pl?.code_partner_type_id || '';
          let value = accumulator;
          if ((sa && sa1 === 8) || (sa && sa1 === 9)) {
            if (value) {
              value += ',';
            }
            value += sa;
          }
          return value;
        }, ''), // 'elem?.civilContractor[0]?.business[0]?.business_name',
        local_government: x?.project_local_governments.reduce((accumulator: string, pl: any) => {
          const sa = pl?.CODE_LOCAL_GOVERNMENT?.local_government_name || '';
          let value = accumulator;
          if (sa) {
            if (value) {
              value += ',';
            }
            value += sa;
          }
          return value;
        }, ''),
        construction_start_date: x?.project_status?.code_phase_type?.code_phase_type_id === 125 ? x?.project_status?.planned_start_date : x?.project_status?.actual_start_date, //elem?.construction_start_date,
        landscape_contractor: x?.project_partners.reduce((accumulator: string, pl: any) => {
          const sa = pl?.business_associate?.business_name || '';
          const sa1 = pl?.code_partner_type_id || '';
          let value = accumulator;
          if (sa && sa1 === 9) {
            if (value) {
              value += ',';
            }
            value += sa;
          }
          return value;
        }, ''), // 'elem?.landscapeContractor[0]?.business[0]?.business_name',
        isFavorite: favorites?.some((element: { project_id: number; }) => {
          if (element.project_id === x.project_id) {
            return true;
          }
          return false;
        }),
      }
    }))
  }, [dataBody, favorites])

  useEffect(() => {   
    let sort = "";
    let order = "";
    if (sortValue.order === 'ascend') {
      order = "asc";
    } else if (sortValue.order === 'descend') {
      order = "desc";
    }
    if (sortValue.columnKey === 'on_base' && sortValue.order !== undefined) {
      sort = "onbase_project_number";
    }
    datasets.postData(SERVER.GET_LIST_PMTOOLS_PAGE(currentGroup, dataId) + `?page=${page}&limit=${LIMIT_PAGINATION}&code_project_type_id=${tabKeyId}&sortby=${sort}&sortorder=${order}`, filterPagination).then((res: any) => {
      setDataBody(res);
      setResultCounter(Object.keys(res).length);
    })
  }, [ filterPagination, page,sortValue])

  useEffect(() => {
    if (page != 1) {
      setPage(1);
    }
  }, [filterPagination])

  const deleteFunction = (id: number, email: string, table: string) => {
    datasets.deleteDataWithBody(SERVER.DELETE_FAVORITE, { email: email, id: id, table: table }, datasets.getToken()).then(favorite => {
      setUpdateFavorite(!updateFavorite)
      setUpdateFavorites(!updateFavorites)
    });
  }
  const addFunction = (email: string, id: number, table: string) => {
    datasets.getData(SERVER.ADD_FAVORITE + '?table=' + table + '&email=' + email + '&id=' + id, datasets.getToken()).then(favorite => {
      setUpdateFavorite(!updateFavorite)
      setUpdateFavorites(!updateFavorites)
    });
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

  return <>
    {detailOpen && <DetailModal
      visible={detailOpen}
      setVisible={setDetailOpen}
      data={dataDetail}
      type={FILTER_PROJECTS_TRIGGER}
      deleteCallback={deleteFunction}
      addFavorite={addFunction}
    />}
    <div className="table-body">
      <Row>
        <Col xs={{ span: 10 }} lg={{ span: 5 }} style={{zIndex:2}}>
          <hr className="line-progress" style={{width: `${(((page) * 100 )/ limitPage)}%`}}/>
          {
            dataParsed.map((d: any, index_elem: number) => (
              <div className="text-search" key={d.id} id={d.id}
                onMouseEnter={(e: any) => {
                  setRowActive(d.project_id);
                }}
                onMouseLeave={(e: any) => {
                  setRowActive(-20);
                }}
                style={rowActive === d.project_id ? {background:'#fafafa', transition: 'background .3s'}:{transition: 'background .3s'}}
                >
                <p onClick={() => {
                  setDetailOpen(true); 
                  setDataDetail(d) 
                }} className="title-project" >{d.rowLabel}</p>
                {d.isFavorite ? <HeartFilled style={{ marginLeft: '7px', color: '#F5575C', marginRight: '10px' }} onClick={() => (deleteFunction(d.project_id, email, ''))} /> : <HeartOutlined style={{ marginLeft: '7px', color: '#706B8A', marginRight: '10px' }} onClick={() => addFunction(email, d.project_id, '')} />}
              </div>
            ))
          }
        </Col>
        <Col xs={{ span: 34 }} lg={{ span: 19 }} style={{zIndex:'1'}}>
          {<div >
            <div
              className="table-body-body"
              key={`listView_${index}`}
              id={`listView_${index}`}
              ref={el => tableRef.current[index] = el}
              onScrollCapture={(e: any) => {
                let dr: any = tableRef.current[index];
                if (headerRef.current) {
                  if (tableRef.current) {
                    tableRef.current.forEach((elem: any, index:number) => {
                      tableRef.current[index].scrollTo(dr.scrollLeft, dr.scrollTop);
                      headerRef.current.scrollTo(dr.scrollLeft, dr.scrollTop);
                      scrollHeaderScrollRef.current.scrollTo(dr.scrollLeft, dr.scrollTop);
                    })
                  }
                }
              }}
            >
              <div className="scroll-table">                
                <Table
                  showHeader={false}
                  //key={elem.id}
                  columns={ValueTabsValue()}
                  dataSource={dataParsed}
                  pagination={false}
                  key={index}
                  onRow={(record, rowIndex) => {
                    return {
                      onMouseEnter: (event) => {
                        setRowActive(record.project_id);
                      },
                      onMouseLeave: (event) => {
                        setRowActive( -20);
                      },
                    };
                  }}
                  rowClassName={(record, index) => {
                    if (record.project_id === rowActive) {
                      return 'row-active-table';
                    } else {
                      return '';
                    }
                  }}
                  onHeaderRow={(record, rowIndex) => {
                    return {
                      onMouseEnter: (event) => {
                        setRowActive(-20);
                      },
                    };
                  }}
                  className={
                    openTable[index]
                      ? index === 0
                        ? 'table-portafolio table-first'
                        : 'table-portafolio'
                      : index === 0
                        ? 'table-portafolio table-close table-first table-clouse-first'
                        : 'table-portafolio table-close'
                  }
                />
              </div>
            </div>
          </div>
          }
        </Col>
      </Row>
    </div>
  </>
};

export default TableBody;
