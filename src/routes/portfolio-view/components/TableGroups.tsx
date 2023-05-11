import React, { useEffect, useRef, useState } from 'react';
import { Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import TableBody from 'routes/portfolio-view/components/TableBody';
import { usePortflioState, usePortfolioDispatch } from 'hook/portfolioHook';
import { useMapState } from 'hook/mapHook';
import { handleAbortError } from 'store/actions/mapActions';
import { LIMIT_PAGINATION } from 'constants/constants';

const { Panel } = Collapse;

const TableGroups = ({
  data,
  setOpenTable,
  openTable,
  index,
  tabKey,
  scrollRef,
  tableHeaderRef,
  tableRef,
  tabKeyId,
  headerRef,
  dataId,
}: {
  data: any,
  setOpenTable: any,
  openTable: any,
  index: any,
  tabKey: any,
  scrollRef:any,
  tableHeaderRef:any,
  tableRef: any,
  tabKeyId: any,
  headerRef: any,
  dataId: any,
}) => {
  const { currentGroup, collapsePhase } = usePortflioState();
  const { setCollapsePhase } = usePortfolioDispatch();
  const {
    filterProjectOptions,
  } = useMapState();
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [counter, setCounter] = useState([]);
  const scrollHeaderScrollRef = useRef<null | HTMLDivElement>(null);
  const [page, setPage] = useState(1);
 
  useEffect(() => {
    const sendfilter = {...filterProjectOptions};
    delete sendfilter.sortby;
    delete sendfilter.sortorder;
    const controller = new AbortController();
    datasets.postData(
      `${SERVER.GET_COUNT_PMTOOLS_PAGE(currentGroup, dataId)}?code_project_type_id=${tabKeyId}`,
      sendfilter,
      datasets.getToken(),
      controller.signal
    )
    .then((res: any) => {
      setCounter(res.count)
    })
    .catch(handleAbortError);
    return () => {
      controller.abort();
    }
  }, [tabKeyId, filterProjectOptions, currentGroup, dataId]);

  let limitPage = Number(counter) % LIMIT_PAGINATION > 0 ?  Math.floor(Number(counter) / LIMIT_PAGINATION + 1) : Number(counter) / LIMIT_PAGINATION;
  const getActiveKeys = () => {
    const indices = openTable.reduce(
      (out: string | any[], bool: any, index: any) => bool ? out.concat(index) : out,
      []
    );
    if(Number(counter) === 0) {
      return false;
    }
    return indices;
  }
  let drr = tableHeaderRef.current;
  let myDiv = drr?.querySelector('.ant-table-thead');
  let myDivWidth = myDiv? myDiv.clientWidth :0;

  return <>
    <div  className="table-body2" id={data.id} key={data.id}>
      <Collapse
        activeKey={getActiveKeys()}
        onChange={
          () => {
            setCollapsePhase(!collapsePhase)            
            const newOpenTable = [...openTable];
            newOpenTable[index] = !openTable[index] as any;
            setOpenTable(newOpenTable);
          }
        }
        className=''
        collapsible={Number(counter) ===0 ? "disabled" :"header"}
      >   
        <Panel header={
          <>
            <div className="header-group">
            <div style={{display: 'flex', maxWidth: '79%', alignItems: 'center'}}>
              <span style={{width: '100%',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',}}>{`${data.value==='NoGroupAvailable'?'No Group Available':data.value} (${counter})`}</span>
            </div>
              <div className="btn-collapse" onClick={(e) => {e.stopPropagation(); }}>
                <LeftOutlined onClick={(e) => {
                  e.stopPropagation();
                  setPrev(true);
                }}
                className="btn-arrow-porfolio"
                style={page === 1 ? {color:'#2518633d', cursor: 'default'}:{}} 
                />
                <RightOutlined onClick={(e) => {
                  e.stopPropagation();
                  setNext(true);
                }}
                className="btn-arrow-porfolio"
                style={page === limitPage || Number(counter) === 0 ? {color:'#2518633d', cursor: 'default'}:{}} />
              </div>
            </div>
            <div style={{width:'81%'}} className="scroll-line" ref={scrollHeaderScrollRef}
            
              onScrollCapture={(e: any) => {
                let dr: any = scrollHeaderScrollRef.current;
                if (scrollHeaderScrollRef.current) {
                  if (tableRef.current) {
                    tableRef.current.forEach((elem: any, index:number) => {
                      tableRef.current[index].scrollTo(dr.scrollLeft, tableRef.current[index].scrollTop);
                    })
                  }
                  if (scrollRef.current) {
                      scrollRef.current.scrollTo(dr.scrollLeft, 0);
                  }
                  if (headerRef.current) {
                    headerRef.current.scrollTo(dr.scrollLeft, 0);
                  }
                }
              }}
            >
              <div className="line-collapse" style={{width: `${myDivWidth}px`}}></div>
            </div>
          </>
        } key={index}>
          <TableBody
            dataId={dataId}
            tabKey={tabKey}
            next={next}
            prev={prev}
            setNext={setNext}
            setPrev={setPrev}
            openTable={openTable}
            index={index}
            scrollHeaderScrollRef={scrollHeaderScrollRef}
            tableRef={tableRef}
            tabKeyId={tabKeyId}
            headerRef={headerRef}
            counter={counter}
            page={page}
            setPage={setPage}
          ></TableBody>
        </Panel>
      </Collapse>
    </div>
  </>
};

export default TableGroups;
