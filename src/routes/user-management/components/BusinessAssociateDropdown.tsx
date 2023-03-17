import React, { useEffect, useState } from "react";
import { AutoComplete } from 'antd';


const BusinessAssociatesDropdown = ({
  businessAssociate,
  setSelectAssociate,
  setAssociateLabel,
  associateLabel,
  setPrimary,
  setContactLabel,
}: {
  businessAssociate: any,
  setSelectAssociate: any,
  setAssociateLabel: any,
  associateLabel: any,
  setPrimary: any,
  setContactLabel: any
}) => {

  const [menu, setMenu] = useState<any>([]);
  const [keyword, setKeyword] = useState(associateLabel);
  const [dataMenu, setDataMenu] = useState<any>([]);

  const onSelect = (value: any) => {
    console.log(value);
    setSelectAssociate(value);
    setAssociateLabel((dataMenu.find((elm: any) => +elm.key === +value))?.label);
    setContactLabel('')
    setKeyword((dataMenu.find((elm: any) => +elm.key === +value))?.label);  
    setPrimary((dataMenu.find((elm: any) => +elm.key === +value))?.primary_business_associate_contact_id);
  }

  const onSearch = (value: string) => {
    console.log(value);
    setKeyword(value);
  }

  useEffect(() => {
    const m: any[] = [], dm: any[] = [];
    businessAssociate.forEach((element: any) => {
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
  }, [businessAssociate]);
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