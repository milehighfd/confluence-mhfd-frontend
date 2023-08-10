import React, { useEffect, useState } from "react";
import { Button, Col, DatePicker, Modal, Row, Select } from "antd";
import { WINDOW_WIDTH } from "constants/constants";

const { Option } = Select;

const EditDatesModal = ({
  visible,
  setVisible,
}:{
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
  const [step, setStep] = useState<number>(0);
  return(
    <Modal
      title="How much funding from MHFD is being requested for the following years:"
      centered
      visible={visible}
      onOk={()=>{setVisible(false)}}
      onCancel={()=>{setVisible(false)}}
      className="work-modal-edit-dates"
      width= '581px'
    > 
      <div className="header-step">
        <div className={step === 0 ? 'step-active':"step"}>
          <p>STEP 1</p>
          <p className="p-active">Start here</p>
        </div>
        <div className={step === 1 ? 'step-active':"step"}>
          <p>STEP 2</p>
          <p className="p-active">Current phase & date </p>
        </div>
        <div className={step === 2 ? 'step-active':"step"}>
          <p>STEP 3</p>
          <p className="p-active">Confirm </p>
        </div>
      </div>
      <div className="name-project">
        Capital Project
        <h1>Irondale Gulch @ Highway 2 2019 in between Overpass 41 and 325</h1>
        <p>{step=== 0 ? 'Let’s begin.': 'Define the current phase and start date'}</p>
      </div>
      {step === 0 && (
        <div className="body-edit-dates">
          <div className="img-confetti">
            {/* <img src="Icons/ic-confetti.svg" alt="ic-confetti"/> */}
            <br/>
            Hooray! 
            <br/>
            Let’s add context to your project!
          </div>
        </div>
      )}
      {step === 1 && (
        <div className="body-edit-dates">
          <div className="form-edit-dates">
            <label>The current phase for my project is:</label><br/>
            <Select
              placeholder="Select phase"
              style={{ width: '100%', fontSize: '12px', marginBottom:'16px' }}
              listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
            >
              <Option key='Select-phase' value='Select-phase'>
                Select phase
              </Option>
            </Select>

            <label>It’s start date is:</label><br/>
            <DatePicker style={{ width: '100%', borderRadius: '5px', height:'36px'}}/>
          </div>
        </div>
      )}
       {step === 2 && (
        <div className="body-edit-dates">
           <div style={{display:'flex'}}>
                <span className="span-dots-heder">
                    <div className="circulo" style={{backgroundColor:'#5E5FE2'}}/>
                    <span style={{marginLeft:'1px', marginRight:'15px'}}>Done</span>
                  </span>
                  <span className="span-dots-heder">
                    <div className="circulo" style={{backgroundColor:'#047CD7'}}/>
                    <span style={{marginLeft:'1px', marginRight:'15px'}}>Current</span>
                  </span>
                  <span className="span-dots-heder">
                    <div className="circulo" style={{backgroundColor:'#D4D2D9'}}/>
                    <span style={{marginLeft:'1px', marginRight:'15px'}}>Not Started</span>
                  </span>
                  <span className="span-dots-heder">
                    <div className="circulo" style={{backgroundColor:'#F5575C'}}/>
                    <span style={{marginLeft:'1px', marginRight:'15px'}}>Overdue</span>
                  </span>
              </div>
              <div>

              </div>
        </div>
      )}
      <div className="foot-edit-dates">
        <Button className="btn-transparent">Clear</Button>
        <Button className="btn-purple"
          onClick={() =>{if(step === 2) {
            setStep(0)
            setVisible(false)
          }else{
            setStep(step + 1)
          }}}
        >
        {step === 2 ?'Activate':'Next'}</Button>
      </div>
    </Modal>
  )
};

export default EditDatesModal;