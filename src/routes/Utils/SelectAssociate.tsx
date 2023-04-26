import { Button, Col, Dropdown, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useProfileState } from "hook/profileHook";
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import { getGroupList } from "routes/portfolio-view/components/ListUtils";
import { useUsersDispatch } from "hook/usersHook";
import { User } from "Classes/User";
const CONSULTANT = 'consultant',
  CONTRACTOR = 'contractor';
const { Option } = Select;
const SelectAssociate = ({
  organization,
  setOrganization,
  disable,
  defaultValue,
  value
}: {
  organization: string,
  setOrganization: Function,
  disable?: boolean,
  defaultValue: string,
  value?: string
}) => {
  const {
    saveUserActivated,
    saveUserPending,
    getUserActivity,
    getAllUserActivity
  } = useUsersDispatch();
  const [optionAssociate, setOptionAssociate] = useState<any[]>([]); 

  const getUser = () => {
    datasets.getData(SERVER.LIST_USERS_ACTIVATED , datasets.getToken()).then(res => {
      const arrayUsers = res.users.map((elem: any) => {
        return {
          associate: elem?.business_associate_contact?.business_address?.business_associate?.business_name,
          id_associate:elem?.business_associate_contact?.business_address?.business_associate?.business_associates_id,
        }
      }); 
      const arrayUsersFiltered = arrayUsers.filter((elem: any) => elem.associate !== undefined);
      const uniqueValues = Array.from(new Set(arrayUsersFiltered.map((elem: any) => elem.associate)))
      const uniqueIds = Array.from(new Set(arrayUsersFiltered.map((elem: any) => elem.id_associate)))
      if (uniqueValues.length === uniqueIds.length) {
        const uniqueValuesAndIds = uniqueValues.map((elem: any, index: number) => {
          return {
            key: uniqueIds[index],
            value: uniqueIds[index],
            label: elem,        
          }
        })      
        setOptionAssociate(uniqueValuesAndIds);        
      }      
    });
  }
  useEffect(() => {
    getUser();
  }, []);
  if (value === '') {
    value = undefined;
  }

  function isNull(text: string) {
    if (!text) {
      return ("-")
    } else {
      return (text)
    }
  }

  return (
    <Select value={value} disabled={disable} onChange={(value) => setOrganization(value)} options={optionAssociate} placeholder={defaultValue} style={{ width: '100%', marginBottom: '20px' }} getPopupContainer={(trigger: any) => trigger.parentNode} />
  )
};

export default SelectAssociate;