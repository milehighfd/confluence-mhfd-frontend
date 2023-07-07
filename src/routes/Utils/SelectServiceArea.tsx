import { Button, Col, Dropdown, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useProfileState } from "hook/profileHook";
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import { getGroupList } from "routes/portfolio-view/components/ListUtils";
import { WINDOW_WIDTH } from "constants/constants";
const CONSULTANT = 'consultant',
CONTRACTOR = 'contractor';
const { Option } = Select;
const SelectServiceArea = ({
  serviceArea,
  setServiceArea,
  disable,
  defaultValue,
  value
}: {
  serviceArea: string,
  setServiceArea: Function,
  disable? : boolean,
  defaultValue : string,
  value?: string
}) => {
  const [serviceAreaList, setServiceAreaList] = useState<any[]>([]); 
  useEffect(() => {    
    datasets.getData(`${SERVER.ALL_GROUP_ORGANIZATION}`)
      .then((rows) => {
        setServiceAreaList(rows.servicearea.map((item: any) => {
            return { key: item.code_service_area_id, value: item.service_area_name, label : item.service_area_name }
        }).filter((data:any)=>!!data.value));
      })
      .catch((e) => {
        console.log(e);
      })             
  }, []);
  if(value === ''){
    value = undefined;
  }

  function isNull(text: string) {
    if(!text){
      return ("-")
    }else{
      return (text)
    }
  }   

  return (
    <Select
      value={value}
      onChange={(value) => setServiceArea(value)}
      disabled={disable} options={serviceAreaList}
      listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
      placeholder={defaultValue}
      style={{ width: '100%', marginBottom:'20px'  }}
      getPopupContainer={(trigger:any) => trigger.parentNode}/>

  )
};

export default SelectServiceArea;