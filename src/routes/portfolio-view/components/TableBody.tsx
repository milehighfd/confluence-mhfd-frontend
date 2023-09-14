import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Col, Row, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import { FILTER_PROJECTS_TRIGGER, LIMIT_PAGINATION } from 'constants/constants';
import { getCounties, getCurrentProjectStatus, getServiceAreas, getSponsors, getStreams, getTotalEstimatedCost } from 'utils/parsers';
import { AllValueTable, CIPValueTable, DIPValueTable, PlanningValueTable, PropertyAcquisitionValueTable, RDValueTable, RestorationValueTable } from "../constants/tableHeader";
import { usePortflioState, usePortfolioDispatch } from '../../../hook/portfolioHook';
import { useMapState } from 'hook/mapHook';
import { handleAbortError } from 'store/actions/mapActions';
import DetailModal from 'routes/detail-page/components/DetailModal';
import { useProfileState } from 'hook/profileHook';

const TableBody = ({
  dataId,
  tabKey,
  next,
  prev,
  setNext,
  setPrev,
  index,
  scrollHeaderScrollRef,
  tableRef,
  tabKeyId,
  headerRef,
  counter,
  page,
  setPage,
}: {
  dataId: any,
  tabKey: any,
  next: boolean,
  prev: boolean,
  setNext: Function,
  setPrev: Function,
  index: number,
  scrollHeaderScrollRef:any,
  tableRef: any,
  tabKeyId: any,
  headerRef: any,
  counter:  any,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
}) => {
  
  const { currentGroup, favorites, openGroups } = usePortflioState();
  const { deleteFavorite, addFavorite } = usePortfolioDispatch();

  const {
    filterProjectOptions,
  } = useMapState();
  
  const appUser = useProfileState();
  const email = appUser.userInformation?.email;

  const [dataParsed, setDataParsed] = useState<any>([]);
  const [dataBody, setDataBody] = useState([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState();
  const [rowActive, setRowActive] = useState(-20)
  let limitPage = Number(counter) % LIMIT_PAGINATION > 0 ?  Math.floor(Number(counter) / LIMIT_PAGINATION + 1) : Number(counter) / LIMIT_PAGINATION;
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
          const sa = pl?.business_associate_contact?.contact_name || '';
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
          const sa = pl?.business_associate_contact?.contact_name || '';
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
          const CONSULTANT = 3;
          const sa = pl?.business_associate?.business_name || '';
          const sa1 = pl?.code_partner_type_id || '';
          let value = accumulator;
          if (sa && sa1 === CONSULTANT) {
            if (value) {
              value += ',';
            }
            value += sa;
          }
          return value;
        }, ''), 
        civil_contractor: x?.project_partners.reduce((accumulator: string, pl: any) => {
          const CIVIL_CONTRACTOR = 8;
          const sa = pl?.business_associate?.business_name || '';
          const sa1 = pl?.code_partner_type_id || '';
          let value = accumulator;
          if ((sa && sa1 === CIVIL_CONTRACTOR)) {
            if (value) {
              value += ',';
            }
            value += sa;
          }
          return value;
        }, ''), 
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
        construction_start_date: x?.project_statuses.reduce((accumulator: string, pl: any) => {
          const datestr: string | null = pl?.actual_start_date;
          const date: Date | null = datestr ? new Date(datestr) : null;
          const formattedDate: string = date ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` : '';
          const sa = formattedDate;
          const sa1 = pl?.code_phase_type?.phase_name || '';
          let value = accumulator;
          if (sa && sa1 === 'Construction') {
            if (value) {
              value += ',';
            }
            value += sa;
          }
          return value;
        },''),  
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
        }, ''),
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
    const controller = new AbortController();
    datasets.postData(
      `${SERVER.GET_LIST_PMTOOLS_PAGE(currentGroup, dataId)}?page=${page}&limit=${LIMIT_PAGINATION}&code_project_type_id=${tabKeyId}`,
      filterProjectOptions,
      datasets.getToken(),
      controller.signal
    ).then((res: any) => {
      setDataBody(res);
    }).catch(handleAbortError);
    return () => {
      controller.abort();
    };
  }, [ filterProjectOptions, page])

  useEffect(() => {
    if (page != 1) {
      setPage(1);
    }
  }, [filterProjectOptions])

  const deleteFunction = (id: number, email: string, table: string) => {
    deleteFavorite(id);
  }
  const addFunction = (email: string, id: number, table: string) => {
    addFavorite(id);
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
                <Tooltip placement="top" title={<p className="main-map-list-name-popover-text"> <b>{d.rowLabel}</b> <br /> <b>Project ID: </b> {d.project_id} <br /> <b>OnBase Project Number: </b> {d.on_base?d.on_base:"-"}</p>}>
                  <p onClick={() => {
                    setDetailOpen(true); 
                    setDataDetail(d) 
                  }} className="title-project" >{d.rowLabel}</p>
                </Tooltip>
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
                    openGroups[index]
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
