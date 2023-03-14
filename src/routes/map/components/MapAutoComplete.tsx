import React, { useEffect, useRef, useState } from 'react';
import { AutoComplete, Col, Input, Row } from 'antd';
import { useProfileState } from '../../../hook/profileHook';
import { useMapState } from '../../../hook/mapHook';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const MapAutoComplete = ({
  onAutoCompleteSelected
}: {
  onAutoCompleteSelected: Function
}) => {
  const { nameZoomArea } = useMapState();
  const { groupOrganization } = useProfileState();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [valueA, setvalueA] = useState('');
  const ref = useRef<any>(null);
  const [dataAutocomplete, setDataAutocomplete] = useState(groupOrganization.map((item: any) => {
    return { key: item.id, value: item.name, label: item.name }
  }));

  const onSelect = (value: any, isSelect?: any) => {
    setvalueA(value);
    onAutoCompleteSelected(value, isSelect);
  };
  useEffect(() => {
    setDataAutocomplete(groupOrganization.map((item: any) => {
      return { key: item.name, value: item.name, label: item.name }
    }));
  }, [groupOrganization]);

  useEffect(() => {
    console.log('name zoom area', nameZoomArea);
    if (nameZoomArea) {
      setvalueA(nameZoomArea);
    } else {
      setvalueA('Mile High Flood District');
    }
    
  }, [nameZoomArea]);
  return (
    <Row className="head-m mobile-display">
      <Col span={24} id="westminter">
        <div className="auto-complete-map" >
          <AutoComplete
            style={{ width: '200' }}
            options={dataAutocomplete}
            placeholder={nameZoomArea ? (nameZoomArea.endsWith(', CO') ? nameZoomArea.replace(', CO', '') : nameZoomArea) : 'Mile High Flood District'}
            filterOption={(inputValue, option: any) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
              if (dataAutocomplete.map((r: any) => r.key).includes(inputValue)) {
                return true;
              }
              return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
            }}
            onSelect={onSelect}
            value={valueA}
            onSearch={(input2: any) => {
              setvalueA(input2);
            }}
            open={dropdownIsOpen}
            onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
            onBlur={() => setDropdownIsOpen(false)}
          >
            <Input
            ref={ref}
              id={'miclase'}
              style={{  
                border: 'none',
                boxShadow: 'none',
                borderBottom: '1px solid rgba(37, 24, 99, 0.3)',
                marginRight: '-18px'
              }}
              
              suffix={
                dropdownIsOpen ?
                  <UpOutlined style={{ marginRight: '-18px' }}/> :
                  <DownOutlined style={{ marginRight: '-18px' }} />
              }
            />
          </AutoComplete>
        </div>
      </Col>
    </Row>
  );
};

export default MapAutoComplete;
