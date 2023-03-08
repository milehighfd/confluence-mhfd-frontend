import React, { useState } from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip, Avatar } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { DATA_FINANCIALS, DATA_SOLUTIONS } from "../constants";
import { ArrowDownOutlined, FileOutlined, PlusOutlined } from "@ant-design/icons";

const History = () => {
  const [editedDates, setEditedDates] = useState([
    "Jon Villines edited 'vendor' on Dec 9 2022 at 4:30pm.",
    "Katie Evers edited the geometry on Dec 8 2022 at 1:24pm.",
    "Megam Leonard edited 'status' on Dec 7 2022 at 10:48am."
  ])
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{display:'flex', alignItems:'center'}} className='subtitle-detail'>
          <h3 style={{marginBottom:'15px', marginTop:'20px', marginRight:'35px'}} id="history">HISTORY</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px'}}></div>
        </Col>
      </Row>
      <Row style={{marginBottom:'150px'}}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className='history-body'>
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