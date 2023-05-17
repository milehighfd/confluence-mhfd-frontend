import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import PhaseBody from 'routes/portfolio-view/components/PhaseBody';
import { usePortflioState, usePortfolioDispatch } from 'hook/portfolioHook';
import { useMapState } from 'hook/mapHook';
import { LIMIT_PAGINATION } from 'constants/constants';

const { Panel } = Collapse;

const PhaseGroups = ({
  data,
  index,
  tabKey,
  phaseRef,
  totalLabelWidth,
  actionsDone,
  userBrowser,
  setOpenPiney,
  setPopUpData,
  headerRef,
  dataId,
}: {
  data: any,
  index: any,
  tabKey: any,
  phaseRef: any,
  totalLabelWidth: any,
  actionsDone: any,
  userBrowser: any,
  setOpenPiney: any,
  setPopUpData: any,
  headerRef: any,
  dataId: any,
}) => {
  const { currentGroup, collapsePhase, openGroups } = usePortflioState();
  const { setCollapsePhase, setOpenGroups } = usePortfolioDispatch();
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
    datasets.postData(SERVER.GET_COUNT_PMTOOLS_PAGE(currentGroup, dataId) + `?code_project_type_id=${tabKey}`, sendfilter).then((res: any) => {
      setCounter(res.count)
    })
  }, [tabKey, filterProjectOptions])
  
  const getActiveKeys = () => {
    const indices = openGroups.reduce(
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
    <div  className="table-body2" id={data.id} key={data.id}>
      <Collapse
        activeKey={getActiveKeys()}
        onChange={
          () => {
            setCollapsePhase(!collapsePhase)            
            const newOpenTable = [...openGroups];
            newOpenTable[index] = !openGroups[index] as any;
            setOpenGroups(newOpenTable);
          }
        } className=''
        collapsible={Number(counter) ===0 ? "disabled" :"header"}
      >   
        <Panel header={
          <div  className="header-group">
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
          <PhaseBody
            dataId={data}
            tabKey={tabKey}
            next={next}
            prev={prev}
            setNext={setNext}
            setPrev={setPrev}
            index={index}
            phaseRef={phaseRef}
            totalLabelWidth={totalLabelWidth}
            actionsDone={actionsDone}
            userBrowser={userBrowser}
            groupName={data.value}
            setOpenPiney={setOpenPiney}
            setPopUpData={setPopUpData}
            headerRef={headerRef}
            counter={counter}
            page={page}
            setPage={setPage}
          ></PhaseBody>
        </Panel>
      </Collapse>
    </div>
  </>
};

export default PhaseGroups;