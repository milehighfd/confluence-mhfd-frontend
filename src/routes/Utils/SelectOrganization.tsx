import { Button, Col, Dropdown, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useProfileState } from "hook/profileHook";
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import { getGroupList } from "routes/portfolio-view/components/ListUtils";
const CONSULTANT = 'consultant',
CONTRACTOR = 'contractor';
const { Option } = Select;
const SelectOrganization = ({
  organization,
  setOrganization,
  disable,
  defaultValue,
  value
}: {
  organization: string,
  setOrganization: Function,
  disable? : boolean,
  defaultValue : string,
  value?: string
}) => {
  const [countyList, setCountyList] = useState<any[]>([]);
  const [jurisdictionList, setJurisdictionList] = useState<any[]>([]);  
  const [consultantList, setConsultantList] = useState([]);
  const [contractorList, setContractorList] = useState([]);
  const [optionCounty, setOptionCounty] = useState({})
  const [optionJurisdiction, setOptionJurisdiction] = useState({})
  const [optionConsultant, setOptionConsultant] = useState({})
  const [optionContractor, setOptionContractor] = useState({}) 
  useEffect(() => {    
    datasets.getData(`${SERVER.ALL_GROUP_ORGANIZATION}`)
      .then((rows) => {
        setCountyList(rows.county.map((item: any) => {
          return { key: item.state_county_id , value : item.county_name, label : item.county_name }
        }).filter((data:any)=>!!data.value));
        setJurisdictionList(rows.jurisdiction.map((item: any) => {
          return { key: item.code_local_government_id , value: item.local_government_name, label : item.local_government_name }
        }).filter((data:any)=>!!data.value));       
        getGroupList(CONSULTANT).then((valuesGroups) => {
          const groups = valuesGroups.groups;
          setConsultantList(groups.map((item: any) => {
            return { key: item.id, value: item.name, label : item.name }
          }).filter((data:any)=>!!data.value));
        });
        getGroupList(CONTRACTOR).then((valuesGroups) => {
          const groups = valuesGroups.groups; 
          setContractorList(groups.map((item: any) => { 
            return { key: item.id, value: item.name, label : item.name } 
          }).filter((data:any)=>!!data.value));
        });                
      })
      .catch((e) => {
        console.log(e);
      })             
  }, []);

  useEffect(() => {   
    let userTestStatus: { label:string, options: Array<{key: number, value: string , label : string}> }[] = [
      {label:"Jurisdiction",options:jurisdictionList}      
    ];
    const jurisdiction = {label : "Jurisdiction",options:jurisdictionList}
    const county = {label : "County" , options:countyList }
    const consultant = {label:"Consultant",options:consultantList}
    const contractor = {label:"Contractor",options:contractorList}
    setOptionCounty(county);
    setOptionJurisdiction(jurisdiction);
    setOptionConsultant(consultant);
    setOptionContractor(contractor);
  }, [jurisdictionList,countyList,consultantList,contractorList]);

  function isNull(text: string) {
    if(!text){
      return ("-")
    }else{
      return (text)
    }
  }   

  return (
    <Select value={value} disabled={disable} onChange={(value) => setOrganization(value)} options={[optionCounty, optionJurisdiction, optionConsultant, optionContractor]} placeholder={defaultValue} style={{ width: '100%', marginBottom: '20px' }} getPopupContainer={(trigger: any) => trigger.parentNode}>
      <Select.Option value="MHFD District Boundary">{isNull(organization)}</Select.Option>
    </Select>
  )
};

export default SelectOrganization;