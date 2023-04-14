import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Collapse, Dropdown, Input, AutoComplete, Menu, Popover, Row, Select, Tabs } from 'antd';
import { DownOutlined, HeartFilled, HeartOutlined, InfoCircleOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import DetailModal from "routes/detail-page/components/DetailModal";
import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER } from "constants/constants";
import * as datasets from "../../../Config/datasets";
import { useMapDispatch } from "hook/mapHook";
import { SERVER } from 'Config/Server.config';

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
}: {
  currentGroup: any,
  dataId: any,  
}) => {
    console.log(currentGroup)
  const [dataTable, setDataTable] = useState([]);
  useEffect(() => {
    datasets.postData(SERVER.GET_LIST_PMTOOLS_PAGE(currentGroup,dataId)+`?page=1&limit=2` ,{}).then((res: any) => {
      setDataTable(res)
    })
    console.log(dataTable)
  }, [currentGroup])  
  
  return <>    
          {
            dataTable.map((d: any, index_elem: number) => (
              <div className="text-search" key={d.id} id={d.id}
                onMouseEnter={(e: any) => {
                  //setHoverTable(elem.values[index_elem].project_id)
                }}>
                <p onClick={() => {
                  // setDetailOpen(true); 
                  // setDataDetail(d) 
                }} className="title-project" >{d.project_id}</p>
                {/* {d.isFavorite ? <HeartFilled style={{ marginLeft: '7px', color: '#F5575C', marginRight: '10px' }} onClick={() => (deleteFunction(d.project_id, email, ''))} /> : <HeartOutlined style={{ marginLeft: '7px', color: '#706B8A', marginRight: '10px' }} onClick={() => addFunction(email, d.project_id, '')} />} */}
                {/* <HeartOutlined style={{marginLeft:'7px', color:'#706B8A', marginRight:'10px'}} onClick={()=>(setLikeActive([0, index , index_elem]))}/> */}
              </div>
            ))
          }        
  </>
};

export default TableBody;