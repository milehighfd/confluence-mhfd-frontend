import { Select } from "antd"
import React from "react"

export const ActivitiCreateProject = () => {
  return (
    <div className="body-project">
      <label className="sub-title">Filter project activity by</label>
      <br></br>
      <Select defaultValue="Filter project activity by" style={{ width: '50%' }} onChange={() => {}}>
        <Select.Option value="Filter project activity by">Filter project activity by</Select.Option>
        <Select.Option value="Filter project activity by">Filter project activity by</Select.Option>
      </Select>
      <div className="activiti-item">
        <div className="user-item">
          RS
        </div>
        <div>
          <p>Ricardo Saavedra <span>moved this card from MHFD Verified to Closed - March 2023</span></p>
          <p className="opacity-date">Apr 4 at 11:41 AM</p>
        </div>
      </div>
      <div className="activiti-item">
        <div className="user-item" style={{background:'#23CBA1'}}>
          JV
        </div>
        <div>
          <p>Jon Vilines <span>moved this card from Ready for Review to MHFD Reviewed</span></p>
          <p className="opacity-date">Mar 20 at 12:45 AM</p>
        </div>
      </div>
      <div className="activiti-item">
        <div className="user-item">
          RS
        </div>
        <div>
          <p>Ricardo Saavedra <span>mmoved this card from Done to Ready for Review</span></p>
          <p className="opacity-date">Mar 9 at 4:28 AM</p>
        </div>
      </div>
      <div className="activiti-item">
        <div className="user-item">
          RS
        </div>
        <div>
          <p>Ricardo Saavedra <span>moved this card from Dev In Progress to Done</span></p>
          <p className="opacity-date">Mar 7 at 7:40 AM</p>
        </div>
      </div>
      <div className="activiti-item">
        <div className="user-item">
          RS
        </div>
        <div>
          <p>Ricardo Saavedra <span>moved this card from Ready for Review  to Dev In Progress</span></p>
          <p className="opacity-date">Mar 7 at 7:37 AM</p>
        </div>
      </div>
    </div>
  )
}
