import React, { useEffect, useState } from "react";
import { Col, Carousel, Anchor, Button } from "antd";
import { SERVER } from "../../../Config/Server.config";
import { ArrowRightOutlined } from '@ant-design/icons';
import { useCarouselImagesDispatch, useCarouselImagesState } from "../../../hook/carouselHook";
import * as datasets from "../../../Config/datasets";
import { useAppUserDispatch } from "../../../hook/useAppUser";
import { Redirect } from "react-router-dom";

export default () => {
  const { getCarouselImages } = useCarouselImagesDispatch();
  const { images } = useCarouselImagesState();
  const {
    replaceAppUser,
    saveUserInformation
  } = useAppUserDispatch();
  const [redirect, setRedirect] = useState(false);
  const { Link } = Anchor;
  const redirectGuest = () => {
    datasets.getData(SERVER.GUEST).then(async res => {
      if (res?.token) {
        localStorage.setItem('mfx-token', res.token);
        await datasets.getData(SERVER.ME, datasets.getToken()).then(async result => {
          replaceAppUser(result);
          saveUserInformation(result)
        });
        setRedirect(true);
      }
    })
  };
  useEffect(() => {
    getCarouselImages();
  }, []);
  if (redirect) {
    return <Redirect to="/map" />
  }
  return <Col xs={{ span: 24 }} lg={{ span: 13 }} style={{background: 'white'}}>
    <a href="https://mhfd.org/" target="_blank">
      <div className="logo-white"
        style={{ backgroundImage: 'url(/Icons/logo-white.svg)' }}>
        <p className="text-logo">Protecting People, Property,</p>
        <p className="text-logo02">and our Environment.</p>
      </div>
    </a>
    <div className="contact02">
    <Button className="text-button" onClick={() => redirectGuest()}>
      <span className="text-l">Continue as Guest</span> <ArrowRightOutlined/>
    </Button>
    </div>
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
          <li><a href="/login" >©2022 Mile High Flood District</a></li>
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
    <Carousel autoplay autoplaySpeed={6000}>
      {images.map((image: string, index: number) => {
        if (!image) return null;
        return <div key={index}>
          <img src={SERVER.BASE_URL_IMAGES + encodeURI(image)} className={"img-banner"} alt="" />
          <div className="textContent">
            <h2>What can I do with Confluence?</h2>
            <h5>Explore your Streams, Check Project Info, View and Analyze Data</h5>
          </div>
        </div>
      })}
    </Carousel>
  </Col>
}
