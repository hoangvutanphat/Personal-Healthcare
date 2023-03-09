import { Col, Row, Tabs } from "antd";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadcrumbProvider from "../../components/globals/Breadcrumb";
import BannerBot from "../../components/home/banners/bot_banner/index.";
import OtherMedicalConsultation from "../../components/meidcal_condition/show_medical_consultation/OtherMedicalConsultation";
import ShowConsultationDisease from "../../components/meidcal_condition/show_medical_consultation/ShowConsultationDisease";
import { useMedicalConsultationDisease } from "../../hooks/medicalConsultationDisease";

const Content = () => {
  const { id } = useParams();
  const {
    medicalConsultationDiseases,
    medicalConsultationDisease,
    getMedicalConsultationDiseaseById,
  } = useMedicalConsultationDisease();
  useEffect(() => {
    if (id) {
      handleGet(id);
    }
  }, [id]);
  const handleGet = async (id) => {
    await getMedicalConsultationDiseaseById(id);
  };
  const htmlContent = medicalConsultationDisease?.Medical_Consultation?.CONTENT;
  console.log("medicalConsultationDisease", medicalConsultationDisease);
  return (
    <div className="container-wrapper employee-health-handbook">
      <BreadcrumbProvider address="Content" />
      <div className="employee-health-handbook__healtHandbook">
        <div className="container-fluid">
          <div className="container health-container ">
            <div className="medical-consultation-container">
              <h1>Content</h1>
              <Row style={{ marginBottom: 40 }}>
                <Col span={24}>
                  <h1 className="text-title-h1">
                    <span className="name-title">
                      {medicalConsultationDisease?.DISEASE_NAME}
                    </span>
                  </h1>
                </Col>
              </Row>
              <Row className="disease-info-wrapper">
                <Col>
                  <div
                    className="html-content"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <BannerBot />
    </div>
  );
};

export default Content;
