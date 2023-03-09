import { Col, Descriptions, Row, Space } from "antd";
import React from "react";
import BtnshowMedical from "./BtnshowMedical";
import icon_calendar from "../../../assets/images/icon_grey_calendar.svg";
import TblMedicalConsultation from "./TblMedicalConsultation";
import moment from "moment";
import "./style.scss";
import { useSetRecoilState } from "recoil";
import { indexKeyChangeState } from "../../../recoil/atom/healthIndexState";

const MedicalConsultation = ({ infoItem, route, index }) => {
  const setIndexKeyChange = useSetRecoilState(indexKeyChangeState);

  const handleClick = () => {
    setIndexKeyChange(index);
  };
  return (
    <Row className="medical-consultation">
      <Col span={24}>
        <Space className="consultation-header">
          <p>{infoItem?.Disease?.NAME}</p>
          <div onClick={handleClick}>
            <BtnshowMedical route={route} />
          </div>
        </Space>
        <Space>
          <img src={icon_calendar} alt="" width="20px" />
          <span>
            Thời gian phát hiện:{" "}
            {moment(new Date(infoItem?.START_DATE)).format("DD/MM/YYYY")}
          </span>
        </Space>
        <TblMedicalConsultation infoItem={infoItem} />
      </Col>
    </Row>
  );
};

export default MedicalConsultation;
