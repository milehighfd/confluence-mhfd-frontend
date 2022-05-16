import React, { useEffect } from "react";
import { Col, Carousel, Anchor } from "antd";
import { SERVER } from "../../../Config/Server.config";
import { useCarouselImagesDispatch, useCarouselImagesState } from "../../../hook/carouselHook";

export default () => {
  const { getCarouselImages } = useCarouselImagesDispatch();
  const { images } = useCarouselImagesState();
  const { Link } = Anchor;
  useEffect(() => {
    getCarouselImages();
  }, []);
  return <Col xs={{ span: 24 }} lg={{ span: 13 }}>
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
      <div className="mobile-login">
        <Anchor affix={false}>
          <Link href="#login-form" className="btn-purple" title="Enter"/>
        </Anchor>
      </div>
    </div>
    <div className="logo-partner">
      {/* <div>
         <p>Designed by</p>
        <a href="https://vizonomy.com/main" target="_blank"><img className="vizonomy" src="/Icons/logo_vizonomy.png" alt="" /></a> 
      </div>
      <div>
        <a href="https://www.respec.com" target="_blank"><img className="respec" src="/Icons/logo-respec.png" alt="" /></a>
      </div> */}
    </div>
    <Carousel autoplay autoplaySpeed={6000}>
      {images.map((image: string, index: number) => {
        return <div key={index}>
          <img src={SERVER.BASE_URL_IMAGES + image} className={"img-banner"} alt="" />
          <div className="textContent">
            <h2>What can I do with Confluence?</h2>
            <h5>Explore your Streams, Check Project Info, View and Analyze Data</h5>
          </div>
        </div>
      })}
    </Carousel>
  </Col>
}
