import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import PhaseBody from 'routes/portfolio-view/components/PhaseBody';

const { Panel } = Collapse;

const PhaseGroups = ({
  data,
  setCollapsePhase,
  collapsePhase,
  setOpenTable,
  openTable,
  index,
  currentGroup,
  tabKey,
  email,
  phaseRef,
  totalLabelWidth,
  scheduleList,
  phaseList,
  statusCounter,
  setTollData,
  setOpenModalTollgate,
  actionsDone,
  userBrowser,
  setOpenPiney,
  setGrapphicOpen,
  setPositionModalGraphic,
  setDataModal,
  setPopUpData,
  headerRef,
  filterPagination,
  updateFavorites,
  setUpdateFavorites,
  dataId,
}: {
  data: any,
  setCollapsePhase: any,
  collapsePhase: any,
  setOpenTable: any,
  openTable: any,
  index: any,
  currentGroup: any,
  tabKey: any,
  email: any,
  phaseRef: any,
  totalLabelWidth: any,
  scheduleList: any,
  phaseList: any,
  statusCounter: any,
  setTollData: any,
  setOpenModalTollgate: any,
  actionsDone: any,
  userBrowser: any,
  setOpenPiney: any,
  setGrapphicOpen: any,
  setPositionModalGraphic: any,
  setDataModal: any,
  setPopUpData: any,
  headerRef: any,
  filterPagination: any,
  updateFavorites: any,
  setUpdateFavorites: any,
  dataId: any,
}) => {
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [page, setPage] = useState(1);
  const [counter, setCounter] = useState([]);

  useEffect(() => {
    if(currentGroup !== 'streams'){
      datasets.postData(SERVER.GET_COUNT_PMTOOLS_PAGE(currentGroup, dataId) + `?code_project_type_id=${tabKey}`, filterPagination).then((res: any) => {
        setCounter(res.count)
      })
    }    
  },[tabKey,filterPagination])
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
  let limitPage = Number(counter) % 20 > 0 ?  Math.floor(Number(counter) / 20 + 1) : Number(counter) / 20;
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
            currentGroup={currentGroup}
            dataId={data}
            tabKey={tabKey}
            next={next}
            prev={prev}
            setNext={setNext}
            setPrev={setPrev}
            email={email}
            index={index}
            phaseRef={phaseRef}
            totalLabelWidth={totalLabelWidth}
            scheduleList={scheduleList}
            phaseList={phaseList}
            statusCounter={statusCounter}
            setTollData={setTollData}
            setOpenModalTollgate={setOpenModalTollgate}
            actionsDone={actionsDone}
            userBrowser={userBrowser}
            setGrapphicOpen={setGrapphicOpen}
            setPositionModalGraphic={setPositionModalGraphic}
            setDataModal={setDataModal}
            groupName={data.value}
            setOpenPiney={setOpenPiney}
            setPopUpData={setPopUpData}
            headerRef={headerRef}
            filterPagination={filterPagination}
            updateFavorites={updateFavorites}
            setUpdateFavorites={setUpdateFavorites}
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