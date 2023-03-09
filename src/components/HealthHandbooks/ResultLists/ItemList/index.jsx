import React from "react";
import "./style.scss";
import hospital from "../../../../assets/images/hospital.svg";
import icon_download from "../../../../assets/images/icon_download.svg";
import arrow_right_green from "../../../../assets/images/arrow_right_green.svg";
import iconReact from "../../../../assets/images/iconReact.svg";

import { Button, Col, Row } from "antd";
const ItemList = ({
  date,
  medicalFacility,
  background,
  isHidden,
  medicalName,
}) => {
  return (
    <div className="item-conterner">
      <div className="item-conterner-img-top">
        <img src={background} />
      </div>
      <div className="item-conterner-bottom">
        <div className="item-day">
          <Col>
            <Row className="item-day-title-day">
              <div className="item-day-title-day-item">
                <h6>{date}</h6>
              </div>
            </Row>
            <Row className="item-day-hospital" hidden={isHidden}>
              <div className="item-day-hospital-icon">
                <img src={iconReact} />
              </div>
              <div className="item-day-hospital-name">
                <p>{medicalName}</p>
              </div>
            </Row>
            <Row className="item-day-hospital">
              <div className="item-day-hospital-icon">
                <img src={hospital} />
              </div>
              <div className="item-day-hospital-name">
                <p>{medicalFacility}</p>
              </div>
            </Row>
            <Row className="item-day-bottom">
              <Button className="item-day-bottom-dowload">
                <img src={icon_download} />
              </Button>
              <Button className="item-day-bottom-btn">
                <img src={arrow_right_green} />
              </Button>
            </Row>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
