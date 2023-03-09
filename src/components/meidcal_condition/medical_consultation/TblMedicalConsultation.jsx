import BtnShowDetail from "../BtnShowDetail";
import icon_grey_next from "../../../assets/images/icon_grey_next.svg";
import "./tblMedicalConsultation.scss";
import { Space } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Button, Carousel, Image, Typography, Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { medicalConditionState } from "../../../recoil/atom/medicalConditionState";
import { useRecoilState, useRecoilValue } from "recoil";
import { healthHistoryByUserState } from "../../../recoil/atom/healthHistotyState";
import moment from "moment";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constant/router";
import ShowDetailsPDF from "../../globals/ShowDetailsPDF/ShowDetailsPDF";

const getNamePhysicalExam = (TYPE) => {
  if (TYPE === 1) {
    return "Thông tin sức khỏe";
  } else if (TYPE === 2) {
    return "Tự khám";
  } else if (TYPE === 3) {
    return "Đầu vào";
  } else if (TYPE === 4) {
    return "Định kỳ";
  } else if (TYPE === 5) {
    return "Nặng nhọc/độc hại";
  } else if (TYPE === 6) {
    return "Nghề nghiệp";
  } else if (TYPE === 7) {
    return "Đặc biệt";
  } else {
    return "Tự khám";
  }
};

const TblMedicalConsultation = ({ infoItem }) => {
  const carouselRef = useRef();
  const healthHistoryByUser = useRecoilValue(healthHistoryByUserState);
  const [diseasePhysicalExam, setDiseasePhysicalExam] = useState([]);
  const [openPDF, setOpenPDF] = useState(false);

  const handleNext = () => {
    carouselRef.current.next();
  };
  const handlePrev = () => {
    carouselRef.current.prev();
  };

  useEffect(() => {
    if (healthHistoryByUser) {
      setDiseasePhysicalExam(
        healthHistoryByUser.filter(
          (item) => item.DISEASE_ID === infoItem.DISEASE_ID
        )
      );
    }
  }, [healthHistoryByUser]);

  let newDiseasePhysicalExam = [];
  for (let item of diseasePhysicalExam) {
    newDiseasePhysicalExam.push({
      ...item,
      PHYSICAL_NAME: getNamePhysicalExam(item?.Physical_Exam?.TYPE),
      MEDICAL_FACILITY: item?.Physical_Exam?.MEDICAL_FACILITY_NAME,
    });
  }

  const [dataShowDetail, setDataShowDetail] = useState("");
  const handleShowDetails = (data) => {
    setOpenPDF(true);
    setDataShowDetail(data);
  };
  console.log("diseasePhysicalExam", diseasePhysicalExam);
  return (
    <>
      <div className="table-history">
        <div className="table-th">
          <p>Mốc thời gian kiểm tra bệnh</p>
          <p>Tình trạng bệnh lý theo thời gian</p>
          <p>Cơ sở khám</p>
          <p>Loại khám chữa bệnh</p>
        </div>
        <div className="carosel-wrapper">
          <Carousel
            ref={carouselRef}
            slidesToShow={
              newDiseasePhysicalExam.length < 4
                ? newDiseasePhysicalExam.length
                : 4
            }
            draggable={true}
            swipeToSlide={true}
            focusOnSelect={true}
            dots={false}
          >
            {newDiseasePhysicalExam &&
              newDiseasePhysicalExam.length > 0 &&
              newDiseasePhysicalExam.map((item, index) => (
                <div className="table-td" key={index}>
                  <p>
                    {item.START_DATE
                      ? moment(new Date(item.START_DATE)).format("DD/MM/YYYY")
                      : moment(new Date(item.UPDATE_DATE)).format("DD/MM/YYYY")}
                  </p>

                  <p>{item.Disease_Status?.NAME}</p>
                  <p>{item.MEDICAL_FACILITY}</p>
                  <div className="footer-table">
                    <span>KSK {item.PHYSICAL_NAME}</span>
                    <Space
                      className="btn-show"
                      onClick={() => handleShowDetails(item)}
                    >
                      <span>XEM CHI TIÊT</span>
                      <img src={icon_grey_next} alt="" />
                    </Space>
                  </div>
                </div>
              ))}
          </Carousel>
          {newDiseasePhysicalExam.length > 4 && (
            <div className="btn-carosel-group">
              <Button type="text" icon="<" onClick={handlePrev} />
              <Button
                className="btn-carosel-next"
                type="text"
                icon=">"
                onClick={handleNext}
              />
            </div>
          )}
        </div>
      </div>
      <Modal
        open={openPDF}
        onCancel={() => setOpenPDF(false)}
        footer={false}
        width={1400}
        style={{
          top: 40,
        }}
      >
        <ShowDetailsPDF
          dataViewPDF={dataShowDetail}
          onCancel={() => setOpenPDF(false)}
        />
      </Modal>
    </>
  );
};

export default TblMedicalConsultation;
