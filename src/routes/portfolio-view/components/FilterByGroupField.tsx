import React, { useEffect, useState } from "react";
import { Menu } from 'antd';
import { getGroupList } from "./ListUtils";
import { useMapDispatch } from "hook/mapHook";

const JURISDICTION = 'jurisdiction',
COUNTY = 'county', SERVICE_AREA = 'servicearea', CONSULTANT = 'consultant',
CONTRACTOR = 'contractor', STAFF = 'staff';
export const FilterByGroupName = ({
  setFilterby, setFiltervalue, setFiltername, isPortfolio
}: {
  setFilterby: Function,
  setFiltervalue: Function,
  setFiltername: Function,
  isPortfolio: Boolean
}) => {
  const {    
    resetFilterProjectOptionsEmpty,
  } = useMapDispatch();
  const [serviceAreaList, setServiceAreaList] = useState([]);
  const [countyList, setCountyList] = useState([]);
  const [jurisdictionList, setJurisdictionList] = useState([]);
  const [consultantList, setConsultantList] = useState([]);
  const [contractorList, setContractorList] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [activeDrop, setActiveDrop] = useState('MHFD District Plan');
  const [visibleItems, setVisibleItems] = useState<any>([]);

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
          setActiveDrop(filterby);
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
    getGroupList(STAFF).then((valuesGroups) => {
      const groups = valuesGroups.groups;
      setStaffList(parseToMenuItem(groups, STAFF));
    });
    if ( isPortfolio) {
      getGroupList(CONSULTANT).then((valuesGroups) => {
        const groups = valuesGroups.groups;
        setConsultantList(parseToMenuItem(groups, CONSULTANT));
      });
      getGroupList(CONTRACTOR).then((valuesGroups) => {
        const groups = valuesGroups.groups;
        setContractorList(parseToMenuItem(groups, CONTRACTOR));
      });
    }
    
  }, []);
  useEffect(() => {
    const items = [
      {
        key: '-1',
        label: <span onClick={()=>{setActiveDrop('MHFD District Plan');}}>Mile High Flood District</span>,
        onClick: () => {
          setFilterby('');
          setFiltervalue(-1);
          setFiltername('Mile High Flood District');
          resetFilterProjectOptionsEmpty();
        },
        className: activeDrop === 'MHFD District Plan' ? 'menu-active menu-drop-sub-sub' :'menu-drop-sub-sub',
      },
      {
        key: '1',
        label: 'MHFD Lead',
        className: activeDrop === 'MHFD Lead' ? 'menu-active menu-drop-sub-sub' :'menu-drop-sub-sub',
        children: staffList,
      },
      {
        key: '2',
        label: 'Service Area',
        children: serviceAreaList,
        className: activeDrop === 'servicearea' ? 'menu-active-active' :'',
      },
      {
        key: '3',
        label: 'County',
        children: countyList,
        className: activeDrop === 'county' ? 'menu-active-active ' :'',
      },
      {
        key: '4',
        label: 'Local Government',
        children: jurisdictionList,
        className: activeDrop === 'jurisdiction' ? 'menu-active-active' :'',
      }
    ];
    if (isPortfolio) {
      items.push(
        {
          key: '5',
          label: 'Consultant',
          children: consultantList,
          className: activeDrop === 'consultant' ? 'menu-active-active' :'',
        },
        {
          key: '6',
          label: 'Contractor',
          children: contractorList,
          className: activeDrop === 'contractor' ? 'menu-active-active' :'',
      });
    }
    setVisibleItems(items);
  }, [
    serviceAreaList,
    countyList,
    jurisdictionList,
    consultantList,
    contractorList,
    staffList
  ]); 

  return (
    <Menu
      className="menu-drop"
      items={visibleItems}
    />
  );
}