import React, { useEffect, useState } from "react";
import { Drawer, Button,  List, Row, Col, Checkbox, Popover, Select, Switch, Space } from 'antd';
import { getData, getToken, putData } from "../../../Config/datasets";
import { SubmitModal } from "../Request/SubmitModal";
import { boardType } from "../Request/RequestTypes";
import { GET_BOARD_DEPENDENCIES, UPDATE_BOARD_BY_ID } from "Config/endpoints/board";
import { useRequestDispatch } from "hook/requestHook";
import { WINDOW_WIDTH } from "constants/constants";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const content00 = (<div className="popver-info">When Work Request Status is changed to "Approved" and saved, the Work Request is sent to MHFD for review and the Work Request is locked. All Project Types must be checked as "Reviewed" in the list below and saved prior to changing Work Request Status.</div>);
const content01 = (<div className="popver-info">This is an internal QA/QC workspace for Local Governments. All Project Types on the Work Request must be checked as "Reviewed" and saved before the overall Work Request Status can be changed to "Approved."</div>);
const content02 = (<div className="popver-info">This is a place to add notes on a Local Government work request. Notes will be visible to any user from the same Local Government as well as MHFD staff.</div>);
const content00WP = (<div className="popver-info">This field indicates the status of the Work Plan shown. Changing the status to Approved will finalize the Work Plan for approval by the MHFD Board.</div>);
const content01WP = (<div className="popver-info">This section indicates all of the applicable jurisdictions within this Work Plan, and whether they have submitted their finalized Work Requests (green dot) or not (yellow dot). All jurisdictions must be green before the Work Plan can be approved.</div>);
const Status = ({ locality, boardId, visible, setVisible, status, comment, type, substatus, setAlertStatus, setShowAlert, onUpdateHandler}: {
  locality: string,
  boardId: any,
  visible: boolean,
  setVisible: Function,
  status: any,
  comment: any,
  type: boardType,
  substatus: any,
  setAlertStatus: Function,
  setShowAlert: Function,
  onUpdateHandler: Function
}) => {
  const {
    setBoardComment: _setBoardComment,
    setBoardStatus: _setBoardStatus,
    setBoardSubstatus: _setBoardSubstatus,
    loadColumns
  } = useRequestDispatch();
  const [boardStatus, setBoardStatus] = useState(status);//from backend
  const [boardComment, setBoardComment] = useState(comment || '');
  const [boardSubstatus, setBoardSubstatus] = useState(substatus);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [boardsData, setBoardsData] = useState<any[]>([]);
  const [boardsLength, setBoardsLength] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [pending, setpending] = useState(false);
  const [arrayStateSwitch, setarrayStateSwitch] = useState(new Array(100).fill(true));

  const save = () => {
    putData(UPDATE_BOARD_BY_ID(boardId), {
      status: boardStatus,
      comment: boardComment,
      substatus: boardSubstatus
    }, getToken())
        .then((r) => {

          _setBoardStatus(boardStatus)
          _setBoardComment(boardComment);
          _setBoardSubstatus(boardSubstatus);
          setBoardStatus(boardStatus)
          setBoardComment(boardComment);
          setBoardSubstatus(boardSubstatus);
          let alertStatus: { type: 'success' | 'error', message: string } = {
            type: 'error',
            message: 'An error has ocurred, please try again later.'
          };
          if (r) {
            alertStatus.type = 'success';
            alertStatus.message = `${locality}'s ${type === 'WORK_PLAN' ? 'Work Plan': 'Work Request'} status has been updated.`;
          }
          setAlertStatus(alertStatus);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            onUpdateHandler();
            loadColumns(boardId);
          }, 4000);
        })
        .catch((e) => {
          console.log('e', e)
        })
  }

  useEffect(() => {
    if (type === 'WORK_PLAN') {
      let list = substatus ? substatus.split(',') : [];
      let ls = ['Capital', 'Study', 'Maintenance', 'Acquisition', 'R&D']
      setBoardsData(ls.map((l) => {
        return {
          locality: l,
          status: list.includes(l) ? 'Approved' : 'Under Review',
          checked: list.includes(l) ? 'Approved' : 'Under Review'
        }
      }))
      setBoardsLength(ls.length);
    } else {
      setLoading(true);
      getData(GET_BOARD_DEPENDENCIES(boardId), getToken())
        .then((r) => {
          let list = substatus ? substatus.split(',') : [];
          let newBoardsSorted = [...r.boards];
          newBoardsSorted.sort(function(a, b) {
            if (locality !== 'MHFD District Work Plan') {
              return a.locality.localeCompare(b.locality);
            } else {
              if (a.locality.includes('County') && b.locality.includes('County')) {
                return a.locality.localeCompare(b.locality);
              } else if (a.locality.includes('Service Area') && b.locality.includes('Service Area')) {
                return a.locality.localeCompare(b.locality);
              } else if (a.locality.includes('County')) {
                return -1;
              } else {
                return 1;
              }
            }
         });
          setBoardsData(newBoardsSorted.map((b: any) => {
            return {
              ...b,
              status: b.status === 'Approved' ? 'Approved' : 'Under Review',
              checked: list.includes(b.locality) ? 'Approved' : 'Under Review'
            }
          }));
          setBoardsLength(newBoardsSorted.length)
        })
        .catch((e) => {
          console.log('e', e)
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }, [substatus])

  const onCheck = (val: string) => {
    let ls = boardSubstatus ? boardSubstatus.split(',') : [];
    let index = ls.indexOf(val);
    if (index === -1) {
      ls.push(val);
    } else {
      ls.splice(index, 1);
    }
    setBoardSubstatus(ls.join(','))
    setBoardsData(
      boardsData.map((bd) => {
        return {
          ...bd,
          checked: ls.includes(bd.locality) ? 'Approved' : 'Under Review'
        }
      })
    )
  }

  function apllyOwnership(ownership: boolean): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
    { visibleAlert && <SubmitModal
      locality={locality}
      boardSubstatus={boardSubstatus}
      boardsLength={boardsLength}
      type={type}
      visibleAlert = {visibleAlert}
      setVisibleAlert ={setVisibleAlert}
      setSave = {save}
      currentStatus={status}
      pending = {pending}
     />
    }
    <Drawer
      title={<h5 className='title-drawer'>
        <span> <img src="/Icons/icon-88.svg" alt="" className="icons-drawers"/> STATUS</span>
        <img src="/Icons/ic_close.svg" alt="" style={{ alignItems: 'flex-end', cursor: 'pointer' }} onClick={() => setVisible(false)} />
        </h5>
        
      }
      placement="right"
      closable={false}
      onClose={() => setVisible(false)}
      visible={visible}
      className="work-utilities"
      mask={false}
    >
      <h6>Status Management</h6>
      <p style={{fontSize:'12px', lineHeight:'13.79px', color:'$purple00'}}>As part of the MHFD Work Request approval process, confirm that all project types are ready and click save. Once saved, the board is locked and cannot be edited.</p>
      {/* <Select
        value={boardStatus ? boardStatus : '- Select -'}
        className="ant-dropdown-link"
        listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
        getPopupContainer={trigger => trigger.parentNode}>
        <Select.Option value="key-Approved">
          <div onClick={() => setBoardStatus('Approved')}>
            <h6 style={{marginBottom:'0px'}}><i className="mdi mdi-circle" style={{ color: '#29C499' }}></i> Approved</h6>
            <p style={{marginBottom:'0px'}}>{`${type === 'WORK_PLAN' ? 'MHFD' : 'Local Government'} Staff approves the Work Request.`}</p>
          </div>
        </Select.Option>
        <Select.Option value="key-Under-Review">
          <div onClick={() => {
            if (status === 'Approved') {
              alert(`You can't set board to 'Under Review'`)
              return;
            }
            setBoardStatus('Under Review');
          }}>
            <h6 style={{marginBottom:'0px'}}><i className="mdi mdi-circle" style={{ color: '#FFC664' }}></i> Under Review</h6>
            <p style={{marginBottom:'0px'}}>{`${type === 'WORK_PLAN' ? 'MHFD' : 'Local Government'} Staff are developing ${type === 'WORK_PLAN' ? 'or reviewing' : ''} the Work Request.`}</p>
          </div>
        </Select.Option>
      </Select> */}
          <Row style={{marginTop:'20px', border:'1px solid #E6E9EA', borderRadius:'8px', display:'flex', alignItems:'center', padding:'11px 16px', backgroundColor:'#f5f7ff'}}>
            <Col lg={{ span: 12 }}>
              <p style={{fontSize:'10px', color:'#11093C'}}>Project Type                
              </p>
            </Col>           
            <Col lg={{ span: 12 }}>
              <p style={{textAlign:'center', fontSize:'10px', color:'#11093C', lineHeight:'11.49px'}}>Is this Board <br/>Ready for Review?</p>
            </Col>
            
          </Row>
          {
            loading ? (<div>Loading...</div>) : (
              <List
                itemLayout="horizontal"
                dataSource={boardsData}
                renderItem={(item, index )=> (
                  <List.Item className="menu-utilities">
                    <List.Item.Meta
                      title={
                        <h6 style={{paddingLeft:'10px', fontSize:'15px'}}>
                          {/* <i className="mdi mdi-circle" style={{color: item.status === 'Approved' ? '#29C499' : '#ffdd00' , background:'transparent'}}>
                          </i> */}
                          &nbsp; {item.locality}
                        </h6>
                      }
                    />
                    {
                      (type === 'WORK_PLAN' || locality === 'Mile High Flood District') &&
                      // <Checkbox checked={item.checked === 'Approved'} onClick={() => onCheck(item.locality)} />
                      <Space direction="vertical" style={{paddingRight:'25px'}}>                        
                      <Switch checkedChildren={arrayStateSwitch[index] ? "Yes":'No'} unCheckedChildren={arrayStateSwitch[index] ? "No":'Yes'} defaultChecked 
                      className={arrayStateSwitch[index] ?"switch-status":'switch-status-no'}
                      onClick={()=>{const newArray = [...arrayStateSwitch];
                      newArray[index] = !arrayStateSwitch[index];
                      setarrayStateSwitch(newArray);}}/>                      
                    </Space>
                    }
                  </List.Item>
                )}
              />
            )
          }
      <br />
      <p>Notes <Popover content={content02}>  <img src="/Icons/icon-19.svg" alt="" height="10px" /> </Popover></p>
      <textarea className="note" rows={8} value={boardComment} onChange={e => {
        setBoardComment(e.target.value)
      }} style={{width:'100%'}}>
      </textarea>

      <div className="footer-drawer">
        <Button className="btn-purple" onClick={() => {
          if (boardStatus === 'Approved') {
            setVisibleAlert(true)
          } else {
            save();
          }        
        }}>
          Save
        </Button>
      </div>
    </Drawer>
    </>
  )
};

export default Status;
