import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'antd';
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import PhaseGroups from 'routes/portfolio-view/components/PhaseGroups';
import PineyView from 'routes/portfolio-view/components/PineyView';
import SearchDropdown from 'routes/portfolio-view/components/SearchDropdown';
import { usePortflioState, usePortfolioDispatch } from '../../../hook/portfolioHook';
import { handleAbortError } from 'store/actions/mapActions';

const PhaseViewPag = ({  
  tabKey,
}: {
  tabKey: any,
}) => {
  const {
    currentGroup,
  phaseList,
  statusList,
  } = usePortflioState();
  const { getActionsDone, getCreatedActions } = usePortfolioDispatch();
  const [availableStatusList, setAvailableStatusList] = useState<any>([]);
  const [detailGroup, setDetailGroup] = useState<any>(null);
  const [updateAction,setUpdateAction] = useState(false);
  const headerRef = useRef<null | HTMLDivElement>(null);
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const phaseHeaderRef = useRef<null | HTMLDivElement>(null);
  const windowWidth: any = window.innerWidth;
  const labelWidth = windowWidth > 1800 && windowWidth <= 1999 ? 125 : windowWidth > 2000 && windowWidth <= 2999 ? 150 : windowWidth >= 3001 && windowWidth <= 3999 ? 185 : 95;
  const phaseRef = useRef<any[]>([]);
  let totalLabelWidth = phaseList.length * labelWidth;
  const [openPiney, setOpenPiney] = useState(false);

  useEffect(() => {
    getActionsDone();
    getCreatedActions();
  }, [tabKey, updateAction])

  useEffect(() => {
    const z: any = [];
    statusList.map((img: any) => {
      if (z.indexOf(img.status_name) === -1) {
        z.push(img.status_name)
      }
    });
    const counts = z.map((item1: any) => {
      const elements = statusList.filter((item: any) => item.status_name === item1);
      return [
        item1,
        (elements.length) * labelWidth,
        elements[0].code_status_type_id
      ]
    });
    setAvailableStatusList(counts)
  }, [statusList])

  useEffect(() => {
    const controller = new AbortController();
    datasets.getData(
      SERVER.GET_LIST_GROUPS(currentGroup),
      datasets.getToken(),
      controller.signal
    ).then((valuesGroups) => {
      setDetailGroup(valuesGroups.groups)
    }).catch(handleAbortError);
    return () => {
      controller.abort();
    };
  }, [currentGroup]);
  let drr = phaseHeaderRef.current;
  let myDiv = drr?.querySelector('.container-phase');
  let widthMax = myDiv? myDiv.clientWidth : 0;

  return <>
    {openPiney && (
      <div className="phaseview-body">
        <div className="piney-text">
          <PineyView
            setOpenPiney={setOpenPiney}
            setUpdateAction={setUpdateAction}
            updateAction={updateAction}
            isDetail={false}
          />
        </div>
      </div>
    )}
    <div className="scroll-custom" style={{width:`${widthMax - 5}px`}}  ref={scrollRef}
        onScrollCapture={(e: any) => {
          let dr: any = scrollRef.current;
          if (scrollRef.current) {
            if(phaseRef.current){
              phaseRef.current.forEach((elem: any, index:number) => {
                phaseRef.current[index].scrollTo(dr.scrollLeft, dr.scrollTop);
              })
            }
            if (headerRef.current) {
              headerRef.current.scrollTo(dr.scrollLeft, headerRef.current?.scrollTop);
            }
          }
        }}
      >
        <div className="scroll-bar" style={{ width: `${totalLabelWidth - 5}px`}}></div>
      </div>  
    <Row>
      <Col xs={{ span: 10 }} lg={{ span: 5 }}>
        <div className="vertical-line"></div>
        <SearchDropdown />
      </Col>
      <Col xs={{ span: 34 }} lg={{ span: 19 }}>
        <div className="phaseview-body">
          <div className="phaseview-content">
            <div
              className="header-title"
              ref={headerRef}
              onScrollCapture={(e: any) => {
                let dr: any = headerRef.current;
                if (headerRef.current) {                  
                  if(phaseRef.current){
                    phaseRef.current.forEach((elem: any, index:number) => {
                      phaseRef.current[index].scrollTo(dr.scrollLeft, dr.scrollTop);
                    })
                  }
                  if (scrollRef.current) {
                    scrollRef.current.scrollTo(dr.scrollLeft, 0);
                  }                                 
                }
              }}
            >
              <div className="phaseview-title-label" style={{ width: totalLabelWidth, paddingRight: '13px' }} id="phaseviewTitlleWidth">
                {
                  availableStatusList.map((item: any, index: number) => (
                    <div className='text-p' key={item[2]} style={index === 0 ? { display: 'flex', width: item[1], border: 'transparent' } : { display: 'flex', width: item[1] }}>
                      <hr className="hr2" style={{ width: item[1] / 2 - 48 }}></hr>{item[0]}<hr className="hr2" style={{ width: item[1] / 2 - 48 }}></hr>
                    </div>
                  ))
                }
              </div>
              <div style={{ width: totalLabelWidth, paddingRight: '13px' }} className="phaseview-title" id="phaseviewTitlleWidth">
                {phaseList.map((item: any) => {
                  return <p key={item.code_phase_type_id} style={{ width: labelWidth }}>{item.phase_name}</p>
                })}
              </div>
            </div>
          </div>
          <div className="header-timeline" style={{ borderTop: '1px solid #d4d2d9', width: '100%' }}></div>
        </div>
      </Col>
    </Row>
    {
      <div className="phase-groups" ref={phaseHeaderRef}>
        <div
          className="search"
        >{
            detailGroup?.map((elem: any, index: number) => {
              return (
                <div id={elem.id} key={elem.id}>
                  <PhaseGroups
                    data={elem}
                    index={index}
                    tabKey={tabKey}
                    phaseRef={phaseRef}
                    totalLabelWidth={totalLabelWidth}
                    setOpenPiney={setOpenPiney}
                    headerRef={headerRef}
                    dataId={currentGroup === 'streams' && elem.value!==''? elem.value : elem.id}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    }
  </>
};

export default PhaseViewPag;
