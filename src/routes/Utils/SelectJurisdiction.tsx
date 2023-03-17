import { Select } from "antd";
import React, { useEffect, useState } from "react";
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";

const SelectJurisdiction = ({
  setJurisdiction,
  disable,
  defaultValue,
  value
}: {
  setJurisdiction: Function,
  disable? : boolean,
  defaultValue : string,
  value?: string
}) => {
  const [jurisdictionList, setJurisdictionList] = useState<any[]>([]); 
  useEffect(() => {    
    datasets.getData(`${SERVER.ALL_GROUP_ORGANIZATION}`)
      .then((rows) => {
        setJurisdictionList(rows.jurisdiction.map((item: any) => {
            return { key: item.code_local_government_id, value: item.local_government_name, label : item.local_government_name }
        }).filter((data:any)=>!!data.value));
      })
      .catch((e) => {
        console.log(e);
      })             
  }, []);
  if(value === ''){
    value = undefined;
  }

  return (
    <Select value={value} onChange={(value) => setJurisdiction(value)} disabled={disable} options={jurisdictionList}  placeholder={defaultValue} style={{ width: '100%', marginBottom:'20px'  }} getPopupContainer={(trigger:any) => trigger.parentNode}/>

  )
};

export default SelectJurisdiction;