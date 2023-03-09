import { Tabs } from "antd";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import BreadcrumbProvider from "../../../components/globals/Breadcrumb";
import BannerBot from "../../../components/home/banners/bot_banner/index.";
import OtherMedicalConsultation from "../../../components/meidcal_condition/show_medical_consultation/OtherMedicalConsultation";
import ShowConsultationDisease from "../../../components/meidcal_condition/show_medical_consultation/ShowConsultationDisease";
import { authState } from "../../../recoil/atom/authState";
import { employeeState } from "../../../recoil/atom/employeeState";
// import "./style.scss";

const HealthAdvice = () => {
  const [isShow, setIsShow] = useState(true);

  return (
    <div className="container-wrapper employee-health-handbook">
      <BreadcrumbProvider address="Tư vấn bệnh lý của bạn" />
      <div className="employee-health-handbook__healtHandbook">
        <div className="container-fluid">
          <div className="container health-container ">
            <div className="medical-consultation-container">
              <h1>Tư vấn bệnh lý của bạn</h1>
              <Tabs defaultActiveKey="1" centered style={{ marginTop: 40 }}>
                <Tabs.TabPane
                  tab={
                    <p className="title-tabs">
                      Thông tin tư vấn sức khoẻ dự trên bệnh lý của bạn
                    </p>
                  }
                  key="1"
                >
                  <ShowConsultationDisease />
                </Tabs.TabPane>
                <Tabs.TabPane
                  tab={
                    <p className="title-tabs">Thông tin tư vấn bệnh lý khác</p>
                  }
                  key="2"
                >
                  <OtherMedicalConsultation />
                </Tabs.TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <BannerBot isShow={isShow} />
    </div>
  );
};

export default HealthAdvice;
