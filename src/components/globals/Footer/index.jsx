import { BackTop, Col, Divider, Row } from "antd";
import React from "react";
import arrow_up from "../../../assets/images/icon_arrow_up.svg";
import icon_facebook from "../../../assets/images/icon_facebook.svg";
import icon_youtube from "../../../assets/images/icon_youtube.svg";
import icon_zalo from "../../../assets/images/icon_zalo.svg";
import logo from "../../../assets/images/logo.png";

const Footer = () => {
  return (
    <div>
      <Row gutter={[0, 24]} justify="center" className="footer-container">
        <Col xs={{ span: 22 }} md={{ span: 18 }}>
          <Row justify={{ md: 'space-between', sm: 'center', xs: 'center' }} gutter={[24, 24]} className="footer-top">
            <Col>
              <img width="100" src={logo} alt="" className="logo" />
            </Col>
            <Col>
              <div className="footer-top__contents">
                <Row className="content" justify={{ md: 'space-between', sm: 'center', xs: 'center' }} gutter={[24, 24]}>
                  <Col className="content" md={8} sm={24} xs={24}>
                    <h5>Tiêu đề 1</h5>
                    <p>How I Afford Healthy Food</p>
                    <p>Are Eggs Good For You?</p>
                    <p>Health Fitness Meals</p>
                    <p>Unhealthy habits</p>
                  </Col>
                  <Col className="content" md={8} sm={24} xs={24}>
                    <h5>Tiêu đề 2</h5>
                    <p>Unhealthy habits</p>
                    <p>Is Stevia Safe or Addictive?</p>
                    <p>Recent Books</p>
                    <p>Healthy Cooking Tips</p>
                    <p>The Right Nutrition</p>
                    <p>Fear of Food</p>
                  </Col>
                  <Col className="content" md={8} sm={24} xs={24}>
                    <h5>Tiêu đề 3</h5>
                    <p>What should I eat</p>
                    <p>About Our Mission</p>
                    <p>About us</p>
                    <p>Story</p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col>
              <div className="social-group">
                <img src={icon_facebook} alt="" />
                <img src={icon_youtube} alt="" />
                <img src={icon_zalo} alt="" />
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 22 }} lg={{ span: 18 }}>
          <Divider />
        </Col>
        <Col xs={{ span: 22 }} lg={{ span: 18 }}>
          <div className="footer-bottom">
            <ul className="footer-bottom__lists">
              <li>Cấu trúc website</li>
              <li>&bull;</li>
              <li>Điều khoản sử dụng</li>
              <li>&bull;</li>
              <li>Chính sách &amp; bảo mật</li>
              <li>&bull;</li>
              <li>Hỏi đáp</li>
            </ul>
            <div className="footer-bottom__copyright">
              <p> &copy; 2022 Ajinomoto Việt Nam, All Rights Reserved</p>
            </div>
          </div>
        </Col>
      </Row>
      <BackTop>
        <div className="back-to-top">
          <img src={arrow_up} alt="" />
          <p>Về đầu trang</p>
        </div>
      </BackTop>
    </div>
  );
};

export default Footer;
