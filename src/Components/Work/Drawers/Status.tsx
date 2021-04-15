import React, { useState } from "react";
import { Drawer, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { SERVER } from "../../../Config/Server.config";
import { getToken, putData } from "../../../Config/datasets";
import { SubmitModal } from "../Request/SubmitModal";

export default ({ boardId, visible, setVisible, status, comment }: {
  boardId: any,
  visible: boolean,
  setVisible: Function,
  status: any,
  comment: any
}) => {
  const [boardStatus, setBoardStatus] = useState(status);
  const [boardComment, setBoardComment] = useState(comment);
  const [showMessage, setShowMessage] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [message, setMessage] = useState('An Error has ocurred, please try again later');

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
            setMessage(`Projects sent to County ${r.toCounty} and Service Area ${r.toServiceArea}`);
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

  return (
    <>
    { visibleAlert && <SubmitModal
      visibleAlert = {visibleAlert}
      setVisibleAlert ={setVisibleAlert}
      setSave = {save}
      currentStatus={status}
      boardStatus={boardStatus}
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
