import React, { useEffect, useState } from 'react';
import { Menu, MenuProps, Popover, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { ADMIN, NEW_PROJECT_TYPES, STAFF, STATUS_NAMES, WINDOW_WIDTH, WORK_PLAN } from 'constants/constants';
import { MoreOutlined } from '@ant-design/icons';
import { getData, getToken } from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import { useProjectDispatch } from 'hook/projectHook';
import { useRequestState } from 'hook/requestHook';
import { useMapState } from 'hook/mapHook';
import { useProfileState } from 'hook/profileHook';
import AmountModal from '../AmountModal';
import ModalProjectView from 'Components/ProjectModal/ModalProjectView';
import { postData } from 'Config/datasets';

const TableListView = ({
  maintenanceSubType
}:{
  maintenanceSubType:string
}) => {
  const [completeProjectData, setCompleteProjectData] = useState<any>(null);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(WINDOW_WIDTH);
  const {setZoomProject, updateSelectedLayers, archiveProject} = useProjectDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const { tabActiveNavbar } = useMapState();
  const { columns2: columnsList, tabKey, locality, year, namespaceId, boardStatus, filterYear } = useRequestState();
  const { userInformation } = useProfileState();
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [maintenanceData, setMaintenanceData] = useState<any[]>([]);
  const [yearList, setYearList] = useState<any[]>([]);
  const [totalByYear, setTotalByYear] = useState<any[]>([]);
  const [editable, setEditable] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showModalProject, setShowModalProject] = useState(false);
  const [pastCosts, setPastCosts] = useState<any[]>([]);
  const [filteredColumns, setFilteredColumns] = useState<any[]>([]);
  const [showCopyToCurrentYearAlert, setShowCopyToCurrentYearAlert] = useState(false);
  const [boardProjectIds, setBoardProjectIds] = useState<any[]>([]);
  const windowWidthSize: any = window.innerWidth;
  const appUser = useProfileState();
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  useEffect(() => {
    if (namespaceId.projecttype === 'Maintenance') {
      postData(`${SERVER.GET_COSTS_FOR_MAINTENANCE}`, { board_project_id: boardProjectIds})
      .then(
        (r: any) => {
          let addCosts = maintenanceData.map((item: any) => {
            let costs = r.find((cost: any) => cost.board_project_id === item.board_project_id);
            if (costs) {
              const subtype = item?.projectData?.code_project_type?.project_type_name;
              const costMapping = {
                [NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Debris_Management]: [costs.req1, costs.year1, costs.year2],
                [NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Vegetation_Management]: [costs.req2, costs.year1, costs.year2],
                [NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Sediment_Removal]: [costs.req3, costs.year1, costs.year2],
                [NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Minor_Repairs]: [costs.req4, costs.year1, costs.year2],
                [NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Restoration]: [costs.req5, costs.year1, costs.year2],
              };              
              return {
                ...item,
                costs: costMapping[subtype] || item.costs
              };
            } else {
              return {
                ...item,
                costs: [0, 0, 0]
              }
            }            
          })
          if (filterYear && filterYear.length > 0) {
            const filterDataWY = addCosts.filter(project => {
              for (let year of filterYear) {
                const yearIndex = yearList.indexOf(year);
                if (project.costs[yearIndex]) {
                  return true;
                }
              }
              return false;
            });
            const totalCosts = filterDataWY.reduce((acc, project) => {
              return [
                acc[0] + project.costs[0],
                acc[1] + project.costs[1],
                acc[2] + project.costs[2],
              ];
            }, [0, 0, 0]);
            setTotalByYear(totalCosts);
            setParsedData(filterDataWY);
          } else {
            const totalCosts = addCosts.reduce((acc, project) => {
              return [
                acc[0] + project.costs[0],
                acc[1] + project.costs[1],
                acc[2] + project.costs[2],
              ];
            }, [0, 0, 0]);
            setTotalByYear(totalCosts);
            setParsedData(addCosts);
          }
        }
      )
    }
  },[boardProjectIds])

  useEffect(() => {
    let allProjects: any[] = [];
    let years: any[] = [];
    let totalByYearObject: any[] = [];
    columnsList.forEach((item: any) => {
      totalByYearObject.push(item.groupTotal);
      if (item.title !== 'Workspace') {
        years = years.concat(item.title);
      }
      if (item.projects) {
        allProjects = allProjects.concat(item.projects);
      }
    });
    if (namespaceId.projecttype === 'Maintenance') {      
      const projectMap: { [key: number]: any } = {};
      for (let project of allProjects) {
        const extracted: any = {
          key: project?.project_id,
          name: project?.projectData?.project_name,
          status: STATUS_NAMES[project?.code_status_type_id] || '',
          requestor: project?.origin,
          projectData: project?.projectData,
          board_project_id: project?.board_project_id,
          costs:[],
          past: 0,
        };
        projectMap[extracted.key] = extracted;
      }
      let parsedDataWCosts = Object.values(projectMap);
      if (pastCosts.length > 0) {
        parsedDataWCosts = parsedDataWCosts.map((item: any) => {
          const found = pastCosts.find((cost: any) => cost.project_id === item.key);
          return {
            ...item,
            past: found ? found.totalreq : 0,
          };
        });
      }
      const filteredData = parsedDataWCosts.filter((item: any) => {
        return item?.projectData?.code_project_type?.project_type_name === maintenanceSubType;
      });
      setMaintenanceData(filteredData);
      const boardProjectIds = Object.values(projectMap).map((project) => project.board_project_id);
      setBoardProjectIds(boardProjectIds);
      const years = [];
      for (let i = 0; i <= 2; i++) {
        years.push(+namespaceId.year + i);
      }
      setYearList(years);
    } else {      
      const projectMap: { [key: number]: any } = {};
      for (let project of allProjects) {
        const extracted: any = {
          key: project?.project_id,
          name: project?.projectData?.project_name,
          status: STATUS_NAMES[project?.code_status_type_id] || '',
          requestor: project?.origin,
          projectData: project?.projectData,
          board_project_id: project?.board_project_id,
          costs: [],
          past: 0,
        };
        for (let i = 1; i <= 5; i++) {
          extracted.costs.push(project[`req${i}`] || 0);
        }
        if (projectMap[extracted.key]) {
          for (let i = 0; i < extracted.costs.length; i++) {
            projectMap[extracted.key].costs[i] += extracted.costs[i];
          }
        } else {
          projectMap[extracted.key] = extracted;
        }
      }
      const totalArray = [];
      for (let i = 1; i <= 5; i++) {
        const key = "req" + i;
        const found = totalByYearObject.find(item => item[key] !== undefined);
        totalArray.push(found ? found[key] : 0);
      }
      setTotalByYear(totalArray);
      setYearList(years);
      let parsedDataWCosts = Object.values(projectMap);
      if (pastCosts.length > 0) {
        parsedDataWCosts = parsedDataWCosts.map((item: any) => {
          const found = pastCosts.find((cost: any) => cost.project_id === item.key);
          return {
            ...item,
            past: found ? found.totalreq : 0,
          };
        });
      }
      if (filterYear && filterYear.length > 0) {
        const filterDataWY = parsedDataWCosts.filter(project => {
          for (let year of filterYear) {
            const yearIndex = years.indexOf(year);
            if (project.costs[yearIndex] !== 0) {
              return true;
            }
          }
          return false;
        });
        setParsedData(filterDataWY);
      } else {
        setParsedData(parsedDataWCosts);
      }
    }        
  }, [columnsList,pastCosts,maintenanceSubType,filterYear]);  
  
  useEffect(() => {
    postData(`${SERVER.GET_PAST_DATA}`, { boardId: namespaceId})
      .then(
        (r: any) => {
          setPastCosts(r);
        }
      )
  }, [namespaceId]);

  useEffect(() => {
    setEditable(boardStatus !== 'Approved' || userInformation.designation === ADMIN || userInformation.designation === STAFF);
  }, [boardStatus, userInformation.designation]);

  useEffect(() => {
    if (completeProjectData) {
      setShowModalProject(true);
    }
  }, [completeProjectData]);

  useEffect(()=>{
    if(!showModalProject) {
      setCompleteProjectData(null);
    }
  },[showModalProject]);

  const getCompleteProjectData = async (record:any) => {
    let dataForBoard = {...record.projectData};
    const dataFromDB = await getData(SERVER.V2_DETAILED_PAGE(dataForBoard.project_id), getToken());
    setCompleteProjectData({...dataFromDB, ...tabKey}); 
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
            default:{
              text = 'span-submitted';
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
        <img src="/Icons/icon-90.svg" alt="" width="10px" style={{ opacity: '0.5', marginTop: '-2px', marginRight: '4px' }} />
        Edit Amount
      </span>,
      onClick: (() => {
        setSelectedProject(record);
        setShowAmountModal(true)
      })
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
    if (namespaceId.type === 'WORK_PLAN' && year != 2023) {
      items.splice(2, 0, {
        key: '4',
        label: <span style={{borderBottom: '1px solid transparent'}}>
          <img src="/Icons/icon-04.svg" alt="" width="10px" style={{ opacity: '0.5', marginTop: '-2px' }} />
          Copy to Current Year
        </span>,
        onClick: (() => setShowCopyToCurrentYearAlert(true))
      });
    }
    if (appUser?.userInformation?.designation === 'admin' ||
    appUser?.userInformation?.designation === 'staff'){
      items.push({
        key: '5',
        label: <span style={{borderBottom: '1px solid transparent'}}>
          <img src="/Icons/icon-04.svg" alt="" width="10px" style={{ opacity: '0.5', marginTop: '-2px' }} />
          Archive Project
        </span>,
        onClick: (() => archiveProject(record?.projectData?.project_id))
      });
    }    
    return (<Menu className="js-mm-00" items={items} />)
  };
    const columns: ColumnsType<DataType> = [
        {
            key: 'name',
            title: 'Project Name',
            dataIndex: 'name',
            width: '276px',
            fixed: 'left',
            render: (name: any, record:any) =>
              <div className='name-project-sec'>
                <Popover placement="top" content={<>
                  <b>{name}</b>
                  <br />
                  <b>Project: </b> {record.projectData.project_id} 
                  <br />
                  <b>Board project: </b> {record.board_project_id}
                  </>}>
                  <span className='name'>{name}</span>
                </Popover>
                <Popover placement="bottom" overlayClassName="work-popover menu-item-custom dots-menu" content={content(record)} trigger="click" style={{marginRight:'-10px',cursor: 'pointer'}}>
                  <MoreOutlined onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='dots-table'/>
                </Popover>
              </div>,
            sorter: {
                compare: (a: { name: string; }, b: { name: string; }) => a.name.localeCompare(b.name),
            },            
        },
        {
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
            width: windowWidthSize > 1900 ? (windowWidthSize > 2500 ? '120px':'100px'): '80px',
            render: (status: any) =>
                    <span className={typeStatus(status)}>{status}</span>,
            sorter: {
                compare: (a: { status: string; }, b: { status: string; }) => a?.status?.localeCompare(b?.status),
            },
        },
        {
            key: 'requestor',
            title: 'Requestor',
            dataIndex: 'requestor',
            width: windowWidthSize > 1900 ? (windowWidthSize > 2500 ? '154px':'114px'):'94px',
            sorter: {
                compare: (a: { requestor: string; }, b: { requestor: string; }) => a.requestor.localeCompare(b.requestor),
            },
        },
        {
            key: 'past',
            title: 'Past',
            dataIndex: 'past',
            width: windowWidthSize > 1900 ? (windowWidthSize > 2500 ? '144px':'104px'):'84px',           
            render: (past: any) =>
            <span className='span-past'>{formatter.format(past)}</span>,
            sorter: {
              compare: (a: any, b: any) => a.past - b.past,
            },
        },
        {
            key: 'costs1',
            title: yearList[0],
            dataIndex: 'costs',
            width: windowWidthSize > 1900 ? (windowWidthSize > 2500 ? '144':'104px'):'84px',
            render: (cost: any) =>
            <span className='span-past'>{formatter.format(cost[0])}</span>,
            sorter: {
              compare: (a: any, b: any) => a.costs[0] - b.costs[0],
            },
        },
        {
            key: 'costs2',
            title: yearList[1],
            dataIndex: 'costs',
            width: windowWidthSize > 1900 ? (windowWidthSize > 2500 ? '144':'104px'):'84px',
            render: (cost: any) =>
            <span className='span-past'>{formatter.format(cost[1])}</span>,
            sorter: {
              compare: (a: any, b: any) => a.costs[1] - b.costs[1],
            },
        },
        {
            key: 'costs3',
            title: yearList[2],
            dataIndex: 'costs',
            width: windowWidthSize > 1900 ? (windowWidthSize > 2500 ? '144':'104px'):'84px',
            render: (cost: any) =>
            <span className='span-past'>{formatter.format(cost[2])}</span>,
            sorter: {
              compare: (a: any, b: any) => a.costs[2] - b.costs[2],
            },
        },
        {
            key: 'costs4',
            title: yearList[3],
            dataIndex: 'costs',
            width: windowWidthSize > 1900 ? (windowWidthSize > 2500 ? '144':'104px'):'84px',
            render: (cost: any) =>
            <span className='span-past'>{formatter.format(cost[3])}</span>,
            sorter: {
              compare: (a: any, b: any) => a.costs[3] - b.costs[3],
            },
        },
        {
            key: 'costs5',
            title: yearList[4],
            dataIndex: 'costs',
            width: windowWidthSize > 1900 ? (windowWidthSize > 2500 ? '144':'104px'):'84px',
            render: (cost: any) =>
            <span className='span-past'>{formatter.format(cost[4])}</span>,
            sorter: {
              compare: (a: any, b: any) => a.costs[4] - b.costs[4],
            },
        },
        {
            key: 'total',
            title: 'Total',
            dataIndex: 'costs',
            width: windowWidthSize > 1900 ? (windowWidthSize > 2500 ? '144':'104px'):'84px',
            render: (cost: any) =>
            <span className='span-past'>{formatter.format(cost.reduce((acc: number, curr: number) => acc + curr, 0))}</span>,
            sorter: {
              compare: (a: any, b: any) => {
                const sumA = a.costs.reduce((acc: number, curr: number) => acc + curr, 0);
                const sumB = b.costs.reduce((acc: number, curr: number) => acc + curr, 0);
                return sumA - sumB;
              },
            },
        },
    ];

    useEffect(()=>{
      if (namespaceId.projecttype === 'Maintenance') {
        setFilteredColumns(columns.filter((column: any) => (column.key !== 'costs4' && column.key !== 'costs5')));
      }else{
        setFilteredColumns(columns)
      }      
    },[namespaceId,yearList]);

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
      <>
        {
          showModalProject &&
          <ModalProjectView
            visible={showModalProject}
            setVisible={setShowModalProject}
            data={completeProjectData}
            showDefaultTab={true}
            locality={locality}
            editable={editable}
          />
        }
        {
          showAmountModal && <AmountModal
            project={selectedProject}
            visible={showAmountModal}
            setVisible={setShowAmountModal}
          />
        }
        <div className='table-map-list'>
            <Table
              columns={filteredColumns}
              dataSource={parsedData}
              pagination={false}
              scroll={{ x:  windowWidthSize > 1900 ? (windowWidthSize > 2500 ? 1766:1406) : 1166, y: 'calc(100vh - 270px)' }}
              summary={() => (
                <Table.Summary fixed={ 'bottom'}  >
                  <Table.Summary.Row  style={{ height: '40px' }}>
                      <Table.Summary.Cell index={0}  >
                        Total Requested Funding
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}  ></Table.Summary.Cell>
                      <Table.Summary.Cell index={2}></Table.Summary.Cell>
                      <Table.Summary.Cell index={3}>
                        
                      </Table.Summary.Cell>
                      {totalByYear.map((total: number, index: number) => {
                        if (namespaceId.projecttype !== 'Maintenance' || index !== 4) {
                          return (
                            <Table.Summary.Cell index={index + 4} key={index}>
                              {formatter.format(total)}
                            </Table.Summary.Cell>
                          );
                        }
                        return null;
                      })}
                      {<Table.Summary.Cell index={totalByYear.length + 3}>
                        {formatter.format(totalByYear.reduce((acc: number, curr: number) => acc + curr, 0))}
                      </Table.Summary.Cell>
                      }
                  </Table.Summary.Row>
                </Table.Summary>
            )}
        />

        </div>
        </>
    )
};

export default TableListView;