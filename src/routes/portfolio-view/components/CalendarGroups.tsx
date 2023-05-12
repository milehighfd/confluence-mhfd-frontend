import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import { usePortflioState, usePortfolioDispatch } from 'hook/portfolioHook';
import CalendarBody from 'routes/portfolio-view/components/CalendarBody';
import { useMapState } from "hook/mapHook";
import { handleAbortError } from 'store/actions/mapActions';
import { LIMIT_PAGINATION } from 'constants/constants';

const { Panel } = Collapse;

const CalendarGroups = ({
  data,
  setOpenTable,
  openTable,
  index,
  tabKey,
  setTollData,
  actionsDone,
  setOpenPiney,
  setEditData,
  setPopUpData,
  updatedGroup,
  secondaryUpdatedGroup,
  dataId,
}: {
  data: any,
  setOpenTable: any,
  openTable: any,
  index: any,
  tabKey: any,
  setTollData: any,
  actionsDone: any,
  setOpenPiney: any,
  setEditData: any,
  setPopUpData: any,
  updatedGroup: any,
  secondaryUpdatedGroup: any,
  dataId: any,
}) => {
  const { currentGroup, collapsePhase } = usePortflioState();
  const { setCollapsePhase } = usePortfolioDispatch();
  const {
    filterProjectOptions,
  } = useMapState();

  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [page, setPage] = useState(1);
  const [counter, setCounter] = useState([]);

  useEffect(() => {
    const sendfilter = {...filterProjectOptions};
    delete sendfilter.sortby;
    delete sendfilter.sortorder;
    if(currentGroup === 'streams') return;
    const controller = new AbortController();
    datasets.postData(
      `${SERVER.GET_COUNT_PMTOOLS_PAGE(currentGroup, dataId)}?code_project_type_id=${tabKey}`,
      sendfilter,
      datasets.getToken(),
      controller.signal
    ).then((res: any) => {
      setCounter(res.count)
    }).catch(handleAbortError);
    return () => {
      controller.abort();
    };
  },[tabKey,filterProjectOptions])

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
  let limitPage = Number(counter) % LIMIT_PAGINATION > 0 ?  Math.floor(Number(counter) / LIMIT_PAGINATION + 1) : Number(counter) / LIMIT_PAGINATION;

  return <>
    <div  className="table-body2" id={data.id} key={data.id} style={{overflowY:'hidden', overflowX: 'hidden'}}>
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
        collapsible={Number(counter) ===0 ? "disabled" :"header"}
      >
        <Panel header={
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
              style={page === limitPage || Number(counter) === 0 ? {color:'#2518633d', cursor: 'default'}:{}}
              />
            </div>
          </div>
        } key={index}>
          <CalendarBody
            dataId={data}
            tabKey={tabKey}
            next={next}
            prev={prev}
            setNext={setNext}
            setPrev={setPrev}
            index={index}
            setTollData={setTollData}
            actionsDone={actionsDone}
            setOpenPiney={setOpenPiney}
            groupName={data.value}
            setEditData={setEditData}
            setPopUpData={setPopUpData}
            updatedGroup={updatedGroup}
            secondaryUpdatedGroup={secondaryUpdatedGroup}
            counter={counter}
            page={page}
            setPage={setPage}
          ></CalendarBody>
        </Panel>
      </Collapse>
    </div>
  </>
};

export default CalendarGroups;
