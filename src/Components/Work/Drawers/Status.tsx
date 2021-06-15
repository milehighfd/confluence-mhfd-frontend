import React, { useEffect, useState } from "react";
import { Drawer, Button, Dropdown, Menu, List, Row, Col, Checkbox, Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { SERVER } from "../../../Config/Server.config";
import { getData, getToken, putData } from "../../../Config/datasets";
import { SubmitModal } from "../Request/SubmitModal";
import { boardType } from "../Request/RequestTypes";

const content00 = (<div className="popver-info">When Work Request Status is changed to "Approved" and saved, the Work Request is sent to MHFD for review and the Work Request is locked. All Project Types must be checked as "Reviewed" in the list below and saved prior to changing Work Request Status.</div>);
const content01 = (<div className="popver-info">This is an internal QA/QC workspace for Local Governments. All Project Types on the Work Request must be checked as "Reviewed" and saved before the overall Work Request Status can be changed to "Approved."</div>);
const content02 = (<div className="popver-info">This is a place to add notes on a Local Government work request. Notes will be visible to any user from the same Local Government as well as MHFD staff.</div>);
export default ({ locality, boardId, visible, setVisible, status, comment, type, substatus, setAlertStatus, setShowAlert }: {
  locality: string,
  boardId: any,
  visible: boolean,
  setVisible: Function,
  status: any,
  comment: any,
  type: boardType,
  substatus: any,
  setAlertStatus: Function,
  setShowAlert: Function
}) => {
  const [boardStatus, setBoardStatus] = useState(status);//from backend
  const [boardComment, setBoardComment] = useState(comment);
  const [boardSubstatus, setBoardSubstatus] = useState(substatus);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [boardsData, setBoardsData] = useState<any[]>([]);
  const [boardsLength, setBoardsLength] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [pending, setpending] = useState(false);

  console.log('substatus', substatus);

  const save = () => {
    putData(`${SERVER.URL_BASE}/board/${boardId}`, {
    // putData(`${'http://localhost:3003'}/board/${boardId}`, {
      status: boardStatus,
      comment: boardComment,
      substatus: boardSubstatus
    }, getToken())
        .then((r) => {
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
            setShowAlert(false)
          }, 4000);
        })
        .catch((e) => {
          console.log('e', e)
        })
  }

  useEffect(() => {
    if (type === 'WORK_REQUEST') {
      let list = substatus ? substatus.split(',') : [];
      let ls = ['Capital', 'Study', 'Maintenance', 'Acquisition', 'Special']
      setBoardsData(ls.map((l) => {
        return {locality: l, status: list.includes(l) ? 'Approved' : 'Under Review'}
      }))
      setBoardsLength(ls.length);
    } else {
      setLoading(true);
      getData(`${SERVER.URL_BASE}/board/${boardId}/boards/${'WORK_REQUEST'}`, getToken())
      // getData(`${'http://localhost:3003'}/board/${boardId}/boards/${'WORK_REQUEST'}`, getToken())
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
         });;
          setBoardsData(newBoardsSorted.map((b: any) => {
            return {
              ...b,
              status: b.status === 'Approved' ? 'Approved' : (list.includes(b.locality) ? 'Approved' : 'Under Review')
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
  }, [])

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
          status: ls.includes(bd.locality) ? 'Approved' : 'Under Review'
        }
      })
    )
  }

  const format = (_date: string) => {
    let date = new Date(_date);
    let y = date.getFullYear();
    let m = date.getMonth()+1;
    let d = date.getDate();
    let pad = (v: number) => {
      return v < 10 ? `0${v}`: v;
    }
    return `Submitted ${pad(d)}/${pad(m)}/${y}.`;
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
      boardStatus={boardStatus}
      pending = {pending}
     />
    }
    <Drawer
      title={<h5>
        <img src="/Icons/work/chat.svg" alt="" className="menu-wr" /> STATUS</h5>
      }
      placement="right"
      closable={true}
      onClose={() => setVisible(false)}
      visible={visible}
      className="work-utilities"
      mask={false}
    >
      <h6>Status Management</h6>
      <p>{type === 'WORK_REQUEST'? 'Work Request Status': 'Work Plan Status'} <Popover content={content00}><img src="/Icons/icon-19.svg" alt="" height="10px" />  </Popover></p>

      <Dropdown overlay={
        <Menu className="menu-utilities">
          <Menu.Item key="0" onClick={() => setBoardStatus('Approved')}>
            <h6><i className="mdi mdi-circle" style={{color:'#29C499'}}></i> Approved</h6>
            <p>{`${ type === 'WORK_PLAN' ? 'MHFD' : 'Local Government' } Staff approves the Work Request.`}</p>
          </Menu.Item>
          {
            status !== 'Approved' &&
            <Menu.Item key="1" onClick={() => setBoardStatus('Under Review')}>
              <h6><i className="mdi mdi-circle" style={{color:'#FFC664'}}></i> Under Review</h6>
              <p>{`${type === 'WORK_PLAN' ? 'MHFD' : 'Local Government'} Staff are developing ${type === 'WORK_PLAN' ? 'or reviewing' : '' } the Work Request.`}</p>
            </Menu.Item>
          }
          </Menu>
      } trigger={['click']}>
        <Button className="ant-dropdown-link">
          {
            boardStatus ? boardStatus : '- Select -'
          }
        <DownOutlined />
        </Button>
      </Dropdown>

          <Row>
            <Col lg={{ span: 12 }}>
              <p>{type === 'WORK_REQUEST' ? 'Project Type' : 'Work Plan'}
                &nbsp;&nbsp;
                <Popover content={type === 'WORK_REQUEST' ? content01 : ''}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover>
              </p>
            </Col>
            {
              (type === 'WORK_REQUEST' || locality === 'MHFD District Work Plan') &&
              <Col lg={{ span: 12 }}><p style={{textAlign:'right', paddingRight: 8}}>Reviewed</p></Col>
            }
          </Row>
          {
            loading ? (<div>Loading...</div>) : (
              <List
                itemLayout="horizontal"
                dataSource={boardsData}
                renderItem={item => (
                  <List.Item className="menu-utilities">
                    <List.Item.Meta
                      title={
                        <h6>
                          { item.status !== 'Approved' ? setpending(true) : pending }
                          <i className="mdi mdi-circle" style={{color: item.status === 'Approved' ? '#29C499' : '#ffdd00'}}>
                          </i>
                          &nbsp; {item.locality}
                        </h6>
                      }
                      // description={
                      //   <p style={{width:'100%'}}>
                      //     
                      //     {`${item.submissionDate ? format(item.submissionDate) : 'Pending' }`}
                      //     <img src="/Icons/icon-64.svg" alt="" height="8px" style={{opacity:'0.3'}}/>
                      //   </p>
                      // }
                    />
                    {
                      (type === 'WORK_REQUEST' || locality === 'MHFD District Work Plan') &&
                      <Checkbox checked={item.status === 'Approved'} onClick={() => onCheck(item.locality)} />
                    }
                  </List.Item>
                )}
              />
            )
          }
      <br />
      <p>Notes <Popover content={content02}>  <img src="/Icons/icon-19.svg" alt="" height="10px" /> </Popover></p>
      <textarea className="note" rows={8} value={boardComment} onChange={e => {
        if (status === 'Approved') return;
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
}
