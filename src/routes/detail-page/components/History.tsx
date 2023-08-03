import React, { useState } from "react";
import { Col,  Row, } from "antd";


const History = () => {
  const [editedDates, setEditedDates] = useState([])
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