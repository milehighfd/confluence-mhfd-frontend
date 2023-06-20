import React, { useState } from 'react';
import { GOVERNMENT_STAFF } from 'constants/constants';
import { useProfileState } from 'hook/profileHook';
import { AutoComplete, Input } from 'antd';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { useLocation } from 'react-router-dom';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const AutoCompleteDropdown = () => {
  const location = useLocation();
  const type = location.pathname === '/work-request' ? 'WORK_REQUEST' : 'WORK_PLAN';
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
  } = useRequestState();
  const {
    setShowAnalytics,
    setShowBoardStatus,
    setLocality,
    setLocalityFilter,
    setPrioritySelected,
    setLocalityType,
    setTabKey,
    setIsOnSelected,
  } = useRequestDispatch();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const renderOption = (item: string) => {
    return {
      key: `${item}|${item}`,
      value: item,
      label: item
    };
  };

  const onSelect = (value: any) => {
    setShowAnalytics(false);
    setShowBoardStatus(false);
    setLocality(value);
    setIsOnSelected(true);
    setLocalityFilter(value);
    setPrioritySelected(['1', '2', '3', 'Over 3', 'Work Plan']);
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
            options={renderOption.length > 0 ? [...dataAutocomplete.map(renderOption), {}]: dataAutocomplete.map(renderOption)}
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
