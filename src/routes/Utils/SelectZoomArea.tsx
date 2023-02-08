import { Button, Col, Dropdown, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useProfileState, useProfileDispatch } from "hook/profileHook";
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import { getGroupList } from "routes/portfolio-view/components/ListUtils";

const CONSULTANT = 'consultant',
CONTRACTOR = 'contractor';
const { Option } = Select;
const SelectZoomArea = ({
  zoomArea,
  setZoomArea,
  disable,
  defaultValue,
  value
}: {
  zoomArea: string,
  setZoomArea: Function,
  disable? : boolean,
  defaultValue? : string,
  value?: string
}) => {
    const { userInformation: user } = useProfileState();
    const {getGroupOrganizationNoGeom} = useProfileDispatch();
    const { groupOrganization } = useProfileState();    
    const [dataAutocomplete, setDataAutocomplete] = useState(groupOrganization.map((item: any) => {
        return { key: item.id + item.name, value: item.name, label: item.name }
    }));
    useEffect(() => {
        getGroupOrganizationNoGeom();
    }, []);
    useEffect(() => {
        setDataAutocomplete(groupOrganization.map((item: any) => {
            return { key: item.id + item.name, value: item.name, label: item.name }
        }));
    }, [groupOrganization]);  
   
  if(value === ''){
    value = undefined;
  }


  return (
      <Select onChange={(value) => setZoomArea(value)} disabled={disable} options={dataAutocomplete} value={value} style={{ width: '100%', marginBottom: '20px' }} getPopupContainer={(trigger: any) => trigger.parentNode}>
          <Option value="Mile High Flood District">{value}</Option>
      </Select>
  )
};

export default SelectZoomArea;