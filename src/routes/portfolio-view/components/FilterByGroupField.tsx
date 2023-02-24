import React, { useEffect, useState } from "react";
import { Menu } from 'antd';
import { getGroupList } from "./ListUtils";

const STATUS = 'status', JURISDICTION = 'jurisdiction',
COUNTY = 'county', SERVICE_AREA = 'servicearea', CONSULTANT = 'consultant',
CONTRACTOR = 'contractor', STREAMS = 'streams';
export const FilterByGroupName = ({
  setFilterby, setFiltervalue, setFiltername
}: {
  setFilterby: Function,
  setFiltervalue: Function,
  setFiltername: Function
}) => {
  const [serviceAreaList, setServiceAreaList] = useState([]);
  const [countyList, setCountyList] = useState([]);
  const [jurisdictionList, setJurisdictionList] = useState([]);
  const [consultantList, setConsultantList] = useState([]);
  const [contractorList, setContractorList] = useState([]);

  const parseToMenuItem = (list: any, filterby: string) => {
    let post = '';
    if(filterby === COUNTY){
      post = 'County'
    }
    if(filterby === SERVICE_AREA){
      post = 'Service Area'
    }
    return list.map((element: any) => {
      return {
        key: `${filterby}-${element.id}`,
        label: <div onClick={(e) => {
          setFilterby(filterby);
          setFiltervalue(element.id);
          setFiltername(element.value);
        }} className="menu-drop-sub">{element.value +" "+ post}</div>,
        filterby: filterby,
        id: element.id,
      };
    });
  }
  
  useEffect(() => {
    getGroupList(SERVICE_AREA).then((valuesGroups) => {
      const groups = valuesGroups.groups;
      setServiceAreaList(parseToMenuItem(groups, SERVICE_AREA));
    });
    getGroupList(COUNTY).then((valuesGroups) => {
      const groups = valuesGroups.groups;
      setCountyList(parseToMenuItem(groups, COUNTY));
    });
    getGroupList(JURISDICTION).then((valuesGroups) => {
      const groups = valuesGroups.groups;
      setJurisdictionList(parseToMenuItem(groups, JURISDICTION));
    });
    getGroupList(CONSULTANT).then((valuesGroups) => {
      const groups = valuesGroups.groups;
      setConsultantList(parseToMenuItem(groups, CONSULTANT));
    });
    getGroupList(CONTRACTOR).then((valuesGroups) => {
      const groups = valuesGroups.groups;
      setContractorList(parseToMenuItem(groups, CONTRACTOR));
    });
  }, []);

  return (
    <Menu
      className="menu-drop"
      items={[
        {
          key: '-1',
          label: 'MHFD District Plan',
          onClick: () => {
            setFilterby('');
            setFiltervalue(-1);
            setFiltername('Mile High Flood District');
          },
          className:'menu-drop-sub-sub',
        },
        {
          key: '1',
          label: 'MHFD Lead/PM',
          className:'menu-drop-sub-sub',
          children: [
            {
              key: 'nodata',
              label: 'None',
              className:'menu-drop-sub-sub'
            }
          ],
        },
        {
          key: '2',
          label: 'Service Area',
          children: serviceAreaList
        },
        {
          key: '3',
          label: 'County',
          children: countyList,
        },
        {
          key: '4',
          label: 'Jurisdiction',
          children: jurisdictionList,
        },
        {
          key: '5',
          label: 'Consultant',
          children: consultantList,
        },
        {
          key: '6',
          label: 'Contractor ',
          children: contractorList,
        },
      ]}
    />
  );
}