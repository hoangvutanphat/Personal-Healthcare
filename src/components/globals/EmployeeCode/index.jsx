import { Space } from "antd";
import empCode from "../../../assets/images/empCode.svg";
import React from "react";

const EmployeeCode = ({ code, avatar }) => {
  return (
    <Space className="employee-code" size={16}>
      <img
        src={avatar ? avatar : empCode}
        alt=""
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
        }}
      />
      <p>Mã số nhân viên: {code}</p>
    </Space>
  );
};

export default EmployeeCode;
