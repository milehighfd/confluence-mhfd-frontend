import React, { useEffect, useState } from 'react';
import { Menu, MenuProps, Popover, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { WINDOW_WIDTH, WORK_PLAN } from 'constants/constants';
import { MoreOutlined } from '@ant-design/icons';
import { getData, getToken } from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import { useProjectDispatch } from 'hook/projectHook';
import { useRequestState } from 'hook/requestHook';
import { useMapState } from 'hook/mapHook';

const TableListView = () => {
  const [completeProjectData, setCompleteProjectData] = useState<any>(null);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(WINDOW_WIDTH);
  const {setZoomProject, updateSelectedLayers} = useProjectDispatch();
  const [editable, setEditable] = useState(false);
  const [showCopyToCurrentYearAlert, setShowCopyToCurrentYearAlert] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { tabActiveNavbar } = useMapState();
  const {year} = useRequestState(); 

  const getCompleteProjectData = async (record:any) => {
    let dataForBoard = {...record.projectData};
    const dataFromDB = await getData(SERVER.V2_DETAILED_PAGE(dataForBoard.project_id), getToken());
    setCompleteProjectData({...dataFromDB, ...dataForBoard}); 
  }
    const typeStatus = (status: string) => {
        let text = '';
        switch (status) {
            case "Submitted": {
                text = 'span-submitted';
                break;
            }
            case "Active": {
                text = 'span-active';
                break;
            }
            case "Requested": {
                text = 'span-requested';
                break;
            }
        }
        return text;
    }
    interface DataType {
        key: React.Key;
        name: string;
        status: string;
        requestor: string;
        cost: string;
        actions: number;
        type: string;
    }
    const content = (record:any) => {
      const items: MenuProps['items'] = [{
        key: '0',
        label: <span style={{borderBottom: '1px solid transparent'}}>
          <img src="/Icons/icon-04.svg" alt="" width="10px" style={{ opacity: '0.5', marginTop: '-2px' }} />
          Edit Project
        </span>,
        onClick: (() => getCompleteProjectData(record))
      }, {
        key: '1',
        label: <span style={{borderBottom: '1px solid transparent'}}>
          <img src="/Icons/icon-90.svg" alt="" width="8px" style={{ opacity: '0.5', marginTop: '-2px', marginRight: '8.8px' }} />
          Edit Amount
        </span>,
        onClick: (() => setShowAmountModal(true))
      }, {
        key: '2',
        label: <span style={{borderBottom: '1px solid transparent'}}>
          <img src="/Icons/icon-13.svg" alt="" width="10px" style={{ opacity: '0.5', marginTop: '-2px', marginRight: '4.6px' }} />
          Zoom to
        </span>,
        onClick: (() => { setZoomProject(record.projectData);})
      }];
      if (!editable) {
        items.pop();
        items.splice(1, 1);
      }
      if (tabActiveNavbar === WORK_PLAN && year != 2023) {
        items.splice(2, 0, {
          key: '4',
          label: <span style={{borderBottom: '1px solid transparent'}}>
            <img src="/Icons/icon-04.svg" alt="" width="10px" style={{ opacity: '0.5', marginTop: '-2px' }} />
            Copy to Current Year
          </span>,
          onClick: (() => setShowCopyToCurrentYearAlert(true))
        });
      }
      return (<Menu className="js-mm-00" items={items} />)
    };
    const columns: ColumnsType<DataType> = [
        {
            title: 'Project Name',
            dataIndex: 'name',
            width: '276px',
            fixed: 'left',
            render: (name: any, record:any) =>
              <div className='name-project-sec'>
                <span className='name'>{name}</span>
                <Popover placement="bottom" overlayClassName="work-popover menu-item-custom dots-menu" content={content(record)} trigger="click" style={{marginRight:'-10px',cursor: 'pointer'}}>
                  <MoreOutlined onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='dots-table'/>
                </Popover>
              </div>,
            sorter: {
                compare: (a: { name: string; }, b: { name: string; }) => a.name.localeCompare(b.name),
            },            
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: '80px',
            render: (status: any) =>
                    <span className={typeStatus(status)}>{status}</span>,
            sorter: {
                compare: (a: { status: string; }, b: { status: string; }) => a.status.localeCompare(b.status),
            },
        },
        {
            title: 'Requestor',
            dataIndex: 'requestor',
            width: '94px',
            sorter: {
                compare: (a: { requestor: string; }, b: { requestor: string; }) => a.requestor.localeCompare(b.requestor),
            },
        },
        {
            title: 'Past',
            dataIndex: 'cost',
            width: '64px',
            sorter: {
                compare: (a: { cost: string; }, b: { cost: string; }) => a.cost.localeCompare(b.cost),
            },
        },
        {
            title: '2023',
            dataIndex: 'cost',
            width: '64px',
            sorter: {
                compare: (a: { cost: string; }, b: { cost: string; }) => a.cost.localeCompare(b.cost),
            },
        },
        {
            title: '2024',
            dataIndex: 'cost',
            width: '64px',
            sorter: {
                compare: (a: { cost: string; }, b: { cost: string; }) => a.cost.localeCompare(b.cost),
            },
        },
        {
            title: '2025',
            dataIndex: 'cost',
            width: '64px',
            sorter: {
                compare: (a: { cost: string; }, b: { cost: string; }) => a.cost.localeCompare(b.cost),
            },
        },
        {
            title: '2026',
            dataIndex: 'cost',
            width: '64px',
            sorter: {
                compare: (a: { cost: string; }, b: { cost: string; }) => a.cost.localeCompare(b.cost),
            },
        },
        {
            title: '2027',
            dataIndex: 'cost',
            width: '64px',
            sorter: {
                compare: (a: { cost: string; }, b: { cost: string; }) => a.cost.localeCompare(b.cost),
            },
        },
        {
            title: 'Total',
            dataIndex: 'cost',
            width: '64px',
            sorter: {
                compare: (a: { cost: string; }, b: { cost: string; }) => a.cost.localeCompare(b.cost),
            },
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'Hidden Lake Drainageway @ Arvada Center',
            status: 'Active',
            requestor: 'Commerce City',
            cost: '$253,200',
            actions: 4,
            type: 'Restoration',
        },
        {
            key: '2',
            name: 'Cherry Creek @ Lincoln 2019',
            status: 'Submitted',
            requestor: 'Boulder',
            cost: '$450,000',
            actions: 3,
            type: 'Capital',
        },
        {
            key: '3',
            name: 'South Englewood Basin Tributary @ City of E...',
            status: 'Requested',
            requestor: 'Thornton',
            cost: '$30,000',
            actions: 12,
            type: 'Vegetation Management',
        },
        {
            key: '4',
            name: 'Hidden Lake Drainageway @ Arvada Center',
            status: 'Active',
            requestor: 'Litleton',
            cost: '$12,300',
            actions: 5,
            type: 'Capital',
        },
        {
            key: '5',
            name: 'Cherry Creek @ Lincoln 2019',
            status: 'Submitted',
            requestor: 'Commerce City',
            cost: '$253,200',
            actions: 6,
            type: 'Acquiston',
        },
        {
            key: '6',
            name: 'South Englewood Basin Tributary @ City of E...',
            status: 'Active',
            requestor: 'Boulder',
            cost: '$450,000',
            actions: 12,
            type: 'Research & Development',
        },
        {
            key: '7',
            name: 'Hidden Lake Drainageway @ Arvada Center',
            status: 'Submitted',
            requestor: 'Thornton',
            cost: '$30,000',
            actions: 9,
            type: 'Research & Development',
        },
        {
            key: '8',
            name: 'Cherry Creek @ Lincoln 2019',
            status: 'Active',
            requestor: 'Littleton',
            cost: '$12,300',
            actions: 32,
            type: 'Capital',
        },
        {
            key: '9',
            name: 'South Englewood Basin Tributary @ City of E...',
            status: 'Submitted',
            requestor: 'Commerce City',
            cost: '$253,200',
            actions: 16,
            type: 'Restoration',
        },
        {
            key: '10',
            name: 'Hidden Lake Drainageway @ Arvada Center',
            status: 'Requested',
            requestor: 'Boulder',
            cost: '$450,000',
            actions: 7,
            type: 'Maintenance',
        },
        {
            key: '11',
            name: 'Cherry Creek @ Lincoln 2019',
            status: 'Submitted',
            requestor: 'Thornton',
            cost: '$30,000',
            actions: 78,
            type: 'Sediment Management',
        },
        {
            key: '12',
            name: 'South Englewood Basin Tributary @ City of E...',
            status: 'Submitted',
            requestor: 'Littleton',
            cost: '$12,300',
            actions: 42,
            type: 'Special',
        },
        {
            key: '13',
            name: 'South Englewood Basin Tributary @ City of E...',
            status: 'Submitted',
            requestor: 'Littleton',
            cost: '$12,300',
            actions: 36,
            type: 'Capital',
        },

    ];

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const updateWindowSize = () => {
        setWindowWidth(window.innerWidth);
      };

    useEffect(() => {
        window.addEventListener('resize', updateWindowSize);
        return () => {
          window.removeEventListener('resize', updateWindowSize);
        };
      }, [])

    return (
        <div className='table-map-list'>

            <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 1026, y: 'calc(100vh - 270px)' }} summary={() => (
                <Table.Summary fixed={ 'bottom'} >
                  <Table.Summary.Row  style={{ height: '40px' }}>
                      <Table.Summary.Cell index={0}  >
                        Total Requested Funding
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}  ></Table.Summary.Cell>
                      <Table.Summary.Cell index={2}></Table.Summary.Cell>
                      <Table.Summary.Cell index={3}>
                        $980,000
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={4}>
                        $980,000
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={5}>
                        $980,000
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={6}>
                        $980,000
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={7}>
                        $980,000
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={8}>
                        $980,000
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={9}>
                        $980,000
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={10}>
                        $980,000
                      </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
            )}
        />

        </div>

    )
};

export default TableListView;