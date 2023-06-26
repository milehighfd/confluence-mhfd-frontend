import React, { useEffect, useState } from "react";
import { AutoComplete } from 'antd';

const BusinessAssociatesDropdown = ({
  businessAssociate,
  designation,
  setSelectAssociate,
  setAssociateLabel,
  associateLabel,
  setPrimary,
  setContactLabel,
  setShowAdress,
  setCreateAdress,
  setCreateContact,
  setDisableAdress,
  setDisableContact,
}: {
  businessAssociate: any,
  designation: any,
  setSelectAssociate: any,
  setAssociateLabel: any,
  associateLabel: any,
  setPrimary: any,
  setContactLabel: any,
  setShowAdress: any,
  setCreateAdress: any,
  setCreateContact: any,
  setDisableAdress: any,
  setDisableContact: any,
}) => {
  const [menu, setMenu] = useState<any>([]);
  const [keyword, setKeyword] = useState(associateLabel);
  const [dataMenu, setDataMenu] = useState<any>([]);

  const onSelect = (value: any) => {
    setSelectAssociate(value);
    setAssociateLabel((dataMenu.find((elm: any) => +elm.key === +value))?.label);
    setContactLabel('')
    setKeyword((dataMenu.find((elm: any) => +elm.key === +value))?.label);  
    setPrimary((dataMenu.find((elm: any) => +elm.key === +value))?.primary_business_associate_contact_id);
    setShowAdress(true);
    setCreateAdress(false);
    setCreateContact(false);
    setDisableAdress(false);
    setDisableContact(false);
  }

  const onSearch = (value: string) => {
    setKeyword(value);
  }

  useEffect(() => {
    const m: any[] = [], dm: any[] = [];
    let array = businessAssociate;
    if (designation === 'government_staff') {
      const LOCAL_GOVERNMENT = 3;
      console.log('apply ');
      console.log(businessAssociate);
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
      filterOption={(inputValue: any, option: any) => {
          const element = dataMenu.find((el: any) => +el.key === option.key)?.label || '';
          return element.toUpperCase().includes(inputValue.toUpperCase());;
        }
      }
      placeholder="Select Business Associates"
    />
  </>
};

export const BusinessAssociatesDropdownMemoized = React.memo(BusinessAssociatesDropdown);
