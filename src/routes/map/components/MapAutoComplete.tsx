import React, { useEffect, useRef, useState } from 'react';
import { AutoComplete, Button, Col, Input, Row } from 'antd';
import { useProfileState } from '../../../hook/profileHook';
import { useMapState } from '../../../hook/mapHook';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const windowWidth: any = window.innerWidth;

const MapAutoComplete = ({
  onAutoCompleteSelected,
  selectView,
  setSelectView,
}: {
  onAutoCompleteSelected: Function,
  selectView: string,
  setSelectView: React.Dispatch<React.SetStateAction<string>>,
}) => {
  const { nameZoomArea } = useMapState();
  const { groupOrganization } = useProfileState();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [valueA, setvalueA] = useState('');
  const ref = useRef<any>(null);
  const [dataAutoCArray, setDataAutoCArray] = useState<any>([]);

  const onSelect = (value: any, isSelect?: any) => {
    setvalueA(value);
    onAutoCompleteSelected(value, isSelect);
  };
  useEffect(() => {
    setDataAutoCArray(groupOrganization.map((item: any) => {
      return item.name
    }));
  }, [groupOrganization]);

  useEffect(() => {
    if (nameZoomArea) {
      setvalueA(nameZoomArea);
    } else {
      setvalueA('Mile High Flood District');
    }
    
  }, [nameZoomArea]);

  const renderOption = (item: string) => {
    return {
      key: `${item}|${item}`,
      value: item,
      label: item
    };
  };

  return (
    <Row className="head-m mobile-display">
      <Col span={24} id="westminter">
        <div className="auto-complete-map" >
          <AutoComplete
            style={{ width: '200' }}
            options={renderOption.length > 0 ? [...dataAutoCArray.map(renderOption), {}] : dataAutoCArray.map(renderOption)}
            placeholder={nameZoomArea ? (nameZoomArea.endsWith(', CO') ? nameZoomArea.replace(', CO', '') : nameZoomArea) : 'Mile High Flood District'}
            filterOption={(inputValue, option: any) => {
              if (dataAutoCArray.includes(inputValue)) {
                return true;
              }
              if (!option.value) return false;
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
            listHeight={windowWidth > 2554 ? (windowWidth > 3799 ? 500 : 320) : 256}
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
          <div className='button-header-tab'>
            <Button className={selectView === 'list' ? 'ico-header-tab-active' :'ico-header-tab'} onClick={() =>{setSelectView('list')}}>
              {selectView === 'list' ?<img src='Icons/ic-list-purple.svg' alt='ic-list-purple'/>:<img src='Icons/ic-list.svg' alt='ic-list'/>}
              List
            </Button>
            <Button className={selectView === 'card' ? 'ico-header-tab-active' :'ico-header-tab'} onClick={() =>{setSelectView('card')}}>
              {selectView === 'card' ?<img src='Icons/ic-card-purple.svg' alt='ic-card-purple'/>:<img src='Icons/ic-card.svg' alt='ic-card'/>}
              Card
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default MapAutoComplete;
