import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { DownOutlined, SearchOutlined, SendOutlined, UpOutlined } from '@ant-design/icons';

export default () => {
  const [openChat, setOpenChat] = useState(true);
  return <>
    <Row>
      <Col span={4}>
        <img src="/picture/user.png" alt="" height="35px" />
      </Col>
      <Col span={13}>
        <h6 style={{fontWeight: 500}}>Finnegan Cooke</h6>
        <p>Watershed Manager</p>
      </Col>
      <Col span={6} style={{ textAlign: 'right' }}>
        <span>MHFD</span>
      </Col>
    </Row>
    <Row>
      <Col span={4}>
        <img src="/picture/user01.png" alt="" height="35px" />
      </Col>
      <Col span={13}>
        <h6 style={{fontWeight: 500}}>Noel Holland</h6>
        <p>SEMSWA</p>
      </Col>
      <Col span={6} style={{ textAlign: 'right' }}>
        <span>Arvada</span>
      </Col>
    </Row>
    <Row>
      <Col span={4}>
        <img src="/Icons/icon-28.svg" alt="" height="35px" style={{borderRadius: '50%'}}/>
      </Col>
      <Col span={13}>
        <h6 style={{fontWeight: 500}}>Conner Gilmore</h6>
        <p>Project Manager</p>
      </Col>
      <Col span={6} style={{ textAlign: 'right' }}>
        <span>Applegate</span>
      </Col>
    </Row>
    <Row>
      <Col span={4}>
        <img src="/Icons/icon-28.svg" alt="" height="35px" style={{borderRadius: '50%'}}/>
      </Col>
      <Col span={13}>
        <h6 style={{fontWeight: 500}}>Megan Leonard </h6>
        <p>Analyst</p>
      </Col>
      <Col span={6} style={{ textAlign: 'right' }}>
        <span>Alpha</span>
      </Col>
    </Row>
    <Row>
      <Col span={4}>
        <img src="/Icons/icon-28.svg" alt="" height="35px" style={{borderRadius: '50%'}}/>
      </Col>
      <Col span={13}>
        <h6 style={{fontWeight: 500}}>Serena Keller</h6>
        <p>Project Engineer</p>
      </Col>
      <Col span={6} style={{ textAlign: 'right' }}>
        <span>MHFD</span>
      </Col>
    </Row>
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
      {/* <div className="chat-head">
        Comments <img src="/Icons/icon-19.svg" alt="" height="20px" />
      </div> */}
      {/* <div className="chat-body">
        <img src="/Icons/icon-61.svg" alt="" />
        <h6>Share your thoughts</h6>
        <p>
          Let everyone in your group know
          what you think about this listing
        </p>
      </div>
      <div className="chat-footer">
        <Row>
          <Col span={4}>
            <img src="/Icons/icon-28.svg" alt="" height="35px" />
          </Col>
          <Col span={13}>
            <Input placeholder="Add a comment..." />
          </Col>
          <Col span={7} style={{ textAlign: 'right' }}>
            <Button className="btn-send">SEND</Button>
          </Col>
        </Row>
      </div> */}
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
}
