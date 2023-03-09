import { Space } from "antd";
import React from "react";

const EmployeeName = ({ title, name }) => {
  return (
    <Space direction="vertical" size={8} className="employee-name">
      <h2>{title}</h2>
      <p>{name}</p>
    </Space>
  );
};

export default EmployeeName;
