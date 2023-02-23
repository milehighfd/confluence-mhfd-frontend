import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { DownOutlined, SearchOutlined, SendOutlined, UpOutlined } from '@ant-design/icons';
import { getTeam } from '../../../utils/parsers';
import { useDetailedState } from "hook/detailedHook";

const CommentsModal = () => {
  const [openChat, setOpenChat] = useState(true);  
  return <>   
    <Row style={{paddingBottom: '15px'}}>
      <Col span={14}>
        <h5 style={{textDecoration: 'none'}}>
          Comments
        </h5>
      </Col>
      <Col span={10} style={{textAlign:'end'}}>
        <SearchOutlined style={{paddingRight:'10px'}}/>
        {openChat && <UpOutlined onClick={() => (setOpenChat(false))}/>}
        {!openChat && <DownOutlined onClick={() => (setOpenChat(true))}/>}
      </Col>
      </Row>
    <div className="chat-00" style={!openChat ? {height: '90px'} : {}}>
      <div className='chat-body-text'  style={!openChat ? {height: '0px'} : {}}>
        <Row>
          <Col span={3}>
            <img src="/picture/user.png" alt="" height="20px" />
          </Col>
          <Col span={21}>
            <h6 style={{fontWeight: 500}}>Finnegan Cooke<span>5h ago</span></h6>
            <p>How long until 30% plans are ready for review?</p>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <img src="/Icons/icon-28.svg" alt="" height="20px"  style={{borderRadius: '50%'}}/>
          </Col>
          <Col span={21}>
            <h6  style={{fontWeight: 500}}>Noel Holland<span>4h ago</span></h6>
            <p>Probably April 1</p>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <img src="/picture/user.png" alt="" height="20px" />
          </Col>
          <Col span={21}>
            <h6 style={{fontWeight: 500}}>Finnegan Cooke<span>3h ago</span></h6>
            <p>Thanks, we'll have those turned around in a couple of weeks.</p>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <img src="/picture/user01.png" alt="" height="20px" />
          </Col>
          <Col span={21}>
            <h6 style={{fontWeight: 500}}>Megan Leonard<span>2h ago</span></h6>
            <p>It might take SEMSWA closer to three weeks.</p>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <img src="/Icons/icon-28.svg" alt="" height="20px" style={{borderRadius: '50%'}}/>
          </Col>
          <Col span={21}>
            <h6 style={{fontWeight: 500}}>Serena Keller<span>1h ago</span></h6>
            <p>We don't have any concerns at this point.</p>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <img src="/Icons/icon-28.svg" alt="" height="20px" style={{borderRadius: '50%'}}/>
          </Col>
          <Col span={21}>
            <h6 style={{fontWeight: 500}}>Serena Keller<span>Just now</span></h6>
            <p>The boulder drop and culvert crossing look good in the renderings, we did something similar on Niver Trib.</p>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <img src="/Icons/icon-28.svg" alt="" height="20px" style={{borderRadius: '50%'}}/>
          </Col>
          <Col span={21}>
            <h6 style={{fontWeight: 500}}>Finnegan Cooke<span>5h ago</span></h6>
            <p>How long until 30% plans are ready for review?</p>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <img src="/Icons/icon-28.svg" alt="" height="20px" style={{borderRadius: '50%'}}/>
          </Col>
          <Col span={21}>
            <h6 style={{fontWeight: 500}}>Finnegan Cooke<span>5h ago</span></h6>
            <p>How long until 30% plans are ready for review?</p>
          </Col>
        </Row>
      </div>
      <Row style={openChat ? {paddingTop: '15px'} : {}}>
        <Col span={3}>
          <img src="/picture/user.png" alt="" height="20px" />
        </Col>
        <Col span={21}>
          <textarea className='chat-text'></textarea>
        </Col>
      </Row>
    </div>
    <div style={{textAlign: 'end'}}>
      <button className='chat-button'>
        <SendOutlined
          style={{
            marginBottom: '0px',
            color: 'white',
            transform: 'rotate(-45deg)',
            marginRight:'5px'
          }}
        />
        Send
      </button>
    </div>
  </>
};

export default CommentsModal;
