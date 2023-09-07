import React, { useEffect, useState } from 'react';
import { GOVERNMENT_STAFF, WORK_PLAN } from 'constants/constants';
import { useProfileState } from 'hook/profileHook';
import { AutoComplete, Input } from 'antd';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { YEAR_LOGIC_2024, YEAR_LOGIC_2022, MMFD_LOCALITY, MMFD_LOCALITY_TYPE, WORK_PLAN_TAB } from 'constants/constants';
import { postData } from 'Config/datasets';
import { GET_STATUS } from 'Config/endpoints/board';
import { useMapState } from 'hook/mapHook';
import { SERVER } from 'Config/Server.config';
import * as datasets from "../../../Config/datasets";

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
    locality,
    boardStatus,
    filterRequest,
    namespaceId
  } = useRequestState();
  const {
    tabActiveNavbar,
  } = useMapState();
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
    setIsOnSelected,
    setFilterRequest,
    loadColumns,
    setDisableFilterComponent
  } = useRequestDispatch();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [inputClassName, setInputClassName] = useState('not-approved');
  const [localityStatus, setLocalityStatus] = useState([]);
  const renderOption = (item: string) => {
    return {
      key: `${item}|${item}`,
      value: item,
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {localityStatus.find((c: any) => c.locality === item && c.status === 'Approved') ?
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#28c499',
                marginRight: '10px',
              }}
            ></div> : <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#ffdd00',
                marginRight: '10px',
              }}
            ></div>}
          {item}
        </div>
      )
    };
  };
  useEffect(() => {
    if (type === WORK_PLAN_TAB) {
      if (year >= YEAR_LOGIC_2024) {
        setLocalityFilter(MMFD_LOCALITY);
        setLocalityType(MMFD_LOCALITY_TYPE);
        setLocality('MHFD District Work Plan');
      } else {
        setDisableFilterComponent(false,'county')
        setDisableFilterComponent(false,'service_area')        
      }
    }
  }, [year]);

  const onSelect = async (value: any) => {
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
    } else {
      setLocality(value); // Implemented for WR functionality
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
          loadColumns();
        }else{
          setDisableFilterComponent(false,'county')
          setDisableFilterComponent(false,'service_area')
        }
      }
    }
  };

  useEffect(() => {
    if (tabActiveNavbar !== WORK_PLAN || year < YEAR_LOGIC_2024) {
      if (boardStatus === 'Approved') {
        setInputClassName('approved');
      } else {
        setInputClassName('not-approved');
      }
    } else {
      const getMhfdDistrictWorkPlan = async () => {
        let mhfdStatus;
        try {
          mhfdStatus = await postData(GET_STATUS, {
            type: WORK_PLAN,
            year: `${year}`,
            locality: 'MHFD District Work Plan',
          });
        } catch (error) {
          console.log(error);
        }
        if (mhfdStatus.status === 'Approved') {
          setInputClassName('approved');
        } else {
          setInputClassName('not-approved');
        }
      };
      getMhfdDistrictWorkPlan();
    }
  }, [boardStatus, tabActiveNavbar, year, localityFilter]);

  useEffect(() => {
    const localities = dataAutocomplete.map((l: any) => {
      if (l.name === 'Mile High Flood District'){
        return { ...l, name: 'MHFD District Work Plan' };
      }
      return l;
    });
    const boardsInfo = {
      type: type,
      year: `${year}`,
      localities: localities,
      projecttype: namespaceId.projecttype,
    }
    datasets.postData(SERVER.GET_STATUS_BOARD, boardsInfo).then(data => {
      setLocalityStatus(data);
    });
  }, [namespaceId]);

  const prefix = <i className="mdi mdi-circle" style={{ marginLeft: '-6px', zIndex: '3' }}></i>;
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
            options={ dataAutocomplete.map(renderOption)}
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
  );
};

export default AutoCompleteDropdown;
