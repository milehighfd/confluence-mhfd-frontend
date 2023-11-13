import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Select, Table, notification } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import { WINDOW_WIDTH } from "constants/constants";
import { useRequestDispatch } from 'hook/requestHook';
import { useNotifications } from 'Components/Shared/Notifications/NotificationsProvider';
import { getYearList } from 'Components/Work/Request/RequestViewUtil';


const BoardYear = () => {
  const [api, contextHolder] = notification.useNotification();
  const [openDropYear, setOpenDropYear] = useState(false);
  const [yearEdit, setYearEdit] = useState<any>('');
  const [yearEditList, setYearEditList] = useState<any>([]);
  const { openNotification } = useNotifications();
  const dataSource = [
    {
      key: '1',
      name: 'Board Availability (up to most recent year)',
      title: true,
    },
    {
      key: '2',
      name: 'Work Request',
      admin: '2024',
      government: '2024',
      consultants: '2024',
      other: 'Not Available',
      title: false,
    },
    {
      key: '3',
      name: 'Work Plan',
      admin: '2024',
      government: '2024',
      consultants: '2024',
      other: 'Not Available',
      title: false,
    },
    {
      key: '4',
      name: 'Default Settings',
      title: true,
    },
    {
      key: '5',
      name: 'Work Request',
      admin: '2024',
      government: '2024',
      consultants: '2024',
      other: 'Not Available',
      title: false,
    },
    {
      key: '6',
      name: 'Work Plan',
      admin: '2024',
      government: '2024',
      consultants: '2024',
      other: 'Not Available',
      title: false,
    },
  ];
  
  const columns = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      render: (text: any, record:any) => {
        if(record.title){
          return (
            <span style={{textDecoration:'underline'}}>{text}</span>
          )
        }
        return <span>{text}</span>
      }
    },
    {
      title: 'MHFD Staff & Admin',
      dataIndex: 'admin',
      key: 'admin',
      render: (text: any, record:any) => {
        if(record.title){
          return ('')
        }
        return (
          <div style={{textAlign:'center', width:'100%'}}>
            <Select
              defaultValue={text}
              style={{ width: 120, textAlign:'left'}}
              options={[
                { value: '2022', label: '2022' },
                { value: '2023', label: '2023' },
                { value: '2024', label: '2024' },
                { value: '2025', label: '2025' },
              ]}
            />
          </div>
        )
      }
    },
    {
      title: 'Local Government',
      dataIndex: 'government',
      key: 'government',
      render: (text: any, record:any) => {
        if(record.title){
          return ('')
        }
        return (
          <div style={{textAlign:'center', width:'100%'}}>
            <Select
              defaultValue={text}
              style={{ width: 120, textAlign:'left'}}
              options={[
                { value: '2022', label: '2022' },
                { value: '2023', label: '2023' },
                { value: '2024', label: '2024' },
                { value: '2025', label: '2025' },
              ]}
            />
          </div>
        )
      }
    },
    {
      title: 'Consultants & Contractors',
      dataIndex: 'consultants',
      key: 'consultants',
      render: (text: any, record:any) => {
        if(record.title){
          return ('')
        }
        return (
          <div style={{textAlign:'center', width:'100%'}}>
            <Select
              defaultValue={text}
              style={{ width: 120, textAlign:'left'}}
              options={[
                { value: '2022', label: '2022' },
                { value: '2023', label: '2023' },
                { value: '2024', label: '2024' },
                { value: '2025', label: '2025' },
              ]}
            />
          </div>
        )
      }
    },
    {
      title: 'Other',
      dataIndex: 'other',
      key: 'other',
      render: (text: any, record:any) => {
        if(record.title){
          return ('')
        }
        return (
          <div style={{textAlign:'center', width:'100%'}}>
            <span className='tag-table'>{text}</span>
          </div>
        )
      }
    },
  ];
  const {
    setYear,
    setYearList,
  } = useRequestDispatch();
  const [alert, setAlert] = useState({
    show: false,
    type: 'success',
    message: '',
  });

  const loadConfigurationYear = async () => {
    const [configuredYear, generatedYearListIncreased, generatedYearList] = await getYearList(5);
    setYear(configuredYear);
    setYearEdit(configuredYear);
    setYearList(generatedYearList);
    setYearEditList(generatedYearListIncreased);
  }

  useEffect(() => {
    loadConfigurationYear();
  }, []);

  const changeConfigurationYear = (value: string) => {
    setYearEdit(value);
  };

  const onSave = () => {
    datasets.putData(SERVER.GET_CONFIGURATIONS('BOARD_YEAR'), { value: yearEdit })
      .then(() => {
        openNotification(`Success! The board year has been updated to ${yearEdit}.`, "success");
        loadConfigurationYear();
      }).catch(() => {
        setAlert({ ...alert, show: true, type: 'error', message: `Error saving year ${yearEdit}.` });
      })
      .finally(() => {
        setTimeout(() => {
          setAlert({ ...alert, message: '', show: false });
        }, 3000);
      });
  };

  return (
    <div>
      <div style={{position: 'absolute', top: '95px', right: '23px'}} className='img-dowload'>
        <img src='/Icons/ic-dowload.svg' alt='dowload'/>
      </div>
      {contextHolder}
      <Row>
        <Col xs={{ span: 24}} lg={{ span: 24 }} className='col-table-board' style={{paddingLeft: '2px', paddingRight:'2px'}}>
          <div className="list-view-head" style={{paddingTop:'10px', }} >
            <h2 style={{color:'rgb(29, 22, 70)'}}className="title">Board Access</h2>
          </div>
          <div style={{ }} >
            <p className='board-table-year-p' style={{color: '#11093C', opacity:0.6}}>These settings limit which boards are available and set as the default , according to user type. </p>
          </div>
          <br />
          <div className='table-board-year'>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              rowClassName={(record, index) => {
                
                if (record.title) {
                  return 'title-board-year';
                }
                return '';
              }}
            />
          </div>
        </Col>
      </Row>
      {/* <div className="table-user-management" style={{paddingLeft:'15px'}}>
        <span style={{color: 'rgb(17, 9, 60)', paddingRight: '10px'}}>Most recent board year:</span>
        <Select
          value={yearEdit}
          listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
          suffixIcon={openDropYear? <UpOutlined /> :< DownOutlined />}
          onClick={()=>(setOpenDropYear(!openDropYear))}
          onChange={(e) => {changeConfigurationYear(e)}}
        >
          <Select.Option key={'no'} disabled value={''}>Select a year</Select.Option>
          {yearEditList.map((item: any) => (
            <Select.Option key={item} value={item}>{item}</Select.Option>
          ))}
        </Select>
        <br/>
        {alert.show && (
          <span style={{ color: alert.type === 'success' ? '#28C499' : 'red' }}>&nbsp;&nbsp;{alert.message}</span>
        )}
        <br/>
        <Button className="btn-purple btn-board" style={{marginTop: 20}} onClick={onSave}>
          Save
        </Button>
      </div> */}
    </div>
  );
};

export default BoardYear;
