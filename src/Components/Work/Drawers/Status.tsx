import React, { useEffect, useState } from "react";
import { Drawer, Button,  List, Popover, Switch } from 'antd';
import { getToken, putData } from "Config/datasets";
import { SubmitModal } from "../Request/SubmitModal";
import { UPDATE_BOARD_BY_ID } from "Config/endpoints/board";
import { useRequestDispatch, useRequestState } from "hook/requestHook";
import { WrongModal } from "../Request/WrongModal";
import { useMapState } from "hook/mapHook";
import { WORK_PLAN } from "constants/constants";
import { notification } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

const content02 = (<div className="popver-info">This is a place to add notes on a Local Government work request. Notes will be visible to any user from the same Local Government as well as MHFD staff.</div>);
const Status = () => {
  const { 
    tabActiveNavbar
   } = useMapState();
  const {
    locality,
    namespaceId: boardId,
    showBoardStatus: visible,
    boardStatus: status,
    boardSubstatus: substatus,
    boardComment: comment,
  } = useRequestState();
  const {
    setBoardComment: _setBoardComment,
    setBoardStatus: _setBoardStatus,
    setBoardSubstatus: _setBoardSubstatus,
    loadColumns,
    setShowBoardStatus: setVisible,
    setAlertStatus,
    setShowAlert
  } = useRequestDispatch();
  const [boardStatus, setBoardStatus] = useState(status);
  const [boardComment, setBoardComment] = useState(comment || '');
  const [boardSubstatus, setBoardSubstatus] = useState(substatus);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [visibleWrongModal, setVisibleWrongModal] = useState(false);
  const [boardsData, setBoardsData] = useState<any[]>([]);
  const [boardsLength, setBoardsLength] = useState<number>(0);
  const [pending, setpending] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const save = () => {
    putData(UPDATE_BOARD_BY_ID(boardId), {
      status: 'Approved',
      comment: boardComment,
      substatus: boardSubstatus
    }, getToken())
        .then((r) => {
          api.success({
            message: 'Success! Your board is in progress of being updated!',
            className: 'notification-alert-layout',
            icon: <CheckCircleFilled className='notification-icon-success'/>,
            duration: 2
          });
          _setBoardStatus('Approved')
          _setBoardComment(boardComment);
          _setBoardSubstatus(boardSubstatus);
          setBoardStatus('Approved')
          setBoardComment(boardComment);
          setBoardSubstatus(boardSubstatus);
          let alertStatus: { type: 'success' | 'error', message: string } = {
            type: 'error',
            message: 'An error has ocurred, please try again later.'
          };
          if (r) {
            alertStatus.type = 'success';
            alertStatus.message = `${locality}'s ${tabActiveNavbar === WORK_PLAN ? 'Work Plan': 'Work Request'} status has been updated.`;
          }
          setAlertStatus(alertStatus);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
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
    {contextHolder}
    { visibleAlert && <SubmitModal
      locality={locality}
      boardSubstatus={boardSubstatus}
      boardsLength={boardsLength}
      type={tabActiveNavbar}
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
        <img src="/Icons/ic_close.svg" alt="" className='close-style-drawer' onClick={() => setVisible(false)} />
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
          <div className="title-status-list">
            <div className="title-left">
              Project Type
            </div>
            <div className="title-right">
              Is this Board <br/>Ready for Review?
            </div>
          </div>
              <List
                itemLayout="horizontal"
                dataSource={boardsData}
                renderItem={(item, index )=> (
                  <List.Item className="menu-utilities">
                    <List.Item.Meta
                      title={
                        <h6 className="content-locality">
                          <div className="name-locality">{item.locality}</div>
                          <div className="swith-locality">
                            <Switch
                              checkedChildren={item.checked ? "Yes" : 'No'}
                              unCheckedChildren={item.checked ? "No": 'Yes'}
                              checked={item.checked}
                              className={item.checked ? "switch-status" : 'switch-status-no'}
                              onClick={() => onCheck(item.locality)}
                            />
                          </div>
                          
                        </h6>
                      }
                    />
                      
                  </List.Item>
                )}
              />
      <br />
      <p className="note-text">Notes <Popover content={content02}>  <img src="/Icons/icon-19.svg" alt="" height="10px" /> </Popover></p>
      <textarea className="note" rows={8} value={boardComment} onChange={e => {
        setBoardComment(e.target.value)
      }} style={{width:'100%'}}>
      </textarea>

      <div className="footer-drawer">
        <Button
          className="btn-purple"
          disabled={status === 'Approved'}
          style={{ opacity: status === 'Approved' ? 0.5 : 1 }}
          onClick={() => {
            const canBeApproved = boardsData.every(r => r.checked);
            if (canBeApproved) {
              setVisibleAlert(true)
            } else {
              setVisibleWrongModal(true);
            }
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
