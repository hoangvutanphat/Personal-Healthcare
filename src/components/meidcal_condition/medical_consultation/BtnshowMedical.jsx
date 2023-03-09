import { Space } from "antd";
import React from "react";
import icon_next from "../../../assets/images/icon_next.svg";
import { Link } from "react-router-dom";

const BtnshowMedical = ({ route, title, icon }) => {
  return (
    <Link to={route}>
      <Space className="btn-show-medical">
        <span>{title ? title : "Xem tư vấn bệnh lý của bạn"}</span>
        <img src={icon ? icon : icon_next} alt="" width="20" />
      </Space>
    </Link>
  );
};

export default BtnshowMedical;
