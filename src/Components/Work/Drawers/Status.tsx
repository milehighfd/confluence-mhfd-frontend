import React, { useEffect, useState } from "react";
import { Drawer, Button,  List, Row, Col, Popover, Switch, Space } from 'antd';
import { getToken, putData } from "../../../Config/datasets";
import { SubmitModal } from "../Request/SubmitModal";
import { boardType } from "../Request/RequestTypes";
import { UPDATE_BOARD_BY_ID } from "Config/endpoints/board";
import { useRequestDispatch } from "hook/requestHook";
import { WrongModal } from "../Request/WrongModal";

const content02 = (<div className="popver-info">This is a place to add notes on a Local Government work request. Notes will be visible to any user from the same Local Government as well as MHFD staff.</div>);
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
  const [visibleWrongModal, setVisibleWrongModal] = useState(false);
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
    let list = substatus ? substatus.split(',') : [];
    let ls = ['Capital', 'Study', 'Maintenance', 'Acquisition', 'R&D']
    setBoardsData(ls.map((l) => {
      return {
        locality: l,
        status: list.includes(l) ? 'Approved' : 'Under Review',
        checked: list.includes(l)
      }
    }))
    setBoardsLength(ls.length);
  }, [substatus])

  const onCheck = (val: string) => {
    let ls = boardSubstatus ? boardSubstatus.split(',') : [];
    let index = ls.indexOf(val);
    if (index === -1) {
      ls.push(val);
    } else {
      ls.splice(index, 1);
    }
    setBoardSubstatus(ls.join(','));
    const newBoardsData = boardsData.map((bd) => {
      return {
        ...bd,
        checked: ls.includes(bd.locality)
      }
    });
    setBoardsData(newBoardsData);
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
    {
      <WrongModal visible={visibleWrongModal} setVisible={setVisibleWrongModal} />
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
                      <Space
                        direction="vertical"
                        style={{paddingRight:'25px'}}
                      >
                        <Switch
                          checkedChildren={item.checked ? "Yes" : 'No'}
                          unCheckedChildren={item.checked ? "No": 'Yes'}
                          checked={item.checked}
                          className={item.checked ? "switch-status" : 'switch-status-no'}
                          onClick={() => onCheck(item.locality)}
                        />
                      </Space>
                  </List.Item>
                )}
              />
            )
          }
      <br />
      <p className="note-text">Notes <Popover content={content02}>  <img src="/Icons/icon-19.svg" alt="" height="10px" /> </Popover></p>
      <textarea className="note" rows={8} value={boardComment} onChange={e => {
        setBoardComment(e.target.value)
      }} style={{width:'100%'}}>
      </textarea>

      <div className="footer-drawer">
        <Button
          className="btn-purple"
          onClick={() => {
            const canBeApproved = boardsData.every(r => r.checked);
            if (canBeApproved) {
              setVisibleAlert(true)
            } else {
              setVisibleWrongModal(true);
            }
            save();
          }}
        >
          Save
        </Button>
      </div>
    </Drawer>
    </>
  )
};

export default Status;
