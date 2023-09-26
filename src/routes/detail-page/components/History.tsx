import React, { useState } from 'react';
import { Col,  Row, } from 'antd';

const History = () => {
  const [editedDates] = useState([])
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="detail-problems-component-header">
          <h3 className="detail-problems-component-title-header" id="history">HISTORY</h3>
          <div className="detail-problems-component-header-right"></div>
        </Col>
      </Row>
      <Row className="history-detailed-layout">
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className='history-detailed-body'>
        <ul className="list-history">
          {
            editedDates.map((element: string) => {
              return(
                <li key={element}><p>{element}</p></li>
                // <>
                //   <div className="activiti-item">
                //     <div className="user-item">
                //       RS
                //     </div>
                //     <div>
                //       <p>Ricardo Saavedra <span>moved this card from MHFD Verified to Closed - March 2023</span></p>
                //       <p className="opacity-date">Apr 4 at 11:41 AM</p>
                //     </div>
                //   </div>
                //   <div className="activiti-item">
                //     <div className="user-item" style={{background:'#23CBA1'}}>
                //       JV
                //     </div>
                //     <div>
                //       <p>Jon Vilines <span>moved this card from Ready for Review to MHFD Reviewed</span></p>
                //       <p className="opacity-date">Mar 20 at 12:45 AM</p>
                //     </div>
                //   </div>
                //   <div className="activiti-item">
                //     <div className="user-item">
                //       RS
                //     </div>
                //     <div>
                //       <p>Ricardo Saavedra <span>mmoved this card from Done to Ready for Review</span></p>
                //       <p className="opacity-date">Mar 9 at 4:28 AM</p>
                //     </div>
                //   </div>
                //   <div className="activiti-item">
                //     <div className="user-item">
                //       RS
                //     </div>
                //     <div>
                //       <p>Ricardo Saavedra <span>moved this card from Dev In Progress to Done</span></p>
                //       <p className="opacity-date">Mar 7 at 7:40 AM</p>
                //     </div>
                //   </div>
                //   <div className="activiti-item">
                //     <div className="user-item">
                //       RS
                //     </div>
                //     <div>
                //       <p>Ricardo Saavedra <span>moved this card from Ready for Review  to Dev In Progress</span></p>
                //       <p className="opacity-date">Mar 7 at 7:37 AM</p>
                //     </div>
                //   </div>
                // </>
               
              )
            })
          }
          </ul>
        </Col>
      </Row>
    </>
  )
}

export default History;
