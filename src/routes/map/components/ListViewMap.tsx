import { List, Row, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useProjectDispatch, useProjectState } from "hook/projectHook";
import React, { useEffect, useState } from "react";
import { FILTER_PROBLEMS_TRIGGER, PROBLEMS_TRIGGER } from "../constants/tabs.constants";
import { useMapDispatch, useMapState } from "hook/mapHook";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingView from "Components/Loading/LoadingView";


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
  const [state, setState] = useState({
    items: Array.from({ length: size }),
    hasMore: true
  });
  const [carInfo, setCardInfo] = useState<any>([]);
  const { setNextPageOfCards, setInfiniteScrollItems, setInfiniteScrollHasMoreItems } = useProjectDispatch();
  const { nextPageOfCards, infiniteScrollHasMoreItems, infiniteScrollItems } = useProjectState();
  const {
    filterProblemOptions,
    filterProjectOptions,
    filterComponentOptions,
    selectedOnMap,
    favorites,
    paramFilters: params
  } = useMapState();
  const {
    getGalleryProblems,
    getGalleryProjects,
    setFilterProblemOptions,
    setFilterProjectOptions,
    setFilterComponentOptions,
    setZoomProjectOrProblem,
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
      let totalCost = ci?.project_costs?.reduce((sum:any, current:any) => sum + current.cost, 0);
      let streamsNames = ci?.stream?.map((obj:any) => obj?.stream?.stream_name).filter((value:any, index:number, self:any) => self.indexOf(value) === index).join(', ');
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
  const fetchMoreData = async () => {
    console.log('fetchMoreData')
    if (infiniteScrollItems.length < totalElements) {
      if (!isLoading) {
        setIsLoading(true);
        getExtraProjects(nextPageOfCards);
      }
      const nextItems = infiniteScrollItems.concat(Array.from({ length: size }));
      setInfiniteScrollItems(nextItems);
      setInfiniteScrollHasMoreItems(true);
    }
  };  

  return (<>
    {isLoading && <LoadingView />}
    <Row id='table-list-map' gutter={[16, 16]} style={{ overflowY: 'scroll', height: '600px' }}>
      <InfiniteScroll
        dataLength={type !== FILTER_PROBLEMS_TRIGGER ? totalElement : state.items.length}
        next={fetchMoreData}
        hasMore={type !== FILTER_PROBLEMS_TRIGGER ? infiniteScrollHasMoreItems : state.hasMore}
        className="scroll-infinite-mobile"
        endMessage={''}
        scrollableTarget="table-list-map"
        loader={<></>}
      >
        <Table className="table-list-map" columns={columns} dataSource={showData} pagination={false} />
      </InfiniteScroll>
    </Row></>
  )
};

export default ListViewMap;