import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Button, Carousel, Image, Typography } from "antd";
import React, { useRef } from "react";
import banner from "../../../assets/images/banner.svg";
import { ROUTES } from "../../../constant/router";
import { useMedicalConsultationDisease } from "../../../hooks/medicalConsultationDisease";
import LabelCard from "../../cards/label_card";

const Banner = () => {
  const { medicalConsultationDiseases } = useMedicalConsultationDisease();
  console.log("medicalConsultationDiseases", medicalConsultationDiseases);
  const carouselRef = useRef();

  const handleNext = () => {
    carouselRef.current.next();
  };
  const handlePreview = () => {
    carouselRef.current.prev();
  };
  const consultation1 =
    medicalConsultationDiseases?.[
      Math.floor(Math.random() * medicalConsultationDiseases?.length)
    ];
  const consultation2 =
    medicalConsultationDiseases?.[
      Math.floor(Math.random() * medicalConsultationDiseases?.length)
    ];
  const consultation3 =
    medicalConsultationDiseases?.[
      Math.floor(Math.random() * medicalConsultationDiseases?.length)
    ];
  const consultation4 =
    medicalConsultationDiseases?.[
      Math.floor(Math.random() * medicalConsultationDiseases?.length)
    ];
  return (
    <div className="page-banner .container-fluid">
      <Carousel ref={carouselRef} autoplay>
        <div className="carousel">
          <Typography.Text className="carousel__pagination">
            <span className="carousel__pagination-current">1</span>/4
          </Typography.Text>
          <img src={banner} alt="banner" className="carousel__img" />
          <LabelCard
            width={"24%"}
            title={consultation1?.DISEASE_NAME}
            content={
              consultation1?.Medical_Consultation?.CONTENT
                ? consultation1?.Medical_Consultation?.CONTENT.slice(0, 50)
                : ""
            }
            link={`${ROUTES.CONTENT.patch}/${consultation1?.id}`}
          />
        </div>
        <div className="carousel">
          <Typography.Text className="carousel__pagination">
            <span className="carousel__pagination-current">2</span>/4
          </Typography.Text>
          <img src={banner} alt="banner" className="carousel__img" />
          <LabelCard
            width={"24%"}
            title={consultation2?.DISEASE_NAME}
            content={
              consultation2?.Medical_Consultation?.CONTENT
                ? consultation2?.Medical_Consultation?.CONTENT.slice(0, 50)
                : ""
            }
            link={`${ROUTES.CONTENT.patch}/${consultation2?.id}`}
          />
        </div>
        <div className="carousel">
          <Typography.Text className="carousel__pagination">
            <span className="carousel__pagination-current">3</span>/4
          </Typography.Text>
          <img src={banner} alt="banner" className="carousel__img" />
          <LabelCard
            width={"24%"}
            title={consultation3?.DISEASE_NAME}
            content={
              consultation3?.Medical_Consultation?.CONTENT
                ? consultation3?.Medical_Consultation?.CONTENT.slice(0, 50)
                : ""
            }
            link={`${ROUTES.CONTENT.patch}/${consultation3?.id}`}
          />
        </div>
        <div className="carousel">
          <Typography.Text className="carousel__pagination">
            <span className="carousel__pagination-current">4</span>/4
          </Typography.Text>
          <img src={banner} alt="banner" className="carousel__img" />
          <LabelCard
            width={"24%"}
            title={consultation4?.DISEASE_NAME}
            content={
              consultation4?.Medical_Consultation?.CONTENT
                ? consultation4?.Medical_Consultation?.CONTENT.slice(0, 50)
                : ""
            }
            link={`${ROUTES.CONTENT.patch}/${consultation4?.id}`}
          />
        </div>
      </Carousel>
      <Button
        className="pre-btn"
        shape="circle"
        icon={<CaretLeftOutlined />}
        onClick={handlePreview}
      />
      <Button
        className="next-btn"
        shape="circle"
        icon={<CaretRightOutlined />}
        onClick={handleNext}
      />
    </div>
  );
};

export default Banner;
