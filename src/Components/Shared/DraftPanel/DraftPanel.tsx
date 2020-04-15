import React from 'react';
import { Dropdown, Button, Menu } from 'antd';

const menu = (
  <Menu className="menu-card">
    <Menu.Item style={{borderBottom: '1px solid rgba(61, 46, 138, 0.07)'}}>
      <span className="menu-card-item">
        Edit
      </span>
    </Menu.Item>
    <Menu.Item style={{borderBottom: '1px solid rgba(61, 46, 138, 0.07)'}}>
      <span className="menu-card-item">
        Copy
      </span>
    </Menu.Item>
    <Menu.Item>
      <span className="menu-card-item" style={{color: 'red'}}>
        Delete
      </span>
    </Menu.Item>
  </Menu>
);

export default ({ headers } : { headers : Array<string | number> }) => {
  return (
    <div className="work-request">
      <div>
        <h3>Workspace</h3>
        <div className="col-wr">
          <Button className="btn-create"><img src="/Icons/icon-18.svg" alt="" /> Create Project</Button>
          <div className="card-wr">
            <h4>West Tollgate Creek GSB Drops </h4>
            <h6>$410,000</h6>
            <p>Aurora <label>Draft</label></p>
            <Dropdown overlay={menu} className="menu-wr">
              <span className="ant-dropdown-link" style={{ cursor: 'pointer' }}>
                <img src="/Icons/icon-60.svg" alt="" />
              </span>
            </Dropdown>
          </div>
        </div>
      </div>

      {headers.map((header : string | number) => (
        <div>
          <h3>{header}</h3>
          <div className="col-wr">
            { header === headers[0] ?
              <div className="card-wr">
                <h4>West Tollgate Creek GSB Drops </h4>
                <h6>$410,000</h6>
                <p>Aurora <label>Draft</label></p>
                <Dropdown overlay={menu} className="menu-wr">
                  <span className="ant-dropdown-link" style={{ cursor: 'pointer' }}>
                    <img src="/Icons/icon-60.svg" alt="" />
                  </span>
                </Dropdown>
              </div>
                :
              null
            }
          </div>
        </div>
      ))}
    </div>
  )
}
