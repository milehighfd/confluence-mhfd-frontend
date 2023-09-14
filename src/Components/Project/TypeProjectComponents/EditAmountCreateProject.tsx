import React, { useState } from 'react';
import { Button, Col, Input, Row } from "antd";
import { CloseCircleFilled } from '@ant-design/icons';

const EditAmountCreateProject = ({
  index,
  type,
}:{
  index: number,
  type: string,
}) => {
  console.log(type, 'TYPE')
  return (
  <div className='sec-edit-amount'>
    <div className="sub-title-project">
      <h5 className="requestor-information">{index}. Edit Amount </h5>
    </div>
    <p>How much funding from MHFD is being requested for the following years:</p>
      <b>Total Requested Funding: $0</b>
      <br/>
      <b>Estimated Project Cost: $0</b>
    <div className='edit-amount-create-project'>
      <div className={type === 'maintenance' ?'edit-amount-content-maintenance':'edit-amount-content'}>
        <div className='edit-amount'>
          <label className="sub-title">2021 </label>
          <Input className='input-amount' value='$' allowClear/> 
        </div>
        <div className='edit-amount'>
          <label className="sub-title">2022 </label>
          <Input className='input-amount' value='$' allowClear/> 
        </div>
        <div className='edit-amount'>
          <label className="sub-title">2023 </label>
          <Input className='input-amount' value='$' allowClear/> 
        </div>
        {type !== 'maintenance' && <>
          <div className='edit-amount'>
            <label className="sub-title">2024 </label>
            <Input className='input-amount' value='$' allowClear/> 
          </div>
          <div className='edit-amount'>
            <label className="sub-title">2025 </label>
            <Input className='input-amount' value='$' allowClear/> 
          </div>
        </>}
      </div>
    </div>
  </div>
  )
};

export default EditAmountCreateProject;