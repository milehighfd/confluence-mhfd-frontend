import React, { useState } from "react";
import { Drawer, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { SERVER } from "../../../Config/Server.config";
import { getToken, putData } from "../../../Config/datasets";

export default ({ boardId, visible, setVisible, status, comment }: {
  boardId: any,
  visible: boolean,
  setVisible: Function,
  status: any,
  comment: any
}) => {
  const [boardStatus, setBoardStatus] = useState(status);
  const [boardComment, setBoardComment] = useState(comment);
  const [showError, setShowError] = useState(false);

  const save = () => {
    putData(`${SERVER.URL_BASE}/board/${boardId}`, {
      status: boardStatus,
      comment: boardComment
    }, getToken())
        .then((r) => {
          if (!r) {
            setShowError(true);
            setTimeout(() => {
              setShowError(false);
            }, 5000)
          } else {
            setVisible(false)
          }
        })
        .catch((e) => {
          console.log('e', e)
        })
  }

  return (
    <Drawer
      title={<h5>
        <img src="/Icons/work/chat.svg" alt="" className="menu-wr" /> STATUS</h5>
      }
      placement="right"
      closable={true}
      onClose={() => setVisible(false)}
      visible={visible}
      className="work-utilities"
    >
      <h6>Status Management</h6>
      <p>Work Request Status <img src="/Icons/icon-19.svg" alt="" height="10px" /></p>

      <Dropdown overlay={
        <Menu className="menu-utilities">
          <Menu.Item key="0" onClick={() => setBoardStatus('Approved')}>
            <h6><i className="mdi mdi-circle" style={{color:'#29C499'}}></i> Approved</h6>
            <p>MHFD Staff approves the Work Request.</p>
          </Menu.Item>
          <Menu.Item key="1" onClick={() => setBoardStatus('Under Review')}>
            <h6><i className="mdi mdi-circle" style={{color:'#FFC664'}}></i> Under Review</h6>
            <p>MHFD Staff are developing or reviewing the Work Request.</p>
          </Menu.Item>
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
      <textarea className="note" rows={8} value={boardComment} onChange={e => setBoardComment(e.target.value)}>
      </textarea>

      <div className="footer-drawer">
        <Button className="btn-purple" onClick={() => save()}>
          Save
        </Button>
      </div>
      {
        showError &&
        <div className="footer-drawer">
            An error has ocurred, please try again later
        </div>
      }
    </Drawer>
  )
}
