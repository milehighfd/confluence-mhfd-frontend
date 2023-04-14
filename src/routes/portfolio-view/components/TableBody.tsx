import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Collapse, Dropdown, Input, AutoComplete, Menu, Popover, Row, Select, Tabs, Table } from 'antd';
import { DownOutlined, HeartFilled, HeartOutlined, InfoCircleOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import DetailModal from "routes/detail-page/components/DetailModal";
import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER } from "constants/constants";
import * as datasets from "../../../Config/datasets";
import { useMapDispatch } from "hook/mapHook";
import { SERVER } from 'Config/Server.config';
import { AllHeaderTable, AllValueTable, CIPHeaderTable, CIPValueTable, DIPHeaderTable, DIPValueTable, PlanningHeaderTable, PlanningValueTable, PropertyAcquisitionHeaderTable, PropertyAcquisitionValueTable, RDHeaderTable, RDValueTable, RestorationHeaderTable, RestorationValueTable } from "../constants/tableHeader";
import { getCurrentProjectStatus, getServiceAreas, getStreams, getTotalEstimatedCost } from "utils/parsers";


const { TabPane } = Tabs;
const { Panel } = Collapse;
const tabKeys = ['Capital(67)', 'Study', 'Maintenance', 'Acquisition', 'Special'];
const popovers: any = [
  <div className="popoveer-00"><b>Capital:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
  <div className="popoveer-00"><b>Study:</b> Master plans that identify problems and recommend improvements.</div>,
  <div className="popoveer-00"><b>Maintenance:</b> Restore existing infrastructure eligible for MHFD participation.</div>,
  <div className="popoveer-00"><b>Acquisition:</b> Property with high flood risk or needed for improvements.</div>,
  <div className="popoveer-00"><b>Special:</b> Any other effort for which MHFD funds or staff time is requested.</div>
]
const TableBody = ({
    currentGroup,
    dataId,  
    tabKey,
}: {
  currentGroup: any,
  dataId: any,  
  tabKey: any,
}) => {
    console.log(currentGroup)
  const [dataTable, setDataTable] = useState([]);
  const [dataParsed, setDataParsed] = useState([]);
  useEffect(() => {
    datasets.postData(SERVER.GET_LIST_PMTOOLS_PAGE(currentGroup,dataId)+`?page=1&limit=2` ,{}).then((res: any) => {
      setDataTable(res)
      setDataParsed(res.map((x:any)=>{
        return {
          on_base: x?.onbase_project_number,
          project_type: x?.code_project_type?.project_type_name,
          status: getCurrentProjectStatus(x)?.code_phase_type?.code_status_type?.status_name || '',
          project_status: x?.project_statuses?.filter((ps: any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4 && ps?.code_phase_type?.phase_ordinal_position !== -1),
          phase: getCurrentProjectStatus(x)?.code_phase_type?.phase_name,
          phaseId: getCurrentProjectStatus(x)?.code_phase_type_id,
          mhfd:  x?.project_staffs.reduce((accumulator: string, pl: any) => {
            const sa = pl?.mhfd_staff?.full_name || '';
            const sa1 = pl?.code_project_staff_role_type_id || '';
            let value = accumulator;
            if (sa && sa1 === 1) {
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
        }
      }))
    })
  }, [currentGroup])  
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

  
  return <>
    <Row>
      <Col xs={{ span: 10 }} lg={{ span: 5 }}>
        {
          dataTable.map((d: any, index_elem: number) => (
            <div className="text-search" key={d.id} id={d.id}
              onMouseEnter={(e: any) => {
                //setHoverTable(elem.values[index_elem].project_id)
              }}>
              <p onClick={() => {
                // setDetailOpen(true); 
                // setDataDetail(d) 
              }} className="title-project" >{d.project_name}</p>
              {/* {d.isFavorite ? <HeartFilled style={{ marginLeft: '7px', color: '#F5575C', marginRight: '10px' }} onClick={() => (deleteFunction(d.project_id, email, ''))} /> : <HeartOutlined style={{ marginLeft: '7px', color: '#706B8A', marginRight: '10px' }} onClick={() => addFunction(email, d.project_id, '')} />} */}
              <HeartOutlined style={{marginLeft:'7px', color:'#706B8A', marginRight:'10px'}} />
            </div>
          ))
        }
      </Col>
      <Col xs={{ span: 34 }} lg={{ span: 19 }}>
        {<>
          <div
            className="table-body-body"
            // id={`listView_${index}`}
            // ref={el => (divRef.current[index] = el)}
            // onScrollCapture={(e: any) => {
            //   let dr: any = divRef.current[index];
            //   if (searchRef.current[index] && tableRef.current) {
            //     searchRef.current[index].scrollTo(dr.scrollLeft, dr.scrollTop);
            //     tableRef.current.scrollTo(dr.scrollLeft, 0);
            //   }
            // }}
          >
            <div className="scroll-table">
              <div
                className="line-table"
                onMouseEnter={e => {
                  //setHoverTable(-1)
                }}
              ></div>
              <Table
                showHeader={false}
                //key={elem.id}
                columns={ValueTabsValue()}
                dataSource={dataParsed}
                pagination={false}
              />
            </div>
          </div>          
        </> 
        }
      </Col>
    </Row>    
  </>
};

export default TableBody;