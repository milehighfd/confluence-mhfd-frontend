import React, { useEffect, useState } from 'react';
import { GOVERNMENT_STAFF } from 'constants/constants';
import { useProfileState } from 'hook/profileHook';
import { AutoComplete, Input } from 'antd';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

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
    filterMap,
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
    setLocalityType,
    setTabKey,
    setIsOnSelected,
    loadColumns,
  } = useRequestDispatch();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [dropdownSelected, setDropdownSelected] = useState();
  const renderOption = (item: string) => {
    return {
      key: `${item}|${item}`,
      value: item,
      label: item
    };
  };
  useEffect(() => {
    updateFilterSelected(dropdownSelected);
  }, [filterMap])

  const updateFilterSelected = (value: any) => {
    if (filterMap && value) {
      const jurisdictionFilterList = [true];
      filterMap?.project_local_governments.map((r: any, index: any) => {
        jurisdictionFilterList[index] = true
      });
      const priorityFilterList = [true, true, true, true, true];
      setJurisdictionSelected(jurisdictionFilterList);
      setPrioritySelected(priorityFilterList);
      if (value && value.includes('County')) {
        const valueName = value.replace('County', '').trim();
        let filterSelected = [false];
        filterMap?.project_counties.map((p: any, index: number) => {
          if (p.county_name === valueName) {
            filterSelected[index] = true;
          } else {
            filterSelected[index] = false;
          }
        })
        setCountiesSelected(filterSelected);
      }
      if (value && value.includes('Service Area')) {
        const valueName = value.replace('Service Area', '').trim();
        let filterSelected = [false];
        filterMap?.project_service_areas.map((p: any, index: number) => {
          if (p.service_area_name === valueName) {
            filterSelected[index] = true;
          } else {
            filterSelected[index] = false;
          }
        })
        setServiceAreasSelected(filterSelected)
      }
      loadColumns(namespaceId)
    }
  }

  const onSelect = async (value: any) => {
    setDropdownSelected(value);
    setShowAnalytics(false);
    setShowBoardStatus(false);
    setIsOnSelected(true);
    setLocality(value);
    setLocalityFilter(value);
    setPrioritySelected([]);
    setJurisdictionSelected([]);
    setCountiesSelected([]);
    setServiceAreasSelected([]);
    updateFilterSelected(value);
    let l = localities.find((p: any) => {
      return p.name === value;
    })
    console.log('Locality', l);
    if (l) {
      setLocalityType(l.table);
      if (type === 'WORK_PLAN') {
        let displayedTabKey: string[] = [];
        if (year < 2022) {
          if (l.table === 'CODE_STATE_COUNTY') {
            displayedTabKey = ['Capital', 'Maintenance']
          } else if (l.table === 'CODE_SERVICE_AREA') {
            displayedTabKey = ['Study', 'Acquisition', 'R&D'];
          }
        } else {
          if (l.table === 'CODE_STATE_COUNTY') {
            displayedTabKey = ['Capital', 'Maintenance', 'Acquisition', 'R&D']
          } else if (l.table === 'CODE_SERVICE_AREA') {
            displayedTabKey = ['Study'];
          }
        }
        if (l.name === 'MHFD District Work Plan' || l.name === 'Mile High Flood District') {
          displayedTabKey = tabKeys;
        }
        if (l.name.includes('South Platte River County')) {
          displayedTabKey = tabKeys;
          setTabKey(displayedTabKey[0]);
        }

        if (!displayedTabKey.includes(tabKey)) {
          setTabKey(displayedTabKey[0]);
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

  return (
    <div className="auto-complete-map">
      {
        userInformation.designation !== GOVERNMENT_STAFF ? (
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
  )
};

export default AutoCompleteDropdown;
