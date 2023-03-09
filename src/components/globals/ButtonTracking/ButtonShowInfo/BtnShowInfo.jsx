import { Space } from "antd";
import React from "react";
import icon_next from "../../../../assets/images/icon_next.svg";
import { Link } from "react-router-dom";

const BtnShowInfo = ({ route, label }) => {
  return (
    <Link to={route}>
      <Space className="btn-show-medical">
        <span>{label}</span>
        <img src={icon_next} alt="" />
      </Space>
    </Link>
  );
};

export default BtnShowInfo;
