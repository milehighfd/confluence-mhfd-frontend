import { Button } from "antd";
import React from "react";



const CheckYourEmailModal = () => {
  return <div className="main-conf">
    <div className="group">
      <div className="letter-conf">
        <img src="Icons/letter.svg" alt="" />
      </div>
      <div className="title-conf">
        <span>Confirm Your Email Address</span><br /><br />
      </div>
      <div className="all-text-conf">
        <span className="text-conf" >Thank you for signing up. We have sent a confirmation email to <strong>ricardo@vizonomy.com.</strong>  Check your email and click on the confirmation link to start using Confluence.</span><br /><br />
        <span style={{ fontSize: '18px', marginBottom: '10px', color: '#251863' }}>Haven't received your email after one minute? Please check your spam or junk folder. Click the button below to resend it.</span>
      </div>
      <Button className="btn-purple" block htmlType="submit" style={{ width: '400px', marginTop: '67px' }}>
        RESEND EMAIL
      </Button>
    </div>

  </div>
}

export default CheckYourEmailModal;