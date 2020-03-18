import React from "react";
import { Col, Carousel } from "antd";
export default () => {
    return <Col span={13}>
          <div className="logo-white"
              style={{backgroundImage: 'url(Icons/logo-white.svg)'}}>
              <p>Protecting People, Property, and our Environment.</p>
          </div>
          <div className="contact01">
              <div className="icons-list">
                <a href=""><img className="anticon" src="/Icons/twitter.svg" alt="" height="14px" /></a>
                <a href=""><img className="anticon" src="/Icons/facebook.svg" alt="" height="14px" /></a>
                <a href=""><img className="anticon" src="/Icons/link.svg" alt="" height="14px" /></a>
              </div>
              <div className="social01">
                <ul>
                  <li><a href="">Contact</a></li>
                  <span>|</span>
                  <li><a href="">©2020 Mile High Flood District</a></li>
                  <span>|</span>
                  <li><a href="">Privacy Policy</a></li>
                </ul>
              </div>
          </div>
      <Carousel autoplay>
            <div>
              <img src="/icons/banner.png" alt=""/>
              <div className="textContent">
                <h2>What can I do with Confluence?</h2>
                <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
              </div>
            </div>
            <div>
            <img src="/icons/banner.png" alt=""/>
             <div className="textContent">
                <h2>What can I do with Confluence?</h2>
                <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
              </div>
            </div>
            <div>
            <img src="/icons/banner.png" alt=""/>
              <div className="textContent">
                <h2>What can I do with Confluence?</h2>
                <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
              </div>
            </div>
      </Carousel>
      </Col>
}

