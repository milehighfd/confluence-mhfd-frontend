import { Radio, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import {  WINDOW_WIDTH } from 'constants/constants';
import { DeleteOutlined } from '@ant-design/icons';
import { useProfileState } from 'hook/profileHook';
import { useProjectState } from 'hook/projectHook';

interface Props {
  county: string;
  setCounty: Function;
  setShowDraw: Function;
  showDraw: boolean;
  showCounty: boolean;
  setShowCounty: Function;
  isCountyWide: boolean | undefined;
  setIsCountyWide: Function;
  isSouthPlate: boolean | undefined;
  setIsSouthPlate: Function;
}
const { Option } = Select;

export const Countywide = ({ 
  county, 
  setCounty,
  setShowDraw,
  showDraw,
  showCounty,
  setShowCounty,
  isCountyWide,
  setIsCountyWide,
  isSouthPlate,
  setIsSouthPlate,
}: Props) => {
  const { groupOrganization } = useProfileState();
  const [countyList, setCountyList] = useState<any>([]);
  const [defaultValueCounty, setDefaultValueCounty] = useState<any>('');
  const [defaultValueSouthPlate, setDefaultValueSouthPlate] = useState<any>('');
  const {
    disableFieldsForLG,
  } = useProjectState();

  useEffect(() => {
    setDefaultValueCounty(isCountyWide ? 'Yes' : 'No');
    setDefaultValueSouthPlate(isSouthPlate ? 'Yes' : 'No');
  }, [isCountyWide, isSouthPlate])

  useEffect(() => {
    if (groupOrganization.length > 0) {
      let countyListGen: any = [];
      groupOrganization.forEach((item: any) => {
        if (item.table === 'CODE_STATE_COUNTY') {
          item.name = item.name.replace(' County', '');
          countyListGen.push(item.name);
        }
      });
      setCountyList(countyListGen);
    }
  },[groupOrganization])
  
  const filterName = (name: string) => {
    if (!name) {
      return '';
    }
    if (name.includes('County')) {
      return name.replace('County', '');
    }
    if (name.includes('Service Area')) {
      return name.replace('Service Area', '');
    }
    return name;
  }
  return (
    <>
      <p className='text-default'>Projects are spatially defined by stream reaches.  Select the option below that best allows you to define the project.</p>
      <div className='section-gemetry'>
        <p>i. Is this a countywide project?</p>
        <Radio.Group value={defaultValueCounty} disabled={disableFieldsForLG} onChange={(e) => {
          if (e.target.value === 'Yes') {
            setIsCountyWide(true);
            setShowDraw(false);
            setShowCounty(true);
          } else if (e.target.value === 'No') {
            setIsCountyWide(false);
            setShowDraw(true);
            setShowCounty(false);
          } else{
            setIsCountyWide(false);
            setShowDraw(false);
            setShowCounty(false);
          }
        }}>
          <Radio value="Yes"><span className='text-radio-btn'>Yes</span></Radio>
          <Radio value="No"><span className='text-radio-btn'>No</span></Radio>
        </Radio.Group>
        <div className='section-county'>
          {showCounty && <><label className="sub-title">Select one or multiple counties </label>
            <Select
              mode="multiple"
              placeholder={county?.length !== 0 ? county : "Select a County"}
              style={{ width: '100%' }}
              listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
              value={county}
              disabled={disableFieldsForLG}
              onChange={(county: any) => setCounty(county)}
              getPopupContainer={() => (document.getElementById("countyid") as HTMLElement)}>
              {countyList.map((element:any) => {
                return <Option key={element} value={element}>{filterName(element)}</Option>
              })}
            </Select>
            </>}
        </div>
        <p>ii. Is this project located on the South Platte River?</p>
        <Radio.Group value={defaultValueSouthPlate} disabled={disableFieldsForLG} onChange={(e) => {
          if (e.target.value === 'Yes') {
            setIsSouthPlate(true);
          } else if (e.target.value === 'No') {
            setIsSouthPlate(false);
          }
        }}>
          <Radio value="Yes"><span className='text-radio-btn'>Yes</span></Radio>
          <Radio value="No"><span className='text-radio-btn'>No</span></Radio>
        </Radio.Group>
        {showDraw && <p className='sub-sub-title-projects'>iii. Draw your project geometry</p>}
      </div>
    </>
  );
};