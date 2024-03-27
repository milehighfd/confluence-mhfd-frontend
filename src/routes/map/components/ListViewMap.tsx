import { Menu, MenuProps, Popover, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useProjectDispatch, useProjectState } from "hook/projectHook";
import { WINDOW_WIDTH } from "constants/constants";
import React, { useEffect, useState } from "react";
import { FILTER_PROBLEMS_TRIGGER, PROBLEMS_TRIGGER } from "../constants/tabs.constants";
import { useMapDispatch, useMapState } from "hook/mapHook";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingView from "Components/Loading/LoadingView";
import { useProfileDispatch, useProfileState } from "hook/profileHook";
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import { MHFD_PROJECTS } from "constants/constants";
import { MoreOutlined } from "@ant-design/icons";
import DetailModal from "routes/detail-page/components/DetailModal";

const ListViewMap = ({
  totalElements,
  type,
  cardInformation,
}: {
  totalElements: number,
  type: string,
  cardInformation: any[]
}) => {
  const size = 20;
  let totalElement = cardInformation?.length || 0;  
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const [dataProjects, setDataProjects] = useState<any>([]);
  const [dataProblems, setDataProblems] = useState<any>([]);
  const [hoveredRow, setHoveredRow] = useState<any>(null);
  const [visible, setVisible] = useState(false); 
  let lastScrollLeft = 0;
  let lastScrollTop = 0;
  const [state, setState] = useState({
    items: Array.from({ length: size }),
    hasMore: true
  });
  const { 
    setNextPageOfCards, 
    setInfiniteScrollItems, 
    setInfiniteScrollHasMoreItems, 
    resetNextPageOfCards, 
    resetInfiniteScrollItems, 
    resetInfiniteScrollHasMoreItems
  } = useProjectDispatch();
  const { userInformation: user } = useProfileState();
  const { nextPageOfCards, infiniteScrollHasMoreItems, infiniteScrollItems } = useProjectState();
  const { openDiscussionTab } = useProfileDispatch();
  const [windowWidth, setWindowWidth] = useState(WINDOW_WIDTH)
  const [sortBy, setSortBy] = useState<any>(null);
  const [sortOrder, setSortOrder] = useState<any>(null);
  const [openedDropdownKey, setOpenedDropdownKey] = useState<string | null>(null);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [itHasComponents, setItHasComponents] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const {
    favorites,
    selectedOnMap,
    paramFilters: params,
    filterProjectOptions,
    filterProblemOptions,
  } = useMapState();

  const {
    favoriteList,
    getExtraProjects,
    setFilterTabNumber,
    setZoomProjectOrProblem,
    setHighlighted,
    getGalleryProjects,
    setFilterProjectOptions,
    setFilterProblemOptions,
    getGalleryProblems,
    addFavorite
  } = useMapDispatch();

  useEffect(() => {
    if (type === FILTER_PROBLEMS_TRIGGER) {
      setFilterTabNumber(PROBLEMS_TRIGGER)
      const auxState = { ...state };
      auxState.hasMore = true;
      setState(auxState);
    } else {
      setInfiniteScrollHasMoreItems(true);
      setIsLoading(false);
    }
  }, [totalElement])

  useEffect(() => {
    if (cardInformation && type !== FILTER_PROBLEMS_TRIGGER) {
      const a = Math.ceil(cardInformation.length / 20) + 1
      if ((nextPageOfCards + 1) === a) {
        setNextPageOfCards(a)
      }
    }  
  }, [favorites, cardInformation]);

  useEffect(() => {
    if (type !== FILTER_PROBLEMS_TRIGGER) {
      const z = cardInformation?.map((ci: any) => {
        let totalCost = ci?.project_costs?.filter((cost: any) => cost.code_cost_type_id === 1)
          .reduce((sum: any, current: any) => sum + parseFloat(current.cost), 0)
          .toLocaleString('en-US', { style: 'currency', currency: 'USD',  minimumFractionDigits: 0, maximumFractionDigits: 0 });
        let streamsNames = ci?.stream?.map((obj: any) => obj?.stream?.stream_name).filter((value: any, index: number, self: any) => self.indexOf(value) === index).join(', ');
        let output = {
          name: ci?.requestName,
          type: ci?.projecttype,
          status: ci?.status,
          phase: ci?.phase,
          stream: streamsNames,
          sponsor: ci?.sponsor,
          cost: totalCost,
          project_id: ci?.project_id,
          isFavorite: favorites.some((f: any) => (f.project_id && f.project_id === ci.project_id) || (f.problem_id && f.problem_id === ci.problemid)),
          onBase: ci?.onBase,
          project_idS: ci?.project_id,
          cartodb_id: ci?.cartodb_id,
          code_project_type_id: ci?.code_project_type_id,
        };
        return output;
      });
      setDataProjects(z);
    }
  }, [cardInformation, favorites]);

  useEffect(() => {
    if (type === FILTER_PROBLEMS_TRIGGER) {
      const z1 = cardInformation?.slice(0, size).map((ci: any) => {
        let totalCost = ci?.componentCost?.toLocaleString('en-US', { style: 'currency', currency: 'USD',  minimumFractionDigits: 0, maximumFractionDigits: 0 });
        let output = {
          requestName: ci?.requestName,
          type: ci?.type,
          problempriority: ci?.priority,
          problemtype: ci?.problemtype,
          cost: totalCost || 0,
          local_government: ci?.jurisdiction,
          actions: ci?.count,
          percentaje: ci?.percentage,
          problemid: ci?.problemid,
          problem_idS: ci?.problemid,
          coordinates: ci?.coordinates,
          cartodb: ci?.cartodb_id,
        };
        return output;
      });
      setDataProblems(z1);
    }
  }, [cardInformation]);

  useEffect(() => {
    if (nextPageOfCards === 1 && type !== FILTER_PROBLEMS_TRIGGER) {
      let div = document.getElementsByClassName('infinite-scroll-component')[0]
      if (div) div.scrollTop = 0;
    }
  }, [nextPageOfCards]);

  useEffect(() => {
    favoriteList(type === 'Problems');
  }, [user]);

  useEffect(() => {
    //log importante no borrar por ahora
    console.log(window.innerWidth)
    setWindowWidth(window.screen.width);
  }, [window.innerWidth])
  useEffect(() => {
    if(dropdownIsOpen){
      setItHasComponents(true)
    }
  }, [dropdownIsOpen]);
  const deleteFavorite = (id: number) => {
    setTimeout(() => {
        favoriteList(type === 'Problems');
    }, 1000);
}

  const stopModal = (e: any) => {
    e.domEvent.stopPropagation();
    e.domEvent.nativeEvent.stopImmediatePropagation();
  }
  const deleteFunction = (email: string, id: number, type: string) => {
    const suffix = type === 'Problems' ? '?isProblem=1' : '';
    datasets.deleteDataWithBody(`${SERVER.DELETE_FAVORITE}${suffix}`, { email: email, id: id }, datasets.getToken()).then(favorite => {
      // if (deleteCallback) {
      //   deleteCallback(id);
      // }
   });    
  }
  const openCommentProject = (record: any) => {
    setData(record);
    setOpenModal(true);
  }
  useEffect(() => {    
    if (data && openModal) {
      setOpenModal(false);
      setVisible(true);
    }
  }, [data, openModal]);

  const menu = (record:any) => {
    const onClickPopupCard = (e: any) => {
      stopModal(e);
      // e.stopPropagation();
      switch (e.key) {
        case 'popup-show-components':
          if(itHasComponents){
            // showComponents();
          }
          break;
        case 'popup-zoom':
          if (record.project_id) {
            changeCenter(record.project_id, '');
          }else{
            changeCenter('', record.coordinates);
          }          
          return;
        case 'popup-favorite':
          record.isFavorite ?  deleteFunction(user.email, (record.project_id || record.problemid), type) : addFavorite(user.email, (record.project_id || record.problemid), type === 'Problems' );
          setDropdownIsOpen(false);
          setOpenedDropdownKey(null);
          favoriteList(type === FILTER_PROBLEMS_TRIGGER);
          return;
        case 'popup-comment':
          openCommentProject(record);
          setDropdownIsOpen(false);
          setOpenedDropdownKey(null);
          openDiscussionTab(true);
          return;
        default:
          break;
      }
    };
    let menuPopupItem: MenuProps['items'] = [
      // {
      //   key: 'popup-title',
      //   style: {cursor: 'auto', color: 'rgba(17, 9, 60, 0.5)', background: 'rgba(61, 46, 138, 0.07)', margin:'0px'},
      //   label: <label style={{ cursor: 'auto', color: 'rgba(17, 9, 60, 0.5)' }}>
      //     LIST ACTIONS
      //   </label>
      // },
      // {
      //   key: 'popup-show-components',
      //   label: <span className="menu-item-text" style={{ opacity: itHasComponents?1:0.5 }} >Show Actions</span>
      // },
      {
        key: 'popup-zoom',
        label: <span className="menu-item-text" onClick={() => {changeCenter(record.project_id, '')}}>
          <img src="/Icons/ic-search.svg" alt="" width="24px" height="16"/>&nbsp;
          Zoom to Feature
        </span>
      },
      {
        key: 'popup-favorite',
        label: <span className="menu-item-text">
          <img src="/Icons/u_edit-alt.svg" alt="" width="24px" height="24"/>&nbsp;
          {record.isFavorite ? 'Unfavorite Card':'Favorite Card'}
        </span>
      },
      {
        key: 'popup-comment',
        label: <span className="menu-item-text" >
          <img src="/Icons/u_comment-alt.svg" alt="" width="24px" height="24"/>&nbsp;
          Add a Comment
        </span>
      },
      // {
      //   key: 'popup-add-team',
      //   label: <span className="menu-item-text" style={{ cursor: 'auto', opacity: 0.5 }}>Add Team Member</span>
      // }
    ];
    return <Menu
      className="menu-dropdown-map"
      style={{ backgroundColor: 'white', border: 0 }}
      items={menuPopupItem}
      onClick={onClickPopupCard}
    >
    </Menu>
  };
  useEffect(()=>{
    if(sortOrder && type !== FILTER_PROBLEMS_TRIGGER){
      const auxOptions = { ...filterProjectOptions };
      auxOptions.order = filterProjectOptions.order === 'asc' ? 'desc' : 'asc';
      auxOptions.column = sortBy;       
      setFilterProjectOptions(auxOptions);
      getGalleryProjects();      
    }else if (sortOrder && type === FILTER_PROBLEMS_TRIGGER){
      const auxOptions = { ...filterProblemOptions };
      auxOptions.order = filterProblemOptions.order === 'asc' ? 'desc' : 'asc';
      auxOptions.column = sortBy;
      setFilterProblemOptions(auxOptions);
      getGalleryProblems();
    }
    resetNextPageOfCards();
    resetInfiniteScrollItems();
    resetInfiniteScrollHasMoreItems();
  },[sortBy, sortOrder])
  

  const columnsProjects: ColumnsType<any> = [
    {
      title: 'Project Name',
      width: windowWidth > 1900 ? (windowWidth > 2500 ? '490px' : '368px') : '220px',
      dataIndex: 'name',
      className: 'project-name',
      key: 'name',
      fixed: 'left',
      sorter: (a, b, sortOrder) => {
        setSortBy('projectname');
        setSortOrder(sortOrder === 'ascend' ? 'asc' : 'desc');
        return 0;
      },
      render: (name: any, record: any) => (
        <div className="content-project-name">
          <Popover placement="top" content={<p className="main-map-list-name-popover-text"> <b>{name}</b> <br /> <b>Project ID: </b> {record.project_id} <br /> <b>OnBase Project Number: </b> {record.onBase?record.onBase:"-"}</p>}>
            <p className="project-name">{name}</p>
          </Popover>
          <Popover
            overlayClassName="pop-card-map"
            content={menu(record)}
            placement="bottom"
            trigger="click"
            visible={openedDropdownKey === record.project_id}
            onVisibleChange={visible => {
              if (visible) {
                setOpenedDropdownKey(record.project_id);
              } else {
                setOpenedDropdownKey(null);
              }
            }}
          >
            <MoreOutlined
              onClick={e => {
                e.stopPropagation();
              }}
              className="more-ico"
            />
          </Popover>
        </div>
      ),
    },
    {
      title: 'Type',
      width: windowWidth > 1900 ? (windowWidth > 2500 ? '199px' : '140px') : '86px',
      dataIndex: 'type',
      key: 'type',
      className: 'project-type',
      sorter: (a, b, sortOrder) => {
        setSortBy('projecttype');
        setSortOrder(sortOrder === 'ascend' ? 'asc' : 'desc');
        return 0;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'project-status',
      width: windowWidth > 1900 ? (windowWidth > 2500 ? '199px' : '140px') : '86px',
      sorter: (a, b, sortOrder) => {
        setSortBy('status');
        setSortOrder(sortOrder === 'ascend' ? 'asc' : 'desc');
        return 0;
      },
      render: (text: any) => <span className={'status-projects-' + (text ? text.toLowerCase() : 'draft')}>{text}</span>,
    },
    {
      title: 'Phase',
      dataIndex: 'phase',
      key: 'phase',
      width: windowWidth > 1900 ? (windowWidth > 2500 ? '224px' : '159px') : '100px',
      sorter: (a, b, sortOrder) => {
        setSortBy('phase');
        setSortOrder(sortOrder === 'ascend' ? 'asc' : 'desc');
        return 0;
      },
    },
    {
      title: 'Stream',
      dataIndex: 'stream',
      key: 'stream',
      width: windowWidth > 1900 ? (windowWidth > 2500 ? '261px' : '187px') : '131px',
      sorter: (a, b, sortOrder) => {
        setSortBy('stream');
        setSortOrder(sortOrder === 'ascend' ? 'asc' : 'desc');
        return 0;
      },
    },
    {
      title: 'Sponsor',
      dataIndex: 'sponsor',
      key: 'sponsor',
      width: windowWidth > 1900 ? (windowWidth > 2500 ? '224px' : '159px') : '110px',
      sorter: (a, b, sortOrder) => {
        setSortBy('project_sponsor');
        setSortOrder(sortOrder === 'ascend' ? 'asc' : 'desc');
        return 0;
      },
    },
    {
      title: 'Est. Cost',
      dataIndex: 'cost',
      key: 'cost',
      width: windowWidth > 1900 ? (windowWidth > 2500 ? '202px' : '143px') : '108px',
      sorter: (a, b, sortOrder) => {
        setSortBy('estimatedcost');
        setSortOrder(sortOrder === 'ascend' ? 'asc' : 'desc');
        return 0;
      },
    },
  ];

  const columnsProblem: ColumnsType<any>  = [
    {
      title: 'Problem Name',
      width: windowWidth > 1900 ? windowWidth > 2500 ? '490px':'368px':'220px',
      dataIndex: 'requestName',
      key: 'requestName',
      fixed: 'left',
      sorter: (a, b, sortOrder) => {
        setSortBy('requestname')
        setSortOrder(sortOrder === 'ascend' ? 'asc' : 'desc');
        return 0
      },
      render: (text: any, record: any) => <div className="content-project-name">
        <Popover placement="top" content={<p className="main-map-list-name-popover-text"><b> { text }</b> <br /><b>Problem ID: </b> {record.problemid}</p>}>
            <p className="project-name">{text}</p>
          </Popover>
      <Popover
        overlayClassName="pop-card-map"
        content={menu(record)}
        placement="bottom"
        trigger="click"
        visible={openedDropdownKey === record.problemid}
        onVisibleChange={(visible) => {
          if (visible) {
            setOpenedDropdownKey(record.problemid);
          } else {
            setOpenedDropdownKey(null);
          }
        }}
      >
        <MoreOutlined onClick={(e) => {
            e.stopPropagation();
          }}  className="more-ico" />
      </Popover>
      </div>,
    },
    {
      title: 'Type',
      width: windowWidth > 1900 ? windowWidth > 2500 ? '250px':'222px':'147px',
      dataIndex: 'problemtype',
      key: 'problemtype',      
      sorter: (a, b, sortOrder) => {
        setSortBy('problemtype')
        setSortOrder(sortOrder === 'ascend' ? 'asc' : 'desc');
        return 0
      },
    },
    // {
    //   title: 'Priority',
    //   dataIndex: 'problempriority',
    //   key: 'problempriority',
    //   width: windowWidth > 1900 ? windowWidth > 2500 ? '199px':'140px':'86px',
    //   sorter: (a, b, sortOrder) => {
    //     setSortBy('problem_severity')
    //     setSortOrder(sortOrder === 'ascend' ? 'asc' : 'desc');
    //     return 0
    //   },
    // },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: windowWidth > 1900 ? windowWidth > 2500 ? '224px':'159px':'110px',
      sorter: (a, b, sortOrder) => {
        setSortBy('component_count')
        setSortOrder(sortOrder === 'ascend' ? 'asc' : 'desc');
        return 0
      },
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      width: windowWidth > 1900 ? windowWidth > 2500 ? '224px':'159px':'100px',
      sorter: (a, b, sortOrder) => {
        setSortBy('estimated_cost')
        setSortOrder(sortOrder === 'ascend' ? 'asc' : 'desc');
        return 0
      },
    },
    {
      title: 'Local Government',
      dataIndex: 'local_government',
      key: 'local_government',
      width: windowWidth > 1900 ? windowWidth > 2500 ? '261px':'187px':'131px',
      sorter: (a, b, sortOrder) => {
        setSortBy('local_government')
        setSortOrder(sortOrder === 'ascend' ? 'asc' : 'desc');
        return 0
      },
    },
    {
      title: 'Percentage',
      dataIndex: 'percentaje',
      key: 'percentaje',
      width: windowWidth > 1900 ? windowWidth > 2500 ? '202':'143px':'108px',
      sorter: (a, b, sortOrder) => {
        setSortBy('component_status')
        setSortOrder(sortOrder === 'ascend' ? 'asc' : 'desc');
        return 0
      },
      render: (text: any) => <>{`${text} %`}</>,
    },
  ];
  useEffect(() => {
    if(type === FILTER_PROBLEMS_TRIGGER){
        setFilterTabNumber(PROBLEMS_TRIGGER)
        const auxState = { ...state };
        auxState.hasMore = true;
        setState(auxState);
    } else {
        setInfiniteScrollHasMoreItems(true);
        setIsLoading(false);
    }
}, [totalElement])

const fetchMoreData = async () => {
  if (type === 'Problems') {
    if (state.items.length >= totalElement - size) {
      const auxState = { ...state };
      if (state.items.length !== totalElements) {
        auxState.items = state.items.concat(
          Array.from({ length: totalElement - state.items.length })
        );
      }
      auxState.hasMore = false;
      setState(auxState);
      return;
    }
    setTimeout(() => {
      const auxState = { ...state };
      const newItems = Array.from({ length: size }).map((_, index) => cardInformation[state.items.length + index]);
      const newParsedItems = newItems.map((ci: any) => {
        let totalCost = ci?.componentCost?.toLocaleString('en-US', { style: 'currency', currency: 'USD',  minimumFractionDigits: 0, maximumFractionDigits: 0 });
        let output = {
          requestName: ci?.requestName,
          type: ci?.type,
          problempriority: ci?.priority,
          problemtype: ci?.problemtype,
          cost: totalCost || 0,
          local_government: ci?.jurisdiction,
          actions: ci?.count,
          percentaje: ci?.percentage,
          problemid: ci?.problemid,
          coordinates: ci?.coordinates,
          cartodb: ci?.cartodb_id,
        };
        return output;
      });
      auxState.items = state.items.concat(newParsedItems);
      setDataProblems([...dataProblems, ...newParsedItems]);
      setState(auxState);
    }, 500);
  } else {
    if (infiniteScrollItems.length < totalElements) {
      if (!isLoading) {
        setIsLoading(true);
        getExtraProjects(nextPageOfCards);
      }
      const nextItems = infiniteScrollItems.concat(Array.from({ length: size }));
      setInfiniteScrollItems(nextItems);
      setInfiniteScrollHasMoreItems(true);
    }
  }
};  
const setValuesMap = (type: string, value: string) => {
  setHighlighted({type: type, value: value});
}
const handleScroll = (e:any) => {
  const { scrollTop, scrollLeft, clientHeight, scrollHeight, clientWidth, scrollWidth } = e.target;
  const isHorizontalScroll = Math.abs(scrollLeft - lastScrollLeft) > Math.abs(scrollTop - lastScrollTop);
  lastScrollLeft = scrollLeft;
  lastScrollTop = scrollTop;
  // if (isHorizontalScroll) {
  //   return;
  // }else{
    if (scrollHeight - scrollTop === clientHeight) {
      fetchMoreData();
    }
  // }
};
const changeCenter = (id:any, coordinateP:any) => {
  if(setZoomProjectOrProblem){
  if (id) {      
    datasets.getData(SERVER.GET_BBOX_BY_PROJECT_ID(id)).then((coordinates: any) => {
      if( coordinates.length ) {
        setZoomProjectOrProblem(coordinates);
      }
    });
  } else {
    setZoomProjectOrProblem(coordinateP);
  }}
  
}

  return (<>
  {
    visible &&
    <DetailModal
      visible={visible}
      setVisible={setVisible}
      data={data}
      type={type}
      deleteCallback={deleteFavorite}
      addFavorite={addFavorite}
    />
  }
    {isLoading && <LoadingView />}
    <div className="table-scroll-map-list" onScroll={handleScroll}>
      <InfiniteScroll
        dataLength={type !== FILTER_PROBLEMS_TRIGGER ? totalElement : state.items.length}
        next={fetchMoreData}
        hasMore={type !== FILTER_PROBLEMS_TRIGGER ? infiniteScrollHasMoreItems : state.hasMore}
        className="scroll-infinite-mobile"
        endMessage={''}
        scrollableTarget="table-list-map-infinite-scroll"  
        loader={<></>}
      >
        {type !== FILTER_PROBLEMS_TRIGGER ?
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setData(record);
                // changeCenter(record.project_id, '');                
                setTimeout(() => {
                  setVisible(true);
                }, 1500);

              },
              onMouseEnter: (e) =>  {
                let typeInData:any 
                let valueInData:any  
                if(record.project_id){
                  typeInData = MHFD_PROJECTS;
                  valueInData = record.project_id;
                } else if(record.problemid){
                  typeInData = record.type;
                  valueInData = record.cartodb_id;
                }
                e.stopPropagation()
                setHoveredRow(valueInData)
                return setValuesMap(typeInData, valueInData)
              },
            };
          }} 
          onHeaderRow={(record, rowIndex) => {
            return {
              onMouseEnter: (e) =>  {
                setHoveredRow(-1)
              },
            }
          }}
          className="table-list-map" 
          columns={columnsProjects} 
          dataSource={dataProjects} 
          pagination={false} 
          scroll={{ x: windowWidth>1900? windowWidth>2500? 1922:1152: 996, y: 'calc(100vh - 315px)' }}
          rowClassName={(record, index) => {
            if(selectedOnMap.id !== -1 &&  record.project_id === selectedOnMap.id){
              return ('row-geometry-body-selected')
            }
            if(hoveredRow === record.project_id){
              return ('row-geometry-body-selected')
            }
            return ('')
          }}
        />
        : <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setData(record);
                // changeCenter(record.project_id, '');
                setTimeout(() => {
                  setVisible(true);
                }, 1500);
                // changeCenter('', record.coordinates)
              },
              onMouseEnter: (e) =>  {
                let typeInData:any 
                let valueInData:any  
                if(record.project_id){
                  typeInData = MHFD_PROJECTS;
                  valueInData = record.project_id;
                } else if(record.problemid){
                  typeInData = record.type;
                  valueInData = record.cartodb;
                }
                e.stopPropagation()
                return setHoveredRow(valueInData)
                // return setValuesMap(typeInData, valueInData)
              },
            };
          }} 
          onHeaderRow={(record, rowIndex) => {
            return {
              onMouseEnter: (e) =>  {
                setHoveredRow(-1)
              },
            }
          }}
          className="table-list-map" 
          columns={columnsProblem} 
          dataSource={dataProblems} 
          pagination={false} 
          scroll={{x: windowWidth > 1900 ? windowWidth > 2500 ? 1651: 1238: 816, y: 'calc(100vh - 315px)' }}
          rowClassName={(record, index) => {
            if(selectedOnMap.id !== -1 && record.cartodb === selectedOnMap.id){
              return ('row-geometry-body-selected')
            }
            if(hoveredRow === record.cartodb){
              return ('row-geometry-body-selected')
            }
            return ('')
          }}
        />}
        </InfiniteScroll>
      </div>
    </>
  )
};

export default ListViewMap;