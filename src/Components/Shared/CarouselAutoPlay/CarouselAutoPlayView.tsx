import React from "react";
import { Col, Carousel } from "antd";
export default () => {
    return <Col span={13}>
          <div className="logo-white"
              style={{backgroundImage: 'url(/Icons/logo-white.svg)'}}>
              <p>Protecting People, Property, and our Environment.</p>
          </div>
          <div className="contact01">
              <div className="icons-list">
                <a href="/login" ><img className="anticon" src="/Icons/twitter.svg" alt="" height="14px" /></a>
                <a href="/login" ><img className="anticon" src="/Icons/facebook.svg" alt="" height="14px" /></a>
                <a href="/login" ><img className="anticon" src="/Icons/link.svg" alt="" height="14px" /></a>
              </div>
              <div className="social01">
                <ul>
                  <li><a href="/login" >Contact</a></li>
                  <span>|</span>
                  <li><a href="/login" >©2020 Mile High Flood District</a></li>
                  <span>|</span>
                  <li><a href="/login" >Privacy Policy</a></li>
                </ul>
              </div>
          </div>
      <Carousel autoplay>
            <div onClick={() => {
              window.location.href = "https://mhfd.org/";
              }} >
              <img src="/Icons/banner/Low_drop.jpeg" className={"img-banner"} alt="" />
              <div className="textContent">
                <h2>What can I do with Confluence?</h2>
                <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
              </div>
            </div>
            <div onClick={() => {
              window.location.href = "https://mhfd.org/";
              }} >
            <img src="/Icons/banner/Confluence_Park.jpg" className={"img-banner"} alt=""/>
             <div className="textContent">
                <h2>What can I do with Confluence?</h2>
                <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
              </div>
            </div>
            <div onClick={() => {
              window.location.href = "https://mhfd.org/";
              }} >
            <img src="/Icons/banner/Drainageway.jpg" className={"img-banner"} alt=""/>
              <div className="textContent">
                <h2>What can I do with Confluence?</h2>
                <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
              </div>
            </div> 
            <div onClick={() => {
              window.location.href = "https://mhfd.org/";
              }} >
            <img src="/Icons/banner/Eco_Park.jpg" className={"img-banner"} alt=""/>
             <div className="textContent">
                <h2>What can I do with Confluence?</h2>
                <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
              </div>
            </div>
            <div onClick={() => {
              window.location.href = "https://mhfd.org/";
              }} >
            <img src="/Icons/banner/Westminster_Station.jpg" className={"img-banner"} alt=""/>
              <div className="textContent">
                <h2>What can I do with Confluence?</h2>
                <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
              </div>
            </div>
      </Carousel>
      </Col>
}

