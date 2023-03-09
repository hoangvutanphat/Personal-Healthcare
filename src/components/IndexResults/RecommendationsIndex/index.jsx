import { Space } from "antd/lib";
import React from "react";
import "./style.scss";

const RecommentdationsIndex = ({ title, description }) => {
  return (
    <Space direction="vertical" size={24} className="recommendations-contents pastel-green-bg">
      <h5>{title}:</h5>
      <p>{description}</p>
    </Space>
  );
};

export default RecommentdationsIndex;
