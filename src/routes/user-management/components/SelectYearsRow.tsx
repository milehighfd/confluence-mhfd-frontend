import React, { useEffect, useState } from 'react';
import { Row, Col, Select } from 'antd';
import { WORK_PLAN } from 'constants/constants';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import { useNotifications } from 'Components/Shared/Notifications/NotificationsProvider';
import { useProfileDispatch } from 'hook/profileHook';

interface SelectRowProps {
  data: any;
  type: string;
  yearType: string;
}

const SelectYearsRow = ({ data, type, yearType }: SelectRowProps) => {
  const initialYear = 2022;
  const options: any[] = [];
  const label = type === WORK_PLAN ? 'Work Plan' : 'Work Request';
  const typesOfUsers = ['MHFD_BOARD_YEAR', 'LG_BOARD_YEAR', 'CC_BOARD_YEAR'];
  const dataType = data.find((item: any) => item.type === type && item.description === yearType);
  const { getBoardYears } = useProfileDispatch();
  const { openNotification } = useNotifications();
  const [alert, setAlert] = useState({
    show: false,
    type: 'success',
    message: '',
  });
  for (let i = 0; i < 6; i++) {
    const year = initialYear + i;
    options.push({ value: year.toString(), label: year.toString() });
  }
  const displayItems = typesOfUsers.map(typeKey => {
    const foundItem = dataType?.data?.find((item: any) => item.key === typeKey);
    if (foundItem) {
      return foundItem;
    }
    let defaultValue = '';
    if (yearType === 'MAX') {
      defaultValue = '2027';
    }else{
      defaultValue = '2022';
    }
    return { id: `default-${typeKey}`, value: defaultValue, key: typeKey };
  });

  function createOrUpdate(value: string, key: string, type: string, yearType: string) {
    datasets.postData(SERVER.UPDATE_CREATE_CONF, { key, value, yearType, typeBoard: type }, datasets.getToken()).then((data) => {
      if (data.value){
        openNotification(`Success! The board year has been updated.`, "success");
      } else {
        setAlert({ ...alert, show: true, type: 'error', message: `Error saving year.` });
      }      
    })
  }

  return (
    <Row className='body-board-year'>
      <Col xs={{ span: 8 }} lg={{ span: 8 }} className='label-board-year'>{label}</Col>
      {displayItems.map((item: any) => (
        <Col xs={{ span: 4 }} lg={{ span: 4 }} key={item.id} className='select-board-year'>
          <Select
            defaultValue={item.value}
            style={{ width: 140, textAlign: 'left' }}
            options={options}
            onChange={(value: any) => {createOrUpdate(value, item.key, type, yearType)}}
          />
        </Col>
      ))}
      <Col xs={{ span: 4 }} lg={{ span: 4 }} className='select-board-year'>
        <span className='tag-board-year'>Not Available</span>
      </Col>
    </Row>
  );
};

export default SelectYearsRow;
