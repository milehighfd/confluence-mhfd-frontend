import React, { useEffect, useState } from 'react';
import { GOVERNMENT_STAFF, WORK_PLAN, WORK_REQUEST } from 'constants/constants';
import { useProfileState } from 'hook/profileHook';
import { AutoComplete, Input } from 'antd';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { YEAR_LOGIC_2024, YEAR_LOGIC_2022, MMFD_LOCALITY, MMFD_LOCALITY_TYPE, WORK_PLAN_TAB } from 'constants/constants';

const windowWidth: any = window.innerWidth;

const AutoCompleteDropdown = (
  {
    type,
  }: {
    type: string,
  }
) => {
  const { userInformation } = useProfileState();
  const {
    dataAutocomplete,
    localityFilter,
    localities,
    year,
    tabKeys,
    tabKey,
    locality,
    boardStatus,
    filterRequest,
    namespaceId,    
  } = useRequestState();
  const {
    setShowAnalytics,
    setShowBoardStatus,
    setLocality,
    setLocalityFilter,
    setPrioritySelected,
    setJurisdictionSelected,
    setCountiesSelected,
    setServiceAreasSelected,
    setProjectStatusesSelected,
    setIsLocatedInSouthPlateRiverSelected,
    setLocalityType,
    setTabKey,
    setIsOnSelected,
    setFilterRequest,
    loadColumns,
    setDisableFilterComponent
  } = useRequestDispatch();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [dropdownSelected, setDropdownSelected] = useState('');
  const renderOption = (item: string) => {
    return {
      key: `${item}|${item}`,
      value: item,
      label: item
    };
  };
  useEffect(() => {
    if (type === WORK_PLAN_TAB) {
      if (year >= YEAR_LOGIC_2024) {
        setDropdownSelected(MMFD_LOCALITY)
        setLocalityFilter(MMFD_LOCALITY);
        setLocalityType(MMFD_LOCALITY_TYPE);
        setTabKey(tabKeys[0]);
      } else {
        setDisableFilterComponent(false,'county')
        setDisableFilterComponent(false,'service_area')        
      }
    }
  }, [year]);

  const onSelect = async (value: any) => {
    setDropdownSelected(value);
    setShowAnalytics(false);
    setShowBoardStatus(false);
    setIsOnSelected(true);
    setLocalityFilter(value);
    setPrioritySelected([]);
    setJurisdictionSelected([]);
    setCountiesSelected([]);
    setServiceAreasSelected([]);
    setProjectStatusesSelected([])
    setIsLocatedInSouthPlateRiverSelected([]);
    let l = localities.find((p: any) => {
      return p.name === value;
    })
    if (type === WORK_PLAN_TAB) {
      if (year < YEAR_LOGIC_2024) {
        setLocality(value);        
      }else{
        let filterRequestReset = filterRequest.map((f: any) => {
          if (l.table === 'CODE_STATE_COUNTY') {
            if (f.name === l.name.replace(' County', '')) {
              setDisableFilterComponent(true,'county')
              setDisableFilterComponent(false,'service_area')
              f.selected = true;
            } else {
              f.selected = false;
            }
          } else if (l.table === 'CODE_SERVICE_AREA') {
            if (f.name === l.name.replace(' Service Area', '')) {
              setDisableFilterComponent(true,'service_area')
              setDisableFilterComponent(false,'county')
              f.selected = true;
            } else {
              f.selected = false;
            }
          }
          return f;
        });
        setFilterRequest(filterRequestReset);
      }
    }
    console.log('Locality', l);
    if (l) {
      setLocalityType(l.table);
      if (type === 'WORK_PLAN') {
        let displayedTabKey: string[] = [];
        if (year < YEAR_LOGIC_2022) {
          if (l.table === 'CODE_STATE_COUNTY') {
            displayedTabKey = ['Capital', 'Maintenance']
          } else if (l.table === 'CODE_SERVICE_AREA') {
            displayedTabKey = ['Study', 'Acquisition', 'R&D'];
          }
        } else {
          if(year < YEAR_LOGIC_2024){
            if (l.table === 'CODE_STATE_COUNTY') {
              displayedTabKey = ['Capital', 'Maintenance', 'Acquisition', 'R&D']
            } else if (l.table === 'CODE_SERVICE_AREA') {
              displayedTabKey = ['Study'];
            }
          }
        }
        if (l.name === 'MHFD District Work Plan' || l.name === 'Mile High Flood District') {
          let filterRequestReset = filterRequest.map((f: any) => {
            f.selected = false;
            return f;
          });
          setFilterRequest(filterRequestReset);
          displayedTabKey = tabKeys;
          setDisableFilterComponent(false,'county')
          setDisableFilterComponent(false,'service_area')
        }
        if(year >= YEAR_LOGIC_2024){
          loadColumns(namespaceId);
        }else{
          setDisableFilterComponent(false,'county')
          setDisableFilterComponent(false,'service_area')
        }
      } else {
        if (!tabKeys.includes(tabKey)) {
          setTabKey(tabKeys[0]);
        }
      }
    }
  };
  const prefix = <i className="mdi mdi-circle" style={{ marginLeft: '-6px', zIndex: '3' }}></i>;
  const inputClassName = boardStatus === 'Approved' ? 'approved' : 'not-approved';
  let showAllOptions = true;
  let isLocalGovernment = userInformation.designation === GOVERNMENT_STAFF;
  if (isLocalGovernment) {
    showAllOptions = type === WORK_PLAN;
  }

  return (
    <div className="auto-complete-map">
      {
        showAllOptions ? (
          <AutoComplete
            className={'ant-select-1'}
            options={renderOption.length > 0 ? [...dataAutocomplete.map(renderOption), {}] : dataAutocomplete.map(renderOption)}
            placeholder={localityFilter}
            filterOption={(inputValue, option: any) => {
              if (dataAutocomplete.includes(inputValue)) {
                return true;
              }
              if (!option.value) return false;
              return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
            }}
            onSelect={onSelect}
            value={localityFilter}
            onSearch={(input2: any) => {
              setLocalityFilter(input2);
              if (localities.map((r: any) => r.name).indexOf(input2) !== -1) {
                console.log('aquicambia');
setLocality(input2)
                setIsOnSelected(false);
                let l = localities.find((p: any) => {
                  return p.name === locality;
                })
                if (l) {
                  setLocalityType(l.table);
                }
              }
            }}
            open={dropdownIsOpen}
            onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
            onBlur={() => setDropdownIsOpen(false)}
            listHeight={windowWidth > 2554 ? (windowWidth > 3799 ? 500 : 320) : 256}
          >
            <Input
              className={inputClassName}
              prefix={prefix}
              suffix={
                dropdownIsOpen ? <UpOutlined style={{ marginRight: '-18px' }} /> : <DownOutlined style={{ marginRight: '-18px' }} />
              }
              style={{
                border: 'none',
                boxShadow: 'none',
                borderBottom: '1px solid rgba(37, 24, 99, 0.3)',
                marginRight: '-18px',
                marginLeft: '-6px'
              }}
            />
          </AutoComplete>
        ) : (
          <Input
            style={{ border: 'none' }}
            className={inputClassName}
            value={localityFilter}
            readOnly={true}
            prefix={prefix}
          />
        )
      }
    </div>
  );
};

export default AutoCompleteDropdown;
