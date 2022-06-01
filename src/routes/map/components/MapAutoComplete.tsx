import React, { useEffect, useState } from 'react';
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
  const [dataAutocomplete, setDataAutocomplete] = useState(groupOrganization.filter(function (item: any) {
    if (item.aoi === undefined) {
      return false;
    }
    return true;
  }).map((item: { aoi: string }) => { return <AutoComplete.Option className="list-line" key={item.aoi}>{item.aoi}</AutoComplete.Option> }));

  const onSelect = (value: any, isSelect?: any) => {
    setvalueA(value);
    onAutoCompleteSelected(value, isSelect);
  };

  useEffect(() => {
    setDataAutocomplete(groupOrganization.filter(function (item: any) {
      if (item.aoi === undefined) {
        return false;
      }
      return true;
    }).map((item: { aoi: string }) => { return <AutoComplete.Option className="list-line" key={item.aoi}>{item.aoi}</AutoComplete.Option> }));
  }, [groupOrganization]);

  useEffect(() => {
    setvalueA(nameZoomArea);
  }, [nameZoomArea]);

  return (
    <Row className="head-m mobile-display">
      <Col span={24} id="westminter">
        <div className="auto-complete-map">
          <AutoComplete
            style={{ width: '200' }}
            onDropdownVisibleChange={setDropdownIsOpen}
            dataSource={dataAutocomplete}
            placeholder={nameZoomArea ? (nameZoomArea.endsWith(', CO') ? nameZoomArea.replace(', CO', '') : nameZoomArea) : 'Mile High Flood District'}
            filterOption={(inputValue, option: any) => {
              if (dataAutocomplete.map((r: any) => r.key).includes(inputValue)) {
                return true;
              }
              return option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
            }}
            onSelect={onSelect}
            value={valueA}
            onSearch={(input2: any) => {
              setvalueA(input2)
            }}
          >
            <Input
              id={'miclase'}
              style={{
                border: 'none',
                boxShadow: 'none',
                borderBottom: '1px solid rgba(37, 24, 99, 0.3)',
                marginRight: '-18px'
              }}
              suffix={
                dropdownIsOpen ?
                  <UpOutlined style={{ marginRight: '-18px' }} /> :
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
