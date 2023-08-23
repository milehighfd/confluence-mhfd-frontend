import React, { useEffect, useState } from "react";
import { AutoComplete } from 'antd';

const windowWidth: any = window.innerWidth;

const BusinessAssociatesDropdown = ({
  businessAssociate,
  designation,
  setSelectAssociate,
  setAssociateLabel,
  associateLabel,
  setPrimary,
  setContactLabel,
  setCreateAdress,
  setCreateContact,
  setDisableAdress,
  setDisableContact,
  setDisabled,
  setAddressLabel,
  setCreateAssociate,
  setCleanRecord,
}: {
  businessAssociate: any,
  designation: any,
  setSelectAssociate: any,
  setAssociateLabel: any,
  associateLabel: any,
  setPrimary: any,
  setContactLabel: any,
  setCreateAdress: any,
  setCreateContact: any,
  setDisableAdress: any,
  setDisableContact: any,
  setDisabled: any,
  setAddressLabel: any,
  setCreateAssociate: any,
  setCleanRecord: any,
}) => {
  const [menu, setMenu] = useState<any>([]);
  const [keyword, setKeyword] = useState(associateLabel);
  const [dataMenu, setDataMenu] = useState<any>([]);

  const onSelect = (value: any) => {
    if (value === -1) {
      setCreateAssociate(true);
    }else{
      setCreateAssociate(false);
    }
    setSelectAssociate(value);
    setAssociateLabel(value === -1 ? 'Add Business Associate' : (dataMenu.find((elm: any) => +elm.key === +value))?.label);
    setContactLabel('')
    setAddressLabel('')
    setKeyword(value === -1 ? 'Add Business Associate' : (dataMenu.find((elm: any) => +elm.key === +value))?.label);
    setPrimary((dataMenu.find((elm: any) => +elm.key === +value))?.primary_business_associate_contact_id);
    setCreateAdress(false);
    setCreateContact(false);
    setDisableAdress(false);
    setDisableContact(false);
    setDisabled(false);
    setCleanRecord(true);
  }

  const onSearch = (value: string) => {
    setKeyword(value);
  }

  useEffect(() => {
    const m: any[] = [
      {
        key: -1,
        label: <span style={{border:'transparent'}}>Add Business Associate</span>,
        value: -1
      }
    ], dm: any[] = [];
    let array = businessAssociate;
    if (designation === 'government_staff') {
      const LOCAL_GOVERNMENT = 3;
      array = businessAssociate.filter((element: any) => element.code_business_associates_type_id === LOCAL_GOVERNMENT);
      console.log(array);
    }
    array.sort((a: any, b: any) => a.label.localeCompare(b.label));
    array.forEach((element: any) => {
      m.push({
        key: element.key,
        label: <span style={{border:'transparent'}}>{element.label}</span>,
        value: element.key
      });
      dm.push({
        ...element
      });
    });
    setMenu(m);
    setDataMenu(dm);
    setKeyword(associateLabel)
  }, [businessAssociate, designation]);
  useEffect(() => {   
    setKeyword(associateLabel)
  }, [associateLabel]);
  return <>
    <AutoComplete
      dropdownMatchSelectWidth={true}
      style={{ width: '100%' }}
      options={menu}
      onSelect={onSelect}
      onSearch={onSearch}
      value={keyword}
      // filterOption={(inputValue: any, option: any) => {
      //     const element = dataMenu.find((el: any) => +el.key === option.key)?.label || '';
      //     return element.toUpperCase().includes(inputValue.toUpperCase());;
      //   }
      // }
      placeholder="Select Business Associates"
      listHeight={windowWidth > 2554 ? (windowWidth > 3799 ? 500 : 320) : 256}
    />
  </>
};

export const BusinessAssociatesDropdownMemoized = React.memo(BusinessAssociatesDropdown);
