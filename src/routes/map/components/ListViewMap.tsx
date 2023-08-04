import { List, Row, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useProjectDispatch, useProjectState } from "hook/projectHook";
import React, { useEffect, useState } from "react";
import { FILTER_PROBLEMS_TRIGGER, PROBLEMS_TRIGGER } from "../constants/tabs.constants";
import { useMapDispatch, useMapState } from "hook/mapHook";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingView from "Components/Loading/LoadingView";
import { useProfileState } from "hook/profileHook";


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
  const [dataSet, setDataSet] = useState<any>([]);
  const [showData, setShowData] = useState<any>([]);
  const [showData2, setShowData2] = useState<any>([]);
  const [state, setState] = useState({
    items: Array.from({ length: size }),
    hasMore: true
  });
  const [carInfo, setCardInfo] = useState<any>([]);
  const { setNextPageOfCards, setInfiniteScrollItems, setInfiniteScrollHasMoreItems } = useProjectDispatch();
  const { userInformation: user } = useProfileState();
  const { nextPageOfCards, infiniteScrollHasMoreItems, infiniteScrollItems } = useProjectState();
  const {
    favorites,
    paramFilters: params
  } = useMapState();
  const {
    favoriteList,
    getExtraProjects,
    setFilterTabNumber
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
    if (favorites && carInfo) {
      setDataSet(
        carInfo.map((ci: any) => {
          return {
            ...ci,
            isFavorite: favorites.some((f: any) => (f.project_id && f.project_id === ci.project_id) || (f.problem_id && f.problem_id === ci.problemid))
          }

        })
      )
    }
    setCardInfo(cardInformation);    
  }, [favorites, cardInformation]);

  useEffect(() => {
    const z = cardInformation?.map((ci: any) => {
      let totalCost = ci?.project_costs?.filter((cost: any) => cost.code_cost_type_id === 1)
        .reduce((sum: any, current: any) => sum + parseFloat(current.cost), 0)
        .toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      let streamsNames = ci?.stream?.map((obj: any) => obj?.stream?.stream_name).filter((value: any, index: number, self: any) => self.indexOf(value) === index).join(', ');
      let output = {
        name: ci?.requestName,
        type: ci?.projecttype,
        status: ci?.status,
        phase: ci?.phase,
        stream: streamsNames,
        sponsor: ci?.sponsor,
        cost: totalCost
      };
      return output;
    });
    setShowData(z);
  }, [cardInformation]);

  useEffect(() => {    
    const z1 = cardInformation.slice(0, size).map((ci: any) => {
      let output = {
        requestName: ci?.requestName,
        type: ci?.type,
        problempriority: ci?.priority,
        cost: ci?.estimatedCost,
        local_government: ci?.jurisdiction,
        actions: ci?.count,
        percentaje: ci?.percentage
      };
      return output;
    });
    setShowData2(z1);
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
  
  const columns: ColumnsType<any>  = [
    {
      title: 'Project Name',
      width: '220px',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      sorter: (a, b) => a.name - b.name,
      render: (text: any) => <p className="project-name">{text}</p>,
    },
    {
      title: 'Type',
      width: '147px',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type - b.type,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '86px',
      sorter: (a, b) => a.status - b.status,
      render: (text: any) => <span className={"status-projects-"+ (text.toLowerCase())}>{text}</span>,
    },
    {
      title: 'Phase',
      dataIndex: 'phase',
      key: 'phase',
      width: '100px',
      sorter: (a, b) => a.phase - b.phase,
    },
    {
      title: 'Stream',
      dataIndex: 'stream',
      key: 'stream',
      width: '131px',
      sorter: (a, b) => a.stream - b.stream,
    },
    {
      title: 'Sponsor',
      dataIndex: 'sponsor',
      key: 'sponsor',
      width: '110px',
      sorter: (a, b) => a.sponsor - b.sponsor,
    },
    {
      title: 'Est. Cost',
      dataIndex: 'cost',
      key: 'cost',
      width: '108px',
      sorter: (a, b) => a.cost - b.cost,
    },
  ];

  const columnsProblem: ColumnsType<any>  = [
    {
      title: 'Problem Name',
      width: '220px',
      dataIndex: 'requestName',
      key: 'requestName',
      fixed: 'left',
      sorter: (a, b) => a.name - b.name,
      render: (text: any) => <p className="project-name">{text}</p>,
    },
    {
      title: 'Type',
      width: '147px',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type - b.type,
    },
    {
      title: 'Priority',
      dataIndex: 'problempriority',
      key: 'problempriority',
      width: '86px',
      sorter: (a, b) => a.problempriority - b.problempriority,      
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      width: '100px',
      sorter: (a, b) => a.cost - b.cost,
    },
    {
      title: 'Local Government',
      dataIndex: 'local_government',
      key: 'local_government',
      width: '131px',
      sorter: (a, b) => a.local_government - b.local_government,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: '110px',
      sorter: (a, b) => a.actions - b.actions,
    },
    {
      title: 'Percentaje',
      dataIndex: 'percentaje',
      key: 'percentaje',
      width: '108px',
      sorter: (a, b) => a.percentaje - b.percentaje,
      render: (text: any) => <p>{`${text} %`}</p>,
    },
  ];

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
        console.log(auxState)
        setState(auxState);
        return;
      }
      setTimeout(() => {
        const auxState = { ...state };
        const newItems = Array.from({ length: size }).map((_, index) => cardInformation[state.items.length + index]);
        auxState.items = state.items.concat(newItems);
        console.log(newItems)
        setShowData2([...showData2, ...newItems]);
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
  const handleScroll = (e:any) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop === clientHeight) {
      fetchMoreData();
    }
  };
  return (<>
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
        <Table className="table-list-map" columns={columns} dataSource={showData} pagination={false} scroll={{ x: 996, y: 'calc(100vh - 315px)' }}/>:
        <Table className="table-list-map" columns={columnsProblem} dataSource={showData2} pagination={false} scroll={{ x: 996, y: 'calc(100vh - 315px)' }}/>}
      </InfiniteScroll>
    </div>
    </>
  )
};

export default ListViewMap;