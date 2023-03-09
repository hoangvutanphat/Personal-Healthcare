import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import LabelTitleTop from "../../LabelTitles/LabelTitleTop";
import icon_arrowNext from "../../../assets/images/arrowNext.svg";
import LabelTitleBottom from "../../LabelTitles/LabelTitleBottom";
import Chart from "../../charts/lipid_chart";
import HealthIndex from "../HealthIndex/HealthIndex";
import icon_morning from "../../../assets/images/icon_morning.svg";
import { ROUTES } from "../../../constant/router";
import { authState } from "../../../recoil/atom/authState";
import { authData } from "../../../common/getAllApi";
import { Row, Col, Divider } from "antd";

const getHour = new Date().getHours();

const HealthHandbook = () => {
  const [greating, setGreating] = useState("");
  const [auth, setAuth] = useRecoilState(authState);
  useEffect(() => {
    if (Object.getOwnPropertyNames(auth).length === 0) {
      authData(auth, setAuth);
    }
  }, [auth]);

  useEffect(() => {
    const getStart = () => {
      if (getHour > 6 && getHour < 12) {
        setGreating("Chào buổi sáng");
      } else if (getHour >= 12 && getHour < 18) {
        setGreating("Chào buổi chiều");
      } else if (getHour >= 18 && getHour < 23) {
        setGreating("Chào buổi tối");
      } else {
        setGreating("Chúc ngủ ngon");
      }
    };
    getStart();
  }, [getHour]);

  return (
    <>
      <div className="container-fluid">
        <Row justify="center" gutter={[0, 24]} className="health-container">
          <Col xs={{ span: 22 }} lg={{ span: 15 }}>
            <Row gutter={[0, 24]}>
              <Col
                xs={{ span: 22 }}
                lg={{ span: 12 }}
                className="health-handbook"
              >
                <LabelTitleTop content={greating} Icon={icon_morning} />
                <div className="health-handbook__content">
                  <h1 className="health-handbook__content--h1">
                    Sổ tay sức khỏe của{" "}
                    <span>
                      {auth?.profile?.FIRST_NAME} {auth?.profile?.LAST_NAME}
                    </span>
                  </h1>
                  <p className="health-handbook__content--p">
                    Hồ sơ sức khỏe cá nhân của bạn được nhằm hỗ trợ theo dõi sức
                    khỏe cá nhân của bạn, thông qua việc hỗ trợ này, Bác sĩ sẽ
                    giúp đỡ tư vấn được phát triển tốt đẹp.
                  </p>
                </div>
                <div className="btn-bottom">
                  <LabelTitleBottom
                    content="XEM ĐẦY ĐỦ SỔ SỨC KHỎE"
                    Icon_arrow={icon_arrowNext}
                    route={
                      ROUTES.HEALTH_HANDBOOK.EMPLOYEE_HEALTH_INFORMATION
                        .PDF_FILE_EXPORT.path
                    }
                  />
                </div>
              </Col>
              <Col xs={{ span: 22 }} lg={{ span: 12 }}>
                <Chart />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Divider />
      <div className="container-fluid healthIndex-wrapper">
        <div className="container">
          <HealthIndex />
        </div>
      </div>
    </>
  );
};

export default HealthHandbook;
