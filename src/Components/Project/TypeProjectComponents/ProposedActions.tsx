import React, { useState, useEffect } from "react";
import { Table, Button, Popover, Tooltip } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, PlusCircleFilled } from '@ant-design/icons';
import { useProjectDispatch, useProjectState } from "hook/projectHook";

interface ProposedActionsProps {
  keys: any;
  groups: any;
  removeIndComponent: any;
  removeComponent: any;
  thisIndependentComponents: any;
  setThisIndependentComponents: any;
  visibleUnnamedComponent: any;
  isDrawState: any;
  onClickDraw: any;
  applyIndependentComponent: any;
  contentIndComp: any;
  changeValueIndComp: any;
  index: number;
}

export const ProposedActions = (props: ProposedActionsProps) => {
  const { 
    keys, 
    groups, 
    removeIndComponent, 
    removeComponent,
    thisIndependentComponents,
    visibleUnnamedComponent,
    isDrawState,
    onClickDraw,
    applyIndependentComponent,
    contentIndComp,
    changeValueIndComp,
    index
  } = props;

  const {
    setHighlightedComponent, 
    getZoomGeomComp,
    setComponentIntersected
  } = useProjectDispatch();
  const [groupParsed, setGroupParsed] = useState<any[]>([]);
  const {
    disableFieldsForLG,
  } = useProjectState();

  const replaceUnderscoresAndCapitalize = (inputString:string) => {
    const stringWithSpaces = inputString.replace(/_/g, ' ');
    const capitalizedWords = stringWithSpaces
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return capitalizedWords;
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });

  useEffect(() => {
    if (Array.isArray(groups)) {
      const output = groups.flatMap((x: any) =>
        x?.components?.map((y: any) => ({
          key: y.object_id + y.cartodb_id,
          action: y,
          cost: y.original_cost,
          status: y.status,
          problem: x.problemname,
          cartodb_id: y.cartodb_id,
          table: y.table,
        }))
      );
      setGroupParsed(output);
    }
  }, [groups]);

  const onClickActions = (action:any) => {
    console.log('click', action);
    setHighlightedComponent(action);
    getZoomGeomComp(action.table, action.objectid);
  }

  const columns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      sorter: (a:any, b:any) => a.table.localeCompare(b.table),
      width: '37%',
      render: (text: any) => {
        if(text === 'Total Proposed Cost'){
          return (
            <span className='total-cost'>
              {text}
            </span>
          );
        }
        return (
          <div style={{width:'100%', height: '100%'}} onClick={() => onClickActions(text)}>
            {replaceUnderscoresAndCapitalize(text.table)}
          </div>
          );
      }
    },
    {
      title: 
      <>Cost <Tooltip title={
        <div style={{zIndex:"1000"}}>Costs are adjusted for inflation.</div>
      }><ExclamationCircleOutlined style={{opacity:"0.4"}}/></Tooltip> </>,
      dataIndex: 'cost',
      key: 'cost',
      sorter: (a:any, b:any) => a.cost - b.cost,
      width: '17%',
      render: (cost: any) => {
        return (formatter.format(cost));
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a:any, b:any) => a.status.localeCompare(b.status),
      width: '15%',
      render: (text: any) => {
        if(text && text.length > 0){
          return (
            <span className='tag-active'>
              {text}
            </span>
          );
        }
        return ('');
      }
    },
    {
      title: 'Problem Group',
      dataIndex: 'problem',
      key: 'problem',
      sorter: (a:any, b:any) => a.problem.localeCompare(b.problem),
      width: '30%',
      render: (text:any) => {
        return (text ? (text === 'No name' ? 'No Problem Group' : text) : 'No Problem Group')
      }
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: '1%',
      render: (text:any, record:any) => {
        if(text && text === true){
          return ('');
        }else{
          return (
            <div>
              <DeleteOutlined className='ico-delete' disabled={disableFieldsForLG} onClick={() => disableFieldsForLG ? null : removeComponent(record)} />
            </div>
          );
        }
      }
    },
  ];
  const columnsIndependent  = [
    {
      title: 'Independent Actions',
      dataIndex: 'name',
      key: 'action',
      width: '37%',
      sorter: (a:any, b:any) => a.name.localeCompare(b.name),
      render: (text:any,record:any) => (
        <input
          value={record.name}
          onChange={(e) => changeValueIndComp(e, 'name', record)}
          className='input-independent'
          placeholder='Proposed Actions'
        />
      )
    },
    {
      title:  
      <>Cost <Tooltip  title={
        <div style={{zIndex:"1000"}}>Costs are adjusted for inflation.</div>
      }><ExclamationCircleOutlined style={{opacity:"0.4"}}/></Tooltip> </>,
      dataIndex: 'cost',
      key: 'cost',
      sorter: (a:any, b:any) =>  a.cost - b.cost,
      render: (text:any,record:any) => (
        <input
          value={formatter.format(record.cost)}
          onChange={(e) => changeValueIndComp(e, 'cost', record)}
          className='input-independent'
          placeholder='Proposed Actions'
        />
      ),
      width: '17%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a:any, b:any) => a.status.localeCompare(b.status),
      width: '15%',
      render: (text: any) => {
        if(text && text.length > 0){
          return (
            <span className='tag-active'>
              {text}
            </span>
          );
        }
        return ('');
      }
    },
    {
      title: 'Problem Group',
      dataIndex: 'problem',
      key: 'problem',
      sorter: (a:any, b:any) => a.problem.localeCompare(b.problem),
      width: '30%',
      render: (text:any) => {
        return (text ? (text === 'No name' ? 'No Problem Group' : text) : 'No Problem Group')
      }
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: '1%',
      render: (text:any, record:any) => {
        if(text && text === true){
          return ('');
        }else{
          return (
            <div>
              <DeleteOutlined className='ico-delete' disabled={disableFieldsForLG} onClick={() => disableFieldsForLG ? null : removeIndComponent(record)} />
            </div>
          );
        }
      }
    },
  ];

  return (
    <>
      <div className="sub-title-project">
        <h5 className="requestor-information">{index}. PROPOSED ACTIONS&nbsp;*</h5>
      </div>
      <div className={"draw " + (isDrawState ? 'active' : '')} onClick={disableFieldsForLG ? null : onClickDraw}>
        <img src="" className="icon-draw active" style={{ WebkitMask: 'url("/Icons/icon-08.svg") center center no-repeat' }} />
        <p>Click on the icon above and draw a polygon to select action items</p>
      </div>
      {((keys && keys !== 0 && keys.length && groups && Object.keys(groups).length > 0)) &&
        <p className='requiered-text'>
            <span className='requiered' onClick={()=> setComponentIntersected([])}>Clear Table</span>
          </p>
      }
      {((keys && keys !== 0 && keys.length && groups && Object.keys(groups).length > 0)) &&
        <>
          <Table pagination={false} dataSource={groupParsed} columns={columns} className='table-project' />
        </>
      }
      {visibleUnnamedComponent && <Table dataSource={thisIndependentComponents} columns={columnsIndependent} className='table-project' />}
      <Button disabled={disableFieldsForLG} className="btn-transparent-green" onClick={() => { applyIndependentComponent() }}><PlusCircleFilled /> Independent Actions</Button> <Popover content={contentIndComp}><img src="/Icons/icon-19.svg" alt="" height="10px" className='icon-actions' /></Popover>
    </>
  );
}

export default ProposedActions;