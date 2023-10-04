import React, { useState, useEffect } from 'react';
import { Drawer, Select, InputNumber, Button, Col, Row } from 'antd';
import HorizontalBarChartAnalytics from 'Components/FiltersProject/NewProblemsFilter/HorizontalBarChartAnalytics';
import { formatter, MaintenanceTypes, priceFormatter, priceParser } from 'Components/Work/Request/RequestViewUtil';
import { CHART_CONSTANTS } from 'Components/FiltersProject/NewProblemsFilter/Charts.constants';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { WINDOW_WIDTH, WORK_PLAN, LOCALITIES_TYPES, YEAR_LOGIC_2024 } from 'constants/constants';
import { useMapState } from 'hook/mapHook';
import { setShowBoardStatus } from 'store/actions/requestActions';
import { useNotifications } from 'Components/Shared/Notifications/NotificationsProvider';

const { Option } = Select;

const Analytics = () => {
  const {
    sumByCounty: dataByCounty,
    sumByServiceArea: dataBySA,
    sumByLocalGov: dataByLocalGovernment,
    year: initialYear,
    tabKey,
    namespaceId: boardId,
    showAnalytics: visible,
    sumTotal: totals,
    totalCountyBudget,
    localityType: localityTypeState,
    namespaceId,
    localityFilter,
    board
  } = useRequestState();
  const { openNotification } = useNotifications();
  const { setShowAnalytics, setTotalCountyBudget } = useRequestDispatch();
  const { showAnalytics } = useRequestState();
  const [totalSum, setTotalSum] = useState(0);
  const [tcb, setTcb] = useState(totalCountyBudget || 0);
  const [year, setYear] = useState<any>(tabKey === 'Maintenance' ? 2000 : +initialYear);
  const [dataByLocality, setDataByLocality] = useState(dataByCounty);
  const [localityType, setLocalityType] = useState('County');
  const [maxiQ, setMaxiQ] = useState(0);
  const [quantityData, setQuantityData] = useState([]);
  const [maxiA, setMaxiA] = useState(0);
  const [amountData, setAmountData] = useState([]);
  const [countiesNames, setCountiesNames] = useState('');
  const {tabActiveNavbar} = useMapState();
  const [localityTypeLabel, setLocalityTypeLabel] = useState('County');
  const clickUpdate = () => {
    if (namespaceId.type === WORK_PLAN &&
      localityFilter !== 'Mile High Flood District' &&
      Object.keys(board).length > 0 &&
      namespaceId.year >= YEAR_LOGIC_2024 &&
      namespaceId.projecttype === 'Maintenance'
    ) {
      const formattedTargetCosts = {
        targetcost1: tcb,
      };
      datasets.postData(`${SERVER.BUDGET_BOARD_TABLE}/add-or-update`, {
        boards_id: board.board_id,
        locality: localityFilter,
        ...formattedTargetCosts
      }, datasets.getToken()).then((data) => {
        openNotification('Success! Your budget update was saved!', "success");
      });
    }else{
      datasets.putData(SERVER.UPDATE_BUDGET, {
        boardId,
        budget: tcb
      },datasets.getToken()).then((data) => {
        openNotification('Success! Your budget update was saved!', "success");
        setTotalCountyBudget(tcb);
      })
      .catch((e) => {
        console.log(e);
      });
    }    
  };

  useEffect(() => {
    if (totalCountyBudget){
      setTcb(totalCountyBudget);
    }else{
      setTcb(0);
    }
  }, [totalCountyBudget]);

  useEffect(() => {
    let sum = 0;
    for (let i = 1; i <= 5; i++) {
      sum += totals[`req${i}`];
    }
    setTotalSum(sum);
  }, [totals]);
  let barsColor = '#5e63e4';

  useEffect(() => {
    let maxiQ = 0;
    let quantityData;
    let maxiA = 0;
    let amountData;
    setCountiesNames(dataByLocality.map((d: any) => d.locality).join(','));
    // 2000 is default value for all subtypes in maintenance
    if (year === 2000) {
      quantityData = dataByLocality.map((d: any) => {
        let totalCounter = 0;
        for (let i = 0; i < years.length; ++i) {
          const currYear = +years[i];
          let counter = d[`cnt${currYear - initialYear + 1}`] || 0;
          if (counter !== 0) counter = +counter;
          totalCounter += counter;
          maxiQ = Math.max(maxiQ, counter);
          setMaxiQ(maxiQ);
        }
        return {
          value: d.locality,
          counter: totalCounter,
          selected: true
        }
      });
      setQuantityData(quantityData);
      amountData = dataByLocality.map((d: any) => {
        let totalCounter = 0;
        for (let i = 0; i < years.length; ++i) {
          const currYear = +years[i];
          let amount = d[`req${currYear - initialYear + 1}`] || 0;
          if (amount !== 0) amount = +amount;
          totalCounter += amount;
          maxiA = Math.max(maxiA, amount);
          setMaxiA(maxiA);
        }
        return {
          value: d.locality,
          counter: totalCounter,
          selected: true
        }
      });
      setAmountData(amountData);
    } else {
      const cntColumnName = `cnt${year - initialYear + 1}`;
      const reqColumnName = `req${year - initialYear + 1}`;
      quantityData = dataByLocality.map((d: any) => {
        maxiQ = Math.max(maxiQ, d[cntColumnName] || 0);
        setMaxiQ(maxiQ);
        return {
          value: d.locality,
          counter: d[cntColumnName] || 0,
          selected: true
        }
      });
      setQuantityData(quantityData);
      amountData = dataByLocality.map((d: any) => {
        maxiA = Math.max(maxiA, d[reqColumnName] || 0);
        setMaxiA(maxiA);
        return {
          value: d.locality,
          counter: d[reqColumnName] || 0,
          selected: true
        }
      })
      setAmountData(amountData);
    }
  }, [dataByLocality,year,tabKey]);

  useEffect(() => {
    setYear(+initialYear);
    setShowBoardStatus(false);
  }, [initialYear, tabKey]);

  useEffect(() => {
    if (localityType === 'Local Government') {
      setDataByLocality(dataByLocalGovernment);
    } else if (localityType === 'County') {
      setDataByLocality(dataByCounty);
    } else {
      setDataByLocality(dataBySA);
    }
  }, [localityType,showAnalytics,dataByLocalGovernment,dataByCounty,dataBySA]);

  const years: any[] = [];
  for (var i = 0; i < 5; i++) {
    years.push(+initialYear + i);
  }  

  const handleChange = (value: string) => {
    setLocalityType(value);
  };
  useEffect(() =>{
    setShowAnalytics(false);
  },[tabActiveNavbar])
  useEffect(() =>{
    if (localityTypeState === LOCALITIES_TYPES.CODE_STATE_COUNTY){
      setLocalityTypeLabel('County');      
    }else if(localityTypeState === LOCALITIES_TYPES.CODE_SERVICE_AREA){
      setLocalityTypeLabel('Service Area');
    }else{
      setLocalityTypeLabel('');
    }
  },[localityTypeState])
  return (
    <Drawer
      title={
        <h5 className='title-drawer'>
          <span style={{}}><img src="/Icons/icon-89.svg" alt="" className="icons-drawers" />Analytics</span>
          <img src="/Icons/ic_close.svg" alt=""  className='close-style-drawer' onClick={() => setShowAnalytics(false)} />
        </h5>
      }
      placement="right"
      closable={false}
      visible={visible}
      className="work-utilities"
      mask={false}>
      <div style={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex:1 }}>
      {tabActiveNavbar === WORK_PLAN && tabKey === 'Maintenance' &&
        <>
          <div>
            <h6>{`Total ${localityTypeLabel} Budget`}</h6>
            <InputNumber className="rheostat-input" size='large' min={0}
              formatter={priceFormatter}
              parser={priceParser}
              value={tcb} onChange={(e: any) => {
                setTcb(e);
              }}
            />
            <Row style={{ marginTop: '10px' }}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <h6 style={{ marginBottom: '0px' }}>Requests</h6>
                <label style={{ fontSize: '16px' }}>{priceFormatter(totalSum)}</label>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <h6 style={{ marginBottom: '0px' }}>Contingency</h6>
                <label style={{
                  color: tcb - totalSum < 0 ? 'red' : 'black', fontSize: '16px'
                }}>{priceFormatter(tcb - totalSum)}</label>
              </Col>
            </Row>
            <div style={{ textAlign: 'end' }}>
              <Button
                className="btn-purple btn-maintenence"
                style={{ marginTop: '10px'}}
                onClick={clickUpdate}
              >
                Save Total County Budget
              </Button>
            </div>
          </div>
          <div className="line-01" style={{ marginLeft: '0px' }}></div>
        </>
          }
        <Row style={{ width: '100%' }}>
          <Col span={tabKey === 'Maintenance' ? 24:12} className='title-utilities'>FOR
            <Select
              style={{ marginLeft: '11px', border: '1px solid #D9D9D9', borderRadius: '4px' }}
              listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
              defaultValue={year}
              value={year}
              onChange={setYear}>
              {
                years.map((y, i) => (
                  <Option key={i} value={y}>{
                    tabKey !== 'Maintenance' ? y : MaintenanceTypes[i]
                  }</Option>
                ))
              }
            </Select></Col>
          <Col
            span={tabKey === 'Maintenance' ? 24:12}
            className='title-utilities'
            style={tabKey === 'Maintenance' ? {marginTop:'12px'}:{}}
            >
              <span style={tabKey === 'Maintenance' ? {width: '28px', display: 'inline-block'}:{}}>BY</span>
            <Select
              defaultValue="County"
              style={{ marginLeft: '11px', border: '1px solid #D9D9D9', borderRadius: '4px', width: '70%' }}
              dropdownMatchSelectWidth={false}
              onChange={handleChange}
              options={[
                { value: 'Local Government', label: 'Local Government' },
                { value: 'County', label: 'County' },
                { value: 'Service Area', label: 'Service Area' },
              ]}
            />
          </Col>
        </Row>
        <div className="line-01" style={{ marginLeft: '0px' }}></div>
      </div>
      <div className='subtitle-requests'>
        <h6 style={{ marginTop: '10px', textTransform: 'uppercase' }}>{`Requests by ${localityType}`}
        </h6>
      </div>
      <div className="graph" >
        {maxiQ > 0 &&
          <HorizontalBarChartAnalytics
            data={quantityData}
            type={'requests'}
            selected={countiesNames}
            onSelect={() => { }}
            defaultValue={[]}
            color={barsColor}
            axisLabel={'Number of Projects'}
            scrollClass={'svg-scroll-analytics'}
            showControls={false}
            withClickEvent={false}
            withAnimation={false}
            spaceBetween={40}
            minHeight={40}
            width={220}
            opacityOpaque={CHART_CONSTANTS.opacityFull}
            labelOverflowRight={true}
            minBarSize={0}
          />
        }
      </div>
      <div className="subtitle-requests" style={{marginTop: WINDOW_WIDTH>1900? WINDOW_WIDTH>2500? '100px' : '80px' :'30px' }}>
        <h6 style={{ marginTop: '10px', textTransform: 'uppercase' }}>{`Dollars Requested by ${localityType}`}
        </h6>
      </div>
      <div className="graph" >
        {maxiA > 0 &&
          <HorizontalBarChartAnalytics
            data={amountData}
            type={'amounts'}
            selected={countiesNames}
            onSelect={() => { }}
            defaultValue={[]}
            color={barsColor}
            axisLabel={'Thousands of Dollars'}
            scrollClass={'svg-scroll-analytics'}
            showControls={false}
            withClickEvent={false}
            withAnimation={false}
            spaceBetween={40}
            minHeight={40}
            width={220}
            barLabelFormatter={(d: any) => {
              return formatter.format(d.counter)
            }}
            opacityOpaque={CHART_CONSTANTS.opacityFull}
            labelOverflowRight={true}
            minBarSize={0}
          />
        }
      </div>
    </Drawer>
  )
}

export default Analytics;
