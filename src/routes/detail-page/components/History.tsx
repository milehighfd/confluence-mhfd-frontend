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
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <h3 style={{marginBottom:'15px', marginTop:'20px'}} id="history">HISTORY</h3>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 20 }} style={{alignSelf: 'center'}}>
          <div className="line-01"></div>
        </Col>
      </Row>
      <Row style={{marginBottom:'70px'}}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className='history-body'>
          {
            editedDates.map((element: string) => {
              const names = element.split(" ");
              return(
                <p><Avatar className="avatar-history">{names[0].charAt(0)}{names[1].charAt(0)}</Avatar>{element}</p>
              )
            })
          }
        </Col>
      </Row>
    </>
  )
}

export default History;