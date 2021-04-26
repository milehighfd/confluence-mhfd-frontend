import React, { useEffect, useState } from "react";
import { Drawer, Button, Dropdown, Menu, List } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { SERVER } from "../../../Config/Server.config";
import { getData, getToken, putData } from "../../../Config/datasets";
import { SubmitModal } from "../Request/SubmitModal";
import { boardType } from "../Request/RequestTypes";

export default ({ boardId, visible, setVisible, status, comment, type }: {
  boardId: any,
  visible: boolean,
  setVisible: Function,
  status: any,
  comment: any,
  type: boardType
}) => {
  const [boardStatus, setBoardStatus] = useState(status);
  const [boardComment, setBoardComment] = useState(comment);
  const [showMessage, setShowMessage] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [message, setMessage] = useState('An Error has ocurred, please try again later');
  const [boardsData, setBoardsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pending, setpending] = useState(false);
  const save = () => {
    putData(`${SERVER.URL_BASE}/board/${boardId}`, {
    // putData(`${'http://localhost:3003'}/board/${boardId}`, {
      status: boardStatus,
      comment: boardComment
    }, getToken())
        .then((r) => {
          if (!r) {
            setMessage('An Error has ocurred, please try again later');
          } else {
            if (r.hasOwnProperty('toCounty') && r.hasOwnProperty('toServiceArea')) {
              setMessage(`Projects sent to County ${r.toCounty} and Service Area ${r.toServiceArea}`);
            } else {
              setMessage(`Saved`);
            }
          }
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
            setVisible(false)
          }, 10000)
        })
        .catch((e) => {
          console.log('e', e)
        })
  }

  useEffect(() => {
    setLoading(true);
    getData(`${SERVER.URL_BASE}/board/${boardId}/boards/${'WORK_REQUEST'}`, getToken())
    // getData(`${'http://localhost:3003'}/board/${boardId}/boards/${'WORK_REQUEST'}`, getToken())
      .then((r) => {
        setBoardsData(r.boards);
      })
      .catch((e) => {
        console.log('e', e)
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

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
      <p>Work Request Status <img src="/Icons/icon-19.svg" alt="" height="10px" /></p>

      <Dropdown overlay={
        <Menu className="menu-utilities">
          <Menu.Item key="0" onClick={() => setBoardStatus('Approved')}>
            <h6><i className="mdi mdi-circle" style={{color:'#29C499'}}></i> Approved</h6>
            <p>MHFD Staff approves the Work Request.</p>
          </Menu.Item>
          {
            status !== 'Approved' &&
            <Menu.Item key="1" onClick={() => setBoardStatus('Under Review')}>
              <h6><i className="mdi mdi-circle" style={{color:'#FFC664'}}></i> Under Review</h6>
              <p>MHFD Staff are developing or reviewing the Work Request.</p>
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

      {
        type === 'WORK_PLAN' && 
        <>
          <p>Work Request <img src="/Icons/icon-19.svg" alt="" height="10px" /></p>
          {
            loading ? (<div>Loading...</div>) : (
            <List
              itemLayout="horizontal"
              dataSource={boardsData}
              renderItem={item => (
                <List.Item className="menu-utilities">
                  <List.Item.Meta
                    title={<h6><i className="mdi mdi-circle" style={{color: item.status === 'Approved' ? '#29C499' : '#ffdd00'}}></i> {item.locality}</h6>}
                    description={
                      <p style={{width:'100%'}}>
                        {item.submissionDate === null?  setpending(true): pending}
                        {`${item.submissionDate ? format(item.submissionDate) : 'Pending' }`}
                        <img src="/Icons/icon-64.svg" alt="" height="8px" style={{opacity:'0.3'}}/>
                      </p>
                    }
                  />
                </List.Item>
              )}
            />)
          }
        </>
      }

      <p>Notes <img src="/Icons/icon-19.svg" alt="" height="10px" /></p>
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
      {
        showMessage &&
        <div className="footer-drawer" style={{color:'red'}}>
            {message}
        </div>
      }
    </Drawer>
    </>
  )
}
