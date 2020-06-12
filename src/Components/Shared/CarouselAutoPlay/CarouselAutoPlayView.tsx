import React from "react";
import { Col, Carousel } from "antd";
import store from "../../../store";

export default () => {
  const images = store.getState().carouselImages.images;
  return <Col span={13}>
    <a href="https://mhfd.org/" target="_blank">
      <div className="logo-white"
        style={{ backgroundImage: 'url(/Icons/logo-white.svg)' }}>
        {/*<p>Protecting People, Property, and our Environment.</p>*/}
      </div>
    </a>
    <div className="contact01">
      <div className="icons-list">
        <a href="https://twitter.com/MHFloodDistrict" target="_blank"><img className="anticon" src="/Icons/twitter.svg" alt="" height="14px" /></a>
        <a href="https://www.facebook.com/MileHighFloodDistrict/" target="_blank"><img className="anticon" src="/Icons/facebook.svg" alt="" height="14px" /></a>
        <a href="https://www.linkedin.com/company/milehighflooddistrict/" target="_blank"><img className="anticon" src="/Icons/link.svg" alt="" height="14px" /></a>
      </div>
      <div className="social01">
        <ul>
          <li><a href="https://mhfd.org/contact-us/" target="_blank">Contact</a></li>
          <span>|</span>
          <li><a href="/login" >©2020 Mile High Flood District</a></li>
          <span>|</span>
          <li><a href="https://mhfd.org/wp-content/uploads/2019/12/CORA_Policy_Website.pdf" target="_blank">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
    <Carousel autoplay autoplaySpeed={6000}>
      {images.map((image: { image: string, name: string }, index: number) => {
        return <div key={index}>
          <img src={image.image} className={"img-banner"} alt="" />
          <div className="textContent">
            <h2>What can I do with Confluence?</h2>
            <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
          </div>
        </div>
      })}
    </Carousel>
    {/* <Carousel autoplay autoplaySpeed={10000}>
      <div>
        <img src="/Icons/banner/low.jpg" className={"img-banner"} alt="" />
        <div className="textContent">
          <h2>What can I do with Confluence?</h2>
          <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
        </div>
      </div>
      <div>
        <img src="/Icons/banner/confluence.jpg" className={"img-banner"} alt="" />
        <div className="textContent">
          <h2>What can I do with Confluence?</h2>
          <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
        </div>
      </div>
      <div>
        <img src="/Icons/banner/drainageway_img.jpg" className={"img-banner"} alt="" />
        <div className="textContent">
          <h2>What can I do with Confluence?</h2>
          <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
        </div>
      </div>
      <div>
        <img src="/Icons/banner/eco.jpg" className={"img-banner"} alt="" />
        <div className="textContent">
          <h2>What can I do with Confluence?</h2>
          <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
        </div>
      </div>
      <div>
        <img src="/Icons/banner/westminster.jpg" className={"img-banner"} alt="" />
        <div className="textContent">
          <h2>What can I do with Confluence?</h2>
          <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
        </div>
      </div>
    </Carousel> */}
  </Col>
}
